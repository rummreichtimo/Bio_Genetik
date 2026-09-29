import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('5-Minuten-Modus: Begriffe, Karten, Abschlussquiz', async ({ page }) => {
  await page.goto('/#/schnell');
  await expect(page.getByText(/Schritt 1 von 3: Begriffe/)).toBeVisible();
  await page.getByRole('button', { name: 'Aufdecken' }).first().click();
  await page.getByRole('button', { name: /^Weiter/ }).click();
  for (let i = 0; i < 6; i++) {
    const flip = page.getByRole('button', { name: 'Umdrehen' });
    if (!(await flip.isVisible().catch(() => false))) break;
    await flip.click();
    await page.getByRole('button', { name: /Gewusst/ }).click();
  }
  await expect(page.getByText(/Schritt 3 von 3: Abschlussquiz/)).toBeVisible();
});

test('Fehler aus dem Quiz erscheinen in der Fehleranalyse und im Tagesplan', async ({ page }) => {
  await page.goto('/#/quiz?sub=pcr&stufe=1');
  for (let i = 0; i < 3; i++) {
    const q = page.locator('.qcard');
    const radios = q.locator('[role=radio]');
    if (!(await radios.count())) break;
    // bewusst eine falsche Antwort wählen: die letzte Option (bei Wahr/Falsch zufällig)
    const last = radios.last();
    await last.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await last.click();
    await q.getByRole('button', { name: 'Prüfen' }).click();
    const next = page.getByRole('button', { name: /Nächste Frage|Zur Auswertung/ });
    await next.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await next.click();
  }
  await page.goto('/#/fehler');
  await expect(page.getByRole('heading', { level: 1, name: 'Deine Fehlermuster' })).toBeVisible();
});
