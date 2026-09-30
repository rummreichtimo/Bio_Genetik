import { CHAPTERS, EXPERIMENTS, LESSONS, SUBTOPICS, TERMS, getExperiment, getSubtopic, sectionOfCard } from '../content';
import { blockText, experimentText } from '../content/assemble';
import { EXPLAINERS } from '../explainers';

/**
 * Volltextsuche über Themen, Lernabschnitte, Fachbegriffe, Experimente und Bildgeschichten.
 * Alle Suchwörter müssen vorkommen (Wortanfang, Teilwort ab 4 Zeichen oder 1 Tippfehler bei langen Wörtern).
 */

export type HitKind = 'explainer' | 'topic' | 'section' | 'term' | 'experiment';

export interface SearchDoc {
  kind: HitKind;
  id: string;
  sub: string;
  title: string;
  /** Untertitel, z. B. Thema des Abschnitts */
  context: string;
  text: string;
  to: string;
}

export interface SearchHit extends SearchDoc {
  score: number;
  snippet: string;
}

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/g, (d) => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d)))
    .replace(/[`*_#>|]/g, ' ');
}

const words = (s: string) => normalize(s).split(/[^a-z0-9']+/).filter(Boolean);

/** Umgangssprachliche Wörter → Fachbegriffe der PDF */
const SYNONYMS: Record<string, string[]> = {
  verdopplung: ['replikation'],
  verdoppeln: ['replikation'],
  kopieren: ['replikation', 'pcr'],
  eiweiss: ['protein'],
  eiweisse: ['protein'],
  genschere: ['crispr'],
  schere: ['crispr'],
  erbgut: ['dna'],
  erbinformation: ['dna'],
  dns: ['dna'],
  uebersetzung: ['translation'],
  abschreiben: ['transkription'],
  umschreiben: ['transkription'],
  vererbung: ['erbgang', 'stammbaum'],
  bluter: ['haemophilie'],
  bluterkrankheit: ['haemophilie'],
  gel: ['gelelektrophorese'],
  kettenreaktion: ['pcr'],
};

function stripMd(s: string): string {
  return s.replace(/\*\*|__|`/g, '').replace(/\s+/g, ' ').trim();
}

let DOCS: SearchDoc[] | null = null;

export function searchDocs(): SearchDoc[] {
  if (DOCS) return DOCS;
  const docs: SearchDoc[] = [];
  const chapterOf = (sub: string) => CHAPTERS.find((c) => c.subtopics.includes(sub))?.title ?? '';
  for (const e of EXPLAINERS) {
    const sub = getSubtopic(e.sub);
    docs.push({
      kind: 'explainer',
      id: `x:${e.sub}`,
      sub: e.sub,
      title: `${e.title} – anschaulich erklärt`,
      context: `${e.scenes.length} animierte Bilder · ${sub?.title ?? ''}`,
      text: `${e.lead} ${e.scenes.map((s) => `${s.title} ${s.text}`).join(' ')}`,
      to: `/erklaert/${e.sub}`,
    });
  }
  for (const s of SUBTOPICS) {
    docs.push({ kind: 'topic', id: `s:${s.id}`, sub: s.id, title: s.title, context: chapterOf(s.id), text: s.summary, to: `/thema/${s.id}` });
  }
  for (const l of LESSONS) {
    for (const sec of l.sections) {
      const text = sec.blocks.map((b) => (b.kind === 'experiment' ? experimentText(getExperiment(b.id)!) : blockText(b))).join(' ');
      docs.push({
        kind: 'section',
        id: `l:${l.sub}:${sec.id}`,
        sub: l.sub,
        title: sec.title,
        context: getSubtopic(l.sub)?.title ?? '',
        text,
        to: `/lernen/${l.sub}?abschnitt=${sec.id}`,
      });
    }
  }
  for (const t of TERMS) {
    const ref = sectionOfCard(`t:${t.id}`);
    docs.push({
      kind: 'term',
      id: `t:${t.id}`,
      sub: t.sub,
      title: t.term,
      context: getSubtopic(t.sub)?.title ?? '',
      text: `${t.def} ${t.simple ?? ''}`,
      to: ref ? `/lernen/${ref.sub}?abschnitt=${ref.section}` : `/glossar?sub=${t.sub}`,
    });
  }
  for (const e of EXPERIMENTS) {
    docs.push({ kind: 'experiment', id: `e:${e.id}`, sub: e.sub, title: e.title, context: [e.who, e.year].filter(Boolean).join(' · ') || (getSubtopic(e.sub)?.title ?? ''), text: experimentText(e), to: `/experiment/${e.id}` });
  }
  DOCS = docs;
  return docs;
}

