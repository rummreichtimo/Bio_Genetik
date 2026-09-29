import type { ContentPack } from '../index';
import type { ExternalSource } from '../types';
import { p } from '../helpers';

/**
 * Kapitel 6 · Humangenetik
 *  - 6.2 Erbgänge des Menschen (PDF S. 28 und 25, Buch S. 294–297)
 *  - 6.5 Genetische Beratung und Diagnostik (PDF S. 26–27, Buch S. 308–311)
 *
 * Schreibweise für X-chromosomale Genotypen: Xᴬ = nicht mutiertes Allel, Xᵃ = mutiertes Allel.
 */

const ETHIK_EXT: ExternalSource = {
  label: 'Grundbegriffe der Ethik, z. B. Wikipedia: „Normative Ethik“',
  url: 'https://de.wikipedia.org/wiki/Normative_Ethik',
};

const HUNTINGTON_EXT: ExternalSource = {
  label: 'z. B. Wikipedia (engl.): „Huntington’s disease“',
  url: 'https://en.wikipedia.org/wiki/Huntington%27s_disease',
};

export const humangenetik: ContentPack = {
  lessons: [
    // =====================================================================
    // 6.2 Erbgänge und Stammbaumanalyse
    // =====================================================================
    {
      sub: 'erbgaenge',
      intro:
        'In seltenen Fällen besitzen Neugeborene zusätzliche Finger oder Zehen – häufig hat auch ein Elternteil überzählige Finger oder Zehen. Diese Besonderheit heißt Polydaktylie und ist erblich. Mit welchen Methoden lässt sich in der Humangenetik ermitteln, wie ein Merkmal vererbt wird?',
      sections: [
        {
          id: 'stammbaum',
          title: 'Stammbäume erstellen',
          blocks: [
            {
              kind: 'text',
              md: 'Um den Erbgang eines Merkmals zu ermitteln, erstellt man in der Humangenetik einen **Familienstammbaum**. Darin wird über mehrere Generationen für jedes Mitglied der Familie erfasst, ob das Merkmal aufgetreten ist. Dazu werden **international gebräuchliche Symbole** verwendet.\n\nAnhand des Stammbaums lässt sich klären, ob das untersuchte Gen **dominant oder rezessiv** vererbt wird und ob es auf einem der **22 Autosomen** oder auf einem der beiden **Gonosomen** liegt.',
              src: [p(28)],
            },
            {
              kind: 'compare',
              title: 'Stammbaumsymbolik (Abb. 2)',
              columns: ['Bedeutung'],
              rows: [
                { label: 'Quadrat', cells: ['männliches Individuum'] },
                { label: 'Kreis', cells: ['weibliches Individuum'] },
                { label: 'farbig ausgefülltes Symbol', cells: ['Merkmalsträger'] },
                { label: 'waagerechte Linie zwischen zwei Personen', cells: ['Ehe oder Partner'] },
                { label: 'Doppellinie zwischen zwei Personen', cells: ['Verwandtenehe oder Partner'] },
                { label: 'gemeinsame Linie über mehreren Personen', cells: ['Geschwister'] },
              ],
              src: [p(28, 'Abb. 2')],
            },
            { kind: 'check', questionIds: ['eg-q1', 'eg-q2'] },
          ],
        },
        {
          id: 'dominant',
          title: 'Autosomal-dominanter Erbgang',
          blocks: [
            {
              kind: 'text',
              md: 'Im Stammbaum einer Familie mit **Polydaktylie** fällt auf: Das Merkmal tritt **gehäuft und über mehrere Generationen** auf, und **beide Geschlechter** sind im Mittel gleich häufig betroffen. Das kennzeichnet einen **autosomal-dominanten Erbgang**.\n\nPolydaktylie wird durch Mutationen eines Gens verursacht, das auf einem **Autosom** liegt. Betroffene sind entweder **heterozygote (Aa)** oder **homozygote (AA)** Träger der Mutation – daher spricht man von einem dominanten Erbgang.',
              src: [p(28)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Schreibweise beim dominanten Erbgang',
              md: 'In Abb. 3 deiner PDF gilt: **A** = Allel Betroffener, **a** = Allel nicht Betroffener.',
              src: [p(28, 'Abb. 3')],
            },
            {
              kind: 'compare',
              title: 'Wahrscheinlichkeit für ein betroffenes Kind',
              columns: ['Wahrscheinlichkeit', 'Genotyp betroffener Kinder'],
              rows: [
                { label: 'Aa × aa', cells: ['50 %', 'Aa'] },
                { label: 'Aa × Aa', cells: ['75 %', 'AA oder Aa'] },
              ],
              src: [p(28)],
            },
            {
              kind: 'text',
              md: 'Zu den heute etwa **1000** bekannten autosomal-dominanten Erbkrankheiten gehört das **Marfan-Syndrom**: Die Patienten sind ungewöhnlich groß mit überlangen Gliedmaßen und leiden an einer **Bindegewebsschwäche**, die sich auf viele Gewebe und Organe auswirkt. Das Krankheitsbild ergibt sich aus unterschiedlichen Symptomen, die als **Syndrom** zusammengefasst werden.\n\nIn etwa **25 bis 30 Prozent** der Fälle tritt die Krankheit in einer Familie erstmalig als **Spontanmutation** auf. Die Mutation führt zur fehlerhaften Bildung des Proteins **Fibrillin**, eines wichtigen Bausteins im Bindegewebe. Da ein Gen zur Ausbildung mehrerer Symptome führt, spricht man von **Polyphänie**.',
              src: [p(28)],
            },
            { kind: 'check', questionIds: ['eg-q3', 'eg-q4', 'eg-q5', 'eg-q6', 'eg-q7'] },
          ],
        },
        {
          id: 'rezessiv',
          title: 'Autosomal-rezessiver Erbgang',
          blocks: [
            {
              kind: 'text',
              md: 'Eine der häufigsten erblichen Stoffwechselkrankheiten in Europa ist die **Mukoviszidose** (cystische Fibrose). Durch **defekte Ionenkanäle** bilden bestimmte Drüsen – unter anderem in den Schleimhäuten der Bronchien – einen **zähen Schleim**. Das Flimmerepithel kann ihn nur schwer abtransportieren; er ist Nährboden für Krankheitserreger. Folgen sind chronischer Husten und Atemwegsinfektionen. Mukoviszidose ist bislang nicht heilbar.',
              src: [p(28)],
            },
            {
              kind: 'bullets',
              title: 'Kennzeichen im Stammbaum',
              items: [
                'Die Krankheit tritt **vergleichsweise selten** auf.',
                '**Beide Geschlechter** sind gleichermaßen betroffen.',
                '**Phänotypisch gesunde Eltern** können betroffene Nachkommen haben.',
              ],
              src: [p(28)],
            },
            {
              kind: 'text',
              md: 'Mukoviszidose wird durch Mutationen eines Gens auf **Chromosom 7** verursacht, das die Ionenkanäle in den Drüsenzellmembranen codiert. Sind **beide Allele mutiert (aa)**, werden keine funktionierenden Ionenkanäle gebildet – die Krankheit tritt auf. **Heterozygote (Aa)** sind phänotypisch gesund, weil das nicht mutierte Allel A für ausreichend funktionsfähige Ionenkanäle codiert. Deshalb nennt man den Erbgang **rezessiv**. Heterozygote können das defekte Allel aber weitergeben: Sie sind **Überträger** oder **Konduktoren**.',
              src: [p(28)],
            },
            {
              kind: 'note',
              tone: 'warn',
              title: 'Achtung: Die Buchstaben wechseln die Bedeutung',
              md: 'Beim rezessiven Erbgang (Abb. 5) gilt: **a** = Allel Betroffener, **A** = Allel nicht Betroffener – beim dominanten Erbgang (Abb. 3) ist es umgekehrt. Der Großbuchstabe steht immer für das dominante Allel. Lies bei jeder Aufgabe zuerst die Legende.',
              src: [p(28, 'Abb. 3 und 5')],
            },
            { kind: 'check', questionIds: ['eg-q8', 'eg-q9', 'eg-q19', 'eg-q21'] },
          ],
        },
        {
          id: 'xchromosomal',
          title: 'X-chromosomale Erbgänge',
          blocks: [
            {
              kind: 'text',
              md: 'In Stammbäumen des **europäischen Adels** tritt gehäuft eine Form der Bluterkrankheit auf: die **Hämophilie**. Bei Betroffenen erfolgt die Blutgerinnung zu langsam; schon kleinere Verletzungen führen zu Blutungen, die nur schwer gestillt werden können.\n\nVon der Hämophilie sind **fast nur Männer** betroffen: Das Gen liegt auf dem **X-Chromosom**, und das entsprechende Allel fehlt auf dem Y-Chromosom. Männer mit dem mutierten Allel auf dem X-Chromosom sind hinsichtlich dieses Allels **hemizygot**. Da die Eltern Erkrankter nicht an Hämophilie leiden, liegt eine **X-chromosomal-rezessive** Vererbung vor.',
              src: [p(25)],
            },
            {
              kind: 'text',
              md: '**Heterozygote Frauen** sind gesund, weil sie neben dem mutierten Allel ein nicht mutiertes Allel auf dem homologen X-Chromosom besitzen. Sie können das mutierte Allel jedoch als **Konduktorinnen** an ihre Nachkommen übertragen.',
              src: [p(25)],
            },
            {
              kind: 'compare',
              title: 'Genotypen im Hämophilie-Stammbaum (Legende Abb. 6)',
              columns: ['Genotyp'],
              rows: [
                { label: 'Betroffene (Männer)', cells: ['XᵃY'] },
                { label: 'nicht Betroffene', cells: ['XᴬXᴬ, XᴬXᵃ, XᴬY'] },
                { label: 'Konduktorinnen', cells: ['XᴬXᵃ'] },
              ],
              src: [p(25, 'Abb. 6')],
            },
            {
              kind: 'bullets',
              title: 'Seltene gonosomale Erbgänge',
              items: [
                '**X-chromosomal-dominant** vererbte Krankheiten sind sehr selten – Beispiel: die **Vitamin-D-resistente Rachitis** (Minderwuchs, Knochenverformungen).',
                '**Y-chromosomale** Erbgänge sind sehr selten.',
              ],
              src: [p(25)],
            },
            { kind: 'check', questionIds: ['eg-q10', 'eg-q11', 'eg-q12', 'eg-q24', 'eg-q13', 'eg-q20'] },
          ],
        },
        {
          id: 'methode',
          title: 'Methode: Stammbaumanalyse',
          blocks: [
            {
              kind: 'text',
              md: 'Eine Stammbaumanalyse hat das Ziel, bestimmten **Phänotypen die Genotypen** zuzuordnen. Dafür kommen nur Merkmale in Betracht, die von einem einzelnen Gen abhängen, also **monogen** vererbt werden. Auf dieser Basis kann eine **Risikoabschätzung** für eine Erbkrankheit erfolgen.',
              src: [p(25)],
            },
            {
              kind: 'steps',
              title: 'Allgemeine Vorgehensweise',
              steps: [
                { title: 'Hypothese bilden', text: 'Dominanz oder Rezessivität? Autosom oder Gonosom?' },
                { title: 'Mögliche Genotypen angeben', text: 'Zuerst die Genotypen, die für die Hypothese **eindeutig** sind; für die übrigen Personen alle prinzipiell möglichen Genotypen.' },
                { title: 'Erbgang beweisen', text: 'An einer **eindeutigen Stelle** nachweisen, dass die Hypothese stimmt – und dort zeigen, dass **andere denkbare Erbgänge nicht möglich** sind.' },
              ],
              src: [p(25)],
            },
            {
              kind: 'bullets',
              title: 'Hinweise für die Hypothese',
              items: [
                'Krankheit tritt **gehäuft und fast in jeder Generation** auf → dominanter Erbgang vermutet.',
                'Krankheit tritt **relativ selten** auf → rezessiver Erbgang liegt nahe.',
                'Eine **Generation wird übersprungen** oder **gesunde Eltern haben ein krankes Kind** → Beleg für Rezessivität.',
                '**Männer und Frauen** gleichermaßen Merkmalsträger → autosomaler Erbgang wahrscheinlich.',
                'Krankheit tritt **ausschließlich bei Männern** auf → vermutlich X-chromosomale Vererbung.',
              ],
              src: [p(25)],
            },
            {
              kind: 'widget',
              widget: 'pedigree-method',
              caption: 'Beispielstammbaum aus deiner PDF (autosomal-rezessiv). Tippe Personen an, um ihre möglichen Genotypen zu sehen.',
              src: [p(25)],
            },
            {
              kind: 'steps',
              title: 'Beispiel aus deiner PDF',
              steps: [
                { title: 'Hypothese', text: 'Autosomal-rezessiv: Beide Geschlechter sind etwa gleich häufig betroffen, und das **gesunde Elternpaar 16 und 17** hat ein **krankes Kind (24)**.' },
                { title: 'Genotypen', text: 'a = mutiertes Allel, A = nicht mutiertes Allel. Alle Merkmalsträger: **aa**. Gesunde: **Aa** – die Personen **8, 23, 25 und 26** können auch **AA** sein.' },
                { title: 'Beweis: rezessiv', text: 'Nur bei Rezessivität können die gesunden Eltern 16 und 17 ein krankes Kind haben: Die beiden defekten Allele stammen je von einem heterozygoten Elternteil (Aa). Bei Dominanz müsste mindestens ein Elternteil das Krankheitsallel besitzen – und wäre selbst krank.' },
                { title: 'Beweis: autosomal', text: 'Nur autosomal können gesunde Eltern (16, 17) eine **kranke Tochter** (24) haben. Bei X-chromosomaler Vererbung müsste der Vater 17 krank sein, um ein mutiertes Allel an 24 weitergeben zu können.' },
              ],
              src: [p(25)],
            },
            {
              kind: 'note',
              tone: 'warn',
              title: 'Hinweis zur Quelle: Allelbezeichnung im Gegenbeweis',
              md: 'Im Beweis steht in deiner PDF: „… sodass mindestens ein Elternteil das defekte Allel **a** besitzen müsste“. Bei einem dominanten Erbgang wäre das defekte Allel aber das dominante Allel **A** (vgl. Abb. 3). Die Aussage des Beweises bleibt gleich: Ein Elternteil mit dem dominanten Krankheitsallel wäre selbst krank.',
              src: [p(25), p(28, 'Abb. 3')],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Grenzen der Stammbaumanalyse',
              md: 'Nicht immer sind die Ergebnisse eindeutig – etwa weil eine alternative Hypothese nicht ausgeschlossen werden kann. Für gesicherte Aussagen braucht man **ausreichend großes und gesichertes Zahlenmaterial**.',
              src: [p(25)],
            },
            { kind: 'check', questionIds: ['eg-q14', 'eg-q15', 'eg-q16', 'eg-q17', 'eg-q18'] },
          ],
        },
        {
          id: 'duchenne',
          title: 'Material: Muskeldystrophie Duchenne',
          blocks: [
            {
              kind: 'text',
              md: 'Die **Muskeldystrophie Typ Duchenne** ist eine Erbkrankheit mit fortschreitender Degeneration der Muskulatur. Für eine betroffene Familie wurde ein Stammbaum erstellt. Dann wurde die DNA der Personen 1 bis 10 mit einem **Restriktionsenzym** behandelt, die Fragmente in **Einzelstränge** zerlegt und durch **Gelelektrophorese** aufgetrennt. Eine **markierte Gensonde** weist die Dystrophie-Allele nach: Die Fragmente der **Allele 1 und 2** erscheinen im **Autoradiogramm** als einzelne Banden.',
              src: [p(25, 'Material A')],
            },
            {
              kind: 'widget',
              widget: 'gel-duchenne',
              caption: 'Stammbaum und Autoradiogramm aus Material A deiner PDF',
              src: [p(25, 'Material A')],
            },
            {
              kind: 'note',
              tone: 'inf',
              title: 'So gehst du vor',
              md: 'Analysiere zuerst nur den Stammbaum (Hypothese, Genotypen). Werte danach das Autoradiogramm aus: Wie viele Banden haben die Männer? Welche Bande haben nur die kranken Söhne? Die vollständige Aufgabe findest du im **Klausurtraining „Muskeldystrophie Typ Duchenne“**.',
            },
            { kind: 'check', questionIds: ['eg-q22', 'eg-q23'] },
          ],
        },
      ],
    },

    // =====================================================================
    // 6.5 Genetische Beratung und Diagnostik
    // =====================================================================
    {
      sub: 'beratung',
      intro:
        'In der Familie einer 45-jährigen Frau sind die Mutter und eine Schwester an Brustkrebs erkrankt. Die Frau vermutet eine erbliche Veranlagung und sucht eine genetische Beratungsstelle auf. Welche Informationen erhält sie dort – und welche Methoden der Diagnostik gibt es?',
      sections: [
        {
          id: 'beratung',
          title: 'Genetische Beratung',
          blocks: [
            {
              kind: 'text',
              md: 'In einer genetischen Beratungsstelle wird zunächst die **persönliche und familiäre Vorgeschichte** erhoben – häufig mit einem **Familienstammbaum über mindestens drei Generationen**. Auf Basis der Befunde schätzt das medizinische Fachpersonal die **Wahrscheinlichkeit** ein, mit der die Ratsuchenden oder ihre Kinder betroffen sind.\n\nBei einer **autosomal-dominanten** Vererbung, wie bei der erblichen Form von Brustkrebs, wird der Gendefekt mit einer Wahrscheinlichkeit von **50 Prozent** an die Nachkommen weitergegeben – vorausgesetzt, die Mutation liegt bei einem der beiden Elternteile vor. Wenn nötig, folgen **Chromosomenanalysen oder Gentests**.',
              src: [p(26)],
            },
            {
              kind: 'text',
              md: 'Zur Beratung gehören stets ausführliche Informationen über die Erbkrankheit und ihre Bedeutung für die **Lebens- und Familienplanung**. Die Ärztin oder der Arzt geht auch auf **psychisch-soziale Folgen** ein, die die Informationen für Betroffene haben können.',
              src: [p(26)],
            },
            {
              kind: 'bullets',
              title: 'Das Beratungsangebot richtet sich an …',
              items: [
                'gesunde Paare, die bereits ein Kind mit einer Erbkrankheit haben,',
                'Paare, die ungewollt kinderlos sind oder bei denen die Frau Fehlgeburten erlitten hat,',
                'Partner, die miteinander verwandt sind,',
                'Frauen über 35 Jahre und Partner, die zusammen älter als 75 Jahre sind – bei ihnen ist das Risiko für Chromosomenanomalien erhöht,',
                'Frauen, die vor oder während der Schwangerschaft mit mutagenen Stoffen in Kontakt kamen oder Suchtmittel wie Alkohol zu sich genommen haben,',
                'Frauen, die zu Beginn der Schwangerschaft eine Virusinfektion wie Röteln durchlitten haben.',
              ],
              src: [p(26)],
            },
            { kind: 'check', questionIds: ['be-q1', 'be-q2', 'be-q3'] },
          ],
        },
        {
          id: 'gentests',
          title: 'Gentests',
          blocks: [
            {
              kind: 'compare',
              title: 'Stammbaumanalyse und Gentest',
              columns: ['Aussage', 'Grundlage'],
              rows: [
                { label: 'Stammbaumanalyse', cells: ['häufig nur eine **Abschätzung** des Risikos', 'Phänotypen der Familienmitglieder'] },
                { label: 'Gentest', cells: ['**eindeutige** Aussagen', 'DNA aus Blut- oder Mundschleimhautproben wird isoliert und analysiert'] },
              ],
              src: [p(26)],
            },
            {
              kind: 'text',
              md: 'Gentests sind bislang nur für **wenige, durch Mutation eines einzelnen Gens** verursachte Erkrankungen möglich – etwa für erblichen Brust-, Prostata- und Darmkrebs, für Mukoviszidose und andere angeborene Stoffwechselkrankheiten.',
              src: [p(26)],
            },
            {
              kind: 'bullets',
              title: 'Regeln und Grenzen',
              items: [
                'Gentests dürfen nur mit **Einwilligung** der betroffenen Personen durchgeführt werden; sie müssen über Bedeutung und mögliche Folgen **aufgeklärt** werden.',
                'Ein positiver Test auf erblichen Brustkrebs bedeutet ein **stark erhöhtes Risiko** – aber nicht jede betroffene Frau entwickelt zwangsläufig Brustkrebs.',
                'Nur die Ratsuchenden bestimmen, in welchem Umfang sie über das Ergebnis informiert werden: Es besteht ein **Recht auf Nichtwissen**.',
                'Die Ergebnisse können auch **Kinder und Geschwister** sowie das **Arbeits- oder Versicherungsverhältnis** betreffen. Deshalb dürfen Gentests in Deutschland nur in **medizinisch begründeten Fällen** durchgeführt werden.',
              ],
              src: [p(26)],
            },
            { kind: 'check', questionIds: ['be-q4', 'be-q5', 'be-q6'] },
          ],
        },
        {
          id: 'praenatal',
          title: 'Pränataldiagnostik',
          blocks: [
            {
              kind: 'text',
              md: 'Eine wesentliche Bedeutung hat die genetische Beratung in der **pränatalen Diagnostik**. Ihr Ziel ist es, Chromosomenanomalien und Erbkrankheiten bereits beim **ungeborenen Kind** zu erkennen. Man unterscheidet **nichtinvasive** von **invasiven** Methoden.',
              src: [p(26)],
            },
            {
              kind: 'compare',
              title: 'Methoden der Pränataldiagnostik',
              columns: ['Art', 'Zeitpunkt', 'Was wird untersucht?'],
              rows: [
                { label: 'Ultraschall', cells: ['nichtinvasiv', 'routinemäßig', 'grundlegende Informationen über die Entwicklung des Kindes'] },
                { label: 'Ersttrimester-Screening', cells: ['nichtinvasiv', 'erstes Schwangerschaftsdrittel, auf Wunsch bei Auffälligkeiten', 'Risiko für Chromosomenveränderungen oder Fehlbildungen, u. a. über die Nackentransparenz'] },
                { label: 'Nackentransparenz', cells: ['nichtinvasiv (Ultraschall)', '11.–14. Schwangerschaftswoche', 'Flüssigkeitsansammlung im Nacken; vergrößert → Wahrscheinlichkeit für Trisomie 21 oder andere Fehlbildung deutlich erhöht'] },
                { label: 'NIPT', cells: ['nichtinvasiv (Blut der Schwangeren)', 'bei auffälligem Ersttrimester-Befund', 'zellfreie Bruchstücke fetaler DNA → Wahrscheinlichkeit einer Trisomie 13, 18 oder 21'] },
                { label: 'Chorionzottenbiopsie', cells: ['invasiv (Hohlnadel)', '12.–13. Schwangerschaftswoche', 'kindliche Zellen aus dem entstehenden Mutterkuchen (Chorion) → nach Kultivierung auf Chromosomenanomalien'] },
                { label: 'Amniozentese', cells: ['invasiv (Hohlnadel)', 'ab der 15. Schwangerschaftswoche', 'Fruchtwasser aus der Fruchtblase; fetale Zellen → Chromosomenanalysen und Gentests'] },
              ],
              src: [p(27)],
            },
            {
              kind: 'text',
              md: 'Der **NIPT** (nichtinvasiver Pränataltest) beruht darauf, dass im Blut der Schwangeren neben der eigenen DNA auch **zellfreie Bruchstücke fetaler DNA** vorhanden sind. Sie stammen aus dem fetalen Anteil der **Plazenta**. Mit speziellen Testverfahren werden mütterliche und kindliche Bruchstücke den jeweiligen Chromosomen **zugeordnet und zahlenmäßig erfasst**.',
              src: [p(27)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Risiken und Entscheidung',
              md: 'Ergibt sich bei einer nichtinvasiven Methode ein Verdacht, können letztlich nur **invasive Methoden** genauere Auskunft geben. Dabei sind **Infektionen der Mutter oder Verletzungen des Fetus** möglich, die zu **Fehlgeburten** führen können. Vor einer Pränataldiagnostik sollten sich Ratsuchende über die Konsequenzen des Ergebnisses im Klaren sein. Die Entscheidung über einen möglichen Schwangerschaftsabbruch liegt **allein im Ermessen der Mutter**.',
              src: [p(27)],
            },
            { kind: 'check', questionIds: ['be-q7', 'be-q8', 'be-q9', 'be-q19', 'be-q20'] },
          ],
        },
        {
          id: 'pid',
          title: 'Präimplantationsdiagnostik (PID)',
          blocks: [
            {
              kind: 'text',
              md: 'Ist ein Partner eines Paares mit Kinderwunsch Träger einer **schwerwiegenden Erbkrankheit**, kann unter bestimmten Bedingungen eine **Präimplantationsdiagnostik (PID)** durchgeführt werden. Dabei werden im Rahmen einer künstlichen Befruchtung **in vitro** Embryonen erzeugt. Nach dem **8-Zellstadium** werden eine oder mehrere Zellen entnommen und genetisch untersucht. Diese Zellen sind **nicht mehr totipotent** – sie können sich nicht mehr einzeln zu einem vollständigen Embryo entwickeln.',
              src: [p(27)],
            },
            {
              kind: 'steps',
              title: 'Ablauf einer PID (Abb. 4)',
              steps: [
                { title: 'Hormonbehandlung', text: 'Mehrere Eizellen reifen heran.' },
                { title: 'Befruchtung in vitro', text: 'Eizellen werden außerhalb des Körpers mit Spermienzellen befruchtet.' },
                { title: 'Achtzellstadium', text: 'Die Embryonen entwickeln sich bis zum Achtzellstadium.' },
                { title: 'Zellentnahme', text: 'Eine oder mehrere Zellen werden entnommen.' },
                { title: 'Untersuchung', text: 'DNA-Isolierung und Untersuchung auf Mutationen.' },
                { title: 'Auswahl', text: 'DNA **nicht mutiert** → Embryo wird in die Gebärmutter eingepflanzt. DNA **mutiert** → Embryo wird nicht eingepflanzt.' },
              ],
              src: [p(27, 'Abb. 4')],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Rechtlicher Rahmen in Deutschland',
              md: 'Eine PID ist nur zulässig, wenn ein **hohes Risiko für eine schwerwiegende Erbkrankheit** besteht oder eine **Schädigung des Kindes** zu erwarten ist. Über die Durchführung entscheidet eine **Ethikkommission**, die die Umstände des Einzelfalls berücksichtigt. Die PID hat in Deutschland eine sehr weitgehende ethische Debatte über **Menschenwürde und Lebensrechte von Embryonen** ausgelöst.',
              src: [p(27)],
            },
            { kind: 'check', questionIds: ['be-q10', 'be-q11', 'be-q12'] },
          ],
        },
        {
          id: 'personalisiert',
          title: 'Personalisierte Medizin',
          blocks: [
            {
              kind: 'text',
              md: 'Moderne Diagnoseverfahren, einschließlich Gentests, erfassen genetische, molekulare und zelluläre Besonderheiten von Patienten. Solche **Biomarker** können dazu dienen, **Diagnose, Therapie und Prävention** am **individuellen Genotyp** auszurichten – daher spricht man von **personalisierter Medizin**. Unwirksame Medikamente und ihre Nebenwirkungen können so erspart werden.',
              src: [p(27)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Beispiel Herceptin',
              md: 'Frauen mit Brustkrebs werden nur dann mit dem Wirkstoff **Herceptin** behandelt, wenn die Tumorzellen ein bestimmtes **genetisches Merkmal auf ihrer Oberfläche** aufweisen. Bei Tumorzellen ohne dieses Merkmal wirkt Herceptin nicht – die **Nebenwirkungen treten trotzdem auf**. Personalisierte Medizin wird u. a. bei verschiedenen Krebsarten, aber auch bei **Hepatitis C** und **HIV** eingesetzt.',
              src: [p(27)],
            },
            { kind: 'check', questionIds: ['be-q13', 'be-q14'] },
          ],
        },
        {
          id: 'ethik',
          title: 'Ethisch bewerten: deskriptiv und normativ',
          blocks: [
            {
              kind: 'note',
              tone: 'warn',
              title: 'Lücke zwischen Lehrplan und PDF',
              md: 'Der Lehrplan verlangt, bioethische Aspekte eines Gentests „auch unter Unterscheidung **deskriptiver und normativer Aussagen**“ zu bewerten. Die Buchseiten deiner PDF erklären diese Unterscheidung nicht. Die folgende Erklärung ist deshalb als externe Zusatzinformation gekennzeichnet.',
              src: [p(29)],
            },
            {
              kind: 'note',
              tone: 'ext',
              title: 'Deskriptive und normative Aussagen',
              md: '**Deskriptive Aussagen** beschreiben, was ist – sie lassen sich grundsätzlich an Fakten überprüfen. Beispiel: „Auf Zypern trägt einer von sieben Einwohnern den Gendefekt.“\n\n**Normative Aussagen** sagen, was sein soll oder wie etwas zu bewerten ist. Man erkennt sie oft an Wörtern wie *sollte*, *darf*, *muss*, *gut*, *richtig*. Beispiel: „Paare mit Kinderwunsch sollten einen Gentest machen.“\n\nAus deskriptiven Aussagen allein folgt noch keine normative Aussage – dafür braucht es zusätzlich **Werte oder Normen**.',
              ext: ETHIK_EXT,
            },
            {
              kind: 'bullets',
              title: 'Werte, die in deiner PDF anklingen',
              items: [
                '**Selbstbestimmung:** Gentests nur mit Einwilligung nach Aufklärung (S. 26).',
                '**Recht auf Nichtwissen:** Ratsuchende bestimmen, wie viel sie erfahren (S. 26).',
                '**Schutz vor Benachteiligung:** Ergebnisse können Arbeits- und Versicherungsverhältnis betreffen (S. 26).',
                '**Menschenwürde und Lebensrecht von Embryonen:** Debatte um die PID (S. 27).',
                '**Entscheidung der Mutter:** über einen möglichen Schwangerschaftsabbruch (S. 27).',
              ],
              prov: 'inf',
              src: [p(26), p(27)],
            },
            { kind: 'check', questionIds: ['be-q15', 'be-q16', 'be-q17'] },
          ],
        },
        {
          id: 'material',
          title: 'Materialien: Huntington und Zypern',
          blocks: [
            {
              kind: 'text',
              md: '**Material A – Gentest bei Chorea Huntington:** Eine 35-jährige Mutter zweier Kinder sucht eine Beratungsstelle auf, weil Chorea Huntington in ihrer Familie mehrfach aufgetreten ist. Die Krankheit tritt meist zwischen dem **vierten und fünften Lebensjahrzehnt** auf; eine ursächliche Therapie gibt es bislang nicht.\n\nUrsache ist eine Genmutation, durch die sich das Triplett **CAG** in einem bestimmten DNA-Abschnitt **mehr als 37-mal** wiederholt. Bei Gesunden wiederholt es sich lediglich **9- bis 35-mal**. Für den Test wird der Abschnitt aus einer Blutprobe isoliert, per **PCR** vervielfältigt und **gelelektrophoretisch** aufgetrennt.',
              src: [p(26, 'Material A')],
            },
            {
              kind: 'widget',
              widget: 'gel-huntington',
              caption: 'Stammbaum und Diagramm der CAG-Anzahl aus Material A deiner PDF',
              src: [p(26, 'Material A')],
            },
            {
              kind: 'note',
              tone: 'warn',
              title: 'Hinweis: Krankheitsverlauf',
              md: 'Deine PDF schreibt, die Krankheit führe „binnen weniger Jahre zum Tod“. Andere Fachquellen beschreiben meist einen längeren Verlauf – häufig werden etwa **15 bis 20 Jahre** nach Beginn der Symptome genannt. Für die Aufgaben ist die Kernaussage entscheidend: Die Krankheit verläuft tödlich, und eine ursächliche Therapie fehlt.',
              src: [p(26, 'Material A')],
              ext: HUNTINGTON_EXT,
            },
            {
              kind: 'text',
              md: '**Material B – Eindämmung der Thalassämie:** Die **β-Thalassämie** ist eine erbliche Form der Blutarmut, die auf Zypern stark verbreitet ist. **Einer von sieben** Einwohnern trägt den Gendefekt, ohne selbst erkrankt zu sein. Sind beide Eltern Überträger, liegt das Risiko für ein erkranktes Kind bei **25 Prozent**. Unbehandelt verläuft die Krankheit tödlich; ein Überleben bis ins Erwachsenenalter ist mit erheblichem medizinischem und finanziellem Aufwand möglich.\n\nSeit **1976** gibt es auf Zypern ein **freiwilliges und kostenloses** Vorsorgeprogramm: Nahezu jeder Erwachsene weiß durch einen Gentest, ob er Überträger ist. Dazu gehören genetische Beratung für Paare mit Kinderwunsch und das Angebot einer Pränataldiagnostik. Rund **ein Viertel** der untersuchten Schwangerschaften wird daraufhin abgebrochen. Die Zahl erkrankter Neugeborener sank erheblich; Lebensdauer und Lebensqualität der Patienten stiegen.',
              src: [p(27, 'Material B')],
            },
            { kind: 'check', questionIds: ['be-q21', 'be-q22', 'be-q23'] },
          ],
        },
      ],
    },
  ],

  terms: [
    // ---------------- erbgaenge ----------------
    { id: 'eg-stammbaum', sub: 'erbgaenge', term: 'Familienstammbaum', def: 'Darstellung einer Familie über mehrere Generationen mit international gebräuchlichen Symbolen; für jedes Mitglied ist erfasst, ob das untersuchte Merkmal aufgetreten ist.', simple: 'Eine Familien-Übersicht, die zeigt, wer das Merkmal hat.', src: [p(28)] },
    { id: 'eg-autosom', sub: 'erbgaenge', term: 'Autosom / Gonosom', def: 'Autosomen: die 22 Chromosomen, die nicht zu den Geschlechtschromosomen gehören (in Körperzellen jeweils doppelt vorhanden). Gonosomen: die beiden Geschlechtschromosomen X und Y.', simple: 'Autosom = „normales“ Chromosom, Gonosom = Geschlechtschromosom.', src: [p(28), p(25)], prov: 'inf' },
    { id: 'eg-dominant', sub: 'erbgaenge', term: 'autosomal-dominanter Erbgang', def: 'Das Gen liegt auf einem Autosom; Betroffene sind heterozygot (Aa) oder homozygot (AA). Im Stammbaum tritt das Merkmal gehäuft über mehrere Generationen auf, beide Geschlechter sind gleich häufig betroffen (z. B. Polydaktylie, Marfan-Syndrom).', simple: 'Ein verändertes Allel reicht für das Merkmal.', src: [p(28)] },
    { id: 'eg-rezessiv', sub: 'erbgaenge', term: 'autosomal-rezessiver Erbgang', def: 'Das Gen liegt auf einem Autosom; das Merkmal tritt nur bei zwei mutierten Allelen (aa) auf. Es ist vergleichsweise selten, beide Geschlechter sind gleich betroffen, und gesunde Eltern können betroffene Kinder haben (z. B. Mukoviszidose).', simple: 'Nur wer zwei veränderte Allele hat, ist betroffen.', src: [p(28)] },
    { id: 'eg-xrezessiv', sub: 'erbgaenge', term: 'X-chromosomal-rezessiver Erbgang', def: 'Das Gen liegt auf dem X-Chromosom, das entsprechende Allel fehlt auf dem Y-Chromosom. Fast nur Männer sind betroffen (hemizygot); heterozygote Frauen sind gesund, können das Allel aber als Konduktorinnen weitergeben (z. B. Hämophilie).', simple: 'Männer haben nur ein X – bei ihnen genügt ein verändertes Allel.', src: [p(25)] },
    { id: 'eg-hemizygot', sub: 'erbgaenge', term: 'hemizygot', def: 'Ein Allel liegt nur einmal vor – z. B. bei Männern für Gene auf dem X-Chromosom, weil das entsprechende Allel auf dem Y-Chromosom fehlt.', simple: 'Nur eine Kopie des Gens.', src: [p(25)] },
    { id: 'eg-konduktor', sub: 'erbgaenge', term: 'Überträger / Konduktor(in)', def: 'Heterozygote, phänotypisch gesunde Person, die ein mutiertes rezessives Allel an ihre Nachkommen weitergeben kann – bei Mukoviszidose „Überträger oder Konduktoren“, bei X-chromosomalen Erbgängen heterozygote Frauen („Konduktorinnen“).', simple: 'Gesund, trägt die Anlage aber weiter.', src: [p(28), p(25)] },
    { id: 'eg-zygot', sub: 'erbgaenge', term: 'heterozygot / homozygot', def: 'Heterozygot: zwei verschiedene Allele eines Gens (Aa). Homozygot: zwei gleiche Allele (AA oder aa).', simple: 'Misch- bzw. reinerbig.', src: [p(28)], prov: 'inf' },
    { id: 'eg-polydaktylie', sub: 'erbgaenge', term: 'Polydaktylie', def: 'Erbliche anatomische Besonderheit mit zusätzlichen Fingern oder Zehen; wird autosomal-dominant vererbt.', simple: 'Mehr als fünf Finger oder Zehen.', src: [p(28)] },
    { id: 'eg-marfan', sub: 'erbgaenge', term: 'Marfan-Syndrom', def: 'Autosomal-dominante Erbkrankheit: ungewöhnlich großer Wuchs, überlange Gliedmaßen, Bindegewebsschwäche. Die Mutation führt zur fehlerhaften Bildung des Proteins Fibrillin; in etwa 25–30 % der Fälle tritt sie in einer Familie erstmals als Spontanmutation auf.', simple: 'Bindegewebskrankheit durch fehlerhaftes Fibrillin.', src: [p(28)] },
    { id: 'eg-syndrom', sub: 'erbgaenge', term: 'Syndrom', def: 'Unterschiedliche Symptome, die zu einem charakteristischen Krankheitsbild zusammengefasst werden.', simple: 'Viele Symptome, ein Krankheitsbild.', src: [p(28)] },
    { id: 'eg-polyphaenie', sub: 'erbgaenge', term: 'Polyphänie', def: 'Ein Gen führt zur Ausbildung mehrerer Symptome – z. B. beim Marfan-Syndrom.', simple: 'Ein Gen, viele Wirkungen.', src: [p(28)] },
    { id: 'eg-spontan', sub: 'erbgaenge', term: 'Spontanmutation', def: 'Mutation, durch die eine Erbkrankheit in einer Familie erstmalig auftritt – beim Marfan-Syndrom in etwa 25 bis 30 Prozent der Fälle.', simple: 'Die Veränderung entsteht neu, ohne Vorfahren mit der Krankheit.', src: [p(28)] },
    { id: 'eg-muko', sub: 'erbgaenge', term: 'Mukoviszidose (cystische Fibrose)', def: 'Autosomal-rezessive Stoffwechselkrankheit: Mutationen eines Gens auf Chromosom 7 führen zu defekten Ionenkanälen; Drüsen bilden zähen Schleim, u. a. in den Bronchien → chronischer Husten, Atemwegsinfektionen. Bislang nicht heilbar.', simple: 'Zäher Schleim durch defekte Ionenkanäle.', src: [p(28)] },
    { id: 'eg-haemophilie', sub: 'erbgaenge', term: 'Hämophilie (Bluterkrankheit)', def: 'X-chromosomal-rezessive Erbkrankheit: Die Blutgerinnung erfolgt zu langsam, schon kleinere Verletzungen führen zu schwer stillbaren Blutungen; trat gehäuft im europäischen Adel auf.', simple: 'Das Blut gerinnt zu langsam.', src: [p(25)] },
    { id: 'eg-rachitis', sub: 'erbgaenge', term: 'Vitamin-D-resistente Rachitis', def: 'Beispiel für eine der sehr seltenen X-chromosomal-dominant vererbten Krankheiten; Betroffene zeigen Minderwuchs und Knochenverformungen.', src: [p(25)] },
    { id: 'eg-analyse', sub: 'erbgaenge', term: 'Stammbaumanalyse', def: 'Methode, um Phänotypen die Genotypen zuzuordnen – nur für monogen vererbte Merkmale; Grundlage für Risikoabschätzungen. Schritte: Hypothese, mögliche Genotypen, Beweis des Erbgangs.', simple: 'Aus dem Familienbild den Erbgang ableiten.', src: [p(25)] },
    { id: 'eg-monogen', sub: 'erbgaenge', term: 'monogen', def: 'Ein Merkmal hängt von einem einzelnen Gen ab.', simple: 'Ein Gen – ein Merkmal.', src: [p(25)] },
    { id: 'eg-duchenne', sub: 'erbgaenge', term: 'Muskeldystrophie Typ Duchenne', def: 'Erbkrankheit mit fortschreitender Degeneration der Muskulatur (Material A deiner PDF).', simple: 'Die Muskulatur baut nach und nach ab.', src: [p(25, 'Material A')] },
    { id: 'eg-gensonde', sub: 'erbgaenge', term: 'markierte Gensonde', def: 'Markierter Nachweisstoff für einen bestimmten DNA-Abschnitt: Er lagert sich an passende (komplementäre) Einzelstrang-Fragmente an, sodass im Duchenne-Material nur die Fragmente der Allele 1 und 2 im Autoradiogramm als Banden erscheinen.', simple: 'Ein markiertes Suchstück, das nur „seine“ DNA findet.', src: [p(25, 'Material A')], prov: 'inf' },

    // ---------------- beratung ----------------
    { id: 'be-beratung', sub: 'beratung', term: 'genetische Beratung', def: 'Die persönliche und familiäre Vorgeschichte wird erhoben (oft Stammbaum über mindestens drei Generationen) und die Wahrscheinlichkeit einer Erbkrankheit eingeschätzt; dazu gehören Informationen zur Krankheit, zur Lebens- und Familienplanung und zu psychisch-sozialen Folgen.', simple: 'Fachleute schätzen das Risiko ein und erklären, was es bedeutet.', src: [p(26)] },
    { id: 'be-gentest', sub: 'beratung', term: 'Gentest', def: 'Analyse von DNA aus Blut- oder Mundschleimhautproben; ermöglicht eindeutige Aussagen, bislang aber nur für wenige monogene Erkrankungen (z. B. erblicher Brust-, Prostata- und Darmkrebs, Mukoviszidose). Nur mit Einwilligung nach Aufklärung.', simple: 'Direkter Blick in die Gene statt einer Schätzung.', src: [p(26)] },
    { id: 'be-nichtwissen', sub: 'beratung', term: 'Recht auf Nichtwissen', def: 'Ratsuchende bestimmen selbst, in welchem Umfang sie über das Ergebnis eines Gentests informiert werden.', simple: 'Niemand muss sein Testergebnis erfahren.', src: [p(26)] },
    { id: 'be-praenatal', sub: 'beratung', term: 'Pränataldiagnostik', def: 'Untersuchungen mit dem Ziel, Chromosomenanomalien und Erbkrankheiten bereits beim ungeborenen Kind zu erkennen; man unterscheidet nichtinvasive und invasive Methoden.', simple: 'Untersuchungen vor der Geburt.', src: [p(26), p(27)] },
    { id: 'be-invasiv', sub: 'beratung', term: 'nichtinvasiv / invasiv', def: 'Nichtinvasiv: ohne Eingriff in Fruchtblase oder Mutterkuchen – z. B. Ultraschall, Ersttrimester-Screening, NIPT (Blutprobe der Schwangeren). Invasiv: kindliche Zellen werden mit einer Hohlnadel entnommen (Chorionzottenbiopsie, Amniozentese); Infektionen oder Verletzungen des Fetus sind möglich und können zu Fehlgeburten führen.', simple: 'Ohne bzw. mit Nadel-Eingriff.', src: [p(27)], prov: 'inf' },
    { id: 'be-ersttrimester', sub: 'beratung', term: 'Ersttrimester-Screening', def: 'Auf Wunsch der Schwangeren im ersten Schwangerschaftsdrittel: Bestimmung des Risikos für Chromosomenveränderungen oder Fehlbildungen, u. a. durch Messung der Nackentransparenz.', simple: 'Risiko-Check im ersten Schwangerschaftsdrittel.', src: [p(27)] },
    { id: 'be-nacken', sub: 'beratung', term: 'Nackentransparenz', def: 'Zwischen der 11. und 14. Schwangerschaftswoche im Ultraschall sichtbare Flüssigkeitsansammlung im Nackenbereich des Ungeborenen; ist sie vergrößert, ist die Wahrscheinlichkeit für eine Trisomie 21 oder eine andere Fehlbildung deutlich erhöht.', simple: 'Flüssigkeit im Nacken, im Ultraschall gemessen.', src: [p(27)] },
    { id: 'be-nipt', sub: 'beratung', term: 'NIPT (nichtinvasiver Pränataltest)', def: 'Bluttest der Schwangeren: Zellfreie Bruchstücke fetaler DNA aus dem fetalen Anteil der Plazenta werden den Chromosomen zugeordnet und zahlenmäßig erfasst → Wahrscheinlichkeit einer Trisomie 13, 18 oder 21.', simple: 'Kindliche DNA-Schnipsel im Blut der Mutter zählen.', src: [p(27)] },
    { id: 'be-chorion', sub: 'beratung', term: 'Chorionzottenbiopsie', def: 'Invasive Methode in der 12.–13. Schwangerschaftswoche: Mit einer dünnen Hohlnadel werden kindliche Zellen aus dem entstehenden Mutterkuchen (Chorion) entnommen, kultiviert und auf Chromosomenanomalien untersucht.', simple: 'Zellen aus dem Mutterkuchen entnehmen.', src: [p(27)] },
    { id: 'be-amnio', sub: 'beratung', term: 'Amniozentese', def: 'Invasive Methode ab der 15. Schwangerschaftswoche: Mit einer Hohlnadel wird Fruchtwasser aus der Fruchtblase entnommen; die enthaltenen fetalen Zellen dienen für Chromosomenanalysen und Gentests.', simple: 'Fruchtwasser-Untersuchung.', src: [p(27)] },
    { id: 'be-pid', sub: 'beratung', term: 'Präimplantationsdiagnostik (PID)', def: 'Genetische Untersuchung in vitro erzeugter Embryonen: Nach dem 8-Zellstadium werden Zellen entnommen und untersucht; nur Embryonen ohne mutierte Allele werden in die Gebärmutter übertragen. In Deutschland nur bei hohem Risiko für eine schwerwiegende Erbkrankheit oder zu erwartender Schädigung des Kindes zulässig; eine Ethikkommission entscheidet.', simple: 'Embryonen vor dem Einpflanzen genetisch testen.', src: [p(27)] },
    { id: 'be-totipotent', sub: 'beratung', term: 'totipotent', def: 'Eine totipotente Zelle kann sich einzeln zu einem vollständigen Embryo entwickeln. Die bei der PID nach dem 8-Zellstadium entnommenen Zellen sind nicht mehr totipotent.', simple: 'Kann noch ein ganzer Embryo werden.', src: [p(27)] },
    { id: 'be-personalisiert', sub: 'beratung', term: 'personalisierte Medizin', def: 'Diagnose, Therapie und Prävention, die sich am individuellen Genotyp orientieren und dafür Biomarker nutzen; so können unwirksame Medikamente und ihre Nebenwirkungen erspart werden (z. B. Herceptin bei Brustkrebs; auch bei Hepatitis C und HIV).', simple: 'Die Behandlung wird an die Gene des Patienten angepasst.', src: [p(27)] },
    { id: 'be-biomarker', sub: 'beratung', term: 'Biomarker', def: 'Erfasste genetische, molekulare oder zelluläre Besonderheiten von Patienten, die für Diagnose, Therapie und Prävention genutzt werden.', simple: 'Messbare Kennzeichen im Körper.', src: [p(27)] },
    { id: 'be-huntington', sub: 'beratung', term: 'Chorea Huntington', def: 'Erbkrankheit, bei der sich das Triplett CAG in einem bestimmten DNA-Abschnitt mehr als 37-mal wiederholt (bei Gesunden 9- bis 35-mal); tritt meist im vierten bis fünften Lebensjahrzehnt auf, eine ursächliche Therapie gibt es bislang nicht.', simple: 'Zu viele CAG-Wiederholungen in einem Gen.', src: [p(26, 'Material A')] },
    { id: 'be-thalassaemie', sub: 'beratung', term: 'β-Thalassämie', def: 'Erbliche Form der Blutarmut, auf Zypern stark verbreitet; unbehandelt tödlich.', simple: 'Erbliche Blutarmut.', src: [p(27, 'Material B'), p(24, 'Material A')] },
    { id: 'be-deskriptiv', sub: 'beratung', term: 'deskriptive Aussage', def: 'Beschreibt, was ist – einen Sachverhalt, der sich grundsätzlich überprüfen lässt (z. B. „Auf Zypern trägt einer von sieben Einwohnern den Gendefekt.“).', simple: 'Beschreibt Fakten.', src: [p(29)], prov: 'ext', ext: ETHIK_EXT },
    { id: 'be-normativ', sub: 'beratung', term: 'normative Aussage', def: 'Sagt, was sein soll oder wie etwas zu bewerten ist; oft erkennbar an Wörtern wie „sollte“, „darf“, „gut“, „richtig“. Aus deskriptiven Aussagen allein folgt keine normative Aussage.', simple: 'Bewertet oder fordert etwas.', src: [p(29)], prov: 'ext', ext: ETHIK_EXT },
  ],

  cards: [
    { id: 'eg-c1', sub: 'erbgaenge', kind: 'prozess', front: 'Stammbaumanalyse in drei Schritten', back: '1 Hypothese: dominant oder rezessiv? Autosom oder Gonosom?\n2 Genotypen: zuerst die eindeutigen, dann für alle übrigen die möglichen.\n3 Beweis an einer eindeutigen Stelle – und dort andere Erbgänge ausschließen.', src: [p(25)], prov: 'pdf' },
    { id: 'eg-c2', sub: 'erbgaenge', kind: 'vergleich', front: 'Autosomal-dominant vs. autosomal-rezessiv im Stammbaum', back: 'Dominant: gehäuft, über mehrere Generationen; Betroffene AA oder Aa.\nRezessiv: selten; gesunde Eltern können kranke Kinder haben; Betroffene aa, Heterozygote sind Überträger.\nBeide: Männer und Frauen gleich häufig betroffen.', src: [p(28), p(25)], prov: 'pdf' },
    { id: 'eg-c3', sub: 'erbgaenge', kind: 'ursache', front: 'Ursache: Das Hämophilie-Gen liegt auf dem X-Chromosom, auf dem Y-Chromosom fehlt das Allel. → Wirkung?', back: 'Männer sind hemizygot: Schon ein mutiertes Allel führt zur Krankheit – daher sind fast nur Männer betroffen. Heterozygote Frauen sind gesunde Konduktorinnen.', src: [p(25)], prov: 'pdf' },
    { id: 'eg-c4', sub: 'erbgaenge', kind: 'frage', front: 'Warum sind Heterozygote (Aa) bei Mukoviszidose gesund?', back: 'Das nicht mutierte Allel A codiert für ausreichend funktionsfähige Ionenkanäle. Erst bei aa fehlen funktionierende Ionenkanäle.', src: [p(28)], prov: 'pdf' },
    { id: 'eg-c5', sub: 'erbgaenge', kind: 'frage', front: 'Warum spricht man beim Marfan-Syndrom von Polyphänie?', back: 'Ein Gen – dessen Mutation zur fehlerhaften Bildung von Fibrillin führt – bewirkt mehrere Symptome (Großwuchs, überlange Gliedmaßen, Bindegewebsschwäche).', src: [p(28)], prov: 'pdf' },
    { id: 'eg-c6', sub: 'erbgaenge', kind: 'experiment', front: 'Duchenne-Autoradiogramm: Die kranken Söhne zeigen nur Allel 1, gesunde Männer nur Allel 2. Was folgt daraus?', back: 'Allel 1 ist das Krankheitsallel. Männer haben nur eine Bande (hemizygot) → X-chromosomal. Die Frauen 2, 5 und 8 besitzen beide Allele → Konduktorinnen; 4 und 9 nur Allel 2.', src: [p(25, 'Material A')], prov: 'inf' },
    { id: 'eg-c7', sub: 'erbgaenge', kind: 'abbildung', front: 'Methodenstammbaum: Warum schließt Person 24 einen X-chromosomal-rezessiven Erbgang aus?', back: 'Person 24 ist eine kranke Tochter gesunder Eltern (16, 17). Bei X-chromosomaler Vererbung hätte sie ein mutiertes Allel vom Vater 17 erhalten – dann wäre er krank.', src: [p(25)], prov: 'pdf', figure: { widget: 'pedigree-method', highlight: '24' } },
    { id: 'eg-c8', sub: 'erbgaenge', kind: 'vergleich', front: 'Gonosomale Erbgänge im Überblick', back: 'X-chromosomal-rezessiv: fast nur Männer betroffen (Hämophilie).\nX-chromosomal-dominant: sehr selten (Vitamin-D-resistente Rachitis).\nY-chromosomal: sehr selten.', src: [p(25)], prov: 'pdf' },
    { id: 'be-c1', sub: 'beratung', kind: 'vergleich', front: 'Stammbaumanalyse vs. Gentest', back: 'Stammbaum: häufig nur eine Abschätzung des Risikos.\nGentest: eindeutige Aussagen – bislang aber nur für wenige monogene Erkrankungen; nur mit Einwilligung.', src: [p(26)], prov: 'pdf' },
    { id: 'be-c2', sub: 'beratung', kind: 'vergleich', front: 'Chorionzottenbiopsie vs. Amniozentese', back: 'Chorionzottenbiopsie: 12.–13. SSW, kindliche Zellen aus dem Chorion (entstehender Mutterkuchen).\nAmniozentese: ab 15. SSW, Fruchtwasser aus der Fruchtblase.\nBeide invasiv (Hohlnadel) – Risiko: Infektion, Verletzung des Fetus, Fehlgeburt.', src: [p(27)], prov: 'pdf' },
    { id: 'be-c3', sub: 'beratung', kind: 'prozess', front: 'Ablauf einer Präimplantationsdiagnostik', back: 'Hormonbehandlung → Befruchtung in vitro → Achtzellstadium → Zellentnahme → DNA-Isolierung und Untersuchung → nur Embryonen ohne Mutation werden eingepflanzt.', src: [p(27, 'Abb. 4')], prov: 'pdf' },
    { id: 'be-c4', sub: 'beratung', kind: 'frage', front: 'Was bedeutet es, dass die bei der PID entnommenen Zellen nicht mehr totipotent sind?', back: 'Sie können sich nicht mehr einzeln zu einem vollständigen Embryo entwickeln (Entnahme nach dem 8-Zellstadium).', src: [p(27)], prov: 'pdf' },
    { id: 'be-c5', sub: 'beratung', kind: 'ursache', front: 'Ursache: Gentest-Ergebnisse betreffen auch Kinder, Geschwister sowie Arbeits- und Versicherungsverhältnis. → Wirkung?', back: 'In Deutschland dürfen Gentests nur in medizinisch begründeten Fällen durchgeführt werden.', src: [p(26)], prov: 'pdf' },
    { id: 'be-c6', sub: 'beratung', kind: 'frage', front: 'Worauf beruht der NIPT?', back: 'Im Blut der Schwangeren gibt es zellfreie Bruchstücke fetaler DNA (aus dem fetalen Anteil der Plazenta). Sie werden den Chromosomen zugeordnet und gezählt → Wahrscheinlichkeit für Trisomie 13, 18 oder 21.', src: [p(27)], prov: 'pdf' },
    { id: 'be-c7', sub: 'beratung', kind: 'experiment', front: 'Huntington-Diagramm: Person 2 hat Banden bei 86 und ca. 16 CAG-Wiederholungen. Bedeutung?', back: 'Ein Allel liegt weit über 37 Wiederholungen: Sie trägt das Huntington-Allel (heterozygot) und wird voraussichtlich erkranken. Ihre Kinder 4 und 5 haben nur Allele unter 34 – sie haben ihr gesundes Allel geerbt.', src: [p(26, 'Material A')], prov: 'inf' },
    { id: 'be-c8', sub: 'beratung', kind: 'ursache', front: 'Ursache: Herceptin wirkt nur bei Tumorzellen mit einem bestimmten genetischen Merkmal auf der Oberfläche. → Wirkung?', back: 'Es wird nur Patientinnen gegeben, deren Tumorzellen dieses Merkmal tragen – anderen bleiben unwirksame Behandlung und Nebenwirkungen erspart (personalisierte Medizin).', src: [p(27)], prov: 'pdf' },
    { id: 'be-c9', sub: 'beratung', kind: 'vergleich', front: 'Deskriptive vs. normative Aussage', back: 'Deskriptiv: beschreibt, was ist („Einer von sieben Zyprioten ist Überträger.“).\nNormativ: sagt, was sein soll („Jedes Paar sollte sich testen lassen.“) – erkennbar an sollte, darf, gut, richtig.', src: [p(29)], prov: 'ext', ext: ETHIK_EXT },
  ],

  questions: [
    // ---------------- erbgaenge ----------------
    {
      id: 'eg-q1', sub: 'erbgaenge', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(28)],
      prompt: 'Wozu wird in der Humangenetik ein Familienstammbaum erstellt?',
      options: ['um den Erbgang eines Merkmals zu ermitteln', 'um die DNA-Sequenz eines Gens zu bestimmen', 'um Chromosomen im Mikroskop zu zählen', 'um die Mutationsrate pro Generation zu messen'],
      answer: 0,
      why: [{ text: 'Anhand des Stammbaums lässt sich klären, ob ein Gen dominant oder rezessiv vererbt wird und ob es auf einem Autosom oder einem Gonosom liegt.', prov: 'pdf', src: [p(28)] }],
    },
    {
      id: 'eg-q2', sub: 'erbgaenge', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(28, 'Abb. 2')],
      prompt: 'Ordne die Stammbaumsymbole ihrer Bedeutung zu.',
      pairs: [
        { left: 'Quadrat', right: 'männliches Individuum' },
        { left: 'Kreis', right: 'weibliches Individuum' },
        { left: 'farbig ausgefülltes Symbol', right: 'Merkmalsträger' },
        { left: 'Doppellinie zwischen zwei Personen', right: 'Verwandtenehe oder Partner' },
      ],
      distractors: ['Zwillinge'],
      why: [{ text: 'Abb. 2 „Stammbaumsymbolik“ in deiner PDF.', prov: 'pdf', src: [p(28, 'Abb. 2')] }],
    },
    {
      id: 'eg-q3', sub: 'erbgaenge', type: 'multi', level: 2, err: 'inheritance', prov: 'pdf', src: [p(28)],
      prompt: 'Welche Kennzeichen eines autosomal-dominanten Erbgangs nennt deine PDF am Beispiel der Polydaktylie?',
      options: ['Das Merkmal tritt gehäuft und über mehrere Generationen auf.', 'Beide Geschlechter sind im Mittel gleich häufig betroffen.', 'Fast nur Männer sind betroffen.', 'Das Merkmal überspringt typischerweise Generationen.'],
      answers: [0, 1],
      why: [
        { text: 'Gehäuftes Auftreten über mehrere Generationen und gleich häufig betroffene Geschlechter kennzeichnen den autosomal-dominanten Erbgang.', prov: 'pdf', src: [p(28)] },
        { text: 'Übersprungene Generationen sind ein Beleg für Rezessivität, „fast nur Männer“ spricht für X-chromosomale Vererbung.', prov: 'pdf', src: [p(25)] },
      ],
    },
    {
      id: 'eg-q4', sub: 'erbgaenge', type: 'input', level: 3, err: 'inheritance', prov: 'pdf', src: [p(28)], mode: 'number', unit: '%',
      prompt: 'Polydaktylie (autosomal-dominant): Ein Elternteil ist heterozygot (Aa), der andere homozygot für das rezessive Allel (aa). Wie hoch ist die Wahrscheinlichkeit für ein betroffenes Kind?',
      accept: ['50'],
      solution: '50 % – aus Aa × aa entstehen Aa und aa je zur Hälfte; Aa ist betroffen.',
      why: [
        { text: 'Deine PDF nennt für diesen Fall 50 Prozent.', prov: 'pdf', src: [p(28)] },
        { text: 'Kreuzungsschema: Der Elternteil Aa gibt A oder a weiter, der Elternteil aa immer a → Aa oder aa, je 1/2.', prov: 'inf' },
      ],
    },
    {
      id: 'eg-q5', sub: 'erbgaenge', type: 'input', level: 3, err: 'inheritance', prov: 'pdf', src: [p(28)], mode: 'number', unit: '%',
      prompt: 'Beide Eltern sind heterozygot (Aa) für ein autosomal-dominantes Merkmal. Wie hoch ist die Wahrscheinlichkeit für ein betroffenes Kind?',
      accept: ['75'],
      solution: '75 % – AA (1/4) und Aa (1/2) sind betroffen, nur aa (1/4) nicht.',
      why: [
        { text: 'Deine PDF nennt 75 Prozent; betroffene Kinder haben den Genotyp AA oder Aa.', prov: 'pdf', src: [p(28)] },
        { text: 'Kreuzungsschema Aa × Aa: AA : Aa : aa = 1 : 2 : 1 → 3 von 4 Kombinationen enthalten A.', prov: 'inf' },
      ],
    },
    {
      id: 'eg-q6', sub: 'erbgaenge', type: 'cloze', level: 1, err: 'facts', prov: 'pdf', src: [p(28)],
      prompt: 'Ergänze die Angaben zum Marfan-Syndrom.',
      text: 'Zu den heute etwa {{0}} bekannten autosomal-dominanten Erbkrankheiten gehört das Marfan-Syndrom. In etwa {{1}} Prozent der Fälle tritt es in einer Familie erstmalig als Spontanmutation auf. Die Mutation führt zur fehlerhaften Bildung des Proteins {{2}}. Da ein Gen mehrere Symptome bewirkt, spricht man von {{3}}.',
      gaps: [
        { accept: ['1000'], options: ['100', '1000', '10 000'] },
        { accept: ['25 bis 30'], options: ['5 bis 10', '25 bis 30', '60 bis 70'] },
        { accept: ['Fibrillin'], options: ['Fibrillin', 'Kollagen', 'Hämoglobin'] },
        { accept: ['Polyphänie'], options: ['Polyphänie', 'Polydaktylie', 'Hemizygotie'] },
      ],
      why: [{ text: 'Alle Angaben stehen auf PDF S. 28 (Buch S. 295).', prov: 'pdf', src: [p(28)] }],
    },
    {
      id: 'eg-q7', sub: 'erbgaenge', type: 'single', level: 2, err: 'terms', prov: 'pdf', src: [p(28)],
      prompt: 'Was bedeutet „Syndrom“ beim Marfan-Syndrom?',
      options: ['Unterschiedliche Symptome werden zu einem charakteristischen Krankheitsbild zusammengefasst.', 'Die Krankheit entsteht immer durch eine Spontanmutation.', 'Mehrere Gene verursachen gemeinsam ein Merkmal.', 'Die Krankheit tritt nur bei einem Geschlecht auf.'],
      answer: 0,
      feedback: { 2: 'Beim Marfan-Syndrom ist es umgekehrt: Ein Gen bewirkt mehrere Symptome (Polyphänie).', 1: 'Nur in etwa 25–30 % der Fälle tritt die Krankheit als Spontanmutation erstmals in einer Familie auf.' },
      why: [{ text: 'Das Krankheitsbild ergibt sich aus unterschiedlichen Symptomen, die als Syndrom zusammengefasst werden.', prov: 'pdf', src: [p(28)] }],
    },
    {
      id: 'eg-q8', sub: 'erbgaenge', type: 'free', level: 2, err: 'mechanism', prov: 'pdf', src: [p(28)], operator: 'Erklären',
      prompt: 'Erkläre, warum Mukoviszidose rezessiv vererbt wird.',
      rubric: [
        { id: 'aa', label: 'Sind beide Allele mutiert (aa), fehlen funktionierende Ionenkanäle → Krankheit', any: [['beide allele|homozygot|reinerbig|cs:\\baa\\b', 'ionenkanal|kanaele|krank|erkrank']], weight: 1 },
        { id: 'hetero', label: 'Heterozygote (Aa) sind phänotypisch gesund', any: [['heterozygot|mischerbig', 'gesund|nicht krank|nicht erkrank|nicht betroffen|keine symptome'], ['cs:\\bAa\\b', 'gesund|nicht krank|nicht erkrank|nicht betroffen|keine symptome']], weight: 1 },
        { id: 'grund', label: 'Grund: Das nicht mutierte Allel A codiert für ausreichend funktionsfähige Ionenkanäle', any: [['ausreichend|genug|reicht|genuegt|intakte allel|nicht mutierte allel|gesunde allel|normale allel|funktionsfaehig']], weight: 1.5 },
        { id: 'traeger', label: 'Heterozygote können das Allel als Überträger (Konduktoren) weitergeben', any: [['uebertraeger|konduktor|weitergeb|weitervererb']], weight: 0.5 },
      ],
      misconceptions: [
        { id: 'dominant', any: [['mukoviszidose (ist|wird) (autosomal )?dominant']], feedback: 'Mukoviszidose wird autosomal-rezessiv vererbt: Heterozygote sind gesund.' },
      ],
      model: 'Mukoviszidose tritt nur auf, wenn beide Allele des Gens auf Chromosom 7 mutiert sind (aa): Dann werden keine funktionierenden Ionenkanäle gebildet. Heterozygote Personen (Aa) sind phänotypisch gesund, weil das nicht mutierte Allel A für ausreichend funktionsfähige Ionenkanäle codiert. Das mutierte Allel wirkt sich also nur im homozygoten Zustand aus – der Erbgang ist rezessiv. Heterozygote können das defekte Allel als Überträger (Konduktoren) an ihre Nachkommen weitergeben.',
      why: [{ text: 'Erklärung nach PDF S. 28 (Buch S. 295).', prov: 'pdf', src: [p(28)] }],
    },
    {
      id: 'eg-q9', sub: 'erbgaenge', type: 'match', level: 2, err: 'inheritance', prov: 'pdf', src: [p(28)],
      prompt: 'Mukoviszidose (a = Allel Betroffener): Ordne jedem Genotyp den Phänotyp zu.',
      pairs: [
        { left: 'aa', right: 'erkrankt' },
        { left: 'Aa', right: 'gesund, aber Überträger' },
        { left: 'AA', right: 'gesund, kein Überträger' },
      ],
      distractors: ['leicht erkrankt'],
      why: [
        { text: 'aa: keine funktionierenden Ionenkanäle → krank. Aa: phänotypisch gesund, kann das Allel aber weitergeben.', prov: 'pdf', src: [p(28)] },
        { text: 'AA besitzt kein mutiertes Allel – diese Person ist gesund und kann es auch nicht weitergeben.', prov: 'inf' },
      ],
    },
    {
      id: 'eg-q10', sub: 'erbgaenge', type: 'single', level: 2, err: 'inheritance', prov: 'pdf', src: [p(25)],
      prompt: 'Warum sind von der Hämophilie fast nur Männer betroffen?',
      options: ['Das Gen liegt auf dem X-Chromosom, auf dem Y-Chromosom fehlt das entsprechende Allel – Männer sind hemizygot.', 'Das Gen liegt auf dem Y-Chromosom.', 'Das Allel ist dominant, wirkt aber nur bei Männern.', 'Die Mutation entsteht nur in Spermienzellen.'],
      answer: 0,
      feedback: { 1: 'Dann könnten Frauen keine Konduktorinnen sein – das Gen liegt auf dem X-Chromosom.', 2: 'Die Hämophilie wird rezessiv vererbt: Die Eltern Erkrankter sind gesund.' },
      why: [{ text: 'Männer mit dem mutierten Allel auf dem X-Chromosom sind hemizygot – schon ein mutiertes Allel führt zur Krankheit.', prov: 'pdf', src: [p(25)] }],
    },
    {
      id: 'eg-q11', sub: 'erbgaenge', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(25)],
      prompt: 'Was bedeutet „hemizygot“?',
      options: ['Ein Allel liegt nur einmal vor – z. B. bei Männern für Gene auf dem X-Chromosom.', 'Beide Allele sind gleich.', 'Beide Allele sind verschieden.', 'Ein Gen liegt dreimal vor.'],
      answer: 0,
      why: [{ text: 'Das entsprechende Allel fehlt auf dem Y-Chromosom; Männer sind hinsichtlich X-chromosomaler Allele hemizygot.', prov: 'pdf', src: [p(25)] }],
    },
    {
      id: 'eg-q12', sub: 'erbgaenge', type: 'tf', level: 2, err: 'inheritance', prov: 'pdf', src: [p(25)],
      prompt: 'Heterozygote Frauen erkranken bei der Hämophilie in der Regel, weil ein mutiertes Allel ausreicht.',
      answer: false,
      correction: 'Heterozygote Frauen sind gesund, weil sie auf dem homologen X-Chromosom ein nicht mutiertes Allel besitzen. Sie können das mutierte Allel als Konduktorinnen weitergeben.',
      why: [{ text: 'Nur bei hemizygoten Männern genügt ein mutiertes Allel.', prov: 'pdf', src: [p(25)] }],
    },
    {
      id: 'eg-q13', sub: 'erbgaenge', type: 'free', level: 3, err: 'inheritance', prov: 'inf', src: [p(25, 'Abb. 6')], operator: 'Begründen',
      prompt: 'Im Hämophilie-Stammbaum des europäischen Adels ist Leopold Bluter; seine Tochter Alice ist gesund, aber als Konduktorin markiert. Begründe, warum Alice Konduktorin sein muss.',
      rubric: [
        { id: 'leopold', label: 'Leopold trägt das mutierte Allel auf seinem einzigen X-Chromosom (XᵃY)', any: [['leopold|vater', 'mutiert|defekt|krank|bluter|\\bxa']], weight: 1 },
        { id: 'weitergabe', label: 'Ein Vater gibt sein X-Chromosom an alle Töchter weiter', any: [['tochter|toechter', 'x chromosom|\\bx\\b|\\bxa']], weight: 1.5 },
        { id: 'hetero', label: 'Alice ist gesund, weil sie von der Mutter ein nicht mutiertes Allel hat → heterozygot (XᴬXᵃ)', any: [['heterozygot|mischerbig|mutter|zweite|nicht mutiert|gesunde allel'], ['cs:X\\s?A\\s?X\\s?a']], weight: 1 },
      ],
      model: 'Leopold ist Bluter und damit hemizygot für das mutierte Allel: XᵃY. Ein Vater gibt sein X-Chromosom an jede Tochter weiter (an Söhne das Y-Chromosom). Alice hat daher sicher Xᵃ von Leopold erhalten. Da sie gesund ist, muss sie von ihrer Mutter ein nicht mutiertes Allel (Xᴬ) haben. Sie ist also heterozygot (XᴬXᵃ) – eine Konduktorin.',
      why: [
        { text: 'In Abb. 6 deiner PDF ist Alice als Konduktorin markiert; heterozygote Frauen sind gesunde Konduktorinnen.', prov: 'pdf', src: [p(25, 'Abb. 6')] },
        { text: 'Dass ein Vater sein X-Chromosom an alle Töchter weitergibt, folgt aus der Verteilung der Geschlechtschromosomen: Töchter erhalten vom Vater X, Söhne Y.', prov: 'inf' },
      ],
    },
    {
      id: 'eg-q14', sub: 'erbgaenge', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(25)],
      prompt: 'Bringe die Schritte der Stammbaumanalyse in die Reihenfolge deiner PDF.',
      items: [
        'Hypothese bilden: dominant oder rezessiv? Autosom oder Gonosom?',
        'Genotypen angeben, die für die Hypothese eindeutig sind',
        'Für die übrigen Personen alle möglichen Genotypen angeben',
        'An einer eindeutigen Stelle nachweisen, dass die Hypothese stimmt',
        'Zeigen, dass andere denkbare Erbgänge nicht möglich sind',
      ],
      why: [{ text: 'Allgemeine Vorgehensweise der Methodenseite „Stammbaumanalyse“.', prov: 'pdf', src: [p(25)] }],
    },
    {
      id: 'eg-q15', sub: 'erbgaenge', type: 'match', level: 2, err: 'inheritance', prov: 'pdf', src: [p(25)],
      prompt: 'Welche Vermutung legt die Beobachtung im Stammbaum nahe?',
      pairs: [
        { left: 'Krankheit tritt gehäuft und fast in jeder Generation auf', right: 'dominanter Erbgang' },
        { left: 'Gesunde Eltern haben ein erkranktes Kind', right: 'Beleg für Rezessivität' },
        { left: 'Männer und Frauen sind gleichermaßen Merkmalsträger', right: 'autosomaler Erbgang wahrscheinlich' },
        { left: 'Krankheit tritt ausschließlich bei Männern auf', right: 'vermutlich X-chromosomale Vererbung' },
      ],
      distractors: ['Y-chromosomaler Erbgang bewiesen'],
      why: [{ text: 'Kriterien für die Hypothesenbildung aus deiner PDF.', prov: 'pdf', src: [p(25)] }],
    },
    {
      id: 'eg-q16', sub: 'erbgaenge', type: 'multi', level: 3, err: 'inheritance', prov: 'pdf', src: [p(25)], figure: { widget: 'pedigree-method' },
      prompt: 'Beispielstammbaum der Methodenseite (autosomal-rezessiv): Welche gesunden Personen können auch homozygot (AA) sein?',
      options: ['8', '23', '25', '26', '16', '17', '2', '11'],
      answers: [0, 1, 2, 3],
      why: [
        { text: 'Deine PDF nennt die Personen 8, 23, 25 und 26.', prov: 'pdf', src: [p(25)] },
        { text: 'Alle anderen Gesunden müssen ein a tragen: Sie haben einen kranken Elternteil (aa) – z. B. 11 und 16 den Vater 5, 17 den Vater 9 – oder ein krankes Kind (2 hat kranke Kinder; 16 und 17 das Kind 24).', prov: 'inf' },
      ],
    },
    {
      id: 'eg-q17', sub: 'erbgaenge', type: 'single', level: 3, err: 'inheritance', prov: 'pdf', src: [p(25)], figure: { widget: 'pedigree-method', highlight: '24' },
      prompt: 'Welche Beobachtung nutzt deine PDF, um im Beispielstammbaum einen X-chromosomal-rezessiven Erbgang auszuschließen?',
      options: [
        'Die gesunden Eltern 16 und 17 haben eine kranke Tochter (24) – bei X-chromosomaler Vererbung müsste der Vater 17 krank sein.',
        'Es sind mehr Männer als Frauen betroffen.',
        'Person 9 hat nur gesunde Kinder.',
        'Person 1 ist eine kranke Frau.',
      ],
      answer: 0,
      why: [
        { text: 'So argumentiert deine PDF im Beweis des autosomalen Erbgangs.', prov: 'pdf', src: [p(25)] },
        { text: 'Einen weiteren Beleg liefert Person 7: Bei X-chromosomal-rezessiver Vererbung müsste die kranke Mutter 1 (XᵃXᵃ) jedem Sohn ein Xᵃ vererben – ihr Sohn 7 ist aber gesund.', prov: 'inf' },
      ],
    },
    {
      id: 'eg-q18', sub: 'erbgaenge', type: 'tf', level: 2, err: 'inheritance', prov: 'pdf', src: [p(25)],
      prompt: 'Eine Stammbaumanalyse liefert immer eindeutige Ergebnisse.',
      answer: false,
      correction: 'Nicht immer: Manchmal lässt sich eine alternative Hypothese nicht ausschließen. Für gesicherte Aussagen braucht man ausreichend großes und gesichertes Zahlenmaterial.',
      why: [{ text: 'Grenzen der Stammbaumanalyse laut deiner PDF.', prov: 'pdf', src: [p(25)] }],
    },
    {
      id: 'eg-q19', sub: 'erbgaenge', type: 'single', level: 5, err: 'inheritance', prov: 'inf', src: [p(28), p(27, 'Material B')],
      prompt: 'Ein gesundes Elternpaar (beide Aa) hat bereits ein Kind mit Mukoviszidose. Wie hoch ist die Wahrscheinlichkeit, dass das nächste Kind ebenfalls erkrankt?',
      options: ['25 %', '0 % – das Risiko hat sich bereits „erfüllt“', '50 %', '100 %'],
      answer: 0,
      feedback: { 1: 'Wahrscheinlichkeiten gelten für jedes Kind neu – ein früheres Kind ändert sie nicht.' },
      why: [
        { text: 'Sind beide Eltern Überträger, liegt das Risiko für ein erkranktes Kind bei 25 Prozent.', prov: 'pdf', src: [p(27, 'Material B')] },
        { text: 'Jede Befruchtung ist ein unabhängiges Ereignis: Aa × Aa ergibt bei jedem Kind erneut mit 1/4 den Genotyp aa.', prov: 'inf' },
      ],
    },
    {
      id: 'eg-q20', sub: 'erbgaenge', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(25)],
      prompt: 'Welche Krankheit nennt deine PDF als Beispiel für einen X-chromosomal-dominanten Erbgang?',
      options: ['Vitamin-D-resistente Rachitis', 'Hämophilie', 'Mukoviszidose', 'Polydaktylie'],
      answer: 0,
      why: [{ text: 'X-chromosomal-dominante Krankheiten sind sehr selten; Beispiel: Vitamin-D-resistente Rachitis mit Minderwuchs und Knochenverformungen.', prov: 'pdf', src: [p(25)] }],
    },
    {
      id: 'eg-q21', sub: 'erbgaenge', type: 'free', level: 4, err: 'comparison', prov: 'pdf', src: [p(28), p(25)], operator: 'Vergleichen', compare: true,
      prompt: 'Vergleiche den autosomal-dominanten mit dem autosomal-rezessiven Erbgang (Bild im Stammbaum, Genotypen, Beispiele).',
      rubric: [
        { id: 'dom-bild', group: 'Autosomal-dominant', label: 'Merkmal tritt gehäuft über mehrere (fast alle) Generationen auf', any: [['gehaeuft|jede generation|jeder generation|mehrere generationen|mehreren generationen']], weight: 1 },
        { id: 'dom-geno', group: 'Autosomal-dominant', label: 'Betroffene sind AA oder Aa – ein mutiertes Allel genügt', any: [['cs:\\bAA\\b'], ['ein (mutiertes |krankes |defektes |veraendertes )?allel (reicht|genuegt)']], weight: 1 },
        { id: 'rez-bild', group: 'Autosomal-rezessiv', label: 'Selten; gesunde Eltern können kranke Kinder haben (Generationen übersprungen)', any: [['selten|uebersprung|gesunde eltern']], weight: 1 },
        { id: 'rez-geno', group: 'Autosomal-rezessiv', label: 'Betroffene sind aa; Heterozygote sind gesunde Überträger', any: [['uebertraeger|konduktor'], ['cs:\\baa\\b']], weight: 1 },
        { id: 'gemeinsam', group: 'Gemeinsamkeit', label: 'Gen auf einem Autosom → beide Geschlechter gleich häufig betroffen', any: [['beide geschlechter|maenner und frauen|frauen und maenner|geschlechter gleich']], weight: 1 },
        { id: 'beispiele', group: 'Beispiele', label: 'Polydaktylie/Marfan-Syndrom bzw. Mukoviszidose', any: [['polydaktylie|marfan', 'mukoviszidose|fibrose']], weight: 0.5 },
      ],
      model: 'Autosomal-dominant (z. B. Polydaktylie, Marfan-Syndrom): Das Merkmal tritt gehäuft und über mehrere Generationen auf. Betroffene sind heterozygot (Aa) oder homozygot (AA) – schon ein mutiertes Allel genügt. Autosomal-rezessiv (z. B. Mukoviszidose): Das Merkmal ist vergleichsweise selten; phänotypisch gesunde Eltern können betroffene Kinder haben. Betroffene sind homozygot (aa), Heterozygote (Aa) sind gesunde Überträger. Gemeinsam ist beiden: Das Gen liegt auf einem Autosom, deshalb sind beide Geschlechter gleich häufig betroffen.',
      why: [{ text: 'Merkmale aus PDF S. 28 (Polydaktylie, Marfan, Mukoviszidose) und S. 25 (Methode).', prov: 'pdf', src: [p(28), p(25)] }],
    },
    {
      id: 'eg-q22', sub: 'erbgaenge', type: 'single', level: 2, err: 'experiment', prov: 'inf', src: [p(25, 'Material A')], figure: { widget: 'gel-duchenne' },
      prompt: 'Warum zeigen die Männer im Duchenne-Autoradiogramm jeweils nur eine Bande?',
      options: ['Sie besitzen nur ein X-Chromosom und sind für das Gen hemizygot.', 'Die Gensonde bindet nur an männliche DNA.', 'Bei Männern wurde nur ein Allel untersucht.', 'Männer sind für jedes Gen homozygot.'],
      answer: 0,
      why: [
        { text: 'Im Autoradiogramm haben die Männer 1, 3, 6, 7 und 10 nur eine Bande, die Frauen dagegen zwei Allele (bei 4 und 9 zweimal dasselbe).', prov: 'pdf', src: [p(25, 'Material A')] },
        { text: 'Das passt zu einem Gen auf dem X-Chromosom: Männer sind hemizygot (PDF S. 25).', prov: 'inf', src: [p(25)] },
      ],
    },
    {
      id: 'eg-q23', sub: 'erbgaenge', type: 'single', level: 2, err: 'experiment', prov: 'inf', src: [p(25, 'Material A')], figure: { widget: 'gel-duchenne' },
      prompt: 'Welches Allel ist im Duchenne-Material das Krankheitsallel?',
      options: ['Allel 1', 'Allel 2', 'beide Allele', 'Das lässt sich nicht erkennen.'],
      answer: 0,
      why: [{ text: 'Die kranken Söhne 3 und 10 besitzen nur Allel 1, alle gesunden Männer nur Allel 2.', prov: 'inf', src: [p(25, 'Material A')] }],
    },
    {
      id: 'eg-q24', sub: 'erbgaenge', type: 'single', level: 3, err: 'inheritance', prov: 'inf', src: [p(25, 'Abb. 6')],
      prompt: 'Königin Victoria war gesund, ihr Sohn Leopold war Bluter. Was folgt daraus?',
      options: [
        'Victoria war Konduktorin (XᴬXᵃ): Leopold hat sein X-Chromosom von ihr erhalten.',
        'Leopold hat das Allel von seinem Vater Albert geerbt.',
        'Victoria war homozygot gesund (XᴬXᴬ).',
        'Leopold trägt die Mutation auf dem Y-Chromosom.',
      ],
      answer: 0,
      feedback: { 1: 'Vom Vater erhält ein Sohn das Y-Chromosom, nicht das X-Chromosom.' },
      why: [
        { text: 'In Abb. 6 deiner PDF ist Königin Victoria als Konduktorin markiert.', prov: 'pdf', src: [p(25, 'Abb. 6')] },
        { text: 'Söhne erhalten ihr X-Chromosom von der Mutter. Da Victoria gesund war, besaß sie neben Xᵃ ein nicht mutiertes Allel: XᴬXᵃ.', prov: 'inf' },
      ],
    },

    // ---------------- beratung ----------------
    {
      id: 'be-q1', sub: 'beratung', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(26)],
      prompt: 'Über wie viele Generationen wird bei einer genetischen Beratung häufig ein Familienstammbaum erstellt?',
      options: ['über mindestens drei Generationen', 'nur über die Generation der Ratsuchenden', 'über genau zwei Generationen', 'über mindestens zehn Generationen'],
      answer: 0,
      why: [{ text: 'Häufig wird ein Familienstammbaum über mindestens drei Generationen erstellt.', prov: 'pdf', src: [p(26)] }],
    },
    {
      id: 'be-q2', sub: 'beratung', type: 'multi', level: 2, err: 'facts', prov: 'pdf', src: [p(26)],
      prompt: 'An wen richtet sich das Beratungsangebot laut deiner PDF?',
      options: [
        'gesunde Paare, die bereits ein Kind mit einer Erbkrankheit haben',
        'Partner, die miteinander verwandt sind',
        'Frauen, die zu Beginn der Schwangerschaft eine Virusinfektion wie Röteln hatten',
        'Paare, die ungewollt kinderlos sind oder bei denen die Frau Fehlgeburten erlitten hat',
        'ausschließlich Personen mit bereits bestätigter Erbkrankheit',
      ],
      answers: [0, 1, 2, 3],
      why: [{ text: 'Liste „Das Beratungsangebot richtet sich an“ in deiner PDF – eine bestätigte Erbkrankheit ist keine Voraussetzung.', prov: 'pdf', src: [p(26)] }],
    },
    {
      id: 'be-q3', sub: 'beratung', type: 'input', level: 2, err: 'inheritance', prov: 'pdf', src: [p(26)], mode: 'number', unit: '%',
      prompt: 'Die erbliche Form von Brustkrebs wird autosomal-dominant vererbt. Mit welcher Wahrscheinlichkeit wird der Gendefekt an ein Kind weitergegeben, wenn ein Elternteil die Mutation trägt?',
      accept: ['50'],
      solution: '50 %',
      why: [{ text: 'Bei autosomal-dominanter Vererbung wird der Gendefekt mit 50 Prozent weitergegeben, sofern die Mutation bei einem Elternteil vorliegt.', prov: 'pdf', src: [p(26)] }],
    },
    {
      id: 'be-q4', sub: 'beratung', type: 'tf', level: 2, err: 'evaluation', prov: 'pdf', src: [p(26)],
      prompt: 'Ein positiver Gentest auf erblichen Brustkrebs bedeutet, dass die Frau sicher an Brustkrebs erkranken wird.',
      answer: false,
      correction: 'Das Erkrankungsrisiko ist stark erhöht, aber nicht jede betroffene Frau entwickelt zwangsläufig Brustkrebs.',
      why: [{ text: 'So steht es auf PDF S. 26.', prov: 'pdf', src: [p(26)] }],
    },
    {
      id: 'be-q5', sub: 'beratung', type: 'single', level: 2, err: 'terms', prov: 'pdf', src: [p(26)],
      prompt: 'Was bedeutet das „Recht auf Nichtwissen“?',
      options: [
        'Ratsuchende bestimmen selbst, in welchem Umfang sie über das Ergebnis eines Gentests informiert werden.',
        'Ärztinnen und Ärzte dürfen Testergebnisse für sich behalten.',
        'Gentests dürfen ohne Einwilligung durchgeführt werden, wenn das Ergebnis nicht mitgeteilt wird.',
        'Kinder dürfen nicht erfahren, dass ihre Eltern getestet wurden.',
      ],
      answer: 0,
      feedback: { 2: 'Im Gegenteil: Gentests dürfen nur mit Einwilligung nach Aufklärung durchgeführt werden.' },
      why: [{ text: 'Auch wenn sich Ratsuchende für einen Gentest entscheiden, bestimmen nur sie, in welchem Umfang sie über das Ergebnis informiert werden.', prov: 'pdf', src: [p(26)] }],
    },
    {
      id: 'be-q6', sub: 'beratung', type: 'free', level: 3, err: 'mechanism', prov: 'pdf', src: [p(26)], operator: 'Begründen',
      prompt: 'Begründe, warum Gentests in Deutschland nur in medizinisch begründeten Fällen durchgeführt werden dürfen.',
      rubric: [
        { id: 'familie', label: 'Die Ergebnisse betreffen auch Kinder und Geschwister', any: [['kind|geschwister|verwandt|familie|angehoerig']], weight: 1 },
        { id: 'arbeit', label: 'Sie können das Arbeits- oder Versicherungsverhältnis betreffen', any: [['arbeit|versicher|beruf|job']], weight: 1.5 },
        { id: 'schutz', label: 'Schutz der Selbstbestimmung: Einwilligung, Aufklärung, Recht auf Nichtwissen', any: [['einwillig|aufklaer|nichtwissen|selbstbestimm|freiwillig']], weight: 0.5 },
      ],
      model: 'Die Ergebnisse eines Gentests betreffen nicht nur die getestete Person: Sie sagen auch etwas über Kinder und Geschwister aus, die vielleicht gar nichts wissen wollen. Außerdem können sie das Arbeits- oder Versicherungsverhältnis betreffen, etwa wenn ein erhöhtes Krankheitsrisiko bekannt wird. Um Betroffene zu schützen, sind Gentests nur in medizinisch begründeten Fällen erlaubt – und nur mit Einwilligung nach Aufklärung; zudem gilt das Recht auf Nichtwissen.',
      why: [{ text: 'Begründung nach PDF S. 26.', prov: 'pdf', src: [p(26)] }],
    },
    {
      id: 'be-q7', sub: 'beratung', type: 'match', level: 2, err: 'facts', prov: 'pdf', src: [p(27)],
      prompt: 'Ordne jeder Methode den Zeitpunkt aus deiner PDF zu.',
      pairs: [
        { left: 'Messung der Nackentransparenz', right: '11.–14. Schwangerschaftswoche' },
        { left: 'Chorionzottenbiopsie', right: '12.–13. Schwangerschaftswoche' },
        { left: 'Amniozentese', right: 'ab der 15. Schwangerschaftswoche' },
      ],
      distractors: ['ab der 30. Schwangerschaftswoche'],
      why: [{ text: 'Zeitangaben aus PDF S. 27 (Buch S. 310).', prov: 'pdf', src: [p(27)] }],
    },
    {
      id: 'be-q8', sub: 'beratung', type: 'multi', level: 2, err: 'comparison', prov: 'pdf', src: [p(27)],
      prompt: 'Welche Methoden der Pränataldiagnostik sind invasiv?',
      options: ['Chorionzottenbiopsie', 'Amniozentese', 'Ultraschall', 'NIPT', 'Messung der Nackentransparenz'],
      answers: [0, 1],
      why: [{ text: 'Bei Chorionzottenbiopsie und Amniozentese werden mit einer Hohlnadel kindliche Zellen bzw. Fruchtwasser entnommen. Ultraschall, Nackentransparenz und NIPT zählen zu den nichtinvasiven Methoden.', prov: 'pdf', src: [p(27)] }],
    },
    {
      id: 'be-q9', sub: 'beratung', type: 'free', level: 3, err: 'mechanism', prov: 'pdf', src: [p(27)], operator: 'Erklären',
      prompt: 'Erkläre das Prinzip des NIPT.',
      rubric: [
        { id: 'blut', label: 'Im Blut der Schwangeren gibt es neben ihrer eigenen DNA zellfreie Bruchstücke fetaler DNA', any: [['blut', 'fetal|kindlich|kind|ungeboren|foetus|fetus']], weight: 1.5 },
        { id: 'plazenta', label: 'Sie stammen aus dem fetalen Anteil der Plazenta', any: [['plazenta']], weight: 0.5 },
        { id: 'zaehlen', label: 'Die Bruchstücke werden den Chromosomen zugeordnet und zahlenmäßig erfasst', any: [['zugeordnet|zuordn|chromosom', 'zaehl|gezaehlt|anzahl|zahlenmaessig|menge|erfass']], weight: 1 },
        { id: 'trisomie', label: 'So lässt sich die Wahrscheinlichkeit einer Trisomie 13, 18 oder 21 ermitteln', any: [['trisomie']], weight: 1 },
      ],
      misconceptions: [
        { id: 'invasiv', any: [['nipt (ist|gilt als) (ein )?invasiv']], feedback: 'Der NIPT ist ein nichtinvasiver Test: Untersucht wird das Blut der Schwangeren.' },
        { id: 'sicher', any: [['nipt (zeigt|beweist|stellt) (sicher|eindeutig)']], feedback: 'Der NIPT liefert eine Wahrscheinlichkeit. Genauere Auskunft geben laut deiner PDF letztlich nur invasive Methoden.' },
      ],
      model: 'Im Blut der Schwangeren befinden sich neben ihrer eigenen DNA auch zellfreie Bruchstücke fetaler DNA, die aus dem fetalen Anteil der Plazenta stammen. Mit speziellen Testverfahren werden die mütterlichen und kindlichen Bruchstücke den jeweiligen Chromosomen zugeordnet und zahlenmäßig erfasst. Liegen Bruchstücke eines Chromosoms auffällig häufig vor, lässt sich so die Wahrscheinlichkeit einer Trisomie 13, 18 oder 21 ermitteln.',
      why: [
        { text: 'Prinzip nach PDF S. 27.', prov: 'pdf', src: [p(27)] },
        { text: 'Dass „auffällig häufige“ Bruchstücke auf eine Trisomie hinweisen, ist eine Schlussfolgerung: Bei einer Trisomie liegt ein Chromosom dreifach statt doppelt vor.', prov: 'inf' },
      ],
    },
    {
      id: 'be-q10', sub: 'beratung', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(27, 'Abb. 4')],
      prompt: 'Bringe den Ablauf einer Präimplantationsdiagnostik in die richtige Reihenfolge.',
      items: [
        'Hormonbehandlung: mehrere Eizellen reifen heran',
        'Befruchtung in vitro',
        'Embryo im Achtzellstadium',
        'Entnahme einer oder mehrerer Zellen',
        'DNA-Isolierung und Untersuchung auf Mutationen',
        'Einpflanzen eines Embryos ohne mutierte Allele',
      ],
      why: [{ text: 'Abb. 4 „Ablauf einer Präimplantationsdiagnostik“ in deiner PDF.', prov: 'pdf', src: [p(27, 'Abb. 4')] }],
    },
    {
      id: 'be-q11', sub: 'beratung', type: 'single', level: 2, err: 'terms', prov: 'pdf', src: [p(27)],
      prompt: 'Was bedeutet es, dass die nach dem 8-Zellstadium entnommenen Zellen nicht mehr totipotent sind?',
      options: ['Sie können sich nicht mehr einzeln zu einem vollständigen Embryo entwickeln.', 'Sie enthalten keine vollständige DNA mehr.', 'Sie sind bereits mutiert.', 'Sie können sich nicht mehr teilen.'],
      answer: 0,
      why: [
        { text: 'So erklärt deine PDF den Begriff.', prov: 'pdf', src: [p(27)] },
        { text: 'Deshalb wird bei der PID keine Zelle untersucht, die sich selbst noch zu einem Embryo entwickeln könnte.', prov: 'inf' },
      ],
    },
    {
      id: 'be-q12', sub: 'beratung', type: 'multi', level: 2, err: 'facts', prov: 'pdf', src: [p(27)],
      prompt: 'Unter welchen Bedingungen ist eine PID in Deutschland laut deiner PDF zulässig?',
      options: ['wenn ein hohes Risiko für eine schwerwiegende Erbkrankheit besteht', 'wenn eine Schädigung des Kindes zu erwarten ist', 'wenn die Eltern das Geschlecht des Kindes wählen möchten', 'grundsätzlich bei jeder künstlichen Befruchtung'],
      answers: [0, 1],
      why: [{ text: 'Über die Durchführung entscheidet zudem eine Ethikkommission, die den Einzelfall berücksichtigt.', prov: 'pdf', src: [p(27)] }],
    },
    {
      id: 'be-q13', sub: 'beratung', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(27)],
      prompt: 'Warum werden Brustkrebs-Patientinnen nur dann mit Herceptin behandelt, wenn ihre Tumorzellen ein bestimmtes genetisches Merkmal auf der Oberfläche tragen?',
      options: [
        'Ohne dieses Merkmal wirkt Herceptin nicht – die Nebenwirkungen treten aber trotzdem auf.',
        'Ohne dieses Merkmal wirkt Herceptin zu stark.',
        'Das Merkmal zeigt, dass der Brustkrebs erblich ist.',
        'Nur Tumorzellen mit dem Merkmal lassen sich operieren.',
      ],
      answer: 0,
      why: [{ text: 'Beispiel für personalisierte Medizin auf PDF S. 27.', prov: 'pdf', src: [p(27)] }],
    },
    {
      id: 'be-q14', sub: 'beratung', type: 'free', level: 2, err: 'terms', prov: 'pdf', src: [p(27)], operator: 'Erläutern',
      prompt: 'Erläutere den Begriff „personalisierte Medizin“ an einem Beispiel.',
      rubric: [
        { id: 'biomarker', label: 'Genetische, molekulare, zelluläre Besonderheiten (Biomarker) werden erfasst, z. B. durch Gentests', any: [['biomarker|genetisch|molekular|zellulaer|gentest|merkmal']], weight: 1 },
        { id: 'individuell', label: 'Diagnose, Therapie und Prävention orientieren sich am individuellen Genotyp', any: [['individuell|genotyp|persoenlich|jeweilig|einzelne']], weight: 1.5 },
        { id: 'nutzen', label: 'Unwirksame Medikamente und Nebenwirkungen werden erspart', any: [['unwirksam|nebenwirkung|erspar|wirkt nicht']], weight: 1 },
        { id: 'beispiel', label: 'Beispiel: Herceptin bei Brustkrebs (auch Hepatitis C, HIV)', any: [['herceptin|hepatitis|hiv']], weight: 1 },
      ],
      model: 'Bei der personalisierten Medizin werden mit modernen Diagnoseverfahren – etwa Gentests – genetische, molekulare und zelluläre Besonderheiten eines Patienten erfasst. Diese Biomarker dienen dazu, Diagnose, Therapie und Prävention am individuellen Genotyp auszurichten. So bleiben Patienten unwirksame Medikamente und deren Nebenwirkungen erspart. Beispiel: Frauen mit Brustkrebs erhalten Herceptin nur, wenn ihre Tumorzellen ein bestimmtes genetisches Merkmal auf der Oberfläche tragen – ohne dieses Merkmal wirkt Herceptin nicht, die Nebenwirkungen würden aber auftreten.',
      why: [{ text: 'Definition und Beispiel aus PDF S. 27.', prov: 'pdf', src: [p(27)] }],
    },
    {
      id: 'be-q15', sub: 'beratung', type: 'match', level: 3, err: 'evaluation', prov: 'ext', src: [p(29), p(26), p(27)],
      prompt: 'Deskriptiv oder normativ? Ordne jede Aussage zu.',
      pairs: [
        { left: 'Auf Zypern trägt einer von sieben Einwohnern den Gendefekt.', right: 'deskriptiv' },
        { left: 'Paare mit Kinderwunsch sollten einen Gentest machen.', right: 'normativ' },
        { left: 'Ein positiver Gentest auf erblichen Brustkrebs bedeutet ein stark erhöhtes Erkrankungsrisiko.', right: 'deskriptiv' },
        { left: 'Niemand darf gezwungen werden, sein Testergebnis zu erfahren.', right: 'normativ' },
      ],
      why: [
        { text: 'Deskriptive Aussagen beschreiben, was ist; normative Aussagen sagen, was sein soll (erkennbar an „sollte“, „darf“ …).', prov: 'ext', ext: ETHIK_EXT },
        { text: 'Die beiden deskriptiven Sachaussagen stammen aus deiner PDF (S. 26 und 27).', prov: 'pdf', src: [p(26), p(27, 'Material B')] },
      ],
    },
    {
      id: 'be-q16', sub: 'beratung', type: 'single', level: 3, err: 'evaluation', prov: 'ext', src: [p(29), p(27)],
      prompt: 'Welche Aussage ist normativ?',
      options: [
        'Die Entscheidung über einen Schwangerschaftsabbruch sollte allein bei der Mutter liegen.',
        'Bei der Amniozentese wird ab der 15. Schwangerschaftswoche Fruchtwasser entnommen.',
        'Invasive Methoden können zu Fehlgeburten führen.',
        'Der NIPT ermittelt die Wahrscheinlichkeit einer Trisomie 13, 18 oder 21.',
      ],
      answer: 0,
      why: [
        { text: 'Das Wort „sollte“ macht die Aussage normativ: Sie fordert, wie es sein soll.', prov: 'ext', ext: ETHIK_EXT },
        { text: 'Deine PDF formuliert beschreibend: Die Entscheidung „liegt allein im Ermessen der Mutter“ – das gibt eine geltende Regel wieder.', prov: 'pdf', src: [p(27)] },
      ],
    },
    {
      id: 'be-q17', sub: 'beratung', type: 'free', level: 4, err: 'evaluation', prov: 'inf', src: [p(26)], operator: 'Erörtern', minWords: 50,
      prompt: 'Die 45-jährige Frau aus dem Einstieg (Mutter und Schwester an Brustkrebs erkrankt) überlegt, einen Gentest machen zu lassen. Erörtere Argumente für und gegen den Test.',
      rubric: [
        { id: 'klarheit', label: 'Pro: eindeutige Aussage statt bloßer Risikoabschätzung', any: [['klarheit|eindeutig|gewissheit|sicherheit|abschaetz']], weight: 1 },
        { id: 'handeln', label: 'Pro: Vorsorge, Lebens- und Familienplanung, Information für Angehörige', any: [['vorsorge|frueherkenn|praevention|planung|familienplan|tochter|toechter|angehoerig|kinder']], weight: 1 },
        { id: 'unsicher', label: 'Contra: Positiver Test heißt nicht sicher krank – Belastung, Angst', any: [['nicht sicher|nicht zwangslaeufig|nicht jede|angst|belast|psych|sorge']], weight: 1 },
        { id: 'folgen', label: 'Contra: Folgen für Angehörige sowie Arbeit/Versicherung', any: [['versicher|arbeit|geschwister']], weight: 1 },
        { id: 'selbst', label: 'Eigene Entscheidung: Einwilligung, Recht auf Nichtwissen', any: [['nichtwissen|nicht wissen|selbst|freiwillig|einwillig']], weight: 1 },
      ],
      model: 'Für den Test spricht, dass er – anders als die Stammbaumanalyse – eine eindeutige Aussage liefert. Bei einem negativen Ergebnis wäre die Frau entlastet; bei einem positiven könnte sie Vorsorge und Lebensplanung darauf abstimmen, und die Information kann für ihre Kinder und Geschwister wichtig sein. Gegen den Test spricht, dass ein positives Ergebnis zwar ein stark erhöhtes Risiko bedeutet, aber nicht, dass sie sicher erkrankt – das Wissen kann stark belasten. Das Ergebnis betrifft außerdem Angehörige, die es vielleicht nicht wissen wollen, und kann Arbeits- oder Versicherungsverhältnisse berühren. Entscheiden darf nur die Frau selbst: Der Test setzt ihre Einwilligung voraus, und sie hat ein Recht auf Nichtwissen.',
      why: [
        { text: 'Die Sachinformationen stammen aus PDF S. 26.', prov: 'pdf', src: [p(26)] },
        { text: 'Die Abwägung der Argumente ist eine Musterlösung, keine Lösung aus deiner PDF.', prov: 'inf' },
      ],
    },
    {
      id: 'be-q18', sub: 'beratung', type: 'free', level: 5, err: 'evaluation', prov: 'inf', src: [p(27), p(29)], operator: 'Bewerten', minWords: 60,
      prompt: 'Bewerte die Präimplantationsdiagnostik aus ethischer Sicht. Unterscheide dabei deskriptive und normative Aussagen.',
      rubric: [
        { id: 'sache', label: 'Sachlage (deskriptiv): Embryonen in vitro, Zellentnahme nach dem 8-Zellstadium, Auswahl ohne Mutation', any: [['in vitro|8 zell|acht zell|achtzell|zellstadium|embryonen'], ['ausgewaehlt|auswahl|eingepflanzt']], weight: 1 },
        { id: 'pro', label: 'Argument dafür: schwere Erbkrankheit vermeiden, Kinderwunsch erfüllen', any: [['leid|schwerwiegend|schwere erbkrankheit|gesundes kind|kinderwunsch']], weight: 1 },
        { id: 'contra', label: 'Argument dagegen: Menschenwürde und Lebensrecht der Embryonen; Auswahl menschlichen Lebens', any: [['menschenwuerde|wuerde|lebensrecht|selektion|verworfen|nicht eingepflanzt']], weight: 1 },
        { id: 'normativ', label: 'Normative Aussagen / Werte als solche gekennzeichnet', any: [['normativ|wert|norm'], ['sollte|darf|duerfen']], weight: 1 },
        { id: 'urteil', label: 'Begründetes eigenes Urteil (z. B. mit Blick auf Ethikkommission und Einzelfall)', any: [['urteil|meiner meinung|ich finde|ich halte|fazit|insgesamt|abschliessend']], weight: 1 },
      ],
      model: 'Deskriptiv: Bei der PID werden im Rahmen einer künstlichen Befruchtung Embryonen erzeugt; nach dem 8-Zellstadium werden Zellen entnommen, die nicht mehr totipotent sind. Nur Embryonen ohne mutierte Allele werden eingepflanzt. In Deutschland ist die PID nur bei hohem Risiko für eine schwerwiegende Erbkrankheit zulässig; eine Ethikkommission entscheidet im Einzelfall. Normativ: Für die PID spricht der Wert, Leid zu vermeiden – einem Paar mit hohem Risiko kann sie ein Kind ohne die schwere Erbkrankheit ermöglichen. Dagegen spricht der Schutz des Lebens: Embryonen mit Mutation werden nicht eingepflanzt; manche sehen darin eine Auswahl menschlichen Lebens, die die Menschenwürde verletzt. Mein Urteil: Ich halte die PID für vertretbar, wenn – wie in Deutschland geregelt – ein hohes Risiko für eine schwere Erbkrankheit besteht und eine Ethikkommission den Einzelfall prüft, nicht aber zur Auswahl beliebiger Merkmale.',
      why: [
        { text: 'Sachinformationen aus PDF S. 27; die Bewertung verlangt der Lehrplan (PDF S. 29).', prov: 'pdf', src: [p(27), p(29)] },
        { text: 'Das Urteil in der Musterlösung ist ein Beispiel – eine andere, gut begründete Position ist ebenso richtig.', prov: 'inf' },
      ],
    },
    {
      id: 'be-q19', sub: 'beratung', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(27)],
      prompt: 'Woraus werden bei der Amniozentese fetale Zellen gewonnen?',
      options: ['aus dem Fruchtwasser in der Fruchtblase', 'aus dem entstehenden Mutterkuchen (Chorion)', 'aus dem Blut der Schwangeren', 'aus dem Nackenbereich des Ungeborenen'],
      answer: 0,
      feedback: { 1: 'Das ist die Chorionzottenbiopsie (12.–13. Schwangerschaftswoche).' },
      why: [{ text: 'Bei der Amniozentese wird ab der 15. Schwangerschaftswoche mit einer Hohlnadel Fruchtwasser aus der Fruchtblase entnommen.', prov: 'pdf', src: [p(27)] }],
    },
    {
      id: 'be-q20', sub: 'beratung', type: 'cloze', level: 1, err: 'facts', prov: 'pdf', src: [p(27)],
      prompt: 'Ergänze den Text zur nichtinvasiven Pränataldiagnostik.',
      text: 'Ist die {{0}} vergrößert, ist die Wahrscheinlichkeit für eine Trisomie 21 deutlich erhöht. Bei auffälligem Ersttrimester-Befund kann ein {{1}} des Blutes durchgeführt werden. Er nutzt zellfreie Bruchstücke {{2}} DNA.',
      gaps: [
        { accept: ['Nackentransparenz'], options: ['Nackentransparenz', 'Fruchtblase', 'Plazenta'] },
        { accept: ['NIPT', 'nichtinvasiver Pränataltest'], options: ['NIPT', 'PID', 'PCR'] },
        { accept: ['fetaler', 'kindlicher'], options: ['fetaler', 'mütterlicher', 'viraler'] },
      ],
      why: [{ text: 'Angaben aus PDF S. 27.', prov: 'pdf', src: [p(27)] }],
    },
    {
      id: 'be-q21', sub: 'beratung', type: 'cloze', level: 1, err: 'facts', prov: 'pdf', src: [p(26, 'Material A')],
      prompt: 'Ergänze die Angaben zu Chorea Huntington.',
      text: 'Bei Chorea Huntington wiederholt sich das Triplett {{0}} in einem bestimmten DNA-Abschnitt mehr als {{1}}-mal. Bei Gesunden wiederholt es sich lediglich {{2}}-mal. Die Krankheit tritt meist zwischen dem vierten und fünften {{3}} auf.',
      gaps: [
        { accept: ['CAG'], options: ['CAG', 'AUG', 'TAA'] },
        { accept: ['37'], options: ['3', '37', '370'] },
        { accept: ['9 bis 35', '9- bis 35'], options: ['1 bis 3', '9 bis 35', '40 bis 80'] },
        { accept: ['Lebensjahrzehnt'], options: ['Lebensjahr', 'Lebensjahrzehnt', 'Lebensmonat'] },
      ],
      why: [{ text: 'Material A „Gentest bei Chorea Huntington“ in deiner PDF.', prov: 'pdf', src: [p(26, 'Material A')] }],
    },
    {
      id: 'be-q22', sub: 'beratung', type: 'single', level: 2, err: 'experiment', prov: 'pdf', src: [p(26, 'Material A')],
      prompt: 'Wie wird beim Test auf Chorea Huntington der entscheidende DNA-Abschnitt untersucht?',
      options: [
        'Er wird aus einer Blutprobe isoliert, per PCR vervielfältigt und gelelektrophoretisch aufgetrennt.',
        'Er wird im Ultraschall sichtbar gemacht.',
        'Die Chromosomen werden im Mikroskop gezählt.',
        'Er wird aus Fruchtwasser gewonnen und mit Herceptin behandelt.',
      ],
      answer: 0,
      why: [
        { text: 'So beschreibt Material A den Test.', prov: 'pdf', src: [p(26, 'Material A')] },
        { text: 'Mehr CAG-Wiederholungen bedeuten ein längeres DNA-Fragment – es wandert im Gel langsamer (Prinzip der Gelelektrophorese, PDF S. 7).', prov: 'inf' },
      ],
    },
    {
      id: 'be-q23', sub: 'beratung', type: 'cloze', level: 1, err: 'facts', prov: 'pdf', src: [p(27, 'Material B')],
      prompt: 'Ergänze die Angaben zum Vorsorgeprogramm auf Zypern.',
      text: 'Auf Zypern trägt einer von {{0}} Einwohnern den Gendefekt für β-Thalassämie. Das freiwillige und kostenlose Vorsorgeprogramm gibt es seit {{1}}. Rund {{2}} der untersuchten Schwangerschaften wird daraufhin abgebrochen.',
      gaps: [
        { accept: ['sieben', '7'], options: ['drei', 'sieben', 'hundert'] },
        { accept: ['1976'], options: ['1956', '1976', '2006'] },
        { accept: ['ein Viertel'], options: ['ein Zehntel', 'ein Viertel', 'die Hälfte'] },
      ],
      why: [{ text: 'Material B „Eindämmung der Erbkrankheit Thalassämie“ in deiner PDF.', prov: 'pdf', src: [p(27, 'Material B')] }],
    },
  ],

  experiments: [
    {
      id: 'exp-duchenne', sub: 'erbgaenge', title: 'Allel-Nachweis bei Muskeldystrophie Duchenne', src: [p(25, 'Material A')], widget: 'gel-duchenne',
      steps: [
        { key: 'frage', text: 'Welche Familienmitglieder tragen das Krankheitsallel – auch wenn sie selbst gesund sind?', prov: 'inf' },
        { key: 'hypothese', text: 'Nach dem Stammbaum: X-chromosomal-rezessiv. Die Mütter kranker Söhne müssten dann Konduktorinnen sein.', prov: 'inf' },
        { key: 'material', text: 'DNA der Personen 1 bis 10, ein Restriktionsenzym, Gelelektrophorese, eine markierte Gensonde.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'DNA mit dem Restriktionsenzym behandeln → Fragmente in Einzelstränge zerlegen → gelelektrophoretisch auftrennen → Dystrophie-Allele mit der markierten Gensonde nachweisen (Autoradiogramm).', prov: 'pdf' },
        { key: 'beobachtung', text: 'Allel 1 bei den Personen 2, 3, 5, 8 und 10; Allel 2 bei den Personen 1, 2, 4, 5, 6, 7, 8 und 9.', prov: 'pdf', predict: 'Welche Bande erwartest du bei den kranken Söhnen 3 und 10?' },
        { key: 'ergebnis', text: 'Allel 1 ist das Krankheitsallel. Männer zeigen nur eine Bande (hemizygot). Die Frauen 2, 5 und 8 besitzen beide Allele – sie sind Konduktorinnen; 4 und 9 besitzen nur Allel 2.', prov: 'inf' },
        { key: 'schluss', text: 'Die molekulare Untersuchung bestätigt den X-chromosomal-rezessiven Erbgang und klärt Genotypen, die im Stammbaum offen bleiben.', prov: 'inf' },
        { key: 'methode', text: 'Gelelektrophorese mit Nachweis durch eine markierte Gensonde (Autoradiogramm).', prov: 'pdf' },
      ],
      questionIds: ['eg-q22', 'eg-q23'],
    },
    {
      id: 'exp-huntington', sub: 'beratung', title: 'Gentest bei Chorea Huntington', src: [p(26, 'Material A')], widget: 'gel-huntington',
      steps: [
        { key: 'frage', text: 'Wird die 35-jährige Ratsuchende an Chorea Huntington erkranken – und ihre beiden Kinder?', prov: 'pdf' },
        { key: 'material', text: 'Blutproben der Personen 1 bis 5; PCR; Gelelektrophorese. Grenzwerte: mehr als 37 CAG-Wiederholungen = Huntington-Allel, 9 bis 35 = gesund.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'DNA-Abschnitt aus der Blutprobe isolieren → mit PCR vervielfältigen → gelelektrophoretisch auftrennen.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Personen 2 und 3: je eine Bande bei 86 Wiederholungen und eine unterhalb der Grenze. Personen 1, 4 und 5: nur Banden unterhalb der Grenze (unter 34).', prov: 'pdf', predict: 'Bei welchen Personen erwartest du eine Bande oberhalb von 37 Wiederholungen?' },
        { key: 'ergebnis', text: 'Die Ratsuchende (2) trägt ein Huntington-Allel und ist heterozygot – sie wird voraussichtlich erkranken. Ihre Kinder 4 und 5 haben von ihr das normale Allel geerbt und werden nicht erkranken.', prov: 'inf' },
        { key: 'schluss', text: 'Der Gentest liefert eindeutige Aussagen – für die Frau selbst aber ohne ursächliche Therapiemöglichkeit. Daraus entsteht ein Dilemma.', prov: 'inf' },
      ],
      questionIds: ['be-q21', 'be-q22'],
    },
  ],

  examTasks: [
    {
      id: 'kt-duchenne',
      title: 'Muskeldystrophie Typ Duchenne',
      subs: ['erbgaenge'],
      basedOn: 'Übung nach Material A „Muskeldystrophie Typ Duchenne“ aus deiner PDF (S. 25)',
      src: [p(25, 'Material A')],
      intro: 'Die Muskeldystrophie Typ Duchenne ist eine Erbkrankheit mit fortschreitender Degeneration der Muskulatur. Für eine betroffene Familie wurde ein Stammbaum erstellt. Die DNA der Personen 1 bis 10 wurde mit einem Restriktionsenzym behandelt, in Einzelstränge zerlegt und durch Gelelektrophorese aufgetrennt. Eine markierte Gensonde weist die Dystrophie-Allele nach: Die Fragmente der Allele 1 und 2 erscheinen im Autoradiogramm als einzelne Banden.',
      material: [
        { kind: 'widget', widget: 'gel-duchenne', caption: 'Stammbaum und Autoradiogramm (Material A deiner PDF)' },
        {
          kind: 'table',
          head: ['Person', 'Geschlecht', 'Phänotyp', 'Allel 1', 'Allel 2'],
          rows: [
            ['1', 'männlich', 'gesund', '–', '✓'],
            ['2', 'weiblich', 'gesund', '✓', '✓'],
            ['3', 'männlich', 'krank', '✓', '–'],
            ['4', 'weiblich', 'gesund', '–', '✓'],
            ['5', 'weiblich', 'gesund', '✓', '✓'],
            ['6', 'männlich', 'gesund', '–', '✓'],
            ['7', 'männlich', 'gesund', '–', '✓'],
            ['8', 'weiblich', 'gesund', '✓', '✓'],
            ['9', 'weiblich', 'gesund', '–', '✓'],
            ['10', 'männlich', 'krank', '✓', '–'],
          ],
          caption: 'Aus der Abbildung abgelesen. Eltern: 1 × 2 (Kinder 3, 4, 5); 5 × 6 (Kinder 7, 8, 9, 10).',
        },
      ],
      parts: ['kdu-1', 'kdu-2', 'kdu-3', 'kdu-4'],
    },
    {
      id: 'kt-huntington',
      title: 'Gentest bei Chorea Huntington',
      subs: ['beratung', 'erbgaenge'],
      basedOn: 'Übung nach Material A „Gentest bei Chorea Huntington“ aus deiner PDF (S. 26)',
      src: [p(26, 'Material A')],
      intro: 'Eine 35-jährige Mutter zweier Kinder sucht eine genetische Beratungsstelle auf, weil in ihrer Familie Chorea Huntington mehrfach aufgetreten ist. Die Krankheit tritt meist zwischen dem vierten und fünften Lebensjahrzehnt auf; eine ursächliche Therapie gibt es bislang nicht. Ursache ist eine Genmutation: Das Triplett CAG wiederholt sich in einem bestimmten DNA-Abschnitt mehr als 37-mal, bei Gesunden nur 9- bis 35-mal. Für den Test wird der Abschnitt aus einer Blutprobe isoliert, per PCR vervielfältigt und gelelektrophoretisch aufgetrennt.',
      material: [
        { kind: 'widget', widget: 'gel-huntington', caption: 'Stammbaum und Diagramm der CAG-Anzahl (Material A deiner PDF)' },
        {
          kind: 'table',
          head: ['Person', 'Banden (Zahl der CAG-Wiederholungen)'],
          rows: [
            ['1 (Ehemann)', 'eine kräftige Bande unter 34 (ca. 28)'],
            ['2 (ratsuchende Frau)', '86 und ca. 16'],
            ['3 (kranke Schwester)', '86 und ca. 28'],
            ['4 (Tochter)', 'zwei Banden unter 34 (ca. 28 und ca. 18)'],
            ['5 (Sohn)', 'zwei Banden unter 34 (ca. 28 und ca. 18)'],
          ],
          caption: 'Aus dem Diagramm abgelesen; Werte zwischen den Achsenmarken (16, 34, 37, 86) sind geschätzt.',
        },
      ],
      parts: ['khu-1', 'khu-2', 'khu-3', 'khu-4'],
    },
    {
      id: 'kt-zypern',
      title: 'Eindämmung der Thalassämie auf Zypern',
      subs: ['beratung', 'erbgaenge'],
      basedOn: 'Übung nach Material B „Eindämmung der Erbkrankheit Thalassämie“ aus deiner PDF (S. 27)',
      src: [p(27, 'Material B')],
      intro: 'Die β-Thalassämie ist eine erbliche Form der Blutarmut, die auf Zypern stark verbreitet ist. Einer von sieben Einwohnern trägt den Gendefekt, ohne selbst erkrankt zu sein. Sind beide Eltern Überträger, liegt das Risiko für ein erkranktes Kind bei 25 Prozent. Unbehandelt verläuft die Erkrankung tödlich; ein Überleben bis ins Erwachsenenalter ist mit erheblichem medizinischem und finanziellem Aufwand möglich.',
      material: [
        { kind: 'text', md: 'Seit **1976** gibt es auf Zypern ein für die Einwohner **freiwilliges und kostenloses** Vorsorgeprogramm, um die weitere Zunahme der Thalassämie-Erkrankungen zu verhindern. Nahezu jeder erwachsene Einwohner weiß aufgrund eines Gentests, ob er Überträger des Gendefekts ist. Das Programm umfasst auch eine **genetische Beratung** von Paaren mit Kinderwunsch sowie das Angebot einer **Pränataldiagnostik**. Rund **ein Viertel** der untersuchten Schwangerschaften wird daraufhin abgebrochen. Die Maßnahmen führten dazu, dass die Zahl erkrankter Neugeborener erheblich sank und die Lebensdauer und Lebensqualität der Patienten anstiegen.' },
      ],
      parts: ['kzy-1', 'kzy-2', 'kzy-3'],
    },
  ],
};

humangenetik.questions.push(
  // ---------------- Klausurtraining: Duchenne ----------------
  {
    id: 'kdu-1', sub: 'erbgaenge', type: 'free', level: 4, err: 'inheritance', prov: 'inf', src: [p(25, 'Material A'), p(25)], operator: 'Analysieren',
    prompt: 'Analysiere den Stammbaum und gib alle möglichen Genotypen an.',
    rubric: [
      { id: 'rezessiv', label: 'Rezessiv: Gesunde Eltern (1 × 2 bzw. 5 × 6) haben kranke Söhne (3 bzw. 10)', any: [['rezessiv', 'gesund|eltern|uebersprung']], weight: 1.5 },
      { id: 'x', label: 'Vermutlich X-chromosomal: Nur Männer sind betroffen', any: [['x chromosom|gonosom', 'maenn|soehn|nur maenner|jungen']], weight: 1.5 },
      { id: 'maenner', label: 'Kranke Männer 3 und 10: XᵃY; gesunde Männer 1, 6, 7: XᴬY', any: [['cs:X\\s?a\\s?Y'], ['hemizygot']], weight: 1 },
      { id: 'muetter', label: 'Die Mütter 2 und 5 sind sicher Konduktorinnen (XᴬXᵃ)', any: [['konduktor|uebertraeger|heterozygot', '\\b2\\b|\\b5\\b|muetter|mutter'], ['cs:X\\s?A\\s?X\\s?a', '\\b2\\b|\\b5\\b']], weight: 1.5 },
      { id: 'toechter', label: 'Töchter 4, 8, 9: XᴬXᴬ oder XᴬXᵃ – nicht eindeutig', any: [['\\b4\\b|\\b8\\b|\\b9\\b|toechter|tochter', 'oder|nicht eindeutig|unklar|offen|beides|moeglich']], weight: 1 },
    ],
    model: 'Hypothese: Die Söhne 3 und 10 sind krank, obwohl ihre Eltern (1 und 2 bzw. 5 und 6) gesund sind – das Merkmal wird rezessiv vererbt. Da ausschließlich Männer betroffen sind, liegt vermutlich ein X-chromosomal-rezessiver Erbgang vor (Xᵃ = Krankheitsallel, Xᴬ = gesundes Allel). Genotypen: kranke Männer 3 und 10: XᵃY; gesunde Männer 1, 6 und 7: XᴬY. Die Mütter 2 und 5 müssen Konduktorinnen sein (XᴬXᵃ), denn ihre Söhne haben das Xᵃ von ihnen erhalten und die Väter sind gesund. Die gesunden Töchter 4, 8 und 9 können XᴬXᴬ oder XᴬXᵃ sein. Allein aus dem Stammbaum lässt sich ein autosomal-rezessiver Erbgang nicht sicher ausschließen (dann wären 1, 2, 5 und 6 heterozygot Aa).',
    why: [
      { text: 'Vorgehen nach der Methodenseite „Stammbaumanalyse“: Gesunde Eltern mit krankem Kind belegen Rezessivität; tritt eine Krankheit nur bei Männern auf, liegt vermutlich X-chromosomale Vererbung vor.', prov: 'pdf', src: [p(25)] },
      { text: 'Die Genotypen sind die Lösung der Aufgabe – deine PDF gibt dazu keine Lösung an.', prov: 'inf' },
    ],
  },
  {
    id: 'kdu-2', sub: 'erbgaenge', type: 'multi', level: 3, err: 'experiment', prov: 'inf', src: [p(25, 'Material A')],
    prompt: 'Welche Frauen sind laut Autoradiogramm Konduktorinnen?',
    options: ['2', '4', '5', '8', '9'],
    answers: [0, 2, 3],
    why: [{ text: 'Die Frauen 2, 5 und 8 sind gesund und besitzen beide Allele – also auch das Krankheitsallel 1. Die Frauen 4 und 9 besitzen nur Allel 2.', prov: 'inf', src: [p(25, 'Material A')] }],
  },
  {
    id: 'kdu-3', sub: 'erbgaenge', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(25, 'Material A')], operator: 'Auswerten',
    prompt: 'Werte das Autoradiogramm aus und vergleiche die Ergebnisse mit denen der Stammbaumanalyse.',
    rubric: [
      { id: 'allel1', label: 'Allel 1 ist das Krankheitsallel (kranke Söhne 3 und 10 haben nur Allel 1)', any: [['allel 1|allel eins|erste allel', 'krank|mutiert|defekt|duchenne']], weight: 1.5 },
      { id: 'maenner', label: 'Männer zeigen nur eine Bande → hemizygot → bestätigt X-chromosomal', any: [['eine bande|nur ein allel|nur eine|hemizygot|ein x']], weight: 1 },
      { id: 'konduktor', label: 'Auch Tochter 8 ist Konduktorin (2, 5 und 8 haben beide Allele)', any: [['\\b8\\b', 'konduktor|uebertraeger|heterozygot|beide allele']], weight: 1.5 },
      { id: 'homozygot', label: 'Die Töchter 4 und 9 haben nur Allel 2 → homozygot gesund (XᴬXᴬ)', any: [['\\b4\\b|\\b9\\b', 'homozygot|nur allel 2|kein(e)? konduktor|nicht konduktor|reinerbig']], weight: 1 },
      { id: 'vergleich', label: 'Das Autoradiogramm bestätigt die Stammbaumanalyse und klärt die offenen Genotypen', any: [['bestaetigt|stimmt ueberein|uebereinstimm|eindeutig|klaert|geklaert|praezis']], weight: 1 },
      { id: 'autosomal', label: 'Autosomal-rezessiv ist ausgeschlossen: Die gesunden Väter 1 und 6 tragen nur Allel 2', any: [['autosomal', 'ausgeschlossen|nicht moeglich|widerlegt|scheidet aus']], weight: 0.5 },
    ],
    model: 'Die kranken Söhne 3 und 10 besitzen nur Allel 1, alle gesunden Männer (1, 6, 7) nur Allel 2 – Allel 1 ist also das Krankheitsallel. Männer zeigen jeweils nur eine Bande: Sie besitzen nur ein Allel, sind also hemizygot. Das bestätigt den X-chromosomalen Erbgang. Die Frauen 2, 5 und 8 besitzen beide Allele und sind Konduktorinnen (XᴬXᵃ); die Frauen 4 und 9 besitzen nur Allel 2 und sind homozygot gesund (XᴬXᴬ). Das Autoradiogramm bestätigt damit die Stammbaumanalyse und klärt die dort offenen Genotypen: Tochter 8 ist Konduktorin, 4 und 9 sind es nicht. Ein autosomal-rezessiver Erbgang ist jetzt ausgeschlossen, denn die gesunden Väter 1 und 6 tragen das Krankheitsallel nicht.',
    why: [
      { text: 'Bandenmuster aus dem Autoradiogramm in Material A deiner PDF.', prov: 'pdf', src: [p(25, 'Material A')] },
      { text: 'Die Deutung ist die Lösung der Aufgabe; deine PDF gibt keine Lösung an.', prov: 'inf' },
    ],
  },
  {
    id: 'kdu-4', sub: 'erbgaenge', type: 'free', level: 3, err: 'comparison', prov: 'inf', src: [p(25, 'Material A'), p(26), p(25)], operator: 'Nennen',
    prompt: 'Nenne Vorteile der molekularbiologischen Untersuchungsmethode.',
    rubric: [
      { id: 'eindeutig', label: 'Eindeutige Genotypen statt bloßer Wahrscheinlichkeiten/Abschätzung', any: [['eindeutig|sicher|genau|exakt|abschaetz|wahrscheinlich']], weight: 1.5 },
      { id: 'konduktor', label: 'Konduktorinnen/Überträger sind erkennbar, obwohl sie phänotypisch gesund sind', any: [['konduktor|uebertraeger|heterozygot|traeger']], weight: 1 },
      { id: 'frueh', label: 'Früh möglich – schon vor Auftreten von Symptomen', any: [['frueh|vor (dem )?(auftreten|ausbruch)|symptom|praenatal']], weight: 0.5 },
      { id: 'zahlen', label: 'Kein großes Zahlenmaterial nötig – auch in kleinen Familien aussagekräftig', any: [['zahlenmaterial|wenige personen|kleine famil|kleinen famil|unabhaengig']], weight: 0.5 },
    ],
    model: 'Die molekularbiologische Untersuchung liefert eindeutige Genotypen statt bloßer Wahrscheinlichkeiten. Phänotypisch gesunde Überträgerinnen (Konduktorinnen) lassen sich sicher erkennen – wichtig für die Familienplanung. Die Untersuchung ist schon vor dem Auftreten von Symptomen möglich, und sie braucht kein großes Zahlenmaterial: Auch in einer kleinen Familie ist das Ergebnis aussagekräftig.',
    why: [
      { text: 'Stammbaumanalysen ermöglichen häufig nur eine Abschätzung des Risikos, Gentests dagegen eindeutige Aussagen.', prov: 'pdf', src: [p(26)] },
      { text: 'Für gesicherte Stammbaum-Aussagen braucht man ausreichend großes Zahlenmaterial.', prov: 'pdf', src: [p(25)] },
      { text: 'Die Anwendung auf das Duchenne-Material ist eine Schlussfolgerung.', prov: 'inf' },
    ],
  },

  // ---------------- Klausurtraining: Huntington ----------------
  {
    id: 'khu-1', sub: 'erbgaenge', type: 'free', level: 4, err: 'inheritance', prov: 'inf', src: [p(26, 'Material A'), p(25)], operator: 'Ermitteln',
    prompt: 'Ermittle anhand des Stammbaums den Erbgang von Chorea Huntington und ordne den Phänotypen mögliche Genotypen zu.',
    rubric: [
      { id: 'erbgang', label: 'Autosomal-dominanter Erbgang', any: [['autosom', 'dominant']], weight: 1 },
      { id: 'dominant', label: 'Begründung dominant: tritt in jeder Generation auf; zwei kranke Eltern haben gesunde Kinder', any: [['jede generation|jeder generation|gehaeuft|nicht uebersprung'], ['kranke eltern|betroffene eltern|beide eltern', 'gesund']], weight: 1.5 },
      { id: 'autosomal', label: 'Begründung autosomal: beide Geschlechter betroffen; ein kranker Vater hat eine gesunde Tochter', any: [['beide geschlechter|maenner und frauen|frauen und maenner'], ['vater', 'tochter']], weight: 1 },
      { id: 'genotypen', label: 'Gesunde: aa; Kranke: Aa (bzw. AA oder Aa, wenn beide Eltern krank sind)', any: [['cs:\\baa\\b', 'cs:\\bAa\\b'], ['gesund', 'homozygot|reinerbig', 'heterozygot|mischerbig']], weight: 1.5 },
      { id: 'offen', label: 'Ratsuchende Frau (2) und ihre Kinder (4, 5): Genotyp aus dem Stammbaum nicht bestimmbar', any: [['\\b2\\b|ratsuchend|\\b4\\b|\\b5\\b', 'unklar|nicht eindeutig|offen|unbekannt|nicht bestimm|oder']], weight: 0.5 },
    ],
    model: 'Chorea Huntington tritt in jeder Generation auf, und Männer wie Frauen sind betroffen. Ein rezessiver Erbgang ist ausgeschlossen: Zwei kranke Eltern haben gesunde Kinder – bei Rezessivität wären beide Eltern aa und alle Kinder krank. Ein X-chromosomal-dominanter Erbgang ist ausgeschlossen, weil der kranke Vater eine gesunde Tochter hat; er hätte ihr sein X-Chromosom mit dem Krankheitsallel vererbt. Der Erbgang ist also autosomal-dominant (A = Huntington-Allel). Genotypen: Alle Gesunden sind aa. Kranke mit einem gesunden Elternteil oder gesunden Kindern sind Aa. Die kranken Kinder zweier kranker (Aa-)Eltern können AA oder Aa sein. Die ratsuchende Frau (2) und ihre Kinder (4, 5) sind noch nicht erkrankt – ihr Genotyp lässt sich aus dem Stammbaum nicht bestimmen; die Frau kann AA, Aa oder aa sein.',
    why: [
      { text: 'Vorgehen nach der Methodenseite „Stammbaumanalyse“ (PDF S. 25).', prov: 'pdf', src: [p(25)] },
      { text: 'Die Lösung selbst ist eine Schlussfolgerung aus dem Stammbaum in Material A; deine PDF gibt keine Lösung an.', prov: 'inf' },
    ],
  },
  {
    id: 'khu-2', sub: 'beratung', type: 'multi', level: 3, err: 'experiment', prov: 'inf', src: [p(26, 'Material A')],
    prompt: 'Welche Personen tragen laut Diagramm ein Allel mit mehr als 37 CAG-Wiederholungen?',
    options: ['1', '2', '3', '4', '5'],
    answers: [1, 2],
    why: [{ text: 'Nur die Personen 2 und 3 haben eine Bande bei 86 Wiederholungen – weit über der Grenze von 37.', prov: 'inf', src: [p(26, 'Material A')] }],
  },
  {
    id: 'khu-3', sub: 'beratung', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(26, 'Material A')], operator: 'Auswerten',
    prompt: 'Werte das Diagramm im Hinblick auf die Genotypen der Personen 1 bis 5 aus und gib der ratsuchenden Frau eine begründete Antwort.',
    rubric: [
      { id: 'grenze', label: 'Mehr als 37 Wiederholungen = Huntington-Allel, 9 bis 35 = gesund', any: [['37|35|grenze']], weight: 0.5 },
      { id: 'frau', label: 'Person 2: ein Allel mit 86 Wiederholungen → heterozygot (Aa), sie wird voraussichtlich erkranken', any: [['86|ueber 37|mehr als 37|verlaengert|heterozygot', 'frau|\\b2\\b|mutter|ratsuchend|\\bsie\\b']], weight: 1.5 },
      { id: 'kinder', label: 'Kinder 4 und 5: beide Allele unter 34 → aa, sie erkranken nicht', any: [['kind|\\b4\\b|\\b5\\b', 'nicht erkrank|erkranken nicht|gesund|kein|unter 3[457]|homozygot|normal']], weight: 1.5 },
      { id: 'schwester', label: 'Person 3: 86 und ca. 28 → heterozygot krank (Aa)', any: [['\\b3\\b|schwester', 'heterozygot|86|krank']], weight: 0.5 },
      { id: 'mann', label: 'Person 1: nur Allele unter 34 → aa', any: [['\\b1\\b|mann|vater', 'gesund|unter|homozygot|normal|kein']], weight: 0.5 },
    ],
    model: 'Allele mit mehr als 37 CAG-Wiederholungen lösen Chorea Huntington aus; bei Gesunden sind es 9 bis 35. Die ratsuchende Frau (2) besitzt ein Allel mit 86 und eines mit etwa 16 Wiederholungen: Sie ist heterozygot (Aa) für das Huntington-Allel. Ihre kranke Schwester (3) hat ebenfalls ein Allel mit 86 Wiederholungen (Aa). Ihr Mann (1) und die Kinder (4, 5) besitzen nur Allele unterhalb der Grenze (aa). Die Kinder haben von der Mutter das Allel mit etwa 16 Wiederholungen geerbt. Antwort an die Frau: Sie trägt das Huntington-Allel und wird voraussichtlich erkranken – meist zwischen dem vierten und fünften Lebensjahrzehnt. Ihre beiden Kinder haben das Allel nicht geerbt und werden nicht an Chorea Huntington erkranken.',
    why: [
      { text: 'Grenzwerte und Diagramm aus Material A deiner PDF.', prov: 'pdf', src: [p(26, 'Material A')] },
      { text: 'Die Genotypen sind aus dem Diagramm abgelesen und gedeutet (Lösung der Aufgabe).', prov: 'inf' },
    ],
  },
  {
    id: 'khu-4', sub: 'beratung', type: 'free', level: 5, err: 'evaluation', prov: 'inf', src: [p(26, 'Material A'), p(26)], operator: 'Erläutern', minWords: 50,
    prompt: 'Nenne Vor- und Nachteile des Chorea-Huntington-Tests und erläutere, warum dieser bei Ratsuchenden zu einem Dilemma führen kann.',
    rubric: [
      { id: 'vorteil', label: 'Vorteil: Gewissheit – Lebens- und Familienplanung, Entlastung bei negativem Ergebnis', any: [['gewissheit|klarheit|sicherheit|planung|familienplan|entlast|eindeutig']], weight: 1 },
      { id: 'therapie', label: 'Nachteil: Es gibt keine ursächliche Therapie – das Wissen ändert den Verlauf nicht', any: [['therapie|heilbar|heilung|behandl']], weight: 1.5 },
      { id: 'belastung', label: 'Nachteil: psychische Belastung; das Ergebnis betrifft auch Angehörige', any: [['belast|angst|psych|verzweif|verwandt|geschwister|angehoerig']], weight: 1 },
      { id: 'dilemma', label: 'Dilemma: Wunsch nach Gewissheit vs. Recht auf Nichtwissen – beide Wege haben Nachteile', any: [['dilemma|zwiespalt|nichtwissen|nicht wissen'], ['einerseits', 'andererseits']], weight: 1.5 },
    ],
    model: 'Vorteile: Der Test liefert eine eindeutige Aussage. Ein negatives Ergebnis entlastet; ein positives ermöglicht es, Leben und Familienplanung darauf einzustellen, und die Kinder können gezielt getestet werden. Nachteile: Es gibt bislang keine ursächliche Therapie – ein positives Ergebnis ändert am Verlauf nichts, belastet aber oft über Jahrzehnte vor dem Ausbruch. Zudem betrifft das Ergebnis Angehörige: Ist die Frau Trägerin, war auch ein Elternteil Träger, und ihre Kinder haben ein Risiko von 50 %. Dilemma: Einerseits möchten Ratsuchende Gewissheit für sich und ihre Kinder, andererseits kann das Wissen um eine unheilbare Krankheit schwer zu ertragen sein – beide Entscheidungen haben Nachteile. Deshalb gibt es das Recht auf Nichtwissen.',
    why: [
      { text: 'Keine ursächliche Therapie, Recht auf Nichtwissen und Folgen für Angehörige: PDF S. 26 und Material A.', prov: 'pdf', src: [p(26, 'Material A'), p(26)] },
      { text: 'Die 50 % für die Kinder einer heterozygoten Trägerin folgen aus dem autosomal-dominanten Erbgang (Aa × aa, PDF S. 28).', prov: 'inf', src: [p(28)] },
      { text: 'Die Abwägung ist eine Musterlösung, keine Lösung aus deiner PDF.', prov: 'inf' },
    ],
  },

  // ---------------- Klausurtraining: Zypern ----------------
  {
    id: 'kzy-1', sub: 'erbgaenge', type: 'free', level: 3, err: 'inheritance', prov: 'inf', src: [p(27, 'Material B'), p(28), p(25)], operator: 'Ableiten',
    prompt: 'Leite aus den Textinformationen den Erbgang der β-Thalassämie ab.',
    rubric: [
      { id: 'rezessiv', label: 'Rezessiv: Überträger tragen den Gendefekt, ohne selbst krank zu sein', any: [['rezessiv', 'traeger|uebertraeger|nicht erkrankt|ohne selbst|gesund|heterozygot']], weight: 1.5 },
      { id: 'viertel', label: '25 % Risiko bei zwei Überträgern entspricht Aa × Aa → aa', any: [['25|viertel|1/4']], weight: 1 },
      { id: 'autosomal', label: 'Autosomal: Auch Väter können gesunde Überträger sein – bei X-chromosomaler Vererbung wären Männer mit dem Allel krank', any: [['autosom', 'vater|beide eltern|maenner|mann|hemizygot|geschlecht']], weight: 1.5 },
    ],
    model: 'Einer von sieben Einwohnern trägt den Gendefekt, ohne selbst erkrankt zu sein: Heterozygote sind gesunde Überträger – das Krankheitsallel ist also rezessiv. Sind beide Eltern Überträger (Aa × Aa), erkrankt ein Kind mit 25 % Wahrscheinlichkeit (aa); das entspricht den Mendelschen Regeln für einen rezessiven Erbgang. Da beide Eltern – also auch der Vater – gesunde Überträger sein können, liegt das Gen auf einem Autosom: Bei X-chromosomaler Vererbung wäre ein Mann mit dem mutierten Allel hemizygot und damit krank. Die β-Thalassämie wird also autosomal-rezessiv vererbt.',
    why: [
      { text: 'Textinformationen aus Material B deiner PDF; Kennzeichen der Erbgänge nach PDF S. 28 und 25.', prov: 'pdf', src: [p(27, 'Material B'), p(28), p(25)] },
      { text: 'Die Ableitung ist die Lösung der Aufgabe; deine PDF gibt keine Lösung an.', prov: 'inf' },
    ],
  },
  {
    id: 'kzy-2', sub: 'beratung', type: 'free', level: 4, err: 'evaluation', prov: 'inf', src: [p(27, 'Material B')], operator: 'Nennen',
    prompt: 'Nenne Argumente, die für oder gegen das Vorsorgeprogramm auf Zypern sprechen.',
    rubric: [
      { id: 'weniger', label: 'Pro: deutlich weniger erkrankte Neugeborene, weniger Leid', any: [['weniger|sank|gesunken|rueckgang|leid|verhinder']], weight: 1 },
      { id: 'qualitaet', label: 'Pro: Lebensdauer und Lebensqualität der Patienten stiegen; Aufwand/Kosten sinken', any: [['lebensqualitaet|lebensdauer|kosten|aufwand|finanziell|ressourcen']], weight: 1 },
      { id: 'freiwillig', label: 'Pro: freiwillig und kostenlos; informierte Familienplanung', any: [['freiwillig|kostenlos|informiert|selbstbestimm|planung|beratung']], weight: 0.5 },
      { id: 'abbruch', label: 'Contra: Rund ein Viertel der untersuchten Schwangerschaften wird abgebrochen – Lebensschutz', any: [['abbruch|abgebrochen|abtreib|viertel|lebensrecht|lebensschutz|ungeboren']], weight: 1.5 },
      { id: 'druck', label: 'Contra: sozialer Druck, Stigmatisierung von Überträgern und Erkrankten, Recht auf Nichtwissen', any: [['druck|diskrimin|stigma|ausgegrenzt|nichtwissen|zwang|behindert|wert']], weight: 1 },
    ],
    model: 'Für das Programm spricht: Die Zahl erkrankter Neugeborener sank erheblich, viel Leid wird verhindert. Lebensdauer und Lebensqualität der Patienten stiegen, und der hohe medizinische und finanzielle Aufwand sinkt. Das Programm ist freiwillig und kostenlos und ermöglicht Paaren eine informierte Familienplanung. Dagegen spricht: Rund ein Viertel der untersuchten Schwangerschaften wird abgebrochen – das berührt den Schutz ungeborenen Lebens. Wenn nahezu alle teilnehmen, kann ein sozialer Druck entstehen, sich testen zu lassen; Überträger und Erkrankte könnten stigmatisiert werden, und das Recht auf Nichtwissen gerät unter Druck.',
    why: [
      { text: 'Die Fakten stammen aus Material B deiner PDF.', prov: 'pdf', src: [p(27, 'Material B')] },
      { text: 'Die Argumente sind eine Musterlösung, keine Lösung aus deiner PDF.', prov: 'inf' },
    ],
  },
  {
    id: 'kzy-3', sub: 'beratung', type: 'free', level: 5, err: 'evaluation', prov: 'inf', src: [p(27, 'Material B'), p(29)], operator: 'Bewerten', minWords: 60,
    prompt: 'Bewerte das Programm aus ethischer Sicht. Unterscheide dabei deskriptive und normative Aussagen.',
    rubric: [
      { id: 'sache', label: 'Sachlage deskriptiv beschreiben (freiwillig, kostenlos, rund ein Viertel Abbrüche, weniger Erkrankte)', any: [['freiwillig|kostenlos|viertel|1976|sieben|gesunken|sank']], weight: 1 },
      { id: 'werte', label: 'Werte benennen: Selbstbestimmung, Schutz des Lebens, Vermeidung von Leid, Gerechtigkeit', any: [['selbstbestimm|autonomie|lebensschutz|lebensrecht|leid|wuerde|gerecht|verantwort']], weight: 1.5 },
      { id: 'normativ', label: 'Normative Aussagen als solche kennzeichnen (sollte, darf …)', any: [['normativ|deskriptiv'], ['sollte|darf|duerfen']], weight: 0.5 },
      { id: 'abwaegen', label: 'Pro und Contra gegeneinander abwägen', any: [['einerseits|andererseits|jedoch|allerdings|abwaeg|dagegen|dafuer']], weight: 1 },
      { id: 'urteil', label: 'Eigenes begründetes Urteil', any: [['urteil|meiner meinung|ich finde|ich halte|fazit|insgesamt|abschliessend']], weight: 1 },
    ],
    model: 'Deskriptiv: Seit 1976 bietet Zypern ein freiwilliges, kostenloses Programm mit Gentest, Beratung und Pränataldiagnostik an. Einer von sieben Einwohnern ist Überträger; rund ein Viertel der untersuchten Schwangerschaften wird abgebrochen; die Zahl erkrankter Neugeborener sank erheblich. Normativ: Für das Programm spricht der Wert, Leid zu vermeiden, und die Selbstbestimmung der Paare, die informiert entscheiden können. Dagegen steht der Schutz des ungeborenen Lebens: Abbrüche wegen einer Erbkrankheit bewerten manche als Auswahl menschlichen Lebens. Zudem könnte die hohe Teilnahme sozialen Druck erzeugen und das Recht auf Nichtwissen schwächen. Mein Urteil: Ich halte das Programm für ethisch vertretbar, weil es freiwillig ist und Beratung einschließt – es sollte aber sichergestellt sein, dass niemand zu Test oder Abbruch gedrängt wird und Erkrankte weiterhin gut versorgt werden.',
    why: [
      { text: 'Sachinformationen aus Material B; die Bewertung unter Unterscheidung deskriptiver und normativer Aussagen verlangt der Lehrplan (PDF S. 29).', prov: 'pdf', src: [p(27, 'Material B'), p(29)] },
      { text: 'Das Urteil in der Musterlösung ist ein Beispiel – eine andere, gut begründete Position ist ebenso richtig.', prov: 'inf' },
    ],
  },
);
