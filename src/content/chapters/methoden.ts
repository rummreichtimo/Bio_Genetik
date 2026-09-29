import type { ContentPack } from '../index';
import { p } from '../helpers';

const ENZYM_EXT = { label: 'Wikipedia: Denaturierung (Biochemie)', url: 'https://de.wikipedia.org/wiki/Denaturierung_(Biochemie)' };

/**
 * Kapitel 2 · Arbeitstechniken der molekularen Genetik (PDF S. 6–8, Buch S. 240–245)
 */
export const methoden: ContentPack = {
  lessons: [
    {
      sub: 'pcr',
      intro: 'Wie lässt sich eine winzige Menge DNA – etwa aus einem Nasenabstrich – so vervielfältigen, dass man sie untersuchen kann?',
      sections: [
        {
          id: 'influenza',
          title: 'Ausgangsfrage: Ist es eine echte Grippe?',
          blocks: [
            {
              kind: 'text',
              md: 'Für die Diagnose einer echten Grippe (Influenza) wird ein Abstrich aus dem Nasen-Rachenraum untersucht. Das genetische Material der Viren besteht aus **einzelsträngiger RNA**; bestimmte Enzyme schreiben sie in **doppelsträngige DNA** um. Diese DNA-Menge ist für den Nachweis zu gering – sie wird durch eine **Polymerase-Kettenreaktion (PCR)** vervielfältigt.',
              src: [p(6)],
            },
          ],
        },
        {
          id: 'komponenten',
          title: 'Was in den Reaktionsansatz gehört',
          blocks: [
            {
              kind: 'bullets',
              items: [
                'die **DNA**, deren Abschnitt vervielfältigt werden soll',
                'eine besonders **hitzestabile DNA-Polymerase** mit Temperaturoptimum 72 °C: die **Taq-Polymerase** aus dem Bakterium *Thermus aquaticus*, das in heißen Quellen lebt',
                'ein Gemisch der **vier DNA-Nucleotide**',
                'zwei künstlich hergestellte **Primer** (15 bis 25 Nucleotide lang), komplementär zu Anfang und Ende des zu vervielfältigenden Abschnitts',
              ],
              src: [p(6)],
            },
            {
              kind: 'text',
              md: 'Das Reaktionsgefäß kommt in einen **Thermocycler** – ein Heiz-/Kühlgerät, das automatisch die Temperaturen für die einzelnen Schritte einstellt.',
              src: [p(6)],
            },
          ],
        },
        {
          id: 'zyklus',
          title: 'Ein PCR-Zyklus in drei Schritten',
          blocks: [
            {
              kind: 'steps',
              steps: [
                { title: 'Denaturierung · 95 °C', text: 'Die Wasserstoffbrücken des DNA-Doppelstrangs werden getrennt, die DNA liegt in Einzelsträngen vor.' },
                { title: 'Hybridisierung · ca. 60 °C', text: 'Die beiden Primer binden komplementär an je einen der beiden Einzelstränge.' },
                { title: 'Polymerisation · 72 °C', text: 'Die Taq-Polymerase bindet komplementär zur Basensequenz freie Nucleotide an die Primer. Zu beiden Einzelsträngen entsteht ein neuer komplementärer Strang.' },
              ],
              src: [p(6)],
            },
            {
              kind: 'text',
              md: 'Am Ende eines Zyklus liegt die Ausgangs-DNA **verdoppelt** vor. Ein Zyklus dauert etwa zwei Minuten; meist werden **25 bis 35 Zyklen** durchlaufen – so entstehen in kürzester Zeit Millionen Kopien des Abschnitts.',
              src: [p(6)],
            },
            { kind: 'widget', widget: 'pcr', caption: 'Spiele Zyklen durch und beobachte Temperatur und Kopienzahl.', src: [p(6, 'Abb. 3')] },
            { kind: 'check', questionIds: ['pcr-q5', 'pcr-q2'] },
          ],
        },
        {
          id: 'vergleich',
          title: 'PCR und natürliche Replikation',
          blocks: [
            {
              kind: 'text',
              md: 'Deine PDF betont: Die PCR **gleicht in ihrem Ablauf der natürlichen DNA-Replikation**. Die Unterschiede ergeben sich aus dem Laborverfahren:',
              src: [p(6)],
            },
            {
              kind: 'compare',
              columns: ['Replikation in der Zelle', 'PCR im Labor'],
              rows: [
                { label: 'Strangtrennung', cells: ['Enzym Helicase', 'Erhitzen auf 95 °C (Denaturierung)'] },
                { label: 'Primer', cells: ['von der Primase gebildet', 'künstlich hergestellt, 15–25 Nucleotide'] },
                { label: 'Polymerase', cells: ['DNA-Polymerase der Zelle', 'hitzestabile Taq-Polymerase (72 °C)'] },
                { label: 'Kopiert wird', cells: ['die gesamte DNA (vor der Zellteilung)', 'nur der Abschnitt zwischen den beiden Primern'] },
              ],
              src: [p(5), p(6)],
              prov: 'inf',
            },
          ],
        },
        {
          id: 'realtime',
          title: 'Real-Time-PCR und Anwendungen',
          blocks: [
            {
              kind: 'text',
              md: 'Gibt man einen Farbstoff wie **SYBR Green** hinzu, lagert er sich **ausschließlich in DNA-Doppelstränge** ein und fluoresziert. Ein besonderer Thermocycler misst die Fluoreszenz während der Zyklen. Ihre Intensität ist **proportional zur DNA-Menge** – die Vervielfältigung lässt sich in Echtzeit verfolgen (**Real-Time-PCR**). Die Methode ist schneller und erlaubt die **quantitative** Bestimmung der DNA-Menge.',
              src: [p(6)],
            },
            {
              kind: 'bullets',
              title: 'Anwendungen laut deiner PDF',
              items: [
                '**Erregernachweis**: Primer binden spezifisch an Abschnitte der Virus-DNA. Findet die PCR statt, war Virus-RNA in den Schleimhautzellen vorhanden.',
                '**Kriminalistik**: DNA aus Zellen vom Tatort wird mit der DNA von Verdächtigen verglichen.',
                '**Suche nach Gendefekten**, die etwa Erbkrankheiten oder Krebs auslösen.',
              ],
              src: [p(6)],
            },
            { kind: 'check', questionIds: ['pcr-q10', 'pcr-q12'] },
          ],
        },
      ],
    },
    {
      sub: 'gelelektrophorese',
      intro: 'Wie lassen sich DNA-Fragmente – etwa aus einer PCR – nach ihrer Größe trennen und auswerten?',
      sections: [
        {
          id: 'prinzip',
          title: 'Prinzip: Wandern im elektrischen Feld',
          blocks: [
            {
              kind: 'text',
              md: 'Bei der **Gelelektrophorese** wandern Moleküle wie DNA oder Proteine durch ein Gel, an das ein **elektrisches Feld** angelegt ist. Das Gel wirkt wie ein **engmaschiges Netz** (Molekularsieb) und behindert die Moleküle – je nach Größe und Ladung bewegen sie sich unterschiedlich schnell.\n\nNegativ geladene Moleküle wandern zur positiv geladenen **Anode**, positiv geladene zur negativ geladenen **Kathode**. Das Gel liegt in einer puffergefüllten Kammer und hat mehrere **Taschen**, sodass mehrere Proben gleichzeitig laufen können.',
              src: [p(7)],
            },
          ],
        },
        {
          id: 'dna',
          title: 'DNA-Fragmente trennen',
          blocks: [
            {
              kind: 'bullets',
              items: [
                'DNA ist wegen ihrer **Phosphatgruppen negativ geladen** → sie wandert zur Anode.',
                '**Je kürzer** ein Fragment, desto leichter durchdringt es die Maschen und desto **schneller** wandert es.',
                'DNA ist farblos: Ein mitlaufender **Farbstoff** zeigt den Fortschritt; erreicht er den unteren Gelrand, wird die Elektrophorese beendet.',
                'Mit (heute meist fluoreszierenden) Nachweisreagenzien leuchten die **Banden** unter UV-Licht.',
              ],
              src: [p(7)],
            },
            {
              kind: 'term',
              term: 'Molekülmassenstandard',
              def: 'Kontrollprobe mit DNA-Fragmenten bekannter Größe, die parallel mitläuft. Ihre Banden bilden eine Vergleichsskala, an der Größe und Masse unbekannter Fragmente abgelesen werden.',
              simple: 'Das „Lineal“ im Gel.',
              src: [p(7)],
            },
            { kind: 'check', questionIds: ['gel-q1', 'gel-q2'] },
          ],
        },
        {
          id: 'proteine',
          title: 'Proteine trennen: die Rolle von SDS',
          blocks: [
            {
              kind: 'text',
              md: 'Proteine sind je nach ihren Aminosäuren sehr **unterschiedlich geladen**. Gleich große Proteine könnten deshalb unterschiedlich schnell und sogar in **verschiedene Richtungen** wandern. Deshalb werden sie zuerst **denaturiert** und die entfalteten Polypeptidketten mit **Natrium-Dodecyl-Sulfat (SDS)** beladen. Dieses Anion **überdeckt die Eigenladung**; alle Ketten wandern zur Anode. Weil SDS in einem genauen Verhältnis bindet, hängt die Wanderungsgeschwindigkeit nur noch von der **Molekülgröße** ab. **Referenzproteine** bekannter Masse laufen zum Vergleich mit.',
              src: [p(7)],
            },
            { kind: 'check', questionIds: ['gel-q6'] },
          ],
        },
        {
          id: 'fvl',
          title: 'Anwendung: Indirekter Mutationsnachweis',
          blocks: [
            {
              kind: 'text',
              md: 'Bei der Erbkrankheit **Faktor-V-Leiden** ist die Blutgerinnung gestört – Betroffene haben ein höheres Thromboserisiko. Nachweis: Ein **267 bp** langes DNA-Fragment wird per PCR vervielfältigt und von einem Enzym an **zwei Stellen** geschnitten (Fragmente 67 bp, 37 bp, 163 bp). Bei der Mutation **fehlt eine der beiden Schnittstellen**. Die Gelelektrophorese zeigt dann ein anderes Bandenmuster; so lassen sich auch homozygote und heterozygote Personen unterscheiden.',
              src: [p(7, 'Material A')],
            },
            { kind: 'widget', widget: 'gel-fvl', caption: 'Gel aus Material A: Ordne den Personen A, B und C ihren Genotyp zu.', src: [p(7, 'Material A')] },
            { kind: 'check', questionIds: ['gel-q9'] },
          ],
        },
      ],
    },
    {
      sub: 'sequenzierung',
      intro: 'Um die Ursachen von Erbkrankheiten zu verstehen, muss man die Basensequenz von Genen kennen. Wie wird sie ermittelt?',
      sections: [
        {
          id: 'sanger',
          title: 'Kettenabbruchmethode nach Sanger',
          blocks: [
            {
              kind: 'text',
              md: 'Der zu analysierende DNA-Strang wird durch Hitze **denaturiert** und auf **vier Reaktionsansätze** verteilt. Jeder Ansatz enthält viele identische Kopiervorlagen, eine **DNA-Polymerase**, die vier Nucleotide **dATP, dGTP, dCTP, dTTP**, einen **radioaktiv markierten Primer** – und jeweils **ein Abbruchnucleotid** (ddATP, ddGTP, ddCTP oder ddTTP) in geringer Konzentration.',
              src: [p(8)],
            },
            {
              kind: 'term',
              term: 'Abbruchnucleotid (ddNTP)',
              def: 'Nucleotid, dem am dritten C-Atom der Desoxyribose die Hydroxygruppe fehlt. Ohne sie kann kein weiteres Nucleotid angefügt werden – die Synthese bricht ab.',
              simple: 'Ein Baustein ohne „Andockstelle“ für den nächsten – danach ist Schluss.',
              src: [p(8)],
            },
            {
              kind: 'steps',
              steps: [
                { title: 'Synthese', text: 'Die Polymerase verlängert vom Primer aus, bis **zufällig** ein Abbruchnucleotid eingebaut wird. So entstehen unterschiedlich lange Fragmente, die alle mit demselben Abbruchnucleotid enden.' },
                { title: 'Alle Längen', text: 'Weil vier Ansätze parallel laufen, erhält man insgesamt alle Abbruchfragmente.' },
                { title: 'Trennen', text: 'Nach erneuter Denaturierung werden die neuen Einzelstränge in **vier Spuren** per Gelelektrophorese getrennt.' },
                { title: 'Sichtbar machen', text: 'Der radioaktive Primer hinterlässt bei der **Autoradiografie** ein Bandenmuster auf der Fotoplatte.' },
                { title: 'Ablesen', text: 'Man beginnt mit der **am weitesten gewanderten Bande** (kürzestes Fragment) und liest nach zunehmender Länge in 5\'→3\'-Richtung – das ergibt die **komplementäre Sequenz** des analysierten Strangs.' },
              ],
              src: [p(8)],
            },
            { kind: 'widget', widget: 'sanger', caption: 'Lies das Gel aus der Abbildung deiner PDF ab.', src: [p(8, 'Abb. 3')] },
            { kind: 'check', questionIds: ['seq-q2', 'seq-q5'] },
          ],
        },
        {
          id: 'fluoreszenz',
          title: 'Fluoreszenzsequenzierung und Hochdurchsatz',
          blocks: [
            {
              kind: 'text',
              md: 'Statt eines radioaktiven Primers werden **fluoreszenzmarkierte Abbruchnucleotide** verwendet – jedes der vier mit einer anderen Farbe. Die Reaktion läuft deshalb in **nur einem Ansatz**. Die Fragmente werden in einer **Kapillarelektrophorese** nach Größe getrennt; ein **Fluoreszenzdetektor** registriert die Farben und wandelt sie in ein **Kurvendiagramm** um, aus dem die Basensequenz folgt.\n\nNeue **Hochdurchsatzsequenzierungen** sind deutlich schneller und kostengünstiger: Millionen DNA-Fragmente werden parallel sequenziert.',
              src: [p(8, 'Material A')],
            },
            { kind: 'check', questionIds: ['seq-q7', 'seq-q10'] },
          ],
        },
      ],
    },
  ],

  terms: [
    { id: 'pcr-pcr', sub: 'pcr', term: 'Polymerase-Kettenreaktion (PCR)', def: 'Labormethode zur Vervielfältigung eines bestimmten DNA-Abschnitts in wiederholten Zyklen aus Denaturierung, Hybridisierung und Polymerisation.', simple: 'Ein DNA-Kopierer im Reagenzglas.', src: [p(6)] },
    { id: 'pcr-taq', sub: 'pcr', term: 'Taq-Polymerase', def: 'Besonders hitzestabile DNA-Polymerase mit Temperaturoptimum 72 °C, isoliert aus dem Bakterium Thermus aquaticus aus heißen Quellen.', simple: 'Eine Polymerase, die Hitze aushält.', src: [p(6)] },
    { id: 'pcr-primer', sub: 'pcr', term: 'Primer (bei der PCR)', def: 'Zwei künstlich hergestellte, 15–25 Nucleotide lange Startermoleküle, komplementär zu Anfang und Ende des zu vervielfältigenden Abschnitts.', simple: 'Sie markieren Start und Ende des Abschnitts, der kopiert wird.', src: [p(6)] },
    { id: 'pcr-thermocycler', sub: 'pcr', term: 'Thermocycler', def: 'Heiz-/Kühlgerät, das automatisch die Temperaturen der PCR-Schritte einstellt.', simple: 'Die Maschine, die im Takt heizt und kühlt.', src: [p(6)] },
    { id: 'pcr-denat', sub: 'pcr', term: 'Denaturierung (PCR)', def: 'Erster PCR-Schritt bei 95 °C: Die Wasserstoffbrücken werden getrennt, die DNA liegt in Einzelsträngen vor.', simple: 'Hitze trennt die beiden Stränge.', src: [p(6)] },
    { id: 'pcr-hybrid', sub: 'pcr', term: 'Hybridisierung', def: 'Zweiter PCR-Schritt bei etwa 60 °C: Die beiden Primer binden komplementär an je einen Einzelstrang.', simple: 'Die Startblöcke docken an.', src: [p(6)] },
    { id: 'pcr-polym', sub: 'pcr', term: 'Polymerisation', def: 'Dritter PCR-Schritt bei 72 °C: Die Taq-Polymerase bindet komplementär freie Nucleotide an die Primer; neue Einzelstränge entstehen.', simple: 'Die Polymerase baut den neuen Strang.', src: [p(6)] },
    { id: 'pcr-zyklus', sub: 'pcr', term: 'PCR-Zyklus', def: 'Abfolge von Denaturierung, Hybridisierung und Polymerisation; verdoppelt die DNA-Menge, dauert etwa zwei Minuten. Üblich sind 25–35 Zyklen.', simple: 'Eine Runde = doppelt so viel DNA.', src: [p(6)] },
    { id: 'pcr-realtime', sub: 'pcr', term: 'Real-Time-PCR', def: 'PCR mit einem Farbstoff (z. B. SYBR Green), der nur in DNA-Doppelstränge eingelagert fluoresziert; die Fluoreszenz wird in Echtzeit gemessen und ist proportional zur DNA-Menge.', simple: 'PCR mit Live-Anzeige, wie viel DNA schon da ist.', src: [p(6)] },
    { id: 'gel-gel', sub: 'gelelektrophorese', term: 'Gelelektrophorese', def: 'Trennung von Molekülen wie DNA oder Proteinen nach Größe und Ladung, indem sie im elektrischen Feld durch ein Gel wandern.', simple: 'Ein Wettrennen durch ein Netz – die Kleinen sind schneller.', src: [p(7)] },
    { id: 'gel-anode', sub: 'gelelektrophorese', term: 'Anode / Kathode', def: 'Anode: positiv geladener Pol, zu dem negativ geladene Moleküle (z. B. DNA) wandern. Kathode: negativ geladener Pol.', simple: 'DNA läuft zum Plus.', src: [p(7)] },
    { id: 'gel-standard', sub: 'gelelektrophorese', term: 'Molekülmassenstandard', def: 'Mitlaufendes Gemisch von DNA-Fragmenten bekannter Größe als Vergleichsskala.', simple: 'Das Lineal im Gel.', src: [p(7)] },
    { id: 'gel-banden', sub: 'gelelektrophorese', term: 'Bandenmuster', def: 'Nach der Elektrophorese liegen die Fragmente als einzelne Banden vor, die ein charakteristisches Muster bilden.', simple: 'Die Streifen im Gel – wie ein Barcode.', src: [p(7)] },
    { id: 'gel-sds', sub: 'gelelektrophorese', term: 'SDS (Natrium-Dodecyl-Sulfat)', def: 'Anion, mit dem denaturierte Polypeptidketten beladen werden; überdeckt ihre Eigenladung und bindet im genauen Verhältnis, sodass die Wanderung nur von der Größe abhängt.', simple: 'Macht alle Proteine gleich negativ.', src: [p(7)] },
    { id: 'gel-restriktion', sub: 'gelelektrophorese', term: 'Restriktionsenzym', def: 'Enzym, das DNA an bestimmten Schnittstellen schneidet (im Faktor-V-Leiden-Test an zwei Stellen eines 267-bp-Fragments).', simple: 'Eine Schere, die nur an bestimmten Stellen schneidet.', src: [p(7, 'Material A')] },
    { id: 'gel-indirekt', sub: 'gelelektrophorese', term: 'Indirekter Mutationsnachweis', def: 'Nachweis einer Mutation über ein verändertes Bandenmuster, z. B. weil durch die Mutation eine Schnittstelle fehlt.', simple: 'Man sieht nicht die Mutation selbst, sondern ihre Spur im Gel.', src: [p(7, 'Material A')], prov: 'inf' },
    { id: 'seq-sequenzierung', sub: 'sequenzierung', term: 'DNA-Sequenzierung', def: 'Ermittlung der Basensequenz eines DNA-Abschnitts; Ergebnis ist z. B. ein Kurvendiagramm, aus dem die Sequenz abgelesen wird.', simple: 'Die Buchstabenfolge der DNA herausfinden.', src: [p(8)] },
    { id: 'seq-kettenabbruch', sub: 'sequenzierung', term: 'Kettenabbruchmethode', def: 'Sequenzierung nach Sanger: In vier Ansätzen bricht die Synthese zufällig beim Einbau eines Abbruchnucleotids ab; die Fragmente werden per Gelelektrophorese getrennt und abgelesen.', simple: 'Kopieren, bis zufällig „Stopp“ kommt – und aus den Längen die Reihenfolge ablesen.', src: [p(8)] },
    { id: 'seq-ddntp', sub: 'sequenzierung', term: 'Abbruchnucleotid (ddNTP)', def: 'Nucleotid ohne Hydroxygruppe am dritten C-Atom der Desoxyribose; danach kann kein Nucleotid mehr angefügt werden.', simple: 'Der Stopp-Baustein.', src: [p(8)] },
    { id: 'seq-fluoreszenz', sub: 'sequenzierung', term: 'Fluoreszenzsequenzierung', def: 'Variante der Kettenabbruchmethode mit vier verschiedenfarbig fluoreszierenden Abbruchnucleotiden in einem Ansatz; Trennung per Kapillarelektrophorese, Auswertung durch einen Fluoreszenzdetektor.', simple: 'Jeder Stopp-Baustein leuchtet in seiner eigenen Farbe.', src: [p(8, 'Material A')] },
    { id: 'seq-kapillar', sub: 'sequenzierung', term: 'Kapillarelektrophorese', def: 'Gelelektrophorese in einem Kapillarrohr, an dessen Ende ein Detektor die vorbeiwandernden Fragmente erfasst.', simple: 'Ein Gel in einem sehr dünnen Röhrchen.', src: [p(8, 'Material A')] },
    { id: 'seq-hochdurchsatz', sub: 'sequenzierung', term: 'Hochdurchsatzsequenzierung', def: 'Neue Methoden, die Millionen DNA-Fragmente parallel, schneller und kostengünstiger sequenzieren.', simple: 'Sehr viele Sequenzen gleichzeitig.', src: [p(8)] },
  ],

  cards: [
    { id: 'pcr-c1', sub: 'pcr', kind: 'prozess', front: 'PCR-Schritt: **Denaturierung**', back: '95 °C – die Wasserstoffbrücken des Doppelstrangs werden getrennt, die DNA liegt in Einzelsträngen vor.', src: [p(6)], prov: 'pdf' },
    { id: 'pcr-c2', sub: 'pcr', kind: 'prozess', front: 'PCR-Schritt: **Hybridisierung**', back: 'ca. 60 °C – die beiden Primer binden komplementär an je einen Einzelstrang.', src: [p(6)], prov: 'pdf' },
    { id: 'pcr-c3', sub: 'pcr', kind: 'prozess', front: 'PCR-Schritt: **Polymerisation**', back: '72 °C – die Taq-Polymerase bindet komplementär freie Nucleotide an die Primer; neue Einzelstränge entstehen.', src: [p(6)], prov: 'pdf' },
    { id: 'pcr-c4', sub: 'pcr', kind: 'frage', front: 'Warum verwendet man bei der PCR die Taq-Polymerase?', back: 'Sie ist besonders hitzestabil (Temperaturoptimum 72 °C) – sie stammt aus Thermus aquaticus, einem Bakterium aus heißen Quellen.', src: [p(6)], prov: 'pdf' },
    { id: 'pcr-c5', sub: 'pcr', kind: 'vergleich', front: 'Replikation vs. PCR: Wie werden die Stränge getrennt, woher kommen die Primer?', back: 'Replikation: Helicase trennt, Primase bildet Primer.\nPCR: Erhitzen auf 95 °C trennt, Primer sind künstlich hergestellt.', src: [p(5), p(6)], prov: 'inf' },
    { id: 'pcr-c6', sub: 'pcr', kind: 'ursache', front: 'Ursache: SYBR Green im PCR-Ansatz → Wirkung?', back: 'Der Farbstoff lagert sich nur in Doppelstränge ein und fluoresziert; die Fluoreszenz ist proportional zur DNA-Menge → Vervielfältigung in Echtzeit messbar, DNA-Menge quantitativ bestimmbar.', src: [p(6)], prov: 'pdf' },
    { id: 'pcr-c7', sub: 'pcr', kind: 'frage', front: 'Nenne drei Anwendungen der PCR aus deiner PDF.', back: 'Erregernachweis (z. B. Influenza), Kriminalistik (Tatort-DNA mit Verdächtigen vergleichen), Suche nach Gendefekten (Erbkrankheiten, Krebs).', src: [p(6)], prov: 'pdf' },
    { id: 'gel-c1', sub: 'gelelektrophorese', kind: 'ursache', front: 'Ursache: DNA besitzt Phosphatgruppen → Wirkung in der Gelelektrophorese?', back: 'DNA ist negativ geladen und wandert zur positiv geladenen Anode.', src: [p(7)], prov: 'pdf' },
    { id: 'gel-c2', sub: 'gelelektrophorese', kind: 'frage', front: 'Welche Fragmente wandern im Gel am weitesten – und warum?', back: 'Die kürzesten: Sie durchdringen die Maschen des Gels am leichtesten.', src: [p(7)], prov: 'pdf' },
    { id: 'gel-c3', sub: 'gelelektrophorese', kind: 'ursache', front: 'Ursache: Proteine werden mit SDS beladen → Wirkung?', back: 'Die Eigenladung wird überdeckt; alle Polypeptide wandern zur Anode, die Geschwindigkeit hängt nur noch von der Größe ab.', src: [p(7)], prov: 'pdf' },
    { id: 'gel-c4', sub: 'gelelektrophorese', kind: 'experiment', front: 'Faktor-V-Leiden: Banden bei Person ohne Mutation?', back: '163 bp, 67 bp und 37 bp – das 267-bp-Fragment wird an zwei Stellen geschnitten.', src: [p(7, 'Material A')], prov: 'pdf' },
    { id: 'gel-c5', sub: 'gelelektrophorese', kind: 'experiment', front: 'Faktor-V-Leiden: Was zeigen die Banden 200, 163, 67 und 37 bp in einer Spur?', back: 'Heterozygoter Genotyp: ein Allel mit beiden Schnittstellen (163/67/37), ein mutiertes Allel ohne die zweite Schnittstelle (200/67).', src: [p(7, 'Material A')], prov: 'inf' },
    { id: 'seq-c1', sub: 'sequenzierung', kind: 'ursache', front: 'Ursache: Einbau eines Abbruchnucleotids → Wirkung?', back: 'Ohne Hydroxygruppe am dritten C-Atom kann kein weiteres Nucleotid angefügt werden – die Kette bricht ab.', src: [p(8)], prov: 'pdf' },
    { id: 'seq-c2', sub: 'sequenzierung', kind: 'vergleich', front: 'Sanger-Methode vs. Fluoreszenzsequenzierung', back: 'Sanger: radioaktiver Primer, 4 Ansätze, Gel mit 4 Spuren, Autoradiografie.\nFluoreszenz: 4 farbige ddNTPs, 1 Ansatz, Kapillarelektrophorese, Detektor → Kurvendiagramm.', src: [p(8)], prov: 'pdf' },
    { id: 'seq-c3', sub: 'sequenzierung', kind: 'frage', front: 'Wo beginnt man beim Ablesen eines Sanger-Gels?', back: 'Bei der am weitesten gewanderten Bande (kürzestes Fragment); dann nach zunehmender Länge in 5\'→3\'-Richtung – das ergibt die komplementäre Sequenz.', src: [p(8)], prov: 'pdf' },
  ],

  questions: [
    // ---------------- pcr ----------------
    {
      id: 'pcr-q1', sub: 'pcr', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(6)],
      prompt: 'Auf welche Temperatur wird der Reaktionsansatz bei der Denaturierung erhitzt?',
      options: ['95 °C', '72 °C', '60 °C', '37 °C'],
      answer: 0,
      why: [{ text: 'Denaturierung 95 °C · Hybridisierung ca. 60 °C · Polymerisation 72 °C.', prov: 'pdf', src: [p(6)] }],
    },
    {
      id: 'pcr-q2', sub: 'pcr', type: 'order', level: 1, err: 'sequence', prov: 'pdf', src: [p(6)],
      prompt: 'Bringe die Schritte eines PCR-Zyklus in die richtige Reihenfolge.',
      items: ['Denaturierung (95 °C)', 'Hybridisierung (ca. 60 °C)', 'Polymerisation (72 °C)'],
      why: [{ text: 'Erst Stränge trennen, dann Primer anlagern, dann verlängern.', prov: 'pdf', src: [p(6)] }],
    },
    {
      id: 'pcr-q3', sub: 'pcr', type: 'match', level: 2, err: 'sequence', prov: 'pdf', src: [p(6)],
      prompt: 'Ordne jedem Schritt den passenden Vorgang zu.',
      pairs: [
        { left: 'Denaturierung', right: 'Wasserstoffbrücken lösen sich, Einzelstränge entstehen' },
        { left: 'Hybridisierung', right: 'Primer binden komplementär an die Einzelstränge' },
        { left: 'Polymerisation', right: 'Taq-Polymerase hängt Nucleotide an die Primer' },
      ],
      distractors: ['Helicase entwindet die DNA'],
      why: [{ text: 'Die Helicase kommt bei der PCR nicht vor – die Stränge werden durch Hitze getrennt.', prov: 'inf', src: [p(6)] }],
    },
    {
      id: 'pcr-q4', sub: 'pcr', type: 'multi', level: 1, err: 'facts', prov: 'pdf', src: [p(6)],
      prompt: 'Welche Komponenten braucht eine PCR laut deiner PDF?',
      options: ['die zu vervielfältigende DNA', 'eine hitzestabile DNA-Polymerase', 'ein Gemisch der vier DNA-Nucleotide', 'zwei künstlich hergestellte Primer', 'Helicase', 'RNA-Polymerase'],
      answers: [0, 1, 2, 3],
      why: [{ text: 'DNA, hitzestabile Polymerase, vier Nucleotide, zwei Primer – und ein Thermocycler für die Temperaturen.', prov: 'pdf', src: [p(6)] }],
    },
    {
      id: 'pcr-q5', sub: 'pcr', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(6)],
      prompt: 'Warum wird die DNA bei der PCR auf 95 °C erhitzt?',
      options: [
        'Damit sich die Wasserstoffbrücken lösen und die DNA in Einzelstränge getrennt wird.',
        'Damit die Primer an die DNA binden können.',
        'Weil die Taq-Polymerase bei 95 °C am besten arbeitet.',
        'Um Bakterien im Ansatz abzutöten.',
      ],
      answer: 0,
      feedback: { 1: 'Die Primer binden erst beim Abkühlen auf ca. 60 °C (Hybridisierung).', 2: 'Das Temperaturoptimum der Taq-Polymerase liegt bei 72 °C.' },
      why: [{ text: 'Denaturierung: Bei 95 °C werden die Wasserstoffbrücken getrennt – erst dann können die Primer an Einzelstränge binden.', prov: 'pdf', src: [p(6)] }],
    },
    {
      id: 'pcr-q6', sub: 'pcr', type: 'single', level: 2, err: 'enzyme', prov: 'pdf', src: [p(6)],
      prompt: 'Warum wird bei der PCR die Taq-Polymerase verwendet?',
      options: [
        'Sie ist besonders hitzestabil und hat ihr Temperaturoptimum bei 72 °C.',
        'Sie kann Primer selbst herstellen.',
        'Sie kopiert RNA direkt in DNA.',
        'Sie trennt die DNA-Stränge ohne Hitze.',
      ],
      answer: 0,
      why: [
        { text: 'Die Taq-Polymerase stammt aus Thermus aquaticus, einem Bakterium aus heißen Quellen, und ist besonders hitzestabil.', prov: 'pdf', src: [p(6)] },
        { text: 'Damit übersteht sie die wiederholten Heizschritte auf 95 °C.', prov: 'inf' },
      ],
    },
    {
      id: 'pcr-q7', sub: 'pcr', type: 'input', level: 3, err: 'mechanism', prov: 'inf', src: [p(6)], mode: 'number', tol: 0,
      prompt: 'Du startest mit **einem** DNA-Doppelstrang. Wie viele Doppelstränge des Abschnitts liegen im Idealfall nach **10 Zyklen** vor?',
      accept: ['1024'],
      unit: 'Doppelstränge',
      solution: 'Jeder Zyklus verdoppelt: 2¹⁰ = 1024',
      why: [
        { text: 'Mit jedem Zyklus verdoppelt sich die DNA-Menge.', prov: 'pdf', src: [p(6)] },
        { text: 'Nach n Zyklen: 2ⁿ Kopien. 2¹⁰ = 1024. Nach 25–35 Zyklen sind es Millionen bis Milliarden.', prov: 'inf' },
      ],
    },
    {
      id: 'pcr-q8', sub: 'pcr', type: 'tf', level: 1, err: 'enzyme', prov: 'pdf', src: [p(6)],
      prompt: 'Die Primer bei der PCR werden während der Reaktion von der Primase gebildet.',
      answer: false,
      correction: 'Die beiden Primer werden künstlich hergestellt und dem Ansatz zugegeben.',
      why: [{ text: 'PCR-Primer: künstlich hergestellt, 15–25 Nucleotide, komplementär zu Anfang und Ende des Abschnitts.', prov: 'pdf', src: [p(6)] }],
    },
    {
      id: 'pcr-q9', sub: 'pcr', type: 'cloze', level: 1, err: 'facts', prov: 'pdf', src: [p(6)],
      prompt: 'Ergänze die Lücken zu den PCR-Primern.',
      text: 'Die Primer sind {{0}} bis {{1}} Nucleotide lang. Ihre Basensequenzen sind komplementär zu {{2}} des zu vervielfältigenden DNA-Abschnitts.',
      gaps: [
        { accept: ['15'], options: ['5', '15', '25', '150'] },
        { accept: ['25'], options: ['15', '25', '100', '250'] },
        { accept: ['Anfang und Ende'], options: ['Anfang und Ende', 'der Mitte', 'den Introns', 'dem Promotor'] },
      ],
      why: [{ text: 'So legen die beiden Primer fest, welcher Abschnitt vervielfältigt wird.', prov: 'pdf', src: [p(6)] }],
    },
    {
      id: 'pcr-q10', sub: 'pcr', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(6)],
      prompt: 'Welche Aufgabe hat SYBR Green bei der Real-Time-PCR?',
      options: [
        'Es lagert sich nur in DNA-Doppelstränge ein und fluoresziert – die Fluoreszenz zeigt die DNA-Menge an.',
        'Es färbt die Primer, damit man sie im Gel sieht.',
        'Es ersetzt die Taq-Polymerase.',
        'Es verhindert, dass sich die Stränge wieder verbinden.',
      ],
      answer: 0,
      why: [{ text: 'Die Intensität der Fluoreszenz ist proportional zur gebildeten DNA-Menge – so lässt sich die Vervielfältigung in Echtzeit beobachten und quantifizieren.', prov: 'pdf', src: [p(6)] }],
    },
    {
      id: 'pcr-q11', sub: 'pcr', type: 'single', level: 3, err: 'mechanism', prov: 'inf', src: [p(6)],
      prompt: 'Warum wird die Influenza-RNA vor der PCR zuerst in doppelsträngige DNA umgeschrieben?',
      options: [
        'Weil die PCR mit einer DNA-Polymerase DNA vervielfältigt – sie braucht DNA als Vorlage.',
        'Weil RNA bei 95 °C nicht schmilzt.',
        'Weil RNA keine Basen enthält.',
        'Weil die Primer aus Protein bestehen.',
      ],
      answer: 0,
      why: [
        { text: 'Deine PDF beschreibt: Virus-RNA wird von bestimmten Enzymen in doppelsträngige DNA umgeschrieben, die dann per PCR vervielfältigt wird.', prov: 'pdf', src: [p(6)] },
        { text: 'Die Begründung folgt aus dem PCR-Prinzip: Die Taq-DNA-Polymerase baut DNA-Nucleotide komplementär an einen DNA-Einzelstrang.', prov: 'inf' },
      ],
    },
    {
      id: 'pcr-q12', sub: 'pcr', type: 'single', level: 3, err: 'mechanism', prov: 'pdf', src: [p(6)],
      prompt: 'Warum beweist eine erfolgreiche PCR mit Influenza-spezifischen Primern, dass Virus-RNA in der Probe war?',
      options: [
        'Die Primer binden spezifisch an Abschnitte der Virus-DNA – ohne diese Vorlage findet keine Vervielfältigung statt.',
        'Die PCR vervielfältigt jede beliebige DNA in der Probe gleich stark.',
        'Viren fluoreszieren bei 72 °C.',
        'Die Taq-Polymerase erkennt Viren.',
      ],
      answer: 0,
      why: [{ text: 'Laut PDF binden die Primer spezifisch an Abschnitte der vervielfältigten DNA-Moleküle. Findet die PCR statt, war die Virus-RNA vorhanden.', prov: 'pdf', src: [p(6)] }],
    },
    {
      id: 'pcr-q13', sub: 'pcr', type: 'free', level: 2, err: 'sequence', prov: 'pdf', src: [p(6)], operator: 'Beschreiben',
      prompt: 'Beschreibe die drei Schritte eines PCR-Zyklus mit Temperaturen und dem Ergebnis des Zyklus.',
      rubric: [
        { id: 'denat', label: 'Denaturierung bei 95 °C: Wasserstoffbrücken lösen sich, Einzelstränge', any: [['95|denatur', 'einzelstr|trenn|wasserstoff|loes']], weight: 1 },
        { id: 'hybrid', label: 'Hybridisierung bei ca. 60 °C: Primer binden komplementär', any: [['60|hybridis|abkuehl', 'primer']], weight: 1 },
        { id: 'polym', label: 'Polymerisation bei 72 °C: Taq-Polymerase hängt Nucleotide an die Primer', any: [['72|polymeris', 'polymerase|nucleotid|nukleotid']], weight: 1 },
        { id: 'verdopplung', label: 'Ergebnis: Die DNA-Menge verdoppelt sich pro Zyklus', any: [['verdoppel|doppelt|zwei kopien|2 kopien']], weight: 1 },
      ],
      model: 'Bei der Denaturierung wird der Ansatz auf 95 °C erhitzt: Die Wasserstoffbrücken lösen sich und die DNA liegt in Einzelsträngen vor. Bei der Hybridisierung kühlt der Thermocycler auf etwa 60 °C ab; die beiden Primer binden komplementär an je einen Einzelstrang. Bei der Polymerisation (72 °C) bindet die Taq-Polymerase komplementär freie Nucleotide an die Primer, sodass zu beiden Einzelsträngen ein neuer Strang entsteht. Am Ende des Zyklus liegt die Ausgangs-DNA verdoppelt vor.',
      why: [{ text: 'Die Temperaturen sind so gewählt, dass jeder Schritt unter optimalen Bedingungen abläuft.', prov: 'inf', src: [p(6)] }],
    },
    {
      id: 'pcr-q14', sub: 'pcr', type: 'free', level: 3, err: 'comparison', prov: 'inf', src: [p(5), p(6)], operator: 'Vergleichen', compare: true,
      prompt: 'Vergleiche die PCR mit der natürlichen DNA-Replikation hinsichtlich Strangtrennung, Primer, Polymerase und kopiertem Bereich.',
      rubric: [
        { id: 'trennung', group: 'Strangtrennung', label: 'Replikation: Helicase; PCR: Erhitzen auf 95 °C', any: [['helicase', '95|hitze|erhitz|temperatur']], weight: 1 },
        { id: 'primer', group: 'Primer', label: 'Replikation: Primase bildet Primer; PCR: künstlich hergestellte Primer', any: [['primase|kuenstlich|synthetisch|zugegeben|hergestellt']], weight: 1 },
        { id: 'polymerase', group: 'Polymerase', label: 'PCR nutzt die hitzestabile Taq-Polymerase', any: [['taq|hitzestabil']], weight: 1 },
        { id: 'bereich', group: 'Kopierter Bereich', label: 'Replikation: gesamte DNA; PCR: nur der Abschnitt zwischen den Primern', any: [['gesamt|ganze|komplett', 'abschnitt|zwischen|bestimmt']], weight: 1 },
        { id: 'gemeinsam', group: 'Gemeinsamkeit', label: 'Gemeinsam: komplementäre Neusynthese an Einzelsträngen mit Primer und Polymerase', any: [['beide|gemeinsam|gleich|aehnlich|jeweils']], weight: 0.5 },
      ],
      model: 'Beide Verfahren bilden an getrennten Einzelsträngen komplementäre neue Stränge; dazu brauchen sie Primer und eine DNA-Polymerase. Unterschiede: Bei der Replikation trennt die Helicase die Stränge, bei der PCR geschieht das durch Erhitzen auf 95 °C. In der Zelle bildet die Primase die Primer, bei der PCR werden zwei künstlich hergestellte Primer zugegeben. Die PCR nutzt die hitzestabile Taq-Polymerase (72 °C). Die Replikation kopiert die gesamte DNA vor der Zellteilung, die PCR nur den Abschnitt zwischen den beiden Primern – dafür in vielen Zyklen.',
      why: [{ text: 'Deine PDF sagt: Die PCR gleicht in ihrem Ablauf der natürlichen Replikation. Die einzelnen Unterschiede ergeben sich aus dem Vergleich von PDF S. 5 und S. 6.', prov: 'inf', src: [p(5), p(6)] }],
    },
    {
      id: 'pcr-q15', sub: 'pcr', type: 'free', level: 4, err: 'mechanism', prov: 'inf', src: [p(6)], operator: 'Erklären',
      prompt: 'In einem PCR-Ansatz wurde versehentlich eine gewöhnliche, **nicht hitzestabile** DNA-Polymerase verwendet. Erkläre, was mit der Vervielfältigung passiert.',
      rubric: [
        { id: 'zerstoert', label: 'Bei 95 °C (Denaturierung) wird die Polymerase zerstört / funktionsunfähig', any: [['95|denatur|hitze|erhitz', 'zerstoer|kaputt|inaktiv|funktion|denaturiert|nicht mehr']], weight: 1.5 },
        { id: 'keine', label: 'Es findet keine (bzw. kaum) Polymerisation und Vervielfältigung mehr statt', any: [['kein|nicht|kaum|nur', 'vervielfaeltig|polymeris|kopie|verdoppel|verlaenger']], weight: 1.5 },
        { id: 'taq', label: 'Deshalb nutzt man die hitzestabile Taq-Polymerase', any: [['taq|hitzestabil|thermus']], weight: 0.5 },
      ],
      model: 'Im ersten Denaturierungsschritt wird der Ansatz auf 95 °C erhitzt. Eine gewöhnliche Polymerase übersteht diese Temperatur nicht, sie wird denaturiert und verliert ihre Funktion. Danach bindet kein Enzym mehr Nucleotide an die Primer – es findet (fast) keine Vervielfältigung statt. Genau deshalb verwendet man die besonders hitzestabile Taq-Polymerase aus Thermus aquaticus.',
      why: [
        { text: 'Deine PDF betont die Hitzestabilität der Taq-Polymerase (Temperaturoptimum 72 °C).', prov: 'pdf', src: [p(6)] },
        { text: 'Dass die meisten Enzyme bei hohen Temperaturen denaturieren und ihre Funktion verlieren, steht nicht in deiner PDF.', prov: 'ext', ext: ENZYM_EXT },
      ],
    },
    {
      id: 'pcr-q16', sub: 'pcr', type: 'free', level: 4, err: 'mechanism', prov: 'inf', src: [p(6)], operator: 'Erklären',
      prompt: 'Erkläre, warum bei der PCR nach 25 bis 35 Zyklen Millionen Kopien des DNA-Abschnitts vorliegen.',
      rubric: [
        { id: 'verdopplung', label: 'Pro Zyklus verdoppelt sich die DNA-Menge', any: [['verdoppel|doppelt|2 ?x|zweifach']], weight: 1.5 },
        { id: 'vorlage', label: 'Die neu gebildeten Stränge dienen im nächsten Zyklus selbst als Vorlage', any: [['vorlage|matrize|naechsten zyklus|wieder']], weight: 1 },
        { id: 'exponentiell', label: 'Exponentielles Wachstum: 2ⁿ Kopien nach n Zyklen', any: [['2 ?\\^|2n|2 hoch|exponentiell|hoch']], weight: 1 },
      ],
      model: 'In jedem Zyklus werden alle vorhandenen Doppelstränge getrennt und zu jedem Einzelstrang ein neuer Strang gebildet – die Menge verdoppelt sich. Die neuen Stränge dienen im nächsten Zyklus selbst wieder als Vorlage. Aus einem Molekül entstehen so nach n Zyklen 2ⁿ Kopien, also exponentielles Wachstum: Nach 25 Zyklen sind es bereits über 30 Millionen.',
      why: [
        { text: 'PDF: „Mit jedem Zyklus verdoppelt sich die DNA-Menge, die dann für den folgenden Zyklus zur Verfügung steht.“', prov: 'pdf', src: [p(6)] },
        { text: 'Rechnung: 2²⁵ ≈ 33,5 Millionen.', prov: 'inf' },
      ],
    },
    // ---------------- gelelektrophorese ----------------
    {
      id: 'gel-q1', sub: 'gelelektrophorese', type: 'single', level: 1, err: 'mechanism', prov: 'pdf', src: [p(7)],
      prompt: 'Wohin wandern DNA-Fragmente bei der Gelelektrophorese – und warum?',
      options: [
        'Zur Anode (Pluspol), weil sie wegen ihrer Phosphatgruppen negativ geladen sind.',
        'Zur Kathode (Minuspol), weil sie positiv geladen sind.',
        'Zur Anode, weil sie positiv geladen sind.',
        'Sie bleiben in der Geltasche liegen.',
      ],
      answer: 0,
      why: [{ text: 'DNA-Fragmente sind aufgrund ihrer Phosphatgruppen negativ geladen und wandern zur Anode.', prov: 'pdf', src: [p(7)] }],
    },
    {
      id: 'gel-q2', sub: 'gelelektrophorese', type: 'tf', level: 1, err: 'mechanism', prov: 'pdf', src: [p(7)],
      prompt: 'Längere DNA-Fragmente wandern schneller durch das Gel als kürzere.',
      answer: false,
      correction: 'Je kürzer die Fragmente, desto leichter durchdringen sie die Maschen und desto schneller wandern sie.',
      why: [{ text: 'Das Gel wirkt wie ein engmaschiges Netz (Molekularsieb).', prov: 'pdf', src: [p(7)] }],
    },
    {
      id: 'gel-q3', sub: 'gelelektrophorese', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(7)],
      prompt: 'Wozu dient der Molekülmassenstandard?',
      options: [
        'Seine Fragmente bekannter Größe bilden eine Vergleichsskala zur Größenbestimmung.',
        'Er färbt die DNA-Banden an.',
        'Er zeigt an, wann die Elektrophorese beendet ist.',
        'Er schneidet die DNA in Fragmente.',
      ],
      answer: 0,
      feedback: { 2: 'Das macht der mitlaufende Farbstoff.' },
      why: [{ text: 'Der Standard enthält DNA-Fragmente bekannter Größe; seine Laufstrecke liefert eine Vergleichsskala.', prov: 'pdf', src: [p(7)] }],
    },
    {
      id: 'gel-q4', sub: 'gelelektrophorese', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(7)],
      prompt: 'Warum lässt man bei der DNA-Elektrophorese einen Farbstoff mitlaufen?',
      options: [
        'DNA ist farblos – der Farbstoff zeigt den Fortschritt; erreicht er den unteren Rand, wird beendet.',
        'Der Farbstoff lädt die DNA negativ auf.',
        'Der Farbstoff macht die Banden unter UV-Licht sichtbar.',
        'Er dient als Molekülmassenstandard.',
      ],
      answer: 0,
      feedback: { 2: 'Sichtbar gemacht werden die Banden mit Nachweisreagenzien (meist fluoreszierend) – nicht mit dem Laufmittel-Farbstoff.' },
      why: [{ text: 'Da die DNA-Fragmente farblos sind, lässt man einen Farbstoff mitlaufen, um das Fortschreiten zu verfolgen.', prov: 'pdf', src: [p(7)] }],
    },
    {
      id: 'gel-q5', sub: 'gelelektrophorese', type: 'multi', level: 2, err: 'mechanism', prov: 'pdf', src: [p(7)],
      prompt: 'Welche Aussagen zu SDS treffen zu?',
      options: [
        'SDS überdeckt die Eigenladung der Polypeptidketten.',
        'SDS bindet in einem genauen Verhältnis an die Polypeptidketten.',
        'Danach wandern alle Polypeptide zur Anode.',
        'SDS schneidet Proteine in gleich große Stücke.',
      ],
      answers: [0, 1, 2],
      why: [{ text: 'SDS ist ein Anion, das die Eigenladung überdeckt – die Wanderung hängt dann nur noch von der Größe ab.', prov: 'pdf', src: [p(7)] }],
    },
    {
      id: 'gel-q6', sub: 'gelelektrophorese', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(7)],
      prompt: 'Warum müssen Proteine vor der Gelelektrophorese denaturiert und mit SDS beladen werden?',
      options: [
        'Proteine sind je nach Aminosäuren unterschiedlich geladen und würden sonst unterschiedlich schnell oder in verschiedene Richtungen wandern.',
        'Proteine sind zu klein für das Gel.',
        'Ohne SDS würden Proteine nicht in die Taschen passen.',
        'SDS macht Proteine unter UV-Licht sichtbar.',
      ],
      answer: 0,
      why: [{ text: 'Erst wenn die Eigenladung überdeckt ist, trennt das Gel die Proteine nur nach ihrer Größe.', prov: 'pdf', src: [p(7)] }],
    },
    {
      id: 'gel-q7', sub: 'gelelektrophorese', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(7)],
      prompt: 'Bringe die Schritte einer DNA-Gelelektrophorese in eine sinnvolle Reihenfolge.',
      items: [
        'Proben und Molekülmassenstandard in die Geltaschen geben',
        'Elektrisches Feld anlegen – die DNA wandert zur Anode',
        'Kürzere Fragmente wandern schneller durch das Gel',
        'Farbstoff erreicht den unteren Gelrand – Elektrophorese beenden',
        'Banden mit Nachweisreagenz behandeln und unter UV sichtbar machen',
        'Größen mit dem Molekülmassenstandard vergleichen',
      ],
      why: [{ text: 'Die Einzelschritte stehen in deiner PDF; die Reihenfolge ergibt sich aus dem Verfahren.', prov: 'inf', src: [p(7)] }],
    },
    {
      id: 'gel-q8', sub: 'gelelektrophorese', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(7, 'Material A')], figure: { widget: 'gel-fvl' },
      prompt: 'Person A zeigt im Faktor-V-Leiden-Test Banden bei 163, 67 und 37 bp. Welcher Genotyp liegt vor?',
      options: ['keine Mutation (beide Allele unverändert)', 'heterozygot für die Mutation', 'homozygot für die Mutation', 'nicht bestimmbar'],
      answer: 0,
      why: [
        { text: 'Laut PDF schneidet das Enzym das 267-bp-Fragment an zwei Stellen → 67, 37 und 163 bp. Bei der Mutation fehlt eine Schnittstelle.', prov: 'pdf', src: [p(7, 'Material A')] },
        { text: 'Nur die drei „normalen“ Fragmente → beide Allele haben beide Schnittstellen.', prov: 'inf' },
      ],
    },
    {
      id: 'gel-q9', sub: 'gelelektrophorese', type: 'match', level: 4, err: 'experiment', prov: 'inf', src: [p(7, 'Material A')], figure: { widget: 'gel-fvl' },
      prompt: 'Ordne den Personen aus dem Faktor-V-Leiden-Gel ihren Genotyp zu.',
      pairs: [
        { left: 'Person A (163, 67, 37 bp)', right: 'keine Mutation' },
        { left: 'Person B (200, 163, 67, 37 bp)', right: 'heterozygot' },
        { left: 'Person C (200, 67 bp)', right: 'homozygot mutiert' },
      ],
      why: [
        { text: 'Mutiertes Allel: Die Schnittstelle zwischen dem 37- und dem 163-bp-Stück fehlt → ein 200-bp-Fragment (37 + 163) statt zweier Stücke.', prov: 'inf' },
        { text: 'B trägt beide Muster (ein normales und ein mutiertes Allel), C nur das mutierte.', prov: 'inf' },
      ],
    },
    {
      id: 'gel-q10', sub: 'gelelektrophorese', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(7, 'Material A')],
      prompt: 'Bei der Faktor-V-Leiden-Mutation tritt statt der Banden 163 bp und 37 bp eine Bande bei 200 bp auf. Welche Schnittstelle fehlt?',
      options: [
        'die Schnittstelle zwischen dem 37-bp- und dem 163-bp-Abschnitt',
        'die Schnittstelle zwischen dem 67-bp- und dem 37-bp-Abschnitt',
        'beide Schnittstellen',
        'keine – das Fragment ist durch eine Insertion länger geworden',
      ],
      answer: 0,
      why: [{ text: '37 + 163 = 200. Fehlt die Schnittstelle zwischen diesen beiden Abschnitten, bleiben sie als ein 200-bp-Stück verbunden; das 67-bp-Stück wird weiterhin abgeschnitten.', prov: 'inf' }],
    },
    {
      id: 'gel-q11', sub: 'gelelektrophorese', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(7, 'Material A')], operator: 'Begründen',
      prompt: 'Begründe, warum man beim Faktor-V-Leiden-Test von einem **indirekten** Mutationsnachweis spricht.',
      rubric: [
        { id: 'nicht-direkt', label: 'Die veränderte Basensequenz selbst wird nicht direkt bestimmt (nicht sequenziert)', any: [['nicht (direkt|selbst)|nicht die mutation|keine sequenz|nicht sequenz|basenfolge wird nicht']], weight: 1.5 },
        { id: 'schnitt', label: 'Nachgewiesen wird, dass eine Schnittstelle des Enzyms fehlt', any: [['schnittstelle|schneid|restriktion']], weight: 1 },
        { id: 'banden', label: 'Das zeigt sich an veränderten Fragmentlängen / einem anderen Bandenmuster', any: [['bande|fragment|laenge|muster']], weight: 1 },
        { id: 'rueckschluss', label: 'Aus dem Muster wird auf die Mutation zurückgeschlossen', any: [['rueckschluss|schliess|folger|deut|hinweis|zeigt']], weight: 0.5 },
      ],
      model: 'Die Mutation – also die veränderte Basensequenz – wird nicht direkt sichtbar gemacht oder sequenziert. Man nutzt aus, dass durch die Mutation eine Schnittstelle des Enzyms verloren geht. Das PCR-Fragment wird geschnitten und die Fragmente per Gelelektrophorese getrennt; die veränderten Fragmentlängen (200 bp statt 163 + 37 bp) ergeben ein anderes Bandenmuster. Aus diesem Muster schließt man indirekt auf das Vorliegen der Mutation.',
      why: [{ text: 'Die Aufgabe stammt aus Material A deiner PDF (Aufgabe 2); die Musterlösung ist abgeleitet.', prov: 'inf', src: [p(7, 'Material A')] }],
    },
    {
      id: 'gel-q12', sub: 'gelelektrophorese', type: 'free', level: 2, err: 'mechanism', prov: 'pdf', src: [p(7)], operator: 'Erklären',
      prompt: 'Erkläre, warum DNA-Fragmente bei der Gelelektrophorese nach ihrer Größe getrennt werden.',
      rubric: [
        { id: 'ladung', label: 'DNA ist wegen der Phosphatgruppen negativ geladen und wandert zur Anode', any: [['negativ|phosphat', 'anode|plus|wander']], weight: 1 },
        { id: 'netz', label: 'Das Gel wirkt wie ein engmaschiges Netz (Molekularsieb)', any: [['netz|masche|sieb|behinder']], weight: 1 },
        { id: 'kurz', label: 'Kurze Fragmente durchdringen die Maschen leichter und wandern schneller', any: [['kurz|klein', 'schnell|weiter|leichter']], weight: 1.5 },
      ],
      model: 'DNA-Fragmente sind wegen ihrer Phosphatgruppen negativ geladen und wandern im elektrischen Feld zur Anode. Das Gel wirkt dabei wie ein engmaschiges Netz, das die Moleküle behindert. Kurze Fragmente durchdringen die Maschen leichter und wandern deshalb schneller und weiter als lange. So werden die Fragmente nach ihrer Größe getrennt.',
      why: [{ text: 'Weil alle DNA-Fragmente gleichartig negativ geladen sind, entscheidet vor allem die Größe über die Laufstrecke.', prov: 'inf', src: [p(7)] }],
    },
    {
      id: 'gel-q13', sub: 'gelelektrophorese', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(7, 'Material A')], figure: { widget: 'gel-fvl' },
      prompt: 'In der Kontrollspur des Faktor-V-Leiden-Gels liegt eine einzelne Bande oberhalb von 200 bp. Was zeigt sie am wahrscheinlichsten?',
      options: ['das ungeschnittene 267-bp-PCR-Fragment', 'ein 37-bp-Fragment', 'reinen Farbstoff', 'das Restriktionsenzym'],
      answer: 0,
      why: [{ text: 'Deine PDF erklärt die Kontrolle nicht. Naheliegend: Das ungeschnittene 267-bp-Fragment läuft als größtes am kürzesten – oberhalb der 200-bp-Bande.', prov: 'inf', src: [p(7, 'Material A')] }],
    },
    // ---------------- sequenzierung ----------------
    {
      id: 'seq-q1', sub: 'sequenzierung', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(8)],
      prompt: 'Was fehlt einem Abbruchnucleotid (ddNTP)?',
      options: ['die Hydroxygruppe am dritten C-Atom der Desoxyribose', 'die Phosphatgruppe', 'die Base', 'der Zucker'],
      answer: 0,
      why: [{ text: 'Abbruchnucleotiden fehlt am dritten C-Atom der Desoxyribose die Hydroxygruppe.', prov: 'pdf', src: [p(8)] }],
    },
    {
      id: 'seq-q2', sub: 'sequenzierung', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(8)],
      prompt: 'Warum bricht die Synthese ab, sobald ein Abbruchnucleotid eingebaut ist?',
      options: [
        'Ohne Hydroxygruppe am 3. C-Atom kann kein weiteres Nucleotid angefügt werden.',
        'Das Abbruchnucleotid zerstört die DNA-Polymerase.',
        'Das Abbruchnucleotid ist radioaktiv.',
        'Es bindet an den Primer und löst ihn ab.',
      ],
      answer: 0,
      why: [
        { text: 'Die Kette wird am 3\'-Ende verlängert (PDF S. 5). Fehlt dort die OH-Gruppe, kann kein Nucleotid mehr angehängt werden.', prov: 'pdf', src: [p(8), p(5)] },
      ],
    },
    {
      id: 'seq-q3', sub: 'sequenzierung', type: 'multi', level: 1, err: 'facts', prov: 'pdf', src: [p(8)],
      prompt: 'Was enthält jeder der vier Reaktionsansätze der Sanger-Methode?',
      options: [
        'viele identische Kopiervorlagen des Einzelstrangs',
        'eine DNA-Polymerase',
        'die vier Nucleotide dATP, dGTP, dCTP und dTTP',
        'einen radioaktiv markierten Primer',
        'ein Abbruchnucleotid in geringer Konzentration',
        'alle vier Abbruchnucleotide in hoher Konzentration',
      ],
      answers: [0, 1, 2, 3, 4],
      why: [{ text: 'Jeder Ansatz enthält genau ein Abbruchnucleotid – in geringer Konzentration.', prov: 'pdf', src: [p(8)] }],
    },
    {
      id: 'seq-q4', sub: 'sequenzierung', type: 'single', level: 3, err: 'mechanism', prov: 'inf', src: [p(8)],
      prompt: 'Warum wird das Abbruchnucleotid nur in **geringer** Konzentration zugegeben?',
      options: [
        'Damit der Abbruch zufällig an unterschiedlichen Stellen erfolgt und Fragmente aller Längen entstehen.',
        'Weil Abbruchnucleotide sehr teuer sind.',
        'Damit die Polymerase schneller arbeitet.',
        'Damit gar kein Abbruch stattfindet.',
      ],
      answer: 0,
      why: [
        { text: 'PDF: Die Synthese läuft, bis zufällig ein Abbruchnucleotid eingebaut wird – so entstehen unterschiedlich lange Fragmente.', prov: 'pdf', src: [p(8)] },
        { text: 'Bei hoher Konzentration würde die Synthese fast immer schon an der ersten passenden Stelle abbrechen; lange Fragmente fehlten.', prov: 'inf' },
      ],
    },
    {
      id: 'seq-q5', sub: 'sequenzierung', type: 'single', level: 2, err: 'direction', prov: 'pdf', src: [p(8)],
      prompt: 'Mit welcher Bande beginnt man beim Ablesen eines Sanger-Gels?',
      options: ['mit der am weitesten gewanderten Bande (kürzestes Fragment)', 'mit der obersten Bande (längstes Fragment)', 'mit der Bande in der A-Spur', 'mit der dicksten Bande'],
      answer: 0,
      why: [{ text: 'Man liest nach zunehmender Länge in 5\'→3\'-Richtung und erhält die komplementäre Sequenz des analysierten Strangs.', prov: 'pdf', src: [p(8)] }],
    },
    {
      id: 'seq-q6', sub: 'sequenzierung', type: 'input', level: 3, err: 'direction', prov: 'inf', src: [p(8, 'Abb. 3')], mode: 'seq', figure: { widget: 'sanger' },
      prompt: 'Das Gel aus der Abbildung zeigt – von der am weitesten gewanderten Bande nach oben – Banden in den Spuren A, G, C, T, A, G, C. Gib die Sequenz des **neu synthetisierten** Strangs nach dem Primer in 5\'→3\'-Richtung an.',
      accept: ['AGCTAGC'],
      placeholder: "5'-…-3'",
      solution: "5'-(CTA)AGCTAGC-3' – nach dem Primer CTA folgen AGCTAGC",
      why: [
        { text: 'Kürzestes Fragment endet mit A (ddATP), das nächste mit G usw. Die Abbruchfragmente in deiner PDF: CTAA, CTAAG, CTAAGC, CTAAGCT, CTAAGCTA, CTAAGCTAG, CTAAGCTAGC.', prov: 'pdf', src: [p(8, 'Abb. 3')] },
      ],
    },
    {
      id: 'seq-q7', sub: 'sequenzierung', type: 'tf', level: 1, err: 'comparison', prov: 'pdf', src: [p(8, 'Material A')],
      prompt: 'Bei der Fluoreszenzsequenzierung laufen – wie bei Sanger – vier getrennte Reaktionsansätze.',
      answer: false,
      correction: 'Weil jedes Abbruchnucleotid eine andere Farbe trägt, genügt ein einziger Ansatz.',
      why: [{ text: 'Die Sequenzierungsreaktion wird nur in einem Ansatz durchgeführt.', prov: 'pdf', src: [p(8)] }],
    },
    {
      id: 'seq-q8', sub: 'sequenzierung', type: 'free', level: 3, err: 'comparison', prov: 'pdf', src: [p(8)], operator: 'Vergleichen', compare: true,
      prompt: 'Vergleiche die Kettenabbruchmethode nach Sanger mit der Fluoreszenzsequenzierung.',
      rubric: [
        { id: 'markierung', group: 'Markierung', label: 'Sanger: radioaktiv markierter Primer; Fluoreszenz: vier verschiedenfarbig fluoreszierende Abbruchnucleotide', any: [['radioaktiv', 'fluoresz|farb']], weight: 1.5 },
        { id: 'ansaetze', group: 'Ansätze', label: 'Sanger: vier Ansätze; Fluoreszenz: ein Ansatz', any: [['vier|4', 'ein(em|en)? ansatz|einem|1 ansatz|einzigen']], weight: 1 },
        { id: 'trennung', group: 'Trennung', label: 'Sanger: Gel mit vier Spuren; Fluoreszenz: Kapillarelektrophorese', any: [['kapillar']], weight: 1 },
        { id: 'nachweis', group: 'Auswertung', label: 'Sanger: Autoradiografie/Fotoplatte; Fluoreszenz: Detektor → Kurvendiagramm', any: [['autoradio|fotoplatte|film', 'detektor|kurve|diagramm']], weight: 1 },
        { id: 'gemeinsam', group: 'Gemeinsamkeit', label: 'Gemeinsam: Kettenabbruch durch Abbruchnucleotide, Trennung nach Größe', any: [['abbruch|ddntp|kettenabbruch']], weight: 0.5 },
      ],
      model: 'Beide Methoden beruhen auf dem Kettenabbruch durch Abbruchnucleotide und der Trennung der Fragmente nach ihrer Größe. Bei Sanger ist der Primer radioaktiv markiert; es laufen vier Ansätze mit je einem Abbruchnucleotid, die in vier Gelspuren getrennt und per Autoradiografie sichtbar gemacht werden. Bei der Fluoreszenzsequenzierung trägt jedes der vier Abbruchnucleotide einen eigenen Fluoreszenzfarbstoff, daher genügt ein Ansatz. Getrennt wird in einer Kapillarelektrophorese; ein Detektor erfasst die Farben und erstellt ein Kurvendiagramm.',
      why: [{ text: 'Aufgabe 2 aus Material A deiner PDF.', prov: 'pdf', src: [p(8, 'Material A')] }],
    },
    {
      id: 'seq-q9', sub: 'sequenzierung', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(8)],
      prompt: 'Bringe die Schritte der Kettenabbruchmethode in die richtige Reihenfolge.',
      items: [
        'DNA-Strang durch Hitze denaturieren',
        'Auf vier Ansätze mit je einem Abbruchnucleotid verteilen',
        'Synthese bis zum zufälligen Kettenabbruch',
        'Erneut denaturieren und in vier Spuren elektrophoretisch trennen',
        'Autoradiografie: Bandenmuster auf der Fotoplatte',
        'Von der kürzesten Bande an ablesen',
      ],
      why: [{ text: 'Reihenfolge wie in deiner PDF beschrieben.', prov: 'pdf', src: [p(8)] }],
    },
    {
      id: 'seq-q10', sub: 'sequenzierung', type: 'input', level: 3, err: 'code', prov: 'inf', src: [p(8, 'Material A')], mode: 'seq',
      prompt: 'Der Detektor liest für den neu synthetisierten Strang `5\'-TACCGTCATAGGCCGT-3\'`. Wie lautet die **gesuchte** Sequenz (3\'→5\', direkt darunter geschrieben)?',
      accept: ['ATGGCAGTATCCGGCA'],
      placeholder: "3'-…-5'",
      solution: "3'-ATGGCAGTATCCGGCA-5'",
      why: [
        { text: 'Die abgelesene Sequenz ist komplementär zum untersuchten Strang (PDF S. 8). Die Abbildung in Material A zeigt genau dieses Beispiel.', prov: 'pdf', src: [p(8, 'Material A')] },
      ],
    },
    {
      id: 'seq-q11', sub: 'sequenzierung', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(8)],
      prompt: 'Welchen Vorteil haben Hochdurchsatzsequenzierungen?',
      options: ['Sie sind deutlich schneller und kostengünstiger; Millionen Fragmente werden parallel sequenziert.', 'Sie brauchen keine DNA.', 'Sie kommen ohne Polymerase aus.', 'Sie sind die älteste Methode.'],
      answer: 0,
      why: [{ text: 'Innerhalb kürzester Zeit können Millionen von DNA-Fragmenten parallel sequenziert werden.', prov: 'pdf', src: [p(8)] }],
    },
    {
      id: 'seq-q12', sub: 'sequenzierung', type: 'free', level: 2, err: 'sequence', prov: 'pdf', src: [p(8, 'Material A')], operator: 'Beschreiben',
      prompt: 'Beschreibe den Ablauf einer Fluoreszenzsequenzierung.',
      rubric: [
        { id: 'farben', label: 'Vier Abbruchnucleotide mit je einem anderen Fluoreszenzfarbstoff', any: [['fluoresz|farb', 'abbruch|ddntp|nucleotid|nukleotid']], weight: 1 },
        { id: 'ansatz', label: 'Reaktion in einem Ansatz, zufälliger Kettenabbruch → Fragmente unterschiedlicher Länge', any: [['ein(em)? ansatz|einem ansatz|abbruch|unterschiedlich lang']], weight: 1 },
        { id: 'kapillar', label: 'Trennung nach Größe per Kapillarelektrophorese', any: [['kapillar|groesse|elektrophorese']], weight: 1 },
        { id: 'detektor', label: 'Detektor registriert die Farben → Kurvendiagramm → Basensequenz', any: [['detektor|kurve|diagramm|laser']], weight: 1 },
      ],
      model: 'Statt eines radioaktiven Primers werden vier Abbruchnucleotide eingesetzt, die jeweils mit einem anderen Fluoreszenzfarbstoff markiert sind. Die Sequenzierungsreaktion läuft in einem einzigen Ansatz; die Synthese bricht zufällig ab, sodass Fragmente unterschiedlicher Länge entstehen, deren Ende farblich markiert ist. Die Fragmente werden in einer Kapillarelektrophorese nach ihrer Größe getrennt. Ein Fluoreszenzdetektor registriert die Farbe jedes vorbeiwandernden Fragments und wandelt sie in ein Kurvendiagramm um. Aus der Farbabfolge ergibt sich die Basensequenz.',
      why: [{ text: 'Aufgabe 1 aus Material A deiner PDF.', prov: 'pdf', src: [p(8, 'Material A')] }],
    },
  ],

  experiments: [
    {
      id: 'exp-influenza', sub: 'pcr', title: 'Influenza-Nachweis mit PCR', src: [p(6)], widget: 'pcr',
      steps: [
        { key: 'frage', text: 'Liegt eine echte Grippe (Influenza) vor oder nur eine Erkältung?', prov: 'pdf' },
        { key: 'material', text: 'Abstrich aus dem Nasen-Rachenraum; Enzyme zum Umschreiben von RNA in DNA; PCR-Komponenten mit Influenza-spezifischen Primern; Thermocycler.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Genetisches Material der Viren isolieren (einzelsträngige RNA) → in doppelsträngige DNA umschreiben → per PCR mit spezifischen Primern vervielfältigen.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Findet die PCR statt (Vervielfältigung nachweisbar), …', prov: 'pdf', predict: 'Was folgt aus einer erfolgreichen Vervielfältigung?' },
        { key: 'schluss', text: '… war Virus-RNA in den Schleimhautzellen vorhanden – die Person ist mit Influenza infiziert.', prov: 'pdf' },
        { key: 'methode', text: 'Warum PCR? Die gewonnene DNA-Menge ist für einen Nachweis zu gering; die PCR vervielfältigt gezielt den Abschnitt, an den die spezifischen Primer binden.', prov: 'pdf' },
      ],
      questionIds: ['pcr-q11', 'pcr-q12'],
    },
    {
      id: 'exp-fvl', sub: 'gelelektrophorese', title: 'Indirekter Mutationsnachweis: Faktor-V-Leiden', src: [p(7, 'Material A')], widget: 'gel-fvl',
      steps: [
        { key: 'frage', text: 'Tragen die Personen A, B und C die Faktor-V-Leiden-Mutation – und wenn ja, homo- oder heterozygot?', prov: 'pdf' },
        { key: 'material', text: 'DNA der Personen; PCR für das 267-bp-Fragment; ein Enzym, das an zwei bestimmten Stellen schneidet; Gelelektrophorese mit Kontrolle.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Fragment per PCR vervielfältigen → mit dem Enzym schneiden (normal: 67, 37, 163 bp) → Fragmente elektrophoretisch trennen.', prov: 'pdf' },
        { key: 'beobachtung', text: 'A: 163, 67, 37 bp · B: 200, 163, 67, 37 bp · C: 200, 67 bp (abgelesen aus dem Gel).', prov: 'inf', predict: 'Welche Bande entsteht, wenn die Schnittstelle zwischen dem 37- und dem 163-bp-Stück fehlt?' },
        { key: 'ergebnis', text: 'A: keine Mutation · B: heterozygot · C: homozygot mutiert.', prov: 'inf' },
        { key: 'methode', text: 'Indirekt: Nicht die Basenänderung selbst, sondern der Verlust einer Schnittstelle wird über das Bandenmuster nachgewiesen.', prov: 'inf' },
      ],
      questionIds: ['gel-q8', 'gel-q9', 'gel-q10', 'gel-q11', 'gel-q13'],
    },
  ],

  examTasks: [
    {
      id: 'kt-fvl',
      title: 'Gelauswertung: Faktor-V-Leiden',
      subs: ['gelelektrophorese', 'pcr'],
      basedOn: 'Übung nach Material A „Indirekter Mutationsnachweis“ aus deiner PDF (S. 7)',
      src: [p(7, 'Material A')],
      intro: 'Ein 267 bp langes DNA-Fragment, das die Faktor-V-Leiden-Mutation enthalten kann, wird per PCR vervielfältigt und von einem Enzym an zwei Stellen geschnitten (normal: 67 bp | 37 bp | 163 bp). Bei der Mutation fehlt eine der beiden Schnittstellen.',
      material: [{ kind: 'widget', widget: 'gel-fvl', caption: 'Gel nach Material A deiner PDF' }],
      parts: ['kt-fvl-1', 'kt-fvl-2', 'kt-fvl-3'],
    },
  ],
};

