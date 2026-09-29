import type { ComponentType } from 'react';
import type { Src, WidgetId } from '../content/types';
import { SourceTag } from '../ui/Provenance';
import { Chromatin, Griffith, Meselson, ReplicationFork, Ribosome, Taylor } from './molecular';
import { GelFvl, Pcr, Sanger, TwinsCurve } from './methods';
import { BeadleTatum, CodonTable, MutationLab, Translator } from './code';
import { GelDuchenne, GelHuntington, PedigreeMethod } from './human';

export interface WidgetProps {
  /** hervorgehobene Markierung (Nummer oder Kurzname, z. B. "P") */
  highlight?: string;
  /** Beschriftungsaufgabe: nur Nummern zeigen, keine Namen */
  labelMode?: boolean;
  /** kompakte Darstellung (z. B. in Fragen) */
  compact?: boolean;
}

interface WidgetDef {
  title: string;
  src: Src[];
  component: ComponentType<WidgetProps>;
}

export const WIDGETS: Record<WidgetId, WidgetDef> = {
  griffith: { title: 'Griffiths Versuche', src: [{ pdf: 2, note: 'Abb. 2' }], component: Griffith },
  chromatin: { title: 'Verpackung der DNA', src: [{ pdf: 3 }], component: Chromatin },
  meselson: { title: 'Meselson-Stahl-Experiment', src: [{ pdf: 4, note: 'Material A' }], component: Meselson },
  'replication-fork': { title: 'Replikationsgabel', src: [{ pdf: 5 }], component: ReplicationFork },
  taylor: { title: 'Taylor-Experiment', src: [{ pdf: 5, note: 'Material B' }], component: Taylor },
  pcr: { title: 'PCR-Zyklus', src: [{ pdf: 6 }], component: Pcr },
  'gel-fvl': { title: 'Gel: Faktor-V-Leiden', src: [{ pdf: 7, note: 'Material A' }], component: GelFvl },
  sanger: { title: 'Kettenabbruchmethode nach Sanger', src: [{ pdf: 8 }], component: Sanger },
  'beadle-tatum': { title: 'Mangelmutanten von Neurospora', src: [{ pdf: 9 }], component: BeadleTatum },
  'codon-table': { title: 'Codesonne als Tabelle', src: [{ pdf: 10, note: 'Abb. 5' }], component: CodonTable },
  translator: { title: 'Übersetzer: DNA → mRNA → Protein', src: [{ pdf: 10, note: 'Abb. 5' }], component: Translator },
  ribosome: { title: 'Ribosom bei der Translation', src: [{ pdf: 12 }], component: Ribosome },
  'mutation-lab': { title: 'Mutationslabor', src: [{ pdf: 15, note: 'Material A' }], component: MutationLab },
  'twins-curve': { title: 'Schmelzkurven eineiiger Zwillinge', src: [{ pdf: 20, note: 'Material A' }], component: TwinsCurve },
  'pedigree-method': { title: 'Beispiel einer Stammbaumanalyse', src: [{ pdf: 25 }], component: PedigreeMethod },
  'gel-duchenne': { title: 'Muskeldystrophie Duchenne', src: [{ pdf: 25, note: 'Material A' }], component: GelDuchenne },
  'gel-huntington': { title: 'Gentest bei Chorea Huntington', src: [{ pdf: 26, note: 'Material A' }], component: GelHuntington },
};

export function WidgetView({ id, caption, highlight, labelMode, compact }: WidgetProps & { id: WidgetId; caption?: string }) {
  const def = WIDGETS[id];
  const C = def.component;
  return (
    <figure className={`widget ${compact ? 'widget-compact' : ''}`}>
      <div className="widget-head">
        <span className="widget-title">{labelMode ? 'Abbildung beschriften' : def.title}</span>
        <SourceTag src={def.src} />
      </div>
      <C highlight={highlight} labelMode={labelMode} compact={compact} />
      {caption && <figcaption className="widget-caption">{caption}</figcaption>}
    </figure>
  );
}
