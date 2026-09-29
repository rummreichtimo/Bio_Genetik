import { expect, test, type Page } from '@playwright/test';

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('Themenübersicht zeigt alle Kapitel und filtert nach Status', async ({ page }) => {
  await page.goto('/#/themen');
  await expect(page.getByRole('heading', { level: 1, name: 'Alle Themen' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Humangenetik' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Erbgänge und Stammbaumanalyse/ })).toBeVisible();
  await page.getByRole('button', { name: /Gelernt/ }).click();
  await expect(page.getByText('Keine Themen in dieser Auswahl')).toBeVisible();
  await noHorizontalOverflow(page);
});

test('Themenseite: Selbsteinschätzung wird gespeichert, Quelle und Begriffe sichtbar', async ({ page }) => {
  await page.goto('/#/thema/erbgaenge');
  await expect(page.getByRole('heading', { level: 1, name: 'Erbgänge und Stammbaumanalyse' })).toBeVisible();
  await expect(page.getByText(/PDF S\. 28 \(Buch S\. 294–295\)/)).toBeVisible();
  await expect(page.getByText('hemizygot', { exact: true })).toBeVisible();
  await expect(page.getByText('Stammbaumanalyse: Allelbezeichnung im Gegenbeweis')).toBeVisible();
  const notYet = page.getByRole('button', { name: /noch nicht/ });
  // mittig scrollen, damit die fixierte Navigationsleiste (Handy) den Knopf nicht verdeckt
  await notYet.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await notYet.click();
  await expect(page.getByRole('button', { name: /noch nicht/ })).toHaveAttribute('aria-pressed', 'true');
  await page.waitForTimeout(500);
  await page.reload();
  await expect(page.getByRole('button', { name: /noch nicht/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Wiederholen').first()).toBeVisible();
  await noHorizontalOverflow(page);
});

test('Unbekanntes Thema zeigt einen Hinweis', async ({ page }) => {
  await page.goto('/#/thema/gibtsnicht');
  await expect(page.getByRole('heading', { name: 'Thema nicht gefunden' })).toBeVisible();
});

test('Glossar durchsuchen', async ({ page }) => {
  await page.goto('/#/glossar');
  await expect(page.getByRole('heading', { level: 1, name: 'Fachbegriffe' })).toBeVisible();
  await page.getByLabel('Begriff suchen').fill('okazaki');
  await expect(page.getByText(/^\d+ von \d+ Begriffen$/)).toBeVisible();
  await expect(page.getByText('Okazaki-Fragment', { exact: false }).first()).toBeVisible();
  await noHorizontalOverflow(page);
});

test('Lehrplan-Check und Hinweise zur Quelle', async ({ page }) => {
  await page.goto('/#/lehrplan');
  await expect(page.getByRole('heading', { level: 1, name: 'Was deine PDF abdeckt' })).toBeVisible();
  await expect(page.getByText(/Die Lernenden leiten aus Familienstammbäumen/)).toBeVisible();
  await noHorizontalOverflow(page);
  await page.goto('/#/quellen');
  await expect(page.getByRole('heading', { level: 1, name: 'Hinweise zur Quelle' })).toBeVisible();
  await expect(page.getByText('Zahl der menschlichen Gene')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ergänzungen außerhalb deiner PDF' })).toBeVisible();
  await noHorizontalOverflow(page);
});
