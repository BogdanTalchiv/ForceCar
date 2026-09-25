import type { Localized } from "@/i18n/config";

interface CustomerEmailCopy {
  subject: string;
  greeting: string;
  intro: string;
  notConfirmed: string;
  summaryTitle: string;
  reference: string;
  car: string;
  service: string;
  date: string;
  time: string;
  photos: string;
  contactTitle: string;
  phone: string;
  email: string;
  footer: string;
}

export const customerEmailCopy: Localized<CustomerEmailCopy> = {
  ro: {
    subject: "Am primit cererea ta de programare — ForceCar",
    greeting: "Bună, {name}!",
    intro: "Îți mulțumim! Am primit cererea ta de programare la ForceCar.",
    notConfirmed:
      "Aceasta nu este încă o programare confirmată. Echipa ForceCar te va contacta pentru confirmarea zilei și a orei.",
    summaryTitle: "Rezumatul cererii",
    reference: "Număr cerere",
    car: "Mașina",
    service: "Serviciu",
    date: "Data preferată",
    time: "Intervalul preferat",
    photos: "Fotografii atașate",
    contactTitle: "Date de contact ForceCar",
    phone: "Telefon",
    email: "Email",
    footer:
      "Ai primit acest email pentru că ai trimis o cerere pe site-ul ForceCar. Dacă nu ai trimis-o tu, poți ignora acest mesaj.",
  },
  ru: {
    subject: "Мы получили вашу заявку на запись — ForceCar",
    greeting: "Здравствуйте, {name}!",
    intro: "Спасибо! Мы получили вашу заявку на запись в ForceCar.",
    notConfirmed: "Это ещё не подтверждённая запись. Команда ForceCar свяжется с вами, чтобы подтвердить день и время.",
    summaryTitle: "Ваша заявка",
    reference: "Номер заявки",
    car: "Автомобиль",
    service: "Услуга",
    date: "Желаемая дата",
    time: "Желаемое время",
    photos: "Прикреплённые фото",
    contactTitle: "Контакты ForceCar",
    phone: "Телефон",
    email: "Email",
    footer:
      "Вы получили это письмо, потому что отправили заявку на сайте ForceCar. Если это были не вы, просто проигнорируйте его.",
  },
  it: {
    subject: "Abbiamo ricevuto la tua richiesta di prenotazione — ForceCar",
    greeting: "Ciao {name}!",
    intro: "Grazie! Abbiamo ricevuto la tua richiesta di prenotazione presso ForceCar.",
    notConfirmed:
      "Questa non è ancora una prenotazione confermata. Il team ForceCar ti contatterà per confermare giorno e ora.",
    summaryTitle: "Riepilogo della richiesta",
    reference: "Numero richiesta",
    car: "Auto",
    service: "Servizio",
    date: "Data preferita",
    time: "Fascia oraria preferita",
    photos: "Foto allegate",
    contactTitle: "Contatti ForceCar",
    phone: "Telefono",
    email: "Email",
    footer:
      "Hai ricevuto questa email perché hai inviato una richiesta sul sito ForceCar. Se non sei stato tu, puoi ignorare questo messaggio.",
  },
  en: {
    subject: "We've received your booking request — ForceCar",
    greeting: "Hello {name},",
    intro: "Thank you! We've received your booking request at ForceCar.",
    notConfirmed:
      "This is not yet a confirmed appointment. The ForceCar team will contact you to confirm the day and time.",
    summaryTitle: "Request summary",
    reference: "Request number",
    car: "Car",
    service: "Service",
    date: "Preferred date",
    time: "Preferred time",
    photos: "Attached photos",
    contactTitle: "ForceCar contact details",
    phone: "Phone",
    email: "Email",
    footer:
      "You received this email because you sent a request on the ForceCar website. If it wasn't you, you can ignore this message.",
  },
};
