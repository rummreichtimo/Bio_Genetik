import { expect, test } from '@playwright/test';

test('Freitext: KI-Zweitbewertung über das Backend (simuliert)', async ({ page }) => {
  await page.route('**/api/health', (r) => r.fulfill({ json: { ai: true } }));
  await page.route('**/api/grade', (r) =>
    r.fulfill({
      json: {
        points: [
          { id: 'aa', met: true, note: '' },
          { id: 'hetero', met: true, note: '' },
          { id: 'grund', met: true, note: 'gut begründet' },
          { id: 'traeger', met: false, note: 'Überträger fehlen' },
        ],
        misconception: null,
        feedback: 'Sehr gut erklärt. Ergänze noch, dass Heterozygote Überträger sind.',
      },
    }),
  );
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.goto('/#/einstellungen');
  const toggle = page.getByRole('checkbox', { name: /KI/ }).or(page.getByRole('switch', { name: /KI/ })).first();
  await toggle.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await toggle.check();
  await page.goto('/#/lernen/erbgaenge?abschnitt=rezessiv');
  const q = page.locator('.qcard').filter({ hasText: 'Erkläre, warum Mukoviszidose rezessiv vererbt wird' });
  await q.getByRole('textbox').fill('Wenn beide Allele mutiert sind, gibt es keine Ionenkanäle. Heterozygote sind gesund, weil ein Allel ausreicht.');
  const check = q.getByRole('button', { name: 'Prüfen' });
  await check.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await check.click();
  const ai = q.getByRole('button', { name: /Genauer mit KI prüfen/ });
  await ai.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await ai.click();
  await expect(q.getByText(/KI-Bewertung:/)).toBeVisible();
  await expect(q.getByText('Überträger fehlen', { exact: false })).toBeVisible();
});
