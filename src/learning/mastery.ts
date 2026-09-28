import { CHAPTERS, SUBTOPICS, cardsOf, getLesson, isTaskPart, questionsOf } from '../content';
import type { ChapterId } from '../content/types';
import type { ProgressState, SelfRating } from '../progress/types';
import { cardMastery } from './srs';

export type SubStatus = 'offen' | 'in-arbeit' | 'schwach' | 'gelernt';

export interface SubProgress {
  sub: string;
  /** Gesamtfortschritt 0..1 */
  progress: number;
  lesson: number;
  qMastery: number;
  cardMastery: number;
  attempts: number;
  /** Trefferquote über alle Versuche (teilweise richtig = halb) */
  accuracy: number | null;
  /** Beherrschung der bereits bearbeiteten Fragen (gewichtet neuere Antworten stärker) */
  recentMastery: number | null;
  status: SubStatus;
  self?: SelfRating;
  counts: { questions: number; cards: number; sections: number; answered: number; cardsSeen: number };
}

/** Gewichte des Fortschritts: Lernabschnitte, Fragen, Karteikarten. */
const W_LESSON = 0.2;
const W_Q = 0.55;
const W_CARD = 0.25;

export function subProgress(state: ProgressState, sub: string): SubProgress {
  const questions = questionsOf(sub).filter((q) => !isTaskPart(q.id));
  const cards = cardsOf(sub);
  const lesson = getLesson(sub);
  const sections = lesson?.sections.length ?? 0;

  const doneSections = state.lessons[sub]?.done.filter((id) => lesson?.sections.some((s) => s.id === id)).length ?? 0;
  const lessonShare = sections ? doneSections / sections : 0;

  let mSum = 0;
  let attempts = 0;
  let points = 0;
  let answered = 0;
  let attemptedMSum = 0;
  for (const q of questionsOf(sub)) {
    const st = state.q[q.id];
    if (!st) continue;
    attempts += st.n;
    points += st.c + 0.5 * st.p;
    answered += 1;
    attemptedMSum += st.m;
  }
  for (const q of questions) mSum += state.q[q.id]?.m ?? 0;
  const qMastery = questions.length ? mSum / questions.length : 0;

  let cSum = 0;
  let cardsSeen = 0;
  for (const c of cards) {
    const st = state.cards[c.id];
    if (st) cardsSeen += 1;
    cSum += cardMastery(st);
  }
  const cMastery = cards.length ? cSum / cards.length : 0;

  const parts: [number, number][] = [];
  if (sections) parts.push([W_LESSON, lessonShare]);
  if (questions.length) parts.push([W_Q, qMastery]);
  if (cards.length) parts.push([W_CARD, cMastery]);
  const wSum = parts.reduce((a, [w]) => a + w, 0);
  const progress = wSum ? parts.reduce((a, [w, v]) => a + w * v, 0) / wSum : 0;

  const accuracy = attempts ? points / attempts : null;
  const recentMastery = answered ? attemptedMSum / answered : null;
  const self = state.self[sub]?.r;

  let status: SubStatus;
  const started = attempts > 0 || doneSections > 0 || cardsSeen > 0 || !!self;
  if (!started) status = 'offen';
  else if (
    self === 'nicht' ||
    (attempts >= 3 && recentMastery !== null && recentMastery < 0.5) ||
    (self === 'unsicher' && attempts >= 3 && recentMastery !== null && recentMastery < 0.65)
  )
    status = 'schwach';
  else if (progress >= 0.75) status = 'gelernt';
  else status = 'in-arbeit';

  return {
    sub,
    progress,
    lesson: lessonShare,
    qMastery,
    cardMastery: cMastery,
    attempts,
    accuracy,
    recentMastery,
    status,
    self,
    counts: { questions: questions.length, cards: cards.length, sections, answered, cardsSeen },
  };
}

export function allSubProgress(state: ProgressState): SubProgress[] {
  return SUBTOPICS.map((s) => subProgress(state, s.id));
}

function weight(p: SubProgress): number {
  return Math.max(1, p.counts.questions + p.counts.cards + p.counts.sections);
}

export function weightedProgress(list: SubProgress[]): number {
  const w = list.reduce((a, p) => a + weight(p), 0);
  return w ? list.reduce((a, p) => a + weight(p) * p.progress, 0) / w : 0;
}

export function chapterProgress(state: ProgressState, chapter: ChapterId, cache?: SubProgress[]): number {
  const all = cache ?? allSubProgress(state);
  const ch = CHAPTERS.find((c) => c.id === chapter);
  if (!ch) return 0;
  return weightedProgress(all.filter((p) => ch.subtopics.includes(p.sub)));
}

export function overallProgress(state: ProgressState, cache?: SubProgress[]): number {
  return weightedProgress(cache ?? allSubProgress(state));
}

export const STATUS_LABEL: Record<SubStatus, string> = {
  offen: 'Offen',
  'in-arbeit': 'In Arbeit',
  schwach: 'Schwach',
  gelernt: 'Gelernt',
};
