import { p } from '../content/helpers';
import { Arrow, BaseBox, COMP, Enzyme, Label, W, baseCls, clamp, ease, lerp, seg, type Explainer } from './kit';

// ---------------------------------------------------------------------------
// Replikationsgabel (gemeinsame Zeichnung für mehrere Szenen)
// ---------------------------------------------------------------------------

/** Basenfolge des oberen Elternstrangs (links 3', rechts 5') */
const TOP = 'ATGCGTACCGATTGCAGTCCATGGACTTAGCGATCCGTATGCAAT';
const STEP = 14;
const X0 = 26;
const xs = Array.from({ length: 43 }, (_, i) => X0 + STEP * i);

const Y_TOP = 70; // oberer Elternstrang (Arm)
const Y_LEAD = 94; // Leitstrang
const Y_LAG = 226; // Folgestrang
const Y_BOT = 250; // unterer Elternstrang (Arm)
const Y_DT = 140; // Doppelstrang oben
const Y_DB = 180; // Doppelstrang unten

type Range = [number, number];
interface Frag {
  /** DNA-Abschnitt (Okazaki-Fragment) */
  dna?: Range;
  /** Primer (am 5'-Ende, rechts) */
  primer?: Range;
  /** Primer schon durch DNA ersetzt (0 … 1) */
  replaced?: number;
}

interface ForkState {
  xf: number;
  lead?: Range;
  leadPrimer?: Range;
  leadReplaced?: number;
  frags?: Frag[];
  helicase?: number;
  polLead?: number | null;
  polLag?: number | null;
  primase?: { x: number; o: number } | null;
  ligase?: { x: number; o: number }[];
  /** Lücken zwischen Fragmenten geschlossen (0 … 1) */
  sealed?: number;
  labels?: boolean;
}

const inside = (x: number, r?: Range) => !!r && x >= r[0] - 4 && x <= r[1] + 4;

function Fork(s: ForkState) {
  const { xf } = s;
  const straight = xf - 82;
  const topPath = `M620,${Y_DT} H${xf} C${xf - 40},${Y_DT} ${xf - 38},${Y_TOP} ${xf - 78},${Y_TOP} H20`;
  const botPath = `M620,${Y_DB} H${xf} C${xf - 40},${Y_DB} ${xf - 38},${Y_BOT} ${xf - 78},${Y_BOT} H20`;
  const leadCover = (x: number) => inside(x, s.lead) || inside(x, s.leadPrimer);
  const lagCover = (x: number) => (s.frags ?? []).some((f) => inside(x, f.dna) || inside(x, f.primer));
  const rep = s.leadReplaced ?? 0;
  const sealed = s.sealed ?? 0;
  return (
    <g>
      {/* Basenpaare im noch geschlossenen Doppelstrang */}
      {xs.map((x, i) =>
        x > xf + 6 ? (
          <g key={`d${i}`}>
            <line x1={x} x2={x} y1={Y_DT + 3} y2={(Y_DT + Y_DB) / 2} className={`xr ${baseCls(TOP[i])}`} />
            <line x1={x} x2={x} y1={(Y_DT + Y_DB) / 2} y2={Y_DB - 3} className={`xr ${baseCls(COMP[TOP[i]])}`} />
          </g>
        ) : null,
      )}
      {/* freie Basen bzw. neue Basenpaare an den Armen */}
      {xs.map((x, i) =>
        x < straight ? (
          <g key={`a${i}`}>
            {leadCover(x) ? (
              <>
                <line x1={x} x2={x} y1={Y_TOP + 3} y2={(Y_TOP + Y_LEAD) / 2} className={`xr ${baseCls(TOP[i])}`} />
                <line x1={x} x2={x} y1={(Y_TOP + Y_LEAD) / 2} y2={Y_LEAD - 3} className={`xr ${baseCls(COMP[TOP[i]])}`} />
              </>
            ) : (
              <line x1={x} x2={x} y1={Y_TOP + 3} y2={Y_TOP + 11} className={`xr ${baseCls(TOP[i])}`} />
            )}
            {lagCover(x) ? (
              <>
                <line x1={x} x2={x} y1={Y_BOT - 3} y2={(Y_BOT + Y_LAG) / 2} className={`xr ${baseCls(COMP[TOP[i]])}`} />
                <line x1={x} x2={x} y1={(Y_BOT + Y_LAG) / 2} y2={Y_LAG + 3} className={`xr ${baseCls(TOP[i])}`} />
              </>
            ) : (
              <line x1={x} x2={x} y1={Y_BOT - 3} y2={Y_BOT - 11} className={`xr ${baseCls(COMP[TOP[i]])}`} />
            )}
          </g>
        ) : null,
      )}
      {/* Elternstränge */}
      <path d={topPath} className="xs-old" />
      <path d={botPath} className="xs-old" />
      <Label x={626} y={Y_DT + 5} size="s" tone="muted">5'</Label>
      <Label x={626} y={Y_DB + 5} size="s" tone="muted">3'</Label>
      <Label x={14} y={Y_TOP + 5} size="s" tone="muted" anchor="end">3'</Label>
      <Label x={14} y={Y_BOT + 5} size="s" tone="muted" anchor="end">5'</Label>

      {/* Leitstrang */}
      {s.leadPrimer && (
        <>
          <line x1={s.leadPrimer[0]} x2={s.leadPrimer[1]} y1={Y_LEAD} y2={Y_LEAD} className="xs-primer" opacity={1 - rep} />
          <line x1={s.leadPrimer[0]} x2={s.leadPrimer[1]} y1={Y_LEAD} y2={Y_LEAD} className="xs-new" opacity={rep} />
        </>
      )}
      {s.lead && s.lead[1] > s.lead[0] + 1 && (
        <>
          <line x1={s.lead[0]} x2={s.lead[1]} y1={Y_LEAD} y2={Y_LEAD} className="xs-new" />
          {s.polLead != null && <path d={`M${s.lead[1] + 8},${Y_LEAD} l-9,-6 l0,12 z`} className="xs-new-head" />}
        </>
      )}

      {/* Folgestrang: Okazaki-Fragmente */}
      {(s.frags ?? []).map((f, k) => (
        <g key={k}>
          {f.primer && (
            <>
              <line x1={f.primer[0]} x2={f.primer[1]} y1={Y_LAG} y2={Y_LAG} className="xs-primer" opacity={1 - (f.replaced ?? 0)} />
              <line x1={f.primer[0]} x2={f.primer[1]} y1={Y_LAG} y2={Y_LAG} className="xs-new" opacity={f.replaced ?? 0} />
            </>
          )}
          {f.dna && f.dna[1] > f.dna[0] + 1 && <line x1={f.dna[0]} x2={f.dna[1] + (k > 0 ? 0 : 0)} y1={Y_LAG} y2={Y_LAG} className="xs-new" />}
        </g>
      ))}
      {/* Lücken schließen */}
      {sealed > 0 && s.frags && s.frags.length > 1 && (
        <line x1={s.frags[0].dna?.[0] ?? 0} x2={s.frags[s.frags.length - 1].primer?.[1] ?? 0} y1={Y_LAG} y2={Y_LAG} className="xs-new" opacity={sealed} />
      )}

      {/* Enzyme */}
      {s.helicase != null && (
        <g opacity={s.helicase}>
          <ellipse cx={xf + 4} cy={(Y_DT + Y_DB) / 2} rx={18} ry={32} className="xe xe-helicase" />
          <Label x={Math.min(xf + 26, 556)} y={Y_DT - 26}>Helicase</Label>
        </g>
      )}
      {s.primase && <Enzyme x={s.primase.x} y={Y_LAG - 34} w={84} h={28} name="Primase" kind="primase" opacity={s.primase.o} />}
      {s.polLead != null && s.lead && <Enzyme x={s.lead[1] - 16} y={Y_LEAD + 30} w={96} h={28} name="Polymerase" kind="pol" opacity={s.polLead} />}
      {s.polLag != null && <Enzyme x={s.polLag + 30} y={Y_LAG - 32} w={96} h={28} name="Polymerase" kind="pol" />}
      {(s.ligase ?? []).map((l, k) => (
        <g key={k} opacity={l.o}>
          <circle cx={l.x} cy={Y_LAG} r={13} className="xe xe-ligase" />
          <text x={l.x} y={Y_LAG + 1} textAnchor="middle" dominantBaseline="central" className="xe-t xe-t-s">L</text>
        </g>
      ))}
    </g>
  );
}

