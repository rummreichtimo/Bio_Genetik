import type { ContentPack } from '../index';
import { p } from '../helpers';

const INSULIN_EXT = { label: 'Wikipedia: Insulin', url: 'https://de.wikipedia.org/wiki/Insulin' };

/**
 * Kapitel 3 (Teil 2) · Translation, Eukaryoten, Mutationen, Klausuraufgaben (PDF S. 12–17)
 */
export const genproduktB: ContentPack = {
  lessons: [
    {
      sub: 'translation',
      intro: 'An einem mRNA-Strang hängen zahlreiche Ribosomen. Wie entsteht dort ein Polypeptid?',
      sections: [
        {
          id: 'ueberblick',
          title: 'Überblick',
          blocks: [
            {
              kind: 'text',
              md: 'Bei der **Translation** wird die mRNA an den **Ribosomen** in eine Polypeptidkette mit bestimmter Sequenz übersetzt. Der genetische Code dient als „Übersetzungsvorschrift“. Beteiligt sind mRNA, Ribosomen, Enzyme, Aminosäuren und **tRNA**-Moleküle.',
              src: [p(12)],
            },
          ],
        },
        {
          id: 'trna',
          title: 'Bau und Beladung der tRNA',
          blocks: [
            {
              kind: 'bullets',
              title: 'Bau der tRNA',
              items: [
                'etwa **80 Nucleotide**; komplementäre Basenpaarung innerhalb des Moleküls bildet doppelsträngige Bereiche',
                'Windungen und Faltungen ergeben eine **L-förmige** Raumstruktur',
                'am kurzen Arm: das **3\'-Ende mit der Aminosäurebindungsstelle** – bei allen tRNAs mit der Basenfolge **CCA**',
                'am Ende des langen Arms: das **Anticodon** – ein Basentriplett, mit dem die tRNA an ein komplementäres Codon der mRNA bindet',
              ],
              src: [p(12)],
            },
            {
              kind: 'text',
              md: 'Beladen wird die tRNA durch das Enzym **tRNA-Synthetase**. Es gibt **20** verschiedene – eine für jede Aminosäure. Jede hat zwei spezifische Bindungsstellen: eine für die Aminosäure, eine für die tRNA mit ihrem Anticodon. Sind beide besetzt, verknüpft sie Aminosäure und tRNA. So trägt jede beladene tRNA die zu ihrem Anticodon passende Aminosäure – sie ist eine Art **„Dolmetscher“**.',
              src: [p(12)],
            },
          ],
        },
        {
          id: 'ribosom',
          title: 'Bau der Ribosomen',
          blocks: [
            {
              kind: 'compare',
              columns: ['kleine Untereinheit', 'große Untereinheit'],
              rows: [
                { label: 'Bindet', cells: ['die mRNA (mRNA-Bindestelle)', 'drei tRNA-Moleküle (A-, P-, E-Stelle)'] },
                { label: 'Aufgabe', cells: ['Ablesen der mRNA', 'Verknüpfen der Aminosäuren'] },
              ],
              src: [p(12)],
            },
            {
              kind: 'bullets',
              items: [
                '**A-Stelle** (Aminoacyl-tRNA-Bindestelle): Ribosomeneingang – hier bindet eine beladene tRNA.',
                '**P-Stelle** (Peptidyl-tRNA-Bindestelle): hier wird die Aminosäure mit der wachsenden Polypeptidkette verbunden.',
                '**E-Stelle** (Exit-Stelle): entladene tRNAs verlassen das Ribosom.',
              ],
              src: [p(12)],
            },
            { kind: 'widget', widget: 'ribosome', caption: 'Ribosom mit A-, P- und E-Stelle – tippe auf die Markierungen.', src: [p(12, 'Abb. 4')] },
          ],
        },
        {
          id: 'ablauf',
          title: 'Ablauf: Start, Verlängerung, Abbruch',
          blocks: [
            {
              kind: 'steps',
              steps: [
                { title: 'Start', text: 'Die mRNA lagert sich an die **kleine Untereinheit** an. Diese wandert Richtung 3\'-Ende, bis sie auf das **Startcodon AUG** trifft. Eine tRNA mit dem Anticodon **UAC** lagert sich an; dann verbinden sich große und kleine Untereinheit.' },
                { title: 'Verlängerung 1', text: 'Die Start-tRNA mit **Methionin** sitzt in der **P-Stelle**. An das Codon in der **A-Stelle** lagert sich die nächste tRNA an.' },
                { title: 'Verlängerung 2', text: 'Methionin wird an die Aminosäure der tRNA in der A-Stelle gebunden – ein Dipeptid hängt an der tRNA in der A-Stelle.' },
                { title: 'Verlängerung 3', text: 'Das Ribosom wandert **ein Codon** weiter: die tRNA mit dem Dipeptid rückt von A nach P, die entladene Start-tRNA von P nach **E** und verlässt das Ribosom (sie kann neu beladen werden). Das wiederholt sich Codon für Codon.' },
                { title: 'Abbruch', text: 'Gelangt ein **Stoppcodon** (UAA, UAG, UGA) in die A-Stelle, bricht die Translation ab – es gibt keine passende tRNA. Das Ribosom zerfällt in seine Untereinheiten und gibt das Polypeptid frei.' },
              ],
              src: [p(13)],
            },
            { kind: 'check', questionIds: ['tl-q6', 'tl-q18'] },
          ],
        },
        {
          id: 'polysomen',
          title: 'Polysomen',
          blocks: [
            {
              kind: 'text',
              md: 'Bakterien besitzen keinen Zellkern – bei ihnen laufen Transkription und Translation **synchron im Cytoplasma** ab. Meist binden gleichzeitig mehrere Ribosomen an ein mRNA-Molekül; diese Aufreihung heißt **Polysom**. Da an jedem Ribosom dieselbe Polypeptidkette entsteht, bilden sich sehr schnell viele Kopien.',
              src: [p(13)],
            },
          ],
        },
        {
          id: 'versuche',
          title: 'Versuche: Was braucht die Proteinbiosynthese?',
          blocks: [
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Material A: Zellfreies System aus Mausleber',
              md: 'mRNA und tRNA wurden enzymatisch abgebaut, dann radioaktiv markierte Aminosäuren (¹⁴C) und verschiedene Nucleinsäuren zugegeben: **+ mRNA → keine Proteine · + tRNA → keine Proteine · + mRNA und tRNA → radioaktive Proteine.**',
              src: [p(12, 'Material A')],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Material B: Wirkort eines Antibiotikums',
              md: 'Ribosomen aus Bakterien wurden in kleine und große Untereinheiten getrennt; nur Ansatz 1 bekam das Antibiotikum. Dann wurde jede behandelte Untereinheit mit der jeweils **anderen, unbehandelten** Untereinheit kombiniert und in ein ribosomenfreies zellfreies System gegeben.',
              src: [p(13, 'Material B')],
            },
            { kind: 'check', questionIds: ['tl-q12', 'tl-q14'] },
          ],
        },
      ],
    },
    {
      sub: 'eukaryoten',
      intro: 'Radioaktiv markiertes Methionin, ins Blut gespritzt, taucht nach und nach in Proteinen des Gehirns auf. Wie läuft die Proteinbiosynthese in eukaryotischen Zellen?',
      sections: [
        {
          id: 'mosaikgene',
          title: 'Mosaikgene: Exons und Introns',
          blocks: [
            {
              kind: 'text',
              md: 'Eukaryotische Gene enthalten – anders als prokaryotische – Nucleotidsequenzen, die kein Polypeptid codieren: die **Introns**. Die codierenden Abschnitte heißen **Exons**. Weil sie aus codierenden und nicht codierenden Sequenzen bestehen, nennt man sie **Mosaikgene**.',
              src: [p(14)],
            },
          ],
        },
        {
          id: 'prozessierung',
          title: 'RNA-Prozessierung',
          blocks: [
            {
              kind: 'text',
              md: 'Das genetische Material der Eukaryoten liegt in einer **Kernhülle**. Transkription und Translation sind deshalb **räumlich und zeitlich getrennt**. Das Mosaikgen wird zunächst durchgängig transkribiert – es entsteht die **prä-mRNA**, die den Kern noch nicht verlässt.',
              src: [p(14)],
            },
            {
              kind: 'steps',
              steps: [
                { title: 'cap-Struktur (5\'-Ende)', text: 'Eine modifizierte Guanin-Base wird angehängt. Sie **schützt das 5\'-Ende** vor enzymatischem Abbau und **erleichtert das Anlagern an die Ribosomen**.' },
                { title: 'Poly-A-Schwanz (3\'-Ende)', text: 'Bis zu **300 Adenin-Nucleotide** werden angefügt. Sie **erleichtern den Export** ins Cytoplasma und **schützen das 3\'-Ende** vor Abbau.' },
                { title: 'Spleißen', text: 'Die **Introns werden herausgeschnitten**, die Exons zu einer zusammenhängenden mRNA verknüpft.' },
                { title: 'Export', text: 'Die **reife mRNA** verlässt den Kern über eine **Kernpore** und wird an den Ribosomen translatiert. Cap und Poly-A-Schwanz werden nicht übersetzt, sind aber wichtig für die Regulation der Translation.' },
              ],
              src: [p(14)],
            },
          ],
        },
        {
          id: 'alternativ',
          title: 'Alternatives Spleißen',
          blocks: [
            {
              kind: 'text',
              md: 'Die prä-mRNA kann auch **unterschiedlich zusammengeschnitten** werden: Dabei können zusätzlich ein oder mehrere **Exons entfernt** werden. So entstehen aus derselben prä-mRNA **verschiedene reife mRNAs** – die **Vielfalt an Proteinen** pro Gen steigt. Das erklärt, warum der Mensch mit vergleichsweise wenigen Genen auskommt.',
              src: [p(14), p(19)],
            },
            {
              kind: 'note',
              tone: 'warn',
              title: 'Zwei Zahlenangaben in deiner PDF',
              md: 'PDF S. 14: „etwa 25 000 proteincodierende Gene“ und „mindestens die Hälfte aller Gene gespleißt“. PDF S. 19: „rund 20 000 Gene“ und „bis zu 50 Prozent“ alternativ gespleißt. Die Kernaussage ist dieselbe: wenige Gene, viele Proteine.',
              src: [p(14), p(19)],
            },
            { kind: 'check', questionIds: ['eu-q5', 'eu-q12'] },
          ],
        },
        {
          id: 'ptm',
          title: 'Posttranslationale Modifikation',
          blocks: [
            {
              kind: 'text',
              md: 'Das entstandene Polypeptid wird oft noch in mehreren Schritten verändert: Aminosäuren oder kurze Peptide werden von den Enden oder aus der Mitte **enzymatisch entfernt**; manche Proteine werden erst durch **Anheften oder Abspalten von Phosphatgruppen** aktiviert oder inaktiviert. Die Gesamtheit dieser Vorgänge heißt **posttranslationale Modifikation**. Erst dadurch erhalten viele Proteine ihre endgültige Raumstruktur – aus dem Polypeptid wird ein **funktionsfähiges Protein**.',
              src: [p(14)],
            },
          ],
        },
        {
          id: 'insulin',
          title: 'Beispiel: Insulinsynthese',
          blocks: [
            {
              kind: 'text',
              md: 'Insulin wird in den **Betazellen der Bauchspeicheldrüse** gebildet und besteht aus der **A-Kette (21 Aminosäuren)** und der **B-Kette (30 Aminosäuren)**, verbunden über **zwei Disulfidbrücken**. Es entsteht über inaktive Vorstufen mit **Signalsequenzen** für den Transport durch Membranen. In Golgi-Vesikeln wird es als **Proinsulin** mit einer dritten Kette, der **C-Kette**, gespeichert. Vor der Freisetzung ins Blut wird die C-Kette herausgeschnitten → aktives Insulin.',
              src: [p(14, 'Material A')],
            },
            {
              kind: 'steps',
              title: 'Die Zahlen aus Material A – aufgeschlüsselt',
              steps: [
                { title: '1426 Nucleotide', text: 'Das Insulin-Gen wird durchgängig transkribiert → prä-mRNA mit 1426 Nucleotiden.' },
                { title: '330 Nucleotide', text: 'Nach der Prozessierung bleibt die reife mRNA: laut Abbildung 72 + 90 + 62 + 43 + 63 = 330 Nucleotide.' },
                { title: '110 Aminosäuren', text: '330 Nucleotide = 110 Codons → Translationsprodukt aus Signalsequenz (24 AS) + B-Kette (30) + C-Kette (35) + A-Kette (21).' },
                { title: '86 Aminosäuren', text: 'Nach Abspaltung der Signalsequenz: Proinsulin (30 + 35 + 21).' },
                { title: '51 Aminosäuren', text: 'Nach Herausschneiden der C-Kette: Insulin (30 + 21).' },
              ],
              src: [p(14, 'Material A')],
              prov: 'inf',
            },
          ],
        },
      ],
    },
    {
      sub: 'mutationen',
      intro: 'Plötzlicher Herztod bei jungen Sportlerinnen und Sportlern hat oft eine erbliche Ursache. Wie lassen sich solche Veränderungen molekular erklären?',
      sections: [
        {
          id: 'arten',
          title: 'Was sind Mutationen?',
          blocks: [
            {
              kind: 'text',
              md: 'Veränderungen der DNA einer Zelle heißen **Mutationen**. Sie führen zu neuen Allelen und Genen und sind eine wesentliche Ursache der **genetischen Vielfalt**. Sie können **spontan** entstehen (Fehler bei der Replikation, chemische Veränderungen der Basen) oder durch **äußere Einflüsse** wie chemische Substanzen oder UV-Strahlen.',
              src: [p(15)],
            },
            {
              kind: 'compare',
              columns: ['betrifft'],
              rows: [
                { label: 'Genommutation', cells: ['die Anzahl der Chromosomen'] },
                { label: 'Chromosomenmutation', cells: ['die Struktur eines Chromosoms'] },
                { label: 'Genmutation', cells: ['ein einzelnes Gen'] },
              ],
              src: [p(15)],
            },
          ],
        },
        {
          id: 'substitution',
          title: 'Punktmutationen: Substitutionen',
          blocks: [
            {
              kind: 'text',
              md: '**Punktmutationen** betreffen einzelne Basenpaare: **Substitution** (Austausch), **Insertion** (zusätzliches Basenpaar), **Deletion** (Basenpaar entfernt).',
              src: [p(15)],
            },
            {
              kind: 'compare',
              columns: ['Wo?', 'Folge'],
              rows: [
                { label: 'Missense-Mutation', cells: ['meist 1. oder 2. Stelle eines Tripletts', 'falsche Aminosäure; Funktion kann stark beeinträchtigt sein – oder folgenlos bei ähnlichen Eigenschaften'] },
                { label: 'stumme Mutation', cells: ['häufig 3. Stelle', 'anderes Codon, aber meist dieselbe Aminosäure (Code ist degeneriert)'] },
                { label: 'Nonsense-Mutation', cells: ['es entsteht ein Stoppcodon', 'vorzeitiger Abbruch der Translation, Polypeptid meist funktionslos'] },
              ],
              src: [p(15)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Beispiel familiäre Kardiomyopathie',
              md: 'Eine Basensubstitution tauscht in einem Herzmuskelprotein **Leucin gegen Phenylalanin**. Das verändert die **Tertiärstruktur** und massiv die Aktivität des Proteins.',
              src: [p(15)],
            },
            { kind: 'widget', widget: 'mutation-lab', caption: 'Mutationslabor mit dem DNA-Abschnitt aus Material A: Tausche Basen aus und beobachte die Folgen.', src: [p(15, 'Material A')] },
            { kind: 'check', questionIds: ['mu-q3', 'mu-q6'] },
          ],
        },
        {
          id: 'raster',
          title: 'Insertionen, Deletionen und Rasterschub',
          blocks: [
            {
              kind: 'text',
              md: 'Weil der Code **kommafrei** ist, verschiebt eine Insertion oder Deletion das **Leseraster** aller nachfolgenden Tripletts – eine **Rasterschub-Mutation**, sofern nicht drei (oder ein Vielfaches von drei) Basenpaare betroffen sind. Es werden andere Aminosäuren codiert oder durch ein neues Stoppcodon bricht die Translation vorzeitig ab. Meist entsteht ein **funktionsloses Protein**.',
              src: [p(16)],
            },
            {
              kind: 'note',
              tone: 'warn',
              title: 'Hinweis zu Material B (Insulin-Mutation)',
              md: 'Die abgebildete mutierte mRNA ergibt mit der Codesonne nach Glu: **Ala-Val-Leu-Leu-Leu-His-Leu**. Gedruckt ist „Ala Val Leu **His Ile** His Leu“. Am Mutationstyp ändert das nichts.',
              src: [p(16, 'Material B')],
            },
            { kind: 'check', questionIds: ['mu-q9', 'mu-q18'] },
          ],
        },
        {
          id: 'bedeutung',
          title: 'Bedeutung von Mutationen',
          blocks: [
            {
              kind: 'bullets',
              items: [
                'Negative Folgen, wenn **codierende Abschnitte** betroffen sind und die Funktion des Genprodukts beeinträchtigt ist – oft Krankheiten.',
                'Viele Mutationen bleiben **ohne Folgen**: stumme Mutationen oder Mutationen in nicht codierenden Abschnitten.',
                'Selten **positiv**: Etwa jeder hundertste Europäer ist angeboren resistent gegen HIV – durch eine Mutation im Gen für ein Rezeptorprotein, das das Virus zum Eindringen braucht.',
              ],
              src: [p(16)],
            },
          ],
        },
        {
          id: 'modifikation',
          title: 'Modifikationen: Umwelt statt Gene',
          blocks: [
            {
              kind: 'text',
              md: 'Löwenzahn wächst im Tiefland hoch mit kurzer Wurzel, im Hochland klein mit langer Wurzel. Eine Tieflandpflanze wurde geteilt: Die genetisch identischen Hälften entwickelten sich im Tal zur Tiefland-, im Gebirge zur Hochlandform. Die Veränderung des Phänotyps ist allein umweltbedingt – eine **Modifikation**. Umwelteinflüsse aktivieren bzw. deaktivieren verschiedene Gene. Ohne Übergänge: **umschlagende Modifikation**.',
              src: [p(16)],
            },
            {
              kind: 'text',
              md: 'Bei **Pantoffeltierchen** zeigen Klone (genetisch identische Individuen) eine typische **Variationskurve** der Zellgröße. Klone aus den kleinsten oder größten Tieren zeigen dieselbe Kurve wie die Ausgangspopulation: Die Zellgröße ist nicht genetisch fixiert. Erblich festgelegt ist die **Reaktionsnorm** – der Bereich, in dem das Merkmal schwanken kann. Innerhalb davon bestimmen Umweltfaktoren wie Lichtintensität oder Sauerstoffgehalt die Größe: **fließende Modifikation**.',
              src: [p(16)],
            },
            { kind: 'check', questionIds: ['mu-q16'] },
          ],
        },
      ],
    },
  ],

  terms: [
    { id: 'tl-anticodon', sub: 'translation', term: 'Anticodon', def: 'Basentriplett am Ende des langen Arms der tRNA, mit dem sie an ein komplementäres Codon der mRNA bindet.', simple: 'Das Gegenstück zum Codon – wie ein passender Schlüssel.', src: [p(12)] },
    { id: 'tl-asbs', sub: 'translation', term: 'Aminosäurebindungsstelle', def: '3\'-Ende am kurzen Arm der tRNA mit der Basenfolge CCA; hier wird die Aminosäure gebunden.', simple: 'Der Haken, an dem die Aminosäure hängt.', src: [p(12)] },
    { id: 'tl-synthetase', sub: 'translation', term: 'tRNA-Synthetase', def: 'Enzym mit Bindungsstellen für eine bestimmte Aminosäure und die passende tRNA; verknüpft beide. Es gibt 20 verschiedene.', simple: 'Belädt jede tRNA mit der richtigen Aminosäure.', src: [p(12)] },
    { id: 'tl-ribosom', sub: 'translation', term: 'Ribosom', def: 'Ort der Translation aus kleiner Untereinheit (bindet und liest mRNA) und großer Untereinheit (verknüpft Aminosäuren; A-, P-, E-Stelle).', simple: 'Die Proteinfabrik.', src: [p(12)] },
    { id: 'tl-a', sub: 'translation', term: 'A-Stelle', def: 'Aminoacyl-tRNA-Bindestelle am Ribosomeneingang; hier bindet jeweils eine beladene tRNA.', simple: 'Der Eingang.', src: [p(12)] },
    { id: 'tl-p', sub: 'translation', term: 'P-Stelle', def: 'Peptidyl-tRNA-Bindestelle; hier wird die Aminosäure mit der wachsenden Polypeptidkette verbunden.', simple: 'Die Werkbank.', src: [p(12)] },
    { id: 'tl-e', sub: 'translation', term: 'E-Stelle', def: 'Exit-Stelle, über die entladene tRNA-Moleküle das Ribosom verlassen.', simple: 'Der Ausgang.', src: [p(12)] },
    { id: 'tl-polysom', sub: 'translation', term: 'Polysom', def: 'Aufreihung mehrerer Ribosomen an einem mRNA-Molekül; an jedem entsteht dieselbe Polypeptidkette.', simple: 'Mehrere Fabriken an einem Bauplan.', src: [p(13)] },
    { id: 'tl-antibiotika', sub: 'translation', term: 'Antibiotika', def: 'Stoffe, die das Wachstum von Bakterien hemmen oder sie abtöten, z. B. indem sie deren Proteinbiosynthese beeinflussen.', simple: 'Medikamente gegen Bakterien.', src: [p(13, 'Material B'), p(17)] },
    { id: 'eu-intron', sub: 'eukaryoten', term: 'Intron', def: 'Nucleotidsequenz eukaryotischer Gene, die kein Polypeptid codiert; wird beim Spleißen entfernt.', simple: 'Füllstück im Gen, das herausgeschnitten wird.', src: [p(14)] },
    { id: 'eu-exon', sub: 'eukaryoten', term: 'Exon', def: 'Codierende Nucleotidsequenz eines eukaryotischen Gens; Exons werden zur reifen mRNA verknüpft.', simple: 'Der Teil des Gens, der wirklich übersetzt wird.', src: [p(14)] },
    { id: 'eu-mosaik', sub: 'eukaryoten', term: 'Mosaikgen', def: 'Eukaryotisches Gen aus codierenden (Exons) und nicht codierenden Sequenzen (Introns).', simple: 'Ein Gen aus abwechselnden Teilen.', src: [p(14)] },
    { id: 'eu-praemrna', sub: 'eukaryoten', term: 'prä-mRNA', def: 'Vorstufe der mRNA, die durch durchgängige Transkription eines Mosaikgens entsteht und den Kern nicht verlässt.', simple: 'Der ungeschnittene Rohentwurf.', src: [p(14)] },
    { id: 'eu-cap', sub: 'eukaryoten', term: 'cap-Struktur', def: 'Modifizierte Guanin-Base am 5\'-Ende der mRNA; schützt vor enzymatischem Abbau und erleichtert das Anlagern an die Ribosomen.', simple: 'Eine Schutzkappe vorne.', src: [p(14)] },
    { id: 'eu-polya', sub: 'eukaryoten', term: 'Poly-A-Schwanz', def: 'Bis zu 300 Adenin-Nucleotide am 3\'-Ende; erleichtern den Export ins Cytoplasma und schützen vor Abbau.', simple: 'Ein Schutzschwanz hinten.', src: [p(14)] },
    { id: 'eu-spleissen', sub: 'eukaryoten', term: 'Spleißen', def: 'Herausschneiden der Introns aus der prä-mRNA und Verknüpfen der Exons.', simple: 'Zuschneiden des Entwurfs.', src: [p(14)] },
    { id: 'eu-altspleiss', sub: 'eukaryoten', term: 'alternatives Spleißen', def: 'Unterschiedliches Zusammenschneiden der prä-mRNA, wobei auch Exons entfernt werden können; aus einem Gen entstehen verschiedene reife mRNAs und Proteine.', simple: 'Ein Gen, mehrere Schnittfassungen, mehrere Proteine.', src: [p(14), p(19)] },
    { id: 'eu-prozessierung', sub: 'eukaryoten', term: 'Prozessierung (Reifung) der mRNA', def: 'Gesamtheit der Veränderungen von der prä-mRNA zur reifen mRNA: cap, Poly-A-Schwanz, Spleißen.', simple: 'Aus dem Rohentwurf wird die fertige Anleitung.', src: [p(14)] },
    { id: 'eu-ptm', sub: 'eukaryoten', term: 'Posttranslationale Modifikation', def: 'Veränderungen des Polypeptids nach der Translation, z. B. Entfernen von Aminosäuren/Peptiden, Anheften oder Abspalten von Phosphatgruppen; ergibt das funktionsfähige Protein.', simple: 'Der Feinschliff nach dem Bau.', src: [p(14)] },
    { id: 'eu-proinsulin', sub: 'eukaryoten', term: 'Proinsulin', def: 'Inaktive Speicherform des Insulins in Golgi-Vesikeln mit zusätzlicher C-Kette (35 AS), die vor der Freisetzung herausgeschnitten wird.', simple: 'Die noch „verpackte“ Vorstufe des Insulins.', src: [p(14, 'Material A')] },
    { id: 'eu-signal', sub: 'eukaryoten', term: 'Signalsequenz', def: 'Abschnitt an den Enden der Insulin-Vorstufen, mit dem sie durch Membranen transportiert werden; wird abgespalten.', simple: 'Ein Adressaufkleber für den Transport.', src: [p(14, 'Material A')] },
    { id: 'mu-mutation', sub: 'mutationen', term: 'Mutation', def: 'Veränderung der DNA einer Zelle; führt zu neuen Allelen und Genen und ist eine wesentliche Ursache genetischer Vielfalt.', simple: 'Ein Schreibfehler in der DNA.', src: [p(15)] },
    { id: 'mu-genom', sub: 'mutationen', term: 'Genommutation', def: 'Mutation, die die Anzahl der Chromosomen betrifft.', simple: 'Zu viele oder zu wenige Chromosomen.', src: [p(15)] },
    { id: 'mu-chromosom', sub: 'mutationen', term: 'Chromosomenmutation', def: 'Mutation, die die Struktur eines Chromosoms verändert.', simple: 'Ein Chromosom ist umgebaut.', src: [p(15)] },
    { id: 'mu-gen', sub: 'mutationen', term: 'Genmutation', def: 'Mutation, bei der ein einzelnes Gen verändert ist.', simple: 'Fehler in einem einzelnen Gen.', src: [p(15)] },
    { id: 'mu-punkt', sub: 'mutationen', term: 'Punktmutation', def: 'Mutation, die nur einzelne Basen bzw. Basenpaare betrifft: Substitution, Insertion oder Deletion.', simple: 'Ein einzelner Buchstabe ist betroffen.', src: [p(15)] },
    { id: 'mu-substitution', sub: 'mutationen', term: 'Substitution', def: 'Austausch eines Basenpaars gegen ein anderes.', simple: 'Ein Buchstabe wird ersetzt.', src: [p(15)] },
    { id: 'mu-insertion', sub: 'mutationen', term: 'Insertion', def: 'Einfügen eines zusätzlichen Basenpaars.', simple: 'Ein Buchstabe kommt dazu.', src: [p(15)] },
    { id: 'mu-deletion', sub: 'mutationen', term: 'Deletion', def: 'Entfernen eines Basenpaars.', simple: 'Ein Buchstabe fehlt.', src: [p(15)] },
    { id: 'mu-missense', sub: 'mutationen', term: 'Missense-Mutation', def: 'Substitution (meist an 1. oder 2. Tripletstelle), durch die eine falsche Aminosäure eingebaut wird.', simple: 'Ein falsches Wort im Satz.', src: [p(15)] },
    { id: 'mu-stumm', sub: 'mutationen', term: 'stumme Mutation', def: 'Substitution (häufig an 3. Stelle), die ein anderes Codon für dieselbe Aminosäure ergibt – wegen des degenerierten Codes.', simple: 'Anders geschrieben, gleiche Bedeutung.', src: [p(15)] },
    { id: 'mu-nonsense', sub: 'mutationen', term: 'Nonsense-Mutation', def: 'Substitution, durch die auf der mRNA ein Stoppcodon entsteht; die Translation bricht vorzeitig ab.', simple: 'Ein Punkt mitten im Satz.', src: [p(15)] },
    { id: 'mu-raster', sub: 'mutationen', term: 'Rasterschub-Mutation', def: 'Insertion oder Deletion von Nucleotiden (nicht 3 oder Vielfaches), die das Leseraster aller folgenden Tripletts verschiebt.', simple: 'Alle folgenden Wörter verrutschen.', src: [p(16)] },
    { id: 'mu-modifikation', sub: 'mutationen', term: 'Modifikation', def: 'Rein umweltbedingte Veränderung des Phänotyps bei gleichem Erbgut.', simple: 'Gleiche Gene, anderes Aussehen durch die Umwelt.', src: [p(16)] },
    { id: 'mu-umschlagend', sub: 'mutationen', term: 'umschlagende Modifikation', def: 'Modifikation ohne Übergänge zwischen den Formen (z. B. Tiefland- und Hochlandform des Löwenzahns).', simple: 'Entweder – oder.', src: [p(16)] },
    { id: 'mu-fliessend', sub: 'mutationen', term: 'fließende Modifikation', def: 'Stufenlose Abwandlung eines Merkmals (z. B. Zellgröße der Pantoffeltierchen).', simple: 'Alle Zwischenstufen möglich.', src: [p(16)] },
    { id: 'mu-reaktionsnorm', sub: 'mutationen', term: 'Reaktionsnorm', def: 'Erblich festgelegter Bereich, in dem ein Merkmal in seiner Ausprägung schwanken kann.', simple: 'Der Spielraum, den die Gene lassen.', src: [p(16)] },
    { id: 'mu-klon', sub: 'mutationen', term: 'Klon', def: 'Gruppe genetisch identischer Individuen, z. B. durch fortgesetzte Teilungen eines Pantoffeltierchens.', simple: 'Genetische Kopien.', src: [p(16)] },
  ],

  cards: [
    { id: 'tl-c1', sub: 'translation', kind: 'abbildung', front: 'Ribosom: Welche Stelle ist die Markierung „P“ – und was passiert dort?', back: 'P-Stelle (Peptidyl-tRNA-Bindestelle): Hier wird die Aminosäure mit der wachsenden Polypeptidkette verbunden.', src: [p(12, 'Abb. 4')], prov: 'pdf', figure: { widget: 'ribosome', highlight: 'P' } },
    { id: 'tl-c2', sub: 'translation', kind: 'prozess', front: 'Start der Translation', back: 'mRNA lagert sich an die kleine Untereinheit → diese wandert zum Startcodon AUG → tRNA mit Anticodon UAC (Methionin) bindet → große Untereinheit kommt dazu.', src: [p(13)], prov: 'pdf' },
    { id: 'tl-c3', sub: 'translation', kind: 'ursache', front: 'Ursache: Ein Stoppcodon gelangt in die A-Stelle. → Wirkung?', back: 'Es gibt keine passende tRNA → Translation bricht ab, das Ribosom zerfällt, das Polypeptid wird frei.', src: [p(13)], prov: 'pdf' },
    { id: 'tl-c4', sub: 'translation', kind: 'frage', front: 'Warum ist die beladene tRNA ein „Dolmetscher“?', back: 'Sie trägt immer die zu ihrem Anticodon passende Aminosäure und übersetzt so die Information eines Basentripletts in eine Aminosäure.', src: [p(12)], prov: 'pdf' },
    { id: 'tl-c5', sub: 'translation', kind: 'experiment', front: 'Zellfreies System (Mausleber, mRNA und tRNA abgebaut): Wann entstehen markierte Proteine?', back: 'Nur wenn mRNA **und** tRNA zugegeben werden – mit nur einer der beiden entstehen keine Proteine.', src: [p(12, 'Material A')], prov: 'pdf' },
    { id: 'tl-c6', sub: 'translation', kind: 'experiment', front: 'Antibiotikum-Versuch: Behandelte kleine + unbehandelte große Untereinheit → keine Proteinbiosynthese. Folgerung?', back: 'Das Antibiotikum wirkt an der kleinen Ribosomenuntereinheit.', src: [p(13, 'Material B')], prov: 'inf' },
    { id: 'eu-c1', sub: 'eukaryoten', kind: 'vergleich', front: 'cap-Struktur vs. Poly-A-Schwanz', back: 'cap (5\'-Ende, modifiziertes Guanin): Schutz vor Abbau, erleichtert Anlagern an Ribosomen.\nPoly-A (3\'-Ende, bis 300 A): erleichtert Export, Schutz vor Abbau.', src: [p(14)], prov: 'pdf' },
    { id: 'eu-c2', sub: 'eukaryoten', kind: 'ursache', front: 'Ursache: Eukaryoten besitzen eine Kernhülle. → Wirkung auf die Proteinbiosynthese?', back: 'Transkription (im Kern) und Translation (im Cytoplasma) sind räumlich und zeitlich getrennt; dazwischen wird die prä-mRNA prozessiert.', src: [p(14)], prov: 'pdf' },
    { id: 'eu-c3', sub: 'eukaryoten', kind: 'prozess', front: 'Von der prä-mRNA zur reifen mRNA', back: 'cap an 5\'-Ende → Poly-A-Schwanz an 3\'-Ende → Introns herausschneiden, Exons verknüpfen (Spleißen) → Export durch Kernpore.', src: [p(14)], prov: 'pdf' },
    { id: 'eu-c4', sub: 'eukaryoten', kind: 'experiment', front: 'Insulin: Was bedeuten 110, 86 und 51 Aminosäuren?', back: '110: Translationsprodukt mit Signalsequenz (24 + 30 + 35 + 21)\n86: Proinsulin ohne Signalsequenz (30 + 35 + 21)\n51: Insulin nach Entfernen der C-Kette (30 + 21)', src: [p(14, 'Material A')], prov: 'inf' },
    { id: 'eu-c5', sub: 'eukaryoten', kind: 'frage', front: 'Warum hat der Mensch trotz relativ weniger Gene sehr viele verschiedene Proteine?', back: 'Durch alternatives Spleißen entstehen aus einer prä-mRNA verschiedene reife mRNAs und damit verschiedene Proteine.', src: [p(14), p(19)], prov: 'pdf' },
    { id: 'mu-c1', sub: 'mutationen', kind: 'vergleich', front: 'Missense vs. stumm vs. Nonsense', back: 'Missense: andere Aminosäure.\nStumm: gleiche Aminosäure (degenerierter Code).\nNonsense: Stoppcodon → vorzeitiger Abbruch.', src: [p(15)], prov: 'pdf' },
    { id: 'mu-c2', sub: 'mutationen', kind: 'ursache', front: 'Ursache: Insertion eines Basenpaars in ein Gen. → Wirkung?', back: 'Da der Code kommafrei ist, verschiebt sich das Leseraster aller folgenden Tripletts (Rasterschub) → andere Aminosäuren oder vorzeitiges Stoppcodon → meist funktionsloses Protein.', src: [p(16)], prov: 'pdf' },
    { id: 'mu-c3', sub: 'mutationen', kind: 'experiment', front: 'Löwenzahn-Teilungsversuch: Ergebnis und Bedeutung?', back: 'Genetisch identische Hälften: im Tal Tieflandform, im Gebirge Hochlandform → Unterschied allein durch die Umwelt (umschlagende Modifikation).', src: [p(16)], prov: 'pdf' },
    { id: 'mu-c4', sub: 'mutationen', kind: 'frage', front: 'Was ist bei der Zellgröße von Pantoffeltierchen erblich festgelegt?', back: 'Die Reaktionsnorm – der Bereich, in dem die Größe schwanken kann. Die konkrete Größe bestimmen Umweltfaktoren (fließende Modifikation).', src: [p(16)], prov: 'pdf' },
    { id: 'mu-c5', sub: 'mutationen', kind: 'frage', front: 'Nenne ein Beispiel für eine positive Mutation aus deiner PDF.', back: 'Angeborene HIV-Resistenz (etwa jeder hundertste Europäer) durch eine Mutation im Gen für ein Rezeptorprotein, das das Virus zum Eindringen braucht.', src: [p(16)], prov: 'pdf' },
  ],

  questions: [
    // ---------------- translation ----------------
    {
      id: 'tl-q1', sub: 'translation', type: 'single', level: 1, err: 'code', prov: 'pdf', src: [p(13)],
      prompt: 'Welches Anticodon trägt die tRNA, die sich an das Startcodon AUG anlagert?',
      options: ['UAC', 'AUG', 'TAC', 'UAA'],
      answer: 0,
      feedback: { 2: 'TAC wäre DNA – tRNA enthält Uracil statt Thymin.' },
      why: [{ text: 'Sobald sich eine tRNA mit dem Anticodon UAC an das Startcodon AUG angelagert hat, verbinden sich die Untereinheiten.', prov: 'pdf', src: [p(13)] }],
    },
    {
      id: 'tl-q2', sub: 'translation', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(12)],
      prompt: 'Ordne jeder Bindungsstelle des Ribosoms ihre Aufgabe zu.',
      pairs: [
        { left: 'A-Stelle', right: 'Eingang: Hier bindet eine beladene tRNA.' },
        { left: 'P-Stelle', right: 'Aminosäure wird mit der wachsenden Kette verbunden.' },
        { left: 'E-Stelle', right: 'Entladene tRNA verlässt das Ribosom.' },
      ],
      distractors: ['Hier bindet die RNA-Polymerase.'],
      why: [{ text: 'A = Aminoacyl-tRNA-Bindestelle, P = Peptidyl-tRNA-Bindestelle, E = Exit-Stelle.', prov: 'pdf', src: [p(12)] }],
    },
    {
      id: 'tl-q3', sub: 'translation', type: 'label', level: 2, err: 'terms', prov: 'pdf', src: [p(12, 'Abb. 4')], widget: 'ribosome',
      prompt: 'Beschrifte das Ribosom.',
      labels: [
        { marker: '1', answer: 'große Untereinheit' },
        { marker: '2', answer: 'kleine Untereinheit' },
        { marker: '3', answer: 'E-Stelle' },
        { marker: '4', answer: 'P-Stelle' },
        { marker: '5', answer: 'A-Stelle' },
        { marker: '6', answer: 'mRNA' },
      ],
      why: [{ text: 'Die große Untereinheit trägt die drei tRNA-Bindestellen (E, P, A), die kleine bindet die mRNA.', prov: 'pdf', src: [p(12)] }],
    },
    {
      id: 'tl-q4', sub: 'translation', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(13)],
      prompt: 'Bringe die Schritte zum Start der Translation in die richtige Reihenfolge.',
      items: [
        'mRNA lagert sich an die kleine Untereinheit an',
        'Kleine Untereinheit wandert Richtung 3\'-Ende bis zum Startcodon AUG',
        'tRNA mit dem Anticodon UAC lagert sich an',
        'Große und kleine Untereinheit verbinden sich',
      ],
      why: [{ text: 'Danach ist das Ribosom funktionsbereit; die Start-tRNA sitzt in der P-Stelle.', prov: 'pdf', src: [p(13)] }],
    },
    {
      id: 'tl-q5', sub: 'translation', type: 'order', level: 3, err: 'sequence', prov: 'pdf', src: [p(13)],
      prompt: 'Bringe die Schritte der Kettenverlängerung in die richtige Reihenfolge.',
      items: [
        'Beladene tRNA bindet mit ihrem Anticodon an das Codon in der A-Stelle',
        'Aminosäure (bzw. Kette) der P-Stellen-tRNA wird an die Aminosäure der A-Stellen-tRNA gebunden',
        'Ribosom wandert ein Codon weiter – die tRNA mit der Kette rückt in die P-Stelle',
        'Entladene tRNA gelangt in die E-Stelle und verlässt das Ribosom',
      ],
      why: [{ text: 'Diese Vorgänge wiederholen sich Codon für Codon.', prov: 'pdf', src: [p(13)] }],
    },
    {
      id: 'tl-q6', sub: 'translation', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(13)],
      prompt: 'Warum bricht die Translation ab, wenn ein Stoppcodon in die A-Stelle gelangt?',
      options: ['Für Stoppcodons gibt es keine passende tRNA.', 'Die tRNA-Synthetase wird zerstört.', 'Das Stoppcodon bindet eine besondere Stopp-Aminosäure.', 'Die mRNA wird an dieser Stelle abgebaut.'],
      answer: 0,
      why: [{ text: 'Ohne passende tRNA kann keine weitere Aminosäure angefügt werden; das Ribosom zerfällt und gibt das Polypeptid frei.', prov: 'pdf', src: [p(13)] }],
    },
    {
      id: 'tl-q7', sub: 'translation', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(12)],
      prompt: 'Wie viele verschiedene tRNA-Synthetasen gibt es?',
      options: ['20', '64', '61', '3'],
      answer: 0,
      why: [{ text: 'Eine für jede der 20 natürlich vorkommenden Aminosäuren.', prov: 'pdf', src: [p(12)] }],
    },
    {
      id: 'tl-q8', sub: 'translation', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(12)],
      prompt: 'Warum bezeichnet man die beladene tRNA als „Dolmetscher“?',
      options: [
        'Sie trägt stets die zu ihrem Anticodon passende Aminosäure und übersetzt so ein Basentriplett in eine Aminosäure.',
        'Sie übersetzt DNA in RNA.',
        'Sie liest die gesamte mRNA auf einmal.',
        'Sie verbindet die beiden Ribosomen-Untereinheiten.',
      ],
      answer: 0,
      why: [{ text: 'Die Zuordnung Anticodon ↔ Aminosäure stellt die tRNA-Synthetase her.', prov: 'pdf', src: [p(12)] }],
    },
    {
      id: 'tl-q9', sub: 'translation', type: 'tf', level: 1, err: 'facts', prov: 'pdf', src: [p(12)],
      prompt: 'Am 3\'-Ende jeder tRNA liegt die Aminosäurebindungsstelle mit der Basenfolge CCA.',
      answer: true,
      why: [{ text: 'Die Aminosäurebindungsstelle am kurzen Arm hat bei allen tRNA-Molekülen die Basenfolge CCA.', prov: 'pdf', src: [p(12)] }],
    },
    {
      id: 'tl-q10', sub: 'translation', type: 'cloze', level: 1, err: 'terms', prov: 'pdf', src: [p(12)],
      prompt: 'Ergänze die Lücken zum Bau der Ribosomen.',
      text: 'Die kleine Untereinheit ist für das {{0}} der mRNA zuständig, die große Untereinheit für die {{1}} der Aminosäuren. Die große Untereinheit hat {{2}} Bindungsstellen für tRNA-Moleküle.',
      gaps: [
        { accept: ['Ablesen', 'Lesen'], options: ['Ablesen', 'Verknüpfung', 'Spleißen'] },
        { accept: ['Verknüpfung', 'Verknüpfen'], options: ['Ablesen', 'Verknüpfung', 'Beladung'] },
        { accept: ['drei', '3'], options: ['zwei', 'drei', 'vier'] },
      ],
      why: [{ text: 'Kleine Untereinheit: mRNA-Bindestelle und Ablesen; große: A-, P-, E-Stelle und Verknüpfung.', prov: 'pdf', src: [p(12)] }],
    },
    {
      id: 'tl-q11', sub: 'translation', type: 'single', level: 2, err: 'terms', prov: 'pdf', src: [p(13)],
      prompt: 'Was sind Polysomen?',
      options: [
        'mehrere Ribosomen, die gleichzeitig an einem mRNA-Molekül dieselbe Polypeptidkette bilden',
        'mehrere RNA-Polymerasen an einem Gen',
        'Ribosomen ohne mRNA',
        'Proteine aus mehreren Polypeptidketten',
      ],
      answer: 0,
      why: [{ text: 'So entstehen sehr schnell viele Kopien des Polypeptids.', prov: 'pdf', src: [p(13)] }],
    },
    {
      id: 'tl-q12', sub: 'translation', type: 'single', level: 3, err: 'experiment', prov: 'pdf', src: [p(12, 'Material A')],
      prompt: 'Im zellfreien System aus Mausleber (mRNA und tRNA vorher abgebaut) werden ¹⁴C-Aminosäuren und Nucleinsäuren zugegeben. In welchem Ansatz entstehen radioaktive Proteine?',
      options: ['nur mit mRNA und tRNA', 'nur mit mRNA', 'nur mit tRNA', 'in allen Ansätzen'],
      answer: 0,
      why: [
        { text: 'Beobachtung laut Abbildung: + mRNA → keine Proteine; + tRNA → keine Proteine; + tRNA und mRNA → radioaktive Proteine.', prov: 'pdf', src: [p(12, 'Material A')] },
        { text: 'Die mRNA liefert die Information, die tRNA bringt die Aminosäuren – beide sind nötig.', prov: 'inf' },
      ],
    },
    {
      id: 'tl-q13', sub: 'translation', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(12, 'Material A')], operator: 'Erklären',
      prompt: 'Gib an, welche Frage der Versuch mit dem zellfreien System aus Mausleber klären sollte, und erkläre die Beobachtungen.',
      rubric: [
        { id: 'frage', label: 'Frage: Welche Nucleinsäuren (mRNA, tRNA) werden für die Proteinbiosynthese benötigt?', any: [['welche|\\bob\\b|benoetig|notwendig|braucht', 'mrna|trna|nucleinsaeure|nukleinsaeure']], weight: 1 },
        { id: 'beob', label: 'Nur bei Zugabe von mRNA und tRNA entstehen radioaktiv markierte Proteine', any: [['beide|mrna und trna|trna und mrna|zusammen']], weight: 1 },
        { id: 'mrna', label: 'mRNA liefert die Information (Codons) für die Aminosäuresequenz', any: [['mrna', 'information|codon|bauplan|vorlage|sequenz']], weight: 1 },
        { id: 'trna', label: 'tRNA transportiert die Aminosäuren zum Ribosom (Anticodon)', any: [['trna', 'transport|bringt|liefert|aminosaeure|anticodon']], weight: 1 },
        { id: 'markierung', label: 'Die ¹⁴C-Markierung zeigt, dass die Aminosäuren in neue Proteine eingebaut wurden', any: [['radioaktiv|markier|14', 'eingebaut|neu|protein']], weight: 0.5 },
      ],
      model: 'Der Versuch sollte klären, ob für die Proteinbiosynthese sowohl mRNA als auch tRNA benötigt werden. Weil mRNA und tRNA zuvor abgebaut wurden, fehlte dem System beides. Mit nur mRNA oder nur tRNA entstanden keine markierten Proteine, mit beiden schon. Die mRNA liefert mit ihren Codons die Information für die Aminosäuresequenz; die tRNA bringt die Aminosäuren zum Ribosom und ordnet sie über ihr Anticodon zu. Die radioaktiv markierten Aminosäuren zeigen, dass nur im Ansatz mit beiden Nucleinsäuren neue Proteine gebildet wurden.',
      why: [{ text: 'Aufgaben 1–3 aus Material A deiner PDF; Lösung abgeleitet.', prov: 'inf', src: [p(12, 'Material A')] }],
    },
    {
      id: 'tl-q14', sub: 'translation', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(13, 'Material B')],
      prompt: 'Antibiotikum-Versuch: Behandelte **kleine** + unbehandelte große Untereinheit → keine Proteinbiosynthese. Behandelte **große** + unbehandelte kleine Untereinheit → Proteinbiosynthese. Wo wirkt das Antibiotikum?',
      options: ['an der kleinen Ribosomenuntereinheit', 'an der großen Ribosomenuntereinheit', 'an beiden Untereinheiten', 'an der tRNA'],
      answer: 0,
      why: [
        { text: 'Aufbau aus Material B deiner PDF; die Zuordnung der Ergebnisse ist aus der Abbildung abgelesen.', prov: 'pdf', src: [p(13, 'Material B')] },
        { text: 'Nur wenn die behandelte kleine Untereinheit beteiligt ist, fällt die Proteinbiosynthese aus.', prov: 'inf' },
      ],
    },
    {
      id: 'tl-q15', sub: 'translation', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(13, 'Material B')], operator: 'Beschreiben',
      prompt: 'Beschreibe, wie der Kontrollversuch zum Antibiotikum-Experiment aussehen muss, und gib an, was man schließen könnte, wenn in **beiden** Kombinationen keine Proteinbiosynthese erfolgt.',
      rubric: [
        { id: 'kontrolle', label: 'Kontrolle: beide Untereinheiten ohne Antibiotikum trennen, wieder vereinen und ins zellfreie System geben', any: [['ohne antibiotikum|unbehandelt|nicht behandelt|beide unbehandelt']], weight: 1.5 },
        { id: 'erwartung', label: 'Dort muss Proteinbiosynthese stattfinden (Verfahren funktioniert)', any: [['proteinbiosynthese|protein', 'stattfind|erfolg|muss|funktion']], weight: 1 },
        { id: 'beide', label: 'Keine PBS in beiden Fällen: Antibiotikum wirkt an beiden Untereinheiten (oder Verfahren gestört – Kontrolle klärt das)', any: [['beide|beiden', 'untereinheit']], weight: 1.5 },
      ],
      model: 'Im Kontrollversuch werden die Ribosomen genauso getrennt, aber keine Untereinheit wird mit dem Antibiotikum behandelt. Die unbehandelten Untereinheiten werden wieder vereint und ins zellfreie System gegeben – hier muss Proteinbiosynthese stattfinden. Nur so ist sicher, dass Trennen und Zusammenfügen die Ribosomen nicht selbst schädigen. Fände in beiden Kombinationen keine Proteinbiosynthese statt (bei funktionierender Kontrolle), würde das Antibiotikum an beiden Untereinheiten wirken.',
      why: [{ text: 'Aufgaben 3 und 4 aus Material B deiner PDF; Lösung abgeleitet.', prov: 'inf', src: [p(13, 'Material B')] }],
    },
    {
      id: 'tl-q16', sub: 'translation', type: 'free', level: 2, err: 'sequence', prov: 'pdf', src: [p(13)], operator: 'Beschreiben',
      prompt: 'Beschreibe die Kettenverlängerung bei der Translation.',
      rubric: [
        { id: 'a-stelle', label: 'Eine beladene tRNA bindet mit ihrem Anticodon an das Codon in der A-Stelle', any: [['a stelle|a-stelle|eingang', 'trna|anticodon']], weight: 1 },
        { id: 'bindung', label: 'Die Aminosäure/Kette der P-Stellen-tRNA wird an die Aminosäure der A-Stellen-tRNA gebunden', any: [['p stelle', 'gebunden|verknuepf|verbind|peptid']], weight: 1 },
        { id: 'weiter', label: 'Das Ribosom rückt ein Codon weiter (A → P)', any: [['weiter|rueckt|wander|verschieb', 'codon|triplett|p stelle']], weight: 1 },
        { id: 'exit', label: 'Die entladene tRNA gelangt in die E-Stelle und verlässt das Ribosom', any: [['e stelle|exit|verlaesst']], weight: 1 },
        { id: 'wiederholt', label: 'Das wiederholt sich Codon für Codon', any: [['wiederhol|codon fuer codon|immer wieder']], weight: 0.5 },
      ],
      model: 'Die Start-tRNA mit Methionin sitzt in der P-Stelle. Eine weitere beladene tRNA bindet mit ihrem Anticodon komplementär an das Codon in der A-Stelle. Dann wird die Aminosäure der P-Stellen-tRNA an die Aminosäure der A-Stellen-tRNA gebunden – das Dipeptid hängt nun an der tRNA in der A-Stelle. Das Ribosom wandert ein Codon weiter: Die tRNA mit dem Peptid rückt in die P-Stelle, die entladene tRNA in die E-Stelle und verlässt das Ribosom. In der frei gewordenen A-Stelle kann die nächste tRNA binden; das wiederholt sich Codon für Codon.',
      why: [{ text: 'Abb. „Translation B Kettenverlängerung“ deiner PDF.', prov: 'pdf', src: [p(13)] }],
    },
    {
      id: 'tl-q17', sub: 'translation', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(13)], operator: 'Erklären',
      prompt: 'Ein Antibiotikum verhindert, dass das Ribosom auf der mRNA ein Codon weiterrückt. Erkläre die Folgen für die Translation und für das Bakterium.',
      rubric: [
        { id: 'blockiert', label: 'Die A-Stelle bleibt besetzt – keine neue tRNA kann binden', any: [['a stelle', 'besetzt|blockiert|keine neue|nicht frei']], weight: 1 },
        { id: 'stopp', label: 'Die Kette kann nicht verlängert werden; es entstehen keine vollständigen Polypeptide', any: [['nicht verlaenger|keine verlaengerung|abbruch|stopp|kein(e)? (vollstaendig|fertig)|kurze']], weight: 1.5 },
        { id: 'bakterium', label: 'Dem Bakterium fehlen Proteine (z. B. Enzyme) → Wachstum gehemmt / Tod', any: [['bakteri', 'wachstum|wachsen|sterb|tot|vermehr|protein']], weight: 1 },
      ],
      model: 'Nach der Bildung der ersten Peptidbindung hängt die Kette an der tRNA in der A-Stelle. Rückt das Ribosom nicht weiter, bleibt die A-Stelle besetzt, und keine neue beladene tRNA kann binden. Die Polypeptidkette wird nicht verlängert, es entstehen keine vollständigen Proteine. Dem Bakterium fehlen damit lebenswichtige Proteine wie Enzyme – es kann nicht mehr wachsen oder stirbt ab.',
      why: [{ text: 'Transferaufgabe (nicht in deiner PDF); sie folgt aus dem Ablauf der Kettenverlängerung (PDF S. 13) und der Definition von Antibiotika.', prov: 'inf', src: [p(13)] }],
    },
    {
      id: 'tl-q18', sub: 'translation', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(13)],
      prompt: 'Was geschieht mit der entladenen tRNA nach der Verknüpfung?',
      options: ['Sie verlässt das Ribosom über die E-Stelle und kann erneut beladen werden.', 'Sie wird in die Polypeptidkette eingebaut.', 'Sie wird sofort abgebaut.', 'Sie bleibt dauerhaft in der P-Stelle.'],
      answer: 0,
      why: [{ text: 'Die entladene Start-tRNA wird in die E-Stelle verlagert, verlässt das Ribosom und kann erneut beladen werden.', prov: 'pdf', src: [p(13)] }],
    },
    // ---------------- eukaryoten ----------------
    {
      id: 'eu-q1', sub: 'eukaryoten', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(14)],
      prompt: 'Was sind Introns?',
      options: ['nicht codierende Sequenzen eukaryotischer Gene, die beim Spleißen entfernt werden', 'codierende Abschnitte eines Gens', 'Schutzkappen am 5\'-Ende', 'Stoppcodons'],
      answer: 0,
      why: [{ text: 'Introns codieren kein Polypeptid; die codierenden Abschnitte heißen Exons.', prov: 'pdf', src: [p(14)] }],
    },
    {
      id: 'eu-q2', sub: 'eukaryoten', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(14)],
      prompt: 'Ordne jedem Prozessierungsschritt seine Wirkung zu.',
      pairs: [
        { left: 'cap-Struktur am 5\'-Ende', right: 'Schutz vor Abbau, erleichtert Anlagern an die Ribosomen' },
        { left: 'Poly-A-Schwanz am 3\'-Ende', right: 'erleichtert den Export, Schutz vor Abbau' },
        { left: 'Spleißen', right: 'Introns werden entfernt, Exons verknüpft' },
      ],
      why: [{ text: 'Alle drei Schritte machen aus der prä-mRNA die reife mRNA.', prov: 'pdf', src: [p(14)] }],
    },
    {
      id: 'eu-q3', sub: 'eukaryoten', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(14)],
      prompt: 'Bringe die Schritte der eukaryotischen Proteinbiosynthese in die richtige Reihenfolge.',
      items: [
        'Transkription des Mosaikgens zur prä-mRNA',
        'cap-Struktur und Poly-A-Schwanz werden angefügt',
        'Spleißen: Introns werden herausgeschnitten',
        'Reife mRNA verlässt den Kern durch eine Kernpore',
        'Translation an den Ribosomen',
        'Posttranslationale Modifikation zum funktionsfähigen Protein',
      ],
      why: [{ text: 'Deine PDF nennt cap und Poly-A als ersten Schritt der Prozessierung, das Spleißen als nächsten.', prov: 'pdf', src: [p(14)] }],
    },
    {
      id: 'eu-q4', sub: 'eukaryoten', type: 'single', level: 2, err: 'comparison', prov: 'pdf', src: [p(14)],
      prompt: 'Warum sind Transkription und Translation bei Eukaryoten räumlich und zeitlich getrennt?',
      options: ['Das genetische Material ist von einer Kernhülle umgeben.', 'Eukaryoten haben keine Ribosomen.', 'Die mRNA wird bei Eukaryoten nicht gebraucht.', 'Weil Introns die Translation blockieren.'],
      answer: 0,
      why: [{ text: 'Transkription im Kern, Translation im Cytoplasma. Bei Bakterien (kein Kern) laufen beide synchron ab.', prov: 'pdf', src: [p(14), p(13)] }],
    },
    {
      id: 'eu-q5', sub: 'eukaryoten', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(14)],
      prompt: 'Wie erhöht alternatives Spleißen die Vielfalt der Proteine?',
      options: [
        'Aus derselben prä-mRNA entstehen durch Entfernen unterschiedlicher Exons verschiedene reife mRNAs.',
        'Es verdoppelt die Zahl der Gene.',
        'Es baut zusätzliche Introns in die mRNA ein.',
        'Es verändert die Basensequenz der DNA.',
      ],
      answer: 0,
      why: [{ text: 'Beim alternativen Spleißen können ein oder mehrere Exons entfernt werden – ein Gen codiert so mehrere Proteine.', prov: 'pdf', src: [p(14), p(19)] }],
    },
    {
      id: 'eu-q6', sub: 'eukaryoten', type: 'tf', level: 1, err: 'facts', prov: 'pdf', src: [p(14)],
      prompt: 'Die cap-Struktur und der Poly-A-Schwanz werden bei der Translation in Aminosäuren übersetzt.',
      answer: false,
      correction: 'Beide werden nicht übersetzt – sie sind aber wichtig für die Regulation der Translation.',
      why: [{ text: 'Laut PDF werden cap und Poly-A-Schwanz nicht in Aminosäuren übersetzt.', prov: 'pdf', src: [p(14)] }],
    },
    {
      id: 'eu-q7', sub: 'eukaryoten', type: 'multi', level: 2, err: 'terms', prov: 'pdf', src: [p(14)],
      prompt: 'Welche Vorgänge zählen zur posttranslationalen Modifikation?',
      options: [
        'Aminosäuren oder kurze Peptide werden enzymatisch entfernt',
        'Phosphatgruppen werden angeheftet oder abgespalten',
        'Introns werden herausgeschnitten',
        'Eine cap-Struktur wird angehängt',
      ],
      answers: [0, 1],
      why: [
        { text: 'Posttranslational = nach der Translation, am Polypeptid.', prov: 'pdf', src: [p(14)] },
        { text: 'Spleißen und cap betreffen die RNA vor der Translation (Prozessierung).', prov: 'inf' },
      ],
    },
    {
      id: 'eu-q8', sub: 'eukaryoten', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(14, 'Material A')],
      prompt: 'Aus Betazellen lassen sich Polypeptide mit 110, 86 und 51 Aminosäuren isolieren. Welches ist das aktive Insulin?',
      options: ['51 Aminosäuren', '86 Aminosäuren', '110 Aminosäuren', 'alle drei'],
      answer: 0,
      why: [
        { text: 'Insulin: A-Kette (21 AS) + B-Kette (30 AS) = 51 AS.', prov: 'pdf', src: [p(14, 'Material A')] },
        { text: '86 AS = Proinsulin mit C-Kette (30 + 35 + 21); 110 AS = zusätzlich mit Signalsequenz (24 AS).', prov: 'inf' },
      ],
    },
    {
      id: 'eu-q9', sub: 'eukaryoten', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(14, 'Material A')],
      prompt: 'Das Insulin-Gen umfasst 1426 Nucleotide, im Cytoplasma findet man zusätzlich RNA mit nur 330 Nucleotiden. Was erklärt den Unterschied?',
      options: [
        'Beim Spleißen wurden die Introns aus der prä-mRNA entfernt.',
        'Die mRNA wurde bei der Translation verkürzt.',
        'Die Signalsequenz wurde abgespalten.',
        'Die C-Kette wurde herausgeschnitten.',
      ],
      answer: 0,
      feedback: { 2: 'Signalsequenz und C-Kette sind Teile des Polypeptids, nicht der RNA.', 3: 'Signalsequenz und C-Kette sind Teile des Polypeptids, nicht der RNA.' },
      why: [
        { text: 'Die Abbildung zeigt die reife mRNA mit den Abschnitten 72 + 90 + 62 + 43 + 63 = 330 Nucleotiden.', prov: 'inf', src: [p(14, 'Material A')] },
      ],
    },
    {
      id: 'eu-q10', sub: 'eukaryoten', type: 'input', level: 3, err: 'code', prov: 'inf', src: [p(14, 'Material A')], mode: 'number', tol: 0,
      prompt: 'Die reife Insulin-mRNA hat (ohne cap und Poly-A) 330 codierende Nucleotide. Wie viele Aminosäuren lang ist das Translationsprodukt?',
      accept: ['110'],
      unit: 'Aminosäuren',
      solution: '330 : 3 = 110 Codons → 110 Aminosäuren (24 + 30 + 35 + 21)',
      why: [{ text: 'Jede Aminosäure wird durch ein Triplett codiert (PDF S. 10).', prov: 'pdf', src: [p(10)] }, { text: 'Die Zahl passt genau zur Summe der Abschnitte in der Abbildung.', prov: 'inf' }],
    },
    {
      id: 'eu-q11', sub: 'eukaryoten', type: 'free', level: 3, err: 'mechanism', prov: 'inf', src: [p(14, 'Material A')], operator: 'Hypothese aufstellen',
      prompt: 'Stelle eine begründete Hypothese zur Funktion der C-Peptidkette im Proinsulin auf.',
      rubric: [
        { id: 'hypothese', label: 'Hypothese, z. B.: Die C-Kette hält Insulin bis zur Freisetzung inaktiv / sorgt für die richtige Faltung bzw. Lage von A- und B-Kette (Disulfidbrücken)', any: [['inaktiv|speicher|schutz|verhindert'], ['falt|lage|position|ausricht|disulfid|zusammen']], weight: 2 },
        { id: 'begruendung', label: 'Begründung mit dem Material: Proinsulin ist eine inaktive Vorstufe; die C-Kette wird erst vor der Freisetzung herausgeschnitten', any: [['vorstufe|proinsulin|herausgeschnitten|freisetz|entfernt']], weight: 1 },
      ],
      model: 'Hypothese: Die C-Kette hält das Insulin als inaktive Vorstufe (Proinsulin), solange es in den Golgi-Vesikeln gespeichert wird. Erst wenn Insulin ins Blut abgegeben werden soll, wird die C-Kette herausgeschnitten und das Hormon aktiv. Begründung: Laut Material entsteht Insulin über inaktive Vorstufen, und die C-Kette wird genau vor der Freisetzung entfernt. Denkbar ist auch, dass die C-Kette A- und B-Kette in die richtige Lage bringt, damit sich die Disulfidbrücken korrekt ausbilden.',
      why: [
        { text: 'Deine PDF fragt nach einer Hypothese – es gibt keine Musterlösung. Bewertet wird, ob die Hypothese zum Material passt.', prov: 'inf', src: [p(14, 'Material A')] },
      ],
    },
    {
      id: 'eu-q12', sub: 'eukaryoten', type: 'free', level: 2, err: 'mechanism', prov: 'pdf', src: [p(14), p(19)], operator: 'Erklären',
      prompt: 'Erkläre, wie durch alternatives Spleißen aus einem Gen verschiedene Proteine entstehen können.',
      rubric: [
        { id: 'praemrna', label: 'Das Mosaikgen wird zu einer prä-mRNA aus Exons und Introns transkribiert', any: [['prae mrna|praemrna|vorstufe', 'exon|intron']], weight: 1 },
        { id: 'introns', label: 'Beim Spleißen werden die Introns entfernt', any: [['intron', 'entfernt|herausgeschnitten|raus']], weight: 1 },
        { id: 'exons', label: 'Zusätzlich können ein oder mehrere Exons entfernt werden (Auswahl über Proteine, die Signale auf der RNA erkennen)', any: [['exon', 'entfernt|herausgeschnitten|weggelassen|ausgelassen|unterschiedlich|verschieden']], weight: 1.5 },
        { id: 'ergebnis', label: 'Es entstehen verschiedene reife mRNAs → verschiedene Proteine; Proteinvielfalt bei wenigen Genen', any: [['verschiedene|unterschiedliche|mehrere', 'mrna|protein']], weight: 1 },
      ],
      model: 'Eukaryotische Gene sind Mosaikgene aus Exons und Introns; bei der Transkription entsteht zunächst eine prä-mRNA. Beim Spleißen werden die Introns herausgeschnitten. Beim alternativen Spleißen können zusätzlich ein oder mehrere Exons entfernt werden; welche Exons verwendet werden, steuern Proteine, die Signale auf der RNA erkennen. Aus derselben prä-mRNA entstehen so verschiedene reife mRNAs und damit verschiedene Proteine. Das erklärt, warum der Mensch mit relativ wenigen Genen viele hunderttausend Proteine herstellen kann.',
      why: [{ text: 'PDF S. 14 und S. 19 (Regulation durch RNA-Prozessierung).', prov: 'pdf', src: [p(14), p(19)] }],
    },
    {
      id: 'eu-q13', sub: 'eukaryoten', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(14), p(19)],
      prompt: 'Warum kann eine menschliche Zelle aus rund 20 000–25 000 Genen viele hunderttausend verschiedene Proteine herstellen?',
      options: ['durch alternatives Spleißen', 'durch Polysomen', 'durch die Degeneriertheit des Codes', 'durch Mutationen in jeder Zelle'],
      answer: 0,
      feedback: { 1: 'Polysomen erhöhen die Menge eines Proteins, nicht die Vielfalt.', 2: 'Der degenerierte Code bedeutet nur mehrere Codons pro Aminosäure.' },
      why: [
        { text: 'Durch alternatives Spleißen codiert ein Gen mehrere Proteine.', prov: 'pdf', src: [p(19)] },
        { text: 'Die beiden Genzahlen stammen von verschiedenen Seiten deiner PDF (S. 14: ~25 000, S. 19: ~20 000).', prov: 'inf' },
      ],
    },
    // ---------------- mutationen ----------------
    {
      id: 'mu-q1', sub: 'mutationen', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(15)],
      prompt: 'Ordne jeder Mutationsart zu, was sie betrifft.',
      pairs: [
        { left: 'Genommutation', right: 'die Anzahl der Chromosomen' },
        { left: 'Chromosomenmutation', right: 'die Struktur eines Chromosoms' },
        { left: 'Genmutation', right: 'ein einzelnes Gen' },
      ],
      why: [{ text: 'So unterscheidet deine PDF die drei Mutationsarten.', prov: 'pdf', src: [p(15)] }],
    },
    {
      id: 'mu-q2', sub: 'mutationen', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(15)],
      prompt: 'Ordne jeder Punktmutation ihre Beschreibung zu.',
      pairs: [
        { left: 'Substitution', right: 'Ein Basenpaar wird gegen ein anderes ausgetauscht.' },
        { left: 'Insertion', right: 'Ein zusätzliches Basenpaar wird eingefügt.' },
        { left: 'Deletion', right: 'Ein Basenpaar wird entfernt.' },
      ],
      why: [{ text: 'Punktmutationen betreffen einzelne Basen bzw. Basenpaare.', prov: 'pdf', src: [p(15)] }],
    },
    {
      id: 'mu-q3', sub: 'mutationen', type: 'single', level: 2, err: 'code', prov: 'pdf', src: [p(15)],
      prompt: 'Eine Substitution betrifft die **dritte** Stelle eines Basentripletts. Welche Folge ist am häufigsten?',
      options: ['eine stumme Mutation – meist wird dieselbe Aminosäure eingebaut', 'eine Rasterschub-Mutation', 'immer eine Nonsense-Mutation', 'die Translation beginnt nicht'],
      answer: 0,
      why: [{ text: 'Wegen des degenerierten Codes führt ein anderes Codon häufig zur selben Aminosäure.', prov: 'pdf', src: [p(15)] }],
    },
    {
      id: 'mu-q4', sub: 'mutationen', type: 'match', level: 2, err: 'terms', prov: 'pdf', src: [p(15), p(16)],
      prompt: 'Ordne jedem Mutationstyp seine Folge zu.',
      pairs: [
        { left: 'Missense-Mutation', right: 'eine andere Aminosäure wird eingebaut' },
        { left: 'stumme Mutation', right: 'dieselbe Aminosäure wird eingebaut' },
        { left: 'Nonsense-Mutation', right: 'ein Stoppcodon entsteht, Abbruch' },
        { left: 'Rasterschub-Mutation', right: 'das Leseraster aller folgenden Tripletts verschiebt sich' },
      ],
      why: [{ text: 'Substitutionen wirken auf ein Codon, Insertionen/Deletionen verschieben das Raster.', prov: 'pdf', src: [p(15), p(16)] }],
    },
    {
      id: 'mu-q5', sub: 'mutationen', type: 'input', level: 3, err: 'code', prov: 'inf', src: [p(15, 'Material A')], mode: 'aa', figure: { widget: 'mutation-lab' },
      prompt: 'Der DNA-Abschnitt aus Material A lautet (codogener Strang) `3\'-TAC TGT ACC TCA ACG GTA CTA GCG CTC-5\'`. Bestimme die Aminosäuresequenz.',
      accept: ['Met-Thr-Trp-Ser-Cys-His-Asp-Arg-Glu'],
      solution: "mRNA 5'-AUG ACA UGG AGU UGC CAU GAU CGC GAG-3' → Met-Thr-Trp-Ser-Cys-His-Asp-Arg-Glu",
      why: [
        { text: 'Die Basen sind aus der Abbildung in Material A abgelesen (Positionen 1–27, 3\'→5\').', prov: 'pdf', src: [p(15, 'Material A')] },
        { text: 'mRNA komplementär mit U statt T; Übersetzung mit der Codesonne.', prov: 'inf' },
      ],
    },
    {
      id: 'mu-q6', sub: 'mutationen', type: 'single', level: 3, err: 'code', prov: 'inf', src: [p(15, 'Material A')], figure: { widget: 'mutation-lab' },
      prompt: 'Im DNA-Abschnitt aus Material A wird in Position 9 C gegen T ausgetauscht (Triplett ACC → ACT). Welche Folge hat das?',
      options: [
        'Nonsense-Mutation: Das Codon UGG wird zu UGA (Stopp) – das Polypeptid bricht nach Met-Thr ab.',
        'Stumme Mutation: Trp bleibt erhalten.',
        'Missense-Mutation: Trp wird gegen Cys getauscht.',
        'Rasterschub-Mutation.',
      ],
      answer: 0,
      why: [{ text: 'DNA ACT → mRNA UGA = Stoppcodon. Statt Trp an Position 3 endet die Kette.', prov: 'inf' }],
    },
    {
      id: 'mu-q7', sub: 'mutationen', type: 'single', level: 3, err: 'code', prov: 'inf', src: [p(15, 'Material A')], figure: { widget: 'mutation-lab' },
      prompt: 'In Position 12 wird A gegen C ausgetauscht (Triplett TCA → TCC). Welche Folge hat das?',
      options: [
        'Missense-Mutation: AGU (Ser) wird zu AGG (Arg).',
        'Stumme Mutation: Ser bleibt Ser.',
        'Nonsense-Mutation.',
        'Rasterschub-Mutation.',
      ],
      answer: 0,
      why: [{ text: 'DNA TCC → mRNA AGG = Arginin statt Serin (AGU).', prov: 'inf' }],
    },
    {
      id: 'mu-q8', sub: 'mutationen', type: 'single', level: 3, err: 'code', prov: 'inf', src: [p(15, 'Material A')], figure: { widget: 'mutation-lab' },
      prompt: 'In Position 6 wird T gegen G ausgetauscht (Triplett TGT → TGG). Welche Folge hat das?',
      options: [
        'Stumme Mutation: ACA und ACC codieren beide Threonin.',
        'Missense-Mutation: Thr wird zu Pro.',
        'Nonsense-Mutation.',
        'Die Translation startet nicht mehr.',
      ],
      answer: 0,
      why: [{ text: 'DNA TGG → mRNA ACC = Thr, wie vorher ACA. Die Änderung an der dritten Stelle bleibt wegen des degenerierten Codes ohne Folgen.', prov: 'inf' }],
    },
    {
      id: 'mu-q9', sub: 'mutationen', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(16)],
      prompt: 'Warum führt das Einfügen von **drei** Basenpaaren in der Regel nicht zu einer Rasterschub-Mutation?',
      options: [
        'Weil drei Basenpaare genau ein Triplett ergeben – das Leseraster der folgenden Codons bleibt erhalten.',
        'Weil drei Basen nie abgelesen werden.',
        'Weil dabei immer ein Stoppcodon entsteht.',
        'Weil Insertionen grundsätzlich folgenlos sind.',
      ],
      answer: 0,
      why: [{ text: 'Rasterschub entsteht, wenn die Zahl der eingefügten oder entfernten Basenpaare nicht drei oder kein Vielfaches von drei ist.', prov: 'pdf', src: [p(16)] }],
    },
    {
      id: 'mu-q10', sub: 'mutationen', type: 'single', level: 4, err: 'code', prov: 'inf', src: [p(16, 'Material B')],
      prompt: 'Insulin-Gen: Normale DNA `CCC TAA CAA CTC GTC ACG …`, mutierte DNA `CCC TAA CAA CTT CGT CAC …`. Welcher Mutationstyp liegt vor?',
      options: ['Insertion eines Basenpaars (T) → Rasterschub', 'Substitution an einer Stelle → Missense', 'Deletion eines Basenpaars → Rasterschub', 'stumme Mutation'],
      answer: 0,
      why: [
        { text: 'Nach „CT“ ist ein zusätzliches T eingefügt; alle folgenden Tripletts verschieben sich um eine Base.', prov: 'inf', src: [p(16, 'Material B')] },
      ],
    },
    {
      id: 'mu-q11', sub: 'mutationen', type: 'free', level: 4, err: 'mechanism', prov: 'inf', src: [p(16, 'Material B')], operator: 'Erklären',
      prompt: 'Erkläre die Folgen der Insertion im Insulin-Gen (Material B) für das Hormon Insulin.',
      rubric: [
        { id: 'raster', label: 'Rasterschub: ab der Insertion ändert sich das Leseraster aller folgenden Tripletts', any: [['raster|leseraster|verschieb|verrutsch']], weight: 1.5 },
        { id: 'andere-as', label: 'Ab der 5. Aminosäure werden andere Aminosäuren eingebaut (z. B. Ala statt Gln)', any: [['andere|falsche|veraendert', 'aminosaeure|as\\b|sequenz']], weight: 1 },
        { id: 'funktion', label: 'Die A-Kette ist verändert → Insulin funktionslos (z. B. fehlende Cysteine für die Disulfidbrücken)', any: [['funktionslos|nicht funktion|unwirksam|inaktiv|keine funktion|nicht mehr wirk|disulfid|cystein|cys']], weight: 1.5 },
      ],
      model: 'Durch die Insertion eines Basenpaars verschiebt sich das Leseraster ab dem vierten Triplett. Die ersten vier Aminosäuren (Gly-Ile-Val-Glu) bleiben erhalten, ab der fünften werden andere Aminosäuren eingebaut (statt Gln-Cys-Cys-… entsteht Ala-Val-Leu-…). Damit fehlen u. a. die Cysteine, über die die A-Kette per Disulfidbrücken mit der B-Kette verbunden ist. Das Insulin hat eine veränderte Struktur und ist in der Regel funktionslos.',
      why: [
        { text: 'Rasterschub-Mutationen führen in der Regel zu einem funktionslosen Protein.', prov: 'pdf', src: [p(16)] },
        { text: 'Die Cystein-Argumentation ist eine Schlussfolgerung aus der abgebildeten Peptidsequenz.', prov: 'inf' },
        { text: 'Hinweis: In der Abbildung ist das mutierte Peptid nach „Leu“ als „His Ile“ gedruckt, die abgebildete mRNA ergibt aber „Leu Leu“.', prov: 'inf', src: [p(16, 'Material B')] },
      ],
    },
    {
      id: 'mu-q12', sub: 'mutationen', type: 'tf', level: 1, err: 'facts', prov: 'pdf', src: [p(15)],
      prompt: 'Mutationen entstehen ausschließlich durch äußere Einflüsse wie UV-Strahlen oder chemische Substanzen.',
      answer: false,
      correction: 'Mutationen können auch spontan entstehen, etwa durch Fehler bei der Replikation oder chemische Veränderungen der Basen.',
      why: [{ text: 'Spontane Mutationen und durch äußere Einflüsse verursachte Mutationen werden beide genannt.', prov: 'pdf', src: [p(15)] }],
    },
    {
      id: 'mu-q13', sub: 'mutationen', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(15)],
      prompt: 'Unter welcher Bedingung kann eine Missense-Mutation folgenlos bleiben?',
      options: ['wenn die ausgetauschte Aminosäure ähnliche chemische Eigenschaften hat', 'wenn sie an der dritten Tripletstelle liegt', 'wenn ein Stoppcodon entsteht', 'nie'],
      answer: 0,
      why: [{ text: 'Besitzt die neue Aminosäure ähnliche Eigenschaften, ändert sich die Struktur des Proteins kaum.', prov: 'pdf', src: [p(15)] }],
    },
    {
      id: 'mu-q14', sub: 'mutationen', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(16)],
      prompt: 'Welches Beispiel für eine positive Mutation nennt deine PDF?',
      options: ['eine angeborene HIV-Resistenz bei etwa jedem hundertsten Europäer', 'die familiäre Kardiomyopathie', 'die blaue Augenfarbe', 'die Faktor-V-Leiden-Mutation'],
      answer: 0,
      why: [{ text: 'Die Resistenz beruht auf einer Mutation im Gen für ein Rezeptorprotein, das das Virus zum Eindringen benötigt.', prov: 'pdf', src: [p(16)] }],
    },
    {
      id: 'mu-q15', sub: 'mutationen', type: 'single', level: 2, err: 'experiment', prov: 'pdf', src: [p(16)],
      prompt: 'Was zeigt der Teilungsversuch mit Löwenzahn aus dem Tiefland?',
      options: [
        'Die Unterschiede zwischen Tiefland- und Hochlandform werden allein durch die Umwelt verursacht.',
        'Hochlandpflanzen tragen andere Gene.',
        'Löwenzahn mutiert im Gebirge.',
        'Die Wurzellänge ist genetisch festgelegt.',
      ],
      answer: 0,
      why: [{ text: 'Genetisch identische Pflanzenhälften entwickelten sich je nach Standort zur Tiefland- bzw. Hochlandform: eine Modifikation.', prov: 'pdf', src: [p(16)] }],
    },
    {
      id: 'mu-q16', sub: 'mutationen', type: 'single', level: 2, err: 'terms', prov: 'pdf', src: [p(16)],
      prompt: 'Was ist bei der Zellgröße der Pantoffeltierchen erblich festgelegt?',
      options: ['die Reaktionsnorm – der Bereich, in dem die Zellgröße schwanken kann', 'die genaue Zellgröße jedes Individuums', 'nur die maximale Größe', 'nichts – die Größe ist rein zufällig'],
      answer: 0,
      why: [{ text: 'Klone aus den kleinsten oder größten Tieren zeigen dieselbe Variationskurve wie die Ausgangspopulation.', prov: 'pdf', src: [p(16)] }],
    },
    {
      id: 'mu-q17', sub: 'mutationen', type: 'match', level: 2, err: 'terms', prov: 'pdf', src: [p(16)],
      prompt: 'Ordne die Modifikationstypen den Beispielen zu.',
      pairs: [
        { left: 'umschlagende Modifikation', right: 'Tiefland- und Hochlandform des Löwenzahns (keine Übergänge)' },
        { left: 'fließende Modifikation', right: 'Zellgröße der Pantoffeltierchen (stufenlos)' },
      ],
      distractors: ['Faktor-V-Leiden (Mutation)'],
      why: [{ text: 'Modifikationen sind umweltbedingt; eine Mutation dagegen verändert die DNA.', prov: 'pdf', src: [p(16)] }],
    },
    {
      id: 'mu-q18', sub: 'mutationen', type: 'free', level: 3, err: 'mechanism', prov: 'pdf', src: [p(15), p(16)], operator: 'Erklären',
      prompt: 'Erkläre, warum Insertionen und Deletionen meist schwerwiegendere Folgen haben als Substitutionen.',
      rubric: [
        { id: 'kommafrei', label: 'Der Code ist kommafrei – eine Insertion/Deletion verschiebt das Leseraster ab der Mutation', any: [['raster|leseraster|verschieb|kommafrei']], weight: 1.5 },
        { id: 'alle', label: 'Alle folgenden Tripletts ändern sich → viele falsche Aminosäuren oder vorzeitiges Stoppcodon', any: [['alle|saemtliche|nachfolgend|folgend', 'triplett|codon|aminosaeure']], weight: 1 },
        { id: 'substitution', label: 'Eine Substitution betrifft nur ein Codon (eine Aminosäure oder stumm)', any: [['substitution', 'ein(e|en)? (codon|triplett|aminosaeure)|nur eine|einzeln|stumm']], weight: 1 },
        { id: 'ausnahme', label: 'Ausnahme: drei Basenpaare (oder Vielfaches) verschieben das Raster nicht', any: [['drei|3|vielfach']], weight: 0.5 },
      ],
      model: 'Weil der genetische Code kommafrei ist, verschiebt eine Insertion oder Deletion das Leseraster aller Tripletts ab der Mutationsstelle (Rasterschub). Dadurch ändern sich alle folgenden Codons: Es werden viele falsche Aminosäuren eingebaut oder ein neues Stoppcodon führt zum vorzeitigen Abbruch – meist ist das Protein funktionslos. Eine Substitution verändert dagegen nur ein einziges Codon; im schlimmsten Fall entsteht eine falsche Aminosäure oder ein Stoppcodon, oft bleibt sie sogar stumm. Werden drei Basenpaare (oder ein Vielfaches) eingefügt oder entfernt, bleibt das Raster erhalten.',
      why: [{ text: 'Vergleich der Folgen laut PDF S. 15 und 16.', prov: 'pdf', src: [p(15), p(16)] }],
    },
    {
      id: 'mu-q19', sub: 'mutationen', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(15, 'Material A')], operator: 'Hypothesen entwickeln',
      prompt: 'Entwickle Hypothesen zu den möglichen Folgen der drei Punktmutationen aus Material A (Position 9: C→T, Position 12: A→C, Position 6: T→G).',
      rubric: [
        { id: 'p9', label: 'Position 9: Nonsense (Stopp nach Met-Thr) → stark verkürztes, meist funktionsloses Protein', any: [['9|nonsense|stopp|stop', 'verkuerz|abbruch|funktionslos|kurz']], weight: 1.5 },
        { id: 'p12', label: 'Position 12: Missense (Ser → Arg) → Funktion kann beeinträchtigt sein oder bei ähnlichen Eigenschaften folgenlos bleiben', any: [['12|missense|arg|serin|ser\\b', 'funktion|struktur|eigenschaft|folgenlos|beeintraecht|aktivitaet']], weight: 1.5 },
        { id: 'p6', label: 'Position 6: stumm (Thr bleibt) → keine Auswirkung auf das Protein', any: [['6|stumm|thr|threonin', 'keine|folgenlos|gleich|unveraendert']], weight: 1 },
      ],
      model: 'Position 9 (C→T): Aus UGG (Trp) wird das Stoppcodon UGA. Die Translation bricht nach Met-Thr ab – das stark verkürzte Protein ist sehr wahrscheinlich funktionslos (Nonsense-Mutation). Position 12 (A→C): Aus AGU (Ser) wird AGG (Arg), eine Missense-Mutation. Arginin hat andere chemische Eigenschaften als Serin; die Tertiärstruktur und Aktivität des Proteins könnten sich ändern – je nach Lage im Protein kann die Mutation aber auch folgenlos bleiben. Position 6 (T→G): Aus ACA wird ACC, beide codieren Threonin – die stumme Mutation hat keine Auswirkung auf das Protein.',
      why: [{ text: 'Aufgabe 3 aus Material A deiner PDF; die Hypothesen sind abgeleitet.', prov: 'inf', src: [p(15, 'Material A')] }],
    },
    {
      id: 'mu-q20', sub: 'mutationen', type: 'cloze', level: 2, err: 'facts', prov: 'pdf', src: [p(15)],
      prompt: 'Ergänze die Lücken zur familiären Kardiomyopathie.',
      text: 'Eine Basensubstitution führt in einem Protein der Herzmuskulatur zum Austausch von {{0}} gegen {{1}}. Diese Veränderung wirkt sich auf die {{2}} des Proteins aus und verändert massiv dessen Aktivität.',
      gaps: [
        { accept: ['Leucin'], options: ['Leucin', 'Methionin', 'Glycin'] },
        { accept: ['Phenylalanin'], options: ['Phenylalanin', 'Arginin', 'Serin'] },
        { accept: ['Tertiärstruktur'], options: ['Tertiärstruktur', 'Basensequenz', 'Zellmembran'] },
      ],
      why: [{ text: 'Beispiel für eine folgenschwere Missense-Mutation.', prov: 'pdf', src: [p(15)] }],
    },
  ],

  experiments: [
    {
      id: 'exp-zellfrei', sub: 'translation', title: 'Versuche zur Proteinbiosynthese im zellfreien System', src: [p(12, 'Material A')],
      steps: [
        { key: 'frage', text: 'Welche Nucleinsäuren – mRNA, tRNA oder beide – braucht die Proteinbiosynthese?', prov: 'inf' },
        { key: 'material', text: 'Zellfreies System aus Mausleber; radioaktiv markierte ¹⁴C-Aminosäuren; mRNA und tRNA.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'mRNA und tRNA im System enzymatisch abbauen → drei Ansätze mit ¹⁴C-Aminosäuren und + mRNA, + tRNA bzw. + mRNA und tRNA.', prov: 'pdf' },
        { key: 'beobachtung', text: '+ mRNA: keine Proteine · + tRNA: keine Proteine · + mRNA und tRNA: radioaktive Proteine.', prov: 'pdf', predict: 'In welchem Ansatz entstehen Proteine?' },
        { key: 'schluss', text: 'Beide Nucleinsäuren sind nötig: mRNA liefert die Information, tRNA bringt die Aminosäuren.', prov: 'inf' },
        { key: 'methode', text: 'Die ¹⁴C-Markierung macht sichtbar, ob Aminosäuren in neue Proteine eingebaut wurden.', prov: 'inf' },
      ],
      questionIds: ['tl-q12', 'tl-q13'],
    },
    {
      id: 'exp-antibiotikum', sub: 'translation', title: 'Wirkort eines Antibiotikums', src: [p(13, 'Material B')],
      steps: [
        { key: 'frage', text: 'An welcher Stelle hemmt ein neu entwickeltes Antibiotikum die Proteinbiosynthese?', prov: 'pdf' },
        { key: 'material', text: 'Ribosomen aus Bakterien, per Zentrifugation in kleine und große Untereinheiten getrennt; Antibiotikum; ribosomenfreies zellfreies System.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Untereinheiten auf zwei Ansätze verteilen; nur Ansatz 1 mit Antibiotikum. Jede behandelte Untereinheit mit der anderen, unbehandelten Untereinheit kombinieren und ins System geben.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Behandelte kleine + unbehandelte große Untereinheit: keine Proteinbiosynthese. Behandelte große + unbehandelte kleine: Proteinbiosynthese.', prov: 'inf', predict: 'Welche Kombination erwartest du ohne Proteinbiosynthese, wenn das Antibiotikum an der kleinen Untereinheit wirkt?' },
        { key: 'schluss', text: 'Das Antibiotikum wirkt an der kleinen Ribosomenuntereinheit.', prov: 'inf' },
        { key: 'methode', text: 'Kontrolle: beide Untereinheiten unbehandelt kombinieren – hier muss Proteinbiosynthese stattfinden.', prov: 'inf' },
      ],
      questionIds: ['tl-q14', 'tl-q15'],
    },
    {
      id: 'exp-insulin', sub: 'eukaryoten', title: 'Insulinsynthese in den Betazellen', src: [p(14, 'Material A')],
      steps: [
        { key: 'frage', text: 'Wie wird aus dem Insulin-Gen das aktive Hormon?', prov: 'inf' },
        { key: 'beobachtung', text: 'Gen: 1426 Nucleotide. Im Cytoplasma: RNA mit 1426 und mit 330 Nucleotiden. Polypeptide mit 51, 86 und 110 Aminosäuren.', prov: 'pdf', predict: 'Welches der drei Polypeptide ist das aktive Insulin?' },
        { key: 'ergebnis', text: '1426 Nt = prä-mRNA; 330 Nt = reife mRNA (Introns entfernt) → 110 AS; ohne Signalsequenz 86 AS (Proinsulin); ohne C-Kette 51 AS (Insulin).', prov: 'inf' },
        { key: 'schluss', text: 'Das Insulin-Gen durchläuft Transkription, RNA-Prozessierung, Translation und mehrere Schritte der posttranslationalen Modifikation.', prov: 'inf' },
      ],
      questionIds: ['eu-q8', 'eu-q9', 'eu-q10', 'eu-q11'],
    },
    {
      id: 'exp-modifikation', sub: 'mutationen', title: 'Modifikationen bei Löwenzahn und Pantoffeltierchen', src: [p(16)],
      steps: [
        { key: 'frage', text: 'Sind die Unterschiede zwischen Tiefland- und Hochlandlöwenzahn genetisch bedingt oder umweltbedingt?', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Eine junge Tieflandpflanze wird geteilt; eine Hälfte wächst im Tiefland, die andere im Hochland.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Im Tal entwickelt sich die Tieflandform, im Gebirge die Hochlandform.', prov: 'pdf', predict: 'Welche Form entwickelt die Hälfte im Gebirge?' },
        { key: 'schluss', text: 'Die Veränderung des Phänotyps ist allein umweltbedingt: umschlagende Modifikation.', prov: 'pdf' },
        { key: 'methode', text: 'Das Teilen erzeugt genetisch identische Pflanzen – so bleibt nur die Umwelt als Ursache für Unterschiede.', prov: 'inf' },
      ],
      questionIds: ['mu-q15', 'mu-q16', 'mu-q17'],
    },
  ],

  examTasks: [
    {
      id: 'kt-antibiotika',
      title: 'Proteinbiosynthese und Antibiotika',
      subs: ['translation', 'transkription', 'replikation', 'eukaryoten', 'mutationen'],
      basedOn: 'Übung nach den Klausuraufgaben „Proteinbiosynthese und Antibiotika“ aus deiner PDF (S. 17)',
      src: [p(17)],
      intro: 'Antibiotika hemmen das Wachstum von Bakterien oder töten sie ab. In dieser Übung geht es um Modelle der Proteinbiosynthese und um die Wirkung von Antibiotika auf Replikation und Translation.',
      material: [
        {
          kind: 'text',
          md: '**Material A – Fertighaus-Modell:** Im Architekturbüro (1) liegen die Originalpläne (2) für Fertighaustypen (3). Mit Fotokopierern (4) werden Kopien (5) hergestellt und an Baustellen (6) verschickt. Am Lagerplatz (7) der Fertigteile (8) sorgen Spezialisten (9) dafür, dass die Teile auf die richtigen Kranwagen (10) kommen. Die Kranwagen tragen Erkennungsmarken (11), die zu den Kennziffern (12) der Plankopie passen. Die Teile werden durch genormte Stahlklammern (13) verbunden, die mit batteriebetriebenen Hämmern (14) eingesetzt werden. Die Batterien werden in Kraftwerken (16), die mit Dieselkraftstoff (15) beschickt werden, aufgeladen.',
        },
        {
          kind: 'text',
          md: '**Material C – Ciprofloxacin:** hemmt das bakterielle Enzym **Gyrase**. Öffnet die Helicase den Doppelstrang, überdreht sich die DNA in den folgenden Abschnitten. Die Gyrase erzeugt einen Doppelstrangbruch, die DNA kann sich entwinden, anschließend repariert eine DNA-Ligase den Bruch.\n\n**Streptomycin** wirkt auf die kleine Ribosomenuntereinheit von Prokaryoten. Ein zellfreies System aus *E. coli* erhielt eine künstliche mRNA aus sich wiederholenden Uracil- und Cytosin-Basen (…UCUCUC…).',
        },
        {
          kind: 'table',
          head: ['', 'Ansatz ohne Streptomycin', 'Ansatz mit Streptomycin'],
          rows: [['eingebaute Aminosäuren', 'Leucin, Serin', 'Leucin, Serin, Phenylalanin, Prolin, Histidin']],
          caption: 'Versuchsergebnisse aus Material C deiner PDF',
        },
        {
          kind: 'table',
          head: ['rps12-Gen (nicht-codogener Strang)', 'Sequenz'],
          rows: [
            ['Wildtyp', "5'…GTT AAG GAT TTA CCC GGT GTG…3'"],
            ['mutierte DNA', "5'…GTT AAG GAT TTA TCC GGT GTG…3'"],
          ],
          caption: 'Material D deiner PDF. ⚠️ Dort steht in der mutierten Sequenz „UCC“ – DNA enthält aber kein Uracil; gemeint ist vermutlich TCC.',
        },
      ],
      parts: ['ka-1', 'ka-2', 'ka-3', 'ka-4', 'ka-5', 'ka-6', 'ka-7', 'ka-8', 'ka-9'],
    },
    {
      id: 'kt-insulin',
      title: 'Insulin: Synthese und Mutation',
      subs: ['eukaryoten', 'mutationen'],
      basedOn: 'Übung nach Material A „Insulinsynthese“ (S. 14) und Material B „Mutation des Insulin-Gens“ (S. 16) deiner PDF',
      src: [p(14, 'Material A'), p(16, 'Material B')],
      intro: 'Insulin besteht aus der A-Kette (21 AS) und der B-Kette (30 AS), verbunden durch zwei Disulfidbrücken. Es entsteht über inaktive Vorstufen; Proinsulin enthält zusätzlich die C-Kette (35 AS). Das Insulin-Gen umfasst 1426 Nucleotide; im Cytoplasma findet man RNA mit 1426 und 330 Nucleotiden sowie Polypeptide mit 51, 86 und 110 Aminosäuren.',
      material: [
        { kind: 'seq', label: 'normale DNA (A-Kette, Beginn)', value: "3'-CCC TAA CAA CTC GTC ACG ACG ATG AGG TAA ACG…", caption: 'Peptid: Gly-Ile-Val-Glu-Gln-Cys-Cys-Tyr-Ser-Ile-Cys…' },
        { kind: 'seq', label: 'mutierte DNA', value: "3'-CCC TAA CAA CTT CGT CAC GAC GAT GAG GTA AAC…", caption: 'Abbildung in Material B deiner PDF' },
      ],
      parts: ['ki-1', 'ki-2', 'ki-3', 'ki-4'],
    },
  ],
};

genproduktB.questions.push(
  {
    id: 'ka-1', sub: 'translation', type: 'match', level: 4, err: 'terms', prov: 'inf', src: [p(17, 'Material A')],
    prompt: 'Fertighaus-Modell (1–8): Ordne den Begriffen die Fachbegriffe der Proteinbiosynthese zu.',
    pairs: [
      { left: '(1) Architekturbüro', right: 'Zellkern' },
      { left: '(2) Originalpläne', right: 'DNA' },
      { left: '(3) Fertighaustypen', right: 'Polypeptide' },
      { left: '(4) Fotokopierer', right: 'RNA-Polymerase' },
      { left: '(5) Kopien', right: 'mRNA' },
      { left: '(6) Baustellen', right: 'Ribosomen' },
      { left: '(7) Lagerplatz', right: 'Cytoplasma' },
      { left: '(8) Fertigteile', right: 'Aminosäuren' },
    ],
    distractors: ['Golgi-Apparat', 'Nucleotide'],
    why: [{ text: 'Deine PDF nennt die Begriffsliste, aber keine Lösung. Die Zuordnung ergibt sich aus den Funktionen: Originalpläne bleiben im Büro (DNA im Kern), Kopien gehen zu den Baustellen (mRNA zu den Ribosomen).', prov: 'inf', src: [p(17, 'Material A')] }],
  },
  {
    id: 'ka-2', sub: 'translation', type: 'match', level: 4, err: 'terms', prov: 'inf', src: [p(17, 'Material A')],
    prompt: 'Fertighaus-Modell (9–16): Ordne die Fachbegriffe zu.',
    pairs: [
      { left: '(9) Spezialisten', right: 'tRNA-Synthetasen' },
      { left: '(10) Kranwagen', right: 'tRNA' },
      { left: '(11) Erkennungsmarken', right: 'Anticodon' },
      { left: '(12) Kennziffern der Plankopie', right: 'Codon' },
      { left: '(13) Stahlklammern', right: 'Peptidbindung' },
      { left: '(15) Dieselkraftstoff', right: 'Glucose' },
      { left: '(16) Kraftwerke', right: 'Mitochondrien' },
    ],
    distractors: ['Mg²⁺-Ionen', 'Golgi-Apparat'],
    why: [
      { text: 'Die Begriffsliste steht in deiner PDF (u. a. ATP, Mitochondrien, Glucose), eine Lösung nicht. Begriff (14) „Hämmer“ lässt sich nicht eindeutig zuordnen und wird hier nicht abgefragt.', prov: 'inf', src: [p(17, 'Material A')] },
      { text: 'Zuordnung (15)/(16): Die „Batterien“ entsprechen dem Energieträger ATP, der in den Mitochondrien („Kraftwerke“) unter Abbau von Glucose („Diesel“) gebildet wird. Das erklärt deine PDF nicht.', prov: 'ext', ext: { label: 'Wikipedia: Zellatmung', url: 'https://de.wikipedia.org/wiki/Zellatmung' } },
    ],
  },
  {
    id: 'ka-3', sub: 'translation', type: 'free', level: 4, err: 'evaluation', prov: 'inf', src: [p(17, 'Material A')], operator: 'Prüfen',
    prompt: 'Prüfe, welche Aspekte der Proteinbiosynthese das Fertighaus-Modell gut verdeutlicht und welche es nicht erklären kann. (Beachte: Es soll die Proteinbiosynthese von **Prokaryoten** modellieren.)',
    rubric: [
      { id: 'gut1', label: 'Gut: Original (DNA) bleibt, Kopien (mRNA) werden zu den Baustellen (Ribosomen) gebracht', any: [['kopie|mrna', 'original|dna|bleibt']], weight: 1 },
      { id: 'gut2', label: 'Gut: passende Zuordnung über Erkennungsmarken/Kennziffern (Anticodon–Codon, tRNA-Synthetase)', any: [['erkennungsmarke|kennziffer|anticodon|codon|zuordnung|spezialist']], weight: 1 },
      { id: 'grenze1', label: 'Grenze: Prokaryoten haben keinen Zellkern (Architekturbüro passt nicht; Transkription und Translation laufen gleichzeitig ab)', any: [['kein(en)? (zell)?kern|prokaryot|gleichzeitig|synchron|cytoplasma']], weight: 1.5 },
      { id: 'grenze2', label: 'Grenze: weitere Unterschiede, z. B. Fotokopie ist identisch statt komplementär, nur ein Gen wird kopiert, Faltung/Polysomen fehlen', any: [['komplementaer|identisch|nur ein gen|abschnitt|falt|polysom|wiederverwend|energie']], weight: 1 },
    ],
    model: 'Gut verdeutlicht: Die Originalpläne (DNA) bleiben im Büro, zu den Baustellen gehen nur Kopien (mRNA); die Fertigteile (Aminosäuren) werden von Spezialisten (tRNA-Synthetasen) auf passende Kranwagen (tRNA) geladen, deren Erkennungsmarken (Anticodons) zu den Kennziffern der Plankopie (Codons) passen; die Teile werden verbunden (Peptidbindungen) und dafür wird Energie gebraucht. Grenzen: Prokaryoten besitzen keinen Zellkern – ein getrenntes Architekturbüro passt nicht; bei ihnen laufen Transkription und Translation gleichzeitig im Cytoplasma ab. Eine Fotokopie ist identisch, die mRNA dagegen komplementär zum codogenen Strang, und kopiert wird nur ein Gen. Dass mehrere Ribosomen gleichzeitig an einer mRNA arbeiten (Polysomen) und das Polypeptid sich zu einem funktionsfähigen Protein faltet, zeigt das Modell ebenfalls nicht.',
    why: [{ text: 'Offene Bewertungsaufgabe nach Klausuraufgabe 1.2 deiner PDF – es gibt mehrere richtige Aspekte.', prov: 'inf', src: [p(17)] }],
  },
  {
    id: 'ka-4', sub: 'eukaryoten', type: 'free', level: 4, err: 'comparison', prov: 'inf', src: [p(17), p(13), p(14)], operator: 'Vergleichen', compare: true,
    prompt: 'Vergleiche die Proteinbiosynthese von Pro- und Eukaryoten hinsichtlich räumlicher und zeitlicher Organisation, Aufbau der Gene, RNA-Prozessierung und posttranslationaler Modifikation.',
    rubric: [
      { id: 'raum', group: 'Räumlich', label: 'Eukaryoten: Transkription im Kern, Translation im Cytoplasma; Prokaryoten: beides im Cytoplasma (kein Kern)', any: [['kern', 'cytoplasma']], weight: 1 },
      { id: 'zeit', group: 'Zeitlich', label: 'Prokaryoten: Transkription und Translation synchron; Eukaryoten: nacheinander', any: [['gleichzeitig|synchron', 'nacheinander|getrennt|zeitlich']], weight: 1 },
      { id: 'gene', group: 'Gene', label: 'Eukaryoten: Mosaikgene mit Introns und Exons; Prokaryoten: ohne Introns', any: [['intron|exon|mosaik']], weight: 1 },
      { id: 'prozess', group: 'RNA-Prozessierung', label: 'Nur bei Eukaryoten: cap, Poly-A-Schwanz, Spleißen (prä-mRNA)', any: [['cap|poly ?a|spleiss|prae mrna|prozessier']], weight: 1 },
      { id: 'ptm', group: 'Modifikation', label: 'Eukaryoten: posttranslationale Modifikation (z. B. Insulin)', any: [['posttranslational|modifikation|phosphat|insulin']], weight: 0.5 },
    ],
    model: 'Räumlich: Bei Eukaryoten liegt die DNA im Zellkern; transkribiert wird im Kern, translatiert im Cytoplasma. Prokaryoten haben keinen Kern – beides geschieht im Cytoplasma. Zeitlich: Bei Prokaryoten laufen Transkription und Translation synchron ab (Polysomen an der entstehenden mRNA), bei Eukaryoten nacheinander. Gene: Eukaryotische Gene sind Mosaikgene aus Exons und Introns, prokaryotische enthalten keine Introns. RNA-Prozessierung: Bei Eukaryoten wird die prä-mRNA mit cap und Poly-A-Schwanz versehen und gespleißt (auch alternativ); bei Prokaryoten entfällt das. Posttranslationale Modifikation: Eukaryotische Polypeptide werden oft noch verändert (z. B. Proinsulin → Insulin).',
    why: [
      { text: 'Nach Klausuraufgabe 1.3 deiner PDF; die Vergleichspunkte stammen von PDF S. 13 und 14.', prov: 'inf', src: [p(13), p(14)] },
      { text: 'Das Kriterium „Aufbau der DNA“ aus der Aufgabe kannst du mit PDF S. 3 ergänzen: Eukaryotische DNA ist an Histone gebunden (Nucleosomen). Über den Aufbau prokaryotischer DNA sagt deine PDF nichts.', prov: 'inf', src: [p(3)] },
    ],
  },
  {
    id: 'ka-5', sub: 'replikation', type: 'free', level: 4, err: 'sequence', prov: 'pdf', src: [p(17, 'Material B'), p(5)], operator: 'Beschreiben', figure: { widget: 'replication-fork' },
    prompt: 'Beschreibe den Ablauf der DNA-Replikation mithilfe der Abbildung (Helicase, DNA-Polymerase, Leit- und Folgestrang, DNA-Ligase).',
    rubric: [
      { id: 'helicase', label: 'Helicase trennt die Einzelstränge (Replikationsgabel)', any: [['helicase']], weight: 1 },
      { id: 'primer', label: 'Primase bildet Primer; DNA-Polymerase verlängert am 3\'-Ende komplementär', any: [['polymerase', "3'|3 ende|komplementaer|primer"]], weight: 1 },
      { id: 'leit', label: 'Leitstrang kontinuierlich zur Gabel hin', any: [['leitstrang', '\\bkontinuierlich|durchgehend|am stueck']], weight: 1 },
      { id: 'folge', label: 'Folgestrang diskontinuierlich in Okazaki-Fragmenten', any: [['folgestrang', 'diskontinuierlich|okazaki|fragment|stueck']], weight: 1 },
      { id: 'ligase', label: 'DNA-Ligase verknüpft die Fragmente', any: [['ligase']], weight: 1 },
    ],
    model: 'Die Helicase trennt am Replikationsursprung die beiden Einzelstränge, es entsteht die Replikationsgabel. Die Primase bildet kurze Primer; an deren 3\'-Ende bindet die DNA-Polymerase komplementär freie Nucleotide. Weil die Stränge antiparallel sind, wird der Leitstrang kontinuierlich in Richtung der Gabel synthetisiert, der Folgestrang dagegen diskontinuierlich von der Gabel weg in Okazaki-Fragmenten. Die Primer werden abgebaut, die Lücken gefüllt, und die DNA-Ligase verknüpft die Fragmente zu einem durchgehenden Strang. Es entstehen zwei identische Doppelstränge.',
    why: [{ text: 'Nach Klausuraufgabe 2.1 deiner PDF; Ablauf laut PDF S. 5.', prov: 'pdf', src: [p(5)] }],
  },
  {
    id: 'ka-6', sub: 'replikation', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(17, 'Material C')], operator: 'Erklären und begründen',
    prompt: 'Erkläre die Wirkung von Ciprofloxacin auf die DNA-Replikation und begründe, dass es als Antibiotikum eingesetzt wird.',
    rubric: [
      { id: 'gyrase', label: 'Ciprofloxacin hemmt die Gyrase', any: [['gyrase', 'hemm|blockier|verhindert|inaktiv']], weight: 1 },
      { id: 'ueberdreht', label: 'Die Überdrehung vor der Replikationsgabel kann nicht aufgehoben werden (kein Doppelstrangbruch/Entwinden)', any: [['ueberdreh|verdreh|spannung|entwind|doppelstrangbruch']], weight: 1.5 },
      { id: 'stopp', label: 'Die Helicase kann die DNA nicht weiter öffnen → Replikation stoppt', any: [['replikation', 'stopp|bricht ab|nicht (weiter|mehr|fortgesetzt)|kommt zum erliegen|blockiert']], weight: 1 },
      { id: 'antibiotikum', label: 'Ohne Replikation keine Zellteilung/Vermehrung → Wachstum der Bakterien gehemmt', any: [['teilung|vermehr|wachstum|wachsen']], weight: 1 },
    ],
    model: 'Beim Öffnen des Doppelstrangs durch die Helicase überdreht sich die DNA in den folgenden Abschnitten. Normalerweise hebt die Gyrase diese Überdrehung auf: Sie erzeugt einen Doppelstrangbruch, die DNA entwindet sich, und die Ligase repariert den Bruch. Ciprofloxacin hemmt die Gyrase; die Spannung bleibt bestehen, die Helicase kann die DNA nicht weiter öffnen und die Replikation kommt zum Erliegen. Ohne Replikation können sich die Bakterien nicht teilen und vermehren – ihr Wachstum wird gehemmt. Deshalb eignet sich Ciprofloxacin als Antibiotikum.',
    why: [{ text: 'Nach Klausuraufgabe 2.2 deiner PDF; Lösung abgeleitet aus Material C.', prov: 'inf', src: [p(17, 'Material C')] }],
  },
  {
    id: 'ka-7', sub: 'translation', type: 'free', level: 5, err: 'experiment', prov: 'inf', src: [p(17, 'Material C')], operator: 'Auswerten',
    prompt: 'Werte die Versuchsergebnisse zur Wirkung von Streptomycin aus und stelle eine Hypothese zum Wirkungsmechanismus auf.',
    material: [{ kind: 'widget', widget: 'codon-table', caption: 'Codesonne als Tabelle' }],
    rubric: [
      { id: 'codons', label: 'Die mRNA …UCUCUC… enthält die Codons UCU (Serin) und CUC (Leucin)', any: [['ucu|cuc', 'ser|leu']], weight: 1 },
      { id: 'zusatz', label: 'Mit Streptomycin werden zusätzlich Phe, Pro und His eingebaut', any: [['phe|phenylalanin|pro|prolin|his|histidin']], weight: 1 },
      { id: 'eine-base', label: 'Deren Codons unterscheiden sich nur in einer Base von UCU/CUC (z. B. UUC, CCU, CAC)', any: [['eine base|einer base|einem nukleotid|einem nucleotid|eine stelle|uuc|uuu|ccu|cac|cau']], weight: 1 },
      { id: 'hypothese', label: 'Hypothese: Streptomycin bewirkt an der kleinen Untereinheit Ablesefehler (falsche Codon-Anticodon-Paarung) → fehlerhafte Proteine', any: [['fehl|falsch|ungenau|verlesen|ablese', 'ables|lesen|paarung|codon|anticodon|einbau']], weight: 1.5 },
    ],
    model: 'Die künstliche mRNA …UCUCUC… enthält – je nach Leseraster – die Codons UCU (Serin) und CUC (Leucin); ohne Streptomycin werden genau diese beiden Aminosäuren eingebaut. Mit Streptomycin kommen Phenylalanin (UUU/UUC), Prolin (CCU/CCC) und Histidin (CAU/CAC) hinzu. Ihre Codons unterscheiden sich jeweils nur in einer Base von UCU bzw. CUC. Hypothese: Streptomycin wirkt auf die kleine Untereinheit, die für das Ablesen der mRNA zuständig ist, und führt dort zu Ablesefehlern – tRNAs mit nicht exakt passendem Anticodon werden akzeptiert. Die Bakterien bilden dadurch fehlerhafte, oft funktionslose Proteine.',
    why: [
      { text: 'Nach Klausuraufgabe 2.3 deiner PDF. Die Hypothese ist eine Schlussfolgerung aus den Daten (keine Lösung in der PDF).', prov: 'inf', src: [p(17, 'Material C')] },
      { text: 'Dass die kleine Untereinheit für das Ablesen der mRNA zuständig ist, steht auf PDF S. 12.', prov: 'pdf', src: [p(12)] },
    ],
  },
  {
    id: 'ka-8', sub: 'mutationen', type: 'input', level: 4, err: 'code', prov: 'inf', src: [p(17, 'Material D')], mode: 'aa', figure: { widget: 'codon-table' },
    prompt: 'Ermittle mit der Codesonne die Aminosäuresequenz des **mutierten** rps12-Abschnitts `5\'…GTT AAG GAT TTA TCC GGT GTG…3\'` (nicht-codogener Strang).',
    accept: ['Val-Lys-Asp-Leu-Ser-Gly-Val'],
    solution: "mRNA = nicht-codogener Strang mit U statt T: GUU AAG GAU UUA UCC GGU GUG → Val-Lys-Asp-Leu-Ser-Gly-Val (Wildtyp: …Leu-Pro-Gly…)",
    why: [
      { text: 'Der nicht-codogene Strang hat dieselbe Basenfolge wie die mRNA (mit T statt U) – er ist komplementär zum codogenen Strang.', prov: 'inf' },
      { text: 'Wildtyp CCC = Pro, Mutante TCC (UCC) = Ser.', prov: 'inf', src: [p(17, 'Material D')] },
      { text: 'In deiner PDF steht in der mutierten DNA-Sequenz „UCC“ – in DNA kommt Uracil nicht vor (PDF S. 10). Gemeint ist TCC.', prov: 'inf', src: [p(17, 'Material D'), p(10)] },
    ],
  },
  {
    id: 'ka-9', sub: 'mutationen', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(17, 'Material D')], operator: 'Erklären',
    prompt: 'Gib den Mutationstyp im rps12-Gen an und erkläre, wie dadurch eine Streptomycin-Resistenz entstehen kann.',
    rubric: [
      { id: 'typ', label: 'Substitution (C → T) → Missense-Mutation: Pro wird durch Ser ersetzt', any: [['substitution|missense|austausch'], ['pro', 'ser']], weight: 1.5 },
      { id: 'protein', label: 'Das ribosomale Protein rps12 (Teil der Ribosomen) ist verändert', any: [['rps12|ribosomal|protein', 'veraendert|anders|andere']], weight: 1 },
      { id: 'bindung', label: 'Streptomycin kann an der veränderten kleinen Untereinheit nicht mehr (so gut) wirken/binden', any: [['streptomycin', 'nicht mehr|kann nicht|schlechter|wirkt nicht|bindet nicht|keine wirkung']], weight: 1.5 },
      { id: 'resistenz', label: 'Die Proteinbiosynthese läuft trotz Antibiotikum korrekt → Bakterien resistent', any: [['resistent|resistenz|ueberleben|wachsen weiter']], weight: 0.5 },
    ],
    model: 'Im Codon an Position 5 wird die Base C durch T ersetzt (CCC → TCC): eine Substitution, genauer eine Missense-Mutation, durch die Prolin gegen Serin ausgetauscht wird. Das Gen codiert rps12, ein Protein der Ribosomen. Das veränderte Protein verändert die kleine Ribosomenuntereinheit, an der Streptomycin angreift. Hypothese: Das Antibiotikum kann dort nicht mehr richtig binden oder wirken; die Ribosomen lesen die mRNA weiter korrekt ab, und die Bakterien überleben trotz Streptomycin – sie sind resistent.',
    why: [{ text: 'Nach Klausuraufgaben 3.1 und 3.2 deiner PDF; die Erklärung ist abgeleitet.', prov: 'inf', src: [p(17, 'Material D')] }],
  },
  {
    id: 'ki-1', sub: 'eukaryoten', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(14, 'Material A')], operator: 'Beschreiben und erklären',
    prompt: 'Beschreibe die Genexpression des Insulin-Gens und erkläre die Befunde (RNA mit 1426 und 330 Nucleotiden; Polypeptide mit 110, 86 und 51 Aminosäuren).',
    rubric: [
      { id: 'praemrna', label: '1426 Nt: Das Gen wird vollständig zur prä-mRNA transkribiert (mit Introns)', any: [['1426', 'prae|intron|transkri|vollstaendig']], weight: 1 },
      { id: 'reif', label: '330 Nt: reife mRNA nach dem Spleißen (Introns entfernt)', any: [['330', 'spleiss|intron|reif']], weight: 1 },
      { id: '110', label: '330 : 3 = 110 Codons → 110 AS (Translationsprodukt mit Signalsequenz)', any: [['110', 'codon|triplett|signal|translation|330']], weight: 1 },
      { id: '86', label: '86 AS: Proinsulin nach Abspaltung der Signalsequenz (24 AS)', any: [['86', 'signal|proinsulin|24']], weight: 1 },
      { id: '51', label: '51 AS: Insulin nach Herausschneiden der C-Kette (35 AS): A (21) + B (30)', any: [['51', 'c kette|c-kette|35|a kette|b kette|21|30']], weight: 1 },
    ],
    model: 'Das 1426 Nucleotide lange Insulin-Gen wird zunächst vollständig transkribiert – die prä-mRNA enthält noch die Introns (1426 Nt). Bei der RNA-Prozessierung werden die Introns herausgespleißt; die reife mRNA hat 330 codierende Nucleotide. Das sind 110 Codons, die in ein Polypeptid mit 110 Aminosäuren übersetzt werden: Signalsequenz (24) + B-Kette (30) + C-Kette (35) + A-Kette (21). Nach der Abspaltung der Signalsequenz bleibt das Proinsulin (86 AS). Vor der Freisetzung ins Blut wird die C-Kette herausgeschnitten; das aktive Insulin besteht aus A- und B-Kette (51 AS), verbunden über Disulfidbrücken.',
    why: [
      { text: 'Nach Aufgabe 1 aus Material A deiner PDF; Zuordnung abgeleitet aus Abbildung und Text.', prov: 'inf', src: [p(14, 'Material A')] },
      { text: 'In der Fachliteratur heißt das 110-AS-Translationsprodukt „Präproinsulin“. Deine PDF verwendet diesen Begriff nicht; in ihrer Abbildung ist schon das Translationsprodukt als „Proinsulin“ beschriftet.', prov: 'ext', ext: INSULIN_EXT },
    ],
  },
  {
    id: 'ki-2', sub: 'eukaryoten', type: 'match', level: 4, err: 'experiment', prov: 'inf', src: [p(14, 'Material A')],
    prompt: 'Ordne die Befunde den Stufen der Insulinsynthese zu.',
    pairs: [
      { left: 'RNA mit 1426 Nucleotiden', right: 'prä-mRNA mit Introns' },
      { left: 'RNA mit 330 Nucleotiden', right: 'reife mRNA nach dem Spleißen' },
      { left: 'Polypeptid mit 110 AS', right: 'Translationsprodukt mit Signalsequenz' },
      { left: 'Polypeptid mit 86 AS', right: 'Proinsulin mit C-Kette' },
      { left: 'Polypeptid mit 51 AS', right: 'aktives Insulin aus A- und B-Kette' },
    ],
    why: [{ text: '24 + 30 + 35 + 21 = 110; 30 + 35 + 21 = 86; 30 + 21 = 51.', prov: 'inf' }],
  },
  {
    id: 'ki-3', sub: 'mutationen', type: 'single', level: 4, err: 'code', prov: 'inf', src: [p(16, 'Material B')],
    prompt: 'Vergleiche die normale und die mutierte DNA-Sequenz. Welcher Mutationstyp liegt vor?',
    options: ['Insertion eines T nach „CT“ → Rasterschub-Mutation', 'Substitution C → T → Missense-Mutation', 'Deletion → Rasterschub-Mutation', 'Nonsense-Mutation'],
    answer: 0,
    feedback: { 1: 'Auf den ersten Blick sieht „CTC → CTT“ wie ein Austausch aus – aber danach sind alle Tripletts um eine Base verschoben (CGT CAC … statt GTC ACG …).' },
    why: [{ text: 'Normal: CTC GTC ACG …; mutiert: CTT CGT CAC … – nach „CT“ ist ein T eingefügt, alle folgenden Tripletts verschieben sich.', prov: 'inf', src: [p(16, 'Material B')] }],
  },
  {
    id: 'ki-4', sub: 'mutationen', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(16, 'Material B')], operator: 'Erklären',
    prompt: 'Erkläre die Folgen dieser Mutation für das Hormon Insulin.',
    rubric: [
      { id: 'raster', label: 'Rasterschub ab dem 4. Codon', any: [['raster|leseraster|verschieb']], weight: 1.5 },
      { id: 'as', label: 'Ab der 5. Aminosäure andere Aminosäuren (Gly-Ile-Val-Glu bleiben)', any: [['andere|falsche|veraendert', 'aminosaeure|sequenz|kette']], weight: 1 },
      { id: 'folge', label: 'Veränderte A-Kette, fehlende Cysteine/Disulfidbrücken → Insulin funktionslos', any: [['funktionslos|unwirksam|nicht funktion|keine funktion|disulfid|cystein|cys|inaktiv']], weight: 1.5 },
    ],
    model: 'Durch die Insertion verschiebt sich das Leseraster ab dem vierten Triplett. Die ersten vier Aminosäuren der A-Kette bleiben gleich (Gly-Ile-Val-Glu), danach werden andere Aminosäuren eingebaut. Dadurch fehlen die Cysteine, über die A- und B-Kette normalerweise durch Disulfidbrücken verbunden sind. Das Insulin erhält keine korrekte Struktur und ist funktionslos.',
    why: [
      { text: 'Rasterschub-Mutationen führen in der Regel zu einem funktionslosen Protein.', prov: 'pdf', src: [p(16)] },
      { text: '⚠️ In der Abbildung ist das mutierte Peptid nach „Leu“ als „His Ile“ gedruckt; die abgebildete mRNA ergibt „Leu Leu“. Für die Folgen spielt das keine Rolle.', prov: 'inf', src: [p(16, 'Material B')] },
    ],
  },
);
