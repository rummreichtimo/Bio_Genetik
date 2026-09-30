import type { ContentPack } from '../index';
import { p } from '../helpers';

/**
 * Kapitel 4 · Genregulation und Epigenetik (PDF S. 18–21, Buch S. 264–271)
 */
export const regulation: ContentPack = {
  lessons: [
    {
      sub: 'genregulation',
      intro: 'Gentechniker bauten Ende der 1990er-Jahre ein zusätzliches Farbstoff-Gen in violett blühende Petunien ein – die Blüten wurden heller, teils sogar weiß. Wie kann ein zusätzliches Gen die Expression unterdrücken?',
      sections: [
        {
          id: 'ebenen',
          title: 'Ebenen der Genregulation',
          blocks: [
            {
              kind: 'text',
              md: 'Mit der Genregulation reagieren Lebewesen schnell auf wechselnde Umweltbedingungen. Bei vielzelligen Eukaryoten steuert sie außerdem die Entwicklung verschiedener Zellen mit unterschiedlichen Funktionen: Spezielle Proteine müssen **zum richtigen Zeitpunkt** und **in der richtigen Menge** gebildet werden. Gene können an- oder abgeschaltet und unterschiedlich stark aktiviert werden.',
              src: [p(18)],
            },
            {
              kind: 'steps',
              title: 'Die Ebenen laut deiner PDF',
              steps: [
                { title: 'Chromatinebene', text: 'Modifikation von Histonen und DNA verändert die Chromatinstruktur.' },
                { title: 'Transkriptionsebene', text: 'Transkriptionsfaktoren regulieren die Aktivität der RNA-Polymerase.' },
                { title: 'RNA-Ebene', text: 'Alternatives Spleißen und RNA-Abbau (RNA-Interferenz).' },
                { title: 'Translationsebene', text: 'Anzahl aktiver Ribosomen an einer mRNA.' },
                { title: 'Polypeptidebene', text: 'Chemische Modifikation und Abbau im Proteasom.' },
              ],
              src: [p(18, 'Abb. 2'), p(19)],
            },
          ],
        },
        {
          id: 'chromatin',
          title: 'Regulation auf Chromatinebene',
          blocks: [
            {
              kind: 'text',
              md: 'Die DNA ist abschnittsweise um Histonproteine gewickelt (**Nucleosomen**), dazwischen liegt freie DNA. Chemische Modifikationen der Histone oder der DNA verändern die Chromatinstruktur – und damit die Genexpression.',
              src: [p(18)],
            },
            {
              kind: 'compare',
              columns: ['Wirkung auf das Chromatin', 'Transkription'],
              rows: [
                { label: 'Acetylgruppen (–COCH₃) an Histone', cells: ['Anziehung Histon–DNA sinkt, Chromatin lockert sich', 'möglich'] },
                { label: 'Acetylgruppen abgespalten', cells: ['Chromatin wieder dichter', 'verhindert'] },
                { label: 'Methylgruppen (–CH₃) an Histone', cells: ['Chromatinbereiche verdichtet', 'verhindert'] },
                { label: 'DNA-Methylierung (CH₃ an Cytosin)', cells: ['Chromatin verdichtet', 'unterbleibt'] },
                { label: 'Methylgruppen der DNA entfernt', cells: ['Chromatin lockert sich', 'möglich'] },
              ],
              src: [p(18)],
            },
            { kind: 'check', questionIds: ['gr-q2', 'gr-q3'] },
          ],
        },
        {
          id: 'transkription',
          title: 'Regulation auf Transkriptionsebene',
          blocks: [
            {
              kind: 'text',
              md: 'Die Transkription startet mit der Bindung der RNA-Polymerase an den Promotor. Bei Eukaryoten müssen außerdem **allgemeine Transkriptionsfaktoren** an spezifische Bindungsstellen des Promotors binden. Eine davon enthält eine typische Folge aus Thymin und Adenin: die **TATA-Box**. Nachdem sich dort die **TATA-Bindungsproteine** angelagert haben, besetzen die übrigen Transkriptionsfaktoren nacheinander ihre Bindungsstellen – es bildet sich ein **Transkriptionskomplex**.',
              src: [p(18)],
            },
            {
              kind: 'text',
              md: 'Trotzdem werden viele Gene nur langsam transkribiert. Für die **differenzielle Genexpression** sind **spezifische Transkriptionsfaktoren** nötig – etwa **intrazelluläre Hormonrezeptoren**, die die Transkriptionsrate deutlich steigern. Sie binden an regulatorische DNA-Sequenzen, die oft **weit vom Gen entfernt** liegen; benachbarte DNA-Abschnitte bilden **Schleifen**, sodass die spezifischen Faktoren den Transkriptionskomplex berühren. Je nach Wirkung heißen diese Sequenzen **Verstärker (Enhancer)** oder **Dämpfer (Silencer)**. Die Summe der gebundenen Faktoren reguliert die Aktivität der RNA-Polymerase.',
              src: [p(19)],
            },
            {
              kind: 'note',
              tone: 'warn',
              title: 'Lehrplan: Hormone als Transkriptionsfaktoren',
              md: 'Dein Lehrplan (PDF S. 1) verlangt, die Steuerung der Genexpression durch Hormone als Transkriptionsfaktoren zu erläutern. Deine PDF behandelt das nur in diesem einen Absatz (Hormonrezeptoren als spezifische Transkriptionsfaktoren). Ein ausführliches Beispiel fehlt.',
              src: [p(1), p(19)],
            },
            { kind: 'check', questionIds: ['gr-q5', 'gr-q8'] },
          ],
        },
        {
          id: 'rnaebene',
          title: 'Regulation auf RNA-Ebene',
          blocks: [
            {
              kind: 'text',
              md: '**Alternatives (differenzielles) Spleißen:** Proteine erkennen Signale auf der RNA und steuern so, welche Exons verwendet werden. Aus derselben prä-mRNA entstehen verschiedene reife mRNAs. Beim Menschen unterliegen bis zu 50 % der Gene einem alternativen Spleißen; aus rund 20 000 Genen entstehen so viele hunderttausend Proteine. Fehler beim alternativen Spleißen sind eine häufige Krankheitsursache.',
              src: [p(19)],
            },
            {
              kind: 'steps',
              title: 'RNA-Interferenz',
              steps: [
                { title: 'miRNA', text: 'Der überwiegende Teil des Genoms wird in RNA transkribiert, die keine Proteine codiert – oft nur etwa **22 Nucleotide** lang: **micro-RNA (miRNA)**. Sie faltet sich spontan zu teils doppelsträngigen Molekülen.' },
                { title: 'RISC', text: 'Im Cytoplasma bindet die miRNA an den **RISC-Proteinkomplex** (RNA-induced silencing complex). Enzyme spalten sie in zwei Einzelstränge.' },
                { title: 'Bindung', text: 'Einer der Stränge ist **komplementär** zu einer Teilsequenz einer mRNA und bindet an diese.' },
                { title: 'Blockade und Abbau', text: 'Die **Translation wird blockiert**, anschließend wird der mRNA-miRNA-Komplex **abgebaut**.' },
              ],
              src: [p(19)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Auflösung: die Petunien',
              md: 'Die mRNA der eingeschleusten Gene wurde in **doppelsträngige mRNA** überführt und blockierte die Translation **des eingeschleusten und des natürlichen** Gens für die Blütenfarbe – RNA-Interferenz.',
              src: [p(19)],
            },
            { kind: 'check', questionIds: ['gr-q9', 'gr-q11'] },
          ],
        },
        {
          id: 'translation',
          title: 'Translations- und Polypeptidebene',
          blocks: [
            {
              kind: 'bullets',
              items: [
                '**Translationsebene:** Die Translationsrate hängt von der Zahl aktiver Ribosomen ab. Binden mehrere Ribosomen hintereinander an dieselbe mRNA, entstehen schnell viele Proteine.',
                '**Polypeptidebene:** Polypeptide werden oft chemisch modifiziert, etwa durch angehängte Kohlenhydrate – das verlängert ihre Lebensdauer.',
                'Die Proteinkonzentration wird auch durch **Abbau** reguliert: Das **Proteasom** ist ein molekularer „Schredder“, der nicht mehr benötigte oder falsch gefaltete Proteine abbaut.',
              ],
              src: [p(19)],
            },
          ],
        },
        {
          id: 'sirna',
          title: 'Material: RNA-Interferenz bei der Virusabwehr',
          blocks: [
            {
              kind: 'text',
              md: 'RNA-Interferenz spielt eine wichtige Rolle bei der pflanzlichen Abwehr gegen **doppelsträngige RNA-Viren**. Nach einer Infektion zerlegt das Enzym **Dicer** („Häcksler“) die Virus-RNA in kurze Abschnitte, die **siRNA** (small interfering RNA). Sie werden – wie miRNA – im RISC-Komplex genutzt: Die passende mRNA wird gebunden und abgebaut.',
              src: [p(19, 'Material A')],
            },
            { kind: 'check', questionIds: ['gr-q17'] },
          ],
        },
      ],
    },
    {
      sub: 'epigenetik',
      intro: 'Eineiige Zwillinge haben identisches Erbmaterial und unterscheiden sich trotzdem – im Aussehen, in der Körpergröße, im Krebs- oder Diabetesrisiko. Wie ist das möglich?',
      sections: [
        {
          id: 'umwelt',
          title: 'Umwelt wirkt auf Gene',
          blocks: [
            {
              kind: 'text',
              md: 'Lange galt: Merkmale werden nur durch die genetische Information bestimmt. Heute ist bewiesen, dass **Umwelteinflüsse die Aktivität von Genen** beeinflussen – etwa Ernährung, psychische Belastungen und traumatische Erfahrungen. Bestimmte Gene werden stärker oder schwächer abgelesen. **Die Basensequenz ändert sich dabei nicht.** Der Bereich der Biologie, der sich mit solchen **reversiblen Veränderungen der Genexpression** beschäftigt, ist die **Epigenetik**.',
              src: [p(20)],
            },
          ],
        },
        {
          id: 'mechanismen',
          title: 'DNA-Methylierung und Histonmodifikation',
          blocks: [
            {
              kind: 'bullets',
              title: 'DNA-Methylierung',
              items: [
                'Das Enzym **DNA-Methylase** bindet Methylgruppen (–CH₃) an **Cytosinbasen**.',
                'Das geschieht in Bereichen mit häufiger Basenfolge **Cytosin–Guanin**, oft in **Promotor-Regionen**.',
                'Folge: Die **Transkription** des Gens wird **unterdrückt**.',
                'Bei der **Replikation** werden die Methylierungen **mitkopiert** – die Muster bleiben in Tochterzellen erhalten.',
                'Reversibel: Die **Demethylase** entfernt Methylierungen und ermöglicht die Transkription wieder.',
              ],
              src: [p(20)],
            },
            {
              kind: 'text',
              md: '**Histonmodifikation:** Acetyl- oder Methylgruppen werden an Histone angefügt oder entfernt; dadurch ändern sich die Anziehungskräfte zwischen DNA und Histonen. Acetylierung lockert das Chromatin, sodass Gene abgelesen werden können. Auch die DNA-Methylierung kann an diesem Umbau beteiligt sein. Die Gesamtheit der epigenetischen Modifikationen heißt **epigenetisches Muster** oder **Epigenom**.',
              src: [p(20)],
            },
            { kind: 'check', questionIds: ['ep-q4'] },
          ],
        },
        {
          id: 'zwillinge',
          title: 'Epigenetik und Zwillinge',
          blocks: [
            {
              kind: 'text',
              md: 'Weil eineiige Zwillinge keine genetische Variabilität zeigen, eignen sie sich besonders, um den Umwelteinfluss zu untersuchen. In einer Studie unterschieden sich die Methylierungsmuster bestimmter Chromosomen bei **dreijährigen** Zwillingen kaum, bei **fünfzigjährigen** dagegen deutlich – und umso stärker, **je verschiedener ihre Lebenswege** waren.',
              src: [p(20)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Material A: Methylierung messen',
              md: 'Die DNA wird mit **Bisulfit** behandelt: **Nicht methylierte** Cytosine werden zu **Uracil**. Nach einer PCR enthält die DNA dort **U–A-Paare** (2 Wasserstoffbrücken) statt **C–G-Paare** (3). Beim langsamen Erhitzen misst man die UV-Absorption; am **Schmelzpunkt Tₘ** liegt die Hälfte der DNA einzelsträngig vor. Mehr Wasserstoffbrücken → höherer Schmelzpunkt.',
              src: [p(20, 'Material A')],
            },
            { kind: 'widget', widget: 'twins-curve', caption: 'Schmelzkurven der Zwillinge A und B (nach Material A)', src: [p(20, 'Material A')] },
            { kind: 'check', questionIds: ['ep-q6'] },
          ],
        },
        {
          id: 'nahrung',
          title: 'Nahrung verändert Genaktivität',
          blocks: [
            {
              kind: 'compare',
              columns: ['Bienen', 'Agouti-Mäuse'],
              rows: [
                { label: 'Gleiches Erbgut', cells: ['Königinnen und Arbeiterinnen entstehen aus genetisch identischen Eiern', 'braune und gelbe Mäuse: Agouti-Gen mit gleicher Basensequenz'] },
                { label: 'Unterschied', cells: ['unterschiedliches Methylierungsmuster der DNA', 'unterschiedliche Methylierung des Agouti-Gens'] },
                { label: 'Umweltfaktor', cells: ['Larven, die weiter Gelée royale bekommen, werden Königinnen; Gelée royale enthält Stoffe, die ein methylierendes Enzym hemmen', 'gelbe Weibchen erhalten in der Schwangerschaft Vitamin B12 oder Folsäure (vermehrt Methylgruppen)'] },
                { label: 'Folge', cells: ['bei Arbeiterinnen werden z. B. Gene für die Fortpflanzungsfähigkeit durch Methylierung nicht mehr abgelesen', 'braune, schlanke Nachkommen'] },
              ],
              src: [p(21)],
            },
            {
              kind: 'text',
              md: 'Das **Agouti-Signalprotein** ist u. a. für die **gelbe Fellfarbe** verantwortlich und hemmt einen Rezeptor für Fressverhalten und Stoffwechsel; Agouti-Mäuse erkranken häufiger an Krebs, Diabetes und Fettleibigkeit. Auch Hunger, Überernährung, Dauerstress oder traumatische Erlebnisse können Gene von Säugetierzellen epigenetisch verändern. Da die Muster bei der Replikation weitergegeben werden, kann eine früh erworbene Eigenschaft **bis ins hohe Alter** erhalten bleiben.',
              src: [p(21)],
            },
            { kind: 'check', questionIds: ['ep-q9'] },
          ],
        },
        {
          id: 'vererbung',
          title: 'Werden epigenetische Muster vererbt?',
          blocks: [
            {
              kind: 'text',
              md: 'Das wird **kontrovers diskutiert**. Hinweise lieferte die **„Holländische Hungerstudie“**: Im Kriegswinter 1944/45 kam es im Westen der Niederlande zu einer Hungersnot. 60 Jahre später zeigte sich: Mangelernährung der Mütter in der Schwangerschaft beeinflusste die Gesundheit der Kinder **lebenslang** – und sogar noch die der **Enkel**. Über mehrere Generationen scheinen die Muster aber schrittweise verloren zu gehen.',
              src: [p(21)],
            },
            {
              kind: 'bullets',
              title: 'Offene Fragen',
              items: [
                'Unklar ist, wie Informationen über Modifikationen einer Körperzelle in die **Keimzellen** gelangen.',
                'Methylierungen von Chromatin und DNA werden in der **Zygote** fast vollständig gelöscht.',
                'Eine Studie an **Fruchtfliegen** zeigte: Bestimmte Modifikationen der Eizellen sind auch im Embryo nachweisbar – eine Weitergabe ist also in bestimmten Fällen denkbar.',
              ],
              src: [p(21)],
            },
          ],
        },
        {
          id: 'xinaktivierung',
          title: 'Material: Inaktivierung von X-Chromosomen',
          blocks: [
            {
              kind: 'text',
              md: 'Frauen besitzen zwei X-Chromosomen; eines wird schon in der frühen Embryonalphase **inaktiviert** und ist als **Barr-Körperchen** anfärbbar. Welches X (väterlich oder mütterlich) inaktiviert wird, ist **zufällig**; der Zustand wird an die Tochterzellen weitergegeben – es entsteht ein **Mosaik**. Männer (ein X, fast genleeres Y) haben keine Barr-Körperchen.\n\nDie Inaktivierung beginnt mit der Synthese der **Xist-RNA** (X-inactive specific transcript), deren Gen im **X-inaktivierenden Zentrum** nahe dem Centromer liegt. Die Xist-RNA bindet an ein X-Chromosom; Histone werden methyliert, demethyliert und acetyliert – die DNA wird immer stärker mit Histonen **verpackt und verdichtet**.',
              src: [p(21, 'Material B')],
            },
            { kind: 'check', questionIds: ['ep-q13'] },
          ],
        },
      ],
    },
  ],

  terms: [
    { id: 'gr-genregulation', sub: 'genregulation', term: 'Genregulation', def: 'Steuerung der Genexpression auf Chromatin-, Transkriptions-, RNA-, Translations- und Polypeptidebene; Gene werden an-/abgeschaltet oder unterschiedlich stark aktiviert.', simple: 'Der Lautstärkeregler für Gene.', src: [p(18)] },
    { id: 'gr-acetylierung', sub: 'genregulation', term: 'Histon-Acetylierung', def: 'Anbindung von Acetylgruppen (–COCH₃) an Histone; verringert die Anziehung zwischen Histonen und DNA, das Chromatin lockert sich und wird für die Transkription zugänglich.', simple: 'Die DNA-Spule lockert sich – das Gen wird lesbar.', src: [p(18)] },
    { id: 'gr-dnamethyl', sub: 'genregulation', term: 'DNA-Methylierung', def: 'Enzymatische Bindung von Methylgruppen (–CH₃) an Cytosinbasen; verdichtet das Chromatin, die Transkription unterbleibt.', simple: 'Chemische „Stopp-Etiketten“ an der DNA.', src: [p(18), p(20)] },
    { id: 'gr-allgtf', sub: 'genregulation', term: 'allgemeine Transkriptionsfaktoren', def: 'Regulatorische Proteine, die bei Eukaryoten an spezifische Bindungsstellen des Promotors binden (z. B. TATA-Bindungsproteine) und einen Transkriptionskomplex bilden.', simple: 'Die Grundausstattung, damit die Transkription überhaupt startet.', src: [p(18)] },
    { id: 'gr-tatabox', sub: 'genregulation', term: 'TATA-Box', def: 'Bindungsstelle im Promotor mit typischer Basenfolge aus Thymin und Adenin; hier lagern sich zuerst die TATA-Bindungsproteine an.', simple: 'Die Andockstelle am Genanfang.', src: [p(18)] },
    { id: 'gr-komplex', sub: 'genregulation', term: 'Transkriptionskomplex', def: 'Gesamtheit der nacheinander am Promotor gebundenen Transkriptionsfaktoren zusammen mit der RNA-Polymerase.', simple: 'Das Startteam am Promotor.', src: [p(18), p(19)] },
    { id: 'gr-spezifisch', sub: 'genregulation', term: 'spezifische Transkriptionsfaktoren', def: 'Proteine wie intrazelluläre Hormonrezeptoren, die an oft weit entfernte regulatorische DNA-Sequenzen binden und die Transkriptionsrate verändern; nötig für die differenzielle Genexpression.', simple: 'Die Feinregler, die bestimmte Gene lauter oder leiser stellen.', src: [p(19)] },
    { id: 'gr-enhancer', sub: 'genregulation', term: 'Enhancer (Verstärker)', def: 'Regulatorische DNA-Sequenz, an die spezifische Transkriptionsfaktoren binden und die Transkription verstärken.', simple: 'Der Lauter-Knopf.', src: [p(19)] },
    { id: 'gr-silencer', sub: 'genregulation', term: 'Silencer (Dämpfer)', def: 'Regulatorische DNA-Sequenz, über die spezifische Transkriptionsfaktoren die Transkription dämpfen.', simple: 'Der Leiser-Knopf.', src: [p(19)] },
    { id: 'gr-differenziell', sub: 'genregulation', term: 'differenzielle Genexpression', def: 'Unterschiedlich starke Expression von Genen, z. B. in verschiedenen Zelltypen – gesteuert u. a. durch spezifische Transkriptionsfaktoren.', simple: 'Jede Zelle liest andere Gene unterschiedlich stark.', src: [p(19)] },
    { id: 'gr-mirna', sub: 'genregulation', term: 'micro-RNA (miRNA)', def: 'Nicht codierende RNA von oft etwa 22 Nucleotiden, die sich spontan zu teils doppelsträngigen Molekülen faltet und über den RISC-Komplex mRNA blockiert.', simple: 'Winzige RNA, die andere RNA stummschaltet.', src: [p(19)] },
    { id: 'gr-risc', sub: 'genregulation', term: 'RISC', def: 'RNA-induced silencing complex: Proteinkomplex, der miRNA/siRNA bindet, in Einzelstränge spaltet und den komplementären Strang an die Ziel-mRNA bringt.', simple: 'Der Abschalt-Apparat.', src: [p(19)] },
    { id: 'gr-rnai', sub: 'genregulation', term: 'RNA-Interferenz', def: 'Zielgerichtete Abschaltung von Genen: Ein miRNA-Strang bindet komplementär an eine mRNA, blockiert deren Translation, danach wird der Komplex abgebaut.', simple: 'Ein Gen wird stummgeschaltet, indem seine mRNA abgefangen wird.', src: [p(19)] },
    { id: 'gr-sirna', sub: 'genregulation', term: 'siRNA (small interfering RNA)', def: 'Kurze RNA-Abschnitte, die das Enzym Dicer aus doppelsträngiger (Virus-)RNA erzeugt; wirken über RNA-Interferenz.', simple: 'Häcksel aus Virus-RNA, die das Virus abschalten.', src: [p(19, 'Material A')] },
    { id: 'gr-dicer', sub: 'genregulation', term: 'Dicer', def: 'Enzym („Häcksler“), das doppelsträngige RNA in kurze siRNA-Abschnitte zerlegt.', simple: 'Der RNA-Häcksler.', src: [p(19, 'Material A')] },
    { id: 'gr-proteasom', sub: 'genregulation', term: 'Proteasom', def: 'Proteinkomplex („molekularer Schredder“), der nicht mehr benötigte oder falsch gefaltete Proteine enzymatisch abbaut.', simple: 'Der Protein-Schredder der Zelle.', src: [p(19)] },
    { id: 'ep-epigenetik', sub: 'epigenetik', term: 'Epigenetik', def: 'Bereich der Biologie, der sich mit reversiblen Veränderungen der Genexpression beschäftigt, die nicht auf einer Änderung der Basensequenz beruhen.', simple: 'Wie die Umwelt Gene an- und ausknipst, ohne sie umzuschreiben.', src: [p(20)] },
    { id: 'ep-methylase', sub: 'epigenetik', term: 'DNA-Methylase / Demethylase', def: 'DNA-Methylase bindet Methylgruppen an Cytosin (Transkription unterdrückt); Demethylase entfernt sie (Transkription möglich).', simple: 'Das Enzym, das Etiketten anklebt – und das, das sie wieder abzieht.', src: [p(20)] },
    { id: 'ep-histonmod', sub: 'epigenetik', term: 'Histonmodifikation', def: 'Anfügen oder Entfernen von Acetyl- oder Methylgruppen an Histone; verändert die Anziehung zwischen DNA und Histonen und damit die Ablesbarkeit der Gene.', simple: 'Die Spulen werden fester oder lockerer.', src: [p(20), p(18)] },
    { id: 'ep-epigenom', sub: 'epigenetik', term: 'Epigenom (epigenetisches Muster)', def: 'Gesamtheit der epigenetischen Modifikationen einer Zelle.', simple: 'Die Summe aller Etiketten.', src: [p(20)] },
    { id: 'ep-bisulfit', sub: 'epigenetik', term: 'Bisulfit-Behandlung', def: 'Methode zur Untersuchung von Methylierungsmustern: Nicht methylierte Cytosine werden in Uracil umgewandelt; methylierte bleiben erhalten.', simple: 'Ein chemischer Test, der unmethylierte C „umfärbt“.', src: [p(20, 'Material A')] },
    { id: 'ep-tm', sub: 'epigenetik', term: 'Schmelzpunkt Tₘ', def: 'Temperatur, bei der die Hälfte der doppelsträngigen DNA als Einzelstränge vorliegt; steigt mit der Zahl der Wasserstoffbrücken.', simple: 'Ab hier ist die halbe DNA „aufgeschmolzen“.', src: [p(20, 'Material A')] },
    { id: 'ep-geleeroyale', sub: 'epigenetik', term: 'Gelée royale', def: 'Sekret aus den Futtersaftdrüsen der Bienen; enthält Stoffe, die ein methylierendes Enzym hemmen. Larven, die es weiter erhalten, werden Königinnen.', simple: 'Königinnen-Futter, das Gene aktiv lässt.', src: [p(21)] },
    { id: 'ep-agouti', sub: 'epigenetik', term: 'Agouti-Gen', def: 'Gen für das Agouti-Signalprotein (gelbe Fellfarbe, hemmt einen Rezeptor für Fressverhalten und Stoffwechsel); braune und gelbe Mäuse unterscheiden sich nicht in der Sequenz, sondern in der Methylierung.', simple: 'Ein Fellfarben- und Stoffwechsel-Gen, das die Ernährung der Mutter umschalten kann.', src: [p(21)] },
    { id: 'ep-barr', sub: 'epigenetik', term: 'Barr-Körperchen', def: 'Inaktiviertes, stark verdichtetes X-Chromosom in Zellen von Frauen; im Lichtmikroskop anfärbbar.', simple: 'Das „ausgeschaltete“ zweite X.', src: [p(21, 'Material B')] },
    { id: 'ep-xist', sub: 'epigenetik', term: 'Xist-RNA', def: 'RNA aus dem X-inaktivierenden Zentrum; bindet an ein X-Chromosom und leitet dessen Inaktivierung durch Histonmodifikation und Verdichtung ein.', simple: 'Die RNA, die ein X-Chromosom stilllegt.', src: [p(21, 'Material B')] },
  ],

  cards: [
    { id: 'gr-c1', sub: 'genregulation', kind: 'ursache', front: 'Ursache: Acetylgruppen werden an Histone gebunden. → Wirkung?', back: 'Die Anziehung zwischen Histonen und DNA sinkt, das Chromatin lockert sich → die DNA-Abschnitte werden für die Transkription zugänglich.', src: [p(18)], prov: 'pdf' },
    { id: 'gr-c2', sub: 'genregulation', kind: 'ursache', front: 'Ursache: Methylgruppen werden an Cytosinbasen der DNA gebunden. → Wirkung?', back: 'Das Chromatin verdichtet sich, die Transkription des Abschnitts unterbleibt.', src: [p(18)], prov: 'pdf' },
    { id: 'gr-c3', sub: 'genregulation', kind: 'vergleich', front: 'Enhancer vs. Silencer', back: 'Beides regulatorische DNA-Sequenzen, oft weit vom Gen entfernt, an die spezifische Transkriptionsfaktoren binden.\nEnhancer: verstärkt · Silencer: dämpft die Transkription.', src: [p(19)], prov: 'pdf' },
    { id: 'gr-c4', sub: 'genregulation', kind: 'prozess', front: 'RNA-Interferenz in Schritten', back: 'miRNA faltet sich → bindet an RISC → wird in Einzelstränge gespalten → ein Strang bindet komplementär an mRNA → Translation blockiert → Komplex abgebaut.', src: [p(19)], prov: 'pdf' },
    { id: 'gr-c5', sub: 'genregulation', kind: 'experiment', front: 'Petunien mit zusätzlichem Farbgen: Warum wurden die Blüten heller?', back: 'RNA-Interferenz: Die mRNA der eingeschleusten Gene wurde doppelsträngig und blockierte die Translation des eingeschleusten und des natürlichen Farbgens.', src: [p(19)], prov: 'pdf' },
    { id: 'gr-c6', sub: 'genregulation', kind: 'frage', front: 'Wozu braucht es neben den allgemeinen noch spezifische Transkriptionsfaktoren?', back: 'Mit allgemeinen Faktoren allein werden viele Gene nur langsam transkribiert. Spezifische Faktoren (z. B. Hormonrezeptoren) steuern die differenzielle Genexpression und steigern die Rate deutlich.', src: [p(19)], prov: 'pdf' },
    { id: 'gr-c7', sub: 'genregulation', kind: 'frage', front: 'Welche Aufgabe hat das Proteasom?', back: 'Es baut nicht mehr benötigte oder falsch gefaltete Proteine ab („molekularer Schredder“).', src: [p(19)], prov: 'pdf' },
    { id: 'ep-c1', sub: 'epigenetik', kind: 'experiment', front: 'Zwillingsstudie: Wie unterscheiden sich die Methylierungsmuster mit dem Alter?', back: 'Bei Dreijährigen kaum, bei Fünfzigjährigen deutlich – umso stärker, je verschiedener die Lebenswege waren.', src: [p(20)], prov: 'pdf' },
    { id: 'ep-c2', sub: 'epigenetik', kind: 'ursache', front: 'Ursache: Zwilling B hat einen höheren Schmelzpunkt als Zwilling A. → Deutung?', back: 'B hat nach der Bisulfit-Behandlung mehr C–G-Paare (3 H-Brücken) → mehr Cytosine waren methyliert und blieben erhalten.', src: [p(20, 'Material A')], prov: 'inf' },
    { id: 'ep-c3', sub: 'epigenetik', kind: 'experiment', front: 'Agouti-Mäuse: Wirkung von Vitamin B12/Folsäure in der Schwangerschaft?', back: 'Gelbe Weibchen bringen braune, schlanke Nachkommen zur Welt – bei gleicher Basensequenz des Agouti-Gens, aber anderer Methylierung.', src: [p(21)], prov: 'pdf' },
    { id: 'ep-c4', sub: 'epigenetik', kind: 'frage', front: 'Warum bleiben epigenetische Veränderungen in einem Organismus oft lebenslang erhalten?', back: 'Die Methylierungsmuster werden bei der Replikation mitkopiert und an die Tochterzellen weitergegeben.', src: [p(20), p(21)], prov: 'pdf' },
    { id: 'ep-c5', sub: 'epigenetik', kind: 'frage', front: 'Wie viele Barr-Körperchen haben Frauen, Männer, Triple-X-, Turner- und Klinefelter-Betroffene?', back: 'XX: 1 · XY: 0 · XXX: 2 · X0 (Turner): 0 · XXY (Klinefelter): 1 – alle X-Chromosomen bis auf eines werden inaktiviert.', src: [p(21, 'Material B')], prov: 'inf' },
    { id: 'ep-c6', sub: 'epigenetik', kind: 'vergleich', front: 'Mutation vs. epigenetische Modifikation', back: 'Mutation: verändert die Basensequenz.\nEpigenetische Modifikation: verändert die Genexpression (Methylierung, Histonmodifikation), Sequenz bleibt gleich, reversibel.', src: [p(15), p(20)], prov: 'inf' },
  ],

  questions: [
    // ---------------- genregulation ----------------
    {
      id: 'gr-q1', sub: 'genregulation', type: 'multi', level: 1, err: 'facts', prov: 'pdf', src: [p(18)],
      prompt: 'Auf welchen Ebenen kann die Genexpression eukaryotischer Zellen reguliert werden?',
      options: ['Chromatin- und Transkriptionsebene', 'RNA- und Translationsebene', 'Ebene der Proteine', 'Ebene der Replikationsgabel'],
      answers: [0, 1, 2],
      why: [{ text: 'Chromatin-/Transkriptionsebene, RNA-/Translationsebene und Proteinebene.', prov: 'pdf', src: [p(18)] }],
    },
    {
      id: 'gr-q2', sub: 'genregulation', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(18)],
      prompt: 'Wie wirkt die Acetylierung von Histonen auf die Genexpression?',
      options: [
        'Die Anziehung zwischen Histonen und DNA sinkt, das Chromatin lockert sich, die DNA wird für die Transkription zugänglich.',
        'Das Chromatin verdichtet sich, die Transkription wird verhindert.',
        'Die Basensequenz des Gens wird verändert.',
        'Die mRNA wird abgebaut.',
      ],
      answer: 0,
      feedback: { 1: 'Das bewirken Methylgruppen an Histonen bzw. das Abspalten von Acetylgruppen.' },
      why: [{ text: 'Acetylgruppen (–COCH₃) an Histonen → Chromatin lockert sich → Transkription möglich.', prov: 'pdf', src: [p(18)] }],
    },
    {
      id: 'gr-q3', sub: 'genregulation', type: 'match', level: 2, err: 'mechanism', prov: 'pdf', src: [p(18)],
      prompt: 'Ordne jeder Modifikation ihre Wirkung zu.',
      pairs: [
        { left: 'Acetylgruppen an Histonen', right: 'Chromatin lockert sich – Transkription möglich' },
        { left: 'Methylgruppen an Histonen', right: 'Chromatin verdichtet – keine Transkription' },
        { left: 'Methylgruppen an Cytosin (DNA)', right: 'Chromatin verdichtet – keine Transkription' },
        { left: 'Methylgruppen der DNA entfernt', right: 'Chromatin lockert sich – Transkription möglich' },
      ],
      why: [{ text: 'Acetylierung von Histonen öffnet, Methylierung (Histone oder DNA) verschließt das Chromatin.', prov: 'pdf', src: [p(18)] }],
    },
    {
      id: 'gr-q4', sub: 'genregulation', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(18)],
      prompt: 'Was ist die TATA-Box?',
      options: [
        'eine Bindungsstelle im Promotor mit typischer Thymin-Adenin-Folge, an die TATA-Bindungsproteine binden',
        'ein Stoppcodon',
        'ein Enzym, das Histone acetyliert',
        'ein Abschnitt der tRNA',
      ],
      answer: 0,
      why: [{ text: 'An der TATA-Box lagern sich zuerst die TATA-Bindungsproteine an, danach folgen die übrigen Transkriptionsfaktoren.', prov: 'pdf', src: [p(18)] }],
    },
    {
      id: 'gr-q5', sub: 'genregulation', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(18), p(19)],
      prompt: 'Bringe die Schritte der Transkriptionsregulation bei Eukaryoten in die richtige Reihenfolge.',
      items: [
        'TATA-Bindungsproteine lagern sich an die TATA-Box des Promotors an',
        'Weitere allgemeine Transkriptionsfaktoren besetzen nacheinander ihre Bindungsstellen',
        'Ein Transkriptionskomplex ist entstanden',
        'Spezifische Transkriptionsfaktoren binden an entfernte regulatorische Sequenzen',
        'DNA-Schleifen bringen sie in Kontakt mit dem Transkriptionskomplex',
        'Die Summe der Faktoren reguliert die Aktivität der RNA-Polymerase',
      ],
      why: [{ text: 'Allgemeine Faktoren bilden den Grundkomplex; spezifische Faktoren an Enhancern/Silencern regeln die Rate.', prov: 'pdf', src: [p(18), p(19)] }],
    },
    {
      id: 'gr-q6', sub: 'genregulation', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(19)],
      prompt: 'Ordne die deutschen Bezeichnungen zu.',
      pairs: [
        { left: 'Enhancer', right: 'Verstärker' },
        { left: 'Silencer', right: 'Dämpfer' },
      ],
      distractors: ['Starter', 'Terminator'],
      why: [{ text: 'Je nach Wirkung auf die Transkription heißen die regulatorischen Sequenzen Dämpfer (silencer) oder Verstärker (enhancer).', prov: 'pdf', src: [p(19)] }],
    },
    {
      id: 'gr-q7', sub: 'genregulation', type: 'tf', level: 2, err: 'mechanism', prov: 'pdf', src: [p(19)],
      prompt: 'Spezifische Transkriptionsfaktoren binden immer direkt neben dem Promotor des regulierten Gens.',
      answer: false,
      correction: 'Die regulatorischen Sequenzen liegen oft weit vom Gen entfernt; die DNA bildet Schleifen, damit die Faktoren den Transkriptionskomplex erreichen.',
      why: [{ text: 'Benachbarte DNA-Abschnitte bilden Schleifen – so kommen weit entfernte Faktoren in Kontakt mit dem Komplex.', prov: 'pdf', src: [p(19)] }],
    },
    {
      id: 'gr-q8', sub: 'genregulation', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(19)],
      prompt: 'Welche Rolle spielen intrazelluläre Hormonrezeptoren laut deiner PDF bei der Genregulation?',
      options: [
        'Sie wirken als spezifische Transkriptionsfaktoren und steigern die Transkriptionsrate deutlich.',
        'Sie bauen mRNA ab.',
        'Sie acetylieren Histone.',
        'Sie bilden den Primer für die RNA-Polymerase.',
      ],
      answer: 0,
      why: [{ text: 'Zu den spezifischen Transkriptionsfaktoren zählen intrazelluläre Hormonrezeptoren, die die Transkriptionsrate deutlich steigern.', prov: 'pdf', src: [p(19)] }],
    },
    {
      id: 'gr-q9', sub: 'genregulation', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(19)],
      prompt: 'Bringe die Schritte der RNA-Interferenz in die richtige Reihenfolge.',
      items: [
        'miRNA wird transkribiert und faltet sich zu teils doppelsträngigen Molekülen',
        'miRNA bindet im Cytoplasma an den RISC-Proteinkomplex',
        'Enzyme des Komplexes spalten die miRNA in Einzelstränge',
        'Ein Strang bindet komplementär an eine Teilsequenz der mRNA',
        'Die Translation der mRNA wird blockiert',
        'Der mRNA-miRNA-Komplex wird abgebaut',
      ],
      why: [{ text: 'So wird ein Gen zielgerichtet abgeschaltet.', prov: 'pdf', src: [p(19)] }],
    },
    {
      id: 'gr-q10', sub: 'genregulation', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(19)],
      prompt: 'Wie lang sind micro-RNA-Moleküle laut deiner PDF oft?',
      options: ['etwa 22 Nucleotide', 'etwa 80 Nucleotide', 'etwa 300 Nucleotide', 'etwa 1426 Nucleotide'],
      answer: 0,
      feedback: { 1: 'Etwa 80 Nucleotide hat eine tRNA.', 2: 'Bis zu 300 Adenin-Nucleotide umfasst der Poly-A-Schwanz.' },
      why: [{ text: 'Wegen ihrer Kürze (oft etwa 22 Nucleotide) heißen sie micro-RNA.', prov: 'pdf', src: [p(19)] }],
    },
    {
      id: 'gr-q11', sub: 'genregulation', type: 'single', level: 3, err: 'mechanism', prov: 'pdf', src: [p(18), p(19)],
      prompt: 'Warum hatten die Petunien mit zusätzlich eingebautem Farbstoff-Gen hellere oder weiße Blüten?',
      options: [
        'Durch RNA-Interferenz wurde die Translation des eingeschleusten und des natürlichen Farbgens blockiert.',
        'Das zusätzliche Gen mutierte das natürliche Gen.',
        'Zwei Farbgene heben sich chemisch auf.',
        'Die Blütenzellen starben ab.',
      ],
      answer: 0,
      why: [{ text: 'Die mRNA der eingeschleusten Gene wurde doppelsträngig und blockierte die Translation beider Gene für die Blütenfarbe.', prov: 'pdf', src: [p(19)] }],
    },
    {
      id: 'gr-q12', sub: 'genregulation', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(19)],
      prompt: 'Welche Aufgabe hat das Proteasom?',
      options: ['Es baut nicht mehr benötigte oder falsch gefaltete Proteine ab.', 'Es spleißt die prä-mRNA.', 'Es verlängert die Lebensdauer von Proteinen.', 'Es bindet an die TATA-Box.'],
      answer: 0,
      why: [{ text: 'Das Proteasom ist ein molekularer „Schredder“ – Regulation auf Polypeptidebene.', prov: 'pdf', src: [p(19)] }],
    },
    {
      id: 'gr-q13', sub: 'genregulation', type: 'free', level: 2, err: 'mechanism', prov: 'pdf', src: [p(19)], operator: 'Erläutern',
      prompt: 'Erläutere die RNA-Interferenz als Mechanismus zur Hemmung der Genexpression.',
      rubric: [
        { id: 'mirna', label: 'Kurze, nicht codierende RNA (miRNA, ca. 22 Nt) faltet sich zu doppelsträngigen Abschnitten', any: [['mirna|micro|sirna|kurze rna|22']], weight: 1 },
        { id: 'risc', label: 'Sie wird an den RISC-Komplex gebunden und in Einzelstränge gespalten', any: [['risc|proteinkomplex'], ['einzelstr', 'gespalten|getrennt|spalt']], weight: 1 },
        { id: 'bindung', label: 'Ein Strang bindet komplementär an die Ziel-mRNA', any: [['komplementaer|passend', 'mrna']], weight: 1 },
        { id: 'folge', label: 'Die Translation wird blockiert und der Komplex abgebaut → Gen gezielt abgeschaltet', any: [['translation|abbau|abgebaut|blockier|stumm|abgeschaltet']], weight: 1.5 },
      ],
      model: 'Ein großer Teil des Genoms wird in RNA transkribiert, die keine Proteine codiert – z. B. micro-RNA mit oft etwa 22 Nucleotiden. Die miRNA faltet sich zu teilweise doppelsträngigen Molekülen und wird im Cytoplasma an den RISC-Proteinkomplex gebunden. Enzyme des Komplexes spalten sie in Einzelstränge. Einer der Stränge ist komplementär zu einer Teilsequenz einer mRNA und bindet an diese. Dadurch wird die Translation dieser mRNA blockiert; anschließend wird der mRNA-miRNA-Komplex abgebaut. Das Gen wird so gezielt abgeschaltet, obwohl es weiter transkribiert wird.',
      why: [{ text: 'Kompetenz aus deinem Lehrplan (PDF S. 1): „erläutern RNA-Interferenz als Mechanismus zur Hemmung der Genexpression“.', prov: 'pdf', src: [p(1), p(19)] }],
    },
    {
      id: 'gr-q14', sub: 'genregulation', type: 'free', level: 3, err: 'mechanism', prov: 'pdf', src: [p(18), p(20)], operator: 'Erklären',
      prompt: 'Erkläre, wie Histonmodifikationen die Genexpression beeinflussen.',
      rubric: [
        { id: 'histone', label: 'DNA ist um Histone gewickelt (Nucleosomen); ihre Packungsdichte bestimmt die Zugänglichkeit', any: [['histon', 'gewickelt|nucleosom|nukleosom|verpack|zugaenglich']], weight: 1 },
        { id: 'acetyl', label: 'Acetylierung verringert die Anziehung Histon–DNA → Chromatin lockert → Transkription möglich', any: [['acetyl', 'locker|zugaenglich|anziehung|ablesbar|transkription']], weight: 1.5 },
        { id: 'methyl', label: 'Methylierung der Histone (bzw. Entfernen der Acetylgruppen) verdichtet das Chromatin → keine Transkription', any: [['methyl|deacetyl|abgespalten', 'verdicht|dicht|keine transkription|verhindert|kompakt']], weight: 1.5 },
      ],
      model: 'In eukaryotischen Zellen ist die DNA abschnittsweise um Histone gewickelt (Nucleosomen). Werden Acetylgruppen enzymatisch an bestimmte Histone gebunden, verringern sich die Anziehungskräfte zwischen Histonen und DNA; das Chromatin lockert sich und die betreffenden Abschnitte werden für die Transkription zugänglich. Werden Acetylgruppen abgespalten oder Methylgruppen an Histone gebunden, verdichtet sich das Chromatin und die Transkription wird verhindert.',
      why: [{ text: 'Kompetenz aus deinem Lehrplan (PDF S. 1): „erklären Genexpression durch Histonmodifikation proximat“.', prov: 'pdf', src: [p(1), p(18)] }],
    },
    {
      id: 'gr-q15', sub: 'genregulation', type: 'free', level: 4, err: 'mechanism', prov: 'pdf', src: [p(18), p(19)], operator: 'Erläutern',
      prompt: 'Erläutere, wie spezifische Transkriptionsfaktoren – etwa Hormonrezeptoren – die Genexpression steuern.',
      rubric: [
        { id: 'grund', label: 'Allgemeine Transkriptionsfaktoren (TATA-Box) bilden den Transkriptionskomplex – allein nur geringe Rate', any: [['allgemein|tata|grund', 'transkriptionsfaktor|komplex|gering|langsam']], weight: 1 },
        { id: 'binden', label: 'Spezifische Faktoren (z. B. Hormonrezeptoren) binden an regulatorische Sequenzen, oft weit vom Gen entfernt', any: [['spezifisch|hormon', 'regulatorisch|sequenz|entfernt|enhancer|silencer|binden']], weight: 1 },
        { id: 'schleife', label: 'DNA-Schleifen bringen sie in Kontakt mit dem Transkriptionskomplex', any: [['schleife|kontakt']], weight: 1 },
        { id: 'enh-sil', label: 'Enhancer verstärken, Silencer dämpfen die Transkription', any: [['enhancer|verstaerk', 'silencer|daempf']], weight: 1 },
        { id: 'summe', label: 'Die Summe der Faktoren reguliert die RNA-Polymerase → differenzielle Genexpression', any: [['summe|zusammenspiel|polymerase|differenziell|rate']], weight: 0.5 },
      ],
      model: 'Am Promotor bilden allgemeine Transkriptionsfaktoren, beginnend mit den TATA-Bindungsproteinen an der TATA-Box, einen Transkriptionskomplex. Damit werden viele Gene aber nur langsam transkribiert. Spezifische Transkriptionsfaktoren – zum Beispiel intrazelluläre Hormonrezeptoren – binden an regulatorische DNA-Sequenzen, die oft weit vom Gen entfernt liegen. Benachbarte DNA-Abschnitte bilden Schleifen, sodass die Faktoren mit dem Transkriptionskomplex in Kontakt kommen. Binden sie an Verstärker (Enhancer), steigt die Transkriptionsrate; an Dämpfer (Silencer) sinkt sie. Die Summe der gebundenen Faktoren reguliert die Aktivität der RNA-Polymerase – so entsteht die differenzielle Genexpression.',
      why: [{ text: 'Deine PDF beschreibt Hormonrezeptoren nur als Beispiel spezifischer Transkriptionsfaktoren (S. 19). Details zur Hormonwirkung stehen nicht darin.', prov: 'pdf', src: [p(19)] }],
    },
    {
      id: 'gr-q16', sub: 'genregulation', type: 'free', level: 4, err: 'mechanism', prov: 'inf', src: [p(19, 'Material A')], operator: 'Erklären',
      prompt: 'Erkläre, wie man synthetisch hergestellte siRNA-Moleküle zur Behandlung menschlicher Krankheiten einsetzen könnte.',
      rubric: [
        { id: 'komplementaer', label: 'Die siRNA wird komplementär zur mRNA eines krankheitsauslösenden Gens (z. B. Virus oder mutiertes Gen) hergestellt', any: [['komplementaer|passend|gezielt', 'mrna|gen|virus']], weight: 1.5 },
        { id: 'risc', label: 'Im RISC-Komplex bindet sie an diese mRNA', any: [['risc|bindet']], weight: 1 },
        { id: 'blockade', label: 'Die Translation wird blockiert und die mRNA abgebaut → Genprodukt fehlt', any: [['translation|abbau|abgebaut|blockier|kein (protein|genprodukt)']], weight: 1 },
        { id: 'ziel', label: 'So wird gezielt ein schädliches Gen stummgeschaltet (z. B. Virusvermehrung gestoppt)', any: [['stumm|abschalt|ausschalt|hemmen|stopp|verhinder']], weight: 0.5 },
      ],
      model: 'Man stellt siRNA-Moleküle her, deren Sequenz komplementär zur mRNA eines Gens ist, das eine Krankheit verursacht – etwa eines Virusgens oder eines mutierten menschlichen Gens. Gelangen sie in die Zelle, werden sie im RISC-Komplex genutzt: Der passende Strang bindet an die Ziel-mRNA, die Translation wird blockiert und die mRNA abgebaut. Das schädliche Genprodukt wird nicht mehr gebildet – das Gen ist gezielt stummgeschaltet.',
      why: [
        { text: 'Aufgabe 2 aus Material A deiner PDF. Die PDF beschreibt den Mechanismus, aber keine Therapie – die Antwort ist abgeleitet.', prov: 'inf', src: [p(19, 'Material A')] },
      ],
    },
    {
      id: 'gr-q17', sub: 'genregulation', type: 'single', level: 2, err: 'enzyme', prov: 'pdf', src: [p(19, 'Material A')],
      prompt: 'Welche Aufgabe hat das Enzym Dicer bei der pflanzlichen Virusabwehr?',
      options: [
        'Es zerlegt die doppelsträngige Virus-RNA in kurze siRNA-Abschnitte.',
        'Es baut Proteine der Viren ab.',
        'Es methyliert die Virus-DNA.',
        'Es verknüpft RNA-Fragmente.',
      ],
      answer: 0,
      why: [{ text: 'Dicer (englisch: Häcksler) zerlegt die RNA in kurze Abschnitte, die siRNA.', prov: 'pdf', src: [p(19, 'Material A')] }],
    },
    {
      id: 'gr-q18', sub: 'genregulation', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(18)], operator: 'Ableiten',
      prompt: 'Ein Wirkstoff hemmt die Enzyme, die Acetylgruppen von Histonen abspalten. Leite ab, wie sich das auf die Genexpression auswirkt.',
      rubric: [
        { id: 'bleibt', label: 'Histone bleiben acetyliert', any: [['acetyl', 'bleib|erhalten|nicht (mehr )?(abgespalten|entfernt)']], weight: 1.5 },
        { id: 'locker', label: 'Das Chromatin bleibt aufgelockert / zugänglich', any: [['locker|offen|zugaenglich']], weight: 1 },
        { id: 'folge', label: 'Gene werden vermehrt transkribiert bzw. können nicht mehr über Deacetylierung abgeschaltet werden', any: [['mehr|vermehrt|staerker|weiter|nicht (mehr )?abgeschaltet|abschalten']], weight: 1 },
      ],
      model: 'Wenn Acetylgruppen nicht mehr abgespalten werden, bleiben die Histone acetyliert. Die Anziehungskräfte zwischen Histonen und DNA bleiben gering, das Chromatin bleibt aufgelockert und zugänglich. Gene, die normalerweise durch Abspalten der Acetylgruppen abgeschaltet würden, werden weiter bzw. verstärkt transkribiert.',
      why: [{ text: 'Transferaufgabe (nicht in deiner PDF); sie folgt aus der Wirkung der Acetylierung (PDF S. 18).', prov: 'inf', src: [p(18)] }],
    },
    // ---------------- epigenetik ----------------
    {
      id: 'ep-q1', sub: 'epigenetik', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(20)],
      prompt: 'Womit beschäftigt sich die Epigenetik?',
      options: [
        'mit reversiblen Veränderungen der Genexpression, ohne dass sich die Basensequenz ändert',
        'mit Veränderungen der Basensequenz durch Mutationen',
        'mit der Entstehung neuer Arten',
        'mit der Vervielfältigung von DNA im Labor',
      ],
      answer: 0,
      why: [{ text: 'Umwelteinflüsse verändern nicht die Basensequenz, sondern die Genexpression.', prov: 'pdf', src: [p(20)] }],
    },
    {
      id: 'ep-q2', sub: 'epigenetik', type: 'tf', level: 1, err: 'comparison', prov: 'pdf', src: [p(20)],
      prompt: 'Epigenetische Veränderungen verändern die Basensequenz der DNA.',
      answer: false,
      correction: 'Sie verändern die Genexpression (z. B. über Methylierung), nicht die Basensequenz – das unterscheidet sie von Mutationen.',
      why: [{ text: 'Die Umwelteinflüsse verändern nicht die Basensequenz der DNA, sondern beeinflussen die Genexpression.', prov: 'pdf', src: [p(20)] }],
    },
    {
      id: 'ep-q3', sub: 'epigenetik', type: 'match', level: 1, err: 'enzyme', prov: 'pdf', src: [p(20)],
      prompt: 'Ordne die Enzyme ihrer Wirkung zu.',
      pairs: [
        { left: 'DNA-Methylase', right: 'bindet Methylgruppen an Cytosin – Transkription unterdrückt' },
        { left: 'Demethylase', right: 'entfernt Methylierungen – Transkription möglich' },
      ],
      distractors: ['spaltet doppelsträngige RNA'],
      why: [{ text: 'Die Methylierung ist ein reversibler Prozess.', prov: 'pdf', src: [p(20)] }],
    },
    {
      id: 'ep-q4', sub: 'epigenetik', type: 'multi', level: 2, err: 'mechanism', prov: 'pdf', src: [p(20)],
      prompt: 'Welche Aussagen zur DNA-Methylierung treffen laut deiner PDF zu?',
      options: [
        'Methylgruppen werden an Cytosinbasen gebunden.',
        'Sie findet oft in Promotor-Regionen statt.',
        'Sie unterdrückt die Transkription des Gens.',
        'Bei der Replikation werden die Methylierungen mitkopiert.',
        'Sie ist nicht umkehrbar.',
      ],
      answers: [0, 1, 2, 3],
      why: [{ text: 'Die Methylierung ist reversibel – die Demethylase entfernt sie wieder.', prov: 'pdf', src: [p(20)] }],
    },
    {
      id: 'ep-q5', sub: 'epigenetik', type: 'single', level: 2, err: 'experiment', prov: 'pdf', src: [p(20)],
      prompt: 'Was ergab die Studie zu Methylierungsmustern eineiiger Zwillinge unterschiedlichen Alters?',
      options: [
        'Bei Dreijährigen kaum Unterschiede, bei Fünfzigjährigen deutliche – umso stärker, je verschiedener die Lebenswege.',
        'Die Muster sind in jedem Alter identisch.',
        'Die Unterschiede sind bei Kleinkindern am größten.',
        'Nur die Basensequenz unterscheidet sich.',
      ],
      answer: 0,
      why: [{ text: 'Die Umwelt hatte sich auf das Methylierungsmuster ausgewirkt und so die Aktivität der Gene verändert.', prov: 'pdf', src: [p(20)] }],
    },
    {
      id: 'ep-q6', sub: 'epigenetik', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(20, 'Material A')], figure: { widget: 'twins-curve' },
      prompt: 'Die Schmelzkurve von Zwilling B liegt bei höheren Temperaturen (Tₘ ≈ 87 °C) als die von Zwilling A (Tₘ ≈ 70 °C). Welcher Zwilling hatte mehr methylierte Cytosine?',
      options: ['Zwilling B', 'Zwilling A', 'beide gleich viele', 'Das lässt sich nicht ableiten.'],
      answer: 0,
      why: [
        { text: 'Bisulfit wandelt nur nicht methylierte Cytosine in Uracil um. Methylierte bleiben C und bilden nach der PCR C–G-Paare mit 3 Wasserstoffbrücken (U–A nur 2).', prov: 'pdf', src: [p(20, 'Material A')] },
        { text: 'Höherer Schmelzpunkt → mehr Wasserstoffbrücken → mehr C–G-Paare → mehr methylierte Cytosine bei B. Die Tₘ-Werte sind aus der Abbildung abgelesen (ca.).', prov: 'inf' },
      ],
    },
    {
      id: 'ep-q7', sub: 'epigenetik', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(20, 'Material A')], operator: 'Beschreiben und erklären', figure: { widget: 'twins-curve' },
      prompt: 'Beschreibe die Schmelzkurven der Zwillinge A und B und erkläre, warum sie sich unterscheiden.',
      rubric: [
        { id: 'beschreibung', label: 'Beschreibung: B schmilzt bei höherer Temperatur (Tₘ ≈ 87 °C gegenüber ≈ 70 °C bei A)', any: [['\\bb\\b', 'hoeher|spaeter|rechts|87'], ['\\ba\\b', 'niedriger|frueher|70']], weight: 1 },
        { id: 'bisulfit', label: 'Bisulfit: Nicht methylierte Cytosine → Uracil → nach PCR U–A statt C–G', any: [['bisulfit|uracil|u a|umgewandelt']], weight: 1 },
        { id: 'hbr', label: 'U–A: 2, C–G: 3 Wasserstoffbrücken; mehr Brücken → höherer Schmelzpunkt', any: [['wasserstoff|h ?bruecke', 'mehr|hoeher|drei|3|zwei|2']], weight: 1 },
        { id: 'deutung', label: 'B hatte mehr methylierte Cytosine als A', any: [['\\bb\\b', 'mehr', 'methyl'], ['\\ba\\b', 'weniger', 'methyl']], weight: 1.5 },
        { id: 'umwelt', label: 'Trotz gleicher Gene: Unterschiede durch Umwelteinflüsse (epigenetisch)', any: [['umwelt|lebensweg|lebensstil|ernaehrung|epigenet']], weight: 0.5 },
      ],
      model: 'Beide Kurven steigen beim Erhitzen s-förmig an; die Kurve von Zwilling B ist nach rechts verschoben. Der Schmelzpunkt liegt bei A bei etwa 70 °C, bei B bei etwa 87 °C. Erklärung: Durch die Bisulfit-Behandlung werden nur nicht methylierte Cytosine in Uracil umgewandelt; nach der PCR stehen dort U–A-Paare mit zwei Wasserstoffbrücken statt C–G-Paaren mit drei. Je mehr Cytosine methyliert waren, desto mehr C–G-Paare bleiben erhalten und desto höher liegt der Schmelzpunkt. Zwilling B hatte also mehr methylierte Cytosine als Zwilling A. Da eineiige Zwillinge dieselben Gene haben, müssen die Unterschiede auf Umwelteinflüsse zurückgehen.',
      why: [{ text: 'Aufgaben 1 und 2 aus Material A deiner PDF; Werte abgelesen, Lösung abgeleitet.', prov: 'inf', src: [p(20, 'Material A')] }],
    },
    {
      id: 'ep-q8', sub: 'epigenetik', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(21)],
      prompt: 'Warum entwickeln sich Bienenlarven, die weiter Gelée royale erhalten, zu Königinnen?',
      options: [
        'Gelée royale enthält Stoffe, die ein methylierendes Enzym hemmen – Gene z. B. für die Fortpflanzungsfähigkeit bleiben aktiv.',
        'Königinnen haben andere Gene als Arbeiterinnen.',
        'Gelée royale verändert die Basensequenz.',
        'Nur Königinnen werden überhaupt gefüttert.',
      ],
      answer: 0,
      why: [{ text: 'Königinnen und Arbeiterinnen haben identisches Erbgut, aber unterschiedliche Methylierungsmuster.', prov: 'pdf', src: [p(21)] }],
    },
    {
      id: 'ep-q9', sub: 'epigenetik', type: 'single', level: 2, err: 'experiment', prov: 'pdf', src: [p(21)],
      prompt: 'Was geschah, wenn gelbe Agouti-Weibchen in der Schwangerschaft Nahrungsergänzungsstoffe mit vielen Methylgruppen (z. B. Vitamin B12, Folsäure) erhielten?',
      options: ['Sie brachten braune, schlanke Nachkommen zur Welt.', 'Die Nachkommen waren gelb und fettleibig.', 'Die Basensequenz des Agouti-Gens änderte sich.', 'Die Nachkommen hatten kein Agouti-Gen mehr.'],
      answer: 0,
      why: [
        { text: 'Beobachtung laut PDF.', prov: 'pdf', src: [p(21)] },
        { text: 'Deutung: Mehr Methylgruppen → Agouti-Gen stärker methyliert → weniger abgelesen → weniger gelbes Agouti-Signalprotein.', prov: 'inf' },
      ],
    },
    {
      id: 'ep-q10', sub: 'epigenetik', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(21)], operator: 'Ableiten',
      prompt: 'Leite aus den Befunden zu den Agouti-Mäusen ab, dass Genexpression über Methylierung gesteuert wird.',
      rubric: [
        { id: 'sequenz', label: 'Braune und gelbe Mäuse haben dieselbe Basensequenz des Agouti-Gens, aber unterschiedliche Methylierung', any: [['gleich|identisch|dieselbe|keine unterschiede|unterscheiden sich nicht|nicht in der (basen)?sequenz', 'sequenz|basen'], ['methyl', 'unterschied|unterscheid|verschieden|anders']], weight: 1.5 },
        { id: 'nahrung', label: 'Methylgruppenreiche Nahrung der Mutter → braune, schlanke Nachkommen', any: [['vitamin|folsaeure|nahrung|ergaenzung|methylgruppen', 'braun|schlank']], weight: 1 },
        { id: 'mechanismus', label: 'Methylierung unterdrückt die Transkription des Agouti-Gens → weniger Agouti-Signalprotein', any: [['methyl', 'transkription|abgelesen|unterdrueck|abgeschaltet|weniger']], weight: 1.5 },
        { id: 'schluss', label: 'Also steuert die (umweltabhängige) Methylierung die Genexpression, nicht die Sequenz', any: [['umwelt|ernaehrung|steuer|regul|genexpression']], weight: 0.5 },
      ],
      model: 'Braune und gelbe Agouti-Mäuse unterscheiden sich nicht in der Basensequenz des Agouti-Gens, wohl aber in dessen Methylierung. Erhalten gelbe Weibchen während der Schwangerschaft Nahrungsergänzungsstoffe mit vielen Methylgruppen, bekommen sie braune, schlanke Nachkommen. Daraus folgt: Die Nahrung verändert das Methylierungsmuster; ein stärker methyliertes Agouti-Gen wird weniger transkribiert, es entsteht weniger Agouti-Signalprotein (gelbe Fellfarbe, Stoffwechseleffekte). Die Genexpression wird also über die Methylierung gesteuert – ohne Veränderung der Sequenz.',
      why: [
        { text: 'Kompetenz aus deinem Lehrplan (PDF S. 1): „leiten aus umweltbedingten Methylierungsmustern der DNA ab, dass Genexpression über Methylierung gesteuert wird“.', prov: 'pdf', src: [p(1)] },
        { text: 'Die Kausalkette „mehr Methylierung → weniger Agouti-Protein“ ist eine Schlussfolgerung aus PDF S. 20–21.', prov: 'inf', src: [p(20), p(21)] },
      ],
    },
    {
      id: 'ep-q11', sub: 'epigenetik', type: 'single', level: 3, err: 'experiment', prov: 'pdf', src: [p(21)],
      prompt: 'Was zeigte die „Holländische Hungerstudie“?',
      options: [
        'Mangelernährung der Mütter in der Schwangerschaft beeinflusste die Gesundheit der Kinder lebenslang und teils noch die der Enkel.',
        'Hunger verändert die Basensequenz der DNA.',
        'Hunger hat keine Langzeitfolgen.',
        'Epigenetische Muster bleiben über viele Generationen unverändert.',
      ],
      answer: 0,
      feedback: { 3: 'Über mehrere Generationen scheinen die Muster schrittweise verloren gegangen zu sein.' },
      why: [{ text: 'Offenbar blieben epigenetische Muster zumindest teilweise nach der Befruchtung erhalten.', prov: 'pdf', src: [p(21)] }],
    },
    {
      id: 'ep-q12', sub: 'epigenetik', type: 'multi', level: 2, err: 'facts', prov: 'pdf', src: [p(21)],
      prompt: 'Welche Argumente nennt deine PDF dafür, dass die Vererbung epigenetischer Muster unklar ist?',
      options: [
        'Es ist unklar, wie Informationen aus Körperzellen in die Keimzellen gelangen.',
        'Methylierungen werden in der Zygote fast vollständig gelöscht.',
        'Epigenetische Muster existieren nur bei Pflanzen.',
        'Methylierungen werden bei der Replikation nicht kopiert.',
      ],
      answers: [0, 1],
      why: [{ text: 'Trotzdem zeigte eine Studie an Fruchtfliegen, dass Modifikationen der Eizellen im Embryo nachweisbar sind.', prov: 'pdf', src: [p(21)] }],
    },
    {
      id: 'ep-q13', sub: 'epigenetik', type: 'match', level: 3, err: 'inheritance', prov: 'inf', src: [p(21, 'Material B')],
      prompt: 'Wie viele Barr-Körperchen haben die Personen?',
      material: [
        { kind: 'text', md: 'Die Anzahl der Geschlechtschromosomen kann bei bestimmten Personen von der Regel abweichen. Beim **Triple-X-Syndrom** besitzt die Frau drei X-Chromosomen, beim **Turner-Syndrom** nur ein X-Chromosom. Beim **Klinefelter-Syndrom** weist der Mann ein Y- und zwei X-Chromosomen auf. *(PDF S. 21, Material B, Aufgabe 2)*' },
      ],
      pairs: [
        { left: 'Frau (XX)', right: '1' },
        { left: 'Mann (XY)', right: '0' },
        { left: 'Triple-X-Syndrom (XXX)', right: '2' },
        { left: 'Turner-Syndrom (X0)', right: '0' },
        { left: 'Klinefelter-Syndrom (XXY)', right: '1' },
      ],
      why: [
        { text: 'Laut PDF: Frauen haben ein inaktiviertes X (Barr-Körperchen), Männer mit nur einem X keines.', prov: 'pdf', src: [p(21, 'Material B')] },
        { text: 'Daraus folgt: Alle X-Chromosomen bis auf eines werden inaktiviert → Zahl der Barr-Körperchen = Zahl der X − 1.', prov: 'inf' },
      ],
    },
    {
      id: 'ep-q14', sub: 'epigenetik', type: 'free', level: 4, err: 'mechanism', prov: 'pdf', src: [p(21, 'Material B')], operator: 'Erklären',
      prompt: 'Erkläre die Inaktivierung eines X-Chromosoms bei Frauen.',
      rubric: [
        { id: 'xist', label: 'Synthese der Xist-RNA im X-inaktivierenden Zentrum', any: [['xist']], weight: 1.5 },
        { id: 'bindung', label: 'Xist-RNA bindet an ein X-Chromosom; Histone werden methyliert, demethyliert und acetyliert', any: [['histon', 'methyl|acetyl|modifi']], weight: 1 },
        { id: 'verdichtet', label: 'Die DNA wird stärker mit Histonen verpackt und verdichtet → inaktiv (Barr-Körperchen)', any: [['verdicht|verpack|kompakt|barr']], weight: 1 },
        { id: 'zufall', label: 'Zufällig väterliches oder mütterliches X; an Tochterzellen weitergegeben → Mosaik', any: [['zufaellig|mosaik|vaeterlich|muetterlich|tochterzell']], weight: 1 },
      ],
      model: 'In der frühen Embryonalphase wird in Zellen von Frauen eines der beiden X-Chromosomen inaktiviert – zufällig das väterliche oder das mütterliche. Die Inaktivierung beginnt mit der Synthese der Xist-RNA, deren Gen im X-inaktivierenden Zentrum nahe dem Centromer liegt; auf dem anderen X-Chromosom wird dieses Gen inaktiviert. Die Xist-RNA bindet an das zu inaktivierende Chromosom; dadurch werden verschiedene Histone methyliert, demethyliert und acetyliert. Die DNA wird immer stärker mit Histonen verpackt und verdichtet – sie wird nicht mehr abgelesen und ist als Barr-Körperchen sichtbar. Der Zustand wird an die Tochterzellen weitergegeben, sodass ein Mosaik entsteht.',
      why: [{ text: 'Aufgabe 1 aus Material B deiner PDF.', prov: 'pdf', src: [p(21, 'Material B')] }],
    },
    {
      id: 'ep-q15', sub: 'epigenetik', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(20), p(21)], operator: 'Erklären',
      prompt: 'Eineiige Zwillinge unterscheiden sich im Alter stärker als in der Kindheit. Erkläre das mit epigenetischen Mechanismen und begründe, warum solche Unterschiede in den Zellen dauerhaft bestehen bleiben.',
      rubric: [
        { id: 'gene', label: 'Eineiige Zwillinge haben identische Gene (keine genetische Variabilität)', any: [['gleich|identisch', 'gen|erbgut|erbmaterial|dna']], weight: 1 },
        { id: 'umwelt', label: 'Unterschiedliche Umwelteinflüsse (Ernährung, Stress, Lebensweg) verändern Methylierung/Histonmodifikation', any: [['umwelt|ernaehrung|stress|lebensweg|lebensstil|trauma', 'methyl|histon|epigenet|muster']], weight: 1.5 },
        { id: 'expression', label: 'Dadurch werden Gene unterschiedlich stark abgelesen', any: [['abgelesen|aktivitaet|expression|transkription|an ?geschaltet|ab ?geschaltet']], weight: 1 },
        { id: 'replikation', label: 'Die Muster werden bei der Replikation mitkopiert → dauerhaft in Tochterzellen', any: [['replikation|mitkopiert|tochterzell|weitergegeben']], weight: 1 },
        { id: 'zeit', label: 'Mit den Jahren sammeln sich Unterschiede an, besonders bei verschiedenen Lebenswegen', any: [['jahre|alter|laufe|ansammel|sammeln|zunehm|je verschiedener']], weight: 0.5 },
      ],
      model: 'Eineiige Zwillinge haben dieselben Gene. Im Laufe des Lebens wirken aber unterschiedliche Umwelteinflüsse – Ernährung, psychische Belastungen, Lebensweg. Sie verändern das epigenetische Muster: Methylgruppen werden an Cytosine gebunden oder entfernt, Histone werden modifiziert. Dadurch werden bestimmte Gene stärker oder schwächer abgelesen. Weil die Methylierungen bei der Replikation mitkopiert und an die Tochterzellen weitergegeben werden, bleiben die Veränderungen dauerhaft erhalten. Mit den Jahren sammeln sich so immer mehr Unterschiede an – besonders, wenn die Lebenswege sehr verschieden sind. Das passt zur Studie: kaum Unterschiede bei Dreijährigen, deutliche bei Fünfzigjährigen.',
      why: [{ text: 'Verknüpft die Aussagen von PDF S. 20 (Zwillingsstudie, Mitkopieren bei der Replikation) und S. 21 (Umwelteinflüsse).', prov: 'inf', src: [p(20), p(21)] }],
    },
  ],

  experiments: [
    {
      id: 'exp-zwillinge', sub: 'epigenetik', title: 'Methylierungsmuster eineiiger Zwillinge', src: [p(20), p(20, 'Material A')], widget: 'twins-curve',
      steps: [
        { key: 'frage', text: 'Beeinflusst die Umwelt die Aktivität von Genen? Unterscheiden sich die Methylierungsmuster eineiiger Zwillinge?', prov: 'pdf' },
        { key: 'hypothese', text: 'Wenn die Umwelt wirkt, müssten sich die Muster mit zunehmendem Alter und unterschiedlicheren Lebenswegen stärker unterscheiden.', prov: 'inf' },
        { key: 'material', text: 'DNA eineiiger Zwillinge; Bisulfit; PCR; Messung der UV-Absorption bei 260 nm beim langsamen Erhitzen.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Bisulfit wandelt nicht methylierte Cytosine in Uracil um → PCR → DNA langsam erhitzen und Absorption messen (Schmelzkurve, Schmelzpunkt Tₘ).', prov: 'pdf' },
        { key: 'beobachtung', text: 'Studie: Muster bei 3-Jährigen kaum, bei 50-Jährigen deutlich verschieden. Material: Kurve von Zwilling B liegt rechts von A (Tₘ ca. 87 °C vs. ca. 70 °C).', prov: 'pdf', predict: 'Welcher Zwilling hat mehr methylierte Cytosine – der mit dem höheren oder dem niedrigeren Schmelzpunkt?' },
        { key: 'schluss', text: 'Zwilling B hat mehr methylierte Cytosine; die Umwelt verändert das Methylierungsmuster und damit die Genaktivität.', prov: 'inf' },
        { key: 'methode', text: 'Warum Schmelzkurve? C–G-Paare (3 H-Brücken) sind stabiler als U–A-Paare (2). Die Anzahl erhaltener Cytosine – also methylierter Stellen – wird über den Schmelzpunkt messbar.', prov: 'inf' },
      ],
      questionIds: ['ep-q5', 'ep-q6', 'ep-q7'],
    },
    {
      id: 'exp-agouti', sub: 'epigenetik', title: 'Nahrungsergänzung bei Agouti-Mäusen', src: [p(21)],
      steps: [
        { key: 'frage', text: 'Beeinflusst die Ernährung der Mutter die Aktivität des Agouti-Gens bei den Nachkommen?', prov: 'inf' },
        { key: 'material', text: 'Gelbe Agouti-Weibchen; Futter mit bzw. ohne Nahrungsergänzungsstoffe (z. B. Vitamin B12, Folsäure mit vielen Methylgruppen).', prov: 'pdf' },
        { key: 'beobachtung', text: 'Mit Nahrungsergänzung: braune, schlanke Nachkommen. Braune und gelbe Mäuse unterscheiden sich nicht in der Sequenz, aber in der Methylierung des Agouti-Gens.', prov: 'pdf', predict: 'Welche Fellfarbe erwartest du bei den Nachkommen der Weibchen mit Nahrungsergänzung?' },
        { key: 'schluss', text: 'Die Nahrung verändert die Methylierung und damit die Expression des Agouti-Gens.', prov: 'inf' },
      ],
      questionIds: ['ep-q9', 'ep-q10'],
    },
  ],

  examTasks: [
    {
      id: 'kt-zwillinge',
      title: 'Unterscheidung eineiiger Zwillinge',
      subs: ['epigenetik'],
      basedOn: 'Übung nach Material A „Unterscheidung eineiiger Zwillinge“ aus deiner PDF (S. 20)',
      src: [p(20, 'Material A')],
      intro: 'Zur Untersuchung von Methylierungsmustern wird DNA mit Bisulfit behandelt (nicht methylierte Cytosine → Uracil) und per PCR vervielfältigt. Anschließend wird sie langsam erhitzt und die UV-Absorption gemessen. Am Schmelzpunkt Tₘ liegt die Hälfte der DNA einzelsträngig vor.',
      material: [{ kind: 'widget', widget: 'twins-curve', caption: 'Schmelzkurven nach Material A' }],
      parts: ['kz-1', 'kz-2'],
    },
    {
      id: 'kt-xinakt',
      title: 'Inaktivierung von X-Chromosomen',
      subs: ['epigenetik'],
      basedOn: 'Übung nach Material B „Inaktivierung von X-Chromosomen“ aus deiner PDF (S. 21)',
      src: [p(21, 'Material B')],
      intro: 'Bei Frauen wird eines der beiden X-Chromosomen früh in der Embryonalentwicklung inaktiviert und ist als Barr-Körperchen sichtbar. Die Inaktivierung beginnt mit der Synthese der Xist-RNA.',
      material: [
        { kind: 'text', md: 'Beim **Triple-X-Syndrom** besitzt eine Frau drei X-Chromosomen, beim **Turner-Syndrom** nur eines. Beim **Klinefelter-Syndrom** hat ein Mann ein Y- und zwei X-Chromosomen.' },
      ],
      parts: ['kx-1', 'kx-2'],
    },
    {
      id: 'kt-sirna',
      title: 'RNA-Interferenz bei der Virusabwehr',
      subs: ['genregulation'],
      basedOn: 'Übung nach Material A „RNA-Interferenz bei der Virusabwehr“ aus deiner PDF (S. 19)',
      src: [p(19, 'Material A')],
      intro: 'RNA-Interferenz spielt eine wichtige Rolle bei der pflanzlichen Abwehr gegen doppelsträngige RNA-Viren. Nach einer Infektion zerlegt das Enzym Dicer die Virus-RNA in kurze Abschnitte, die siRNA.',
      material: [
        { kind: 'text', md: 'Abbildung (beschrieben): Doppelsträngige Virus-RNA (dsRNA) → Dicer → siRNA → RISC-Proteinkomplex → Bindung an mRNA → Abbau der mRNA.' },
      ],
      parts: ['ks-1', 'ks-2'],
    },
  ],
};

