import type { ErrorTag } from '../content/types';

export type Result = 'correct' | 'partial' | 'wrong';
/** Karteikarten-Bewertung: ✅ gewusst · 🟡 unsicher · ❌ nicht gewusst */
export type CardRating = 'known' | 'unsure' | 'unknown';
/** Selbsteinschätzung: 🟢 sicher · 🟡 unsicher · 🔴 noch nicht */
export type SelfRating = 'sicher' | 'unsicher' | 'nicht';
export type Mode = 'lesson' | 'quiz' | 'exam' | 'klausur' | 'quick' | 'review' | 'experiment';

export interface QuestionStat {
  /** Versuche */
  n: number;
  c: number;
  p: number;
  w: number;
  /** Beherrschung 0..1 (gleitender Mittelwert) */
  m: number;
  last: Result;
  at: number;
  /** richtige Antworten in Folge */
  streak: number;
}

export interface CardStat {
  /** Fach 0..5 */
  box: number;
  due: number;
  n: number;
  lapses: number;
  last: CardRating;
  at: number;
}

export interface ErrorEntry {
  id: string;
  q: string;
  sub: string;
  tag: ErrorTag;
  r: Exclude<Result, 'correct'>;
  mode: Mode;
  at: number;
}

export interface DayStat {
  /** Lernzeit in Sekunden */
  s: number;
  /** beantwortete Fragen */
  q: number;
  c: number;
  p: number;
  w: number;
  /** wiederholte Karteikarten */
  k: number;
}

export interface ExamItem {
  q: string;
  r: Result;
  score: number;
}

export interface ExamRecord {
  id: string;
  at: number;
  durationSec: number;
  limitMin: number | null;
  items: ExamItem[];
  score: number;
}

export type ThemePref = 'system' | 'light' | 'dark';

export interface Settings {
  theme: ThemePref;
  /** KI-Bewertung für Freitexte verwenden, wenn verfügbar */
  ai: boolean;
  examMinutes: number;
  examTimed: boolean;
  examCount: number;
  dailyGoalMin: number;
}

export interface ProgressState {
  v: 1;
  updatedAt: number;
  q: Record<string, QuestionStat>;
  cards: Record<string, CardStat>;
  self: Record<string, { r: SelfRating; at: number }>;
  lessons: Record<string, { done: string[]; at: number; completedAt?: number }>;
  errors: ErrorEntry[];
  days: Record<string, DayStat>;
  exams: ExamRecord[];
  recent: { sub: string; at: number }[];
  settings: Settings;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  ai: false,
  examMinutes: 30,
  examTimed: true,
  examCount: 20,
  dailyGoalMin: 20,
};

export const LIMITS = {
  errors: 600,
  exams: 30,
  recent: 12,
};

export function emptyState(now = Date.now()): ProgressState {
  return {
    v: 1,
    updatedAt: now,
    q: {},
    cards: {},
    self: {},
    lessons: {},
    errors: [],
    days: {},
    exams: [],
    recent: [],
    settings: { ...DEFAULT_SETTINGS },
  };
}
