import { normalizeState } from './logic';
import type { ProgressState } from './types';

const LOCAL_KEY = 'genetik-lernlabor:progress:v1';
/** Dokumente im claude.ai-Speicher dürfen höchstens 256 KiB groß sein. */
const CLOUD_MAX_BYTES = 240_000;

/** Local Storage – funktioniert überall, kann aber leer sein (privates Fenster) oder fehlschlagen. */
export const localStore = {
  load(): ProgressState | null {
    try {
      const raw = window.localStorage.getItem(LOCAL_KEY);
      return raw ? normalizeState(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  },
  save(state: ProgressState): boolean {
    try {
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  },
  clear(): void {
    try {
      window.localStorage.removeItem(LOCAL_KEY);
    } catch {
      /* nichts zu tun */
    }
  },
};

export interface CloudStore {
  load(): Promise<ProgressState | null>;
  save(state: ProgressState): Promise<void>;
}

function shrinkForCloud(state: ProgressState): ProgressState {
  let s = state;
  let json = JSON.stringify(s);
  // Notfalls ältere Fehler- und Prüfungseinträge kürzen, damit das Dokument passt.
  while (json.length > CLOUD_MAX_BYTES && (s.errors.length > 50 || s.exams.length > 5)) {
    s = {
      ...s,
      errors: s.errors.slice(Math.floor(s.errors.length / 2)),
      exams: s.exams.slice(Math.max(0, s.exams.length - Math.max(5, Math.floor(s.exams.length / 2)))),
    };
    json = JSON.stringify(s);
  }
  return s;
}

/**
 * Privater Speicher pro Person in der claude.ai-Version (geräteübergreifend).
 * Liefert null, wenn die App nicht in claude.ai läuft oder der Speicher nicht verfügbar ist.
 */
export async function connectCloud(): Promise<CloudStore | null> {
  const runtime = typeof window !== 'undefined' ? window.claude : undefined;
  if (!runtime || typeof runtime.use !== 'function') return null;
  try {
    const [db, user] = await Promise.all([runtime.use('db'), runtime.use('user')]);
    if (!db || !user) return null;
    const id = await user.id();
    if (!id) return null;
    const ref = db.doc(`data/users/${id}/progress`);
    return {
      async load() {
        const snap = await ref.get();
        return snap.exists ? normalizeState(snap.data()) : null;
      },
      async save(state) {
        const body = JSON.parse(JSON.stringify(shrinkForCloud(state))) as Record<string, unknown>;
        await ref.set(body);
      },
    };
  } catch {
    return null;
  }
}
