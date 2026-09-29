import { describe, expect, it } from 'vitest';
import { filterQuestions, pickMixed, pickQuestions, priority } from '../src/learning/select';
import { emptyState } from '../src/progress/types';
import { recordAnswer } from '../src/progress/logic';
import { isTaskPart, QUESTIONS } from '../src/content';

const NOW = Date.UTC(2026, 8, 29);

describe('Fragenauswahl', () => {
  it('filtert nach Thema, Stufe und Typ und lässt Klausur-Teilaufgaben weg', () => {
    const s = emptyState(NOW);
    const qs = filterQuestions(s, { subs: ['pcr'], levels: [1, 2], types: ['single'] });
    expect(qs.length).toBeGreaterThan(0);
    expect(qs.every((q) => q.sub === 'pcr' && q.level <= 2 && q.type === 'single' && !isTaskPart(q.id))).toBe(true);
  });

  it('„nur Fehler“ liefert zuletzt falsch beantwortete Fragen', () => {
    let s = emptyState(NOW);
    const [a, b] = QUESTIONS.filter((q) => q.sub === 'pcr');
    s = recordAnswer(s, { qid: a.id, sub: a.sub, result: 'wrong', err: a.err, mode: 'quiz', now: NOW });
    s = recordAnswer(s, { qid: b.id, sub: b.sub, result: 'correct', err: b.err, mode: 'quiz', now: NOW });
    expect(filterQuestions(s, { mistakes: true }).map((q) => q.id)).toEqual([a.id]);
  });

  it('falsch beantwortete Fragen haben Vorrang vor sicher gewussten', () => {
    let s = emptyState(NOW);
    const [a, b] = QUESTIONS;
    s = recordAnswer(s, { qid: a.id, sub: a.sub, result: 'wrong', err: a.err, mode: 'quiz', now: NOW });
    for (let i = 0; i < 4; i++) s = recordAnswer(s, { qid: b.id, sub: b.sub, result: 'correct', err: b.err, mode: 'quiz', now: NOW });
    const r = () => 0.5;
    expect(priority(a, s, NOW, r)).toBeGreaterThan(priority(b, s, NOW, r));
    expect(pickQuestions([a, b], s, 1, NOW, r)[0].id).toBe(a.id);
  });

  it('gemischte Prüfung verteilt sich über alle Kapitel', () => {
    const qs = pickMixed(emptyState(NOW), 12);
    expect(qs).toHaveLength(12);
    expect(new Set(qs.map((q) => q.sub)).size).toBeGreaterThanOrEqual(6);
  });
});
