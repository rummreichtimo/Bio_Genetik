import type { ErrorTag } from '../content/types';
import { dayKey } from '../lib/date';
import { nextCardStat } from '../learning/srs';
import {
  DEFAULT_SETTINGS,
  LIMITS,
  emptyState,
  type CardRating,
  type DayStat,
  type ExamRecord,
  type Mode,
  type ProgressState,
  type QuestionStat,
  type Result,
  type SelfRating,
  type Settings,
} from './types';

/** Lernrate des gleitenden Mittelwerts für die Beherrschung einer Frage. */
export const MASTERY_RATE = 0.55;

export const resultScore = (r: Result): number => (r === 'correct' ? 1 : r === 'partial' ? 0.5 : 0);

function emptyDay(): DayStat {
  return { s: 0, q: 0, c: 0, p: 0, w: 0, k: 0 };
}

function withDay(state: ProgressState, now: number, fn: (d: DayStat) => DayStat): ProgressState['days'] {
  const key = dayKey(now);
  return { ...state.days, [key]: fn({ ...emptyDay(), ...state.days[key] }) };
}

let idCounter = 0;
export function uid(prefix = 'id'): string {
  idCounter = (idCounter + 1) % 1_000_000;
  return `${prefix}-${Date.now().toString(36)}-${idCounter.toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export interface AnswerInput {
  qid: string;
  sub: string;
  result: Result;
  /** Punktanteil 0..1 (z. B. bei Teilpunkten); Standard aus result */
  score?: number;
  err: ErrorTag;
  mode: Mode;
  now?: number;
}

export function recordAnswer(state: ProgressState, input: AnswerInput): ProgressState {
  const now = input.now ?? Date.now();
  const score = input.score ?? resultScore(input.result);
  const prev: QuestionStat | undefined = state.q[input.qid];
  const m0 = prev?.m ?? 0;
  const stat: QuestionStat = {
    n: (prev?.n ?? 0) + 1,
    c: (prev?.c ?? 0) + (input.result === 'correct' ? 1 : 0),
    p: (prev?.p ?? 0) + (input.result === 'partial' ? 1 : 0),
    w: (prev?.w ?? 0) + (input.result === 'wrong' ? 1 : 0),
    m: Math.max(0, Math.min(1, m0 + MASTERY_RATE * (score - m0))),
    last: input.result,
    at: now,
    streak: input.result === 'correct' ? (prev?.streak ?? 0) + 1 : 0,
  };
  let errors = state.errors;
  if (input.result !== 'correct') {
    errors = [
      ...errors,
      { id: uid('e'), q: input.qid, sub: input.sub, tag: input.err, r: input.result, mode: input.mode, at: now },
    ].slice(-LIMITS.errors);
  }
  return {
    ...state,
    updatedAt: now,
    q: { ...state.q, [input.qid]: stat },
    errors,
    days: withDay(state, now, (d) => ({
      ...d,
      q: d.q + 1,
      c: d.c + (input.result === 'correct' ? 1 : 0),
      p: d.p + (input.result === 'partial' ? 1 : 0),
      w: d.w + (input.result === 'wrong' ? 1 : 0),
    })),
  };
}

export function rateCard(state: ProgressState, cardId: string, rating: CardRating, now = Date.now()): ProgressState {
  return {
    ...state,
    updatedAt: now,
    cards: { ...state.cards, [cardId]: nextCardStat(state.cards[cardId], rating, now) },
    days: withDay(state, now, (d) => ({ ...d, k: d.k + 1 })),
  };
}

export function setSelfRating(state: ProgressState, sub: string, r: SelfRating, now = Date.now()): ProgressState {
  return { ...state, updatedAt: now, self: { ...state.self, [sub]: { r, at: now } } };
}

export function markSection(state: ProgressState, sub: string, sectionId: string, totalSections: number, now = Date.now()): ProgressState {
  const prev = state.lessons[sub] ?? { done: [], at: now };
  if (prev.done.includes(sectionId)) return state;
  const done = [...prev.done, sectionId];
  const completedAt = prev.completedAt ?? (done.length >= totalSections ? now : undefined);
  return {
    ...state,
    updatedAt: now,
    lessons: { ...state.lessons, [sub]: { done, at: now, ...(completedAt ? { completedAt } : {}) } },
  };
}

export function addTime(state: ProgressState, seconds: number, now = Date.now()): ProgressState {
  if (seconds <= 0) return state;
  return { ...state, updatedAt: now, days: withDay(state, now, (d) => ({ ...d, s: d.s + seconds })) };
}

export function visit(state: ProgressState, sub: string, now = Date.now()): ProgressState {
  const recent = [{ sub, at: now }, ...state.recent.filter((r) => r.sub !== sub)].slice(0, LIMITS.recent);
  return { ...state, updatedAt: now, recent };
}

export function saveExam(state: ProgressState, record: ExamRecord): ProgressState {
  return { ...state, updatedAt: record.at, exams: [...state.exams, record].slice(-LIMITS.exams) };
}

export function updateSettings(state: ProgressState, patch: Partial<Settings>, now = Date.now()): ProgressState {
  return { ...state, updatedAt: now, settings: { ...state.settings, ...patch } };
}

// ---------------------------------------------------------------------------
// Einlesen (Import / Speicher) – robust gegen fehlende oder fremde Felder
// ---------------------------------------------------------------------------

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const num = (v: unknown, d = 0) => (typeof v === 'number' && Number.isFinite(v) ? v : d);

export function normalizeState(raw: unknown): ProgressState | null {
  if (!isObj(raw) || raw.v !== 1) return null;
  const base = emptyState(num(raw.updatedAt, Date.now()));
  const out: ProgressState = { ...base };
  if (isObj(raw.q)) {
    for (const [k, v] of Object.entries(raw.q)) {
      if (!isObj(v)) continue;
      const last = v.last === 'correct' || v.last === 'partial' || v.last === 'wrong' ? v.last : 'wrong';
      out.q[k] = {
        n: num(v.n),
        c: num(v.c),
        p: num(v.p),
        w: num(v.w),
        m: Math.max(0, Math.min(1, num(v.m))),
        last,
        at: num(v.at),
        streak: num(v.streak),
      };
    }
  }
  if (isObj(raw.cards)) {
    for (const [k, v] of Object.entries(raw.cards)) {
      if (!isObj(v)) continue;
      const last = v.last === 'known' || v.last === 'unsure' || v.last === 'unknown' ? v.last : 'unknown';
      out.cards[k] = {
        box: Math.max(0, Math.min(5, Math.round(num(v.box)))),
        due: num(v.due),
        n: num(v.n),
        lapses: num(v.lapses),
        last,
        at: num(v.at),
      };
    }
  }
  if (isObj(raw.self)) {
    for (const [k, v] of Object.entries(raw.self)) {
      if (isObj(v) && (v.r === 'sicher' || v.r === 'unsicher' || v.r === 'nicht')) out.self[k] = { r: v.r, at: num(v.at) };
    }
  }
  if (isObj(raw.lessons)) {
    for (const [k, v] of Object.entries(raw.lessons)) {
      if (!isObj(v) || !Array.isArray(v.done)) continue;
      out.lessons[k] = {
        done: v.done.filter((x): x is string => typeof x === 'string'),
        at: num(v.at),
        ...(typeof v.completedAt === 'number' ? { completedAt: v.completedAt } : {}),
      };
    }
  }
  if (Array.isArray(raw.errors)) {
    out.errors = raw.errors
      .filter(isObj)
      .filter((e) => typeof e.q === 'string' && typeof e.sub === 'string')
      .map((e) => ({
        id: typeof e.id === 'string' ? e.id : uid('e'),
        q: e.q as string,
        sub: e.sub as string,
        tag: (typeof e.tag === 'string' ? e.tag : 'facts') as ErrorTag,
        r: e.r === 'partial' ? ('partial' as const) : ('wrong' as const),
        mode: (typeof e.mode === 'string' ? e.mode : 'quiz') as Mode,
        at: num(e.at),
      }))
      .slice(-LIMITS.errors);
  }
  if (isObj(raw.days)) {
    for (const [k, v] of Object.entries(raw.days)) {
      if (!isObj(v) || !/^\d{4}-\d{2}-\d{2}$/.test(k)) continue;
      out.days[k] = { s: num(v.s), q: num(v.q), c: num(v.c), p: num(v.p), w: num(v.w), k: num(v.k) };
    }
  }
  if (Array.isArray(raw.exams)) {
    out.exams = raw.exams
      .filter(isObj)
      .filter((e) => Array.isArray(e.items))
      .map((e) => ({
        id: typeof e.id === 'string' ? e.id : uid('x'),
        at: num(e.at),
        durationSec: num(e.durationSec),
        limitMin: typeof e.limitMin === 'number' ? e.limitMin : null,
        score: num(e.score),
        items: (e.items as unknown[]).filter(isObj).map((it) => ({
          q: String(it.q),
          r: (it.r === 'correct' || it.r === 'partial' ? it.r : 'wrong') as Result,
          score: num(it.score),
        })),
      }))
      .slice(-LIMITS.exams);
  }
  if (Array.isArray(raw.recent)) {
    out.recent = raw.recent
      .filter(isObj)
      .filter((r) => typeof r.sub === 'string')
      .map((r) => ({ sub: r.sub as string, at: num(r.at) }))
      .slice(0, LIMITS.recent);
  }
  if (isObj(raw.settings)) {
    const s = raw.settings;
    out.settings = {
      theme: s.theme === 'light' || s.theme === 'dark' ? s.theme : 'system',
      ai: s.ai === true,
      examMinutes: Math.max(5, Math.min(180, Math.round(num(s.examMinutes, DEFAULT_SETTINGS.examMinutes)))),
      examTimed: s.examTimed !== false,
      examCount: Math.max(5, Math.min(60, Math.round(num(s.examCount, DEFAULT_SETTINGS.examCount)))),
      dailyGoalMin: Math.max(5, Math.min(240, Math.round(num(s.dailyGoalMin, DEFAULT_SETTINGS.dailyGoalMin)))),
    };
  }
  return out;
}

// ---------------------------------------------------------------------------
// Zusammenführen zweier Stände (z. B. iPad und Handy)
// ---------------------------------------------------------------------------

function pickLatest<T extends { at: number }>(a: Record<string, T>, b: Record<string, T>): Record<string, T> {
  const out: Record<string, T> = { ...a };
  for (const [k, v] of Object.entries(b)) {
    if (!out[k] || v.at > out[k].at) out[k] = v;
  }
  return out;
}

export function mergeStates(a: ProgressState, b: ProgressState): ProgressState {
  const lessons: ProgressState['lessons'] = { ...a.lessons };
  for (const [k, v] of Object.entries(b.lessons)) {
    const cur = lessons[k];
    if (!cur) {
      lessons[k] = v;
      continue;
    }
    const done = Array.from(new Set([...cur.done, ...v.done]));
    const completed = [cur.completedAt, v.completedAt].filter((x): x is number => typeof x === 'number');
    lessons[k] = {
      done,
      at: Math.max(cur.at, v.at),
      ...(completed.length ? { completedAt: Math.min(...completed) } : {}),
    };
  }
  const days: ProgressState['days'] = { ...a.days };
  for (const [k, v] of Object.entries(b.days)) {
    const cur = days[k];
    days[k] = cur
      ? { s: Math.max(cur.s, v.s), q: Math.max(cur.q, v.q), c: Math.max(cur.c, v.c), p: Math.max(cur.p, v.p), w: Math.max(cur.w, v.w), k: Math.max(cur.k, v.k) }
      : v;
  }
  const byId = <T extends { id: string; at: number }>(x: T[], y: T[], cap: number) => {
    const m = new Map<string, T>();
    for (const it of [...x, ...y]) m.set(it.id, it);
    return Array.from(m.values())
      .sort((p, q) => p.at - q.at)
      .slice(-cap);
  };
  const recentMap = new Map<string, number>();
  for (const r of [...a.recent, ...b.recent]) recentMap.set(r.sub, Math.max(recentMap.get(r.sub) ?? 0, r.at));
  const recent = Array.from(recentMap.entries())
    .map(([sub, at]) => ({ sub, at }))
    .sort((p, q) => q.at - p.at)
    .slice(0, LIMITS.recent);
  const newer = b.updatedAt > a.updatedAt ? b : a;
  return {
    v: 1,
    updatedAt: Math.max(a.updatedAt, b.updatedAt),
    q: pickLatest(a.q, b.q),
    cards: pickLatest(a.cards, b.cards),
    self: pickLatest(a.self, b.self),
    lessons,
    errors: byId(a.errors, b.errors, LIMITS.errors),
    days,
    exams: byId(a.exams, b.exams, LIMITS.exams),
    recent,
    settings: { ...newer.settings },
  };
}

/** Vergleich ohne Zeitstempel-Rauschen (für „hat sich etwas geändert?“). */
export function sameContent(a: ProgressState, b: ProgressState): boolean {
  return JSON.stringify({ ...a, updatedAt: 0 }) === JSON.stringify({ ...b, updatedAt: 0 });
}
