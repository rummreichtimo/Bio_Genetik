import { SUBTOPICS, getLesson, getSubtopic } from '../content';
import { DAY_MS } from '../lib/date';
import type { ProgressState } from '../progress/types';
import type { SubProgress } from './mastery';
import { cardQueueInfo } from './stats';

export interface PlanItem {
  id: string;
  kicker: string;
  title: string;
  text: string;
  cta: string;
  to: string;
}

/**
 * Persönlicher Tagesplan: nächster Lernschritt, fällige Wiederholungen und das
 * Thema mit dem größten Nachholbedarf.
 */
export function buildPlan(state: ProgressState, progress: SubProgress[], now = Date.now()): PlanItem[] {
  const items: PlanItem[] = [];
  const byId = new Map(progress.map((p) => [p.sub, p]));

  // 1) Weiterlernen
  const recent = state.recent.find((r) => getSubtopic(r.sub));
  const nextOpen = SUBTOPICS.find((s) => (byId.get(s.id)?.lesson ?? 0) < 1);
  const target = recent ? recent.sub : nextOpen?.id ?? SUBTOPICS[0].id;
  const tp = byId.get(target);
  const sub = getSubtopic(target)!;
  const hasLesson = !!getLesson(target);
  if (tp && tp.lesson < 1 && hasLesson) {
    items.push({
      id: 'continue',
      kicker: recent ? 'Weiterlernen' : 'Hier anfangen',
      title: sub.title,
      text: tp.lesson > 0 ? `${Math.round(tp.lesson * 100)} % der Lernabschnitte erledigt.` : sub.summary,
      cta: 'Lernmodus öffnen',
      to: `/lernen/${target}`,
    });
  } else {
    items.push({
      id: 'continue',
      kicker: 'Weiterlernen',
      title: sub.title,
      text: tp && tp.attempts ? `Beherrschung ${Math.round((tp.recentMastery ?? 0) * 100)} %. Festige das Thema mit Fragen.` : sub.summary,
      cta: 'Thema üben',
      to: `/quiz?sub=${target}`,
    });
  }

  // 2) Wiederholen
  const cards = cardQueueInfo(state, now);
  if (cards.due > 0) {
    items.push({
      id: 'cards',
      kicker: 'Wiederholen',
      title: `${cards.due} Karteikarte${cards.due === 1 ? '' : 'n'} fällig`,
      text: 'Schwierige Karten kommen früher wieder. Ein kurzer Durchgang festigt das Gelernte.',
      cta: 'Fällige Karten lernen',
      to: '/karten/lernen/faellig',
    });
  } else if (cards.fresh > 0) {
    items.push({
      id: 'cards',
      kicker: 'Karteikarten',
      title: `${cards.fresh} neue Karten`,
      text: 'Begriffe, Prozesse, Experimente und Vergleiche aus deiner PDF.',
      cta: 'Karten starten',
      to: '/karten',
    });
  }

  // 3) Schwächstes Thema
  const weakest = progress
    .filter((p) => p.status === 'schwach' || (p.attempts >= 3 && (p.recentMastery ?? 1) < 0.7))
    .sort((a, b) => (a.recentMastery ?? 0) - (b.recentMastery ?? 0))[0];
  if (weakest) {
    items.push({
      id: 'weak',
      kicker: 'Nachholbedarf',
      title: getSubtopic(weakest.sub)!.title,
      text: 'Hier passieren dir die meisten Fehler. Die Fragen konzentrieren sich auf deine Fehlerstellen.',
      cta: 'Gezielt üben',
      to: `/quiz?sub=${weakest.sub}&fokus=fehler`,
    });
  } else {
    const lastExam = state.exams[state.exams.length - 1];
    const started = progress.filter((p) => p.attempts > 0).length;
    if (started >= 4 && (!lastExam || now - lastExam.at > 7 * DAY_MS)) {
      items.push({
        id: 'exam',
        kicker: 'Standortbestimmung',
        title: 'Probeprüfung',
        text: 'Gemischte Fragen ohne Hilfen. Die Auswertung zeigt dir Stärken und Lücken.',
        cta: 'Prüfung starten',
        to: '/pruefung',
      });
    } else {
      items.push({
        id: 'quick',
        kicker: 'Wenig Zeit?',
        title: 'Ich habe nur 5 Minuten',
        text: 'Wichtige Begriffe, ein paar Karten und ein kurzes Abschlussquiz.',
        cta: '5-Minuten-Einheit',
        to: '/schnell',
      });
    }
  }
  return items;
}
