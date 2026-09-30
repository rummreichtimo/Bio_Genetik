import { SUBTOPICS, getSubtopic } from '../content';
import { DAY_MS } from '../lib/date';
import type { ProgressState } from '../progress/types';
import type { SubProgress } from './mastery';
import { cardQueueInfo } from './stats';
import { ERROR_META, errorPatterns } from './errors';

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

  // 1) Gelerntes festigen (Weiterlernen steht groß darüber)
  const learnedSubs = SUBTOPICS.filter((x) => (state.lessons[x.id]?.done.length ?? 0) > 0).map((x) => x.id);
  const recent = state.recent.map((r) => r.sub).find((x) => learnedSubs.includes(x)) ?? learnedSubs[learnedSubs.length - 1];
  if (recent) {
    const tp = byId.get(recent);
    items.push({
      id: 'continue',
      kicker: 'Gelerntes festigen',
      title: getSubtopic(recent)!.title,
      text:
        tp && tp.attempts
          ? `Beherrschung ${Math.round((tp.recentMastery ?? 0) * 100)} %. Fragen nur zu dem, was du schon gelernt hast.`
          : 'Ein paar Fragen zu dem, was du gerade gelernt hast – mit Nachlesen, falls etwas fehlt.',
      cta: 'Thema üben',
      to: `/quiz?sub=${recent}`,
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
      text: 'Begriffe, Prozesse und Experimente aus den Abschnitten, die du schon gelernt hast.',
      cta: 'Karten starten',
      to: '/karten',
    });
  }

  // 3) Häufigstes offenes Fehlermuster, sonst schwächstes Thema
  const pattern = errorPatterns(state, now).find((p) => p.open > 0 && p.count >= 2);
  if (pattern && getSubtopic(pattern.sub)) {
    items.push({
      id: 'weak',
      kicker: 'Fehlermuster',
      title: `${getSubtopic(pattern.sub)!.title} → ${ERROR_META[pattern.tag].label}`,
      text: ERROR_META[pattern.tag].tip,
      cta: 'Gezielt üben',
      to: `/quiz?sub=${pattern.sub}&fehler=${pattern.tag}`,
    });
    return items;
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
    } else if (learnedSubs.length) {
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
