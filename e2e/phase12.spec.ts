import { expect, test } from '@playwright/test';

test('Suche → bestes Ergebnis → Bildgeschichte zur DNA-Replikation', async ({ page, isMobile }, info) => {
  await page.goto('/');
  if (info.project.name === 'desktop') {
    await page.getByRole('searchbox', { name: 'Themen durchsuchen' }).fill('DNA Replikation');
    await page.keyboard.press('Enter');
  } else {
    await page.getByRole('link', { name: 'Suchen' }).click();
    await page.getByRole('searchbox', { name: 'Suchbegriff' }).fill('DNA Replikation');
  }
  void isMobile;
  const best = page.getByRole('region', { name: 'Bestes Ergebnis' });
  await expect(best.getByRole('heading', { name: 'Replikation der DNA' })).toBeVisible();
  await best.getByRole('link', { name: /Anschaulich erklärt/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'DNA-Replikation' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Ausgangspunkt: die Doppelhelix' })).toBeVisible();
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Das Prinzip: semikonservativ' })).toBeVisible();
  await page.getByRole('button', { name: /Bild 8: Folgestrang/ }).click();
  await expect(page.getByRole('img', { name: /Okazaki-Fragmente/ })).toBeVisible();
  await page.getByRole('button', { name: /Bild 12/ }).click();
  await expect(page.getByRole('link', { name: /Im Lernmodus vertiefen/ })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('Themenseite und Lernmodus verweisen auf die Bildgeschichte', async ({ page }) => {
  await page.goto('/#/thema/replikation');
  await expect(page.getByRole('link', { name: /Anschaulich erklärt/ })).toBeVisible();
  await page.goto('/#/lernen/replikation');
  await page.getByRole('link', { name: /Erst den Überblick/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'DNA-Replikation' })).toBeVisible();
});
