import { CHAPTERS, getSubtopic, SUBTOPICS } from '../content';
import { formatDuration } from '../lib/date';
import { allSubProgress, overallProgress, type SubProgress } from '../learning/mastery';
import { cardQueueInfo, examSummary, pct, streak, totals } from '../learning/stats';
import { buildPlan } from '../learning/plan';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { ChapterGlyph, IconArrowRight, IconFlame } from '../ui/icons';
import { Bar, ProgressRing, Stat, toneFor } from '../ui/primitives';
import { SubtopicRow } from '../ui/topic';
import { ThemenGel } from './ThemenGel';

function ChapterBlock({ chapterId, progress }: { chapterId: string; progress: SubProgress[] }) {
  const ch = CHAPTERS.find((c) => c.id === chapterId)!;
  const subs = progress.filter((p) => ch.subtopics.includes(p.sub));
  const avg = subs.reduce((a, p) => a + p.progress, 0) / (subs.length || 1);
  return (
    <section className="card" aria-labelledby={`ch-${ch.id}`}>
      <div className="row-between">
        <div className="row" style={{ gap: 12 }}>
          <span className="chapter-icon" aria-hidden="true">
            <ChapterGlyph icon={ch.icon} />
          </span>
          <div className="stack-s" style={{ gap: 0 }}>
            <h3 id={`ch-${ch.id}`} className="card-title">
              {ch.title}
            </h3>
            <span className="faint" style={{ fontSize: 'var(--fs-sm)' }}>
              {ch.short}
            </span>
          </div>
        </div>
        <strong className="num" style={{ fontSize: 'var(--fs-xl)', fontFamily: 'var(--font-display)' }}>
          {Math.round(avg * 100)} %
        </strong>
      </div>
      <div className="stack-s">
        {subs.map((p) => (
          <SubtopicRow key={p.sub} p={p} />
        ))}
      </div>
    </section>
  );
}

export function Dashboard() {
  const { state } = useProgress();
  const progress = allSubProgress(state);
  const overall = overallProgress(state, progress);
  const t = totals(state);
  const s = streak(state);
  const cards = cardQueueInfo(state);
  const exam = examSummary(state);
  const learned = progress.filter((p) => p.status === 'gelernt').length;
  const open = progress.filter((p) => p.status === 'offen').length;
  const weak = progress.filter((p) => p.status === 'schwach');
  const plan = buildPlan(state, progress);
  const goal = state.settings.dailyGoalMin * 60;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Biologie · Genetik</span>
        <h1>Dein Lernstand</h1>
        <p className="lead">Alle Inhalte stammen aus deiner PDF „Bio_Genetik“ – mit Seitenangabe. Ergänzungen sind gekennzeichnet.</p>
      </header>

      <section className="card dash-hero" aria-label="Überblick">
        <div className="dash-hero-main">
          <ProgressRing value={overall} size={148} stroke={13} sub="Gesamt" />
          <div className="stat-grid dash-stats">
            <Stat
              value={
                <span className="row" style={{ gap: 6 }}>
                  <IconFlame width={22} height={22} style={{ color: s > 0 ? 'var(--warn)' : 'var(--ink-3)' }} />
                  {s}
                </span>
              }
              label={s === 1 ? 'Tag Lernserie' : 'Tage Lernserie'}
              note={t.activeDays ? `${t.activeDays} Lerntage insgesamt` : 'Heute ist ein guter Start'}
            />
            <Stat
              value={formatDuration(t.secondsToday)}
              label="Lernzeit heute"
              note={`Ziel ${state.settings.dailyGoalMin} min · 7 Tage: ${formatDuration(t.seconds7)}`}
            />
            <Stat
              value={t.attempts}
              label="Fragen bearbeitet"
              note={t.attempts ? `✅ ${t.correct} · 🟡 ${t.partial} · ❌ ${t.wrong}` : 'Noch keine Antworten'}
            />
            <Stat value={pct(t.accuracy)} label="Trefferquote" note="teilweise richtig zählt halb" />
            <Stat value={cards.due} label="Karten fällig" note={`${t.cardReviews} Wiederholungen · ${cards.fresh} neu`} />
            <Stat value={`${learned}/${SUBTOPICS.length}`} label="Themen gelernt" note={`${open} offen · ${weak.length} schwach`} />
            <Stat
              value={exam.last === null ? '–' : pct(exam.last)}
              label="Letzte Prüfung"
              note={exam.count ? `${exam.count} Prüfungen · Ø letzte 3: ${pct(exam.avg3)}` : 'Noch keine Prüfung'}
            />
            <Stat value={pct(overall)} label="Prüfungsfortschritt" note="Beherrschung aller Themen" />
          </div>
        </div>
        <div className="dash-goal">
          <div className="row-between" style={{ fontSize: 'var(--fs-sm)' }}>
            <span className="muted">Tagesziel</span>
            <span className="num muted">
              {Math.min(100, Math.round((t.secondsToday / goal) * 100))} %
            </span>
          </div>
          <Bar value={t.secondsToday / goal} tone={t.secondsToday >= goal ? 'good' : undefined} label="Tagesziel Lernzeit" />
        </div>
      </section>

      <section className="section" aria-labelledby="plan-title">
        <div className="section-head">
          <h2 id="plan-title">Heute für dich</h2>
          <span className="faint" style={{ fontSize: 'var(--fs-sm)' }}>
            passt sich deinen Ergebnissen an
          </span>
        </div>
        <div className="grid-3">
          {plan.map((item) => (
            <Link key={item.id} to={item.to} className="card card-link plan-card">
              <span className="eyebrow">{item.kicker}</span>
              <span className="card-title">{item.title}</span>
              <span className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
                {item.text}
              </span>
              <span className="plan-cta">
                {item.cta} <IconArrowRight width={18} height={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="themen-title">
        <div className="section-head">
          <h2 id="themen-title">Deine Themen</h2>
          <Link to="/themen" className="btn btn-ghost btn-small">
            Alle Themen <IconArrowRight />
          </Link>
        </div>
        <div className="dash-topics">
          <div className="card gel-card">
            <div className="stack-s">
              <span className="card-title">Themen-Gel</span>
              <span className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
                Jede Spur ist ein Kapitel (1–6), jede Bande ein Unterthema. Je kräftiger die Bande, desto sicherer beherrschst du
                das Thema. Rote Banden solltest du wiederholen.
              </span>
            </div>
            <ThemenGel progress={progress} />
            <ol className="gel-legend">
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <span className="num">{i + 1}</span> {c.title}
                </li>
              ))}
            </ol>
          </div>
          <div className="stack">
            {CHAPTERS.map((c) => (
              <ChapterBlock key={c.id} chapterId={c.id} progress={progress} />
            ))}
          </div>
        </div>
      </section>

      {weak.length > 0 && (
        <section className="card" aria-labelledby="weak-title" style={{ borderColor: 'var(--bad)' }}>
          <h2 id="weak-title" style={{ fontSize: 'var(--fs-xl)' }}>
            Schwache Themen
          </h2>
          <div className="stack-s">
            {weak.map((p) => (
              <div key={p.sub} className="row-between">
                <span>{getSubtopic(p.sub)?.title}</span>
                <span className="row">
                  <span className={`chip chip-${toneFor(p.recentMastery) ?? 'bad'}`}>Beherrschung {pct(p.recentMastery)}</span>
                  <Link to={`/quiz?sub=${p.sub}`} className="btn btn-soft btn-small">
                    Gezielt üben
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