function lev1(a: string, b: string): boolean {
  // höchstens ein Tippfehler (Einfügen, Löschen, Ersetzen, Vertauschen)
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (i === a.length && i === b.length) return true;
  const ra = a.slice(i + 1);
  const rb = b.slice(i + 1);
  return ra === rb || a.slice(i) === b.slice(i + 1) || a.slice(i + 1) === b.slice(i) || (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2));
}

/** Wie gut passt ein Suchwort zu einer Wortliste? 0 = gar nicht */
function matchWord(q: string, list: string[]): number {
  let best = 0;
  for (const w of list) {
    if (w === q) return 3;
    if (w.startsWith(q)) best = Math.max(best, 2.2);
    else if (q.length >= 4 && w.includes(q)) best = Math.max(best, 1.6);
    else if (q.length >= 5 && w.length >= 5 && lev1(q, w.slice(0, Math.max(q.length, Math.min(w.length, q.length + 1))))) best = Math.max(best, 1.2);
  }
  return best;
}

const KIND_BOOST: Record<HitKind, number> = { explainer: 8, topic: 6, section: 1.5, term: 1, experiment: 1 };

function snippet(text: string, terms: string[]): string {
  const clean = stripMd(text);
  const norm = normalize(clean);
  let pos = -1;
  for (const t of terms) {
    const i = norm.indexOf(t);
    if (i >= 0 && (pos < 0 || i < pos)) pos = i;
  }
  const start = Math.max(0, pos - 60);
  const out = clean.slice(start, start + 180);
  return `${start > 0 ? '… ' : ''}${out}${start + 180 < clean.length ? ' …' : ''}`;
}

const cache = new Map<string, { title: string[]; text: string[]; context: string[] }>();

export function search(query: string, limit = 60): SearchHit[] {
  const qs = [...new Set(words(query))].filter((w) => w.length >= 2 || /\d/.test(w));
  if (!qs.length) return [];
  const hits: SearchHit[] = [];
  for (const d of searchDocs()) {
    let c = cache.get(d.id);
    if (!c) {
      c = { title: words(d.title), text: words(d.text), context: words(d.context) };
      cache.set(d.id, c);
    }
    let score = 0;
    let ok = true;
    for (const q of qs) {
      const alts = [q, ...(SYNONYMS[q] ?? [])];
      let s = 0;
      for (const a of alts) {
        const f = a === q ? 1 : 0.8;
        const ti = matchWord(a, c.title) * 4;
        const co = matchWord(a, c.context) * 1.5;
        const te = matchWord(a, c.text);
        s = Math.max(s, f * Math.max(ti, co, te) + f * (ti > 0 ? te * 0.4 : 0));
      }
      if (s === 0) {
        ok = false;
        break;
      }
      score += s;
    }
    if (!ok) continue;
    // alle Suchwörter im Titel → deutlich besser
    if (qs.every((q) => matchWord(q, c!.title) > 0 || (SYNONYMS[q] ?? []).some((a) => matchWord(a, c!.title) > 0))) score *= 1.6;
    score += KIND_BOOST[d.kind];
    hits.push({ ...d, score, snippet: snippet(d.text, qs.flatMap((q) => [q, ...(SYNONYMS[q] ?? [])])) });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
