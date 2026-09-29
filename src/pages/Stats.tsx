import { useState } from 'react';
import { CARDS, getSubtopic } from '../content';
import { formatDate, formatDuration, lastDays, shortWeekday } from '../lib/date';
import { allSubProgress } from '../learning/mastery';
import { MAX_BOX, BOX_INTERVAL_DAYS } from '../learning/srs';
import { cardQueueInfo, examSummary, pct, streak, totals } from '../learning/stats';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { Chart, type Datum } from '../ui/charts';
import { Bar, Stat, StatusChip } from '../ui/primitives';

export function Stats() {
  const { state } = useProgress();
  const [range, setRange] = useState<14 | 30>(14);
  const t = totals(state);
  const s = streak(state);
  const cards = cardQueueInfo(state);
  const exam = examSummary(state);
  const days = lastDays(range);
  const label = (k: string) => (range === 14 ? `${shortWeekday(k)} ${Number(k.slice(8))}.` : `${Number(k.slice(8))}.${Number(k.slice(5, 7))}.`);

  const timeData: Datum[] = days.map((k) => {
    const d = state.days[k];
    const min = (d?.s ?? 0) / 60;
    return { key: k, label: label(k), value: min, display: formatDuration(d?.s ?? 0), detail: d ? `${d.q} Antworten · ${d.k} Karten` : undefined };
  });
  const maxMin = Math.max(state.settings.dailyGoalMin, ...timeData.map((d) => d.value ?? 0));
  const niceMax = Math.ceil(maxMin / 10) * 10 || 10;

  const accData: Datum[] = days.map((k) => {
    const d = state.days[k];
    const n = d ? d.c + d.p + d.w : 0;
    const acc = n ? (d!.c + 0.5 * d!.p) / n : null;
    return { key: k, label: label(k), value: acc === null ? null : acc * 100, display: acc === null ? 'keine Antworten' : `${Math.round(acc * 100)} %`, detail: n ? `${n} Antworten` : undefined };
  });

  const progress = allSubProgress(state);
  const answered = progress.filter((p) => p.attempts > 0 && p.recentMastery !== null);
  const best = [...answered].sort((a, b) => (b.recentMastery ?? 0) - (a.recentMastery ?? 0)).slice(0, 5);
  const worst = [...answered].sort((a, b) => (a.recentMastery ?? 0) - (b.recentMastery ?? 0)).slice(0, 5);
  const boxes = Array.from({ length: MAX_BOX + 1 }, (_, b) => CARDS.filter((c) => state.cards[c.id]?.box === b).length);
  const repeated = Object.values(state.q).filter((q) => q.n > 1).length;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Statistik</span>
        <h1>Dein Lernverlauf</h1>
      </header>

      <section className="card" aria-label="Kennzahlen">
        <div className="stat-grid">
          <Stat value={formatDuration(t.secondsTotal)} label="Lernzeit gesamt" note={`${formatDuration(t.seconds7)} in 7 Tagen`} />
          <Stat value={s} label={s === 1 ? 'Tag Lernserie' : 'Tage Lernserie'} note={`${t.activeDays} Lerntage`} />
          <Stat value={t.attempts} label="Antworten" note={`✅ ${t.correct} · 🟡 ${t.partial} · ❌ ${t.wrong}`} />
          <Stat value={pct(t.accuracy)} label="Trefferquote" note="teilweise richtig zählt halb" />
          <Stat value={t.cardReviews} label="Kartenwiederholungen" note={`${cards.due} fällig · ${cards.fresh} neu`} />
          <Stat value={repeated} label="Fragen wiederholt" note="mehr als einmal beantwortet" />
          <Stat value={exam.count} label="Prüfungen" note={exam.best !== null ? `Bestwert ${pct(exam.best)}` : 'noch keine'} />
          <Stat value={Object.values(state.lessons).reduce((a, l) => a + l.done.length, 0)} label="Lernabschnitte" note="abgeschlossen" />
        </div>
      </section>

      <div className="row" role="group" aria-label="Zeitraum">
        <button type="button" className="chip" aria-pressed={range === 14} onClick={() => setRange(14)}>14 Tage</button>
        <button type="button" className="chip" aria-pressed={range === 30} onClick={() => setRange(30)}>30 Tage</button>
      </div>

      <div className="grid-2">
        <div className="card">
          <Chart
            title="Lernzeit pro Tag (Minuten)"
            kind="bar"
            data={timeData}
            max={niceMax}
            ticks={[0, niceMax / 2, niceMax].map((v) => ({ value: v, label: `${Math.round(v)}` }))}
            unitLabel="Lernzeit"
            empty={<p className="muted">Noch keine Lernzeit in diesem Zeitraum. Lernzeit zählt, solange die App sichtbar ist und du aktiv bist.</p>}
          />
        </div>
        <div className="card">
          <Chart
            title="Trefferquote pro Tag (%)"
            kind="line"
            data={accData}
            max={100}
            ticks={[0, 50, 100].map((v) => ({ value: v, label: `${v}` }))}
            unitLabel="Trefferquote"
            empty={<p className="muted">Noch keine beantworteten Fragen in diesem Zeitraum.</p>}
          />
        </div>
      </div>

      <div className="grid-2">
        <section className="card stack-s" aria-labelledby="st-best">
          <h2 id="st-best" className="card-title">Deine stärksten Themen</h2>
          {best.length ? best.map((p) => <TopicBar key={p.sub} sub={p.sub} value={p.recentMastery ?? 0} status={p.status} />) : <p className="muted">Beantworte Fragen, um hier deine Stärken zu sehen.</p>}
        </section>
        <section className="card stack-s" aria-labelledby="st-worst">
          <h2 id="st-worst" className="card-title">Hier lohnt sich Wiederholen</h2>
          {worst.length ? worst.map((p) => <TopicBar key={p.sub} sub={p.sub} value={p.recentMastery ?? 0} status={p.status} />) : <p className="muted">Noch keine Daten.</p>}
        </section>
      </div>

      <div className="grid-2">
        <section className="card stack-s" aria-labelledby="st-boxes">
          <h2 id="st-boxes" className="card-title">Karteikarten nach Fach</h2>
          {boxes.map((n, b) => (
            <div key={b} className="tag-row">
              <span>Fach {b} <span className="faint">({b === 0 ? 'sofort' : `${BOX_INTERVAL_DAYS[b]} T.`})</span></span>
              <Bar value={n / Math.max(1, ...boxes)} thin label={`Fach ${b}`} />
              <span className="num">{n}</span>
            </div>
          ))}
          <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>{CARDS.length - boxes.reduce((a, b) => a + b, 0)} Karten noch nie gelernt</span>
        </section>
        <section className="card stack-s" aria-labelledby="st-exams">
          <h2 id="st-exams" className="card-title">Prüfungen</h2>
          {state.exams.length ? (
            [...state.exams].reverse().slice(0, 8).map((e) => (
              <div key={e.id} className="tag-row">
                <span>{formatDate(e.at)} <span className="faint">({e.items.length} Aufg.)</span></span>
                <Bar value={e.score} thin tone={e.score >= 0.75 ? 'good' : e.score >= 0.5 ? 'warn' : 'bad'} label={`Prüfung vom ${formatDate(e.at)}`} />
                <span className="num">{Math.round(e.score * 100)} %</span>
              </div>
            ))
          ) : (
            <p className="muted">Noch keine Prüfung. <Link to="/pruefung">Jetzt eine Probeprüfung machen</Link>.</p>
          )}
        </section>
      </div>
    </div>
  );
}

function TopicBar({ sub, value, status }: { sub: string; value: number; status: Parameters<typeof StatusChip>[0]['status'] }) {
  return (
    <Link to={`/thema/${sub}`} className="curr-sub">
      <span className="curr-sub-title">{getSubtopic(sub)?.title} <StatusChip status={status} /></span>
      <span className="curr-sub-bar"><Bar value={value} thin tone={value >= 0.75 ? 'good' : value >= 0.5 ? 'warn' : 'bad'} label={`Beherrschung ${getSubtopic(sub)?.title}`} /></span>
      <span className="num faint">{Math.round(value * 100)} %</span>
    </Link>
  );
}
