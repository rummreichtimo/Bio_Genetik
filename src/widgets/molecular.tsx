import { useState } from 'react';
import type { WidgetProps } from './index';
import { Marker, Segmented, WidgetNote } from './common';

// ---------------------------------------------------------------------------
// Griffith (PDF S. 2, Abb. 2)
// ---------------------------------------------------------------------------

const GRIFFITH = [
  { inject: 'lebende R-Bakterien', dies: false, note: 'R-Bakterien ohne Kapsel werden vom Immunsystem unschädlich gemacht.' },
  { inject: 'lebende S-Bakterien', dies: true, note: 'Die Kapsel schützt die S-Bakterien vor der Immunabwehr.' },
  { inject: 'hitzegetötete S-Bakterien', dies: false, note: 'Tote Bakterien können sich nicht vermehren.' },
  { inject: 'hitzegetötete S- + lebende R-Bakterien', dies: true, note: 'Im Blut fanden sich lebende Bakterien mit Kapsel – R-Bakterien wurden umgewandelt (Transformation).' },
];

export function Griffith() {
  const [guess, setGuess] = useState<(boolean | null)[]>([null, null, null, null]);
  const [shown, setShown] = useState<boolean[]>([false, false, false, false]);
  return (
    <div className="stack-s">
      <div className="griffith">
        {GRIFFITH.map((g, i) => (
          <div key={i} className={`griffith-case ${shown[i] ? (g.dies ? 'is-dead' : 'is-alive') : ''}`}>
            <span className="eyebrow">Ansatz {i + 1}</span>
            <strong>{g.inject}</strong>
            {!shown[i] ? (
              <div className="stack-s">
                <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>Deine Vorhersage:</span>
                <div className="row" style={{ gap: 6 }}>
                  {[false, true].map((d) => (
                    <button key={String(d)} type="button" className="chip" aria-pressed={guess[i] === d} onClick={() => setGuess(guess.map((x, j) => (j === i ? d : x)))}>
                      {d ? 'Maus stirbt' : 'Maus lebt'}
                    </button>
                  ))}
                </div>
                <button type="button" className="btn btn-soft btn-small" onClick={() => setShown(shown.map((x, j) => (j === i ? true : x)))}>
                  Aufdecken
                </button>
              </div>
            ) : (
              <div className="stack-s">
                <span className="griffith-result">{g.dies ? '✝ Maus stirbt' : '✓ Maus lebt'}</span>
                {guess[i] !== null && <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>{guess[i] === g.dies ? 'Richtig vorhergesagt.' : 'Anders als vorhergesagt.'}</span>}
                <span style={{ fontSize: 'var(--fs-sm)' }}>{g.note}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Verpackung der DNA (PDF S. 3)
// ---------------------------------------------------------------------------

const CHROMATIN = [
  { title: 'DNA-Doppelstrang', text: 'Die eukaryotische DNA ist an besondere Proteine, die Histone, gebunden.', factor: '–' },
  { title: 'Nucleosomen (11 nm)', text: 'Der Doppelstrang windet sich jeweils zweimal um einen Histonkomplex (Nucleosom). Perlschnur-Kette, 11 nm dick.', factor: 'Faktor 7' },
  { title: 'Chromatinfaser (30 nm)', text: 'Wechselwirkungen zwischen Nucleosomen verdrillen die Kette zur Chromatinfaser – so liegt das Chromatin in der Interphase vor.', factor: 'Faktor 14' },
  { title: 'Metaphase-Chromosom', text: 'In Pro- und Metaphase wird die Faser durch weitere Auffaltungen auf 1/8000 ihrer ursprünglichen Länge verkürzt.', factor: '1/8000' },
];

export function Chromatin() {
  const [lvl, setLvl] = useState(0);
  const c = CHROMATIN[lvl];
  return (
    <div className="stack-s">
      <svg viewBox="0 0 400 150" className="wsvg" role="img" aria-label={`Verpackungsstufe: ${c.title}`}>
        {lvl === 0 && (
          <g>
            {Array.from({ length: 40 }, (_, i) => {
              const x = 20 + i * 9;
              const y1 = 75 + 22 * Math.sin(i / 2.2);
              const y2 = 75 - 22 * Math.sin(i / 2.2);
              return <line key={i} x1={x} y1={y1} x2={x} y2={y2} className="s-rung" />;
            })}
            <path d={Array.from({ length: 80 }, (_, i) => `${i ? 'L' : 'M'}${20 + i * 4.5},${75 + 22 * Math.sin((i * 4.5) / 9 / 2.2)}`).join(' ')} className="s-strand" />
            <path d={Array.from({ length: 80 }, (_, i) => `${i ? 'L' : 'M'}${20 + i * 4.5},${75 - 22 * Math.sin((i * 4.5) / 9 / 2.2)}`).join(' ')} className="s-strand s-strand-2" />
          </g>
        )}
        {lvl === 1 && (
          <g>
            <path d="M10,75 L390,75" className="s-strand" />
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i}>
                <circle cx={35 + i * 47} cy={75} r={15} className="s-histone" />
                <ellipse cx={35 + i * 47} cy={75} rx={18} ry={8} className="s-wrap" />
              </g>
            ))}
          </g>
        )}
        {lvl === 2 && (
          <g>
            {Array.from({ length: 22 }, (_, i) => (
              <circle key={i} cx={30 + i * 16} cy={75 + 18 * Math.sin(i * 1.3)} r={11} className="s-histone" />
            ))}
          </g>
        )}
        {lvl === 3 && (
          <g>
            <path d="M175,20 C160,20 158,60 170,75 C158,90 160,130 175,130 C190,130 192,90 190,75 C192,60 190,20 175,20 Z" className="s-chromatid" />
            <path d="M225,20 C210,20 208,60 210,75 C208,90 210,130 225,130 C240,130 242,90 230,75 C242,60 240,20 225,20 Z" className="s-chromatid" />
            <rect x={188} y={69} width={24} height={12} rx={6} className="s-centromere" />
            <text x={255} y={78} className="s-small">Centromer</text>
          </g>
        )}
      </svg>
      <label className="field-label" htmlFor="chromatin-range">
        Verpackungsstufe {lvl + 1} von 4: {c.title}
      </label>
      <input id="chromatin-range" type="range" min={0} max={3} step={1} value={lvl} onChange={(e) => setLvl(Number(e.target.value))} className="range" />
      <WidgetNote>
        {c.text} {c.factor !== '–' && <strong>Verkürzung: {c.factor}.</strong>}
      </WidgetNote>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meselson-Stahl (PDF S. 4, Material A)
// ---------------------------------------------------------------------------

type Model = 'semi' | 'konservativ' | 'dispersiv';
type Band = { pos: number; w: number };
/** Position 0 = leicht (¹⁴N), 1 = schwer (¹⁵N) */
const PREDICT: Record<Model, Band[][]> = {
  semi: [[{ pos: 1, w: 1 }], [{ pos: 0.5, w: 1 }], [{ pos: 0.5, w: 0.5 }, { pos: 0, w: 0.5 }]],
  konservativ: [[{ pos: 1, w: 1 }], [{ pos: 1, w: 0.5 }, { pos: 0, w: 0.5 }], [{ pos: 1, w: 0.25 }, { pos: 0, w: 0.75 }]],
  dispersiv: [[{ pos: 1, w: 1 }], [{ pos: 0.5, w: 1 }], [{ pos: 0.25, w: 1 }]],
};
const MODEL_LABEL: Record<Model, string> = { semi: 'semikonservativ', konservativ: 'konservativ', dispersiv: 'dispersiv' };

function Tube({ bands, label }: { bands: Band[]; label: string }) {
  const y = (pos: number) => 130 - pos * 80;
  return (
    <g>
      <rect x={0} y={20} width={60} height={140} rx={10} className="s-tube" />
      {bands.map((b, i) => (
        <rect key={i} x={6} y={y(b.pos) - 4} width={48} height={8} rx={3} className="s-band" style={{ opacity: 0.35 + 0.65 * b.w }} />
      ))}
      {label.split('|').map((t, i) => <text key={i} x={30} y={178 + i * 14} className="s-small" textAnchor="middle">{t}</text>)}
    </g>
  );
}

export function Meselson() {
  const [gen, setGen] = useState(1);
  const [model, setModel] = useState<Model>('semi');
  const measured = PREDICT.semi[gen];
  const predicted = PREDICT[model][gen];
  const same = JSON.stringify(measured.map((b) => b.pos)) === JSON.stringify(predicted.map((b) => b.pos));
  return (
    <div className="stack-s">
      <div className="widget-controls">
        <Segmented label="Replikationen in ¹⁴N" value={gen} onChange={setGen} options={[0, 1, 2].map((g) => ({ value: g, label: String(g) }))} />
        <Segmented label="Modell" value={model} onChange={setModel} options={(['semi', 'konservativ', 'dispersiv'] as Model[]).map((m) => ({ value: m, label: MODEL_LABEL[m] }))} />
      </div>
      <svg viewBox="0 0 360 205" className="wsvg wsvg-narrow" role="img" aria-label={`Nach ${gen} Replikationen: Messung und Vorhersage des ${MODEL_LABEL[model]}en Modells`}>
        <text x={4} y={52} className="s-small">schwer</text>
        <text x={4} y={92} className="s-small">mittel</text>
        <text x={4} y={132} className="s-small">leicht</text>
        <g transform="translate(80,0)"><Tube bands={measured} label="Messung|(PDF)" /></g>
        <g transform="translate(240,0)"><Tube bands={predicted} label={`Vorhersage|${MODEL_LABEL[model]}`} /></g>
      </svg>
      <WidgetNote>
        Gemessen: Start schwere DNA · nach 1 Replikation mittelschwer · nach 2 Replikationen leicht und mittelschwer.
      </WidgetNote>
      <WidgetNote prov="inf">
        {same ? `Das ${MODEL_LABEL[model]}e Modell passt nach ${gen} Replikation(en) zur Messung.` : `Das ${MODEL_LABEL[model]}e Modell sagt ein anderes Bandenmuster voraus – es ist damit widerlegt.`}
        {' '}Die Vorhersagen der Modelle sind abgeleitet.
      </WidgetNote>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Replikationsgabel (PDF S. 5) – Markierungen wie in Frage rep-q7
// ---------------------------------------------------------------------------

const FORK_LABELS: Record<string, string> = {
  '1': 'Helicase',
  '2': 'Leitstrang',
  '3': 'Primase',
  '4': 'RNA-Primer',
  '5': 'Okazaki-Fragment',
  '6': 'DNA-Ligase',
  '7': 'Folgestrang',
};

export function ReplicationFork({ highlight, labelMode }: WidgetProps) {
  const [active, setActive] = useState<string | undefined>(highlight);
  const on = (n: string) => active === n;
  return (
    <div className="stack-s">
      <div className="scroll-x">
        <svg viewBox="0 0 620 300" className="wsvg wsvg-wide" role="img" aria-label="Replikationsgabel mit nummerierten Markierungen 1 bis 7">
        {/* Elternstränge */}
        <path d="M600,140 L420,140 C380,140 340,110 300,70 L20,70" className="s-strand" />
        <path d="M600,160 L420,160 C380,160 340,190 300,230 L20,230" className="s-strand s-strand-2" />
        <text x={608} y={138} className="s-end">5'</text>
        <text x={608} y={170} className="s-end">3'</text>
        <text x={4} y={66} className="s-end">3'</text>
        <text x={4} y={246} className="s-end">5'</text>
        {/* Leitstrang: kontinuierlich zur Gabel hin */}
        <path d="M30,86 L318,86" className="s-new" />
        <text x={24} y={100} className="s-end">5'</text>
        <path d="M318,86 l-10,-5 l0,10 z" className="s-arrow" />
        {/* Folgestrang: Okazaki-Fragmente, von der Gabel weg synthetisiert */}
        <path d="M40,214 L110,214" className="s-new" />
        <path d="M122,214 L200,214" className="s-new" />
        <path d="M212,214 L262,214" className="s-new" />
        <rect x={262} y={209} width={22} height={10} className="s-primer" />
        <path d="M212,214 l10,-5 l0,10 z" className="s-arrow" />
        <circle cx={116} cy={214} r={8} className="s-enzyme s-ligase" />
        {/* Enzyme */}
        <ellipse cx={372} cy={150} rx={20} ry={30} className="s-enzyme s-helicase" />
        <circle cx={300} cy={196} r={12} className="s-enzyme s-primase" />
        <ellipse cx={328} cy={86} rx={16} ry={12} className="s-enzyme s-pol" />
        <ellipse cx={206} cy={214} rx={14} ry={11} className="s-enzyme s-pol" />
        {!labelMode && (
          <>
            <text x={328} y={60} className="s-small" textAnchor="middle">DNA-Polymerase</text>
          </>
        )}
        {/* Markierungen */}
        <g onClick={() => setActive('1')}><Marker x={410} y={110} n="1" label={FORK_LABELS['1']} labelMode={labelMode} active={on('1')} /></g>
        <g onClick={() => setActive('2')}><Marker x={160} y={112} n="2" label={FORK_LABELS['2']} labelMode={labelMode} active={on('2')} /></g>
        <g onClick={() => setActive('3')}><Marker x={330} y={214} n="3" label={FORK_LABELS['3']} labelMode={labelMode} active={on('3')} /></g>
        <g onClick={() => setActive('4')}><Marker x={273} y={190} n="4" label={FORK_LABELS['4']} labelMode={labelMode} active={on('4')} anchor="end" /></g>
        <g onClick={() => setActive('5')}><Marker x={160} y={242} n="5" label={FORK_LABELS['5']} labelMode={labelMode} active={on('5')} /></g>
        <g onClick={() => setActive('6')}><Marker x={116} y={246} n="6" label={FORK_LABELS['6']} labelMode={labelMode} active={on('6')} anchor="end" /></g>
        <g onClick={() => setActive('7')}><Marker x={40} y={276} n="7" label={FORK_LABELS['7']} labelMode={labelMode} active={on('7')} /></g>
      </svg>
      </div>
      {!labelMode && (
        <WidgetNote>
          {active
            ? {
                '1': 'Die Helicase trennt die beiden Einzelstränge – die Replikationsgabel entsteht.',
                '2': 'Der Leitstrang wird kontinuierlich in Richtung der Gabel synthetisiert.',
                '3': 'Die Primase bildet komplementär zu einem kurzen Abschnitt des alten Strangs ein Startermolekül, den Primer.',
                '4': 'Am 3\'-Ende des Primers bindet die DNA-Polymerase komplementär freie Nucleotide.',
                '5': 'Am Folgestrang wird von der Gabel weg synthetisiert – immer wieder entstehen neue Primer und DNA-Stücke, die Okazaki-Fragmente.',
                '6': 'Nachdem die Primer abgebaut und die Lücken gefüllt sind, verknüpft die DNA-Ligase die Okazaki-Fragmente.',
                '7': 'Der Folgestrang wird diskontinuierlich in Stücken synthetisiert.',
              }[active]
            : 'Tippe auf eine Nummer, um die Funktion zu sehen.'}
        </WidgetNote>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Taylor (PDF S. 5, Material B)
// ---------------------------------------------------------------------------

export function Taylor() {
  const [stage, setStage] = useState(1);
  // je Chromatid: [Strang 1 markiert, Strang 2 markiert]
  const chromatids: [boolean, boolean][] = stage === 0 ? [[false, false], [false, false]] : stage === 1 ? [[false, true], [true, false]] : [[false, false], [true, false]];
  return (
    <div className="stack-s">
      <Segmented
        label="Zeitpunkt"
        value={stage}
        onChange={setStage}
        options={[
          { value: 0, label: 'vorher' },
          { value: 1, label: 'nach ³H-Zyklus' },
          { value: 2, label: 'nach weiterem Zyklus' },
        ]}
      />
      <svg viewBox="0 0 400 170" className="wsvg" role="img" aria-label="Metaphase-Chromosom mit markierten und unmarkierten Chromatiden">
        {chromatids.map((c, i) => {
          const x = 110 + i * 60;
          const labeled = c[0] || c[1];
          return (
            <g key={i}>
              <rect x={x} y={20} width={40} height={130} rx={18} className={labeled ? 's-chromatid s-hot' : 's-chromatid'} />
              {labeled && Array.from({ length: 9 }, (_, k) => <circle key={k} cx={x + 12 + (k % 2) * 16} cy={32 + k * 13} r={3} className="s-dot" />)}
              <g transform={`translate(${i === 0 ? 20 : 290},${40})`}>
                <text x={0} y={0} className="s-small">Chromatid {i + 1}</text>
                <line x1={0} y1={14} x2={70} y2={14} className={c[0] ? 's-new' : 's-strand'} />
                <line x1={0} y1={26} x2={70} y2={26} className={c[1] ? 's-new' : 's-strand'} />
                <text x={0} y={46} className="s-small">{labeled ? 'markiert' : 'nicht markiert'}</text>
              </g>
            </g>
          );
        })}
        <rect x={146} y={78} width={28} height={12} rx={6} className="s-centromere" />
      </svg>
      <WidgetNote>
        {stage === 0 && 'Wurzelspitzen der Saubohne wachsen in normalem Medium.'}
        {stage === 1 && 'Nach einem Zellzyklus mit ³H-Thymidin sind beide Chromatiden markiert.'}
        {stage === 2 && 'Nach einem weiteren Zyklus in normalem Thymidin ist je Chromosom nur ein Chromatid markiert.'}
      </WidgetNote>
      {stage > 0 && (
        <WidgetNote prov="inf">
          Rechts: die beiden DNA-Stränge je Chromatid (orange = radioaktiv). Jedes Chromatid enthält einen alten und einen neuen Strang – das passt zur
          semikonservativen Replikation.
        </WidgetNote>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ribosom (PDF S. 12) – Markierungen wie in Frage tl-q3
// ---------------------------------------------------------------------------

const RIBO_LABELS: Record<string, string> = {
  '1': 'große Untereinheit',
  '2': 'kleine Untereinheit',
  '3': 'E-Stelle',
  '4': 'P-Stelle',
  '5': 'A-Stelle',
  '6': 'mRNA',
};
const RIBO_ALIAS: Record<string, string> = { E: '3', P: '4', A: '5' };

export function Ribosome({ highlight, labelMode }: WidgetProps) {
  const [active, setActive] = useState<string | undefined>(highlight ? RIBO_ALIAS[highlight] ?? highlight : undefined);
  const on = (n: string) => active === n;
  const site = (x: number, n: string, name: string) => (
    <g onClick={() => setActive(n)}>
      <rect x={x} y={70} width={70} height={70} rx={8} className={`s-site ${on(n) ? 's-site-on' : ''}`} />
      {!labelMode && <text x={x + 35} y={130} className="s-small" textAnchor="middle">{name}</text>}
    </g>
  );
  return (
    <div className="stack-s">
      <div className="scroll-x">
        <svg viewBox="0 0 520 250" className="wsvg wsvg-wide" role="img" aria-label="Ribosom mit großer und kleiner Untereinheit, E-, P- und A-Stelle und mRNA">
        <path d="M120,150 C100,60 160,20 260,20 C360,20 420,60 400,150 Z" className="s-subunit" />
        <path d="M110,160 C110,150 410,150 410,160 C420,200 380,215 260,215 C140,215 100,200 110,160 Z" className="s-subunit s-subunit-small" />
        {site(155, '3', 'E')}
        {site(225, '4', 'P')}
        {site(295, '5', 'A')}
        <path d="M20,158 L500,158" className="s-mrna" />
        {!labelMode && (
          <>
            <text x={24} y={176} className="s-end">5'</text>
            <text x={490} y={176} className="s-end">3'</text>
          </>
        )}
        <g onClick={() => setActive('1')}><Marker x={260} y={42} n="1" label={RIBO_LABELS['1']} labelMode={labelMode} active={on('1')} /></g>
        <g onClick={() => setActive('2')}><Marker x={260} y={196} n="2" label={RIBO_LABELS['2']} labelMode={labelMode} active={on('2')} /></g>
        <g onClick={() => setActive('3')}><Marker x={190} y={90} n="3" labelMode={labelMode} active={on('3')} /></g>
        <g onClick={() => setActive('4')}><Marker x={260} y={90} n="4" labelMode={labelMode} active={on('4')} /></g>
        <g onClick={() => setActive('5')}><Marker x={330} y={90} n="5" labelMode={labelMode} active={on('5')} /></g>
        <g onClick={() => setActive('6')}><Marker x={470} y={136} n="6" label={RIBO_LABELS['6']} labelMode={labelMode} active={on('6')} anchor="end" /></g>
      </svg>
      </div>
      {!labelMode && (
        <WidgetNote>
          {active
            ? {
                '1': 'Große Untereinheit: verknüpft die Aminosäuren; hier liegen A-, P- und E-Stelle.',
                '2': 'Kleine Untereinheit: bindet und liest die mRNA.',
                '3': 'E-Stelle (Exit-Stelle): Entladene tRNAs verlassen das Ribosom.',
                '4': 'P-Stelle (Peptidyl-tRNA-Bindestelle): Hier wird die Aminosäure mit der wachsenden Polypeptidkette verbunden.',
                '5': 'A-Stelle (Aminoacyl-tRNA-Bindestelle): Ribosomeneingang – hier bindet eine beladene tRNA.',
                '6': 'Die mRNA wird in 5\'→3\'-Richtung abgelesen.',
              }[active]
            : 'Tippe auf eine Nummer oder Bindestelle.'}
        </WidgetNote>
      )}
    </div>
  );
}
