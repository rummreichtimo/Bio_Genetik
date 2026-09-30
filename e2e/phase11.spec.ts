import { expect, test } from '@playwright/test';
import { startLearned } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('Neu: Start führt ins Lernen, Quiz verlangt erst Lernen', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'DNA – Trägerin der Erbinformation', level: 2 })).toBeVisible();
  await expect(page.getByText('Hier beginnt dein Lernweg')).toBeVisible();
  await page.goto('/#/quiz?sub=pcr');
  await expect(page.getByRole('heading', { level: 1, name: 'Erst lernen, dann üben' })).toBeVisible();
  await page.goto('/#/karten/lernen/neu');
  await expect(page.getByText('Noch keine Karten freigeschaltet')).toBeVisible();
});

test('Ein gelernter Abschnitt schaltet Fragen frei – mit Nachlesen', async ({ page }) => {
  await page.getByRole('link', { name: /Mit dem ersten Thema beginnen/ }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Entdeckung der Nucleinsäuren' })).toBeVisible();
  const next = page.getByRole('button', { name: /Verstanden – weiter/ });
  await next.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await next.click();
  await page.goto('/#/quiz');
  await expect(page.getByText(/[1-9]\d* passende Fragen/)).toBeVisible();
  await page.getByRole('button', { name: /Quiz starten/ }).click();
  const read = page.getByRole('button', { name: /Nachlesen: Entdeckung der Nucleinsäuren/ });
  await read.click();
  await expect(page.getByRole('region', { name: /Erklärung: Entdeckung der Nucleinsäuren/ })).toBeVisible();
  await page.goto('/#/');
  await expect(page.getByText('Weiterlernen', { exact: true }).first()).toBeVisible();
});

test('Lernpfad zeigt alle Themen in Reihenfolge; Experimente stehen im Lernmodus', async ({ page }) => {
  await page.goto('/#/lernpfad');
  await expect(page.getByRole('heading', { level: 1, name: 'Dein Lernpfad' })).toBeVisible();
  await expect(page.locator('.path-item')).toHaveCount(18);
  await page.goto('/#/lernen/translation?abschnitt=exp-antibiotikum');
  await expect(page.getByRole('heading', { level: 2, name: /Experiment: Wirkort eines Antibiotikums/ })).toBeVisible();
  await expect(page.locator('.block-experiment')).toBeVisible();
});

test('Karteikarte: Rückseite mit Nachlesen', async ({ page }) => {
  await startLearned(page, ['pcr']);
  await page.goto('/#/karten/lernen/sub-pcr');
  await page.getByRole('button', { name: /Umdrehen/ }).click();
  await page.locator('.flashcard-back').getByRole('button', { name: /Nachlesen/ }).click();
  await expect(page.locator('.readup-panel')).toBeVisible();
});
