import { useState } from 'react';
import type { WidgetProps } from './index';
import { Segmented, WidgetNote } from './common';

// ---------------------------------------------------------------------------
// Allgemeiner Stammbaum
// ---------------------------------------------------------------------------

interface Person {
  id: string;
  sex: 'm' | 'f';
  aff?: boolean;
  unknown?: boolean;
  x: number;
  y: number;
  /** Beschriftung (Nummer); ohne Beschriftung keine Auswahl */
  n?: string;
}
interface Family {
  parents: [string, string];
  children: string[];
}

function Pedigree({ people, families, selected, onSelect, width, height, label }: {
  people: Person[];
  families: Family[];
  selected?: string | null;
  onSelect?: (id: string) => void;
  width: number;
  height: number;
  label: string;
}) {
  const P = new Map(people.map((p) => [p.id, p]));
  const S = 13;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="wsvg pedigree" role={onSelect ? 'group' : 'img'} aria-label={label}>
      {families.map((f, i) => {
        const a = P.get(f.parents[0])!;
        const b = P.get(f.parents[1])!;
        const mx = (a.x + b.x) / 2;
        const kids = f.children.map((c) => P.get(c)!);
        const barY = kids.length ? kids[0].y - 26 : 0;
        const xs = kids.map((k) => k.x);
        return (
          <g key={i} className="ped-lines">
            <line x1={Math.min(a.x, b.x) + S} x2={Math.max(a.x, b.x) - S} y1={a.y} y2={b.y} />
            {kids.length > 0 && (
              <>
                <line x1={mx} x2={mx} y1={a.y} y2={barY} />
                <line x1={Math.min(mx, ...xs)} x2={Math.max(mx, ...xs)} y1={barY} y2={barY} />
                {kids.map((k) => <line key={k.id} x1={k.x} x2={k.x} y1={barY} y2={k.y - S} />)}
              </>
            )}
          </g>
        );
      })}
      {people.map((p) => {
        const cls = `ped-p ${p.aff ? 'ped-aff' : ''} ${selected === p.id ? 'ped-sel' : ''} ${p.n && onSelect ? 'ped-click' : ''}`;
        const shape = p.sex === 'm' ? <rect x={p.x - S} y={p.y - S} width={2 * S} height={2 * S} rx={3} /> : <circle cx={p.x} cy={p.y} r={S} />;
        const inner = p.unknown ? '?' : p.n;
        const content = (
          <g className={cls}>
            {shape}
            {inner && <text x={p.x} y={p.y + 0.5} textAnchor="middle" dominantBaseline="central" className="ped-n">{inner}</text>}
            {p.unknown && p.n && <text x={p.x} y={p.y + S + 11} textAnchor="middle" className="ped-sub">{p.n}</text>}
          </g>
        );
        if (!p.n || !onSelect) return <g key={p.id}>{content}</g>;
        return (
          <g key={p.id} role="button" tabIndex={0} aria-label={`Person ${p.n}${p.aff ? ', Merkmalsträger' : ''}`} onClick={() => onSelect(p.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(p.id)}>
            {content}
          </g>
        );
      })}
    </svg>
  );
}

