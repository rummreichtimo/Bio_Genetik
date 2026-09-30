import { SUBTOPICS, getLesson, sectionOfCard, sectionOfQuestion, type SectionRef } from '../content';
import type { ProgressState } from '../progress/types';

/**
 * „Gelernt“ heißt: Der Lernabschnitt, in dem der Inhalt erklärt wird, ist im Lernmodus abgeschlossen.
 * Quiz, Karteikarten und Prüfung fragen standardmäßig nur Gelerntes ab.
 */

export function isSectionDone(state: ProgressState, ref: SectionRef | undefined): boolean {
  if (!ref) return true; // ohne Lernabschnitt nie sperren
  return state.lessons[ref.sub]?.done.includes(ref.section) ?? false;
}

export const isQuestionLearned = (state: ProgressState, qid: string) => isSectionDone(state, sectionOfQuestion(qid));
export const isCardLearned = (state: ProgressState, cid: string) => isSectionDone(state, sectionOfCard(cid));

/** Anteil erledigter Abschnitte je Thema */
export function lessonShare(state: ProgressState, sub: string): number {
  const sections = getLesson(sub)?.sections ?? [];
  if (!sections.length) return 0;
  const done = state.lessons[sub]?.done ?? [];
  return sections.filter((s) => done.includes(s.id)).length / sections.length;
}

export const hasLearnedAnything = (state: ProgressState) => Object.values(state.lessons).some((l) => l.done.length > 0);

export interface LearnStep {
  sub: string;
  section: string;
  sectionTitle: string;
  index: number;
  total: number;
  /** Thema bereits angefangen */
  started: boolean;
}

/**
 * Nächster Schritt im Lernpfad: zuerst das zuletzt begonnene, noch nicht fertige Thema,
 * sonst das erste nicht fertige Thema in der Reihenfolge der PDF.
 */
export function nextLearnStep(state: ProgressState): LearnStep | null {
  const stepIn = (sub: string): LearnStep | null => {
    const sections = getLesson(sub)?.sections ?? [];
    const done = state.lessons[sub]?.done ?? [];
    const index = sections.findIndex((s) => !done.includes(s.id));
    if (index < 0) return null;
    return { sub, section: sections[index].id, sectionTitle: sections[index].title, index, total: sections.length, started: done.length > 0 };
  };
  const recent = state.recent.map((r) => r.sub).find((sub) => (state.lessons[sub]?.done.length ?? 0) > 0 && stepIn(sub));
  if (recent) return stepIn(recent);
  for (const s of SUBTOPICS) {
    const step = stepIn(s.id);
    if (step) return step;
  }
  return null;
}
