import type { ContentPack } from './index';
import type { Src } from './types';

/** Kurzschreibweise für Quellenangaben: p(5) → { pdf: 5 }, p(5, 'Material B') */
export const p = (pdf: number, note?: string): Src => (note ? { pdf, note } : { pdf });

export const emptyPack = (): ContentPack => ({
  lessons: [],
  terms: [],
  cards: [],
  questions: [],
  experiments: [],
  examTasks: [],
});
