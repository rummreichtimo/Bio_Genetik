// Hilfsskript: Screenshot einer Seite der laufenden App (z. B. nach `npm run preview`).
// Aufruf: node scripts/screenshot.mjs <url> <datei.png> [breite] [höhe] [light|dark]
import { chromium } from '@playwright/test';

const [, , url, out, w = '1280', h = '900', theme = 'light'] = process.argv;
const executablePath = process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium';
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) }, colorScheme: theme });
await page.goto(url);
await page.waitForTimeout(800);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
