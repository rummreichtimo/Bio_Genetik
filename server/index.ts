/**
 * Optionales Backend für die KI-Bewertung von Freitextantworten.
 *
 *  - Liefert die gebaute App (dist/) aus.
 *  - GET  /api/health → { ai: boolean }
 *  - POST /api/grade  → { questionId, answer } → Bewertung als JSON
 *
 * Sicherheit: Der API-Schlüssel wird NUR aus der Umgebungsvariable ANTHROPIC_API_KEY gelesen
 * (z. B. über eine .env-Datei, die nicht ins Repository gehört). Er gelangt nie in den Browser.
 * Der Prompt wird hier aus den gebündelten Lerninhalten gebaut – der Browser schickt nur die
 * Frage-ID und die Antwort, kann also keinen beliebigen Prompt einschleusen.
 */
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { getQuestion } from '../src/content';
import { AI_GRADE_SCHEMA, buildGradePrompt, MAX_ANSWER_CHARS } from '../src/ai/gradePrompt';

// .env (einfacher Parser, ohne Abhängigkeit) – Werte aus der echten Umgebung haben Vorrang
const envFile = resolve(process.cwd(), '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const PORT = Number(process.env.PORT ?? 8787);
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5-5';
const HAS_KEY = !!(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
const DIST = resolve(process.cwd(), 'dist');
const client = HAS_KEY ? new Anthropic() : null;

// einfache Begrenzung: höchstens 20 Bewertungen pro Minute und IP
const hits = new Map<string, number[]>();
function allowed(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (list.length >= 20) return false;
  list.push(now);
  hits.set(ip, list);
  return true;
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

async function readBody(req: IncomingMessage, limit = 32_000): Promise<string> {
  let size = 0;
  const chunks: Buffer[] = [];
  for await (const c of req) {
    size += (c as Buffer).length;
    if (size > limit) throw new Error('too large');
    chunks.push(c as Buffer);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function grade(req: IncomingMessage, res: ServerResponse) {
  if (!client) return json(res, 503, { error: 'KI-Bewertung ist auf diesem Server nicht eingerichtet.' });
  if (!allowed(req.socket.remoteAddress ?? '?')) return json(res, 429, { error: 'Zu viele Anfragen – bitte kurz warten.' });
  let body: { questionId?: unknown; answer?: unknown };
  try {
    body = JSON.parse(await readBody(req));
  } catch {
    return json(res, 400, { error: 'Ungültige Anfrage.' });
  }
  const q = typeof body.questionId === 'string' ? getQuestion(body.questionId) : undefined;
  const answer = typeof body.answer === 'string' ? body.answer.trim() : '';
  if (!q || q.type !== 'free') return json(res, 400, { error: 'Unbekannte Freitextfrage.' });
  if (!answer || answer.length > MAX_ANSWER_CHARS) return json(res, 400, { error: 'Antwort fehlt oder ist zu lang.' });

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low', format: { type: 'json_schema', schema: AI_GRADE_SCHEMA as unknown as Record<string, unknown> } },
      messages: [{ role: 'user', content: buildGradePrompt(q, answer) }],
    });
    if (response.stop_reason === 'refusal') return json(res, 502, { error: 'Die KI hat die Bewertung abgelehnt. Nutze die Offline-Bewertung.' });
    const text = response.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
    return json(res, 200, JSON.parse(text));
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) return json(res, 429, { error: 'Die KI ist gerade ausgelastet – bitte gleich noch einmal.' });
    if (e instanceof Anthropic.AuthenticationError) return json(res, 503, { error: 'Der API-Schlüssel auf dem Server ist ungültig.' });
    if (e instanceof Anthropic.APIError) return json(res, 502, { error: `KI-Fehler (${e.status ?? '?'}).` });
    return json(res, 500, { error: 'Die KI-Antwort konnte nicht gelesen werden.' });
  }
}

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

async function serveStatic(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? '/', 'http://x');
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  let file = join(DIST, rel);
  if (!file.startsWith(DIST)) {
    res.writeHead(403).end();
    return;
  }
  try {
    if (!(await stat(file)).isFile()) file = join(DIST, 'index.html');
  } catch {
    file = join(DIST, 'index.html');
  }
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404).end('Nicht gefunden – bitte zuerst „npm run build“ ausführen.');
  }
}

createServer((req, res) => {
  const path = (req.url ?? '/').split('?')[0];
  if (path === '/api/health') return json(res, 200, { ai: HAS_KEY });
  if (path === '/api/grade' && req.method === 'POST') return void grade(req, res);
  if (path.startsWith('/api/')) return json(res, 404, { error: 'Unbekannt' });
  return void serveStatic(req, res);
}).listen(PORT, () => {
  console.log(`Genetik-Lernlabor läuft auf http://localhost:${PORT} · KI-Bewertung: ${HAS_KEY ? `an (${MODEL})` : 'aus (kein ANTHROPIC_API_KEY)'}`);
});
