import type { ServiceContentMap } from "./types";

const ro: ServiceContentMap = {
  diagnostics: {
    name: "Diagnostică auto",
    short: "Aflăm de unde vine problema: martori aprinși în bord, zgomote, vibrații sau consum crescut.",
    h1: "Diagnostică auto în Chișinău",
    metaTitle: "Diagnostică auto în Chișinău — ForceCar",
    metaDescription:
      "Diagnostică auto la ForceCar, Chișinău: verificăm martorii din bord, zgomotele și defecțiunile și îți explicăm clar ce are mașina înainte de reparație.",
    intro: [
      "Diagnostica auto înseamnă să găsim cauza reală a unei probleme, nu doar să citim un cod de eroare. La ForceCar combinăm citirea erorilor din calculatorul mașinii cu verificarea practică, pe baza unei experiențe de peste 20 de ani.",
      "După verificare îți explicăm pe înțeles ce am găsit și ce trebuie reparat, ca să decizi informat.",
    ],
    symptoms: [
      "S-a aprins Check Engine sau alt martor în bord",
      "Mașina trage mai slab sau merge sacadat",
      "Consumul de combustibil a crescut fără un motiv clar",
      "Apar zgomote, vibrații sau mirosuri noi",
      "Pornește greu sau se oprește singură",
      "Ai o problemă care apare doar uneori și nu știi de unde vine",
    ],
    checks: [
      "Erorile memorate în calculatorul mașinii",
      "Senzorii și parametrii motorului în funcționare",
      "Sistemele de aprindere și de alimentare",
      "Starea generală: scurgeri, furtunuri, curele",
      "Zgomotele și vibrațiile, la nevoie în timpul unui test de drum",
    ],
    steps: [
      { title: "Ne spui ce ai observat", text: "Când apare problema, de cât timp și în ce condiții. Fiecare detaliu ajută." },
      { title: "Verificăm mașina", text: "Citim erorile și verificăm practic sistemele implicate." },
      { title: "Îți explicăm rezultatul", text: "Afli pe înțeles ce am găsit și ce este necesar." },
      { title: "Decizi tu", text: "Reparația începe doar după ce ești de acord cu lucrările propuse." },
    ],
    faq: [
      {
        q: "Codul de eroare îmi spune exact ce piesă e defectă?",
        a: "Nu întotdeauna. Codul arată sistemul în care a apărut problema, dar cauza poate fi alta — un senzor, o conexiune sau o piesă uzată. De aceea verificăm și practic, înainte să recomandăm înlocuirea unei piese.",
      },
      {
        q: "Pot circula cu martorul Check Engine aprins?",
        a: "Depinde. Dacă martorul clipește, mașina pierde puterea sau apar fum, miros de ars ori temperatură mare, oprește în siguranță și nu continua drumul. Dacă martorul e aprins constant și mașina merge normal, programează o verificare cât mai curând.",
      },
      {
        q: "Ce informații să pregătesc înainte de diagnosticare?",
        a: "Marca, modelul, anul și, dacă se poate, kilometrajul. Notează când apare problema: la rece sau la cald, la accelerare, la frânare, pe drum denivelat. Poți atașa și fotografii în formularul de programare.",
      },
    ],
  },

  engine: {
    name: "Reparații motor",
    short: "Pierderi de ulei, fum, zgomote sau supraîncălzire — găsim cauza și reparăm motorul.",
    h1: "Reparație motor în Chișinău",
    metaTitle: "Reparație motor în Chișinău — ForceCar",
    metaDescription:
      "Reparații motor la ForceCar, Chișinău: verificăm cauza pierderilor de ulei, a fumului sau a zgomotelor și îți explicăm clar ce reparație este necesară.",
    intro: [
      "Motorul este una dintre cele mai scumpe componente ale mașinii, de aceea contează să afli din timp ce se întâmplă cu el. La ForceCar căutăm mai întâi cauza — de unde vine zgomotul, fumul sau pierderea de ulei — și abia apoi propunem reparația.",
      "Îți explicăm ce piese sunt afectate, ce trebuie reparat sau înlocuit și de ce, înainte de a începe lucrările.",
    ],
    symptoms: [
      "Fum albastru, alb sau negru la eșapament",
      "Consum mare de ulei sau pete de ulei sub mașină",
      "Zgomote metalice, ciocănituri sau bătăi din motor",
      "Temperatura urcă peste normal sau scade nivelul de antigel",
      "Motorul merge neregulat, vibrează sau pierde putere",
      "Se aprinde martorul de presiune a uleiului",
    ],
    checks: [
      "Scurgerile de ulei și de antigel și de unde provin",
      "Zgomotele motorului la ralanti și în sarcină",
      "Sistemul de răcire: radiator, pompă, termostat, furtunuri",
      "Aprinderea, alimentarea și erorile din calculator",
      "Starea distribuției și a curelelor",
      "Compresia, atunci când simptomele o cer",
    ],
    steps: [
      { title: "Ascultăm simptomele", text: "Ne spui ce ai observat și de când. Întrebăm și despre ultimele reparații." },
      { title: "Găsim cauza", text: "Verificăm motorul pas cu pas, ca să nu înlocuim piese la întâmplare." },
      { title: "Îți explicăm variantele", text: "Afli ce trebuie reparat și de ce, înainte de orice lucrare." },
      { title: "Reparăm și verificăm", text: "După reparație verificăm funcționarea motorului înainte să îți predăm mașina." },
    ],
    faq: [
      {
        q: "Merită reparat motorul sau e mai bine înlocuit?",
        a: "Depinde de ce s-a defectat, de starea generală a motorului și de valoarea mașinii. După verificare îți explicăm variantele posibile, ca să poți decide.",
      },
      {
        q: "Pot circula dacă motorul fumegă sau pierde ulei?",
        a: "Dacă se aprinde martorul de ulei, temperatura urcă peste normal sau motorul bate, oprește motorul și nu continua drumul — poți provoca o defecțiune mult mai mare. În celelalte cazuri, programează o verificare cât mai repede.",
      },
      {
        q: "Cât durează o reparație de motor?",
        a: "Depinde mult de tipul reparației și de disponibilitatea pieselor. După ce verificăm mașina, îți spunem durata estimată.",
      },
    ],
    safety:
      "Dacă se aprinde martorul de presiune a uleiului sau temperatura urcă în zona roșie, oprește motorul cât mai repede, în siguranță. Continuarea drumului poate distruge motorul.",
  },

  timing: {
    name: "Schimb distribuție",
    short: "Înlocuim la timp cureaua sau lanțul de distribuție, rolele și întinzătorul.",
    h1: "Schimb distribuție în Chișinău",
    metaTitle: "Schimb distribuție în Chișinău — curea și lanț | ForceCar",
    metaDescription:
      "Înlocuirea curelei sau a lanțului de distribuție la ForceCar, Chișinău: verificăm rolele, întinzătorul și pompa de apă și îți spunem clar ce trebuie schimbat.",
    intro: [
      "Distribuția sincronizează mișcarea pistoanelor și a supapelor. Dacă o curea uzată se rupe, la multe motoare pistoanele lovesc supapele, iar reparația devine mult mai scumpă decât un schimb făcut la timp.",
      "La ForceCar verificăm starea distribuției și îți spunem ce trebuie înlocuit — cureaua sau lanțul, rolele, întinzătorul și, dacă e cazul, pompa de apă.",
    ],
    symptoms: [
      "Nu știi când a fost schimbată ultima dată distribuția",
      "Te apropii de intervalul recomandat de producător (în km sau în ani)",
      "Se aude un fâșâit, un scârțâit sau un zornăit din zona distribuției",
      "Motorul pornește greu sau merge neregulat",
      "Vezi urme de ulei sau de antigel în zona distribuției",
      "Ai cumpărat recent o mașină second-hand",
    ],
    checks: [
      "Starea curelei: fisuri, uzură, tensiune",
      "Rolele și întinzătorul — joc și zgomot",
      "Pompa de apă, acolo unde este antrenată de distribuție",
      "Scurgerile de ulei de la simeringuri",
      "La lanț: zgomotul la pornire și întinderea lanțului",
    ],
    steps: [
      { title: "Identificăm motorul", text: "Marca, modelul, motorizarea și kilometrajul ne arată ce distribuție are mașina." },
      { title: "Verificăm starea", text: "Verificăm cureaua sau lanțul și componentele din jur." },
      { title: "Îți spunem ce se schimbă", text: "Afli exact ce piese trebuie înlocuite și de ce." },
      { title: "Montăm și verificăm", text: "Montăm distribuția, verificăm calajul și funcționarea motorului." },
    ],
    faq: [
      {
        q: "La câți kilometri se schimbă distribuția?",
        a: "Intervalul diferă de la un motor la altul și este stabilit de producător, în kilometri și în ani. Dacă nu știi când s-a schimbat ultima dată, este mai sigur să o verificăm.",
      },
      {
        q: "Se schimbă și rolele odată cu cureaua?",
        a: "De regulă, da — rolele și întinzătorul se uzează odată cu cureaua. La multe motoare se recomandă și schimbarea pompei de apă. Îți spunem exact ce se aplică la mașina ta.",
      },
      {
        q: "Și lanțul de distribuție trebuie schimbat?",
        a: "Lanțul durează mai mult decât cureaua, dar se poate întinde în timp. Un zgomot metalic scurt la pornire poate fi un semn. Îl verificăm și îți spunem dacă e nevoie de înlocuire.",
      },
    ],
  },

  brakes: {
    name: "Reparație frâne",
    short: "Plăcuțe, discuri, etriere și lichid de frână — verificăm și reparăm sistemul de frânare.",
    h1: "Reparație frâne în Chișinău",
    metaTitle: "Reparație frâne în Chișinău — plăcuțe, discuri, etriere | ForceCar",
    metaDescription:
      "Verificare și reparație frâne la ForceCar, Chișinău: plăcuțe, discuri, etriere și lichid de frână. Îți explicăm ce trebuie schimbat înainte de lucrări.",
    intro: [
      "Frânele sunt cel mai important sistem de siguranță al mașinii. Un scârțâit, o vibrație în pedală sau o mașină care trage într-o parte la frânare sunt semne că ceva trebuie verificat.",
      "La ForceCar verificăm întregul sistem de frânare și îți spunem clar ce piese sunt uzate și ce trebuie înlocuit acum.",
    ],
    symptoms: [
      "Scârțâit sau frecare metalică la frânare",
      "Vibrații în volan sau în pedală când frânezi",
      "Pedala e moale, coboară mult sau trebuie apăsată mai tare",
      "Mașina trage într-o parte la frânare",
      "S-a aprins martorul de frână sau de ABS",
      "Distanța de frânare pare mai mare",
    ],
    checks: [
      "Grosimea plăcuțelor și starea discurilor",
      "Etrierele și ghidajele — să nu fie blocate",
      "Furtunurile și conductele de frână",
      "Nivelul și starea lichidului de frână",
      "Frâna de mână",
      "Senzorii ABS, dacă martorul este aprins",
    ],
    steps: [
      { title: "Ne spui ce simți", text: "Zgomot, vibrații, pedală moale — orice detaliu ne ajută." },
      { title: "Verificăm frânele", text: "Verificăm plăcuțele, discurile, etrierele și lichidul." },
      { title: "Îți explicăm ce e uzat", text: "Afli ce trebuie schimbat acum și de ce." },
      { title: "Reparăm și testăm", text: "După montaj verificăm funcționarea frânelor." },
    ],
    faq: [
      {
        q: "Cum îmi dau seama că plăcuțele trebuie schimbate?",
        a: "Semnele obișnuite sunt un scârțâit metalic la frânare, martorul de uzură aprins în bord sau o frânare mai slabă. Grosimea plăcuțelor se vede cel mai sigur la o verificare.",
      },
      {
        q: "Se schimbă discurile odată cu plăcuțele?",
        a: "Nu de fiecare dată. Discurile se schimbă când sunt sub grosimea minimă, deformate sau cu uzură neuniformă. Le măsurăm și îți spunem dacă e cazul.",
      },
      {
        q: "Pot circula dacă pedala de frână e moale?",
        a: "O pedală moale sau care coboară mult poate însemna aer în sistem, lichid insuficient sau o scurgere. Este o problemă de siguranță: evită să circuli și programează o verificare cât mai curând.",
      },
    ],
    safety:
      "Dacă pedala de frână coboară până jos, mașina nu frânează normal sau simți miros de ars de la roți, nu continua drumul. Frânele sunt o problemă de siguranță.",
  },

  suspension: {
    name: "Suspensie și direcție",
    short: "Bătăi pe denivelări, volan care trage sau vibrează — găsim piesa uzată și o înlocuim.",
    h1: "Reparație suspensie și direcție în Chișinău",
    metaTitle: "Reparație suspensie și direcție în Chișinău | ForceCar",
    metaDescription:
      "Verificare și reparație suspensie și direcție la ForceCar, Chișinău: bătăi pe denivelări, volan care trage sau vibrează, amortizoare și bucșe uzate.",
    intro: [
      "Drumurile cu gropi și denivelări solicită mult suspensia. Când ceva „bate” sau mașina nu mai ține drumul ca înainte, de obicei o piesă a suspensiei sau a direcției s-a uzat.",
      "Ridicăm mașina pe elevator, verificăm de unde vine zgomotul și îți spunem exact ce piesă trebuie reparată sau înlocuită.",
    ],
    symptoms: [
      "Bătăi sau ciocănituri când treci peste denivelări",
      "Mașina trage într-o parte sau volanul nu stă drept",
      "Volanul vibrează sau are joc",
      "Mașina se leagănă mult după o groapă",
      "Anvelopele se uzează neuniform",
      "Se aude un scârțâit la virare",
    ],
    checks: [
      "Amortizoarele și arcurile",
      "Brațele, bucșele și pivoții",
      "Bieletele și bara stabilizatoare",
      "Capetele de bară și caseta de direcție",
      "Rulmenții de roată",
      "Uzura anvelopelor — ne arată unde poate fi problema",
    ],
    steps: [
      { title: "Ne spui când apare", text: "Pe denivelări, la virare, la frânare sau la viteză." },
      { title: "Verificăm pe elevator", text: "Căutăm jocurile și piesele uzate din suspensie și direcție." },
      { title: "Îți explicăm ce am găsit", text: "Afli ce piesă e uzată și ce trebuie înlocuit." },
      { title: "Înlocuim și verificăm", text: "După reparație verificăm că zgomotul a dispărut." },
    ],
    faq: [
      {
        q: "De ce bate suspensia?",
        a: "Cele mai frecvente cauze sunt bieletele, bucșele, pivoții sau amortizoarele uzate. Zgomotul poate veni și de la alte piese, de aceea verificăm mașina pe elevator înainte să recomandăm ceva.",
      },
      {
        q: "Trebuie verificată geometria după reparația suspensiei?",
        a: "După înlocuirea unor piese — de exemplu capete de bară sau brațe — geometria roților trebuie verificată. Îți spunem dacă este cazul pentru reparația ta.",
      },
      {
        q: "E periculos să circul cu volanul care vibrează?",
        a: "Vibrațiile pot avea cauze simple, cum ar fi roțile neechilibrate, dar și cauze care țin de siguranță, precum piese de direcție uzate. Programează o verificare cât mai curând.",
      },
    ],
  },

  mechanical: {
    name: "Mecanică generală",
    short: "Reparații mecanice, înlocuirea pieselor uzate și verificări periodice pentru mașina ta.",
    h1: "Mecanică auto și întreținere în Chișinău",
    metaTitle: "Mecanic auto în Chișinău — mecanică generală și întreținere | ForceCar",
    metaDescription:
      "Mecanică auto generală și întreținere la ForceCar, Chișinău: reparații mecanice, înlocuirea pieselor uzate și verificări periodice, explicate clar.",
    intro: [
      "Multe probleme mari încep ca probleme mici: o curea uzată, o scurgere, un rulment care începe să facă zgomot. Mecanica generală și întreținerea la timp te ajută să eviți reparațiile costisitoare.",
      "La ForceCar verificăm mașina, înlocuim piesele uzate și îți spunem ce ar trebui urmărit în continuare.",
    ],
    symptoms: [
      "Se apropie revizia sau ai depășit intervalul de întreținere",
      "Auzi un zgomot nou, un fluierat sau un zornăit",
      "Vezi scurgeri de lichide sub mașină",
      "Mașina se comportă diferit față de înainte",
      "Pregătești mașina pentru un drum lung",
      "Vrei o verificare generală după o perioadă fără service",
    ],
    checks: [
      "Nivelurile și starea lichidelor",
      "Filtrele, curelele și furtunurile",
      "Scurgerile de ulei, antigel sau combustibil",
      "Frânele, suspensia și anvelopele — verificare vizuală",
      "Rulmenții, suporturile motorului și eșapamentul",
      "Bateria și iluminatul",
    ],
    steps: [
      { title: "Ne spui ce dorești", text: "Revizie, un zgomot anume sau o verificare generală." },
      { title: "Verificăm mașina", text: "Verificăm sistemele principale și notăm ce am găsit." },
      { title: "Îți explicăm ce e necesar", text: "Separat: ce e urgent și ce poate fi planificat." },
      { title: "Realizăm lucrările", text: "Doar lucrările pe care le-ai aprobat." },
    ],
    faq: [
      {
        q: "Cât de des trebuie făcută întreținerea mașinii?",
        a: "Intervalele sunt stabilite de producător, în kilometri și în timp, și depind de motor și de modul în care folosești mașina. Dacă nu știi când a fost ultima revizie, o verificare generală e un început bun.",
      },
      {
        q: "Ce înseamnă mecanică generală?",
        a: "Sunt reparațiile mecanice obișnuite ale unei mașini: înlocuirea pieselor uzate, remedierea scurgerilor, a zgomotelor și a problemelor de funcționare care nu țin de caroserie.",
      },
      {
        q: "Îmi spuneți dacă o lucrare poate aștepta?",
        a: "Da. După verificare îți explicăm ce este urgent pentru siguranța și funcționarea mașinii și ce poate fi planificat mai târziu.",
      },
    ],
  },

  bodywork: {
    name: "Caroserie și tinichigerie",
    short: "Reparăm caroseria după accident: îndreptare, tinichigerie și înlocuirea elementelor avariate.",
    h1: "Reparație caroserie și tinichigerie în Chișinău",
    metaTitle: "Reparație caroserie și tinichigerie în Chișinău | ForceCar",
    metaDescription:
      "Reparații caroserie, tinichigerie și reparații după accident la ForceCar, Chișinău: îndreptare, înlocuirea elementelor și pregătire pentru vopsire.",
    intro: [
      "După un accident, chiar și o lovitură mică poate ascunde avarii în structura mașinii: suporți, fixări sau elemente de caroserie deformate. La ForceCar evaluăm atât partea vizibilă, cât și ce se află în spatele ei.",
      "Reparăm caroseria prin îndreptare sau prin înlocuirea elementelor avariate și pregătim suprafața pentru vopsire, ca mașina să arate și să funcționeze corect.",
    ],
    symptoms: [
      "Ai avut un accident, chiar și unul ușor",
      "Ai lovituri, îndoituri sau zgârieturi adânci pe caroserie",
      "Ușile, capota sau portbagajul nu se mai închid corect",
      "Spațiile dintre elemente nu mai sunt egale",
      "A apărut rugină pe caroserie",
      "Vrei să repari mașina după o lovitură în parcare",
    ],
    checks: [
      "Elementele exterioare avariate: bare, aripi, uși, capotă",
      "Fixările, suporții și elementele din spatele barei",
      "Alinierea elementelor și spațiile dintre ele",
      "Structura caroseriei în zona loviturii",
      "Componentele din zona avariată — radiator, faruri, suspensie",
      "Ce se poate îndrepta și ce trebuie înlocuit",
    ],
    steps: [
      { title: "Evaluăm avaria", text: "Verificăm zona lovită și ce se află în spatele ei." },
      { title: "Îți explicăm reparația", text: "Ce se îndreaptă, ce se înlocuiește și cum decurge lucrarea." },
      { title: "Reparăm caroseria", text: "Îndreptare, înlocuirea elementelor, pregătire pentru vopsire." },
      { title: "Finisăm și verificăm", text: "Verificăm alinierea elementelor și funcționarea componentelor din zonă." },
    ],
    faq: [
      {
        q: "O lovitură mică poate ascunde probleme mai mari?",
        a: "Da. În spatele barei sau al aripii pot exista suporți rupți, senzori sau componente ale sistemului de răcire afectate. De aceea verificăm și zona din spatele avariei.",
      },
      {
        q: "Pot trimite fotografii cu avaria înainte de vizită?",
        a: "Da. Atașează fotografiile în formularul de programare — ne ajută să ne facem o primă idee. Evaluarea exactă se face însă doar după ce vedem mașina.",
      },
      {
        q: "Când se îndreaptă un element și când se înlocuiește?",
        a: "Depinde de cât de deformat este elementul și de zona afectată. Dacă îndreptarea poate reda forma și rezistența corectă, elementul se repară; altfel se înlocuiește. Îți explicăm varianta aleasă înainte de lucrare.",
      },
    ],
  },

  paint: {
    name: "Vopsitorie auto",
    short: "Pregătirea caroseriei, șlefuire și vopsire în cabina de vopsire.",
    h1: "Vopsitorie auto în Chișinău",
    metaTitle: "Vopsitorie auto în Chișinău — pregătire și vopsire | ForceCar",
    metaDescription:
      "Vopsitorie auto la ForceCar, Chișinău: pregătirea caroseriei, șlefuire, grund și vopsire în cabină, pentru elemente reparate sau zgâriate.",
    intro: [
      "O vopsire bună începe cu pregătirea: suprafața trebuie curățată, reparată, șlefuită și grunduită corect. Dacă pregătirea e grăbită, defectele ies la iveală după vopsire.",
      "La ForceCar pregătim atent fiecare element și îl vopsim în cabina de vopsire, un spațiu controlat, ca finisajul să fie uniform.",
    ],
    symptoms: [
      "Zgârieturi adânci sau vopsea sărită",
      "Elemente reparate după un accident care trebuie vopsite",
      "Vopsea decolorată, mată sau exfoliată",
      "Urme de rugină la suprafață",
      "Diferențe de nuanță între elemente",
    ],
    checks: [
      "Starea vopselei și adâncimea zgârieturilor",
      "Denivelările, loviturile mici și rugina de suprafață",
      "Ce trebuie reparat înainte de vopsire",
      "Nuanța culorii existente a mașinii",
      "Zona de vopsit: un element sau mai multe",
    ],
    steps: [
      { title: "Evaluăm suprafața", text: "Vedem ce trebuie reparat și ce trebuie doar vopsit." },
      { title: "Pregătim caroseria", text: "Curățare, reparare, șlefuire și grund." },
      { title: "Vopsim în cabină", text: "Vopsirea se face în cabina de vopsire, într-un mediu controlat." },
      { title: "Finisăm", text: "Verificăm aspectul și uniformitatea finisajului." },
    ],
    faq: [
      {
        q: "Se poate vopsi doar un singur element?",
        a: "Da, de cele mai multe ori se vopsește doar elementul reparat sau zgâriat. Uneori, pentru o trecere uniformă a culorii, se lucrează și pe o parte din elementele vecine. Îți spunem dinainte ce presupune lucrarea.",
      },
      {
        q: "De ce contează pregătirea înainte de vopsire?",
        a: "Vopseaua nu ascunde defectele — le scoate în evidență. Suprafața trebuie curățată, reparată și șlefuită corect, altfel apar denivelări, bule sau exfolieri.",
      },
      {
        q: "Cât durează vopsirea unui element?",
        a: "Depinde de câtă pregătire este necesară și de numărul de elemente. După evaluare îți spunem durata estimată.",
      },
    ],
  },
};

export default ro;
