import { defineConfig, devices } from '@playwright/test';

// Nutzt das vorinstallierte Chromium, falls vorhanden (sonst Playwrights eigenes).
const executablePath = process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium';

export default defineConfig({
  testDir: 'e2e',
  timeout: 60_000,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    launchOptions: { executablePath },
    locale: 'de-DE',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 860 }, launchOptions: { executablePath } } },
    { name: 'tablet', use: { viewport: { width: 820, height: 1180 }, hasTouch: true, launchOptions: { executablePath } } },
    { name: 'phone', use: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, launchOptions: { executablePath } } },
  ],
  webServer: {
    command: 'npx vite build && npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
