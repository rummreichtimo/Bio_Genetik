import { expect, test, type Page } from '@playwright/test';

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

async function tap(_page: Page, locator: ReturnType<Page['locator']>) {
  await locator.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await locator.click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('Lernmodus: Frage beantworten, Erklärung sehen, Abschnitt abschließen', async ({ page }) => {
  await page.goto('/#/lernen/replikation?abschnitt=ablauf');
  await expect(page.getByRole('heading', { level: 2, name: 'Ablauf an der Replikationsgabel' })).toBeVisible();
  const q = page.locator('.qcard').filter({ hasText: 'Welches Enzym verknüpft die Okazaki-Fragmente' });
  await tap(page, q.getByRole('radio', { name: /DNA-Ligase/ }));
  await tap(page, q.getByRole('button', { name: 'Prüfen' }));
  await expect(q.getByText('Vollständig richtig')).toBeVisible();
  await tap(page, q.getByRole('button', { name: 'Warum?' }));
  await expect(q.locator('.prov').first()).toBeVisible();
  await noHorizontalOverflow(page);
  await tap(page, page.getByRole('button', { name: /Verstanden – weiter/ }));
  await expect(page.getByRole('heading', { level: 2, name: /Fehlerkorrektur/ })).toBeVisible();
  await expect(page.getByText('1 von 5 erledigt')).toBeVisible();
  // Fortschritt bleibt nach Neuladen erhalten
  await page.waitForTimeout(500);
  await page.goto('/#/thema/replikation');
  await expect(page.getByText('1/5')).toBeVisible();
});

test('Falsche Antwort zeigt die richtige Lösung', async ({ page }) => {
  await page.goto('/#/lernen/replikation?abschnitt=ablauf');
  const q = page.locator('.qcard').filter({ hasText: 'Welches Enzym verknüpft die Okazaki-Fragmente' });
  await tap(page, q.getByRole('radio', { name: /Primase/ }));
  await tap(page, q.getByRole('button', { name: 'Prüfen' }));
  await expect(q.locator('.feedback-head')).toContainText('Falsch');
  await expect(q.getByText(/Richtige Antwort:/)).toBeVisible();
});

test('Freitext wird mit Raster und Musterantwort bewertet', async ({ page }) => {
  await page.goto('/#/lernen/erbgaenge?abschnitt=rezessiv');
  const q = page.locator('.qcard').filter({ hasText: 'Erkläre, warum Mukoviszidose rezessiv vererbt wird' });
  await q.getByRole('textbox').fill('Bei aa gibt es keine funktionierenden Ionenkanäle. Aa ist gesund, weil das nicht mutierte Allel ausreichend funktionsfähige Ionenkanäle codiert. Heterozygote sind Überträger.');
  await tap(page, q.getByRole('button', { name: 'Prüfen' }));
  await expect(q.getByText('Vollständig richtig')).toBeVisible();
  await expect(q.getByText(/Musterantwort/)).toBeVisible();
});

test('Abbildungen: Mutationslabor und Stammbaum reagieren', async ({ page }) => {
  await page.goto('/#/lernen/mutationen?abschnitt=substitution');
  await tap(page, page.getByRole('button', { name: 'Position 9: C' }).first());
  await tap(page, page.getByRole('button', { name: 'T', exact: true }).first());
  await expect(page.getByText(/Nonsense-Mutation/).first()).toBeVisible();
  await page.goto('/#/lernen/erbgaenge?abschnitt=methode');
  await tap(page, page.getByRole('button', { name: 'Person 23' }).first());
  await expect(page.getByText('Person 23 ist gesund – Genotyp Aa oder AA.')).toBeVisible();
  await noHorizontalOverflow(page);
});

test('Experiment Schritt für Schritt aufdecken', async ({ page }) => {
  await page.goto('/#/experimente');
  await page.getByRole('link', { name: /Das Meselson-Stahl-Experiment/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Das Meselson-Stahl-Experiment' })).toBeVisible();
  await tap(page, page.getByRole('button', { name: 'Alles zeigen' }));
  await expect(page.locator('.exp-step-label', { hasText: 'Schlussfolgerung' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fragen zum Experiment' })).toBeVisible();
  await noHorizontalOverflow(page);
});
