import type { LegalContent } from "./types";

const it: LegalContent = {
  updatedLabel: "Ultimo aggiornamento",
  privacy: {
    intro:
      "Questa informativa spiega quali dati personali raccoglie il sito ForceCar, perché li usiamo e quali diritti hai. Usiamo solo i dati necessari per risponderti.",
    sections: [
      {
        h: "Chi siamo",
        p: [
          "Il titolare del trattamento è {controller}, officina auto a Chișinău, Repubblica di Moldova. Per domande sui tuoi dati personali puoi contattarci {contact}.",
        ],
      },
      {
        h: "Quali dati raccogliamo",
        ul: [
          "Tramite il modulo di prenotazione: nome, telefono, email (facoltativa), metodo di contatto preferito, dati dell'auto (marca, modello, anno e, facoltativamente, chilometraggio e targa), descrizione del problema, data e fascia oraria preferite e foto allegate (facoltative).",
          "Informazioni tecniche sulla richiesta: la pagina da cui è stata inviata, la lingua del sito e, se sei arrivato da una campagna, i parametri della campagna (UTM).",
          "Tramite l'assistente virtuale: i messaggi che scrivi nella conversazione.",
          "Cookie e tecnologie simili — descritti nella Cookie policy.",
        ],
      },
      {
        h: "Perché usiamo i dati",
        ul: [
          "per rispondere alla richiesta di prenotazione e contattarti per confermare giorno e ora;",
          "per preparare la visita (ad esempio in base alla descrizione e alle foto);",
          "per capire da quali canali arrivano le richieste (parametri UTM);",
          "per migliorare il sito tramite statistiche d'uso — solo con il tuo consenso;",
          "per proteggere il sito da abusi (ad esempio limitando le richieste ripetute).",
        ],
      },
      {
        h: "Base giuridica",
        p: [
          "Trattiamo i dati sulla base del tuo consenso (espresso nel modulo o per i cookie), per dare seguito alla tua richiesta prima di un eventuale intervento e sulla base del legittimo interesse a garantire la sicurezza del sito, in conformità con la normativa della Repubblica di Moldova sulla protezione dei dati personali.",
        ],
      },
      {
        h: "Come vengono trasmessi e conservati i dati",
        ul: [
          "La richiesta di prenotazione viene inviata a ForceCar via email. Il sito non conserva le richieste in un database.",
          "Le foto allegate vengono inviate solo come allegato dell'email interna e non vengono salvate sul server del sito.",
          "Le conversazioni con l'assistente virtuale non vengono salvate dal sito. Se l'assistente usa un servizio di intelligenza artificiale, i messaggi vengono inviati a tale servizio solo per generare la risposta.",
          "ForceCar conserva i dati solo per il tempo necessario a rispondere alla richiesta e per la gestione dei lavori.",
        ],
      },
      {
        h: "A chi comunichiamo i dati",
        p: [
          "I dati possono essere trattati dai fornitori tecnici del sito: hosting, servizio email e, se attivi, il servizio di intelligenza artificiale dell'assistente e gli strumenti di analisi o marketing (solo con il tuo consenso). Non vendiamo dati personali.",
        ],
      },
      {
        h: "I tuoi diritti",
        ul: [
          "sapere quali dati abbiamo su di te e riceverne una copia;",
          "chiederne la rettifica o la cancellazione;",
          "opporti al trattamento o revocare il consenso in qualsiasi momento;",
          "presentare reclamo al Centro Nazionale per la Protezione dei Dati Personali della Repubblica di Moldova.",
        ],
      },
      {
        h: "Sicurezza",
        p: [
          "Il sito usa una connessione cifrata (HTTPS) e il modulo è protetto da invii automatici e abusivi. L'accesso alle richieste è limitato al team ForceCar.",
        ],
      },
      {
        h: "Modifiche",
        p: ["Possiamo aggiornare questa informativa. La data dell'ultimo aggiornamento è indicata sopra."],
      },
    ],
  },
  cookies: {
    intro:
      "I cookie sono piccoli file salvati dal browser. Li usiamo solo quanto necessario: alcuni sono indispensabili al funzionamento del sito, gli altri si attivano solo con il tuo consenso.",
    sections: [
      {
        h: "Cookie necessari",
        p: [
          "Memorizzano la lingua scelta e le tue preferenze sui cookie. Non possono essere disattivati, perché senza di essi il sito non funziona correttamente.",
        ],
      },
      {
        h: "Cookie di analisi e marketing",
        p: [
          "Si attivano solo con il tuo consenso. Ci aiutano a capire come viene usato il sito e a misurare l'efficacia delle campagne. Puoi rifiutarli senza che il sito funzioni peggio.",
        ],
      },
      {
        h: "Contenuti esterni caricati su richiesta",
        p: [
          "I video di YouTube e la mappa di Google Maps non si caricano automaticamente. Vengono caricati solo dopo un clic; a quel punto i rispettivi fornitori possono impostare i propri cookie.",
        ],
      },
    ],
    tableTitle: "Cosa usiamo su questo sito",
    columns: { name: "Nome", purpose: "Finalità", duration: "Durata", category: "Categoria" },
    categories: { necessary: "Necessario", analytics: "Analisi", marketing: "Marketing", external: "Esterno, su richiesta" },
    rows: {
      locale: { purpose: "Memorizza la lingua che hai scelto.", duration: "1 anno" },
      consent: { purpose: "Memorizza le tue preferenze sui cookie.", duration: "6 mesi" },
      bookingDraft: {
        purpose: "Conserva temporaneamente i dati inseriti nel modulo di prenotazione se ricarichi la pagina.",
        duration: "Fino alla chiusura della scheda",
      },
      utm: {
        purpose: "Ricorda la campagna da cui sei arrivato, per allegarla alla richiesta di prenotazione.",
        duration: "Fino alla chiusura della scheda; 30 giorni solo con consenso all'analisi",
      },
      ga: { purpose: "Google Analytics — statistiche d'uso del sito.", duration: "Fino a 2 anni" },
      ads: { purpose: "Google Ads — misurazione delle conversioni pubblicitarie.", duration: "Fino a 90 giorni" },
      meta: { purpose: "Meta Pixel — misurazione degli annunci Facebook/Instagram.", duration: "Fino a 90 giorni" },
      youtube: { purpose: "YouTube (youtube-nocookie.com) — riproduzione delle video recensioni.", duration: "Stabilita da YouTube" },
      maps: { purpose: "Google Maps — visualizzazione della mappa nella pagina contatti.", duration: "Stabilita da Google" },
    },
    manage: {
      h: "Come modificare le preferenze",
      p: [
        "Puoi modificare la scelta in qualsiasi momento dal link «Impostazioni cookie» a fondo pagina. Puoi anche eliminare i cookie dalle impostazioni del browser.",
      ],
    },
  },
};

export default it;
