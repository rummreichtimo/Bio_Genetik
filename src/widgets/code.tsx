import { useId, useMemo, useState } from 'react';
import { AA_NAMES, CODE, classifyPoint, clean, codons, transcribe, translate, translateCodon } from '../learning/code';
import { Seq } from '../ui/Markdown';
import { Segmented, WidgetNote } from './common';

const B = ['U', 'C', 'A', 'G'];

// ---------------------------------------------------------------------------
// Codesonne als Tabelle (PDF S. 10, Abb. 5)
// ---------------------------------------------------------------------------

export function CodonTable() {
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const id = useId();
  const lookup = clean(q).replace(/T/g, 'U').slice(0, 3);
  const active = lookup.length === 3 ? lookup : sel;
  return (
    <div className="stack-s">
      <div className="field" style={{ maxWidth: 260 }}>
        <label className="field-label" htmlFor={id}>Codon nachschlagen (mRNA, 5'→3')</label>
        <input id={id} className="input mono" value={q} maxLength={5} placeholder="z. B. AUG" onChange={(e) => setQ(e.target.value)} autoComplete="off" spellCheck={false} />
      </div>
      <div className="scroll-x" tabIndex={0}>
        <table className="codon-table">
          <caption className="sr-only">Genetischer Code: Zeile = erste Base, Spalte = zweite Base, innerhalb der Zelle die dritte Base</caption>
          <thead>
            <tr>
              <th scope="col">1. Base</th>
              {B.map((b) => <th key={b} scope="col">2. Base {b}</th>)}
            </tr>
          </thead>
          <tbody>
            {B.map((b1) => (
              <tr key={b1}>
                <th scope="row" className={`b-${b1}`}>{b1}</th>
                {B.map((b2) => (
                  <td key={b2}>
                    {B.map((b3) => {
                      const c = b1 + b2 + b3;
                      const aa = CODE[c];
                      return (
                        <button key={c} type="button" className={`codon ${active === c ? 'codon-on' : ''} ${aa === 'Stopp' ? 'codon-stop' : ''} ${c === 'AUG' ? 'codon-start' : ''}`} onClick={() => setSel(c)} aria-label={`${c}: ${AA_NAMES[aa]}`}>
                          <Seq value={c} /> <span>{aa}</span>
                        </button>
                      );
                    })}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {active && CODE[active] && (
        <WidgetNote>
          <Seq value={active} /> codiert <strong>{AA_NAMES[CODE[active]]}</strong>
          {active === 'AUG' ? ' – zugleich Startcodon.' : CODE[active] === 'Stopp' ? ' – hier bricht die Translation ab.' : ` (${CODE[active]}).`}
        </WidgetNote>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Übersetzer DNA → mRNA → Aminosäuren
// ---------------------------------------------------------------------------

export function Translator() {
  const [mode, setMode] = useState<'dna' | 'mrna'>('dna');
  const [input, setInput] = useState('TAC TGT ACC TCA ACG GTA CTA GCG CTC');
  const id = useId();
  const mrna = mode === 'dna' ? transcribe(input) : clean(input).replace(/T/g, 'U');
  const aas = translate(mrna);
  const invalid = mode === 'mrna' ? /T/i.test(input) : /U/i.test(input);
  return (
    <div className="stack-s">
      <Segmented label="Eingabe" value={mode} onChange={setMode} options={[{ value: 'dna', label: "codogener DNA-Strang (3'→5')" }, { value: 'mrna', label: "mRNA (5'→3')" }]} />
      <div className="field">
        <label className="field-label" htmlFor={id}>{mode === 'dna' ? "Codogener Strang, 3'→5'" : "mRNA, 5'→3'"}</label>
        <input id={id} className="input mono" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off" spellCheck={false} />
      </div>
      {invalid && <p className="faint" style={{ fontSize: 'var(--fs-xs)' }}>{mode === 'dna' ? 'DNA enthält Thymin statt Uracil.' : 'RNA enthält Uracil statt Thymin.'}</p>}
      <div className="translate-out">
        <div>
          <span className="field-label">mRNA (5'→3')</span>
          <div className="scroll-x" tabIndex={0}><Seq value={codons(mrna).join(' ') || '–'} className="seq-lg" /></div>
        </div>
        <div>
          <span className="field-label">Aminosäuren</span>
          <div className="aa-chain">
            {aas.length ? aas.map((a, i) => <span key={i} className={`aa ${a.aa === 'Stopp' ? 'aa-stop' : ''}`} title={AA_NAMES[a.aa]}>{a.aa}</span>) : <span className="faint">–</span>}
          </div>
        </div>
      </div>
      <WidgetNote>
        Die Codesonne wird von innen nach außen gelesen und gibt die mRNA-Tripletts in 5'→3'-Richtung an. Beispiel: Material A (Mutationen, PDF S. 15).
      </WidgetNote>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mutationslabor (PDF S. 15, Material A)
// ---------------------------------------------------------------------------

const ORIGINAL = 'TACTGTACCTCAACGGTACTAGCGCTC';
const PAIR: Record<string, string> = { A: 'U', T: 'A', G: 'C', C: 'G' };
const KIND_LABEL = { stumm: 'stumme Mutation', missense: 'Missense-Mutation', nonsense: 'Nonsense-Mutation' } as const;

export function MutationLab() {
  const [pos, setPos] = useState<number | null>(null);
  const [seq, setSeq] = useState(ORIGINAL);
  const before = useMemo(() => translate(transcribe(ORIGINAL)), []);
  const after = translate(transcribe(seq));
  const changed = seq !== ORIGINAL;
  const frameshift = seq.length !== ORIGINAL.length;

  let verdict = '';
  if (changed && !frameshift) {
    const i = [...seq].findIndex((b, k) => b !== ORIGINAL[k]);
    const ci = Math.floor(i / 3);
    const kind = classifyPoint(before[ci]?.aa ?? '?', translateCodon(transcribe(seq.slice(ci * 3, ci * 3 + 3))));
    verdict = `Substitution an Position ${i + 1}: Codon ${ci + 1} ${before[ci].codon} → ${transcribe(seq.slice(ci * 3, ci * 3 + 3))} · ${before[ci].aa} → ${translateCodon(transcribe(seq.slice(ci * 3, ci * 3 + 3)))} · ${KIND_LABEL[kind]}`;
  } else if (frameshift) {
    verdict = seq.length < ORIGINAL.length ? 'Deletion: Das Leseraster verschiebt sich ab der Mutation (Rasterschubmutation).' : 'Insertion: Das Leseraster verschiebt sich ab der Mutation (Rasterschubmutation).';
  }

  const substitute = (b: string) => {
    if (pos === null) return;
    const base = ORIGINAL.split('');
    base[pos] = b;
    setSeq(base.join(''));
  };

  return (
    <div className="stack-s">
      <span className="field-label">Codogener Strang (3'→5') – tippe eine Base an</span>
      <div className="mut-strand" role="group" aria-label="Basen des codogenen Strangs">
        {[...seq].map((b, i) => (
          <button key={i} type="button" className={`mut-base b-${b} ${pos === i ? 'is-on' : ''} ${i % 3 === 2 ? 'codon-end' : ''} ${seq === ORIGINAL || frameshift ? '' : b !== ORIGINAL[i] ? 'is-mut' : ''}`} onClick={() => setPos(i)} aria-label={`Position ${i + 1}: ${b}`}>
            {b}
          </button>
        ))}
      </div>
      {pos !== null && (
        <div className="row" style={{ gap: 6 }}>
          <span className="faint" style={{ fontSize: 'var(--fs-sm)' }}>Position {pos + 1} ersetzen durch:</span>
          {['A', 'T', 'G', 'C'].filter((b) => b !== ORIGINAL[pos]).map((b) => (
            <button key={b} type="button" className={`btn btn-small btn-soft b-${b}`} onClick={() => substitute(b)}>{b}</button>
          ))}
          <button type="button" className="btn btn-small btn-ghost" onClick={() => setSeq(ORIGINAL.slice(0, pos) + ORIGINAL.slice(pos + 1))}>Base entfernen</button>
          <button type="button" className="btn btn-small btn-ghost" onClick={() => setSeq(ORIGINAL.slice(0, pos) + 'T' + ORIGINAL.slice(pos))}>T einfügen</button>
          <button type="button" className="btn btn-small btn-ghost" onClick={() => { setSeq(ORIGINAL); setPos(null); }}>Zurücksetzen</button>
        </div>
      )}
      <div className="translate-out">
        <div>
          <span className="field-label">Original</span>
          <div className="aa-chain">{before.map((a, i) => <span key={i} className="aa">{a.aa}</span>)}</div>
        </div>
        <div>
          <span className="field-label">Nach der Mutation</span>
          <div className="aa-chain">{after.map((a, i) => <span key={i} className={`aa ${a.aa === 'Stopp' ? 'aa-stop' : ''} ${before[i]?.aa !== a.aa ? 'aa-changed' : ''}`}>{a.aa}</span>)}</div>
        </div>
      </div>
      {verdict && <WidgetNote prov="inf">{verdict}</WidgetNote>}
      <WidgetNote>
        mRNA-Basen entstehen komplementär zum codogenen Strang ({Object.entries(PAIR).map(([d, r]) => `${d}→${r}`).join(', ')}). Probiere die Beispiele aus deiner PDF: Position 9 (C→T), 12 (A→C), 6 (T→G).
      </WidgetNote>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Beadle & Tatum (PDF S. 9)
// ---------------------------------------------------------------------------

const MEDIA = ['MM', 'MM + Ornithin', 'MM + Citrullin', 'MM + Arginin'];
const STRAINS = [
  { name: 'Wildtyp', grows: [true, true, true, true], block: null },
  { name: 'Typ I', grows: [false, true, true, true], block: 'A' },
  { name: 'Typ II', grows: [false, false, true, true], block: 'B' },
  { name: 'Typ III', grows: [false, false, false, true], block: 'C' },
];

export function BeadleTatum() {
  const [strain, setStrain] = useState(1);
  const [reveal, setReveal] = useState(false);
  const s = STRAINS[strain];
  return (
    <div className="stack-s">
      <Segmented label="Stamm" value={strain} onChange={(v) => { setStrain(v); setReveal(false); }} options={STRAINS.map((x, i) => ({ value: i, label: x.name }))} />
      <div className="plates">
        {MEDIA.map((m, i) => (
          <div key={m} className={`plate ${s.grows[i] ? 'plate-grow' : ''}`}>
            <span className="plate-dish" aria-hidden="true">{s.grows[i] ? '●●●' : ''}</span>
            <span className="plate-label">{m}</span>
            <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>{s.grows[i] ? 'Wachstum' : 'kein Wachstum'}</span>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 520 70" className="wsvg" role="img" aria-label="Genwirkkette: Vorstufe, Enzym A, Ornithin, Enzym B, Citrullin, Enzym C, Arginin">
        {['Vorstufe', 'Ornithin', 'Citrullin', 'Arginin'].map((n, i) => (
          <g key={n}>
            <rect x={i * 140} y={22} width={100} height={30} rx={8} className="s-box" />
            <text x={i * 140 + 50} y={41} className="s-small" textAnchor="middle">{n}</text>
          </g>
        ))}
        {['A', 'B', 'C'].map((e, i) => (
          <g key={e}>
            <line x1={i * 140 + 102} x2={i * 140 + 138} y1={37} y2={37} className={reveal && s.block === e ? 's-blocked' : 's-arrow-line'} />
            <text x={i * 140 + 120} y={16} className="s-small" textAnchor="middle">Enzym {e}</text>
            {reveal && s.block === e && <text x={i * 140 + 120} y={66} className="s-small s-bad" textAnchor="middle">✕ defekt</text>}
          </g>
        ))}
      </svg>
      {s.block && (
        <button type="button" className="btn btn-soft btn-small" onClick={() => setReveal(true)} disabled={reveal}>
          Welches Enzym ist ausgefallen?
        </button>
      )}
      {reveal && s.block && <WidgetNote>Bei {s.name} ist Enzym {s.block} ausgefallen.</WidgetNote>}
      {reveal && s.block && <WidgetNote prov="inf">Eine Mutante wächst, sobald ein Stoff hinter dem blockierten Schritt angeboten wird – so lässt sich die Blockade lokalisieren.</WidgetNote>}
      <WidgetNote>Ein-Gen-ein-Enzym-Hypothese: Jedes Enzym der Kette wird von einem eigenen Gen codiert (Genwirkkette).</WidgetNote>
    </div>
  );
}
