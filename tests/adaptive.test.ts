import { describe, expect, it } from 'vitest';
import { QUESTIONS } from '../src/content';
import { errorPatterns } from '../src/learning/errors';
import { buildPlan } from '../src/learning/plan';
import { allSubProgress } from '../src/learning/mastery';
import { recordAnswer, setSelfRating } from '../src/progress/logic';
import { emptyState } from '../src/progress/types';
import { buildQuick } from '../src/pages/Quick';

const NOW = Date.UTC(2026, 8, 29, 12);

describe('Fehlermuster und adaptiver Plan', () => {
  it('fasst Fehler zu „Thema → Fehlerart“ zusammen und zählt offene Fragen', () => {
    let s = emptyState(NOW);
    const qs = QUESTIONS.filter((q) => q.sub === 'replikation' && q.err === 'enzyme').slice(0, 2);
    for (const q of qs) s = recordAnswer(s, { qid: q.id, sub: q.sub, result: 'wrong', err: q.err, mode: 'quiz', now: NOW });
    const p = errorPatterns(s, NOW)[0];
    expect(p).toMatchObject({ sub: 'replikation', tag: 'enzyme', count: 2, open: 2 });
    s = recordAnswer(s, { qid: qs[0].id, sub: 'replikation', result: 'correct', err: 'enzyme', mode: 'quiz', now: NOW + 1 });
    expect(errorPatterns(s, NOW + 2)[0].open).toBe(1);
  });

  it('der Tagesplan schlägt das offene Fehlermuster vor', () => {
    let s = emptyState(NOW);
    for (const q of QUESTIONS.filter((x) => x.sub === 'code' && x.err === 'code').slice(0, 2)) s = recordAnswer(s, { qid: q.id, sub: q.sub, result: 'wrong', err: q.err, mode: 'quiz', now: NOW });
    const plan = buildPlan(s, allSubProgress(s), NOW);
    expect(plan.some((i) => i.to === '/quiz?sub=code&fehler=code')).toBe(true);
  });

  it('5-Minuten-Einheit wählt ein als „noch nicht“ markiertes Thema', () => {
    const s = setSelfRating(emptyState(NOW), 'epigenetik', 'nicht', NOW);
    const q = buildQuick(s, NOW);
    expect(q.sub).toBe('epigenetik');
    expect(q.terms.length).toBe(3);
    expect(q.questions.length).toBeGreaterThan(0);
  });
});
