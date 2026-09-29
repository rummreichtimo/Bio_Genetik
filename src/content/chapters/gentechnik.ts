import type { ContentPack } from '../index';
import { p } from '../helpers';

/**
 * Kapitel 5.3 · CRISPR/Cas-System (PDF S. 22–24, Buch S. 280–285)
 */
export const gentechnik: ContentPack = {
  lessons: [
    {
      sub: 'crispr-grundlagen',
      intro: 'Bei Hämophilie A fehlt der Gerinnungsfaktor VIII. In ersten Studien wurde ein intaktes Faktor-VIII-Gen in Leberzellen Betroffener integriert – ihre Blutgerinnung stieg um über 90 Prozent. Die Methode dahinter stammt aus Bakterien.',
      sections: [
        {
          id: 'phagen',
          title: 'Bakterien gegen Phagen',
          blocks: [
            {
              kind: 'text',
              md: 'Infizieren **Phagen** eine Bakterienzelle, injizieren sie ihre DNA und programmieren die Zelle um: Sie bildet Phagenbestandteile, die sich zu reifen Phagen zusammensetzen – die Bakterien platzen und setzen Hunderte neue Phagen frei.\n\nViele Bakterienarten schützen sich: Sie zerschneiden die injizierte Phagen-DNA mit Enzymen und bauen **Fragmente davon in ihr eigenes Genom** ein.',
              src: [p(22)],
            },
          ],
        },
        {
          id: 'aufbau',
          title: 'Aufbau: Spacer, Repeats, Cas',
          blocks: [
            {
              kind: 'bullets',
              items: [
                '**Spacer**: die eingebauten viralen DNA-Fragmente.',
                '**Repeats**: kurze, sich wiederholende Nucleotidsequenzen, zwischen denen die Spacer liegen.',
                '**CRISPR**: der Bereich aus Spacern und Repeats (*clustered regularly interspaced short palindromic repeats*).',
                '**Cas**: CRISPR-assoziierte Gene, die **Cas-Enzyme** codieren – sie können DNA entwinden und zerschneiden.',
              ],
              src: [p(22)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Ein Abwehrgedächtnis',
              md: 'Mit den Spacern besitzen die Bakterien eine Art **Abwehrgedächtnis**: Bei einer erneuten Infektion erkennen sie die Phagen wieder und vernichten sie effizient. Die CRISPR-DNA wird bei der Teilung an die **Tochterzellen** weitergegeben.',
              src: [p(22)],
            },
          ],
        },
        {
          id: 'abwehr',
          title: 'Virusabwehr in Schritten',
          blocks: [
            {
              kind: 'steps',
              steps: [
                { title: 'Transkription', text: 'Bei einer Infektion mit einem bekannten Phagen wird die gesamte CRISPR-Sequenz transkribiert → Vorläufer-RNA **prä-crRNA**.' },
                { title: 'Prozessierung', text: 'Die prä-crRNA wird zu kurzen **crRNA**-Molekülen verarbeitet. Jede enthält eine Sequenz, die zu einem bestimmten Spacer komplementär ist, und Repeat-Anteile.' },
                { title: 'tracrRNA + Cas', text: 'An die crRNA bindet die **tracrRNA** (trans-activating crRNA). Mit ihrer Hilfe wird das **Cas-Enzym** gebunden und zur Phagen-DNA geleitet.' },
                { title: 'Zielsuche', text: 'Der CRISPR/Cas-Komplex sucht die Phagen-DNA nach komplementären Sequenzen ab und bindet über die Spacer-Sequenz.' },
                { title: 'Schnitt', text: 'Das Cas-Enzym **schneidet beide Einzelstränge** der Phagen-DNA – sie wird unschädlich.' },
              ],
              src: [p(22)],
            },
            {
              kind: 'term',
              term: 'PAM (protospacer adjacent motif)',
              def: 'Drei Basen lange Erkennungssequenz, die sich in unmittelbarer Nähe der Zielsequenz befinden muss. PAM verhindert, dass Cas-Enzyme zufällig bakterielle DNA zerschneiden.',
              simple: 'Ein Sicherheits-Code: Nur wo er steht, darf geschnitten werden.',
              src: [p(22)],
            },
            { kind: 'check', questionIds: ['cg-q3', 'cg-q4'] },
          ],
        },
      ],
    },
    {
      sub: 'crispr-anwendung',
      intro: 'Wie wurde aus dem Abwehrsystem der Bakterien eine „Genschere“, mit der sich das Genom von Lebewesen präzise verändern lässt – und wo liegen die Grenzen?',
      sections: [
        {
          id: 'genschere',
          title: 'Vom Abwehrsystem zur Genschere',
          blocks: [
            {
              kind: 'text',
              md: 'Entscheidend war die Erkenntnis, dass die zu den Spacern komplementären Sequenzen **durch andere RNA-Sequenzen austauschbar** sind. Kurze RNA-Moleküle lassen sich im Labor mit jeder Sequenz herstellen. Ersetzt man die Spacer-Sequenz durch künstliche RNA, führt man das Cas-Enzym **gezielt an jede gewünschte DNA-Stelle** und erzeugt dort **Doppelstrangbrüche**. Diese künstliche RNA heißt **Guide-RNA (gRNA)**. Voraussetzung: Die Sequenz der Zielstelle muss **bekannt** sein. Für die Laborarbeit wurden crRNA und tracrRNA zu **einem** stabilen Molekül verbunden, der **Leit-RNA**.',
              src: [p(22)],
            },
          ],
        },
        {
          id: 'einbringen',
          title: 'Einbringen in Zellen',
          blocks: [
            {
              kind: 'compare',
              columns: ['als DNA (in Plasmiden)', 'als Proteinkomplex'],
              rows: [
                { label: 'Prinzip', cells: ['DNA für Leit-RNA und Cas-Enzym wird eingeschleust; das System wird erst in der Zelle gebildet', 'fertiger CRISPR/Cas-Komplex wird eingeschleust'] },
                { label: 'Wirkung', cells: ['DNA wird ins Genom integriert (z. B. Hämophilie-A-Gentherapie)', 'sofort aktiv'] },
                { label: 'Dauer / Weitergabe', cells: ['wird bei Zellteilungen an Tochterzellen weitergegeben', 'wird relativ schnell abgebaut, nicht weitergegeben'] },
              ],
              src: [p(23)],
            },
          ],
        },
        {
          id: 'reparatur',
          title: 'DNA-Reparatur nach dem Schnitt',
          blocks: [
            {
              kind: 'compare',
              columns: ['homologe Reparatur', 'nicht-homologe Reparatur'],
              rows: [
                { label: 'Vorlage', cells: ['unbeschädigte Sequenz eines Schwesterchromatids oder homologen Chromosoms in der Nähe', 'keine – die Stränge werden sofort, unabhängig von der Sequenz verbunden'] },
                { label: 'Nutzung', cells: ['gezielter Einbau eines Fremdgens mit homologen Enden', 'gezielte Inaktivierung von Genen'] },
              ],
              src: [p(23)],
            },
            {
              kind: 'steps',
              title: 'Zwei Anwendungen',
              steps: [
                { title: 'Gen ausschalten', text: 'Doppelstrangschnitt im Gen; bei der Reparatur gehen häufig Nucleotide verloren oder werden eingefügt → **Rasterschub** → Gen inaktiv. Da keine Fremd-DNA zurückbleibt, ist die Veränderung **nicht von spontanen Mutationen zu unterscheiden**.' },
                { title: 'Fremdgen einbauen', text: 'Das Fremdgen erhält Enden, die **homolog** zu den flankierenden Enden der Bruchstelle sind, und wird mit CRISPR/Cas eingeschleust. Die homologe Reparatur baut es ein. Das gilt als **Gentechnik**, weil Zellen mit Fremd-DNA entstehen.' },
              ],
              src: [p(23)],
            },
            {
              kind: 'text',
              md: 'Weltweit werden neue Cas-Enzyme aus Bakterien isoliert und weiterentwickelt, um mehr Zielsequenzen zu erreichen – mittlerweile sind **über 40** bekannt.',
              src: [p(23)],
            },
            { kind: 'check', questionIds: ['ca-q4', 'ca-q5'] },
          ],
        },
        {
          id: 'zucht',
          title: 'Pflanzen- und Tierzucht',
          blocks: [
            {
              kind: 'bullets',
              title: 'Pflanzenzucht – der Hauptanwendungsbereich',
              items: [
                'Ziele: **herbizidresistente** Pflanzen, **mehr Ertrag**, Toleranz gegen **Trockenheit und salzhaltige Böden** (Klimawandel).',
                'Kanada/USA: genomeditierter, herbizidresistenter **Raps**. USA: **Sojaöl** mit verändertem Fettsäuremuster, auch bei hohen Temperaturen nutzbar.',
                'Japan seit 2021: **Tomaten** mit viel blutdrucksenkendem Stoff. China 2014: **mehltauresistenter Weizen** – ein Gen für das Eindringen des Pilzes wurde ausgeschaltet.',
                'USA: in den ersten neun Monaten 2020 über 60 genomeditierte Pflanzen zugelassen. EU 2022: vier Anträge (u. a. trockentoleranter bzw. besser verdaulicher Mais). Spanien: Brokkoli für Trockenheit und salzige Böden geplant.',
              ],
              src: [p(23)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Tierzucht: die Rote Goldbrasse',
              md: 'In Japan wurde bei der **Roten Goldbrasse** ein Gen ausgeschaltet, das die Bildung der Skelettmuskulatur reguliert. Die Fische bilden **bis zu 20 % mehr Muskulatur** – das erste zugelassene genomeditierte Tier.',
              src: [p(23)],
            },
          ],
        },
        {
          id: 'mensch',
          title: 'Anwendung beim Menschen',
          blocks: [
            {
              kind: 'text',
              md: 'Beim Menschen wird CRISPR/Cas vor allem in der **Grundlagenforschung** eingesetzt; untersucht werden Gentherapien bei Mukoviszidose, Thalassämie, Sichelzellenanämie, Krebs und HIV. Angewendet wird es an Zellen **außerhalb des Körpers (ex vivo)** oder **im Körper (in vivo)**.',
              src: [p(24)],
            },
            {
              kind: 'compare',
              columns: ['Beta-Thalassämie (ex vivo)', 'LCA – Netzhauterkrankung (in vivo)'],
              rows: [
                { label: 'Ursache', cells: ['beide Allele für β-Globin mutiert → kein funktionstüchtiges Hämoglobin, ständige Bluttransfusionen', 'Punktmutation im CEP290-Gen (wichtig für die Lichtsinneszellen) → starke Sehstörung bis Blindheit'] },
                { label: 'Vorgehen', cells: ['blutbildende Stammzellen entnommen; ein Gen stillgelegt, das die Bildung von fetalem Hämoglobin verhindert; Zellen zurückgegeben', 'viraler Vektor mit der Information für CRISPR/Cas direkt ins Auge injiziert; das mutierte Allel soll zerschnitten und repariert werden'] },
                { label: 'Ergebnis', cells: ['2019 in Regensburg erstmals: keine Transfusionen mehr nötig; seit Ende 2019 über 15 Behandelte, sehr vielversprechend', 'erste klinische Studien deuten auf einen Erfolg hin'] },
              ],
              src: [p(24)],
            },
          ],
        },
        {
          id: 'risiken',
          title: 'Off- und On-Target-Effekte',
          blocks: [
            {
              kind: 'compare',
              columns: ['Off-Target-Effekt', 'On-Target-Effekt'],
              rows: [
                { label: 'Was passiert?', cells: ['Das System schneidet nicht an der gewünschten Stelle – das Ziel wird verfehlt.', 'Die Zielsequenz wird getroffen, aber in unerwünschter Weise verändert.'] },
                { label: 'Ursache / Folge', cells: ['Zielsequenz kommt mehrfach vor; die Guide-RNA passt auch zu anderen Stellen → Mutationen an falscher Stelle, bei in-vivo-Editierung z. B. Krebs möglich', 'unerwünschte Veränderung am Ziel'] },
              ],
              src: [p(24)],
            },
            { kind: 'check', questionIds: ['ca-q10', 'ca-q11'] },
          ],
        },
        {
          id: 'material',
          title: 'Material: Beta-Thalassämie und Gene Drive',
          blocks: [
            {
              kind: 'text',
              md: '**Hämoglobin-Wechsel:** Beim Embryo besteht Hämoglobin aus zwei **α-** und zwei **γ-Ketten**. Nach der Geburt schaltet der Transkriptionsfaktor **BCL11A** die γ-Ketten ab und die β-Ketten an (2 α + 2 β). Bei Beta-Thalassämie ist das β-Gen mutiert. 2019 wurde in entnommenen Stammzellen das **Gen für BCL11A ausgeschaltet**; die zurückübertragenen Zellen bildeten Erythrozyten mit funktionsfähigem Hämoglobin aus 2 α + 2 γ. Alle Behandelten waren symptomfrei – wie lange die Wirkung anhält, ist offen.',
              src: [p(24, 'Material A')],
            },
            {
              kind: 'text',
              md: '**Gene Drive gegen Malaria:** Jährlich erkranken über 200 Millionen Menschen an Malaria, etwa 400 000 sterben. Mit CRISPR/Cas wird in **ein Allel** der Anopheles-Mücke ein **Resistenzgen** und zusätzlich das **Gen für CRISPR/Cas** eingefügt. Die gebildete Genschere schneidet das **zweite Allel**; die homologe Reparatur nutzt das erste Allel als Vorlage und baut beide Gene auch dort ein → die Mücke ist **homozygot**. So breitet sich die Resistenz beschleunigt in der Population aus.',
              src: [p(24, 'Material B')],
            },
          ],
        },
      ],
    },
  ],

  terms: [
    { id: 'cg-phage', sub: 'crispr-grundlagen', term: 'Phagen', def: 'Viren, die Bakterien infizieren: Sie injizieren ihre DNA, lassen die Bakterien neue Phagen bilden und bringen sie zum Platzen.', simple: 'Viren, die Bakterien befallen.', src: [p(22)] },
    { id: 'cg-spacer', sub: 'crispr-grundlagen', term: 'Spacer', def: 'In das Bakteriengenom eingebaute Fragmente von Phagen-DNA; liegen zwischen den Repeats.', simple: 'Gespeicherte „Fahndungsfotos“ früherer Phagen.', src: [p(22)] },
    { id: 'cg-repeats', sub: 'crispr-grundlagen', term: 'Repeats', def: 'Kurze, sich wiederholende Nucleotidsequenzen im CRISPR-Bereich, zwischen denen die Spacer liegen.', simple: 'Die gleichbleibenden Trennstücke.', src: [p(22)] },
    { id: 'cg-crispr', sub: 'crispr-grundlagen', term: 'CRISPR', def: 'Abschnitte des Bakteriengenoms aus Spacern und Repeats (clustered regularly interspaced short palindromic repeats).', simple: 'Das Archiv der Abwehr.', src: [p(22)] },
    { id: 'cg-cas', sub: 'crispr-grundlagen', term: 'Cas-Enzym', def: 'Von CRISPR-assoziierten Genen (Cas) codiertes Enzym, das DNA entwinden und zerschneiden kann.', simple: 'Die Schere.', src: [p(22)] },
    { id: 'cg-crrna', sub: 'crispr-grundlagen', term: 'crRNA', def: 'Kurzes RNA-Molekül aus der Prozessierung der prä-crRNA; enthält eine zu einem Spacer komplementäre Sequenz sowie Repeat-Anteile.', simple: 'Die Such-Schablone.', src: [p(22)] },
    { id: 'cg-tracrrna', sub: 'crispr-grundlagen', term: 'tracrRNA', def: 'trans-activating crRNA: bindet an die crRNA und hilft, das Cas-Enzym zu binden und zur Ziel-DNA zu leiten.', simple: 'Das Verbindungsstück zwischen Schablone und Schere.', src: [p(22)] },
    { id: 'cg-pam', sub: 'crispr-grundlagen', term: 'PAM', def: 'protospacer adjacent motif: drei Basen lange Erkennungssequenz nahe der Zielsequenz; verhindert, dass bakterielle DNA zufällig zerschnitten wird.', simple: 'Der Sicherheits-Code neben dem Ziel.', src: [p(22)] },
    { id: 'ca-grna', sub: 'crispr-anwendung', term: 'Guide-RNA (gRNA) / Leit-RNA', def: 'Im Labor synthetisierte RNA, die das Cas-Enzym an eine gewünschte, bekannte DNA-Stelle führt; crRNA und tracrRNA sind dabei zu einem Molekül verbunden.', simple: 'Das Navi für die Genschere.', src: [p(22)] },
    { id: 'ca-homolog', sub: 'crispr-anwendung', term: 'homologe Reparatur', def: 'Reparatur eines Doppelstrangbruchs mithilfe einer unbeschädigten Vorlage (Schwesterchromatid oder homologes Chromosom); wird genutzt, um Fremdgene einzubauen.', simple: 'Reparatur mit Kopiervorlage.', src: [p(23)] },
    { id: 'ca-nichthomolog', sub: 'crispr-anwendung', term: 'nicht-homologe Reparatur', def: 'Die getrennten Stränge werden sofort und unabhängig von ihrer Sequenz zusammengefügt; dabei gehen oft Nucleotide verloren oder werden eingefügt – genutzt zum Ausschalten von Genen.', simple: 'Schnell zusammenkleben – mit kleinen Fehlern.', src: [p(23)] },
    { id: 'ca-genomedit', sub: 'crispr-anwendung', term: 'Genomeditierung', def: 'Gezielte Veränderung des Genoms, z. B. mit CRISPR/Cas (Gene ausschalten oder Fremdgene einbauen).', simple: 'Gezieltes Umschreiben des Erbguts.', src: [p(23)] },
    { id: 'ca-exvivo', sub: 'crispr-anwendung', term: 'ex vivo / in vivo', def: 'ex vivo: Anwendung an Zellen außerhalb des Körpers, die danach zurückgegeben werden; in vivo: Anwendung im Körper der Betroffenen.', simple: 'Außerhalb bzw. innerhalb des Körpers.', src: [p(24)] },
    { id: 'ca-vektor', sub: 'crispr-anwendung', term: 'viraler Vektor', def: 'Virus als Transportmittel, das die genetische Information (z. B. für ein CRISPR/Cas-System) in Zellen bringt – bei LCA direkt ins Auge injiziert.', simple: 'Ein Virus als Paketbote.', src: [p(24)] },
    { id: 'ca-offtarget', sub: 'crispr-anwendung', term: 'Off-Target-Effekt', def: 'CRISPR/Cas schneidet an einer nicht gewünschten Stelle, etwa weil die Zielsequenz mehrfach vorkommt; kann Mutationen und schwere Nebenwirkungen (z. B. Krebs) verursachen.', simple: 'Die Schere schneidet daneben.', src: [p(24)] },
    { id: 'ca-ontarget', sub: 'crispr-anwendung', term: 'On-Target-Effekt', def: 'Die Zielsequenz wird getroffen, aber in unerwünschter Weise verändert.', simple: 'Richtige Stelle, falsches Ergebnis.', src: [p(24)] },
    { id: 'ca-genedrive', sub: 'crispr-anwendung', term: 'Gene Drive', def: 'Methode, bei der ein Allel mit Zielgen und CRISPR/Cas-Gen das zweite Allel schneidet und per homologer Reparatur überschreibt; die Veränderung liegt dann homozygot vor und breitet sich beschleunigt aus.', simple: 'Ein Gen, das sich selbst in die zweite Kopie kopiert.', src: [p(24, 'Material B')] },
    { id: 'ca-bcl11a', sub: 'crispr-anwendung', term: 'BCL11A', def: 'Transkriptionsfaktor, der nach der Geburt die Bildung der γ-Ketten des Hämoglobins abschaltet und die der β-Ketten aktiviert.', simple: 'Der Schalter von „Baby-Hämoglobin“ auf Erwachsenen-Hämoglobin.', src: [p(24, 'Material A')] },
  ],

  cards: [
    { id: 'cg-c1', sub: 'crispr-grundlagen', kind: 'prozess', front: 'CRISPR/Cas-Virusabwehr in Bakterien', back: 'CRISPR transkribieren (prä-crRNA) → crRNA → + tracrRNA → Cas-Enzym gebunden → Suche nach komplementärer Phagen-DNA (PAM nötig) → Cas schneidet beide Stränge.', src: [p(22)], prov: 'pdf' },
    { id: 'cg-c2', sub: 'crispr-grundlagen', kind: 'frage', front: 'Warum spricht man von einem Abwehrgedächtnis der Bakterien?', back: 'Die Spacer speichern Fragmente früherer Phagen. Bei erneuter Infektion werden die Phagen wiedererkannt und effizient vernichtet; die CRISPR-DNA wird an Tochterzellen weitergegeben.', src: [p(22)], prov: 'pdf' },
    { id: 'cg-c3', sub: 'crispr-grundlagen', kind: 'ursache', front: 'Ursache: Neben der Zielsequenz fehlt die PAM-Sequenz. → Wirkung?', back: 'Das Cas-Enzym schneidet dort nicht – so wird verhindert, dass die bakterieneigene DNA zufällig zerschnitten wird.', src: [p(22)], prov: 'pdf' },
    { id: 'ca-c1', sub: 'crispr-anwendung', kind: 'vergleich', front: 'Homologe vs. nicht-homologe Reparatur', back: 'Homolog: mit Vorlage (Schwesterchromatid/homologes Chromosom) → Fremdgen gezielt einbauen.\nNicht-homolog: Enden sofort verbunden, oft Verlust/Einfügen von Nucleotiden → Gen ausschalten (Rasterschub).', src: [p(23)], prov: 'pdf' },
    { id: 'ca-c2', sub: 'crispr-anwendung', kind: 'vergleich', front: 'CRISPR/Cas als DNA (Plasmid) vs. als Proteinkomplex eingebracht', back: 'DNA: integriert ins Genom, an Tochterzellen weitergegeben.\nProteinkomplex: sofort aktiv, schnell abgebaut, nicht weitergegeben.', src: [p(23)], prov: 'pdf' },
    { id: 'ca-c3', sub: 'crispr-anwendung', kind: 'frage', front: 'Warum lässt sich ein per CRISPR/Cas ausgeschaltetes Gen nicht von einer spontanen Mutation unterscheiden?', back: 'Es bleibt keine Fremd-DNA zurück – nur einzelne verlorene oder eingefügte Nucleotide, wie bei einer natürlichen Mutation.', src: [p(23)], prov: 'pdf' },
    { id: 'ca-c4', sub: 'crispr-anwendung', kind: 'experiment', front: 'Beta-Thalassämie-Therapie: Was wurde ausgeschaltet – und mit welchem Ergebnis?', back: 'Das Gen für BCL11A in entnommenen Stammzellen → die γ-Ketten werden weiter gebildet → Hämoglobin aus 2 α + 2 γ, keine Transfusionen mehr nötig.', src: [p(24, 'Material A')], prov: 'pdf' },
    { id: 'ca-c5', sub: 'crispr-anwendung', kind: 'vergleich', front: 'Off-Target- vs. On-Target-Effekt', back: 'Off: falsche Stelle geschnitten (Zielsequenz mehrfach vorhanden).\nOn: richtige Stelle, aber unerwünscht verändert.', src: [p(24)], prov: 'pdf' },
    { id: 'ca-c6', sub: 'crispr-anwendung', kind: 'prozess', front: 'Gene Drive in 4 Schritten', back: 'Resistenzgen + CRISPR/Cas-Gen in ein Allel → Genschere wird gebildet → schneidet das zweite Allel → homologe Reparatur kopiert beide Gene hinein → homozygot.', src: [p(24, 'Material B')], prov: 'pdf' },
  ],

  questions: [
    // ---------------- crispr-grundlagen ----------------
    {
      id: 'cg-q1', sub: 'crispr-grundlagen', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(22)],
      prompt: 'Was sind Spacer im CRISPR-System?',
      options: ['in das Bakteriengenom eingebaute Fragmente von Phagen-DNA', 'Enzyme, die DNA schneiden', 'sich wiederholende Bakterien-Sequenzen', 'Bindestellen im Ribosom'],
      answer: 0,
      feedback: { 2: 'Das sind die Repeats – die Spacer liegen zwischen ihnen.' },
      why: [{ text: 'Die Bakterien bauen Fragmente zerschnittener Phagen-DNA in ihr Genom ein: die Spacer.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'cg-q2', sub: 'crispr-grundlagen', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(22)],
      prompt: 'Ordne die Bestandteile des CRISPR/Cas-Systems ihrer Aufgabe zu.',
      pairs: [
        { left: 'Spacer', right: 'gespeicherte Fragmente früherer Phagen-DNA' },
        { left: 'crRNA', right: 'enthält die zum Spacer komplementäre Suchsequenz' },
        { left: 'tracrRNA', right: 'bindet an die crRNA und hilft, das Cas-Enzym zu binden' },
        { left: 'Cas-Enzym', right: 'entwindet und zerschneidet DNA' },
        { left: 'PAM', right: 'drei Basen lange Erkennungssequenz neben dem Ziel' },
      ],
      why: [{ text: 'Zusammen erkennen und zerschneiden sie die Phagen-DNA.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'cg-q3', sub: 'crispr-grundlagen', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(22)],
      prompt: 'Bringe die Schritte der Virusabwehr mit CRISPR/Cas in die richtige Reihenfolge.',
      items: [
        'Die CRISPR-Sequenz wird transkribiert (prä-crRNA)',
        'Die prä-crRNA wird zu kurzen crRNA-Molekülen prozessiert',
        'Die tracrRNA bindet an die crRNA, das Cas-Enzym wird gebunden',
        'Der Komplex sucht die Phagen-DNA nach komplementären Sequenzen ab',
        'Das Cas-Enzym schneidet beide Stränge der Phagen-DNA',
      ],
      why: [{ text: 'Reihenfolge laut PDF S. 22.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'cg-q4', sub: 'crispr-grundlagen', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(22)],
      prompt: 'Welche Funktion hat die PAM-Sequenz?',
      options: [
        'Sie muss neben der Zielsequenz liegen und verhindert so, dass Cas-Enzyme zufällig bakterielle DNA zerschneiden.',
        'Sie codiert das Cas-Enzym.',
        'Sie verbindet crRNA und tracrRNA.',
        'Sie ist der Primer für die Transkription.',
      ],
      answer: 0,
      why: [{ text: 'In unmittelbarer Nähe der Zielsequenz muss sich die drei Basen lange PAM befinden.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'cg-q5', sub: 'crispr-grundlagen', type: 'tf', level: 1, err: 'facts', prov: 'pdf', src: [p(22)],
      prompt: 'Das Abwehrgedächtnis der Bakterien geht bei der Zellteilung verloren.',
      answer: false,
      correction: 'Die CRISPR-DNA wird bei der Teilung an die Tochterzellen weitergegeben – auch sie besitzen das Abwehrgedächtnis.',
      why: [{ text: 'Die Spacer sind Teil des Bakteriengenoms und werden mit ihm verdoppelt.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'cg-q6', sub: 'crispr-grundlagen', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(22)],
      prompt: 'Warum können Bakterien mit CRISPR/Cas bestimmte Phagen bei einer zweiten Infektion sehr effizient vernichten?',
      options: [
        'Spacer aus der ersten Infektion liefern die Suchsequenz, mit der die Phagen-DNA wiedererkannt wird.',
        'Die Phagen können beim zweiten Mal keine DNA mehr injizieren.',
        'Die Bakterien bilden Antikörper.',
        'Die Phagen-DNA wird durch Hitze zerstört.',
      ],
      answer: 0,
      why: [{ text: 'Mit den Spacern besitzen die Bakterien eine Art Abwehrgedächtnis.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'cg-q7', sub: 'crispr-grundlagen', type: 'cloze', level: 1, err: 'terms', prov: 'pdf', src: [p(22)],
      prompt: 'Ergänze die Lücken.',
      text: 'Die Abschnitte des Bakteriengenoms aus {{0}} und {{1}} werden CRISPR genannt. Die dazugehörigen Gene heißen {{2}}; sie codieren Enzyme, die DNA entwinden und zerschneiden.',
      gaps: [
        { accept: ['Spacern', 'Spacer'], options: ['Spacern', 'Exons', 'Primern'] },
        { accept: ['Repeats'], options: ['Repeats', 'Introns', 'Codons'] },
        { accept: ['Cas', 'Cas-Gene'], options: ['Cas', 'Hox', 'Tet'] },
      ],
      why: [{ text: 'Cas = CRISPR-assoziierte Sequenzen.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'cg-q8', sub: 'crispr-grundlagen', type: 'free', level: 3, err: 'mechanism', prov: 'pdf', src: [p(22)], operator: 'Erklären',
      prompt: 'Erkläre, wie Bakterien mit dem CRISPR/Cas-System Phagen abwehren.',
      rubric: [
        { id: 'spacer', label: 'Bei früheren Infektionen wurden Phagen-DNA-Fragmente als Spacer eingebaut (Gedächtnis)', any: [['spacer|fragment|gedaechtnis|eingebaut']], weight: 1 },
        { id: 'crrna', label: 'CRISPR wird transkribiert (prä-crRNA) und zu crRNA prozessiert', any: [['crrna|prae crrna|transkri']], weight: 1 },
        { id: 'cas', label: 'Mit der tracrRNA wird das Cas-Enzym gebunden und zur Phagen-DNA geleitet', any: [['tracr|cas']], weight: 1 },
        { id: 'schnitt', label: 'Der Komplex bindet komplementär an die Phagen-DNA; Cas schneidet beide Stränge', any: [['schneid|zerschn|doppelstrangbruch', 'phagen|dna|strang']], weight: 1 },
        { id: 'pam', label: 'PAM neben dem Ziel verhindert Schnitte in der eigenen DNA', any: [['pam']], weight: 0.5 },
      ],
      model: 'Bei einer früheren Infektion haben die Bakterien Fragmente der Phagen-DNA als Spacer zwischen die Repeats ihres CRISPR-Bereichs eingebaut. Bei einer erneuten Infektion wird der CRISPR-Bereich transkribiert; die prä-crRNA wird zu kurzen crRNA-Molekülen prozessiert, deren Sequenz zu einem Spacer passt. Die tracrRNA bindet an die crRNA und bindet das Cas-Enzym. Der Komplex sucht die Phagen-DNA nach der komplementären Sequenz ab, bindet dort, und das Cas-Enzym schneidet beide Stränge – die Phagen-DNA wird unschädlich. Geschnitten wird nur, wo neben dem Ziel die PAM-Sequenz liegt; so bleibt die eigene DNA verschont.',
      why: [{ text: 'Abb. „Virusabwehr durch das CRISPR/Cas-System“ deiner PDF.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'cg-q9', sub: 'crispr-grundlagen', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(22)],
      prompt: 'Was fehlt Menschen mit Hämophilie A?',
      options: ['der Gerinnungsfaktor VIII', 'das Enzym Helicase', 'rote Blutzellen', 'das Protein Fibrillin'],
      answer: 0,
      why: [{ text: 'Die Erbkrankheit beruht auf einer Mutation im Faktor-VIII-Gen; das Blut gerinnt nicht oder zu langsam.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'cg-q10', sub: 'crispr-grundlagen', type: 'free', level: 4, err: 'mechanism', prov: 'inf', src: [p(22)], operator: 'Begründen',
      prompt: 'Die Spacer liegen im Bakteriengenom – ihre Sequenz ist identisch mit der Zielsequenz in der Phagen-DNA. Begründe, warum das Cas-Enzym trotzdem nicht das eigene CRISPR-Archiv zerschneidet.',
      rubric: [
        { id: 'pam', label: 'Geschnitten wird nur, wenn neben der Zielsequenz die PAM-Sequenz liegt', any: [['pam|erkennungssequenz']], weight: 1.5 },
        { id: 'fehlt', label: 'Neben den Spacern im Bakteriengenom fehlt diese PAM (dort liegen Repeats)', any: [['fehlt|nicht vorhanden|keine|ohne|repeat']], weight: 1 },
        { id: 'schutz', label: 'So wird die bakterieneigene DNA geschützt', any: [['schutz|eigen|bakteriell|verschont|nicht zerschn']], weight: 0.5 },
      ],
      model: 'Das Cas-Enzym schneidet nur dort, wo sich in unmittelbarer Nähe der Zielsequenz die drei Basen lange PAM-Sequenz befindet. In der Phagen-DNA liegt sie neben der Zielsequenz; im CRISPR-Bereich des Bakteriums sind die Spacer dagegen von Repeats umgeben, dort fehlt die PAM. Deshalb bleibt die eigene DNA verschont – genau diese Aufgabe schreibt deine PDF der PAM zu.',
      why: [
        { text: 'Laut PDF verhindert die PAM, dass Cas-Enzyme zufällig bakterielle DNA zerschneiden.', prov: 'pdf', src: [p(22)] },
        { text: 'Dass neben den Spacern im CRISPR-Bereich keine PAM liegt, ist eine Schlussfolgerung.', prov: 'inf' },
      ],
    },
    // ---------------- crispr-anwendung ----------------
    {
      id: 'ca-q1', sub: 'crispr-anwendung', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(22)],
      prompt: 'Was ist die Guide-RNA (gRNA)?',
      options: [
        'eine im Labor hergestellte RNA, die das Cas-Enzym an eine gewünschte DNA-Stelle führt',
        'die mRNA des Cas-Enzyms',
        'ein Enzym, das DNA repariert',
        'eine RNA, die Phagen herstellen',
      ],
      answer: 0,
      why: [{ text: 'Ersetzt man die Spacer-Sequenz durch künstliche RNA, lässt sich Cas gezielt an jede gewünschte DNA-Stelle führen.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'ca-q2', sub: 'crispr-anwendung', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(22)],
      prompt: 'Was ist Voraussetzung, um mit CRISPR/Cas eine bestimmte DNA-Stelle zu schneiden?',
      options: ['Die Sequenz der DNA-Stelle muss bekannt sein.', 'Die DNA muss vorher per PCR vervielfältigt werden.', 'Die Zelle muss haploid sein.', 'Die Stelle muss methyliert sein.'],
      answer: 0,
      why: [{ text: 'Nur dann lässt sich eine passende Guide-RNA synthetisieren.', prov: 'pdf', src: [p(22)] }],
    },
    {
      id: 'ca-q3', sub: 'crispr-anwendung', type: 'match', level: 2, err: 'comparison', prov: 'pdf', src: [p(23)],
      prompt: 'Ordne die Eigenschaften der Art des Einbringens zu.',
      pairs: [
        { left: 'als DNA in Plasmiden', right: 'wird ins Genom integriert und an Tochterzellen weitergegeben' },
        { left: 'als Proteinkomplex', right: 'sofort aktiv, aber schnell abgebaut' },
      ],
      distractors: ['wirkt nur in Bakterien'],
      why: [{ text: 'Die Gentherapie bei Hämophilie A nutzt das Einbringen als DNA.', prov: 'pdf', src: [p(23)] }],
    },
    {
      id: 'ca-q4', sub: 'crispr-anwendung', type: 'match', level: 2, err: 'comparison', prov: 'pdf', src: [p(23)],
      prompt: 'Ordne die Reparaturmechanismen zu.',
      pairs: [
        { left: 'homologe Reparatur', right: 'nutzt eine unbeschädigte Sequenz als Vorlage – ermöglicht den Einbau eines Fremdgens' },
        { left: 'nicht-homologe Reparatur', right: 'fügt die Enden sofort sequenzunabhängig zusammen – eignet sich zum Ausschalten von Genen' },
      ],
      why: [{ text: 'Beide Mechanismen werden in der Gentechnik gezielt genutzt.', prov: 'pdf', src: [p(23)] }],
    },
    {
      id: 'ca-q5', sub: 'crispr-anwendung', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(23)],
      prompt: 'Wie wird mit CRISPR/Cas ein Gen gezielt ausgeschaltet?',
      options: [
        'Ein Doppelstrangschnitt im Gen; bei der Reparatur gehen Nucleotide verloren oder werden eingefügt → Rasterschub → Gen inaktiv.',
        'Das Cas-Enzym methyliert das Gen.',
        'Das Gen wird vollständig aus der Zelle entfernt.',
        'Die Guide-RNA blockiert dauerhaft die Transkription.',
      ],
      answer: 0,
      why: [{ text: 'In Folge einer Deletion oder Insertion verschiebt sich das Leseraster (vgl. Rasterschub-Mutation, PDF S. 16).', prov: 'pdf', src: [p(23), p(16)] }],
    },
    {
      id: 'ca-q6', sub: 'crispr-anwendung', type: 'tf', level: 2, err: 'facts', prov: 'pdf', src: [p(23)],
      prompt: 'Ein mit CRISPR/Cas ausgeschaltetes Gen lässt sich immer von einer spontanen Mutation unterscheiden.',
      answer: false,
      correction: 'Weil keine Fremd-DNA zurückbleibt, ist die Veränderung nicht von spontanen Mutationen zu unterscheiden.',
      why: [{ text: 'Das ist relevant für die Frage, ob solche Pflanzen als „gentechnisch verändert“ gelten.', prov: 'pdf', src: [p(23)] }],
    },
    {
      id: 'ca-q7', sub: 'crispr-anwendung', type: 'single', level: 2, err: 'facts', prov: 'pdf', src: [p(23)],
      prompt: 'Warum gilt der Einbau eines Fremdgens mit CRISPR/Cas als Gentechnik?',
      options: ['Weil dabei Zellen oder Lebewesen mit Fremd-DNA entstehen.', 'Weil ein Cas-Enzym verwendet wird.', 'Weil das Gen ausgeschaltet wird.', 'Weil es nur im Labor funktioniert.'],
      answer: 0,
      why: [{ text: 'Beim Ausschalten bleibt keine Fremd-DNA zurück, beim Einbau schon.', prov: 'pdf', src: [p(23)] }],
    },
    {
      id: 'ca-q8', sub: 'crispr-anwendung', type: 'match', level: 1, err: 'facts', prov: 'pdf', src: [p(23)],
      prompt: 'Ordne die genomeditierten Organismen ihrer Veränderung zu.',
      pairs: [
        { left: 'Weizen (China, 2014)', right: 'resistent gegen Mehltau' },
        { left: 'Tomate (Japan, seit 2021)', right: 'viel blutdrucksenkender Stoff' },
        { left: 'Raps (Kanada/USA)', right: 'herbizidresistent' },
        { left: 'Rote Goldbrasse (Japan)', right: 'bis zu 20 % mehr Skelettmuskulatur' },
        { left: 'Sojaöl (USA)', right: 'verändertes Fettsäuremuster' },
      ],
      why: [{ text: 'Alle Beispiele stehen auf PDF S. 23.', prov: 'pdf', src: [p(23)] }],
    },
    {
      id: 'ca-q9', sub: 'crispr-anwendung', type: 'single', level: 2, err: 'terms', prov: 'pdf', src: [p(24)],
      prompt: 'Was bedeutet eine Anwendung „ex vivo“?',
      options: [
        'Zellen werden außerhalb des Körpers verändert und anschließend zurückgegeben.',
        'Die Genschere wird direkt in den Körper gegeben.',
        'Die Anwendung erfolgt nur an Bakterien.',
        'Die Anwendung erfolgt an Embryonen.',
      ],
      answer: 0,
      why: [{ text: 'Beispiel: Bei Beta-Thalassämie wurden Stammzellen entnommen, außerhalb verändert und zurückgegeben (ex vivo); bei LCA wurde ein viraler Vektor ins Auge gespritzt (in vivo).', prov: 'pdf', src: [p(24)] }],
    },
    {
      id: 'ca-q10', sub: 'crispr-anwendung', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(24)],
      prompt: 'Was ist ein Off-Target-Effekt?',
      options: [
        'CRISPR/Cas schneidet an einer nicht gewünschten Stelle, z. B. weil die Zielsequenz mehrfach vorkommt.',
        'Die Zielsequenz wird getroffen, aber unerwünscht verändert.',
        'Das Cas-Enzym schneidet gar nicht.',
        'Die Guide-RNA wird abgebaut.',
      ],
      answer: 0,
      feedback: { 1: 'Das ist ein On-Target-Effekt.' },
      why: [{ text: 'Die Guide-RNA ist dann auch zu anderen Sequenzen komplementär – dort entstehen Mutationen, bei in-vivo-Editierung z. B. mit Krebsrisiko.', prov: 'pdf', src: [p(24)] }],
    },
    {
      id: 'ca-q11', sub: 'crispr-anwendung', type: 'single', level: 2, err: 'terms', prov: 'pdf', src: [p(24)],
      prompt: 'Was ist ein On-Target-Effekt?',
      options: ['Die Zielsequenz wird getroffen, aber in unerwünschter Weise verändert.', 'Die Zielsequenz wird verfehlt.', 'Die Genschere wirkt nur in Zielzellen.', 'Das Zielgen wird erfolgreich repariert.'],
      answer: 0,
      why: [{ text: 'Für jede in-vivo-Gentherapie ist die Vermeidung von Off- und On-Target-Effekten von größter Bedeutung.', prov: 'pdf', src: [p(24)] }],
    },
    {
      id: 'ca-q12', sub: 'crispr-anwendung', type: 'order', level: 3, err: 'sequence', prov: 'pdf', src: [p(24, 'Material A')],
      prompt: 'Bringe die Schritte der Gentherapie bei Beta-Thalassämie in die richtige Reihenfolge.',
      items: [
        'Blutbildende Stammzellen werden entnommen',
        'CRISPR/Cas schaltet in den Zellen das Gen für BCL11A aus',
        'Die veränderten Zellen werden zurückübertragen',
        'Sie siedeln sich in den Markhöhlen der Knochen an',
        'Es entstehen Erythrozyten mit Hämoglobin aus 2 α- und 2 γ-Ketten',
        'Die Betroffenen brauchen keine Bluttransfusionen mehr',
      ],
      why: [{ text: 'Aufgabe 1 aus Material A deiner PDF verlangt ein Fließdiagramm dieser Schritte.', prov: 'pdf', src: [p(24, 'Material A')] }],
    },
    {
      id: 'ca-q13', sub: 'crispr-anwendung', type: 'free', level: 4, err: 'mechanism', prov: 'inf', src: [p(24, 'Material A'), p(23)], operator: 'Erklären',
      prompt: 'Erkläre, wie mithilfe von CRISPR/Cas das BCL11A-Gen ausgeschaltet wurde und warum das bei Beta-Thalassämie hilft.',
      rubric: [
        { id: 'grna', label: 'Eine Guide-RNA komplementär zum BCL11A-Gen führt das Cas-Enzym dorthin; es entsteht ein Doppelstrangbruch', any: [['guide|grna|leit ?rna|komplementaer', 'bcl11a|gen'], ['doppelstrang|schneid|schnitt']], weight: 1 },
        { id: 'reparatur', label: 'Nicht-homologe Reparatur: Nucleotide gehen verloren/werden eingefügt → Rasterschub → BCL11A inaktiv', any: [['nicht homolog|insertion|deletion|raster|verloren|eingefuegt']], weight: 1.5 },
        { id: 'gamma', label: 'Ohne BCL11A werden die γ-Ketten nicht abgeschaltet', any: [['gamma|γ', 'weiter|nicht abgeschaltet|gebildet|aktiv']], weight: 1 },
        { id: 'hb', label: 'Hämoglobin aus 2 α + 2 γ ersetzt das fehlende β → funktionsfähig, keine Transfusionen', any: [['fetal|2 ?α|alpha|2 alpha|funktionsfaehig|transfusion']], weight: 1 },
      ],
      model: 'Eine Guide-RNA, die komplementär zu einem Abschnitt des BCL11A-Gens ist, führt das Cas-Enzym in den entnommenen Stammzellen genau dorthin; es entsteht ein Doppelstrangbruch. Bei der nicht-homologen Reparatur gehen häufig Nucleotide verloren oder werden eingefügt; das Leseraster verschiebt sich, und BCL11A wird nicht mehr funktionsfähig gebildet. Da BCL11A normalerweise nach der Geburt die γ-Ketten abschaltet, werden diese nun weiter gebildet. Die Erythrozyten enthalten Hämoglobin aus zwei α- und zwei γ-Ketten, das die fehlenden β-Ketten ersetzt – die Betroffenen haben funktionsfähiges Hämoglobin und brauchen keine Transfusionen mehr.',
      why: [
        { text: 'Das Material nennt das Ausschalten von BCL11A und die Wirkung; den Mechanismus des Ausschaltens beschreibt PDF S. 23.', prov: 'inf', src: [p(24, 'Material A'), p(23)] },
      ],
    },
    {
      id: 'ca-q14', sub: 'crispr-anwendung', type: 'free', level: 4, err: 'mechanism', prov: 'inf', src: [p(24, 'Material A'), p(23)], operator: 'Erklären',
      prompt: 'In einem anderen Ansatz soll ein intaktes Gen für die β-Kette in die DNA der Blutstammzellen übertragen werden. Erkläre die Vorgehensweise.',
      rubric: [
        { id: 'vorbereiten', label: 'Das intakte β-Gen wird im Labor mit Enden versehen, die homolog zu den Enden der Schnittstelle sind', any: [['homolog', 'ende|flank']], weight: 1.5 },
        { id: 'einschleusen', label: 'Es wird zusammen mit CRISPR/Cas (Guide-RNA für die Zielstelle) in die Stammzellen gebracht', any: [['cas|crispr|guide|grna', 'zelle|stammzell|einschleus|eingebracht']], weight: 1 },
        { id: 'schnitt', label: 'Cas erzeugt an der Zielstelle einen Doppelstrangbruch', any: [['doppelstrang|schneid|schnitt']], weight: 0.5 },
        { id: 'homolog', label: 'Die homologe Reparatur baut das Gen ein; die Zellen werden zurückgegeben (ex vivo)', any: [['homologe reparatur|eingebaut|einbau'], ['zurueck|uebertrag|ex vivo']], weight: 1 },
      ],
      model: 'Das intakte Gen für die β-Kette wird im Labor so vorbereitet, dass es an beiden Enden Sequenzen trägt, die homolog zu den Enden der geplanten Schnittstelle sind. Es wird zusammen mit einem CRISPR/Cas-System, dessen Guide-RNA zur Zielstelle passt, in die entnommenen Blutstammzellen eingeschleust. Das Cas-Enzym erzeugt dort einen Doppelstrangbruch; die homologe Reparatur nutzt das mitgebrachte Gen als Vorlage und baut es in die DNA ein. Die veränderten Stammzellen werden den Betroffenen zurückübertragen und bilden Erythrozyten mit funktionsfähigen β-Ketten. Weil Fremd-DNA eingebaut wird, gilt das als Gentechnik.',
      why: [{ text: 'Aufgabe 3 aus Material A; das Verfahren (Fremdgen mit homologen Enden, homologe Reparatur) steht auf PDF S. 23.', prov: 'inf', src: [p(23), p(24, 'Material A')] }],
    },
    {
      id: 'ca-q15', sub: 'crispr-anwendung', type: 'free', level: 4, err: 'inheritance', prov: 'inf', src: [p(24, 'Material B')], operator: 'Vergleichen', compare: true,
      prompt: 'Vergleiche die Vererbung einer Malaria-Resistenz bei Mücken ohne und mit Gene Drive.',
      rubric: [
        { id: 'ohne', group: 'Ohne Gene Drive', label: 'Eine heterozygote Mücke gibt das Resistenzallel nur an etwa die Hälfte der Nachkommen weiter', any: [['haelfte|50|jede zweite|halb']], weight: 1.5 },
        { id: 'mit', group: 'Mit Gene Drive', label: 'CRISPR/Cas im Allel schneidet das zweite Allel, homologe Reparatur kopiert Resistenzgen + CRISPR-Gen → homozygot', any: [['schneid|homolog|kopier', 'zweit|anderes allel'], ['homozygot']], weight: 1.5 },
        { id: 'alle', group: 'Mit Gene Drive', label: '(Nahezu) alle Nachkommen erhalten die Resistenz; der Vorgang wiederholt sich in jeder Generation', any: [['alle|nahezu alle|jede|jeder'], ['jede generation|wiederhol|immer wieder|nachkommen']], weight: 1 },
        { id: 'folge', group: 'Folge', label: 'Die Resistenz breitet sich viel schneller in der Population aus', any: [['schnell|beschleunigt|ausbreit|population']], weight: 0.5 },
      ],
      model: 'Ohne Gene Drive: Eine Mücke, die das Resistenzgen nur auf einem Allel trägt (heterozygot), gibt es nach den Mendelschen Regeln nur an etwa die Hälfte ihrer Nachkommen weiter; die Resistenz breitet sich langsam aus oder geht wieder verloren. Mit Gene Drive: Im veränderten Allel liegt neben dem Resistenzgen auch das Gen für CRISPR/Cas. Die gebildete Genschere schneidet das zweite Allel, und die homologe Reparatur kopiert Resistenzgen und CRISPR-Gen hinein – die Mücke wird homozygot. Weil sich das in jedem Nachkommen wiederholt, erhalten (nahezu) alle Nachkommen die Resistenz. Sie breitet sich dadurch beschleunigt in der ganzen Population aus.',
      why: [
        { text: 'Der Mechanismus des Gene Drive steht in Material B deiner PDF.', prov: 'pdf', src: [p(24, 'Material B')] },
        { text: 'Die 50-%-Weitergabe ohne Gene Drive folgt aus den Mendelschen Regeln (vgl. Erbgänge, PDF S. 28).', prov: 'inf', src: [p(28)] },
      ],
    },
    {
      id: 'ca-q16', sub: 'crispr-anwendung', type: 'free', level: 5, err: 'evaluation', prov: 'inf', src: [p(24, 'Material B'), p(24)], operator: 'Erläutern und bewerten',
      prompt: 'Erläutere Chancen und Risiken der Gene-Drive-Methode gegen Malaria und bilde dir ein begründetes Urteil.',
      rubric: [
        { id: 'chance', label: 'Chance: Malaria-Übertragung eindämmen (über 200 Mio. Erkrankte, ca. 400 000 Tote pro Jahr)', any: [['malaria|erkrank|tote|leben|uebertragung']], weight: 1 },
        { id: 'schnell', label: 'Chance: Resistenz verbreitet sich schnell und selbstständig in der Population', any: [['schnell|selbst|beschleunigt|ganze population|ausbreit']], weight: 0.5 },
        { id: 'risiko1', label: 'Risiko: Die Veränderung verbreitet sich unkontrolliert und ist kaum rückholbar', any: [['unkontroll|schwer kontroll|kaum kontroll|nicht kontroll|rueckgaengig|zurueckhol|rueckhol|nicht aufhalten|irreversibel|dauerhaft']], weight: 1.5 },
        { id: 'risiko2', label: 'Risiko: Off-/On-Target-Effekte oder unbekannte Folgen für Ökosysteme', any: [['off target|on target|falsche stelle|oekosystem|oekolog|nahrungskette|folgen|unbekannt|andere arten']], weight: 1 },
        { id: 'urteil', label: 'Eigenes, begründetes Urteil (Abwägung)', any: [['meiner meinung|ich finde|insgesamt|abwaeg|abschliessend|urteil|ueberwieg|deshalb']], weight: 1 },
      ],
      model: 'Chancen: Malaria ist eine der folgenreichsten Krankheiten (über 200 Millionen Erkrankte und etwa 400 000 Tote pro Jahr). Werden die übertragenden Mücken resistent gegen den Erreger, könnte die Übertragung stark sinken. Durch den Gene Drive verbreitet sich die Resistenz von selbst und schnell in der Population. Risiken: Genau diese Eigenschaft macht die Methode schwer kontrollierbar – einmal freigesetzt, lässt sich die Veränderung kaum zurückholen, sie kann sich auch über Populationen hinweg ausbreiten. Die eingebaute Genschere kann Off- oder On-Target-Effekte verursachen, und die Folgen für Ökosysteme sind schwer abzuschätzen. Urteil (Beispiel): Wegen des großen Nutzens sollte die Methode weiter erforscht werden, aber nur schrittweise, mit Freilandversuchen in abgeschlossenen Gebieten und strenger Kontrolle.',
      why: [
        { text: 'Die Aufgabe (Chancen und Risiken erläutern) steht in Material B deiner PDF; konkrete Risiken nennt die PDF nicht.', prov: 'inf', src: [p(24, 'Material B')] },
        { text: 'Off- und On-Target-Effekte beschreibt deine PDF auf S. 24; die übrigen Risiken sind Schlussfolgerungen aus dem Mechanismus.', prov: 'inf', src: [p(24)] },
      ],
    },
    {
      id: 'ca-q17', sub: 'crispr-anwendung', type: 'single', level: 2, err: 'facts', prov: 'pdf', src: [p(24)],
      prompt: 'Wie gelangte das CRISPR/Cas-System bei der Studie zur Netzhauterkrankung LCA in die Zellen?',
      options: ['über einen viralen Vektor, der direkt ins Auge injiziert wurde', 'als Tablette', 'über entnommene Stammzellen', 'über eine Bluttransfusion'],
      answer: 0,
      why: [{ text: 'Der Vektor enthielt die gesamte genetische Information eines CRISPR/Cas-Systems (in vivo).', prov: 'pdf', src: [p(24)] }],
    },
    {
      id: 'ca-q18', sub: 'crispr-anwendung', type: 'cloze', level: 1, err: 'facts', prov: 'pdf', src: [p(23), p(24)],
      prompt: 'Ergänze die Zahlen aus deiner PDF.',
      text: 'Mittlerweile sind über {{0}} verschiedene Cas-Enzyme bekannt. 2019 wurde in {{1}} erstmals eine Patientin mit Beta-Thalassämie mit CRISPR/Cas behandelt. Die Rote Goldbrasse bildet bis zu {{2}} % mehr Skelettmuskulatur.',
      gaps: [
        { accept: ['40'], options: ['4', '40', '400'] },
        { accept: ['Regensburg'], options: ['Regensburg', 'Berlin', 'Tokio'] },
        { accept: ['20'], options: ['2', '20', '90'] },
      ],
      why: [{ text: 'Alle Zahlen stehen auf PDF S. 23–24.', prov: 'pdf', src: [p(23), p(24)] }],
    },
  ],

  experiments: [
    {
      id: 'exp-thalassaemie', sub: 'crispr-anwendung', title: 'Gentherapie bei Beta-Thalassämie', year: '2019', src: [p(24, 'Material A'), p(24)],
      steps: [
        { key: 'frage', text: 'Lässt sich die Blutarmut bei Beta-Thalassämie heilen, obwohl das β-Globin-Gen defekt ist?', prov: 'inf' },
        { key: 'hypothese', text: 'Wird die Abschaltung der fetalen γ-Ketten verhindert, könnte Hämoglobin aus α- und γ-Ketten die fehlenden β-Ketten ersetzen.', prov: 'inf' },
        { key: 'material', text: 'Blutbildende Stammzellen der Betroffenen; CRISPR/Cas mit Guide-RNA für das Gen des Transkriptionsfaktors BCL11A.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Stammzellen entnehmen → BCL11A-Gen ex vivo ausschalten → Zellen zurückübertragen; sie siedeln sich im Knochenmark an.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Erythrozyten mit funktionsfähigem Hämoglobin aus 2 α- und 2 γ-Ketten; alle Behandelten symptomfrei und unabhängig von Transfusionen.', prov: 'pdf', predict: 'Welche Ketten enthält das Hämoglobin nach der Behandlung?' },
        { key: 'schluss', text: 'Das Ausschalten eines regulierenden Gens kann einen Gendefekt ausgleichen. Wie lange die Wirkung anhält, ist noch offen.', prov: 'pdf' },
      ],
      questionIds: ['ca-q12', 'ca-q13', 'ca-q14'],
    },
    {
      id: 'exp-genedrive', sub: 'crispr-anwendung', title: 'Gene Drive gegen Malaria', src: [p(24, 'Material B')],
      steps: [
        { key: 'frage', text: 'Wie lässt sich eine Resistenz gegen den Malaria-Erreger schnell in einer Mückenpopulation verbreiten?', prov: 'inf' },
        { key: 'durchfuehrung', text: 'In ein Allel der Anopheles-Mücke werden per CRISPR/Cas ein Resistenzgen und das Gen für CRISPR/Cas eingefügt.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Die Genschere schneidet das zweite Allel; die homologe Reparatur kopiert beide Gene hinein → die Mücke ist homozygot.', prov: 'pdf', predict: 'Welcher Reparaturmechanismus sorgt dafür, dass das zweite Allel die Veränderung übernimmt?' },
        { key: 'schluss', text: 'Die Resistenz breitet sich beschleunigt in der Population aus.', prov: 'pdf' },
      ],
      questionIds: ['ca-q15', 'ca-q16'],
    },
  ],

  examTasks: [
    {
      id: 'kt-thalassaemie',
      title: 'Gentherapie bei Beta-Thalassämie',
      subs: ['crispr-anwendung'],
      basedOn: 'Übung nach Material A „Gentherapie bei der Beta-Thalassämie“ aus deiner PDF (S. 24)',
      src: [p(24, 'Material A')],
      intro: 'Beim Embryo besteht Hämoglobin aus zwei α- und zwei γ-Ketten. Nach der Geburt schaltet der Transkriptionsfaktor BCL11A die γ-Ketten ab und die β-Ketten an. Bei Beta-Thalassämie ist das β-Gen mutiert; Betroffene leiden an Blutarmut und benötigen häufig Transfusionen. 2019 wurde in entnommenen Stammzellen das BCL11A-Gen mit CRISPR/Cas ausgeschaltet.',
      material: [
        { kind: 'table', head: ['Hämoglobin', 'Ketten'], rows: [['Embryo', '2 α + 2 γ'], ['nach der Geburt', '2 α + 2 β'], ['nach der Therapie', '2 α + 2 γ']], caption: 'Angaben aus Material A deiner PDF' },
      ],
      parts: ['kth-1', 'kth-2', 'kth-3'],
    },
    {
      id: 'kt-genedrive',
      title: 'Gene Drive gegen Malaria',
      subs: ['crispr-anwendung'],
      basedOn: 'Übung nach Material B „Gene Drive gegen Malaria“ aus deiner PDF (S. 24)',
      src: [p(24, 'Material B')],
      intro: 'Jährlich erkranken über 200 Millionen Menschen an Malaria, etwa 400 000 sterben. Mit CRISPR/Cas kann ein Resistenzgen in das Genom der Anopheles-Mücke eingeführt werden. Beim Gene Drive wird in ein Allel zusätzlich das Gen für CRISPR/Cas eingefügt.',
      material: [
        { kind: 'text', md: 'Die gebildete Genschere schneidet das zweite Allel an entsprechender Stelle. Bei der anschließenden homologen Reparatur wird das erste Allel als Vorlage genutzt und Resistenzgen sowie CRISPR/Cas-Gen werden in das zweite Allel eingebaut.' },
      ],
      parts: ['kgd-1', 'kgd-2'],
    },
  ],
};

gentechnik.questions.push(
  {
    id: 'kth-1', sub: 'crispr-anwendung', type: 'order', level: 4, err: 'sequence', prov: 'pdf', src: [p(24, 'Material A')],
    prompt: 'Erstelle ein Fließdiagramm der Gentherapie: Bringe die Schritte in die richtige Reihenfolge.',
    items: [
      'Diagnose: β-Gen mutiert, Blutarmut',
      'Entnahme blutbildender Stammzellen',
      'Ausschalten des BCL11A-Gens mit CRISPR/Cas (ex vivo)',
      'Rückübertragung der veränderten Stammzellen',
      'Ansiedlung in den Markhöhlen der Knochen',
      'Bildung von Erythrozyten mit Hämoglobin aus 2 α + 2 γ',
    ],
    why: [{ text: 'Aufgabe 1 aus Material A deiner PDF.', prov: 'pdf', src: [p(24, 'Material A')] }],
  },
  {
    id: 'kth-2', sub: 'crispr-anwendung', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(24, 'Material A'), p(23)], operator: 'Erklären',
    prompt: 'Erkläre, wie mithilfe von CRISPR/Cas das BCL11A-Gen ausgeschaltet wurde und warum dadurch funktionsfähiges Hämoglobin entsteht.',
    rubric: [
      { id: 'schnitt', label: 'Guide-RNA führt Cas zum BCL11A-Gen → Doppelstrangbruch', any: [['guide|grna|leit|cas', 'bcl11a|doppelstrang|schnitt|schneid']], weight: 1 },
      { id: 'reparatur', label: 'Nicht-homologe Reparatur → Insertion/Deletion → Rasterschub → BCL11A funktionslos', any: [['nicht homolog|insertion|deletion|raster']], weight: 1.5 },
      { id: 'gamma', label: 'γ-Ketten werden nicht mehr abgeschaltet', any: [['gamma|γ']], weight: 1 },
      { id: 'folge', label: 'Hb aus 2 α + 2 γ ersetzt β → funktionsfähig, keine Transfusionen', any: [['funktionsfaehig|transfusion|ersetz|2 alpha|fetal']], weight: 1 },
    ],
    model: 'Eine Guide-RNA mit einer zum BCL11A-Gen komplementären Sequenz führt das Cas-Enzym in den entnommenen Stammzellen zu diesem Gen; dort entsteht ein Doppelstrangbruch. Die Zelle repariert ihn über die nicht-homologe Reparatur, wobei häufig Nucleotide verloren gehen oder eingefügt werden. Das Leseraster verschiebt sich – es entsteht kein funktionsfähiger Transkriptionsfaktor BCL11A. Damit wird die Bildung der γ-Ketten nach der Geburt nicht abgeschaltet: Die Erythrozyten enthalten Hämoglobin aus 2 α- und 2 γ-Ketten, das die fehlenden β-Ketten ersetzt.',
    why: [{ text: 'Aufgabe 2 aus Material A; Mechanismus nach PDF S. 23.', prov: 'inf', src: [p(24, 'Material A'), p(23)] }],
  },
  {
    id: 'kth-3', sub: 'crispr-anwendung', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(24, 'Material A'), p(23)], operator: 'Erklären',
    prompt: 'Erkläre die Vorgehensweise, wenn stattdessen ein intaktes Gen für die β-Kette in die DNA der Blutstammzellen übertragen werden soll.',
    rubric: [
      { id: 'homolog', label: 'Intaktes β-Gen mit homologen Enden zur Schnittstelle vorbereiten', any: [['homolog', 'ende|flank']], weight: 1.5 },
      { id: 'zusammen', label: 'Zusammen mit CRISPR/Cas in die Stammzellen einschleusen; Doppelstrangbruch an der Zielstelle', any: [['cas|crispr', 'einschleus|zelle|stammzell|doppelstrang']], weight: 1 },
      { id: 'reparatur', label: 'Homologe Reparatur baut das Gen ein', any: [['homologe reparatur|eingebaut|einbau']], weight: 1 },
      { id: 'zurueck', label: 'Zellen zurückübertragen; gilt als Gentechnik (Fremd-DNA)', any: [['zurueck|uebertrag|gentechnik|fremd']], weight: 0.5 },
    ],
    model: 'Das intakte β-Globin-Gen wird im Labor mit Enden versehen, die homolog zu den Sequenzen links und rechts der geplanten Schnittstelle sind. Es wird zusammen mit einem CRISPR/Cas-System, dessen Guide-RNA diese Stelle erkennt, in die entnommenen Blutstammzellen eingeschleust. Nach dem Doppelstrangbruch baut die homologe Reparatur das Fremdgen ein. Die Zellen werden zurückübertragen und bilden β-Ketten. Weil dabei Fremd-DNA eingebaut wird, gilt das Verfahren als Gentechnik.',
    why: [{ text: 'Aufgabe 3 aus Material A; Verfahren nach PDF S. 23.', prov: 'inf', src: [p(23)] }],
  },
  {
    id: 'kgd-1', sub: 'crispr-anwendung', type: 'free', level: 4, err: 'inheritance', prov: 'inf', src: [p(24, 'Material B')], operator: 'Vergleichen', compare: true,
    prompt: 'Vergleiche die Vererbung der Resistenz ohne Gene Drive mit der Vererbung mit Gene Drive.',
    rubric: [
      { id: 'ohne', group: 'Ohne Gene Drive', label: 'Heterozygote Mücke gibt die Resistenz an ca. 50 % der Nachkommen weiter', any: [['haelfte|50|halb|jede zweite']], weight: 1.5 },
      { id: 'mit', group: 'Mit Gene Drive', label: 'Das zweite Allel wird geschnitten und per homologer Reparatur überschrieben → homozygot', any: [['homozygot|zweite allel|homolog']], weight: 1.5 },
      { id: 'alle', group: 'Mit Gene Drive', label: '(Nahezu) alle Nachkommen erhalten die Resistenz; schnelle Ausbreitung', any: [['alle|nahezu|jede'], ['schnell|beschleunigt|ausbreit']], weight: 1 },
    ],
    model: 'Ohne Gene Drive trägt eine veränderte Mücke das Resistenzgen nur auf einem Allel und gibt es an etwa die Hälfte ihrer Nachkommen weiter. Mit Gene Drive schneidet die mitgelieferte Genschere das zweite Allel; die homologe Reparatur kopiert Resistenz- und CRISPR/Cas-Gen hinein – die Mücke ist homozygot und gibt die Resistenz an (nahezu) alle Nachkommen weiter, in denen sich der Vorgang wiederholt. Die Resistenz breitet sich dadurch viel schneller in der Population aus.',
    why: [{ text: 'Aufgabe 1 aus Material B deiner PDF; die 50 % folgen aus den Mendelschen Regeln.', prov: 'inf', src: [p(24, 'Material B'), p(28)] }],
  },
  {
    id: 'kgd-2', sub: 'crispr-anwendung', type: 'free', level: 5, err: 'evaluation', prov: 'inf', src: [p(24, 'Material B')], operator: 'Erläutern',
    prompt: 'Erläutere Chancen und Risiken der Gene-Drive-Methode.',
    rubric: [
      { id: 'chance', label: 'Chance: Malaria-Erkrankungen und Todesfälle verringern', any: [['malaria|erkrank|tote|leben']], weight: 1.5 },
      { id: 'selbst', label: 'Chance: Ausbreitung ohne ständige neue Freisetzungen', any: [['selbst|schnell|beschleunig|ausbreit']], weight: 0.5 },
      { id: 'kontrolle', label: 'Risiko: unkontrollierte, kaum umkehrbare Ausbreitung', any: [['unkontroll|nicht rueckgaengig|irreversibel|nicht aufhalten|nicht rueckhol']], weight: 1.5 },
      { id: 'folgen', label: 'Risiko: Off-/On-Target-Effekte, ökologische Folgen', any: [['off target|on target|oekolog|oekosystem|folgen|unbekannt']], weight: 1 },
    ],
    model: 'Chancen: Die Methode könnte die Übertragung von Malaria stark verringern – bei über 200 Millionen Erkrankten und etwa 400 000 Toten jährlich ein großer Nutzen. Die Resistenz verbreitet sich von selbst schnell in der Population. Risiken: Die Veränderung breitet sich unkontrolliert aus und ist kaum rückgängig zu machen. Die Genschere kann Off- oder On-Target-Effekte haben, und die ökologischen Folgen einer dauerhaft veränderten Mückenpopulation sind schwer abzuschätzen.',
    why: [{ text: 'Aufgabe 2 aus Material B; deine PDF nennt keine Lösung – die Risiken sind Schlussfolgerungen aus dem Mechanismus und PDF S. 24.', prov: 'inf', src: [p(24)] }],
  },
);
