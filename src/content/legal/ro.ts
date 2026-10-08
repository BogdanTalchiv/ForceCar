import type { LegalContent } from "./types";

const ro: LegalContent = {
  updatedLabel: "Ultima actualizare",
  privacy: {
    intro:
      "Această politică explică ce date personale colectează site-ul ForceCar, de ce le folosim și ce drepturi ai. Folosim doar datele necesare pentru a-ți răspunde.",
    sections: [
      {
        h: "Cine suntem",
        p: [
          "Operatorul datelor este {controller}, service auto din Chișinău, Republica Moldova. Pentru întrebări despre datele tale personale ne poți contacta {contact}.",
        ],
      },
      {
        h: "Ce date colectăm",
        ul: [
          "Prin formularul de programare: numele, telefonul, emailul, modul de contact preferat, datele mașinii (marcă, model, an și, opțional, kilometraj și număr de înmatriculare), descrierea problemei, data și intervalul preferat și fotografiile atașate (opțional).",
          "Informații tehnice despre cerere: pagina de pe care a fost trimisă, limba site-ului și, dacă ai ajuns pe site dintr-o campanie, parametrii campaniei (UTM).",
          "Prin asistentul virtual: mesajele pe care le scrii în conversație.",
          "Cookie-uri și tehnologii similare — detaliate în Politica de cookie-uri.",
        ],
      },
      {
        h: "De ce folosim datele",
        ul: [
          "pentru a răspunde cererii de programare și a te contacta pentru confirmarea zilei și a orei;",
          "pentru a pregăti vizita (de exemplu, după descrierea problemei și fotografii);",
          "pentru a înțelege din ce canale vin cererile (parametrii UTM);",
          "pentru a îmbunătăți site-ul, prin statistici de utilizare — doar cu acordul tău;",
          "pentru a proteja site-ul împotriva abuzurilor (de exemplu, limitarea cererilor repetate).",
        ],
      },
      {
        h: "Temeiul prelucrării",
        p: [
          "Prelucrăm datele pe baza acordului tău (bifat în formular sau acordat pentru cookie-uri), pentru a da curs cererii tale înainte de o eventuală lucrare și pe baza interesului legitim de a asigura securitatea site-ului, conform legislației Republicii Moldova privind protecția datelor cu caracter personal.",
        ],
      },
      {
        h: "Cum sunt transmise și păstrate datele",
        ul: [
          "Cererea de programare este transmisă prin email către ForceCar. Site-ul nu păstrează cererile într-o bază de date.",
          "Fotografiile atașate sunt trimise doar ca atașament la emailul intern și nu sunt salvate pe serverul site-ului.",
          "Conversațiile cu asistentul virtual nu sunt salvate de site. Dacă asistentul folosește un serviciu de inteligență artificială, mesajele sunt transmise acestuia doar pentru a genera răspunsul.",
          "Datele sunt păstrate de ForceCar doar cât este necesar pentru a răspunde cererii și pentru evidența lucrărilor.",
        ],
      },
      {
        h: "Cui transmitem datele",
        p: [
          "Datele pot fi prelucrate de furnizorii tehnici ai site-ului: găzduirea site-ului, serviciul de email și, dacă sunt activate, serviciul de inteligență artificială al asistentului și instrumentele de analiză sau marketing (doar cu acordul tău). Nu vindem datele personale.",
        ],
      },
      {
        h: "Drepturile tale",
        ul: [
          "să afli ce date avem despre tine și să primești o copie;",
          "să ceri corectarea sau ștergerea lor;",
          "să te opui prelucrării sau să îți retragi acordul oricând;",
          "să depui o plângere la Centrul Național pentru Protecția Datelor cu Caracter Personal al Republicii Moldova.",
        ],
      },
      {
        h: "Securitate",
        p: [
          "Site-ul folosește conexiune criptată (HTTPS), iar formularul este protejat împotriva trimiterilor automate și abuzive. Accesul la cereri este limitat la echipa ForceCar.",
        ],
      },
      {
        h: "Modificări",
        p: ["Putem actualiza această politică. Data ultimei actualizări este afișată mai sus."],
      },
    ],
  },
  cookies: {
    intro:
      "Cookie-urile sunt fișiere mici salvate de browser. Le folosim doar în măsura necesară: unele sunt indispensabile funcționării site-ului, iar celelalte se activează doar cu acordul tău.",
    sections: [
      {
        h: "Cookie-uri necesare",
        p: [
          "Păstrează limba aleasă și preferințele tale privind cookie-urile. Nu pot fi dezactivate, deoarece fără ele site-ul nu funcționează corect.",
        ],
      },
      {
        h: "Cookie-uri de analiză și marketing",
        p: [
          "Se activează doar dacă îți dai acordul. Ne ajută să înțelegem cum este folosit site-ul și să măsurăm eficiența campaniilor. Poți refuza fără ca site-ul să funcționeze mai rău.",
        ],
      },
      {
        h: "Conținut extern încărcat la cerere",
        p: [
          "Videoclipurile YouTube și harta Google Maps nu se încarcă automat. Se încarcă doar după ce apeși pe ele; atunci furnizorii respectivi își pot seta propriile cookie-uri.",
        ],
      },
    ],
    tableTitle: "Ce folosim pe acest site",
    columns: { name: "Nume", purpose: "Scop", duration: "Durată", category: "Categorie" },
    categories: { necessary: "Necesar", analytics: "Analiză", marketing: "Marketing", external: "Extern, la cerere" },
    rows: {
      locale: { purpose: "Păstrează limba aleasă de tine.", duration: "1 an" },
      consent: { purpose: "Păstrează preferințele tale privind cookie-urile.", duration: "6 luni" },
      bookingDraft: {
        purpose: "Păstrează temporar datele completate în formularul de programare, dacă reîncarci pagina.",
        duration: "Până la închiderea filei",
      },
      utm: {
        purpose: "Reține sursa campaniei din care ai venit, pentru a o atașa cererii de programare.",
        duration: "Până la închiderea filei; 30 de zile doar cu acord pentru analiză",
      },
      ga: { purpose: "Google Analytics — statistici de utilizare a site-ului.", duration: "Până la 2 ani" },
      ads: { purpose: "Google Ads — măsurarea conversiilor din reclame.", duration: "Până la 90 de zile" },
      meta: { purpose: "Meta Pixel — măsurarea reclamelor Facebook/Instagram.", duration: "Până la 90 de zile" },
      youtube: { purpose: "YouTube (youtube-nocookie.com) — redarea recenziilor video.", duration: "Stabilită de YouTube" },
      maps: { purpose: "Google Maps — afișarea hărții pe pagina de contact.", duration: "Stabilită de Google" },
    },
    manage: {
      h: "Cum îți schimbi preferințele",
      p: [
        "Poți schimba oricând alegerea din linkul „Setări cookie-uri” din subsolul site-ului. Poți șterge cookie-urile și din setările browserului.",
      ],
    },
  },
};

export default ro;
