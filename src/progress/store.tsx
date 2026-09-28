import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react';
import {
  addTime,
  markSection as markSectionFn,
  mergeStates,
  rateCard as rateCardFn,
  recordAnswer,
  sameContent,
  saveExam as saveExamFn,
  setSelfRating,
  updateSettings as updateSettingsFn,
  visit as visitFn,
  type AnswerInput,
} from './logic';
import { connectCloud, localStore, type CloudStore } from './storage';
import { emptyState, type CardRating, type ExamRecord, type ProgressState, type SelfRating, type Settings } from './types';

export type StorageKind = 'local' | 'cloud';

export interface ProgressApi {
  state: ProgressState;
  answer(input: AnswerInput): void;
  rateCard(cardId: string, rating: CardRating): void;
  setSelf(sub: string, r: SelfRating): void;
  markSection(sub: string, sectionId: string, total: number): void;
  visit(sub: string): void;
  saveExam(record: ExamRecord): void;
  updateSettings(patch: Partial<Settings>): void;
  importState(s: ProgressState): void;
  reset(): void;
  storage: { kind: StorageKind; lastError: boolean; localOk: boolean };
}

const ProgressContext = createContext<ProgressApi | null>(null);

type Updater = (s: ProgressState) => ProgressState;
const reducer = (s: ProgressState, fn: Updater) => fn(s);

/** Aktive Lernzeit: zählt nur, solange die Seite sichtbar ist und kürzlich benutzt wurde. */
const IDLE_LIMIT_MS = 90_000;
const TICK_MS = 5_000;
const FLUSH_MS = 60_000;

function applyTheme(theme: Settings['theme']) {
  const root = document.documentElement;
  root.classList.toggle('force-dark', theme === 'dark');
  root.classList.toggle('force-light', theme === 'light');
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => localStore.load() ?? emptyState());
  const [kind, setKind] = useState<StorageKind>('local');
  const [lastError, setLastError] = useState(false);
  const [localOk, setLocalOk] = useState(true);
  const cloudRef = useRef<CloudStore | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // --- Theme ---------------------------------------------------------------
  useEffect(() => {
    applyTheme(state.settings.theme);
  }, [state.settings.theme]);

  // --- Local Storage (kurz verzögert) --------------------------------------
  useEffect(() => {
    const t = window.setTimeout(() => setLocalOk(localStore.save(state)), 300);
    return () => window.clearTimeout(t);
  }, [state]);

  // --- claude.ai-Speicher (falls verfügbar) -------------------------------
  const savingRef = useRef(false);
  const pendingRef = useRef<ProgressState | null>(null);
  const pushCloud = useCallback(async (s: ProgressState) => {
    const cloud = cloudRef.current;
    if (!cloud) return;
    if (savingRef.current) {
      pendingRef.current = s;
      return;
    }
    savingRef.current = true;
    try {
      await cloud.save(s);
      setLastError(false);
    } catch {
      setLastError(true);
    } finally {
      savingRef.current = false;
      const next = pendingRef.current;
      pendingRef.current = null;
      if (next) void pushCloud(next);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const cloud = await connectCloud();
      if (!cloud || cancelled) return;
      try {
        const remote = await cloud.load();
        if (cancelled) return;
        cloudRef.current = cloud;
        setKind('cloud');
        if (remote) {
          const merged = mergeStates(stateRef.current, remote);
          if (!sameContent(merged, stateRef.current)) dispatch(() => merged);
          if (!sameContent(merged, remote)) void pushCloud(merged);
        } else {
          void pushCloud(stateRef.current);
        }
      } catch {
        // Kein Zugriff (z. B. nur Leserechte) → bei Local Storage bleiben.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pushCloud]);

  useEffect(() => {
    if (kind !== 'cloud') return;
    const t = window.setTimeout(() => void pushCloud(state), 2500);
    return () => window.clearTimeout(t);
  }, [state, kind, pushCloud]);

  // --- Lernzeit ------------------------------------------------------------
  const lastInteraction = useRef(Date.now());
  const pendingSeconds = useRef(0);
  useEffect(() => {
    const mark = () => {
      lastInteraction.current = Date.now();
    };
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'wheel'];
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    const flush = () => {
      const secs = Math.round(pendingSeconds.current);
      if (secs > 0) {
        pendingSeconds.current = 0;
        dispatch((s) => addTime(s, secs));
      }
    };
    const tick = window.setInterval(() => {
      const visible = document.visibilityState === 'visible';
      if (visible && Date.now() - lastInteraction.current < IDLE_LIMIT_MS) {
        pendingSeconds.current += TICK_MS / 1000;
      }
    }, TICK_MS);
    const flusher = window.setInterval(flush, FLUSH_MS);
    const onHide = () => {
      if (document.visibilityState === 'hidden') {
        flush();
        localStore.save(stateRef.current);
      }
    };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', flush);
    return () => {
      events.forEach((e) => window.removeEventListener(e, mark));
      window.clearInterval(tick);
      window.clearInterval(flusher);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);

  const api = useMemo<ProgressApi>(
    () => ({
      state,
      answer: (input) => dispatch((s) => recordAnswer(s, input)),
      rateCard: (cardId, rating) => dispatch((s) => rateCardFn(s, cardId, rating)),
      setSelf: (sub, r) => dispatch((s) => setSelfRating(s, sub, r)),
      markSection: (sub, sectionId, total) => dispatch((s) => markSectionFn(s, sub, sectionId, total)),
      visit: (sub) => dispatch((s) => visitFn(s, sub)),
      saveExam: (record) => dispatch((s) => saveExamFn(s, record)),
      updateSettings: (patch) => dispatch((s) => updateSettingsFn(s, patch)),
      importState: (next) => dispatch(() => ({ ...next, updatedAt: Date.now() })),
      reset: () =>
        dispatch((s) => {
          const fresh = emptyState();
          return { ...fresh, settings: s.settings };
        }),
      storage: { kind, lastError, localOk },
    }),
    [state, kind, lastError, localOk],
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress außerhalb von ProgressProvider');
  return ctx;
}
