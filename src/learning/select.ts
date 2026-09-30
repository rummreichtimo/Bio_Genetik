import { CHAPTERS, QUESTIONS, isTaskPart } from '../content';
import type { ErrorTag, Level, Question, QuestionType } from '../content/types';
import type { ProgressState } from '../progress/types';
import { isQuestionLearned } from './learned';

export interface QuizFilter {
  subs?: string[];
  levels?: Level[];
  types?: QuestionType[];
  /** nur Fragen, die zuletzt falsch/teilweise beantwortet wurden */
  mistakes?: boolean;
  /** nur Fragen dieser Fehlerkategorie (aus der Fehleranalyse) */
  err?: ErrorTag;
  /** Klausur-Teilaufgaben einschließen */
  includeTaskParts?: boolean;
  /** nur Fragen zu Abschnitten, die im Lernmodus schon abgeschlossen sind */
  learnedOnly?: boolean;
}

export function filterQuestions(state: ProgressState, f: QuizFilter): Question[] {
  return QUESTIONS.filter((q) => {
    if (!f.includeTaskParts && isTaskPart(q.id)) return false;
    if (f.subs?.length && !f.subs.includes(q.sub)) return false;
    if (f.levels?.length && !f.levels.includes(q.level)) return false;
    if (f.types?.length && !f.types.includes(q.type)) return false;
    if (f.err && q.err !== f.err) return false;
    if (f.learnedOnly && !isQuestionLearned(state, q.id)) return false;
    if (f.mistakes) {
      const st = state.q[q.id];
      if (!st || st.last === 'correct') return false;
    }
    return true;
  });
}

/**
 * Adaptive Auswahl: Fragen mit geringer Beherrschung, zuletzt falsch beantwortete und
 * noch nie gesehene Fragen kommen bevorzugt; kürzlich richtig beantwortete seltener.
 */
export function priority(q: Question, state: ProgressState, now = Date.now(), rnd = Math.random): number {
  const st = state.q[q.id];
  if (!st) return 1 + rnd() * 0.6;
  const recency = Math.min(1, (now - st.at) / (3 * 86_400_000));
  let p = (1 - st.m) * 1.4 + recency * 0.4;
  if (st.last === 'wrong') p += 0.8;
  else if (st.last === 'partial') p += 0.4;
  return p + rnd() * 0.5;
}

export function pickQuestions(pool: Question[], state: ProgressState, count: number, now = Date.now(), rnd = Math.random): Question[] {
  const ranked = [...pool].sort((a, b) => priority(b, state, now, rnd) - priority(a, state, now, rnd));
  const chosen = ranked.slice(0, count);
  // leichtere Fragen zuerst, innerhalb gleicher Stufe gemischt
  return chosen.sort((a, b) => a.level - b.level || rnd() - 0.5);
}

/** Gemischte Auswahl über alle Themen (für den Prüfungsmodus): möglichst gleichmäßig über Kapitel verteilt. */
export function pickMixed(state: ProgressState, count: number, levels: Level[] = [2, 3, 4, 5], rnd = Math.random, learnedOnly = false): Question[] {
  const byChapter = CHAPTERS.map((c) => filterQuestions(state, { subs: c.subtopics, levels, learnedOnly }).sort(() => rnd() - 0.5));
  const out: Question[] = [];
  let i = 0;
  while (out.length < count && byChapter.some((l) => l.length)) {
    const list = byChapter[i % byChapter.length];
    const q = list.shift();
    if (q) out.push(q);
    i++;
  }
  return out;
}
