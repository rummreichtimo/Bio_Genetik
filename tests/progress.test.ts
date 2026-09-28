import { describe, expect, it } from 'vitest';
import {
  addTime,
  markSection,
  mergeStates,
  normalizeState,
  rateCard,
  recordAnswer,
  setSelfRating,
  visit,
} from '../src/progress/logic';
import { emptyState, LIMITS } from '../src/progress/types';
import { nextCardStat, BOX_INTERVAL_DAYS } from '../src/learning/srs';
import { streak, totals } from '../src/learning/stats';
import { dayKey, DAY_MS, startOfDay } from '../src/lib/date';

const NOW = new Date(2026, 8, 28, 15, 0, 0).getTime();

describe('recordAnswer', () => {
  it('zählt Versuche und erhöht die Beherrschung schrittweise', () => {
    let s = emptyState(NOW);
    s = recordAnswer(s, { qid: 'q1', sub: 'pcr', result: 'correct', err: 'facts', mode: 'quiz', now: NOW });
    expect(s.q.q1.n).toBe(1);
    expect(s.q.q1.m).toBeCloseTo(0.55);
    s = recordAnswer(s, { qid: 'q1', sub: 'pcr', result: 'correct', err: 'facts', mode: 'quiz', now: NOW + 1 });
    expect(s.q.q1.m).toBeGreaterThan(0.75);
    expect(s.q.q1.streak).toBe(2);
    expect(s.days[dayKey(NOW)].q).toBe(2);
    expect(s.errors).toHaveLength(0);
  });

  it('protokolliert Fehler mit Kategorie und setzt die Serie zurück', () => {
    let s = emptyState(NOW);
    s = recordAnswer(s, { qid: 'q1', sub: 'pcr', result: 'correct', err: 'sequence', mode: 'quiz', now: NOW });
    s = recordAnswer(s, { qid: 'q1', sub: 'pcr', result: 'wrong', err: 'sequence', mode: 'exam', now: NOW + 5 });
    expect(s.q.q1.streak).toBe(0);
    expect(s.q.q1.w).toBe(1);
    expect(s.errors).toHaveLength(1);
    expect(s.errors[0]).toMatchObject({ q: 'q1', sub: 'pcr', tag: 'sequence', r: 'wrong', mode: 'exam' });
  });

  it('begrenzt das Fehlerprotokoll', () => {
    let s = emptyState(NOW);
    for (let i = 0; i < LIMITS.errors + 20; i++) {
      s = recordAnswer(s, { qid: `q${i}`, sub: 'pcr', result: 'wrong', err: 'facts', mode: 'quiz', now: NOW + i });
    }
    expect(s.errors).toHaveLength(LIMITS.errors);
    expect(s.errors[s.errors.length - 1].q).toBe(`q${LIMITS.errors + 19}`);
  });
});

describe('Karteikarten (Leitner)', () => {
  it('„gewusst“ steigt ein Fach auf, „nicht gewusst“ fällt auf Fach 0 und ist sofort fällig', () => {
    const a = nextCardStat(undefined, 'known', NOW);
    expect(a.box).toBe(1);
    expect(a.due).toBe(startOfDay(NOW) + BOX_INTERVAL_DAYS[1] * DAY_MS);
    const b = nextCardStat(a, 'known', NOW);
    expect(b.box).toBe(2);
    const c = nextCardStat(b, 'unknown', NOW);
    expect(c.box).toBe(0);
    expect(c.due).toBe(NOW);
    expect(c.lapses).toBe(1);
  });

  it('„unsicher“ hält die Karte in kurzen Abständen', () => {
    const a = nextCardStat(undefined, 'unsure', NOW);
    expect(a.box).toBe(1);
    const high = { box: 4, due: 0, n: 5, lapses: 0, last: 'known' as const, at: NOW };
    expect(nextCardStat(high, 'unsure', NOW).box).toBe(3);
  });

  it('rateCard zählt Wiederholungen pro Tag', () => {
    let s = emptyState(NOW);
    s = rateCard(s, 'c1', 'known', NOW);
    s = rateCard(s, 'c2', 'unknown', NOW);
    expect(s.days[dayKey(NOW)].k).toBe(2);
  });
});

