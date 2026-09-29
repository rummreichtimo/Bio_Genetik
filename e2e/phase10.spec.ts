import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/themen',
  '/thema/replikation',
  '/lernen/replikation',
  '/lernen/erbgaenge',
  '/glossar',
  '/karten',
  '/karten/lernen/alle',
  '/quiz',
  '/quiz?sub=pcr&stufe=2',
  '/klausur',
  '/klausur/kt-duchenne',
  '/pruefung',
  '/schnell',
  '/fehler',
  '/statistik',
  '/experimente',
  '/experiment/exp-duchenne',
  '/lehrplan',
  '/quellen',
  '/ueben',
  '/fortschritt',
  '/einstellungen',
];

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`Barrierearmut (${scheme})`, () => {
    test.use({ colorScheme: scheme });
    for (const route of ROUTES) {
      test(`${route}: keine axe-Verstöße, kein horizontales Scrollen`, async ({ page }) => {
        await page.goto(`/#${route}`);
        await expect(page.locator('main h1').first()).toBeVisible();
        await page.waitForTimeout(250);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
        expect(summary).toEqual([]);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  });
}