/** Freie Nucleotide, die zur Polymerase schwimmen */
function FreeNts({ x, y, t, dir = 1 }: { x: number; y: number; t: number; dir?: 1 | -1 }) {
  const bases = ['A', 'G', 'C', 'T', 'G'];
  return (
    <g>
      {bases.map((b, i) => {
        const ph = (t * 3 + i * 0.21) % 1;
        const cx = x + dir * (18 + i * 16) - dir * ph * 10;
        const cy = y + 26 + ((i * 13) % 20) - ph * 8;
        return <circle key={i} cx={cx} cy={cy} r={4.5} className={`xn ${baseCls(b)}`} opacity={0.35 + 0.65 * (1 - ph)} />;
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Szenen
// ---------------------------------------------------------------------------

function Helix(t: number) {
  const N = 40;
  const pts = Array.from({ length: N + 1 }, (_, i) => 20 + (i * 600) / N);
  const amp = 62;
  const cy = 150;
  const y1 = (x: number) => cy - amp * Math.cos((2 * Math.PI * (x - 20)) / 300);
  const y2 = (x: number) => cy + amp * Math.cos((2 * Math.PI * (x - 20)) / 300);
  const shown = 20 + 600 * ease(clamp(t * 1.3));
  const path = (f: (x: number) => number) => pts.filter((x) => x <= shown).map((x, i) => `${i ? 'L' : 'M'}${x},${f(x)}`).join(' ');
  const rungX = Array.from({ length: 28 }, (_, i) => 30 + i * 21.5);
  return (
    <g>
      {rungX.map((x, i) => {
        const a = y1(x);
        const b = y2(x);
        if (Math.abs(a - b) < 14 || x > shown) return null;
        const m = (a + b) / 2;
        const base = TOP[i];
        return (
          <g key={i} opacity={seg(t, 0.2 + i * 0.015, 0.5 + i * 0.015)}>
            <line x1={x} x2={x} y1={a} y2={m} className={`xr xr-w ${baseCls(base)}`} />
            <line x1={x} x2={x} y1={m} y2={b} className={`xr xr-w ${baseCls(COMP[base])}`} />
          </g>
        );
      })}
      <path d={path(y1)} className="xs-old" />
      <path d={path(y2)} className="xs-old xs-old-2" />
      <g opacity={seg(t, 0.55, 0.8)}>
        <Label x={14} y={y1(20) + 5} anchor="end" size="s" tone="muted">5'</Label>
        <Label x={14} y={y2(20) + 5} anchor="end" size="s" tone="muted">3'</Label>
        <Label x={626} y={y1(620) + 5} size="s" tone="muted">3'</Label>
        <Label x={626} y={y2(620) + 5} size="s" tone="muted">5'</Label>
        <Label x={150} y={40}>Zucker-Phosphat-Band</Label>
        <Arrow x1={180} y1={46} x2={172} y2={82} />
        <Label x={400} y={268}>Basenpaar</Label>
        <Arrow x1={404} y1={254} x2={387} y2={196} />
      </g>
      <g opacity={seg(t, 0.7, 1)}>
        <g transform="translate(70,294)">
          <BaseBox x={0} y={0} b="A" size={24} />
          <text x={22} y={1} textAnchor="middle" dominantBaseline="central" className="xl xl-s">=</text>
          <BaseBox x={44} y={0} b="T" size={24} />
          <text x={66} y={1} dominantBaseline="central" className="xl xl-s xl-muted">2 Wasserstoffbrücken</text>
        </g>
        <g transform="translate(360,294)">
          <BaseBox x={0} y={0} b="G" size={24} />
          <text x={22} y={1} textAnchor="middle" dominantBaseline="central" className="xl xl-s">≡</text>
          <BaseBox x={44} y={0} b="C" size={24} />
          <text x={66} y={1} dominantBaseline="central" className="xl xl-s xl-muted">3 Wasserstoffbrücken</text>
        </g>
      </g>
    </g>
  );
}

function Duplex({ x, y, len, top, bottom, rungs = true, gap = 36, opacity = 1 }: { x: number; y: number; len: number; top: 'old' | 'new' | null; bottom: 'old' | 'new' | null; rungs?: boolean; gap?: number; opacity?: number }) {
  const n = Math.floor(len / STEP);
  return (
    <g opacity={opacity}>
      {rungs &&
        Array.from({ length: n }, (_, i) => {
          const xx = x + 7 + i * STEP;
          const b = TOP[i % TOP.length];
          return (
            <g key={i}>
              {top && <line x1={xx} x2={xx} y1={y + 3} y2={y + gap / 2} className={`xr ${baseCls(b)}`} />}
              {bottom && <line x1={xx} x2={xx} y1={y + gap / 2} y2={y + gap - 3} className={`xr ${baseCls(COMP[b])}`} />}
            </g>
          );
        })}
      {top && <line x1={x} x2={x + len} y1={y} y2={y} className={top === 'old' ? 'xs-old' : 'xs-new'} />}
      {bottom && <line x1={x} x2={x + len} y1={y + gap} y2={y + gap} className={bottom === 'old' ? 'xs-old' : 'xs-new'} />}
    </g>
  );
}

function SemiConservative(t: number) {
  const sep = seg(t, 0.1, 0.45);
  const grow = seg(t, 0.45, 0.95);
  const len = 300;
  const x = 170;
  const yTop = lerp(128, 58, sep);
  const yBot = lerp(164, 234, sep);
  const newLen = len * grow;
  return (
    <g>
      {/* alte Stränge wandern auseinander */}
      {Array.from({ length: Math.floor(len / STEP) }, (_, i) => {
        const xx = x + 7 + i * STEP;
        const b = TOP[i];
        const paired = xx - x <= newLen;
        return (
          <g key={i}>
            <line x1={xx} x2={xx} y1={yTop + 3} y2={sep < 0.05 ? (yTop + yBot) / 2 : paired ? yTop + 18 : yTop + 11} className={`xr ${baseCls(b)}`} />
            {paired && sep > 0.05 && <line x1={xx} x2={xx} y1={yTop + 18} y2={yTop + 33} className={`xr ${baseCls(COMP[b])}`} />}
            <line x1={xx} x2={xx} y1={yBot - 3} y2={sep < 0.05 ? (yTop + yBot) / 2 : paired ? yBot - 18 : yBot - 11} className={`xr ${baseCls(COMP[b])}`} />
            {paired && sep > 0.05 && <line x1={xx} x2={xx} y1={yBot - 18} y2={yBot - 33} className={`xr ${baseCls(b)}`} />}
          </g>
        );
      })}
      <line x1={x} x2={x + len} y1={yTop} y2={yTop} className="xs-old" />
      <line x1={x} x2={x + len} y1={yBot} y2={yBot} className="xs-old" />
      {grow > 0 && (
        <>
          <line x1={x} x2={x + newLen} y1={yTop + 36} y2={yTop + 36} className="xs-new" />
          <line x1={x} x2={x + newLen} y1={yBot - 36} y2={yBot - 36} className="xs-new" />
        </>
      )}
      <g opacity={seg(t, 0.85, 1)}>
        <Label x={x - 12} y={yTop + 22} anchor="end">Doppelstrang 1</Label>
        <Label x={x - 12} y={yBot - 14} anchor="end">Doppelstrang 2</Label>
        <Label x={x + len + 12} y={yTop + 5} tone="old">alt</Label>
        <Label x={x + len + 12} y={yTop + 41} tone="new">neu</Label>
        <Label x={x + len + 12} y={yBot - 31} tone="new">neu</Label>
        <Label x={x + len + 12} y={yBot + 5} tone="old">alt</Label>
      </g>
      <g opacity={1 - seg(t, 0.05, 0.25)}>
        <Label x={W / 2} y={110} anchor="middle" tone="muted">Ausgangs-DNA: zwei alte Stränge</Label>
      </g>
      <g opacity={seg(t, 0.85, 1)}>
        <Label x={W / 2} y={306} anchor="middle" tone="muted">Jeder neue Doppelstrang = 1 alter + 1 neuer Strang</Label>
      </g>
    </g>
  );
}

function Origin(t: number) {
  const ox = 150;
  const w = lerp(0, 330, seg(t, 0.15, 0.9));
  const yT = 150;
  const yB = 186;
  const bulge = Math.min(46, w * 0.4);
  const fx = ox + w;
  const open = w > 8;
  const topPath = open
    ? `M20,${yT} H${ox} C${ox + 30},${yT} ${ox + 20},${yT - bulge} ${ox + 60},${yT - bulge} H${Math.max(ox + 60, fx - 60)} C${fx - 20},${yT - bulge} ${fx - 30},${yT} ${fx},${yT} H620`
    : `M20,${yT} H620`;
  const botPath = open
    ? `M20,${yB} H${ox} C${ox + 30},${yB} ${ox + 20},${yB + bulge} ${ox + 60},${yB + bulge} H${Math.max(ox + 60, fx - 60)} C${fx - 20},${yB + bulge} ${fx - 30},${yB} ${fx},${yB} H620`
    : `M20,${yB} H620`;
  return (
    <g>
      {xs.map((x, i) =>
        x < ox - 2 || x > fx + 2 || !open ? (
          <g key={i}>
            <line x1={x} x2={x} y1={yT + 3} y2={(yT + yB) / 2} className={`xr ${baseCls(TOP[i])}`} />
            <line x1={x} x2={x} y1={(yT + yB) / 2} y2={yB - 3} className={`xr ${baseCls(COMP[TOP[i]])}`} />
          </g>
        ) : null,
      )}
      <path d={topPath} className="xs-old" />
      <path d={botPath} className="xs-old" />
      <line x1={ox} x2={ox} y1={yB + 64} y2={yB + 12} className="xs-guide" />
      <Label x={ox} y={yB + 84} anchor="middle">Replikationsursprung</Label>
      <g opacity={seg(t, 0.55, 0.85)}>
        <Label x={(ox + fx) / 2} y={(yT + yB) / 2 + 5} anchor="middle" tone="muted">Einzelstränge liegen frei</Label>
        <Label x={fx} y={yT - bulge - 34} anchor="middle">Replikationsgabel</Label>
        <Arrow x1={fx - 10} y1={yT - bulge - 18} x2={fx + 50} y2={yT - bulge - 18} />
      </g>
    </g>
  );
}

const LEAD_PRIMER: Range = [30, 58];
const F1P: Range = [214, 240];
const F2P: Range = [330, 356];
const F3P: Range = [446, 472];

function HelicaseScene(t: number) {
  const xf = lerp(250, 380, seg(t, 0.1, 0.9));
  return (
    <g>
      <Fork xf={xf} helicase={seg(t, 0, 0.15)} />
      <g opacity={seg(t, 0.5, 0.8)}>
        <Label x={xf - 150} y={(Y_DT + Y_DB) / 2 + 5} anchor="middle">Replikationsgabel</Label>
        <Arrow x1={xf + 60} y1={Y_DB + 40} x2={xf + 120} y2={Y_DB + 40} />
        <Label x={xf + 60} y={Y_DB + 64} size="s" tone="muted">Gabel wandert weiter</Label>
      </g>
      <g opacity={seg(t, 0.2, 0.4)}>
        <Label x={20} y={30} tone="muted" size="s">Wasserstoffbrücken zwischen den Basen werden gelöst</Label>
      </g>
    </g>
  );
}

function PrimaseScene(t: number) {
  const xf = 380;
  const a = seg(t, 0.1, 0.45);
  const b = seg(t, 0.5, 0.85);
  return (
    <g>
      <Fork
        xf={xf}
        helicase={1}
        leadPrimer={a > 0 ? [LEAD_PRIMER[0], lerp(LEAD_PRIMER[0], LEAD_PRIMER[1], a)] : undefined}
        frags={b > 0 ? [{ primer: [lerp(F1P[1], F1P[0], b), F1P[1]] }] : []}
        primase={{ x: t < 0.48 ? lerp(60, 44, a) + 20 : 228, o: t < 0.45 ? a : t < 0.5 ? 0.3 : b }}
      />
      {/* Primase am Leitstrang oberhalb zeichnen */}
      {t < 0.48 && <Enzyme x={64} y={Y_LEAD + 30} w={84} h={28} name="Primase" kind="primase" opacity={a} />}
      <g opacity={seg(t, 0.4, 0.55)}>
        <Label x={66} y={40} tone="primer">Primer (RNA)</Label>
        <Arrow x1={70} y1={46} x2={48} y2={Y_LEAD - 6} cls="xa xa-primer" />
      </g>
      <g opacity={seg(t, 0.8, 0.95)}>
        <Label x={300} y={300} tone="primer">Primer am anderen Strang</Label>
        <Arrow x1={296} y1={292} x2={240} y2={Y_LAG + 6} cls="xa xa-primer" />
      </g>
    </g>
  );
}

function PolymeraseCloseUp(t: number) {
  const template = ['T', 'A', 'C', 'G', 'G', 'A', 'T', 'C', 'C', 'A'];
  const x0 = 110;
  const dx = 44;
  const yT = 96;
  const yN = 176;
  const primerLen = 3;
  const prog = clamp(t * 1.15) * 5;
  const added = Math.min(5, Math.floor(prog));
  const partial = prog - added;
  return (
    <g>
      <Label x={x0 - 40} y={yT + 5} anchor="end" size="s" tone="muted">3'</Label>
      <Label x={x0 + dx * template.length - 4} y={yT + 5} size="s" tone="muted">5'</Label>
      <line x1={x0 - 22} x2={x0 + dx * (template.length - 1) + 22} y1={yT - 22} y2={yT - 22} className="xs-old" />
      <Label x={x0 - 22} y={yT - 34} size="s" tone="old">alter Strang (Vorlage)</Label>
      {template.map((b, i) => (
        <BaseBox key={i} x={x0 + i * dx} y={yT} b={b} />
      ))}
      {/* neuer Strang: Primer (RNA) + DNA */}
      {template.slice(0, primerLen + added).map((b, i) => {
        const nb = i < primerLen ? (COMP[b] === 'T' ? 'U' : COMP[b]) : COMP[b];
        return <BaseBox key={`n${i}`} x={x0 + i * dx} y={yN} b={nb} />;
      })}
      {/* Wasserstoffbrücken */}
      {template.slice(0, primerLen + added).map((_, i) => (
        <line key={`h${i}`} x1={x0 + i * dx} x2={x0 + i * dx} y1={yT + 15} y2={yN - 15} className="xs-hb" />
      ))}
      <line x1={x0 - 22} x2={x0 + dx * (primerLen - 1) + 22} y1={yN + 22} y2={yN + 22} className="xs-primer" />
      {added > 0 && <line x1={x0 + dx * primerLen - 22} x2={x0 + dx * (primerLen + added - 1) + 22} y1={yN + 22} y2={yN + 22} className="xs-new" />}
      <Label x={x0 - 22} y={yN + 46} size="s" tone="primer">Primer (RNA, mit U)</Label>
      <Label x={x0 - 22} y={yN + 66} size="s" tone="muted">Neue Nucleotide kommen immer ans 3'-Ende.</Label>
      <Label x={x0 - 40} y={yN + 5} anchor="end" size="s" tone="muted">5'</Label>
      {/* ankommendes Nucleotid */}
      {added < 5 && primerLen + added < template.length && (
        <g>
          <BaseBox x={x0 + (primerLen + added) * dx} y={lerp(296, yN, ease(partial))} b={COMP[template[primerLen + added]]} opacity={0.4 + 0.6 * partial} />
        </g>
      )}
      <Enzyme x={x0 + (primerLen + added) * dx + 62} y={yN} w={150} h={34} name="DNA-Polymerase" kind="pol" opacity={0.95} />
      <Label x={x0 + (primerLen + added) * dx + 62} y={yN - 30} anchor="middle" size="s">hängt ans 3'-Ende an</Label>
      <Arrow x1={x0 - 20} y1={296} x2={x0 + 120} y2={296} cls="xa xa-new" />
      <Label x={x0 + 130} y={301} tone="new">Synthese nur in 5' → 3'-Richtung</Label>
    </g>
  );
}

function LeadingScene(t: number) {
  const k = seg(t, 0.05, 0.95);
  const xf = lerp(380, 560, k);
  const lb = lerp(58, 440, k);
  return (
    <g>
      <Fork xf={xf} helicase={1} leadPrimer={LEAD_PRIMER} lead={[LEAD_PRIMER[1], lb]} polLead={1} frags={[{ primer: F1P }]} />
      <FreeNts x={lb + 30} y={Y_LEAD + 30} t={t} />
      <g opacity={seg(t, 0.3, 0.6)}>
        <Label x={110} y={150}>Leitstrang: kontinuierlich</Label>
        <Arrow x1={110} y1={160} x2={250} y2={160} cls="xa xa-new" />
      </g>
      <Label x={24} y={Y_LEAD + 28} size="s" tone="muted">5'</Label>
    </g>
  );
}

function LaggingScene(t: number) {
  const xf = 560;
  const g1 = seg(t, 0.02, 0.35);
  const p2 = seg(t, 0.35, 0.45);
  const g2 = seg(t, 0.45, 0.68);
  const p3 = seg(t, 0.68, 0.76);
  const g3 = seg(t, 0.76, 0.98);
  const frags: Frag[] = [{ primer: F1P, dna: [lerp(F1P[0], 40, g1), F1P[0]] }];
  if (p2 > 0) frags.push({ primer: [lerp(F2P[1], F2P[0], p2), F2P[1]], dna: g2 > 0 ? [lerp(F2P[0], 246, g2), F2P[0]] : undefined });
  if (p3 > 0) frags.push({ primer: [lerp(F3P[1], F3P[0], p3), F3P[1]], dna: g3 > 0 ? [lerp(F3P[0], 362, g3), F3P[0]] : undefined });
  const tip = g3 > 0 ? lerp(F3P[0], 362, g3) : g2 > 0 ? lerp(F2P[0], 246, g2) : lerp(F1P[0], 40, g1);
  const primaseX = p3 > 0 && g3 === 0 ? F3P[0] + 14 : p2 > 0 && g2 === 0 ? F2P[0] + 14 : null;
  return (
    <g>
      <Fork xf={xf} helicase={1} leadPrimer={LEAD_PRIMER} lead={[LEAD_PRIMER[1], 440]} frags={frags} polLag={primaseX == null ? tip : null} primase={primaseX != null ? { x: primaseX, o: 1 } : null} />
      {/* Richtung der Fragmente */}
      <g opacity={seg(t, 0.2, 0.4)}>
        <Arrow x1={200} y1={Y_BOT + 26} x2={80} y2={Y_BOT + 26} cls="xa xa-new" />
        <Label x={210} y={Y_BOT + 31} tone="new">Synthese von der Gabel weg</Label>
      </g>
      <g opacity={seg(t, 0.85, 1)}>
        <Label x={20} y={306}>Folgestrang: diskontinuierlich in Okazaki-Fragmenten</Label>
      </g>
      <Label x={110} y={150} tone="muted" size="s">Leitstrang fertig</Label>
    </g>
  );
}

function LigaseScene(t: number) {
  const r = seg(t, 0.05, 0.45);
  const l = seg(t, 0.5, 0.7);
  const s = seg(t, 0.7, 0.95);
  const frags: Frag[] = [
    { primer: F1P, dna: [40, F1P[0]], replaced: r },
    { primer: F2P, dna: [246, F2P[0]], replaced: r },
    { primer: F3P, dna: [362, F3P[0]], replaced: r },
  ];
  return (
    <g>
      <Fork xf={560} helicase={1} leadPrimer={LEAD_PRIMER} leadReplaced={r} lead={[LEAD_PRIMER[1], 440]} frags={frags} sealed={s} ligase={[{ x: 243, o: l }, { x: 359, o: l }]} />
      <g opacity={seg(t, 0.1, 0.3) * (1 - seg(t, 0.5, 0.6))}>
        <Label x={20} y={300} tone="primer">Primer werden abgebaut, Lücken mit DNA gefüllt</Label>
      </g>
      <g opacity={seg(t, 0.55, 0.7)}>
        <Label x={20} y={300}>DNA-Ligase (L) verknüpft die Fragmente</Label>
      </g>
    </g>
  );
}

function ResultScene(t: number) {
  const a = seg(t, 0, 0.5);
  const b = seg(t, 0.5, 0.9);
  return (
    <g>
      <g transform={`translate(0,${lerp(40, 0, a)})`} opacity={a}>
        <Duplex x={170} y={70} len={360} top="old" bottom="new" />
      </g>
      <g transform={`translate(0,${lerp(-40, 0, a)})`} opacity={a}>
        <Duplex x={170} y={200} len={360} top="new" bottom="old" />
      </g>
      <g opacity={b}>
        <Label x={542} y={75} tone="old">alt</Label>
        <Label x={542} y={111} tone="new">neu</Label>
        <Label x={542} y={205} tone="new">neu</Label>
        <Label x={542} y={241} tone="old">alt</Label>
        <Label x={156} y={94} anchor="end">Chromatid 1</Label>
        <Label x={156} y={224} anchor="end">Chromatid 2</Label>
        <Label x={350} y={165} anchor="middle" tone="muted">identische Basenfolge</Label>
        <Label x={W / 2} y={300} anchor="middle">→ ein Zwei-Chromatiden-Chromosom</Label>
      </g>
    </g>
  );
}

function ProofreadScene(t: number) {
  const template = ['G', 'A', 'T', 'C', 'A', 'G', 'T'];
  const correct = template.map((b) => COMP[b]);
  const x0 = 180;
  const dx = 50;
  const yT = 90;
  const yN = 170;
  const bad = 4; // falsches Nucleotid gegenüber A
  const found = seg(t, 0.1, 0.3);
  const out = seg(t, 0.35, 0.6);
  const inn = seg(t, 0.65, 0.9);
  return (
    <g>
      <line x1={x0 - 25} x2={x0 + dx * 6 + 25} y1={yT - 22} y2={yT - 22} className="xs-old" />
      {template.map((b, i) => (
        <g key={i}>
          <BaseBox x={x0 + i * dx} y={yT} b={b} />
          {(i === 1 || i === 5) && (
            <text x={x0 + i * dx} y={yT - 32} textAnchor="middle" className="xl xl-s xl-old">CH₃</text>
          )}
        </g>
      ))}
      <Label x={x0 - 34} y={yT + 5} anchor="end" size="s" tone="old">alter Strang</Label>
      <line x1={x0 - 25} x2={x0 + dx * 6 + 25} y1={yN + 22} y2={yN + 22} className="xs-new" />
      <Label x={x0 - 34} y={yN + 5} anchor="end" size="s" tone="new">neuer Strang</Label>
      {correct.map((b, i) =>
        i === bad ? (
          <g key={i}>
            <BaseBox x={x0 + i * dx} y={lerp(yN, 290, out)} b="G" mark="bad" opacity={1 - out} />
            <BaseBox x={x0 + i * dx} y={lerp(290, yN, inn)} b={b} mark="good" opacity={inn} />
          </g>
        ) : (
          <g key={i}>
            <BaseBox x={x0 + i * dx} y={yN} b={b} />
            <line x1={x0 + i * dx} x2={x0 + i * dx} y1={yT + 15} y2={yN - 15} className="xs-hb" />
          </g>
        ),
      )}
      <g opacity={found}>
        <rect x={x0 + bad * dx - 22} y={yT - 20} width={44} height={yN - yT + 40} rx={10} className="xs-focus" />
        <Label x={x0 + bad * dx + 34} y={yN - 36} tone="bad">A passt nicht zu G</Label>
      </g>
      <g opacity={inn}>
        <Label x={x0 + bad * dx + 34} y={yN + 60} tone="good">ersetzt: A – T</Label>
      </g>
      <Enzyme x={x0 + bad * dx - 90} y={yN + 64} w={150} h={30} name="DNA-Polymerase" kind="pol" opacity={seg(t, 0, 0.15)} />
      <g opacity={seg(t, 0.8, 1)}>
        <Label x={20} y={286} size="s" tone="muted">CH₃ = Methylgruppe: Zunächst ist nur der alte Strang methyliert.</Label>
        <Label x={20} y={306} size="s" tone="muted">Daran erkennen Reparaturenzyme, welcher Strang neu ist.</Label>
      </g>
    </g>
  );
}

function Tube({ x, label, sub, bands, o }: { x: number; label: string; sub: string; bands: { y: number; kind: 'heavy' | 'mid' | 'light' }[]; o: number }) {
  return (
    <g opacity={o}>
      <rect x={x - 26} y={60} width={52} height={170} rx={20} className="xs-tube" />
      {bands.map((b, i) => (
        <rect key={i} x={x - 20} y={b.y - 4} width={40} height={8} rx={3} className={`xs-band xs-band-${b.kind}`} />
      ))}
      <Label x={x} y={250} anchor="middle">{label}</Label>
      <Label x={x} y={268} anchor="middle" size="s" tone="muted">{sub}</Label>
    </g>
  );
}

const BAND = { light: 110, mid: 145, heavy: 180 };

function MeselsonScene(t: number) {
  const a = seg(t, 0, 0.25);
  const b = seg(t, 0.3, 0.55);
  const c = seg(t, 0.6, 0.85);
  const small = (x: number, y: number, top: 'heavy' | 'light', bot: 'heavy' | 'light', o: number) => (
    <g opacity={o}>
      <line x1={x} x2={x + 34} y1={y} y2={y} className={top === 'heavy' ? 'xs-heavy' : 'xs-light'} />
      <line x1={x} x2={x + 34} y1={y + 8} y2={y + 8} className={bot === 'heavy' ? 'xs-heavy' : 'xs-light'} />
    </g>
  );
  return (
    <g>
      <Tube x={140} label="Start" sub="nach Wachstum in ¹⁵N" bands={[{ y: BAND.heavy, kind: 'heavy' }]} o={a} />
      <Tube x={320} label="1. Replikation" sub="in ¹⁴N" bands={[{ y: BAND.mid, kind: 'mid' }]} o={b} />
      <Tube x={500} label="2. Replikation" sub="in ¹⁴N" bands={[{ y: BAND.light, kind: 'light' }, { y: BAND.mid, kind: 'mid' }]} o={c} />
      <g opacity={a}>
        <Label x={40} y={BAND.light + 5} size="s" tone="muted">leicht</Label>
        <Label x={40} y={BAND.mid + 5} size="s" tone="muted">mittel</Label>
        <Label x={40} y={BAND.heavy + 5} size="s" tone="muted">schwer</Label>
      </g>
      {small(123, 292, 'heavy', 'heavy', a)}
      {small(280, 292, 'heavy', 'light', b)}
      {small(324, 292, 'light', 'heavy', b)}
      {small(426, 292, 'heavy', 'light', c)}
      {small(466, 292, 'light', 'light', c)}
      {small(506, 292, 'light', 'light', c)}
      {small(546, 292, 'light', 'heavy', c)}
      <g opacity={seg(t, 0.2, 0.4)}>
        <line x1={110} x2={134} y1={24} y2={24} className="xs-heavy" />
        <Label x={140} y={29} size="s">Strang mit ¹⁵N (schwer)</Label>
        <line x1={370} x2={394} y1={24} y2={24} className="xs-light" />
        <Label x={400} y={29} size="s">Strang mit ¹⁴N (leicht)</Label>
      </g>
    </g>
  );
}

// ---------------------------------------------------------------------------

export const replication: Explainer = {
  sub: 'replikation',
  title: 'DNA-Replikation',
  lead: 'Wie die DNA vor jeder Zellteilung exakt verdoppelt wird – Bild für Bild, vom Aufbau der Doppelhelix bis zum Beweis durch Meselson und Stahl.',
  scenes: [
    {
      id: 'helix',
      title: 'Ausgangspunkt: die Doppelhelix',
      text: 'Die DNA besteht aus **zwei Polynucleotid-Strängen**, die sich **antiparallel** gegenüberliegen – ein Strang verläuft von 5\' nach 3\', der andere von 3\' nach 5\'. Wie bei einer gedrehten Strickleiter bilden die **Zucker-Phosphat-Bänder** die Seile und jeweils **zwei Basen** die Sprossen. Gegenüber stehen nur **Adenin–Thymin** (zwei Wasserstoffbrücken) und **Guanin–Cytosin** (drei Wasserstoffbrücken).',
      src: [p(3)],
      prov: 'pdf',
      merke: 'Kennst du einen Strang, kennst du auch den anderen – genau das nutzt die Replikation.',
      alt: 'Doppelhelix aus zwei gegenläufigen Strängen mit farbigen Basenpaaren A–T und G–C.',
      draw: Helix,
    },
    {
      id: 'prinzip',
      title: 'Das Prinzip: semikonservativ',
      text: 'Vor jeder Mitose wird die DNA in der Interphase **identisch verdoppelt**. Die Doppelhelix wird wie ein Reißverschluss getrennt, und **jeder Einzelstrang dient als Vorlage**: Nach der Basenpaarungsregel lagern sich komplementäre Nucleotide an. Es entstehen zwei identische Doppelstränge aus **je einem alten und einem neuen Strang**.',
      src: [p(4)],
      prov: 'pdf',
      merke: 'Semikonservativ = „halb bewahrend“: In jedem neuen Doppelstrang steckt ein alter Strang.',
      alt: 'Ein Doppelstrang aus zwei alten (dunklen) Strängen trennt sich; an jeden alten Strang wird ein neuer (farbiger) Strang angebaut.',
      draw: SemiConservative,
    },
    {
      id: 'start',
      title: 'Start am Replikationsursprung',
      text: 'Die Replikation beginnt an einer bestimmten Sequenz, dem **Replikationsursprung**. Dort wird die DNA entwunden. Die Doppelhelix wird abschnittsweise wie ein Reißverschluss getrennt – es entsteht eine Y-förmige **Replikationsgabel**.',
      src: [p(5)],
      prov: 'pdf',
      alt: 'Ein Doppelstrang öffnet sich ab dem Replikationsursprung; an der Öffnung entsteht die Replikationsgabel.',
      draw: Origin,
    },
    {
      id: 'helicase',
      title: 'Die Helicase öffnet die Gabel',
      text: 'Die **Helicase** trennt die beiden Einzelstränge voneinander – die Replikationsgabel entsteht und wandert weiter. Jetzt liegen die Basen frei und können als Vorlage dienen.',
      src: [p(5)],
      prov: 'pdf',
      alt: 'Die Helicase sitzt an der Gabelspitze und trennt den Doppelstrang in zwei Einzelstränge; die Gabel wandert nach rechts.',
      draw: HelicaseScene,
    },
    {
      id: 'primase',
      title: 'Die Primase setzt Primer',
      text: 'Die **Primase** bildet komplementär zu einem kurzen Abschnitt des alten Strangs ein Startermolekül, den **Primer**. Ohne Primer kann die Synthese nicht beginnen.',
      src: [p(5)],
      prov: 'pdf',
      merke: 'Erst der Primer, dann die DNA-Polymerase.',
      alt: 'Die Primase setzt je einen kurzen violetten Primer an den oberen und an den unteren Einzelstrang.',
      draw: PrimaseScene,
    },
    {
      id: 'polymerase',
      title: 'Die DNA-Polymerase – nur an ein 3\'-Ende',
      text: 'Die **DNA-Polymerase** bindet am **3\'-Ende des Primers** komplementär freie Nucleotide – Base für Base, nach der Basenpaarungsregel. Sie kann Nucleotide **nur an ein 3\'-Ende** anhängen; der neue Strang wächst deshalb immer in **5\'→3\'-Richtung**.',
      src: [p(5)],
      prov: 'pdf',
      merke: 'Die Polymerase braucht ein freies 3\'-Ende – das liefert zu Beginn der Primer.',
      alt: 'Nahaufnahme: Gegenüber dem alten Strang wird an das 3\'-Ende des Primers ein passendes Nucleotid nach dem anderen angehängt.',
      duration: 3600,
      draw: PolymeraseCloseUp,
    },
    {
      id: 'leitstrang',
      title: 'Leitstrang: kontinuierlich',
      text: 'Weil die Stränge **antiparallel** sind, ist eine **kontinuierliche** Synthese in Richtung der Gabel nur an einem Strang möglich: dem **Leitstrang**. Die Polymerase folgt der Gabel und hängt ununterbrochen Nucleotide an.',
      src: [p(5)],
      prov: 'pdf',
      alt: 'Am oberen Strang wächst der neue Leitstrang ohne Unterbrechung hinter der wandernden Gabel her.',
      duration: 3200,
      draw: LeadingScene,
    },
    {
      id: 'folgestrang',
      title: 'Folgestrang: Okazaki-Fragmente',
      text: 'Am anderen Strang wird **von der Gabel weg** synthetisiert. Sobald die Gabel ein Stück weitergewandert ist, entsteht ein **neuer Primer**, und dazwischen werden DNA-Stücke gebildet, die **Okazaki-Fragmente**. Die Synthese des Folgestrangs ist **diskontinuierlich**.',
      src: [p(5)],
      prov: 'pdf',
      merke: 'Leitstrang am Stück, Folgestrang in Stücken.',
      alt: 'Am unteren Strang entstehen nacheinander drei Okazaki-Fragmente, jedes beginnt mit einem Primer und wächst von der Gabel weg nach links.',
      duration: 4200,
      draw: LaggingScene,
    },
    {
      id: 'ligase',
      title: 'Abschluss: Primer weg, Ligase verbindet',
      text: 'Ein weiteres Enzym **baut die Primer ab**, und die Lücken werden mit DNA gefüllt. Die **DNA-Ligase** verknüpft die Okazaki-Fragmente zu einem **durchgehenden Strang**.',
      src: [p(5)],
      prov: 'pdf',
      alt: 'Die violetten Primer werden durch DNA ersetzt, die Ligase schließt die Lücken zwischen den Fragmenten.',
      duration: 3200,
      draw: LigaseScene,
    },
    {
      id: 'ergebnis',
      title: 'Ergebnis: zwei identische Doppelstränge',
      text: 'Am Ende liegen **zwei identische DNA-Doppelstränge** vor, jeder aus **einem alten und einem neuen Strang**. Aus dem Ein-Chromatid-Chromosom ist ein **Zwei-Chromatiden-Chromosom** geworden – bereit für die Mitose.',
      src: [p(4)],
      prov: 'pdf',
      alt: 'Zwei Doppelstränge untereinander, jeder mit einem alten und einem neuen Strang.',
      draw: ResultScene,
    },
    {
      id: 'korrektur',
      title: 'Fehler werden korrigiert',
      text: 'Beim **Korrekturlesen** erkennt die DNA-Polymerase direkt nach dem Einbau eine **fehlerhafte Paarung**, entfernt das falsche Nucleotid, ersetzt es und fährt fort. Bei der **Fehlpaarungsreparatur** nach der Replikation entfernen andere Enzyme das Nucleotid im **neuen** Strang. Woran erkennen sie den neuen Strang? Zunächst ist nur der **Originalstrang methyliert** (Methylgruppen –CH₃ an bestimmten Basen).',
      src: [p(5)],
      prov: 'pdf',
      alt: 'Gegenüber einem A im alten Strang wurde fälschlich G eingebaut; es wird entfernt und durch T ersetzt. Der alte Strang trägt Methylgruppen.',
      duration: 3400,
      draw: ProofreadScene,
    },
    {
      id: 'beweis',
      title: 'Der Beweis: Meselson und Stahl (1958)',
      text: 'Bakterien wuchsen in Medium mit schwerem **¹⁵N**, dann je eine Replikation lang in leichtem **¹⁴N**. Die **Dichtezentrifugation** zeigte: Start – **schwere** DNA; nach einer Replikation – nur **mittelschwere** DNA; nach der zweiten – **leichte und mittelschwere** DNA. Genau das sagt nur das **semikonservative** Modell voraus.',
      src: [p(4), p(5)],
      prov: 'pdf',
      merke: 'Konservativ scheitert nach der 1., dispersiv nach der 2. Replikation.',
      alt: 'Drei Zentrifugenröhrchen: schwere Bande, dann eine mittlere Bande, dann eine leichte und eine mittlere Bande; darunter die DNA-Moleküle aus schweren und leichten Strängen.',
      duration: 3400,
      draw: MeselsonScene,
    },
  ],
};
