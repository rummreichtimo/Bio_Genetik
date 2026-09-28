import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('Dashboard zeigt Überblick, Themen und Themen-Gel', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: 'Dein Lernstand' })).toBeVisible();
  await expect(page.getByText('Lernserie', { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Deine Themen' })).toBeVisible();
  await expect(page.getByRole('img', { name: /Themen-Gel/ })).toBeVisible();
  for (const t of ['Molekulare Grundlagen', 'Arbeitstechniken', 'Vom Gen zum Genprodukt', 'Genregulation & Epigenetik', 'Gentechnik: CRISPR/Cas', 'Humangenetik']) {
    await expect(page.getByRole('heading', { name: t })).toBeVisible();
  }
  // keine horizontale Scrollleiste
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('Navigation und Dark Mode funktionieren und bleiben gespeichert', async ({ page }) => {
  await page.getByRole('link', { name: 'Einstellungen' }).filter({ visible: true }).first().click();
  await expect(page.getByRole('heading', { level: 1, name: 'Einstellungen' })).toBeVisible();
  await page.getByRole('radio', { name: /Dunkel/ }).click();
  await expect(page.locator('html')).toHaveClass(/force-dark/);
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(12, 17, 32)');
  await page.waitForTimeout(500);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/force-dark/);
  await page.getByRole('radio', { name: /Hell/ }).click();
  await expect(page.locator('html')).toHaveClass(/force-light/);
});

test('Export liefert gültigen Lernstand, Zurücksetzen fragt nach', async ({ page }) => {
  await page.goto('/#/einstellungen');
  await page.getByRole('button', { name: 'Exportieren' }).click();
  const json = await page.locator('#export-text').inputValue();
  expect(JSON.parse(json).v).toBe(1);
  await page.getByRole('button', { name: 'Lernstand zurücksetzen' }).click();
  await expect(page.getByRole('dialog', { name: 'Lernstand wirklich zurücksetzen?' })).toBeVisible();
  await page.getByRole('button', { name: 'Abbrechen' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
