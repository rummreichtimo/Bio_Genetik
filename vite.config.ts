import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Standard-Build: dist/ (mehrere Dateien, für Server/Hosting)
// Single-File-Build (--mode single): dist-single/index.html (alles inline, z. B. für claude.ai)
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: mode === 'single' ? [react(), viteSingleFile()] : [react()],
  build: {
    outDir: mode === 'single' ? 'dist-single' : 'dist',
    chunkSizeWarningLimit: 2000,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
}));
