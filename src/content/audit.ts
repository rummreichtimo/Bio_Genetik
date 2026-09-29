import { CARDS, LESSONS, QUESTIONS, TERMS, getSubtopic } from './index';
import type { ExternalSource } from './types';

/** Eine Stelle, an der die App über deine PDF hinausgeht. */
export interface ExternalUse {
  sub: string;
  /** wo in der App (z. B. „Lernmodus · Material“) */
  where: string;
  title: string;
  ext: ExternalSource;
  /** Link zur Stelle */
  to: string;
}

/** Sammelt alle als 🌐 gekennzeichneten Ergänzungen – für die Transparenz-Seite „Hinweise zur Quelle“. */
export function externalUses(): ExternalUse[] {
  const out: ExternalUse[] = [];
  for (const l of LESSONS)
    for (const s of l.sections)
      for (const b of s.blocks)
        if (b.kind === 'note' && b.ext)
          out.push({ sub: l.sub, where: `Lernmodus · ${s.title}`, title: b.title, ext: b.ext, to: `/lernen/${l.sub}?abschnitt=${s.id}` });
  for (const t of TERMS)
    if (t.prov === 'ext' && t.ext) out.push({ sub: t.sub, where: 'Fachbegriff', title: t.term, ext: t.ext, to: `/glossar?sub=${t.sub}` });
  for (const c of CARDS)
    if (c.prov === 'ext' && c.ext && !c.id.startsWith('t:'))
      out.push({ sub: c.sub, where: 'Karteikarte', title: c.front, ext: c.ext, to: `/thema/${c.sub}` });
  for (const q of QUESTIONS)
    for (const e of q.why)
      if (e.prov === 'ext' && e.ext) {
        out.push({ sub: q.sub, where: 'Erklärung zu einer Frage', title: q.prompt, ext: e.ext, to: `/thema/${q.sub}` });
        break;
      }
  // nach Unterthema in Buchreihenfolge
  const order = (sub: string) => (getSubtopic(sub) ? LESSONS.findIndex((l) => l.sub === sub) : 999);
  return out.sort((a, b) => order(a.sub) - order(b.sub));
}