function PedLegend() {
  return (
    <div className="ped-legend">
      <span><svg width="16" height="16" aria-hidden="true"><rect x="2" y="2" width="12" height="12" className="ped-key" /></svg> männlich</span>
      <span><svg width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" className="ped-key" /></svg> weiblich</span>
      <span><svg width="16" height="16" aria-hidden="true"><rect x="2" y="2" width="12" height="12" className="ped-key ped-key-aff" /></svg> Merkmalsträger</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Methode Stammbaumanalyse (PDF S. 25)
// ---------------------------------------------------------------------------

const M = (id: string, sex: 'm' | 'f', x: number, y: number, aff = false): Person => ({ id, sex, x, y, aff, n: id });
const METHOD_PEOPLE: Person[] = [
  M('1', 'f', 235, 30, true), M('2', 'm', 285, 30),
  M('3', 'm', 160, 110, true), M('4', 'f', 210, 110), M('5', 'm', 260, 110, true), M('6', 'f', 310, 110, true), M('7', 'm', 360, 110),
  M('8', 'f', 560, 110), M('9', 'm', 610, 110, true),
  M('10', 'm', 100, 200, true), M('11', 'm', 150, 200), M('12', 'f', 200, 200, true), M('13', 'f', 250, 200), M('14', 'm', 300, 200, true), M('15', 'm', 350, 200), M('16', 'f', 400, 200),
  M('17', 'm', 450, 200), M('18', 'f', 500, 200), M('19', 'f', 550, 200), M('20', 'm', 600, 200), M('21', 'f', 650, 200), M('22', 'm', 700, 200),
  M('23', 'f', 350, 290), M('24', 'f', 400, 290, true), M('25', 'm', 450, 290), M('26', 'f', 500, 290),
];
const METHOD_FAMILIES: Family[] = [
  { parents: ['1', '2'], children: ['3', '4', '5', '6', '7'] },
  { parents: ['4', '5'], children: ['10', '11', '12', '13', '14', '15', '16'] },
  { parents: ['8', '9'], children: ['17', '18', '19', '20', '21', '22'] },
  { parents: ['16', '17'], children: ['23', '24', '25', '26'] },
];
const MAY_BE_AA = ['8', '23', '25', '26'];

export function PedigreeMethod({ highlight }: WidgetProps) {
  const [sel, setSel] = useState<string | null>(highlight ?? null);
  const p = METHOD_PEOPLE.find((x) => x.id === sel);
  return (
    <div className="stack-s">
      <div className="scroll-x">
        <Pedigree people={METHOD_PEOPLE} families={METHOD_FAMILIES} selected={sel} onSelect={setSel} width={740} height={320} label="Stammbaum mit 26 Personen, autosomal-rezessiver Erbgang" />
      </div>
      <PedLegend />
      <WidgetNote>
        {p
          ? p.aff
            ? `Person ${p.id} ist Merkmalsträger – Genotyp aa.`
            : MAY_BE_AA.includes(p.id)
              ? `Person ${p.id} ist gesund – Genotyp Aa oder AA.`
              : `Person ${p.id} ist gesund – Genotyp Aa.`
          : 'Tippe eine Person an. Annahme deiner PDF: autosomal-rezessiv, a = mutiertes Allel.'}
      </WidgetNote>
      {p && !p.aff && !MAY_BE_AA.includes(p.id) && (
        <WidgetNote prov="inf">
          {p.id === '16' || p.id === '17'
            ? 'Sie haben ein krankes Kind (24) – beide müssen ein a weitergegeben haben.'
            : p.id === '2'
              ? 'Person 2 hat kranke Kinder – sie müssen von ihm ein a erhalten haben.'
              : 'Mindestens ein Elternteil ist krank (aa) und hat ein a weitergegeben.'}
        </WidgetNote>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Muskeldystrophie Duchenne (PDF S. 25, Material A)
// ---------------------------------------------------------------------------

const D = (id: string, sex: 'm' | 'f', x: number, y: number, aff = false): Person => ({ id, sex, x, y, aff, n: id });
const DUCH_PEOPLE: Person[] = [
  D('1', 'm', 175, 30), D('2', 'f', 275, 30),
  D('3', 'm', 125, 110, true), D('4', 'f', 225, 110), D('5', 'f', 325, 110), D('6', 'm', 425, 110),
  D('7', 'm', 270, 190), D('8', 'f', 340, 190), D('9', 'f', 410, 190), D('10', 'm', 480, 190, true),
];
const DUCH_FAMILIES: Family[] = [
  { parents: ['1', '2'], children: ['3', '4', '5'] },
  { parents: ['5', '6'], children: ['7', '8', '9', '10'] },
];
/** Banden im Autoradiogramm: [Allel 1, Allel 2]; 2 = kräftige (doppelte) Bande */
const DUCH_BANDS: Record<string, [number, number]> = {
  '1': [0, 1], '2': [1, 1], '3': [1, 0], '4': [0, 2], '5': [1, 1], '6': [0, 1], '7': [0, 1], '8': [1, 1], '9': [0, 2], '10': [1, 0],
};
const DUCH_GENO_PED: Record<string, string> = {
  '1': 'XᴬY', '2': 'XᴬXᵃ', '3': 'XᵃY', '4': 'XᴬXᴬ oder XᴬXᵃ', '5': 'XᴬXᵃ', '6': 'XᴬY', '7': 'XᴬY', '8': 'XᴬXᴬ oder XᴬXᵃ', '9': 'XᴬXᴬ oder XᴬXᵃ', '10': 'XᵃY',
};
const DUCH_GENO_GEL: Record<string, string> = { ...DUCH_GENO_PED, '4': 'XᴬXᴬ', '8': 'XᴬXᵃ', '9': 'XᴬXᴬ' };

export function GelDuchenne() {
  const [sel, setSel] = useState<string | null>(null);
  const [view, setView] = useState<'bild' | 'stammbaum' | 'gel'>('bild');
  const ids = Object.keys(DUCH_BANDS);
  return (
    <div className="stack-s">
      <Segmented label="Genotypen zeigen" value={view} onChange={setView} options={[{ value: 'bild', label: 'aus' }, { value: 'stammbaum', label: 'nach Stammbaum' }, { value: 'gel', label: 'mit Autoradiogramm' }]} />
      <div className="scroll-x">
        <Pedigree people={DUCH_PEOPLE} families={DUCH_FAMILIES} selected={sel} onSelect={setSel} width={560} height={215} label="Stammbaum der Familie mit Muskeldystrophie Duchenne, Personen 1 bis 10" />
      </div>
      <div className="scroll-x">
        <svg viewBox="0 0 560 110" className="wsvg" role="img" aria-label="Autoradiogramm: Allel 1 bei den Personen 2, 3, 5, 8 und 10; Allel 2 bei 1, 2, 4, 5, 6, 7, 8 und 9">
          <text x={10} y={50} className="s-small">Allel 1</text>
          <text x={10} y={90} className="s-small">Allel 2</text>
          {ids.map((id, i) => {
            const x = 90 + i * 46;
            const [a1, a2] = DUCH_BANDS[id];
            return (
              <g key={id} className={sel === id ? 'lane-sel' : ''}>
                <text x={x + 15} y={18} className="s-small" textAnchor="middle">{id}</text>
                {a1 > 0 && <rect x={x} y={44} width={30} height={a1 > 1 ? 7 : 4} rx={1} className="s-band" />}
                {a2 > 0 && <rect x={x} y={84} width={30} height={a2 > 1 ? 7 : 4} rx={1} className="s-band" />}
              </g>
            );
          })}
        </svg>
      </div>
      {view !== 'bild' && (
        <div className="geno-grid">
          {ids.map((id) => {
            const g = view === 'gel' ? DUCH_GENO_GEL[id] : DUCH_GENO_PED[id];
            const changed = view === 'gel' && DUCH_GENO_GEL[id] !== DUCH_GENO_PED[id];
            return <span key={id} className={`geno ${changed ? 'geno-new' : ''}`}><strong>{id}</strong> {g}</span>;
          })}
        </div>
      )}
      <WidgetNote>DNA mit Restriktionsenzym geschnitten, in Einzelstränge zerlegt, per Gelelektrophorese getrennt; eine markierte Gensonde zeigt die Allele 1 und 2 als Banden.</WidgetNote>
      {view !== 'bild' && (
        <WidgetNote prov="inf">
          {view === 'stammbaum'
            ? 'Lösung der Stammbaumanalyse (X-chromosomal-rezessiv vermutet): Die Töchter 4, 8 und 9 sind nicht eindeutig.'
            : 'Allel 1 ist das Krankheitsallel: Die kranken Söhne 3 und 10 tragen nur Allel 1. Das Autoradiogramm klärt die Genotypen von 4, 8 und 9 (hervorgehoben).'}
        </WidgetNote>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chorea Huntington (PDF S. 26, Material A)
// ---------------------------------------------------------------------------

const H = (id: string, sex: 'm' | 'f', x: number, y: number, aff = false, extra: Partial<Person> = {}): Person => ({ id, sex, x, y, aff, ...extra });
const HUNT_PEOPLE: Person[] = [
  H('i1', 'm', 200, 26), H('i2', 'f', 260, 26, true),
  H('ii1', 'f', 170, 96), H('ii2', 'f', 260, 96, true), H('ii3', 'm', 320, 96),
  H('iii1', 'm', 240, 166), H('iii2', 'f', 310, 166, true), H('iii3', 'm', 370, 166, true),
  H('p1', 'm', 90, 236, false, { n: '1' }), H('p2', 'f', 150, 236, false, { n: '2', unknown: true }), H('p3', 'f', 230, 236, true, { n: '3' }),
  H('iv3', 'm', 300, 236, true), H('iv4', 'm', 370, 236), H('iv5', 'f', 440, 236), H('iv6', 'm', 510, 236),
  H('p4', 'f', 90, 316, false, { n: '4', unknown: true }), H('p5', 'm', 150, 316, false, { n: '5', unknown: true }),
  H('v1', 'f', 440, 316), H('v2', 'm', 510, 316),
];
const HUNT_FAMILIES: Family[] = [
  { parents: ['i1', 'i2'], children: ['ii1', 'ii2'] },
  { parents: ['ii2', 'ii3'], children: ['iii1', 'iii2'] },
  { parents: ['iii2', 'iii3'], children: ['p2', 'p3', 'iv3', 'iv4', 'iv5'] },
  { parents: ['p1', 'p2'], children: ['p4', 'p5'] },
  { parents: ['iv5', 'iv6'], children: ['v1', 'v2'] },
];
/** CAG-Wiederholungen je Person (aus dem Diagramm abgelesen, Zwischenwerte geschätzt) */
const HUNT_GEL: Record<string, { cag: number[]; thick?: boolean; text: string }> = {
  '1': { cag: [28], thick: true, text: 'Nur Allele unterhalb der Grenze → nicht betroffen (aa).' },
  '2': { cag: [86, 16], text: 'Ein Allel mit 86 Wiederholungen → Trägerin des Huntington-Allels (Aa); sie wird voraussichtlich erkranken.' },
  '3': { cag: [86, 28], text: 'Ein Allel mit 86 Wiederholungen → heterozygot (Aa), erkrankt.' },
  '4': { cag: [28, 18], text: 'Beide Allele unterhalb der Grenze (vom Vater ca. 28, von der Mutter ca. 16–18) → nicht betroffen (aa).' },
  '5': { cag: [28, 18], text: 'Beide Allele unterhalb der Grenze → nicht betroffen (aa).' },
};

export function GelHuntington() {
  const [sel, setSel] = useState<string | null>(null);
  // gestauchte Achse wie in der PDF: großer Abstand unterhalb der Grenze, oberhalb zusammengedrängt
  const cagY = (c: number) => (c >= 37 ? 80 - (c - 37) * (40 / 49) : 80 + (37 - c) * (80 / 21));
  const num = sel ? HUNT_PEOPLE.find((p) => p.id === sel)?.n : undefined;
  return (
    <div className="stack-s">
      <div className="scroll-x">
        <Pedigree people={HUNT_PEOPLE} families={HUNT_FAMILIES} selected={sel} onSelect={setSel} width={560} height={345} label="Stammbaum der Familie mit Chorea Huntington; ratsuchende Frau ist Person 2" />
      </div>
      <p className="faint" style={{ fontSize: 'var(--fs-xs)', margin: 0 }}>Person 2 = ratsuchende Frau (Phänotyp noch unbekannt, „?“); 1 = ihr Mann; 4 und 5 = ihre Kinder; 3 = ihre erkrankte Schwester.</p>
      <div className="scroll-x">
        <svg viewBox="0 0 420 200" className="wsvg wsvg-narrow" role="img" aria-label="Diagramm der CAG-Anzahl für die Personen 1 bis 5">
          <text x={8} y={14} className="s-small">(CAG)ₙ</text>
          {[86, 37, 34, 16].map((c) => (
            <g key={c}>
              <text x={52} y={cagY(c) + 4} className="s-small" textAnchor="end">{c}</text>
              <line x1={56} x2={62} y1={cagY(c)} y2={cagY(c)} className="s-grid" />
            </g>
          ))}
          <line x1={62} x2={410} y1={(cagY(37) + cagY(34)) / 2} y2={(cagY(37) + cagY(34)) / 2} className="s-threshold" />
          <text x={400} y={(cagY(37) + cagY(34)) / 2 - 5} className="s-small" textAnchor="end">Grenze für Allele Nichtbetroffener</text>
          {['1', '2', '3', '4', '5'].map((n, i) => {
            const x = 90 + i * 64;
            const d = HUNT_GEL[n];
            const on = num === n;
            return (
              <g key={n} className={on ? 'lane-sel' : ''} role="button" tabIndex={0} aria-label={`Spur ${n}`} onClick={() => setSel(HUNT_PEOPLE.find((p) => p.n === n)!.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(HUNT_PEOPLE.find((p) => p.n === n)!.id)}>
                <text x={x + 20} y={30} className="s-small" textAnchor="middle">{n}</text>
                {d.cag.map((c, k) => <rect key={k} x={x} y={cagY(c) - (d.thick ? 4 : 2.5)} width={40} height={d.thick ? 8 : 5} rx={1} className="s-band" />)}
              </g>
            );
          })}
        </svg>
      </div>
      <WidgetNote>Mehr als 37 CAG-Wiederholungen: Huntington-Allel. Bei Gesunden 9 bis 35 Wiederholungen.</WidgetNote>
      {num && HUNT_GEL[num] ? <WidgetNote prov="inf">Person {num}: {HUNT_GEL[num].text}</WidgetNote> : <WidgetNote prov="inf">Tippe auf Person 1–5 oder eine Spur, um die Auswertung zu sehen.</WidgetNote>}
    </div>
  );
}
