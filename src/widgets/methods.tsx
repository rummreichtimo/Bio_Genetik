import { useState } from 'react';
import { Segmented, WidgetNote } from './common';
import { Seq } from '../ui/Markdown';

// ---------------------------------------------------------------------------
// PCR (PDF S. 6)
// ---------------------------------------------------------------------------

const PCR_STEPS = [
  { name: 'Denaturierung', temp: 95, text: 'Die Wasserstoffbrücken des Doppelstrangs werden getrennt – die DNA liegt in Einzelsträngen vor.' },
  { name: 'Hybridisierung', temp: 60, text: 'Die beiden Primer binden komplementär an je einen der beiden Einzelstränge (ca. 60 °C).' },
  { name: 'Polymerisation', temp: 72, text: 'Die Taq-Polymerase bindet komplementär freie Nucleotide an die Primer – zu beiden Einzelsträngen entsteht ein neuer Strang.' },
];

export function Pcr() {
  const [cycle, setCycle] = useState(1);
  const [step, setStep] = useState(0);
  const s = PCR_STEPS[step];
  const copies = 2 ** (step === 2 ? cycle : cycle - 1);
  const next = () => {
    if (step < 2) setStep(step + 1);
    else if (cycle < 35) {
      setCycle(cycle + 1);
      setStep(0);
    }
  };
  const y = (t: number) => 110 - (t - 50) * 1.8;
  return (
    <div className="stack-s">
      <svg viewBox="0 0 520 200" className="wsvg" role="img" aria-label={`Zyklus ${cycle}, ${s.name} bei ${s.temp} Grad Celsius`}>
        {/* Temperaturverlauf eines Zyklus */}
        <text x={8} y={16} className="s-small">°C</text>
        {[95, 72, 60].map((t) => (
          <g key={t}>
            <line x1={36} x2={220} y1={y(t)} y2={y(t)} className="s-grid" />
            <text x={30} y={y(t) + 4} className="s-small" textAnchor="end">{t}</text>
          </g>
        ))}
        <path d={`M40,${y(95)} L95,${y(95)} L110,${y(60)} L150,${y(60)} L160,${y(72)} L215,${y(72)}`} className="s-curve" />
        <circle cx={[67, 130, 187][step]} cy={y(s.temp)} r={7} className="s-dot-accent" />
        {/* DNA-Schema */}
        <g transform="translate(250,30)">
          {step === 0 && (
            <>
              <line x1={0} y1={30} x2={240} y2={30} className="s-strand" />
              <line x1={0} y1={90} x2={240} y2={90} className="s-strand s-strand-2" />
            </>
          )}
          {step >= 1 && (
            <>
              <line x1={0} y1={30} x2={240} y2={30} className="s-strand" />
              <line x1={0} y1={90} x2={240} y2={90} className="s-strand s-strand-2" />
              <rect x={step === 2 ? 190 : 190} y={40} width={40} height={10} className="s-primer" />
              <rect x={10} y={70} width={40} height={10} className="s-primer" />
              {step === 2 && (
                <>
                  <line x1={40} y1={45} x2={190} y2={45} className="s-new" />
                  <line x1={50} y1={75} x2={200} y2={75} className="s-new" />
                  <path d="M40,45 l10,-5 l0,10 z" className="s-arrow" />
                  <path d="M200,75 l-10,-5 l0,10 z" className="s-arrow" />
                </>
              )}
            </>
          )}
          <text x={120} y={130} className="s-small" textAnchor="middle">{s.name}</text>
        </g>
      </svg>
      <div className="widget-controls">
        <Segmented label="Schritt" value={step} onChange={setStep} options={PCR_STEPS.map((p, i) => ({ value: i, label: `${i + 1} ${p.name}` }))} />
        <div className="row" style={{ gap: 8 }}>
          <span className="num">Zyklus {cycle}</span>
          <button type="button" className="btn btn-soft btn-small" onClick={next}>Nächster Schritt</button>
          <button type="button" className="btn btn-ghost btn-small" onClick={() => { setCycle(Math.min(35, cycle + 5)); setStep(2); }}>+5 Zyklen</button>
          <button type="button" className="btn btn-ghost btn-small" onClick={() => { setCycle(1); setStep(0); }}>Zurück auf 1</button>
        </div>
      </div>
      <WidgetNote>{s.name} · {s.temp === 60 ? 'ca. 60' : s.temp} °C: {s.text}</WidgetNote>
      <WidgetNote prov="inf">
        Theoretische Zahl der DNA-Abschnitte aus einem Ausgangsmolekül: <strong className="num">{copies.toLocaleString('de-DE')}</strong> (Verdopplung pro Zyklus).
        Deine PDF: meist 25–35 Zyklen – Millionen Kopien.
      </WidgetNote>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Gel Faktor-V-Leiden (PDF S. 7, Material A)
// ---------------------------------------------------------------------------

const FVL_LANES = [
  { name: 'Kontrolle', bands: [267], text: 'Ungeschnittenes PCR-Produkt (267 bp).' },
  { name: 'A', bands: [163, 67, 37], text: 'Beide Schnittstellen vorhanden → keine Mutation.' },
  { name: 'B', bands: [200, 163, 67, 37], text: 'Normales und mutiertes Muster zugleich → heterozygot.' },
  { name: 'C', bands: [200, 67], text: 'Schnittstelle fehlt auf beiden Allelen (37 + 163 = 200 bp) → homozygot mutiert.' },
];

function bpY(bp: number) {
  // logarithmische Laufstrecke: kurze Fragmente wandern weiter
  return 40 + (Math.log(300) - Math.log(bp)) * 70;
}

export function GelFvl() {
  const [lane, setLane] = useState<number | null>(null);
  return (
    <div className="stack-s">
      <svg viewBox="0 0 420 250" className="wsvg" role="img" aria-label="Gel mit den Spuren Kontrolle, A, B und C">
        <rect x={70} y={20} width={340} height={220} rx={8} className="s-gel" />
        {[267, 200, 163, 67, 37].map((bp) => (
          <g key={bp}>
            <text x={62} y={bpY(bp) + 4} className="s-small" textAnchor="end">{bp} bp</text>
            <line x1={70} x2={78} y1={bpY(bp)} y2={bpY(bp)} className="s-grid" />
          </g>
        ))}
        {FVL_LANES.map((l, i) => {
          const x = 90 + i * 80;
          return (
            <g key={l.name} className="s-lane" onClick={() => setLane(i)} role="button" tabIndex={0} aria-label={`Spur ${l.name}`} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLane(i)}>
              <rect x={x - 4} y={24} width={68} height={212} className={lane === i ? 's-lane-bg s-lane-on' : 's-lane-bg'} />
              <rect x={x} y={26} width={60} height={8} className="s-well" />
              {l.bands.map((bp) => <rect key={bp} x={x} y={bpY(bp) - 3} width={60} height={6} rx={2} className="s-band" />)}
              <text x={x + 30} y={16} className="s-small" textAnchor="middle">{l.name}</text>
            </g>
          );
        })}
      </svg>
      <WidgetNote>Das 267-bp-Fragment wird normalerweise an zwei Stellen geschnitten: 67, 37 und 163 bp. Tippe auf eine Spur.</WidgetNote>
      {lane !== null && <WidgetNote prov="inf">Spur {FVL_LANES[lane].name}: {FVL_LANES[lane].text}</WidgetNote>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sanger-Sequenzierung (PDF S. 8, Abb. 3)
// ---------------------------------------------------------------------------

const SANGER_NEW = 'AGCTAGC';

export function Sanger() {
  const [read, setRead] = useState(0);
  const lanes = ['A', 'T', 'G', 'C'];
  const y = (len: number) => 210 - len * 24;
  return (
    <div className="stack-s">
      <div className="sanger-seq">
        <span>Matrize: <Seq value="3'-GATTCGATCG-5'" /></span>
        <span>Primer: <Seq value="5'-CTA" /></span>
      </div>
      <svg viewBox="0 0 360 240" className="wsvg wsvg-narrow" role="img" aria-label="Gel mit vier Spuren für ddATP, ddTTP, ddGTP und ddCTP">
        <rect x={40} y={20} width={300} height={210} rx={8} className="s-gel" />
        {lanes.map((b, i) => (
          <g key={b}>
            <text x={80 + i * 70} y={14} className="s-small" textAnchor="middle">dd{b}TP</text>
            {Array.from(SANGER_NEW).map((nb, k) =>
              nb === b ? <rect key={k} x={55 + i * 70} y={y(k + 1) - 4} width={50} height={8} rx={2} className={k < read ? 's-band s-band-read' : 's-band'} /> : null,
            )}
          </g>
        ))}
        <text x={30} y={y(1) + 4} className="s-small" textAnchor="end">kurz</text>
        <text x={30} y={y(7) + 4} className="s-small" textAnchor="end">lang</text>
      </svg>
      <div className="row">
        <button type="button" className="btn btn-soft btn-small" onClick={() => setRead(Math.min(7, read + 1))} disabled={read >= 7}>Nächste Bande ablesen</button>
        <button type="button" className="btn btn-ghost btn-small" onClick={() => setRead(0)}>Neu</button>
        <span className="mono">Gelesen (5'→3'): <Seq value={SANGER_NEW.slice(0, read) || '…'} /></span>
      </div>
      <WidgetNote>
        Man beginnt mit der am weitesten gewanderten Bande (kürzestes Fragment) und liest nach zunehmender Länge in 5'→3'-Richtung – das ergibt die
        komplementäre Sequenz des analysierten Strangs.
      </WidgetNote>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Schmelzkurven Zwillinge (PDF S. 20, Material A)
// ---------------------------------------------------------------------------

export function TwinsCurve() {
  const [show, setShow] = useState<'A' | 'B' | 'beide'>('beide');
  const x = (t: number) => 50 + (t - 50) * 6;
  const yA = (t: number, tm: number) => 190 - 150 / (1 + Math.exp(-(t - tm) / 2.2));
  const path = (tm: number) => Array.from({ length: 51 }, (_, i) => 50 + i).map((t, i) => `${i ? 'L' : 'M'}${x(t)},${yA(t, tm)}`).join(' ');
  return (
    <div className="stack-s">
      <Segmented label="Anzeigen" value={show} onChange={setShow} options={[{ value: 'A', label: 'Zwilling A' }, { value: 'B', label: 'Zwilling B' }, { value: 'beide', label: 'beide' }]} />
      <svg viewBox="0 0 380 230" className="wsvg" role="img" aria-label="Schmelzkurven: Zwilling A mit Schmelzpunkt etwa 70 Grad, Zwilling B etwa 87 Grad">
        <line x1={50} y1={190} x2={355} y2={190} className="s-axis" />
        <line x1={50} y1={30} x2={50} y2={190} className="s-axis" />
        {[50, 60, 70, 80, 90, 100].map((t) => <text key={t} x={x(t)} y={206} className="s-small" textAnchor="middle">{t}</text>)}
        <text x={200} y={224} className="s-small" textAnchor="middle">Temperatur in °C</text>
        <text x={14} y={110} className="s-small" transform="rotate(-90 14 110)" textAnchor="middle">UV-Absorption</text>
        {(show === 'A' || show === 'beide') && (
          <g>
            <path d={path(70)} className="s-curve" />
            <line x1={x(70)} x2={x(70)} y1={115} y2={190} className="s-guide" />
            <text x={x(70) - 4} y={108} className="s-small" textAnchor="end">A: Tₘ ≈ 70 °C</text>
          </g>
        )}
        {(show === 'B' || show === 'beide') && (
          <g>
            <path d={path(87)} className="s-curve s-curve-2" />
            <line x1={x(87)} x2={x(87)} y1={115} y2={190} className="s-guide" />
            <text x={x(87) + 4} y={108} className="s-small">B: Tₘ ≈ 87 °C</text>
          </g>
        )}
      </svg>
      <WidgetNote>Am Schmelzpunkt Tₘ liegt die Hälfte der DNA einzelsträngig vor. Mehr Wasserstoffbrücken → höherer Schmelzpunkt.</WidgetNote>
      <WidgetNote prov="inf">Kurvenform schematisch; die Schmelzpunkte sind aus der Abbildung deiner PDF abgelesen (ca.).</WidgetNote>
    </div>
  );
}