describe('Lernabschnitte, Selbsteinschätzung, Besuche', () => {
  it('markiert Abschnitte und schließt die Lektion ab', () => {
    let s = emptyState(NOW);
    s = markSection(s, 'pcr', 'a', 2, NOW);
    expect(s.lessons.pcr.completedAt).toBeUndefined();
    s = markSection(s, 'pcr', 'a', 2, NOW); // doppelt → keine Änderung
    expect(s.lessons.pcr.done).toEqual(['a']);
    s = markSection(s, 'pcr', 'b', 2, NOW + 10);
    expect(s.lessons.pcr.completedAt).toBe(NOW + 10);
  });

  it('merkt sich zuletzt besuchte Themen ohne Duplikate', () => {
    let s = emptyState(NOW);
    s = visit(s, 'pcr', NOW);
    s = visit(s, 'code', NOW + 1);
    s = visit(s, 'pcr', NOW + 2);
    expect(s.recent.map((r) => r.sub)).toEqual(['pcr', 'code']);
    s = setSelfRating(s, 'pcr', 'unsicher', NOW);
    expect(s.self.pcr.r).toBe('unsicher');
  });
});

describe('Lernserie und Kennzahlen', () => {
  it('zählt aufeinanderfolgende Lerntage, heute darf noch fehlen', () => {
    let s = emptyState(NOW);
    s = recordAnswer(s, { qid: 'a', sub: 'pcr', result: 'correct', err: 'facts', mode: 'quiz', now: NOW - 2 * DAY_MS });
    s = recordAnswer(s, { qid: 'b', sub: 'pcr', result: 'correct', err: 'facts', mode: 'quiz', now: NOW - DAY_MS });
    expect(streak(s, NOW)).toBe(2);
    s = addTime(s, 120, NOW);
    expect(streak(s, NOW)).toBe(3);
    expect(streak(s, NOW + 3 * DAY_MS)).toBe(0);
  });

  it('berechnet Trefferquote mit halben Punkten für „teilweise“', () => {
    let s = emptyState(NOW);
    s = recordAnswer(s, { qid: 'a', sub: 'pcr', result: 'correct', err: 'facts', mode: 'quiz', now: NOW });
    s = recordAnswer(s, { qid: 'b', sub: 'pcr', result: 'partial', err: 'facts', mode: 'quiz', now: NOW });
    s = recordAnswer(s, { qid: 'c', sub: 'pcr', result: 'wrong', err: 'facts', mode: 'quiz', now: NOW });
    const t = totals(s, NOW);
    expect(t.attempts).toBe(3);
    expect(t.accuracy).toBeCloseTo(0.5);
  });
});

describe('Import und Zusammenführen', () => {
  it('lehnt fremde Daten ab und füllt fehlende Felder', () => {
    expect(normalizeState(null)).toBeNull();
    expect(normalizeState({ v: 2 })).toBeNull();
    const s = normalizeState({ v: 1, q: { x: { n: 2, c: 1, m: 5, last: 'nope' } }, settings: { theme: 'dark', examCount: 999 } });
    expect(s).not.toBeNull();
    expect(s!.q.x.m).toBe(1);
    expect(s!.q.x.last).toBe('wrong');
    expect(s!.settings.theme).toBe('dark');
    expect(s!.settings.examCount).toBe(60);
    expect(s!.cards).toEqual({});
  });

  it('übersteht einen Export-Import-Kreislauf verlustfrei', () => {
    let s = emptyState(NOW);
    s = recordAnswer(s, { qid: 'a', sub: 'pcr', result: 'partial', err: 'facts', mode: 'quiz', now: NOW });
    s = rateCard(s, 'c1', 'known', NOW);
    s = markSection(s, 'pcr', 's1', 3, NOW);
    const back = normalizeState(JSON.parse(JSON.stringify(s)));
    expect(back).toEqual(s);
  });

  it('führt zwei Geräte-Stände zusammen (neuester Eintrag gewinnt, Listen werden vereinigt)', () => {
    let a = emptyState(NOW);
    let b = emptyState(NOW);
    a = recordAnswer(a, { qid: 'q1', sub: 'pcr', result: 'wrong', err: 'facts', mode: 'quiz', now: NOW });
    b = recordAnswer(b, { qid: 'q1', sub: 'pcr', result: 'correct', err: 'facts', mode: 'quiz', now: NOW + 100 });
    b = recordAnswer(b, { qid: 'q2', sub: 'code', result: 'correct', err: 'facts', mode: 'quiz', now: NOW + 200 });
    a = markSection(a, 'pcr', 's1', 3, NOW);
    b = markSection(b, 'pcr', 's2', 3, NOW);
    const m = mergeStates(a, b);
    expect(m.q.q1.last).toBe('correct');
    expect(m.q.q2).toBeDefined();
    expect(m.errors).toHaveLength(1);
    expect(new Set(m.lessons.pcr.done)).toEqual(new Set(['s1', 's2']));
    // symmetrisch
    const m2 = mergeStates(b, a);
    expect(m2.q.q1.last).toBe('correct');
  });
});