methoden.questions.push(
  {
    id: 'kt-fvl-1', sub: 'gelelektrophorese', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(7, 'Material A')], operator: 'Deuten',
    prompt: 'Deute das Ergebnis der Gelelektrophorese und gib die Genotypen der Personen A, B und C an.',
    rubric: [
      { id: 'a', label: 'A: nur 163/67/37 bp → keine Mutation (homozygot gesund)', any: [['\\ba\\b[^;\\n]{0,70}(keine mutation|gesund|nicht mutiert|unveraendert|homozygot (gesund|normal|nicht))']], weight: 1 },
      { id: 'b', label: 'B: zusätzlich 200 bp → heterozygot', any: [['\\bb\\b[^;\\n]{0,70}heterozygot']], weight: 1.5 },
      { id: 'c', label: 'C: nur 200 und 67 bp → homozygot für die Mutation', any: [['\\bc\\b[^;\\n]{0,70}homozygot']], weight: 1.5 },
      { id: 'grund', label: 'Begründung: Beim mutierten Allel fehlt eine Schnittstelle → 200-bp-Fragment (37 + 163)', any: [['200', 'schnittstelle|37|163|fehlt']], weight: 1 },
    ],
    model: 'Beim mutierten Allel fehlt die Schnittstelle zwischen dem 37- und dem 163-bp-Abschnitt, sodass ein 200-bp-Fragment (37 + 163) entsteht. Person A zeigt nur die Banden 163, 67 und 37 bp: Beide Allele sind unverändert, A hat keine Mutation. Person B zeigt 200, 163, 67 und 37 bp: Ein Allel ist normal, eines mutiert – B ist heterozygot. Person C zeigt nur 200 und 67 bp: Beide Allele sind mutiert – C ist homozygot für Faktor-V-Leiden.',
    why: [{ text: 'Die Bandenhöhen sind aus der Abbildung abgelesen; die Deutung ist abgeleitet (deine PDF enthält keine Lösung).', prov: 'inf', src: [p(7, 'Material A')] }],
  },
  {
    id: 'kt-fvl-2', sub: 'gelelektrophorese', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(7, 'Material A')], operator: 'Begründen',
    prompt: 'Begründe, warum man hier von einem indirekten Mutationsnachweis spricht.',
    rubric: [
      { id: 'nicht-direkt', label: 'Die Basenänderung selbst wird nicht direkt bestimmt', any: [['nicht (direkt|selbst)|nicht die mutation|nicht sequenz|keine sequenz']], weight: 1.5 },
      { id: 'schnitt', label: 'Nachweis über den Verlust einer Schnittstelle', any: [['schnittstelle|schneid']], weight: 1 },
      { id: 'muster', label: 'sichtbar als verändertes Bandenmuster / andere Fragmentlängen', any: [['bande|fragment|laenge|muster']], weight: 1 },
    ],
    model: 'Die veränderte Basenfolge wird nicht direkt ermittelt. Nachgewiesen wird nur eine Folge der Mutation: Eine Schnittstelle des Enzyms fehlt. Dadurch entstehen andere Fragmentlängen und ein anderes Bandenmuster – aus diesem schließt man auf die Mutation.',
    why: [{ text: 'Aufgabe 2 aus Material A deiner PDF, Lösung abgeleitet.', prov: 'inf', src: [p(7, 'Material A')] }],
  },
  {
    id: 'kt-fvl-3', sub: 'pcr', type: 'free', level: 3, err: 'mechanism', prov: 'inf', src: [p(6), p(7, 'Material A')], operator: 'Erklären',
    prompt: 'Erkläre, warum das 267-bp-Fragment vor dem Schneiden per PCR vervielfältigt wird.',
    rubric: [
      { id: 'menge', label: 'Die Menge der DNA aus der Probe ist für den Nachweis zu gering', any: [['menge|wenig|gering|zu klein|nicht genug']], weight: 1.5 },
      { id: 'sichtbar', label: 'Erst viele Kopien ergeben sichtbare Banden im Gel', any: [['bande|sichtbar|nachweis|gel']], weight: 1 },
      { id: 'gezielt', label: 'Die Primer vervielfältigen gezielt genau den Abschnitt mit der möglichen Mutation', any: [['primer|gezielt|bestimmt|abschnitt|spezifisch']], weight: 1 },
    ],
    model: 'Die DNA-Menge aus einer Probe ist für einen Nachweis zu gering. Die PCR vervielfältigt gezielt genau den 267-bp-Abschnitt, in dem die Mutation liegen kann – die Primer legen Anfang und Ende fest. Erst mit Millionen Kopien entstehen nach dem Schneiden Banden, die im Gel sichtbar sind.',
    why: [
      { text: 'PCR vervielfältigt einen bestimmten Abschnitt in Millionen Kopien, die mit weiteren Methoden analysiert werden können.', prov: 'pdf', src: [p(6)] },
      { text: 'Dass die Bandenstärke von der DNA-Menge abhängt, ist eine Schlussfolgerung.', prov: 'inf' },
    ],
  },
);
