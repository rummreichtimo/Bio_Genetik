import { getExperiment } from '../content';
import type { ExperimentStepKey } from '../content/types';
import { Link } from '../app/router';
import { WidgetView } from '../widgets';
import { IconArrowRight, IconFlask } from './icons';
import { Markdown } from './Markdown';
import { PROV_META, SourceTag } from './Provenance';

export const STEP_LABEL: Record<ExperimentStepKey, string> = {
  frage: 'Fragestellung',
  hypothese: 'Hypothese',
  material: 'Material',
  durchfuehrung: 'Durchführung',
  beobachtung: 'Beobachtung',
  ergebnis: 'Ergebnis',
  schluss: 'Schlussfolgerung',
  methode: 'Methode',
};

/** Experiment als Lernbaustein: alle Schritte sichtbar, zum Durchlesen und Verstehen. */
export function ExperimentBlock({ id, noWidget }: { id: string; noWidget?: boolean }) {
  const e = getExperiment(id);
  if (!e) return null;
  return (
    <div className="block block-experiment stack">
      <div className="exp-block-head">
        <IconFlask aria-hidden="true" />
        <div className="stack-s" style={{ gap: 2 }}>
          <strong>{e.title}</strong>
          {(e.who || e.year) && <span className="muted" style={{ fontSize: 'var(--fs-sm)' }}>{[e.who, e.year].filter(Boolean).join(' · ')}</span>}
        </div>
      </div>
      {e.widget && !noWidget && <WidgetView id={e.widget} compact />}
      <ol className="exp-steps">
        {e.steps.map((s, i) => (
          <li key={i} className={`exp-step exp-${s.key}`}>
            <div className="exp-step-head">
              <span className="exp-step-label">{STEP_LABEL[s.key]}</span>
              <span className={`src-tag ${s.prov === 'pdf' ? '' : PROV_META[s.prov].cls}`}>
                <span aria-hidden="true">{PROV_META[s.prov].icon}</span> {PROV_META[s.prov].label}
              </span>
            </div>
            <Markdown text={s.text} />
          </li>
        ))}
      </ol>
      <div className="row-between">
        <SourceTag src={e.src} />
        <Link to={`/experiment/${e.id}`} className="btn btn-ghost btn-small">
          Selbst durchdenken (Schritt für Schritt) <IconArrowRight />
        </Link>
      </div>
    </div>
  );
}
