import type { QFree } from '../content/types';
import { buildGradePrompt, interpretAiGrade, type AiGrade } from './gradePrompt';
import { detectAi } from './useAi';

export class AiUnavailableError extends Error {}

/**
 * KI-Bewertung einer Freitextantwort.
 *  - claude.ai: über die „sample“-Fähigkeit (dein Claude-Konto, kein API-Key im Code)
 *  - eigenes Backend: POST /api/grade – der API-Key bleibt in einer Umgebungsvariable auf dem Server
 */
export async function aiGrade(q: QFree, answer: string, signal?: AbortSignal): Promise<AiGrade> {
  const status = await detectAi();
  if (status === 'claude') {
    const sample = await window.claude!.use('sample');
    if (!sample) throw new AiUnavailableError('KI nicht verfügbar');
    try {
      const raw = await sample.json(buildGradePrompt(q, answer), { signal, modelTier: 'default' });
      return interpretAiGrade(q, raw);
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code === 'not_granted') throw new AiUnavailableError('Du hast die KI-Nutzung in claude.ai nicht erlaubt.');
      if (code === 'rate_limited') throw new Error('Gerade zu viele Anfragen – versuche es gleich noch einmal.');
      throw e instanceof Error ? e : new Error((e as { message?: string }).message ?? 'KI-Bewertung fehlgeschlagen');
    }
  }
  if (status === 'server') {
    const res = await fetch('./api/grade', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ questionId: q.id, answer }),
      signal,
    });
    if (!res.ok) {
      const msg = await res.json().catch(() => ({ error: '' }));
      throw new Error((msg as { error?: string }).error || `KI-Bewertung fehlgeschlagen (${res.status})`);
    }
    return interpretAiGrade(q, await res.json());
  }
  throw new AiUnavailableError('Keine KI verfügbar');
}
