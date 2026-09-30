import { describe, expect, it } from 'vitest';
import { SUBTOPICS } from '../src/content';
import { EXPLAINERS } from '../src/explainers';
import { search } from '../src/learning/search';

describe('Suche', () => {
  it('„DNA Replikation“ findet zuerst die Bildgeschichte bzw. das Thema', () => {
    const hits = search('DNA Replikation');
    expect(hits[0].sub).toBe('replikation');
    expect(['explainer', 'topic']).toContain(hits[0].kind);
    expect(hits.some((h) => h.kind === 'section' && h.sub === 'replikation')).toBe(true);
  });

  it('findet Fachbegriffe, Tippfehler und Alltagswörter', () => {
    expect(search('Okazaki').some((h) => h.kind === 'term' && /Okazaki/.test(h.title))).toBe(true);
    expect(search('Helikase').some((h) => h.title === 'Helicase')).toBe(true);
    expect(search('Verdopplung')[0].sub).toBe('replikation');
    expect(search('Genschere').some((h) => h.sub.startsWith('crispr'))).toBe(true);
  });

  it('jedes Thema ist über seinen Titel auffindbar', () => {
    for (const s of SUBTOPICS) expect(search(s.title).slice(0, 3).some((h) => h.sub === s.id), s.title).toBe(true);
  });

  it('leere oder unsinnige Suche liefert nichts', () => {
    expect(search('')).toEqual([]);
    expect(search('xqzvw')).toEqual([]);
  });
});

describe('Bildgeschichten', () => {
  it('haben gültige Quellen, Texte und zeichnen in jedem Zustand', () => {
    for (const e of EXPLAINERS) {
      expect(SUBTOPICS.some((s) => s.id === e.sub)).toBe(true);
      const ids = new Set<string>();
      for (const sc of e.scenes) {
        expect(ids.has(sc.id), sc.id).toBe(false);
        ids.add(sc.id);
        expect(sc.text.length).toBeGreaterThan(40);
        expect(sc.alt.length).toBeGreaterThan(20);
        expect(sc.src.length).toBeGreaterThan(0);
        for (const s of sc.src) expect(s.pdf >= 1 && s.pdf <= 29).toBe(true);
        for (const t of [0, 0.37, 0.8, 1]) expect(() => sc.draw(t)).not.toThrow();
      }
    }
  });
});
