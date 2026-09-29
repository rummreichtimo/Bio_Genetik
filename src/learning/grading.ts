/**
 * Bewertung aller Fragetypen – ohne KI, rein aus den Lösungen und Bewertungsrastern der Inhalte.
 *  ✅ correct  · 🟡 partial · ❌ wrong
 */
import type { Question, QFree, RubricPoint } from '../content/types';
import type { Result } from '../progress/types';
import { matchesAny, normalizeSeq, normalizeText, parseNumber, prepareText, wordCount } from './text';

export type Response =
  | { type: 'single'; value: number }
  | { type: 'multi'; value: number[] }
  | { type: 'tf'; value: boolean }
  | { type: 'cloze'; value: string[] }
  | { type: 'order'; value: string[] }
  | { type: 'match'; value: Record<string, string> }
  | { type: 'label'; value: Record<string, string> }
  | { type: 'input'; value: string }
  | { type: 'free'; value: string };

export interface FreeDetail {
  found: RubricPoint[];
  missing: RubricPoint[];
  misconceptions: { id: string; feedback: string }[];
  tooShort: boolean;
}

export interface Grade {
  result: Result;
  /** 0..1 */
  score: number;
  /** je Teil richtig? (Lücken, Zuordnungen, Positionen, Optionen) */
  parts?: boolean[];
  free?: FreeDetail;
}

/** Schwellen: ab 80 % vollständig, ab 40 % teilweise (Freitext); sonst ab 50 % teilweise. */
export const FREE_FULL = 0.8;
export const FREE_PARTIAL = 0.4;

function fromScore(score: number, partialFrom = 0.5): Result {
  if (score >= 0.999) return 'correct';
  if (score >= partialFrom) return 'partial';
  return 'wrong';
}

const norm = (s: string) => normalizeText(s).replace(/[.,;:!?]+$/g, '');

/** Aminosäuresequenz „Met-Ala-Trp“ → ["met","ala","trp"] (Start/Stopp werden ignoriert). */
export function normalizeAa(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-zäöü]+/)
    .filter((x) => x && !['start', 'stopp', 'stop'].includes(x));
}

export function gradeFree(q: QFree, text: string): Grade {
  const t = prepareText(text);
  const words = wordCount(text);
  const tooShort = words < Math.min(3, q.minWords ?? 3);
  const total = q.rubric.reduce((s, r) => s + (r.weight ?? 1), 0);
  const found = tooShort ? [] : q.rubric.filter((r) => matchesAny(t, r.any));
  const missing = q.rubric.filter((r) => !found.includes(r));
  const misconceptions = tooShort ? [] : (q.misconceptions ?? []).filter((m) => matchesAny(t, m.any)).map((m) => ({ id: m.id, feedback: m.feedback }));
  const score = total ? found.reduce((s, r) => s + (r.weight ?? 1), 0) / total : 0;
  let result: Result = score >= FREE_FULL ? 'correct' : score >= FREE_PARTIAL ? 'partial' : 'wrong';
  if (misconceptions.length && result === 'correct') result = 'partial';
  return { result, score, free: { found, missing, misconceptions, tooShort } };
}

export function grade(q: Question, r: Response): Grade {
  switch (q.type) {
    case 'single': {
      const ok = r.type === 'single' && r.value === q.answer;
      return { result: ok ? 'correct' : 'wrong', score: ok ? 1 : 0 };
    }
    case 'tf': {
      const ok = r.type === 'tf' && r.value === q.answer;
      return { result: ok ? 'correct' : 'wrong', score: ok ? 1 : 0 };
    }
    case 'multi': {
      const chosen = new Set(r.type === 'multi' ? r.value : []);
      const answers = new Set(q.answers);
      const parts = q.options.map((_, i) => chosen.has(i) === answers.has(i));
      const hits = [...chosen].filter((i) => answers.has(i)).length;
      const falses = [...chosen].filter((i) => !answers.has(i)).length;
      const score = Math.max(0, (hits - falses) / answers.size);
      const exact = parts.every(Boolean);
      return { result: exact ? 'correct' : fromScore(score), score: exact ? 1 : Math.min(score, 0.99), parts };
    }
    case 'cloze': {
      const vals = r.type === 'cloze' ? r.value : [];
      const parts = q.gaps.map((g, i) => g.accept.some((a) => norm(a) === norm(vals[i] ?? '')));
      const score = parts.filter(Boolean).length / q.gaps.length;
      return { result: fromScore(score), score, parts };
    }
    case 'order': {
      const vals = r.type === 'order' ? r.value : [];
      const parts = q.items.map((it, i) => vals[i] === it);
      const score = parts.filter(Boolean).length / q.items.length;
      return { result: fromScore(score), score, parts };
    }
    case 'match': {
      const vals = r.type === 'match' ? r.value : {};
      const parts = q.pairs.map((p) => vals[p.left] === p.right);
      const score = parts.filter(Boolean).length / q.pairs.length;
      return { result: fromScore(score), score, parts };
    }
    case 'label': {
      const vals = r.type === 'label' ? r.value : {};
      const parts = q.labels.map((l) => vals[l.marker] === l.answer);
      const score = parts.filter(Boolean).length / q.labels.length;
      return { result: fromScore(score), score, parts };
    }
    case 'input': {
      const v = r.type === 'input' ? r.value : '';
      let ok = false;
      if (q.mode === 'number') {
        const n = parseNumber(v);
        ok = n !== null && q.accept.some((a) => Math.abs(Number(a.replace(',', '.')) - n) <= (q.tol ?? 0));
      } else if (q.mode === 'seq') {
        ok = normalizeSeq(v).length > 0 && q.accept.some((a) => normalizeSeq(a) === normalizeSeq(v));
      } else if (q.mode === 'aa') {
        const got = normalizeAa(v).join('-');
        ok = got.length > 0 && q.accept.some((a) => normalizeAa(a).join('-') === got);
      } else {
        ok = q.accept.some((a) => norm(a) === norm(v));
      }
      return { result: ok ? 'correct' : 'wrong', score: ok ? 1 : 0 };
    }
    case 'free':
      return gradeFree(q, r.type === 'free' ? r.value : '');
  }
}

/** Ist die Antwort vollständig genug, um sie prüfen zu lassen? */
export function isComplete(q: Question, r: Response | null): boolean {
  if (!r) return false;
  switch (r.type) {
    case 'multi':
      return r.value.length > 0;
    case 'cloze':
      return q.type === 'cloze' && r.value.filter((v) => v?.trim()).length === q.gaps.length;
    case 'match':
      return q.type === 'match' && q.pairs.every((p) => r.value[p.left]);
    case 'label':
      return q.type === 'label' && q.labels.every((l) => r.value[l.marker]);
    case 'input':
    case 'free':
      return r.value.trim().length > 0;
    default:
      return true;
  }
}

export const RESULT_META: Record<Result, { icon: string; label: string; tone: 'good' | 'warn' | 'bad' }> = {
  correct: { icon: '✅', label: 'Vollständig richtig', tone: 'good' },
  partial: { icon: '🟡', label: 'Teilweise richtig', tone: 'warn' },
  wrong: { icon: '❌', label: 'Falsch', tone: 'bad' },
};
