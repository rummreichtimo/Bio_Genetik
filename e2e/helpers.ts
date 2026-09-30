import type { Page } from '@playwright/test';
import { LESSONS } from '../src/content';
import { markSection } from '../src/progress/logic';
import { emptyState } from '../src/progress/types';

const KEY = 'genetik-lernlabor:progress:v1';

/** Lernstand, in dem die angegebenen Themen (Standard: alle) im Lernmodus durchgearbeitet sind. */
export function learnedState(subs?: string[]) {
  let s = emptyState(Date.now());
  for (const l of LESSONS) {
    if (subs && !subs.includes(l.sub)) continue;
    for (const sec of l.sections) s = markSection(s, l.sub, sec.id, l.sections.length, Date.now());
  }
  return s;
}

/** Setzt den Lernstand zurück und markiert Themen als gelernt (für Tests von Quiz, Karten, Prüfung). */
export async function startLearned(page: Page, subs?: string[]) {
  const state = JSON.stringify(learnedState(subs));
  // vor dem Start der App setzen (sonst überschreibt die laufende App den Speicher beim Verlassen) – nur einmal pro Test
  await page.addInitScript(
    ([k, v]) => {
      if (sessionStorage.getItem('e2e-seeded')) return;
      localStorage.clear();
      localStorage.setItem(k, v);
      sessionStorage.setItem('e2e-seeded', '1');
    },
    [KEY, state] as const,
  );
  await page.goto('/');
}
