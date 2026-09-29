import { expect, test } from '@playwright/test';

test('Statistik: Kennzahlen, Diagramme mit Tabellenansicht', async ({ page }) => {
  await page.addInitScript(() => {
    const d = new Date();
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const raw = localStorage.getItem('genetik-lernlabor:progress:v1');
    const state = raw ? JSON.parse(raw) : { v: 1, updatedAt: Date.now(), q: {}, cards: {}, self: {}, lessons: {}, exams: [], days: {}, settings: {} };
    state.days = { ...(state.days ?? {}), [key]: { s: 900, q: 4, c: 3, p: 0, w: 1, k: 5 } };
    state.updatedAt = Date.now();
    localStorage.setItem('genetik-lernlabor:progress:v1', JSON.stringify(state));
  });
  await page.goto('/#/statistik');
  await expect(page.getByRole('heading', { level: 1, name: 'Dein Lernverlauf' })).toBeVisible();
  await expect(page.getByText('Trefferquote pro Tag (%)')).toBeVisible();
  await expect(page.locator('.c-bar')).toHaveCount(1);
  const tableBtn = page.getByRole('button', { name: 'Tabelle' }).nth(1);
  await tableBtn.click();
  await expect(page.getByRole('columnheader', { name: 'Trefferquote' })).toBeVisible();
  await expect(page.getByRole('cell', { name: /75 %/ })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
