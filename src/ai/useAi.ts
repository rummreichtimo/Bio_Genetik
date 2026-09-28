import { useEffect, useState } from 'react';

export type AiStatus = 'checking' | 'claude' | 'server' | 'unavailable';

let cached: Promise<AiStatus> | null = null;

/**
 * Prüft, ob eine KI-Bewertung verfügbar ist:
 *  - 'claude': App läuft in claude.ai → Bewertung über dein eigenes Claude-Konto (kein API-Key nötig)
 *  - 'server': eigenes Backend mit API-Key in einer Umgebungsvariable (/api/health meldet ai: true)
 *  - 'unavailable': nur Offline-Bewertung
 */
export function detectAi(): Promise<AiStatus> {
  if (cached) return cached;
  cached = (async () => {
    try {
      if (typeof window !== 'undefined' && window.claude && typeof window.claude.use === 'function') {
        const sample = await window.claude.use('sample');
        if (sample) return 'claude';
        return 'unavailable';
      }
    } catch {
      /* weiter mit Server-Prüfung */
    }
    try {
      const ctl = new AbortController();
      const t = window.setTimeout(() => ctl.abort(), 2500);
      const res = await fetch('./api/health', { signal: ctl.signal, headers: { accept: 'application/json' } });
      window.clearTimeout(t);
      if (res.ok) {
        const data = (await res.json()) as { ai?: boolean };
        if (data.ai) return 'server';
      }
    } catch {
      /* kein Backend */
    }
    return 'unavailable';
  })();
  return cached;
}

const DESCRIPTIONS: Record<AiStatus, string> = {
  checking: 'Verfügbarkeit wird geprüft …',
  claude:
    'Verfügbar über dein claude.ai-Konto. Beim ersten Mal fragt claude.ai nach deiner Erlaubnis; die Nutzung zählt zu deinem Claude-Kontingent.',
  server: 'Verfügbar über das Backend dieser App. Der API-Schlüssel liegt nur auf dem Server, nie im Browser.',
  unavailable:
    'Nicht verfügbar. Die Offline-Bewertung funktioniert trotzdem. Für KI-Bewertung: App mit Backend starten (siehe README) oder die claude.ai-Version nutzen.',
};

export function useAi(): { status: AiStatus; description: string } {
  const [status, setStatus] = useState<AiStatus>('checking');
  useEffect(() => {
    let alive = true;
    void detectAi().then((s) => {
      if (alive) setStatus(s);
    });
    return () => {
      alive = false;
    };
  }, []);
  return { status, description: DESCRIPTIONS[status] };
}
