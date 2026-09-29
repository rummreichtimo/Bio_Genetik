import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('Prüfungsmodus: ohne Lösungen, Abgabe mit Auswertung', async ({ page }) => {
  await page.goto('/#/pruefung');
  await page.getByRole('button', { name: '10', exact: true }).click();
  await page.getByRole('button', { name: /Prüfung starten/ }).click();
  await expect(page.getByText(/Aufgabe 1 von 10/)).toBeVisible();
  await expect(page.getByRole('timer')).toBeVisible();
  const opt = page.locator('.qcard [role=radio], .qcard [role=checkbox]').first();
  if (await opt.count()) {
    await opt.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await opt.click();
    const save = page.getByRole('button', { name: 'Antwort speichern' });
    if (await save.isEnabled()) {
      await save.click();
      await expect(page.getByText(/Beantwortet\.|Antwort gespeichert\./)).toBeVisible();
      await expect(page.getByText(/Vollständig richtig|Falsch/)).toHaveCount(0);
    }
  }
  const submit = page.getByRole('button', { name: 'Abgeben' });
  await submit.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await submit.click();
  await page.getByRole('dialog').getByRole('button', { name: 'Abgeben' }).click();
  await expect(page.getByRole('heading', { name: 'Alle Aufgaben mit Lösung' })).toBeVisible();
  await expect(page.getByText('Stärken')).toBeVisible();
  await page.goto('/#/');
  await expect(page.getByText('Letzte Prüfung')).toBeVisible();
});

test('Klausurtraining: Material und Teilaufgaben', async ({ page }) => {
  await page.goto('/#/klausur');
  await page.getByRole('link', { name: /Muskeldystrophie Typ Duchenne/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Muskeldystrophie Typ Duchenne' })).toBeVisible();
  await expect(page.getByText('Teilaufgabe 1 von 4')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