regulation.questions.push(
  {
    id: 'kz-1', sub: 'epigenetik', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(20, 'Material A')], operator: 'Beschreiben',
    prompt: 'Beschreibe die Versuchsbeobachtungen bei der Analyse der Methylierungsmuster der Zwillinge.',
    rubric: [
      { id: 'form', label: 'Beide Kurven: Absorption steigt beim Erhitzen s-förmig an (DNA wird einzelsträngig)', any: [['steig|zunehm|anstieg', 'absorption|kurve']], weight: 1 },
      { id: 'lage', label: 'Die Kurve von B liegt bei höheren Temperaturen als die von A', any: [['\\bb\\b', 'hoeher|rechts|spaeter|groesser']], weight: 1.5 },
      { id: 'werte', label: 'Tₘ(A) ≈ 70 °C, Tₘ(B) ≈ 87 °C', any: [['70|7\\d', '8\\d|87']], weight: 1 },
    ],
    model: 'Bei beiden Zwillingen steigt die UV-Absorption beim Erhitzen s-förmig an – die DNA geht zunehmend in Einzelstränge über. Die Kurve von Zwilling B ist aber zu höheren Temperaturen verschoben: Zwilling A erreicht den Schmelzpunkt bei etwa 70 °C, Zwilling B erst bei etwa 87 °C. Oberhalb von etwa 110 °C liegt bei beiden die DNA vollständig einzelsträngig vor.',
    why: [{ text: 'Werte aus der Abbildung abgelesen (ca.-Angaben).', prov: 'inf', src: [p(20, 'Material A')] }],
  },
  {
    id: 'kz-2', sub: 'epigenetik', type: 'free', level: 5, err: 'experiment', prov: 'inf', src: [p(20, 'Material A')], operator: 'Erklären',
    prompt: 'Erkläre, warum sich die Versuchsbeobachtungen bei den eineiigen Zwillingen unterscheiden.',
    rubric: [
      { id: 'bisulfit', label: 'Bisulfit: nur nicht methylierte C → U; nach PCR U–A statt C–G', any: [['bisulfit|uracil|u a|umgewandelt']], weight: 1 },
      { id: 'hbr', label: 'C–G hat 3, U–A 2 Wasserstoffbrücken → mehr C–G = höherer Tₘ', any: [['drei|3', 'zwei|2'], ['wasserstoff', 'mehr|hoeher']], weight: 1 },
      { id: 'deutung', label: 'B hat mehr methylierte Cytosine als A', any: [['\\bb\\b', 'mehr', 'methyl'], ['\\ba\\b', 'weniger', 'methyl']], weight: 1.5 },
      { id: 'umwelt', label: 'Ursache: unterschiedliche Umwelteinflüsse/Lebenswege bei gleichen Genen', any: [['umwelt|lebensweg|ernaehrung|stress|epigenet']], weight: 1 },
    ],
    model: 'Durch Bisulfit werden nur nicht methylierte Cytosine in Uracil umgewandelt; methylierte Cytosine bleiben erhalten. Nach der PCR stehen an den Stellen ehemals unmethylierter Cytosine U–A-Paare mit zwei, an methylierten Stellen C–G-Paare mit drei Wasserstoffbrücken. Je mehr methylierte Cytosine, desto mehr Wasserstoffbrücken – und desto höher der Schmelzpunkt. Zwilling B hatte also mehr methylierte Cytosine in den untersuchten Abschnitten als Zwilling A. Da die Zwillinge genetisch identisch sind, geht der Unterschied auf verschiedene Umwelteinflüsse zurück, die das Methylierungsmuster verändert haben.',
    why: [{ text: 'Aufgabe 2 aus Material A deiner PDF; Lösung abgeleitet.', prov: 'inf', src: [p(20, 'Material A')] }],
  },
  {
    id: 'kx-1', sub: 'epigenetik', type: 'free', level: 4, err: 'mechanism', prov: 'pdf', src: [p(21, 'Material B')], operator: 'Erklären',
    prompt: 'Erkläre die Inaktivierung des X-Chromosoms.',
    rubric: [
      { id: 'xist', label: 'Xist-RNA aus dem X-inaktivierenden Zentrum', any: [['xist']], weight: 1.5 },
      { id: 'histone', label: 'Bindung an ein X; Histone werden methyliert, demethyliert, acetyliert', any: [['histon', 'methyl|acetyl']], weight: 1 },
      { id: 'verdichtung', label: 'DNA wird stärker verpackt/verdichtet → Barr-Körperchen, nicht mehr abgelesen', any: [['verdicht|verpack|barr|inaktiv']], weight: 1 },
      { id: 'mosaik', label: 'Zufällige Auswahl, Weitergabe an Tochterzellen → Mosaik', any: [['zufaellig|mosaik|tochterzell']], weight: 0.5 },
    ],
    model: 'Die Inaktivierung beginnt mit der Synthese der Xist-RNA; ihr Gen liegt im X-inaktivierenden Zentrum nahe dem Centromer, auf dem homologen X wird es inaktiviert. Die Xist-RNA-Moleküle binden an ein X-Chromosom. Dadurch werden verschiedene Histone methyliert, demethyliert und acetyliert, und die DNA wird immer stärker mit Histonen verpackt und verdichtet. Das Chromosom wird nicht mehr abgelesen und erscheint als Barr-Körperchen. Welches X inaktiviert wird, ist zufällig; der Zustand wird an die Tochterzellen weitergegeben.',
    why: [{ text: 'Aufgabe 1 aus Material B deiner PDF.', prov: 'pdf', src: [p(21, 'Material B')] }],
  },
  {
    id: 'kx-2', sub: 'epigenetik', type: 'free', level: 4, err: 'inheritance', prov: 'inf', src: [p(21, 'Material B')], operator: 'Erläutern',
    prompt: 'Erläutere, wie viele Barr-Körperchen bei Triple-X-, Turner- und Klinefelter-Syndrom vorhanden sind.',
    rubric: [
      { id: 'regel', label: 'Regel: Alle X-Chromosomen bis auf eines werden inaktiviert', any: [['bis auf (ein|1)|alle ausser|alle (weiteren|anderen|uebrigen)|nur ein(es)? (x )?(chromosom )?(bleibt )?aktiv|bleibt nur ein(es)?|minus (ein|1)|x ?− ?1']], weight: 1.5 },
      { id: 'triple', label: 'Triple-X (XXX): 2 Barr-Körperchen', any: [['triple|xxx', 'zwei|2']], weight: 1 },
      { id: 'turner', label: 'Turner (X0): kein Barr-Körperchen', any: [['turner|\\bx ?[0o]\\b', 'kein|null|\\b0\\b']], weight: 1 },
      { id: 'kline', label: 'Klinefelter (XXY): 1 Barr-Körperchen', any: [['klinefelter|xxy', 'ein|1']], weight: 1 },
    ],
    model: 'In jeder Zelle bleibt nur ein X-Chromosom aktiv; alle weiteren werden inaktiviert und erscheinen als Barr-Körperchen (Anzahl = Zahl der X-Chromosomen − 1). Triple-X (XXX): zwei Barr-Körperchen. Turner-Syndrom (X0): kein Barr-Körperchen, weil nur ein X vorhanden ist. Klinefelter-Syndrom (XXY): ein Barr-Körperchen – wie bei Frauen, obwohl die Betroffenen Männer sind.',
    why: [
      { text: 'Deine PDF zeigt: Frauen (XX) haben ein Barr-Körperchen, Männer (XY) keines.', prov: 'pdf', src: [p(21, 'Material B')] },
      { text: 'Die Regel „X − 1“ ist daraus abgeleitet.', prov: 'inf' },
    ],
  },
  {
    id: 'ks-1', sub: 'genregulation', type: 'free', level: 4, err: 'mechanism', prov: 'inf', src: [p(19, 'Material A')], operator: 'Beschreiben',
    prompt: 'Beschreibe die Wirkung der siRNA-Moleküle bei der pflanzlichen Virusabwehr.',
    rubric: [
      { id: 'dicer', label: 'Dicer zerlegt die doppelsträngige Virus-RNA in kurze siRNA', any: [['dicer|zerlegt|zerschnitten|haeck']], weight: 1 },
      { id: 'risc', label: 'siRNA wird im RISC-Komplex gebunden (in Einzelstränge getrennt)', any: [['risc']], weight: 1 },
      { id: 'mrna', label: 'Sie bindet komplementär an die Virus-mRNA', any: [['komplementaer|passend|bindet', 'mrna|rna']], weight: 1 },
      { id: 'abbau', label: 'Die mRNA wird abgebaut, Virusproteine werden nicht gebildet → Vermehrung gestoppt', any: [['abbau|abgebaut|zerstoert|keine (virus)?proteine|vermehrung']], weight: 1 },
    ],
    model: 'Nach der Infektion zerlegt das Enzym Dicer die doppelsträngige Virus-RNA in kurze Abschnitte, die siRNA. Diese werden an den RISC-Proteinkomplex gebunden und in Einzelstränge getrennt. Ein Strang bindet komplementär an passende Virus-RNA (mRNA) in der Zelle. Diese wird daraufhin abgebaut; die Viren können ihre Proteine nicht mehr bilden und sich nicht vermehren.',
    why: [{ text: 'Aufgabe 1 aus Material A deiner PDF; der Abbau der mRNA ist in der Abbildung gezeigt.', prov: 'inf', src: [p(19, 'Material A')] }],
  },
  {
    id: 'ks-2', sub: 'genregulation', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(19, 'Material A')], operator: 'Erklären',
    prompt: 'Erkläre, wie man synthetisch hergestellte siRNA-Moleküle zur Behandlung menschlicher Krankheiten einsetzen könnte, und nenne eine Voraussetzung.',
    rubric: [
      { id: 'komplementaer', label: 'siRNA komplementär zur mRNA eines krankheitsauslösenden Gens herstellen', any: [['komplementaer|passend|gezielt', 'mrna|gen']], weight: 1.5 },
      { id: 'wirkung', label: 'Über RISC wird diese mRNA gebunden und abgebaut → schädliches Protein fehlt', any: [['risc|abbau|abgebaut|blockier|stumm|abschalt']], weight: 1.5 },
      { id: 'voraussetzung', label: 'Voraussetzung: Sequenz des Zielgens muss bekannt sein / siRNA muss in die Zielzellen gelangen', any: [['sequenz|bekannt|gelangen|transport|zellen']], weight: 1 },
    ],
    model: 'Man stellt siRNA her, die komplementär zur mRNA eines Gens ist, das eine Krankheit auslöst – zum Beispiel eines Virusgens oder eines mutierten Gens, dessen Produkt schadet. In der Zelle wird die siRNA im RISC-Komplex genutzt: Sie bindet an die passende mRNA, die Translation wird blockiert und die mRNA abgebaut. Das schädliche Protein wird nicht mehr gebildet. Voraussetzung ist, dass die Basensequenz des Zielgens bekannt ist und die siRNA in die betroffenen Zellen gelangt.',
    why: [{ text: 'Aufgabe 2 aus Material A deiner PDF; keine Lösung in der PDF, Antwort abgeleitet.', prov: 'inf', src: [p(19, 'Material A')] }],
  },
);
