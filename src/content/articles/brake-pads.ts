import type { Article } from "./types";

const article: Article = {
  id: "brake-pads",
  datePublished: "2026-09-25",
  dateModified: "2026-09-25",
  serviceId: "brakes",
  image: "lucrareAripa",
  translations: {
    ro: {
      slug: "cand-se-schimba-placutele-de-frana",
      title: "Cum îți dai seama că plăcuțele de frână trebuie schimbate?",
      description:
        "Semnele de uzură ale plăcuțelor de frână, ce înseamnă scârțâitul și vibrațiile la frânare și când trebuie să oprești mașina. Sfaturi ForceCar, Chișinău.",
      body: [
        {
          type: "p",
          text: "Plăcuțele de frână se uzează la fiecare frânare. Cât rezistă depinde de mașină, de plăcuțe și mai ales de stilul de condus: în oraș, cu multe opriri, se consumă mai repede decât pe drum lung.",
        },
        { type: "h2", text: "Semnele cele mai frecvente" },
        {
          type: "ul",
          items: [
            "un scârțâit sau un sunet metalic la frânare;",
            "martorul de uzură a plăcuțelor aprins în bord (la mașinile care au senzor);",
            "mașina frânează mai slab sau trebuie să apeși pedala mai tare;",
            "vibrații în volan sau în pedală la frânare — adesea semn că discurile sunt uzate sau deformate;",
            "mașina trage într-o parte când frânezi.",
          ],
        },
        { type: "h2", text: "De ce nu e bine să amâni" },
        {
          type: "p",
          text: "Când materialul de frecare se termină, suportul metalic al plăcuței ajunge să frece direct pe disc. Frânarea devine mai slabă, iar discul se deteriorează — și atunci trebuie schimbat și el, nu doar plăcuțele.",
        },
        { type: "h2", text: "Când trebuie să oprești imediat" },
        {
          type: "p",
          text: "Dacă pedala coboară până jos, mașina aproape nu frânează sau simți un miros puternic de ars de la roți, nu continua drumul. Acestea sunt probleme de siguranță, nu de confort.",
        },
        { type: "h2", text: "Ce înseamnă o verificare corectă" },
        {
          type: "p",
          text: "O verificare corectă nu înseamnă doar plăcuțele: se verifică grosimea discurilor, etrierele, furtunurile, lichidul de frână și frâna de mână. La ForceCar îți spunem ce este uzat și ce trebuie schimbat acum, înainte de a începe lucrarea.",
        },
      ],
    },
    ru: {
      slug: "kogda-menyat-tormoznye-kolodki",
      title: "Как понять, что пора менять тормозные колодки?",
      description:
        "Признаки износа тормозных колодок, что означают скрип и вибрация при торможении и когда нужно остановить машину. Советы ForceCar, Кишинёв.",
      body: [
        {
          type: "p",
          text: "Тормозные колодки изнашиваются при каждом торможении. Сколько они прослужат, зависит от машины, самих колодок и особенно от стиля вождения: в городе, с частыми остановками, они изнашиваются быстрее, чем на трассе.",
        },
        { type: "h2", text: "Самые частые признаки" },
        {
          type: "ul",
          items: [
            "скрип или металлический звук при торможении;",
            "горит индикатор износа колодок (на машинах с датчиком);",
            "машина тормозит хуже или педаль приходится нажимать сильнее;",
            "вибрация в руле или педали при торможении — часто признак износа или деформации дисков;",
            "машину уводит в сторону при торможении.",
          ],
        },
        { type: "h2", text: "Почему не стоит откладывать" },
        {
          type: "p",
          text: "Когда фрикционный материал заканчивается, металлическое основание колодки начинает тереться прямо о диск. Торможение ослабевает, а диск повреждается — и тогда менять приходится не только колодки, но и его.",
        },
        { type: "h2", text: "Когда нужно остановиться сразу" },
        {
          type: "p",
          text: "Если педаль проваливается до пола, машина почти не тормозит или от колёс идёт сильный запах гари — не продолжайте движение. Это вопрос безопасности, а не комфорта.",
        },
        { type: "h2", text: "Что такое правильная проверка" },
        {
          type: "p",
          text: "Правильная проверка — это не только колодки: проверяют толщину дисков, суппорты, шланги, тормозную жидкость и стояночный тормоз. В ForceCar мы скажем, что изношено и что нужно заменить сейчас, до начала работ.",
        },
      ],
    },
    it: {
      slug: "quando-cambiare-pastiglie-freni",
      title: "Come capire quando cambiare le pastiglie dei freni?",
      description:
        "I segnali di usura delle pastiglie, cosa significano fischi e vibrazioni in frenata e quando fermare l'auto. Consigli ForceCar, Chișinău.",
      body: [
        {
          type: "p",
          text: "Le pastiglie dei freni si consumano a ogni frenata. Quanto durano dipende dall'auto, dalle pastiglie e soprattutto dallo stile di guida: in città, con molte fermate, si consumano più in fretta che su percorsi lunghi.",
        },
        { type: "h2", text: "I segnali più comuni" },
        {
          type: "ul",
          items: [
            "un fischio o un rumore metallico in frenata;",
            "la spia di usura delle pastiglie accesa (sulle auto con sensore);",
            "l'auto frena meno o devi premere di più il pedale;",
            "vibrazioni nel volante o nel pedale in frenata — spesso segno di dischi usurati o deformati;",
            "l'auto tira da un lato quando freni.",
          ],
        },
        { type: "h2", text: "Perché non conviene rimandare" },
        {
          type: "p",
          text: "Quando il materiale d'attrito finisce, il supporto metallico della pastiglia sfrega direttamente sul disco. La frenata diventa più debole e il disco si rovina: a quel punto va sostituito anche lui, non solo le pastiglie.",
        },
        { type: "h2", text: "Quando fermarsi subito" },
        {
          type: "p",
          text: "Se il pedale arriva a fondo corsa, l'auto quasi non frena o senti un forte odore di bruciato dalle ruote, non proseguire. Sono problemi di sicurezza, non di comfort.",
        },
        { type: "h2", text: "Cosa significa un controllo fatto bene" },
        {
          type: "p",
          text: "Un controllo corretto non riguarda solo le pastiglie: si verificano lo spessore dei dischi, le pinze, i tubi, il liquido freni e il freno di stazionamento. Da ForceCar ti diciamo cosa è usurato e cosa va sostituito ora, prima di iniziare il lavoro.",
        },
      ],
    },
    en: {
      slug: "when-to-replace-brake-pads",
      title: "How do you know your brake pads need replacing?",
      description:
        "Signs of brake pad wear, what squealing and vibration when braking mean, and when to stop driving. Advice from ForceCar, Chișinău.",
      body: [
        {
          type: "p",
          text: "Brake pads wear a little every time you brake. How long they last depends on the car, the pads and above all your driving style: in town, with lots of stops, they wear faster than on long drives.",
        },
        { type: "h2", text: "The most common signs" },
        {
          type: "ul",
          items: [
            "a squeal or metallic noise when braking;",
            "the pad wear warning light on the dashboard (on cars with a sensor);",
            "the car brakes less well or you have to press the pedal harder;",
            "vibration in the steering wheel or pedal when braking — often a sign of worn or warped discs;",
            "the car pulls to one side when you brake.",
          ],
        },
        { type: "h2", text: "Why you shouldn't put it off" },
        {
          type: "p",
          text: "Once the friction material is gone, the pad's metal backing rubs directly on the disc. Braking gets weaker and the disc is damaged — so it has to be replaced too, not just the pads.",
        },
        { type: "h2", text: "When to stop straight away" },
        {
          type: "p",
          text: "If the pedal sinks to the floor, the car barely brakes or there's a strong burning smell from the wheels, don't continue driving. These are safety problems, not comfort issues.",
        },
        { type: "h2", text: "What a proper check involves" },
        {
          type: "p",
          text: "A proper check isn't only about the pads: disc thickness, calipers, hoses, brake fluid and the handbrake are checked too. At ForceCar we tell you what's worn and what needs replacing now, before starting any work.",
        },
      ],
    },
  },
};

export default article;
