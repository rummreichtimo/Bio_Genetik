import type { ExamTask, Experiment, Flashcard, Lesson, Question, SourceIssue, CurriculumItem, Term } from './types';
import { SUBTOPICS } from './structure';
import { PACKS } from './chapters';
import { SOURCE_ISSUES, CURRICULUM } from './meta';

export * from './structure';
export * from './sources';

export interface ContentPack {
  lessons: Lesson[];
  terms: Term[];
  cards: Flashcard[];
  questions: Question[];
  experiments: Experiment[];
  examTasks: ExamTask[];
}

function merge(packs: ContentPack[]): ContentPack {
  return {
    lessons: packs.flatMap((p) => p.lessons),
    terms: packs.flatMap((p) => p.terms),
    cards: packs.flatMap((p) => p.cards),
    questions: packs.flatMap((p) => p.questions),
    experiments: packs.flatMap((p) => p.experiments),
    examTasks: packs.flatMap((p) => p.examTasks),
  };
}

const ALL = merge(PACKS);

/** Aus jedem Fachbegriff entsteht automatisch eine Karteikarte „Begriff → Definition“. */
function termCards(terms: Term[]): Flashcard[] {
  return terms.map((t) => ({
    id: `t:${t.id}`,
    sub: t.sub,
    kind: 'begriff' as const,
    front: t.term,
    back: t.simple ? `${t.def}\n\nEinfach erklärt: ${t.simple}` : t.def,
    src: t.src,
    prov: t.prov ?? 'pdf',
    ...(t.ext ? { ext: t.ext } : {}),
  }));
}

export const LESSONS: Lesson[] = ALL.lessons;
export const TERMS: Term[] = ALL.terms;
export const CARDS: Flashcard[] = [...termCards(ALL.terms), ...ALL.cards];
export const QUESTIONS: Question[] = ALL.questions;
export const EXPERIMENTS: Experiment[] = ALL.experiments;
export const EXAM_TASKS: ExamTask[] = ALL.examTasks;
export const ISSUES: SourceIssue[] = SOURCE_ISSUES;
export const CURRICULUM_ITEMS: CurriculumItem[] = CURRICULUM;

const Q_MAP = new Map(QUESTIONS.map((q) => [q.id, q]));
const CARD_MAP = new Map(CARDS.map((c) => [c.id, c]));
const LESSON_MAP = new Map(LESSONS.map((l) => [l.sub, l]));
const EXP_MAP = new Map(EXPERIMENTS.map((e) => [e.id, e]));
const TASK_MAP = new Map(EXAM_TASKS.map((t) => [t.id, t]));

export const getQuestion = (id: string) => Q_MAP.get(id);
export const getCard = (id: string) => CARD_MAP.get(id);
export const getLesson = (sub: string) => LESSON_MAP.get(sub);
export const getExperiment = (id: string) => EXP_MAP.get(id);
export const getExamTask = (id: string) => TASK_MAP.get(id);

export const questionsOf = (sub: string) => QUESTIONS.filter((q) => q.sub === sub);
export const cardsOf = (sub: string) => CARDS.filter((c) => c.sub === sub);
export const termsOf = (sub: string) => TERMS.filter((t) => t.sub === sub);
export const experimentsOf = (sub: string) => EXPERIMENTS.filter((e) => e.sub === sub);
export const issuesOf = (sub: string) => ISSUES.filter((i) => i.subs.includes(sub));

/** Fragen, die zu einem Klausur-Material gehören, erscheinen nicht im normalen Quiz-Pool. */
const TASK_PART_IDS = new Set(EXAM_TASKS.flatMap((t) => t.parts));
export const isTaskPart = (qid: string) => TASK_PART_IDS.has(qid);

export const SUB_IDS = SUBTOPICS.map((s) => s.id);
