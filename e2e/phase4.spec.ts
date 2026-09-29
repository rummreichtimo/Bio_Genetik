import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('Karteikarten: umdrehen, bewerten, nicht gewusste Karte kommt wieder', async ({ page }) => {
  await page.goto('/#/karten');
  await expect(page.getByRole('heading', { level: 1, name: 'Wiederholen mit System' })).toBeVisible();
  await page.getByRole('link', { name: /Neue Karten lernen/ }).click();
  await expect(page.getByText(/Karte 1 von 25/)).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.locator('.flashcard-back')).toBeVisible();
  await page.keyboard.press('1');
  await expect(page.getByText(/Karte 2 von 25/)).toBeVisible();
  await page.getByRole('button', { name: /Umdrehen/ }).click();
  await page.getByRole('button', { name: /Nicht gewusst/ }).click();
  // nicht gewusste Karte wird in die Runde zurückgelegt
  await expect(page.getByText(/Karte 3 von 26/)).toBeVisible();
  await page.waitForTimeout(500);
  await page.goto('/#/karten');
  await expect(page.locator('.cards-hero-stats')).toContainText('1fällig');
  await expect(page.locator('.cards-hero-stats')).toContainText('1später wieder');
});

test('Karteikarten eines Themas mit Abbildung', async ({ page }) => {
  await page.goto('/#/karten/lernen/sub-translation');
  await expect(page.getByRole('heading', { level: 1, name: 'Translation bei Prokaryoten' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
