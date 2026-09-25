import type { Article } from "./types";

const article: Article = {
  id: "check-engine",
  datePublished: "2026-09-25",
  dateModified: "2026-09-25",
  serviceId: "diagnostics",
  image: "hero",
  translations: {
    ro: {
      slug: "de-ce-se-aprinde-check-engine",
      title: "De ce se aprinde Check Engine și ce trebuie să faci?",
      description:
        "Ce înseamnă martorul Check Engine, când poți continua drumul și când trebuie să oprești. Explicat simplu de ForceCar, service auto în Chișinău.",
      body: [
        {
          type: "p",
          text: "Martorul Check Engine — de obicei portocaliu, în forma unui motor — se aprinde când calculatorul mașinii detectează o problemă la motor sau la sistemele legate de el: aprindere, alimentare, senzori sau emisii.",
        },
        { type: "h2", text: "Aprins constant sau intermitent?" },
        {
          type: "ul",
          items: [
            "Aprins constant, iar mașina merge normal: problema nu este neapărat gravă, dar trebuie verificată cât mai curând.",
            "Clipește: de obicei înseamnă rateuri de aprindere, care pot deteriora catalizatorul. Redu viteza, evită accelerările bruște și programează imediat o verificare.",
            "Aprins împreună cu pierdere de putere, fum, zgomote sau temperatură mare: oprește în siguranță și nu continua drumul.",
          ],
        },
        { type: "h2", text: "Cauze frecvente" },
        {
          type: "p",
          text: "Cauzele pot fi foarte diferite: un senzor defect, o bujie sau o bobină uzată, o problemă de alimentare, o scurgere de aer sau chiar un bușon de rezervor închis incorect. Tocmai de aceea martorul, singur, nu spune ce piesă trebuie schimbată.",
        },
        { type: "h2", text: "De ce nu e suficient să ștergi eroarea" },
        {
          type: "p",
          text: "Ștergerea erorii stinge martorul, dar nu rezolvă cauza. Dacă problema rămâne, martorul se va aprinde din nou — iar între timp defecțiunea se poate agrava.",
        },
        { type: "h2", text: "Ce face diagnosticarea" },
        {
          type: "p",
          text: "La diagnosticare se citesc erorile memorate, apoi se verifică practic sistemul indicat, ca să se găsească cauza reală. La ForceCar îți explicăm rezultatul pe înțeles și îți spunem ce reparație este necesară.",
        },
      ],
    },
    ru: {
      slug: "pochemu-gorit-check-engine",
      title: "Почему загорается Check Engine и что делать?",
      description:
        "Что означает индикатор Check Engine, когда можно продолжать движение и когда нужно остановиться. Простыми словами от ForceCar, автосервиса в Кишинёве.",
      body: [
        {
          type: "p",
          text: "Индикатор Check Engine — обычно оранжевый, в виде двигателя — загорается, когда блок управления обнаруживает проблему в двигателе или связанных с ним системах: зажигании, топливоподаче, датчиках или системе выбросов.",
        },
        { type: "h2", text: "Горит постоянно или мигает?" },
        {
          type: "ul",
          items: [
            "Горит постоянно, а машина едет нормально: проблема не обязательно серьёзная, но её нужно проверить как можно скорее.",
            "Мигает: обычно это пропуски зажигания, которые могут повредить катализатор. Снизьте скорость, избегайте резких разгонов и сразу запишитесь на проверку.",
            "Горит вместе с потерей мощности, дымом, шумами или высокой температурой: безопасно остановитесь и не продолжайте движение.",
          ],
        },
        { type: "h2", text: "Частые причины" },
        {
          type: "p",
          text: "Причины бывают самыми разными: неисправный датчик, изношенная свеча или катушка зажигания, проблема с топливоподачей, подсос воздуха или даже неплотно закрытая крышка бензобака. Именно поэтому один только индикатор не говорит, какую деталь менять.",
        },
        { type: "h2", text: "Почему недостаточно просто стереть ошибку" },
        {
          type: "p",
          text: "Сброс ошибки гасит индикатор, но не устраняет причину. Если проблема осталась, индикатор загорится снова — а неисправность тем временем может усугубиться.",
        },
        { type: "h2", text: "Что даёт диагностика" },
        {
          type: "p",
          text: "При диагностике считывают сохранённые ошибки, а затем практически проверяют указанную систему, чтобы найти настоящую причину. В ForceCar мы понятно объясним результат и скажем, какой ремонт нужен.",
        },
      ],
    },
    it: {
      slug: "perche-si-accende-spia-motore",
      title: "Perché si accende la spia motore e cosa fare?",
      description:
        "Cosa significa la spia motore (Check Engine), quando puoi proseguire e quando devi fermarti. Spiegato in modo semplice da ForceCar, officina a Chișinău.",
      body: [
        {
          type: "p",
          text: "La spia motore — di solito arancione, a forma di motore — si accende quando la centralina rileva un problema al motore o agli impianti collegati: accensione, alimentazione, sensori o emissioni.",
        },
        { type: "h2", text: "Accesa fissa o lampeggiante?" },
        {
          type: "ul",
          items: [
            "Accesa fissa e l'auto va normalmente: il problema non è per forza grave, ma va controllato il prima possibile.",
            "Lampeggia: di solito indica mancate accensioni che possono danneggiare il catalizzatore. Riduci la velocità, evita accelerazioni brusche e prenota subito un controllo.",
            "Accesa insieme a perdita di potenza, fumo, rumori o temperatura elevata: fermati in sicurezza e non proseguire.",
          ],
        },
        { type: "h2", text: "Cause frequenti" },
        {
          type: "p",
          text: "Le cause possono essere molto diverse: un sensore guasto, una candela o una bobina usurata, un problema di alimentazione, un'infiltrazione d'aria o persino il tappo del serbatoio chiuso male. Proprio per questo la spia, da sola, non dice quale pezzo sostituire.",
        },
        { type: "h2", text: "Perché non basta cancellare l'errore" },
        {
          type: "p",
          text: "Cancellare l'errore spegne la spia, ma non risolve la causa. Se il problema resta, la spia si riaccenderà — e nel frattempo il guasto può peggiorare.",
        },
        { type: "h2", text: "A cosa serve la diagnosi" },
        {
          type: "p",
          text: "Con la diagnosi si leggono gli errori memorizzati e poi si controlla in pratica l'impianto indicato, per trovare la vera causa. Da ForceCar ti spieghiamo il risultato in modo chiaro e ti diciamo quale riparazione serve.",
        },
      ],
    },
    en: {
      slug: "why-check-engine-light-comes-on",
      title: "Why does the Check Engine light come on, and what should you do?",
      description:
        "What the Check Engine light means, when you can keep driving and when you should stop. Explained simply by ForceCar, a car service in Chișinău.",
      body: [
        {
          type: "p",
          text: "The Check Engine light — usually amber and shaped like an engine — comes on when the car's computer detects a problem with the engine or related systems: ignition, fuel, sensors or emissions.",
        },
        { type: "h2", text: "Steady or flashing?" },
        {
          type: "ul",
          items: [
            "Steady, and the car drives normally: the problem isn't necessarily serious, but it should be checked as soon as possible.",
            "Flashing: this usually means misfires, which can damage the catalytic converter. Slow down, avoid hard acceleration and book an inspection straight away.",
            "On together with loss of power, smoke, noises or high temperature: stop safely and don't continue driving.",
          ],
        },
        { type: "h2", text: "Common causes" },
        {
          type: "p",
          text: "The causes vary widely: a faulty sensor, a worn spark plug or coil, a fuel supply problem, an air leak or even a fuel cap that wasn't closed properly. That's exactly why the light alone doesn't tell you which part to replace.",
        },
        { type: "h2", text: "Why clearing the code isn't enough" },
        {
          type: "p",
          text: "Clearing the fault code turns the light off, but doesn't fix the cause. If the problem remains, the light will come back on — and in the meantime the fault can get worse.",
        },
        { type: "h2", text: "What diagnostics does" },
        {
          type: "p",
          text: "Diagnostics reads the stored fault codes and then physically checks the system they point to, to find the real cause. At ForceCar we explain the result in plain terms and tell you which repair is needed.",
        },
      ],
    },
  },
};

export default article;
