import { useId, useState } from 'react';
import { getSection, getSubtopic, type SectionRef } from '../content';
import { Link } from '../app/router';
import { BlockView } from '../ui/Blocks';
import { IconArrowRight, IconBook } from '../ui/icons';

/**
 * „Nachlesen“: zeigt den Lernabschnitt, in dem die Antwort erklärt wird, direkt an Ort und Stelle.
 */
export function ReadUp({ refTo, hint, label = 'Nachlesen' }: { refTo: SectionRef; hint?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const section = getSection(refTo.sub, refTo.section);
  if (!section) return null;
  const sub = getSubtopic(refTo.sub);
  return (
    <div className={`readup ${open ? 'is-open' : ''}`}>
      <div className="readup-bar">
        {hint && <span className="readup-hint">{hint}</span>}
        <button type="button" className="btn btn-soft btn-small" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
          <IconBook width={16} height={16} /> {open ? 'Erklärung schließen' : `${label}: ${section.title}`}
        </button>
      </div>
      {open && (
        <div id={panelId} className="readup-panel stack" role="region" aria-label={`Erklärung: ${section.title}`}>
          <div className="readup-head">
            <span className="eyebrow">{sub?.title} · Lernmodus</span>
            <strong className="readup-title">{section.title}</strong>
          </div>
          {section.blocks.filter((b) => b.kind !== 'check').map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
          <Link to={`/lernen/${refTo.sub}?abschnitt=${refTo.section}`} className="btn btn-ghost btn-small" style={{ justifySelf: 'start' }}>
            Abschnitt im Lernmodus öffnen <IconArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
