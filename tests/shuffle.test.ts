import { describe, expect, it } from 'vitest';
import { QUESTIONS } from '../src/content';
import { isTrailingOption, optionOrder } from '../src/learning/shuffle';

describe('Antworten mischen', () => {
  it('liefert jede Option genau einmal', () => {
    for (const q of QUESTIONS) {
      if (q.type !== 'single' && q.type !== 'multi') continue;
      const o = optionOrder(q.options);
      expect([...o].sort((a, b) => a - b)).toEqual(q.options.map((_, i) => i));
    }
  });

  it('die richtige Antwort steht mal vorn, mal hinten', () => {
    const q = QUESTIONS.find((x) => x.type === 'single' && x.options.length === 4 && !x.options.some(isTrailingOption))!;
    if (q.type !== 'single') throw new Error();
    const positions = new Set<number>();
    for (let k = 0; k < 200; k++) positions.add(optionOrder(q.options).indexOf(q.answer));
    expect([...positions].sort()).toEqual([0, 1, 2, 3]);
  });

  it('Sammel-Antworten wie „beide“ oder „nicht bestimmbar“ bleiben am Ende', () => {
    const opts = ['Zwilling B', 'Zwilling A', 'beide gleich viele', 'Das lässt sich nicht ableiten.'];
    for (let k = 0; k < 50; k++) expect(optionOrder(opts).slice(2)).toEqual([2, 3]);
  });
});
