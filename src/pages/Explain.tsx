import { useEffect, useRef, useState } from 'react';
import { getSubtopic } from '../content';
import { getExplainer } from '../explainers';
import { H, W, useProgressAnim } from '../explainers/kit';
import { Link } from '../app/router';
import { IconArrowLeft, IconArrowRight, IconPlay, IconRefresh } from '../ui/icons';
import { Markdown } from '../ui/Markdown';
import { SourceTag } from '../ui/Provenance';

export function Explain({ sub, start }: { sub: string; start?: string }) {
  const ex = getExplainer(sub);
  const topic = getSubtopic(sub);
  const [idx, setIdx] = useState(() => Math.max(0, ex?.scenes.findIndex((s) => s.id === start) ?? 0));
  const [replay, setReplay] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const [auto, setAuto] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const scene = ex?.scenes[idx];
  const t = useProgressAnim(`${idx}:${replay}`, scene?.duration ?? 2600);

  const go = (i: number) => {
    if (!ex) return;
    const n = Math.max(0, Math.min(ex.scenes.length - 1, i));
    setIdx(n);
    setSeen((s) => new Set(s).add(n));
  };

  // Tastatur: Pfeile blättern
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT')) return;
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Automatisch weiter: nach der Animation etwas Lesezeit, dann nächstes Bild
  useEffect(() => {
    if (!auto || !ex || t < 1) return;
    if (idx >= ex.scenes.length - 1) {
      setAuto(false);
      return;
    }
    const words = (scene?.text ?? '').split(/\s+/).length;
    const id = window.setTimeout(() => go(idx + 1), Math.min(12000, 2500 + words * 180));
    return () => window.clearTimeout(id);
  }, [auto, t, idx]);

  if (!ex || !topic || !scene) {
    return (
      <div className="page page-narrow">
        <header className="page-head"><h1>Keine Bildgeschichte gefunden</h1></header>
        <Link to="/suche" className="btn btn-primary">Zur Suche</Link>
      </div>
    );
  }

  const last = idx === ex.scenes.length - 1;
  return (
    <div className="page">
      <nav className="crumbs" aria-label="Pfad">
        <Link to="/themen">Themen</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/thema/${sub}`}>{topic.title}</Link>
        <span aria-hidden="true">›</span>
        <span>Anschaulich erklärt</span>
      </nav>
      <header className="page-head">
        <span className="eyebrow">Anschaulich erklärt · {ex.scenes.length} Bilder</span>
        <h1>{ex.title}</h1>
        <p className="lead">{ex.lead}</p>
      </header>

      <section className="explain-stage" aria-label="Bildgeschichte">
        <figure className="explain-figure">
          <svg viewBox={`0 0 ${W} ${H}`} className="xsvg" role="img" aria-label={scene.alt}>
            {scene.draw(t)}
          </svg>
        </figure>

        <div className="explain-controls">
          <div className="explain-dots" role="group" aria-label="Bilder">
            {ex.scenes.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`explain-dot ${seen.has(i) ? 'is-seen' : ''}`}
                aria-current={i === idx ? 'step' : undefined}
                aria-label={`Bild ${i + 1}: ${s.title}`}
                title={s.title}
                onClick={() => go(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button type="button" className="btn btn-ghost btn-small" onClick={() => setReplay((r) => r + 1)}>
              <IconRefresh /> Nochmal abspielen
            </button>
            <button type="button" className="btn btn-soft btn-small" aria-pressed={auto} onClick={() => setAuto(!auto)}>
              <IconPlay /> {auto ? 'Automatisch: an' : 'Automatisch abspielen'}
            </button>
          </div>
        </div>

        <div className="explain-text" ref={textRef} aria-live="polite">
          <span className="eyebrow">Bild {idx + 1} von {ex.scenes.length}</span>
          <h2>{scene.title}</h2>
          <Markdown text={scene.text} />
          {scene.merke && (
            <p className="explain-merke">
              <strong>Merke:</strong> {scene.merke}
            </p>
          )}
          <SourceTag src={scene.src} prov={scene.prov} />
        </div>

        <div className="explain-legend" aria-label="Legende">
          <span><i style={{ background: 'var(--x-old)' }} /> alter Strang</span>
          <span><i style={{ background: 'var(--x-new)' }} /> neuer Strang</span>
          <span><i style={{ background: 'var(--base-u)' }} /> Primer (RNA)</span>
          <span>Basen: <b style={{ color: 'var(--base-a)' }}>A</b> <b style={{ color: 'var(--base-t)' }}>T</b> <b style={{ color: 'var(--base-g)' }}>G</b> <b style={{ color: 'var(--base-c)' }}>C</b></span>
        </div>

        <div className="lesson-actions">
          <button type="button" className="btn btn-ghost" onClick={() => go(idx - 1)} disabled={idx === 0}>
            <IconArrowLeft /> Zurück
          </button>
          {!last ? (
            <button type="button" className="btn btn-primary" onClick={() => go(idx + 1)}>
              Weiter <IconArrowRight />
            </button>
          ) : (
            <Link to={`/lernen/${sub}`} className="btn btn-primary">
              Im Lernmodus vertiefen <IconArrowRight />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
