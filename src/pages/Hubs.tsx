import type { ReactNode } from 'react';
import { Link } from '../app/router';
import { cardQueueInfo, examSummary, pct, totals } from '../learning/stats';
import { useProgress } from '../progress/store';
import { IconAlert, IconArrowRight, IconBolt, IconChart, IconExam, IconFlask, IconList, IconPen, IconQuiz } from '../ui/icons';

function HubCard({ to, icon, title, text, meta }: { to: string; icon: ReactNode; title: string; text: string; meta?: string }) {
  return (
    <Link to={to} className="card card-link hub-card">
      <span className="hub-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="stack-s" style={{ gap: 4 }}>
        <span className="card-title">{title}</span>
        <span className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
          {text}
        </span>
        {meta && <span className="faint" style={{ fontSize: 'var(--fs-xs)', fontWeight: 700 }}>{meta}</span>}
      </span>
      <IconArrowRight className="hub-arrow" />
    </Link>
  );
}

export function PracticeHub() {
  const { state } = useProgress();
  const exam = examSummary(state);
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Üben</span>
        <h1>Wie möchtest du üben?</h1>
      </header>
      <div className="stack">
        <HubCard to="/quiz" icon={<IconQuiz />} title="Quiz" text="Fragen nach Thema, Schwierigkeit und Fragetyp – mit Erklärungen." />
        <HubCard to="/klausur" icon={<IconPen />} title="Klausurtraining" text="Materialaufgaben mit Diagrammen, Tabellen und Experimenten aus deiner PDF." />
        <HubCard
          to="/pruefung"
          icon={<IconExam />}
          title="Prüfungsmodus"
          text="Gemischte Themen, keine Hilfen, Ergebnis erst am Ende."
          meta={exam.count ? `Letzte Prüfung: ${pct(exam.last)}` : undefined}
        />
        <HubCard to="/schnell" icon={<IconBolt />} title="Ich habe nur 5 Minuten" text="Begriffe, Karten und ein kurzes Abschlussquiz." />
        <HubCard to="/experimente" icon={<IconFlask />} title="Experimente & Materialien" text="Versuche Schritt für Schritt verstehen und auswerten." />
      </div>
    </div>
  );
}

export function ProgressHub() {
  const { state } = useProgress();
  const t = totals(state);
  const cards = cardQueueInfo(state);
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Fortschritt</span>
        <h1>Dein Fortschritt</h1>
      </header>
      <div className="stack">
        <HubCard
          to="/statistik"
          icon={<IconChart />}
          title="Statistik"
          text="Lernzeit, Trefferquote, Themen und Entwicklung über die Zeit."
          meta={`${t.attempts} Antworten · Trefferquote ${pct(t.accuracy)}`}
        />
        <HubCard to="/fehler" icon={<IconAlert />} title="Fehleranalyse" text="Deine häufigsten Fehler – mit passenden Wiederholungsfragen." meta={`${state.errors.length} Fehler protokolliert`} />
        <HubCard to="/karten" icon={<IconList />} title="Karteikarten" text="Fällige Wiederholungen und neue Karten." meta={`${cards.due} fällig · ${cards.fresh} neu`} />
        <HubCard to="/lehrplan" icon={<IconExam />} title="Lehrplan-Check" text="Welche Kompetenzen deine PDF abdeckt – und wo sie Lücken hat." />
      </div>
    </div>
  );
}
