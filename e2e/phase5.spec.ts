import { expect, test } from '@playwright/test';
import { startLearned } from './helpers';

test.beforeEach(async ({ page }) => {
  // Quiz, Karten und Prüfung fragen nur Gelerntes ab → alle Themen als gelernt markieren
  await startLearned(page);
});

test('Quiz: filtern, beantworten, Auswertung und Fehleranalyse', async ({ page }) => {
  await page.goto('/#/quiz');
  await expect(page.getByRole('heading', { level: 1, name: 'Fragen üben' })).toBeVisible();
  await page.getByLabel('Thema').selectOption('pcr');
  await page.getByRole('button', { name: 'Wahr/Falsch' }).click();
  await page.getByRole('button', { name: /Single Choice/ }).click();
  await page.getByRole('button', { name: '5 Fragen' }).click();
  await page.getByRole('button', { name: /Quiz starten/ }).click();
  for (let i = 0; i < 5; i++) {
    await expect(page.getByRole('heading', { level: 1, name: `Frage ${i + 1} von 5` })).toBeVisible();
    const first = page.locator('.qcard [role=radio]').first();
    await first.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await first.click();
    await page.getByRole('button', { name: 'Prüfen' }).click();
    const next = page.getByRole('button', { name: /Nächste Frage|Zur Auswertung/ });
    await next.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await next.click();
  }
  await expect(page.getByRole('heading', { level: 1, name: 'Auswertung' })).toBeVisible();
  await page.goto('/#/fehler');
  await expect(page.getByRole('heading', { level: 1, name: 'Deine Fehlermuster' })).toBeVisible();
});

test('Quiz startet direkt mit Thema aus dem Link', async ({ page }) => {
  await page.goto('/#/quiz?sub=erbgaenge&stufe=1');
  await expect(page.getByRole('heading', { level: 1, name: /Frage 1 von/ })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
