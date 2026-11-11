import type { ServiceContentMap } from "./types";

const it: ServiceContentMap = {
  diagnostics: {
    name: "Diagnosi computerizzata & Elettrauto",
    short: "Leggiamo gli errori della centralina e ripariamo i guasti elettrici: spie, avviamento difficile, luci, sensori.",
    h1: "Diagnosi computerizzata ed elettrauto a Chișinău",
    metaTitle: "Diagnosi computerizzata & elettrauto a Chișinău — ForceCar",
    metaDescription:
      "Diagnosi computerizzata ed elettrauto da ForceCar a Chișinău: leggiamo gli errori, controlliamo batteria, alternatore, sensori e impianto elettrico e ti spieghiamo con chiarezza cosa ha l'auto.",
    intro: [
      "Fare una diagnosi significa trovare la vera causa di un problema, non solo leggere un codice di errore. Da ForceCar uniamo la diagnosi computerizzata — la lettura degli errori della centralina — al controllo pratico dell'auto, grazie a oltre 20 anni di esperienza.",
      "Ci occupiamo anche dell'impianto elettrico: batteria, alternatore, motorino di avviamento, luci, sensori, fusibili e collegamenti. Dopo il controllo ti spieghiamo in modo chiaro cosa abbiamo trovato e cosa va riparato, così puoi decidere in modo consapevole.",
    ],
    symptoms: [
      "Si è accesa la spia motore (Check Engine) o un'altra spia",
      "L'auto ha meno spinta o procede a strappi",
      "L'auto fatica ad avviarsi o la batteria si scarica spesso",
      "Non funzionano luci, alzacristalli elettrici o altri dispositivi",
      "I consumi sono aumentati senza un motivo evidente",
      "Il problema si presenta solo ogni tanto e non sai da dove venga",
    ],
    checks: [
      "Gli errori memorizzati nella centralina",
      "Sensori e parametri del motore in funzione",
      "Batteria, alternatore e motorino di avviamento",
      "Impianto elettrico: fusibili, relè, collegamenti, luci",
      "Impianto di accensione e di alimentazione",
      "Rumori e vibrazioni, se serve con una prova su strada",
    ],
    steps: [
      { title: "Ci racconti cosa hai notato", text: "Quando si presenta il problema, da quanto tempo e in quali condizioni. Ogni dettaglio aiuta." },
      { title: "Controlliamo l'auto", text: "Leggiamo gli errori e verifichiamo in pratica gli impianti coinvolti." },
      { title: "Ti spieghiamo il risultato", text: "Sai in modo chiaro cosa abbiamo trovato e cosa è necessario." },
      { title: "Decidi tu", text: "La riparazione inizia solo dopo che hai approvato i lavori proposti." },
    ],
    faq: [
      {
        q: "Il codice di errore indica esattamente quale pezzo è guasto?",
        a: "Non sempre. Il codice indica l'impianto in cui è comparso il problema, ma la causa può essere un'altra: un sensore, un collegamento o un pezzo usurato. Per questo facciamo anche un controllo pratico prima di consigliare una sostituzione.",
      },
      {
        q: "Posso guidare con la spia motore accesa?",
        a: "Dipende. Se la spia lampeggia, l'auto perde potenza o compaiono fumo, odore di bruciato o temperatura elevata, fermati in sicurezza e non proseguire. Se la spia è accesa fissa e l'auto va normalmente, prenota un controllo il prima possibile.",
      },
      {
        q: "Riparate anche i guasti elettrici?",
        a: "Sì. Controlliamo batteria, alternatore, motorino di avviamento, luci, fusibili e collegamenti e cerchiamo la causa dei dispositivi che non funzionano o della batteria che si scarica.",
      },
      {
        q: "Quali informazioni preparare prima della diagnosi?",
        a: "Marca, modello, anno e, se possibile, chilometraggio. Annota quando si presenta il problema: a freddo o a caldo, in accelerazione, in frenata, su strade dissestate. Puoi anche allegare foto nel modulo di prenotazione.",
      },
    ],
  },

  engine: {
    name: "Riparazione motore",
    short: "Perdite d'olio, fumo, rumori o surriscaldamento: troviamo la causa e ripariamo il motore.",
    h1: "Riparazione motore a Chișinău",
    metaTitle: "Riparazione motore a Chișinău — ForceCar",
    metaDescription:
      "Riparazione motore da ForceCar a Chișinău: individuiamo la causa di perdite d'olio, fumo o rumori e ti spieghiamo con chiarezza quale intervento serve.",
    intro: [
      "Il motore è uno dei componenti più costosi dell'auto: per questo è importante capire per tempo cosa gli sta succedendo. Da ForceCar cerchiamo prima la causa — da dove vengono il rumore, il fumo o la perdita d'olio — e solo dopo proponiamo la riparazione.",
      "Ti spieghiamo quali pezzi sono coinvolti, cosa va riparato o sostituito e perché, prima di iniziare i lavori.",
    ],
    symptoms: [
      "Fumo blu, bianco o nero dallo scarico",
      "Consumo elevato di olio o macchie d'olio sotto l'auto",
      "Rumori metallici, colpi o battiti dal motore",
      "La temperatura sale oltre il normale o cala il liquido refrigerante",
      "Il motore gira irregolare, vibra o perde potenza",
      "Si accende la spia della pressione dell'olio",
    ],
    checks: [
      "Perdite di olio e refrigerante e la loro origine",
      "Rumori del motore al minimo e sotto carico",
      "Impianto di raffreddamento: radiatore, pompa, termostato, tubi",
      "Accensione, alimentazione ed errori della centralina",
      "Stato della distribuzione e delle cinghie",
      "Compressione, quando i sintomi lo richiedono",
    ],
    steps: [
      { title: "Ascoltiamo i sintomi", text: "Ci dici cosa hai notato e da quando. Chiediamo anche delle ultime riparazioni." },
      { title: "Troviamo la causa", text: "Controlliamo il motore passo dopo passo, per non sostituire pezzi a caso." },
      { title: "Ti spieghiamo le opzioni", text: "Sai cosa va riparato e perché, prima di qualsiasi lavoro." },
      { title: "Ripariamo e verifichiamo", text: "Dopo la riparazione controlliamo il funzionamento del motore prima di riconsegnarti l'auto." },
    ],
    faq: [
      {
        q: "Conviene riparare il motore o sostituirlo?",
        a: "Dipende da cosa si è guastato, dalle condizioni generali del motore e dal valore dell'auto. Dopo il controllo ti spieghiamo le opzioni possibili, così puoi decidere.",
      },
      {
        q: "Posso guidare se il motore fuma o perde olio?",
        a: "Se si accende la spia dell'olio, la temperatura sale oltre il normale o il motore batte, spegnilo e non proseguire: rischi un danno molto più grave. Negli altri casi prenota un controllo il prima possibile.",
      },
      {
        q: "Quanto dura una riparazione del motore?",
        a: "Dipende molto dal tipo di intervento e dalla disponibilità dei ricambi. Dopo aver controllato l'auto ti diamo una durata stimata.",
      },
    ],
    safety:
      "Se si accende la spia della pressione dell'olio o la temperatura arriva in zona rossa, spegni il motore appena puoi farlo in sicurezza. Continuare a guidare può distruggere il motore.",
  },

  timing: {
    name: "Sostituzione distribuzione",
    short: "Sostituiamo per tempo cinghia o catena di distribuzione, rulli e tenditore.",
    h1: "Sostituzione della distribuzione a Chișinău",
    metaTitle: "Sostituzione cinghia di distribuzione a Chișinău | ForceCar",
    metaDescription:
      "Sostituzione di cinghia o catena di distribuzione da ForceCar a Chișinău: controlliamo rulli, tenditore e pompa dell'acqua e ti diciamo con chiarezza cosa sostituire.",
    intro: [
      "La distribuzione sincronizza il movimento di pistoni e valvole. Se una cinghia usurata si rompe, in molti motori i pistoni colpiscono le valvole e la riparazione diventa molto più costosa di una sostituzione fatta per tempo.",
      "Da ForceCar controlliamo lo stato della distribuzione e ti diciamo cosa va sostituito: cinghia o catena, rulli, tenditore e, se necessario, pompa dell'acqua.",
    ],
    symptoms: [
      "Non sai quando è stata sostituita l'ultima volta la distribuzione",
      "Ti avvicini all'intervallo indicato dal costruttore (km o anni)",
      "Senti un fruscio, un fischio o un tintinnio dalla zona della distribuzione",
      "Il motore fatica ad avviarsi o gira in modo irregolare",
      "Vedi tracce di olio o refrigerante nella zona della distribuzione",
      "Hai appena acquistato un'auto usata",
    ],
    checks: [
      "Stato della cinghia: crepe, usura, tensione",
      "Rulli e tenditore: gioco e rumorosità",
      "Pompa dell'acqua, se è azionata dalla distribuzione",
      "Perdite d'olio dai paraoli",
      "Per la catena: rumore all'avviamento e allungamento",
    ],
    steps: [
      { title: "Identifichiamo il motore", text: "Marca, modello, motorizzazione e chilometraggio ci indicano che distribuzione ha l'auto." },
      { title: "Controlliamo lo stato", text: "Verifichiamo cinghia o catena e i componenti intorno." },
      { title: "Ti diciamo cosa sostituire", text: "Sai esattamente quali pezzi vanno cambiati e perché." },
      { title: "Montiamo e verifichiamo", text: "Montiamo la distribuzione e controlliamo messa in fase e funzionamento del motore." },
    ],
    faq: [
      {
        q: "Ogni quanti chilometri si sostituisce la distribuzione?",
        a: "L'intervallo varia da motore a motore ed è stabilito dal costruttore, in chilometri e in anni. Se non sai quando è stata cambiata l'ultima volta, è più sicuro controllarla.",
      },
      {
        q: "Si sostituiscono anche i rulli insieme alla cinghia?",
        a: "Di regola sì: rulli e tenditore si usurano insieme alla cinghia. Su molti motori si consiglia di sostituire anche la pompa dell'acqua. Ti diciamo esattamente cosa vale per la tua auto.",
      },
      {
        q: "Anche la catena di distribuzione va sostituita?",
        a: "La catena dura più della cinghia, ma col tempo può allungarsi. Un breve rumore metallico all'avviamento può esserne un segnale. La controlliamo e ti diciamo se va sostituita.",
      },
    ],
  },

  brakes: {
    name: "Riparazione freni",
    short: "Pastiglie, dischi, pinze e liquido freni: controlliamo e ripariamo l'impianto frenante.",
    h1: "Riparazione freni a Chișinău",
    metaTitle: "Riparazione freni a Chișinău — pastiglie, dischi, pinze | ForceCar",
    metaDescription:
      "Controllo e riparazione freni da ForceCar a Chișinău: pastiglie, dischi, pinze e liquido freni. Ti spieghiamo cosa sostituire prima dei lavori.",
    intro: [
      "I freni sono il sistema di sicurezza più importante dell'auto. Un fischio, una vibrazione nel pedale o un'auto che tira da un lato in frenata sono segnali che qualcosa va controllato.",
      "Da ForceCar controlliamo l'intero impianto frenante e ti diciamo con chiarezza quali pezzi sono usurati e cosa va sostituito ora.",
    ],
    symptoms: [
      "Fischio o sfregamento metallico in frenata",
      "Vibrazioni nel volante o nel pedale quando freni",
      "Il pedale è morbido, scende molto o va premuto di più",
      "L'auto tira da un lato in frenata",
      "Si è accesa la spia dei freni o dell'ABS",
      "Lo spazio di frenata sembra più lungo",
    ],
    checks: [
      "Spessore delle pastiglie e stato dei dischi",
      "Pinze e guide: che non siano bloccate",
      "Tubi flessibili e tubazioni dei freni",
      "Livello e condizioni del liquido freni",
      "Freno di stazionamento",
      "Sensori ABS, se la spia è accesa",
    ],
    steps: [
      { title: "Ci dici cosa senti", text: "Rumore, vibrazioni, pedale morbido: ogni dettaglio ci aiuta." },
      { title: "Controlliamo i freni", text: "Verifichiamo pastiglie, dischi, pinze e liquido." },
      { title: "Ti spieghiamo cosa è usurato", text: "Sai cosa va sostituito ora e perché." },
      { title: "Ripariamo e proviamo", text: "Dopo il montaggio verifichiamo il funzionamento dei freni." },
    ],
    faq: [
      {
        q: "Come capisco che le pastiglie vanno sostituite?",
        a: "I segnali tipici sono un fischio metallico in frenata, la spia di usura accesa o una frenata più debole. Lo spessore delle pastiglie si verifica con certezza durante un controllo.",
      },
      {
        q: "I dischi si cambiano insieme alle pastiglie?",
        a: "Non sempre. I dischi si sostituiscono quando sono sotto lo spessore minimo, deformati o usurati in modo irregolare. Li misuriamo e ti diciamo se è il caso.",
      },
      {
        q: "Posso guidare se il pedale del freno è morbido?",
        a: "Un pedale morbido o che scende molto può indicare aria nell'impianto, liquido insufficiente o una perdita. È un problema di sicurezza: evita di guidare e prenota un controllo il prima possibile.",
      },
    ],
    safety:
      "Se il pedale del freno arriva a fondo corsa, l'auto non frena normalmente o senti odore di bruciato dalle ruote, non proseguire. I freni sono una questione di sicurezza.",
  },

  suspension: {
    name: "Sospensioni e sterzo",
    short: "Colpi sulle buche, volante che tira o vibra: troviamo il pezzo usurato e lo sostituiamo.",
    h1: "Riparazione sospensioni e sterzo a Chișinău",
    metaTitle: "Riparazione sospensioni e sterzo a Chișinău | ForceCar",
    metaDescription:
      "Controllo e riparazione di sospensioni e sterzo da ForceCar a Chișinău: colpi sulle buche, volante che tira o vibra, ammortizzatori e boccole usurati.",
    intro: [
      "Strade con buche e dissesti mettono a dura prova le sospensioni. Quando qualcosa «batte» o l'auto non tiene più la strada come prima, di solito si è usurato un componente delle sospensioni o dello sterzo.",
      "Sollevamo l'auto sul ponte, verifichiamo da dove viene il rumore e ti diciamo esattamente quale pezzo va riparato o sostituito.",
    ],
    symptoms: [
      "Colpi o battiti passando sulle buche",
      "L'auto tira da un lato o il volante non è dritto",
      "Il volante vibra o ha gioco",
      "L'auto ondeggia molto dopo una buca",
      "Gli pneumatici si consumano in modo irregolare",
      "Si sente un cigolio in curva",
    ],
    checks: [
      "Ammortizzatori e molle",
      "Bracci, boccole e snodi sferici",
      "Bielle e barra stabilizzatrice",
      "Testine dello sterzo e scatola guida",
      "Cuscinetti delle ruote",
      "Usura degli pneumatici: indica dove può essere il problema",
    ],
    steps: [
      { title: "Ci dici quando succede", text: "Sulle buche, in curva, in frenata o ad alta velocità." },
      { title: "Controlliamo sul ponte", text: "Cerchiamo giochi e pezzi usurati di sospensioni e sterzo." },
      { title: "Ti spieghiamo cosa abbiamo trovato", text: "Sai quale pezzo è usurato e cosa va sostituito." },
      { title: "Sostituiamo e verifichiamo", text: "Dopo la riparazione controlliamo che il rumore sia sparito." },
    ],
    faq: [
      {
        q: "Perché le sospensioni battono?",
        a: "Le cause più comuni sono bielle, boccole, snodi o ammortizzatori usurati. Il rumore può venire anche da altri componenti, per questo controlliamo l'auto sul ponte prima di consigliare qualcosa.",
      },
      {
        q: "Va controllata la convergenza dopo la riparazione delle sospensioni?",
        a: "Dopo la sostituzione di alcuni pezzi — ad esempio testine dello sterzo o bracci — va controllato l'assetto delle ruote. Ti diciamo se è necessario nel tuo caso.",
      },
      {
        q: "È pericoloso guidare con il volante che vibra?",
        a: "Le vibrazioni possono avere cause semplici, come ruote non equilibrate, ma anche cause legate alla sicurezza, come componenti dello sterzo usurati. Prenota un controllo il prima possibile.",
      },
    ],
  },

  mechanical: {
    name: "Meccanica generale",
    short: "Riparazioni meccaniche, sostituzione dei pezzi usurati e controlli periodici per la tua auto.",
    h1: "Meccanica auto e manutenzione a Chișinău",
    metaTitle: "Meccanico a Chișinău — meccanica generale e manutenzione | ForceCar",
    metaDescription:
      "Meccanica generale e manutenzione da ForceCar a Chișinău: riparazioni meccaniche, sostituzione dei pezzi usurati e controlli periodici, spiegati con chiarezza.",
    intro: [
      "Molti guasti importanti iniziano con piccoli problemi: una cinghia usurata, una perdita, un cuscinetto che comincia a fare rumore. La meccanica generale e la manutenzione regolare aiutano a evitare riparazioni costose.",
      "Da ForceCar controlliamo l'auto, sostituiamo i pezzi usurati e ti diciamo cosa tenere d'occhio in seguito.",
    ],
    symptoms: [
      "Si avvicina il tagliando o hai superato l'intervallo di manutenzione",
      "Senti un rumore nuovo, un fischio o un tintinnio",
      "Vedi perdite di liquidi sotto l'auto",
      "L'auto si comporta diversamente rispetto a prima",
      "Prepari l'auto per un viaggio lungo",
      "Vuoi un controllo generale dopo un periodo senza officina",
    ],
    checks: [
      "Livelli e condizioni dei liquidi",
      "Filtri, cinghie e tubi",
      "Perdite di olio, refrigerante o carburante",
      "Freni, sospensioni e pneumatici: controllo visivo",
      "Cuscinetti, supporti motore e scarico",
      "Batteria e luci",
    ],
    steps: [
      { title: "Ci dici cosa ti serve", text: "Tagliando, un rumore specifico o un controllo generale." },
      { title: "Controlliamo l'auto", text: "Verifichiamo gli impianti principali e annotiamo cosa troviamo." },
      { title: "Ti spieghiamo cosa è necessario", text: "Separando ciò che è urgente da ciò che si può pianificare." },
      { title: "Eseguiamo i lavori", text: "Solo quelli che hai approvato." },
    ],
    faq: [
      {
        q: "Ogni quanto va fatta la manutenzione dell'auto?",
        a: "Gli intervalli sono stabiliti dal costruttore, in chilometri e nel tempo, e dipendono dal motore e dall'uso dell'auto. Se non sai quando è stato fatto l'ultimo tagliando, un controllo generale è un buon punto di partenza.",
      },
      {
        q: "Cosa si intende per meccanica generale?",
        a: "Sono le normali riparazioni meccaniche di un'auto: sostituzione dei pezzi usurati, eliminazione di perdite, rumori e problemi di funzionamento non legati alla carrozzeria.",
      },
      {
        q: "Mi dite se un lavoro può aspettare?",
        a: "Sì. Dopo il controllo ti spieghiamo cosa è urgente per la sicurezza e il funzionamento dell'auto e cosa può essere pianificato più avanti.",
      },
    ],
  },

  oil: {
    name: "Cambio olio & filtri",
    short: "Cambiamo l'olio motore e i filtri olio, aria, abitacolo e carburante, adatti alla tua auto.",
    h1: "Cambio olio e filtri a Chișinău",
    metaTitle: "Cambio olio e filtri a Chișinău — ForceCar",
    metaDescription:
      "Cambio olio motore e filtri da ForceCar a Chișinău: l'olio giusto per il tuo motore, filtri olio, aria, abitacolo e carburante e un controllo rapido dell'auto.",
    intro: [
      "Con il tempo l'olio motore perde le sue proprietà e i filtri si intasano. Un cambio fatto per tempo protegge il motore, mantiene i consumi nella norma e previene l'usura precoce.",
      "Da ForceCar scegliamo l'olio secondo le specifiche del costruttore per il tuo motore, sostituiamo i filtri necessari e, mentre l'auto è sul ponte, controlliamo perdite e altri problemi visibili.",
    ],
    symptoms: [
      "Hai superato l'intervallo di cambio (in chilometri o in tempo)",
      "Si è accesa la spia del tagliando o dell'olio",
      "L'olio sull'astina è scuro o sotto il minimo",
      "Il motore è più rumoroso del solito",
      "L'aria nell'abitacolo sa di polvere o la ventilazione è debole",
      "Non sai quando è stato cambiato l'olio l'ultima volta",
    ],
    checks: [
      "Livello e stato dell'olio prima del cambio",
      "Filtro olio, aria, abitacolo e carburante",
      "Perdite d'olio da coppa, guarnizioni e paraoli",
      "Livelli degli altri liquidi: refrigerante, liquido freni, lavavetri",
      "Stato di cinghie e tubi visibili",
    ],
    steps: [
      { title: "Identifichiamo il motore", text: "Marca, modello, motorizzazione e chilometraggio ci dicono quale olio e quali filtri servono." },
      { title: "Scarichiamo l'olio vecchio", text: "Scarichiamo l'olio esausto e sostituiamo il filtro olio." },
      { title: "Filtri e olio nuovi", text: "Mettiamo l'olio giusto e cambiamo i filtri concordati con te." },
      { title: "Controllo e reset", text: "Controlliamo livello e tenuta e azzeriamo l'indicatore del tagliando, dove serve." },
    ],
    faq: [
      {
        q: "Ogni quanti chilometri si cambia l'olio?",
        a: "L'intervallo lo stabilisce il costruttore, in chilometri e in tempo, e dipende dal motore e da come usi l'auto. Con tragitti brevi in città l'olio si consuma prima. Ti diciamo quale intervallo è adatto alla tua auto.",
      },
      {
        q: "Posso portare il mio olio?",
        a: "Diccelo quando prenoti. Prima di usarlo verifichiamo che l'olio rispetti le specifiche del motore.",
      },
      {
        q: "Quali filtri si cambiano con l'olio?",
        a: "Il filtro olio si cambia a ogni cambio olio. I filtri aria, abitacolo e carburante hanno intervalli propri: ti diciamo quali vanno sostituiti ora.",
      },
    ],
  },

  tires: {
    name: "Gommista 24/24",
    short: "Gommista sempre aperto: riparazione forature, cambio gomme, equilibratura e controllo pressione, giorno e notte.",
    h1: "Gommista 24/24 a Chișinău",
    metaTitle: "Gommista 24 ore su 24 a Chișinău — ForceCar",
    metaDescription:
      "Gommista 24/24 da ForceCar a Chișinău: riparazione forature, montaggio ed equilibratura ruote, cambio gomme stagionale e controllo della pressione, a qualsiasi ora.",
    intro: [
      "Una foratura non guarda l'orologio. Per questo il gommista ForceCar lavora 24 ore su 24: vieni di giorno o di notte, con una foratura, una ruota che vibra o per il cambio gomme stagionale.",
      "Controlliamo lo pneumatico, ripariamo la foratura quando le condizioni lo permettono, montiamo ed equilibriamo le ruote e verifichiamo la pressione, così riparti in sicurezza.",
    ],
    symptoms: [
      "Hai forato o una gomma perde aria",
      "Il volante vibra in velocità",
      "Cambia la stagione e vanno cambiate le gomme",
      "Hai preso una buca o un marciapiede e la ruota sembra danneggiata",
      "Le gomme si consumano in modo irregolare",
      "Si accende la spia della pressione pneumatici",
    ],
    checks: [
      "Stato dello pneumatico: tagli, bolle, usura del battistrada",
      "Posizione e dimensione della foratura, per capire se si può riparare",
      "Il cerchio: deformazioni o crepe dopo un urto",
      "Valvole e tenuta sul cerchio",
      "Pressione di tutte le ruote, compresa la ruota di scorta",
    ],
    steps: [
      { title: "Vieni quando vuoi", text: "Il gommista lavora 24/24. Per essere servito a un orario preciso, chiamaci prima." },
      { title: "Controlliamo la ruota", text: "Verifichiamo pneumatico, cerchio e valvola e ti diciamo cosa si può fare." },
      { title: "Ripariamo o montiamo", text: "Ripariamo la foratura o montiamo le gomme, poi equilibriamo le ruote." },
      { title: "Controllo pressione", text: "Gonfiamo alla pressione consigliata e serriamo correttamente le ruote." },
    ],
    faq: [
      {
        q: "Lavorate anche di notte?",
        a: "Sì, il gommista ForceCar lavora 24 ore su 24. Se vieni di notte, chiamaci prima così possiamo riceverti subito.",
      },
      {
        q: "Ogni foratura si può riparare?",
        a: "No. Le piccole forature nella zona del battistrada di solito si riparano. Un taglio sul fianco, una bolla o una gomma usata a lungo a terra non si possono riparare in sicurezza: in quel caso consigliamo la sostituzione.",
      },
      {
        q: "Perché le ruote vanno equilibrate?",
        a: "Una ruota non equilibrata provoca vibrazioni al volante, usura irregolare della gomma e sollecita le sospensioni. L'equilibratura si fa dopo ogni montaggio.",
      },
    ],
    safety:
      "Se lo pneumatico ha una bolla o un taglio sul fianco, non continuare a guidare: può cedere all'improvviso. Monta la ruota di scorta o chiamaci.",
  },

  parts: {
    name: "Vendita ricambi auto",
    short: "Ricambi per manutenzione e riparazioni: filtri, pastiglie, dischi, cinghie, cuscinetti e molto altro.",
    h1: "Vendita ricambi auto a Chișinău",
    metaTitle: "Ricambi auto a Chișinău — vendita ricambi | ForceCar",
    metaDescription:
      "Vendita ricambi auto da ForceCar a Chișinău: filtri, pastiglie e dischi freno, cinghie, cuscinetti, parti delle sospensioni e altro, adatti alla tua auto, con montaggio in officina.",
    intro: [
      "Da ForceCar trovi anche ricambi auto: dai filtri e dalle pastiglie dei freni fino a cinghie di distribuzione, cuscinetti e parti delle sospensioni. Ti aiutiamo a scegliere il pezzo giusto per la tua auto, così non compri a caso.",
      "Puoi portare via il pezzo o farlo montare direttamente nella nostra officina.",
    ],
    symptoms: [
      "Ti serve un pezzo e non sai quale codice è quello giusto",
      "Prepari il tagliando e vuoi filtri e olio adatti",
      "Ti è stato consigliato di sostituire un pezzo usurato",
      "Vuoi il pezzo e il montaggio nello stesso posto",
      "Cerchi un pezzo per un'auto più vecchia o rara",
    ],
    checks: [
      "Marca, modello, anno e motorizzazione dell'auto",
      "Il numero di telaio (VIN), per il codice esatto del pezzo",
      "Compatibilità con la versione della tua auto",
      "Quali altri pezzi si cambiano di solito insieme",
    ],
    steps: [
      { title: "Dicci cosa ti serve", text: "Chiamaci o scrivici marca, modello, anno e, se possibile, il numero di telaio (VIN)." },
      { title: "Troviamo il pezzo giusto", text: "Verifichiamo la compatibilità e ti diciamo quali opzioni ci sono." },
      { title: "Ritiri il pezzo", text: "Il pezzo ti aspetta in officina, in str. Ismail 103." },
      { title: "Lo montiamo, se vuoi", text: "Possiamo montare il pezzo direttamente nell'officina ForceCar." },
    ],
    faq: [
      {
        q: "Come capisco quale pezzo va bene per la mia auto?",
        a: "Il modo più sicuro è il numero di telaio (VIN), che trovi sul libretto di circolazione. Mandacelo e verifichiamo il codice esatto del pezzo.",
      },
      {
        q: "Posso comprare il pezzo senza farlo montare da voi?",
        a: "Sì. Puoi comprare solo il pezzo o farlo montare nell'officina ForceCar.",
      },
      {
        q: "Avete i ricambi disponibili?",
        a: "Dipende dal pezzo. Chiamaci o scrivici e ti diciamo se lo abbiamo subito o quanto tempo serve per farlo arrivare, prima dell'ordine.",
      },
    ],
  },

  bodywork: {
    name: "Carrozzeria e lattoneria",
    short: "Ripariamo la carrozzeria dopo un incidente: raddrizzatura, lattoneria e sostituzione dei pezzi danneggiati.",
    h1: "Riparazione carrozzeria a Chișinău",
    metaTitle: "Carrozzeria a Chișinău — riparazioni dopo incidente | ForceCar",
    metaDescription:
      "Riparazioni di carrozzeria, lattoneria e dopo incidente da ForceCar a Chișinău: raddrizzatura, sostituzione di elementi e preparazione alla verniciatura.",
    intro: [
      "Dopo un incidente, anche un piccolo urto può nascondere danni alla struttura dell'auto: staffe, fissaggi o elementi della carrozzeria deformati. Da ForceCar valutiamo sia la parte visibile sia ciò che c'è dietro.",
      "Ripariamo la carrozzeria raddrizzando o sostituendo gli elementi danneggiati e prepariamo la superficie alla verniciatura, perché l'auto abbia l'aspetto e il funzionamento corretti.",
    ],
    symptoms: [
      "Hai avuto un incidente, anche lieve",
      "Hai ammaccature, pieghe o graffi profondi sulla carrozzeria",
      "Porte, cofano o bagagliaio non si chiudono più bene",
      "Le fessure tra gli elementi non sono più regolari",
      "È comparsa ruggine sulla carrozzeria",
      "Vuoi riparare l'auto dopo un urto in parcheggio",
    ],
    checks: [
      "Elementi esterni danneggiati: paraurti, parafanghi, porte, cofano",
      "Fissaggi, staffe e componenti dietro il paraurti",
      "Allineamento degli elementi e fessure tra di essi",
      "Struttura della scocca nella zona dell'urto",
      "Componenti nella zona danneggiata: radiatore, fari, sospensioni",
      "Cosa si può raddrizzare e cosa va sostituito",
    ],
    steps: [
      { title: "Valutiamo il danno", text: "Controlliamo la zona dell'urto e ciò che c'è dietro." },
      { title: "Ti spieghiamo la riparazione", text: "Cosa si raddrizza, cosa si sostituisce e come si svolge il lavoro." },
      { title: "Ripariamo la carrozzeria", text: "Raddrizzatura, sostituzione di elementi, preparazione alla verniciatura." },
      { title: "Rifiniamo e verifichiamo", text: "Controlliamo l'allineamento e il funzionamento dei componenti nella zona." },
    ],
    faq: [
      {
        q: "Un piccolo urto può nascondere danni più gravi?",
        a: "Sì. Dietro il paraurti o il parafango possono esserci staffe rotte, sensori o componenti del raffreddamento danneggiati. Per questo controlliamo anche la zona dietro il danno.",
      },
      {
        q: "Posso inviare foto del danno prima della visita?",
        a: "Sì. Allega le foto nel modulo di prenotazione: ci aiutano a farci una prima idea. La valutazione esatta si fa però solo dopo aver visto l'auto.",
      },
      {
        q: "Quando si raddrizza un elemento e quando si sostituisce?",
        a: "Dipende da quanto è deformato l'elemento e dalla zona colpita. Se la raddrizzatura può ridargli forma e resistenza corrette, si ripara; altrimenti si sostituisce. Ti spieghiamo la scelta prima del lavoro.",
      },
    ],
  },

  paint: {
    name: "Verniciatura auto",
    short: "Preparazione della carrozzeria, carteggiatura e verniciatura in cabina.",
    h1: "Verniciatura auto a Chișinău",
    metaTitle: "Verniciatura auto a Chișinău — preparazione e verniciatura | ForceCar",
    metaDescription:
      "Verniciatura auto da ForceCar a Chișinău: preparazione della carrozzeria, carteggiatura, fondo e verniciatura in cabina per elementi riparati o graffiati.",
    intro: [
      "Una buona verniciatura inizia dalla preparazione: la superficie va pulita, riparata, carteggiata e trattata con il fondo in modo corretto. Se la preparazione è frettolosa, i difetti emergono dopo la verniciatura.",
      "Da ForceCar prepariamo con cura ogni elemento e lo verniciamo in cabina di verniciatura, un ambiente controllato, per una finitura uniforme.",
    ],
    symptoms: [
      "Graffi profondi o vernice scheggiata",
      "Elementi riparati dopo un incidente da verniciare",
      "Vernice sbiadita, opaca o che si stacca",
      "Tracce di ruggine superficiale",
      "Differenze di tonalità tra gli elementi",
    ],
    checks: [
      "Stato della vernice e profondità dei graffi",
      "Irregolarità, piccole ammaccature e ruggine superficiale",
      "Cosa va riparato prima della verniciatura",
      "La tonalità del colore attuale dell'auto",
      "La zona da verniciare: uno o più elementi",
    ],
    steps: [
      { title: "Valutiamo la superficie", text: "Capiamo cosa va riparato e cosa va solo verniciato." },
      { title: "Prepariamo la carrozzeria", text: "Pulizia, riparazione, carteggiatura e fondo." },
      { title: "Verniciamo in cabina", text: "La verniciatura avviene in cabina, in un ambiente controllato." },
      { title: "Rifiniamo", text: "Controlliamo l'aspetto e l'uniformità della finitura." },
    ],
    faq: [
      {
        q: "Si può verniciare un solo elemento?",
        a: "Sì, nella maggior parte dei casi si vernicia solo l'elemento riparato o graffiato. A volte, per una transizione uniforme del colore, si lavora anche su parte degli elementi vicini. Ti diciamo in anticipo cosa comporta il lavoro.",
      },
      {
        q: "Perché è importante la preparazione prima della verniciatura?",
        a: "La vernice non nasconde i difetti: li mette in evidenza. La superficie va pulita, riparata e carteggiata correttamente, altrimenti compaiono irregolarità, bolle o distacchi.",
      },
      {
        q: "Quanto dura la verniciatura di un elemento?",
        a: "Dipende da quanta preparazione serve e dal numero di elementi. Dopo la valutazione ti diamo una durata stimata.",
      },
    ],
  },
};

export default it;
