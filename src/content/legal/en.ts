import type { LegalContent } from "./types";

const en: LegalContent = {
  updatedLabel: "Last updated",
  privacy: {
    intro:
      "This policy explains what personal data the ForceCar website collects, why we use it and what rights you have. We only use the data we need to respond to you.",
    sections: [
      {
        h: "Who we are",
        p: [
          "The data controller is {controller}, a car service in Chișinău, Republic of Moldova. For questions about your personal data you can contact us {contact}.",
        ],
      },
      {
        h: "What data we collect",
        ul: [
          "Through the booking form: your name, phone, email (optional), preferred contact method, car details (make, model, year and, optionally, mileage and plate number), a description of the problem, your preferred date and time and any attached photos (optional).",
          "Technical information about the request: the page it was sent from, the site language and, if you arrived from a campaign, the campaign parameters (UTM).",
          "Through the virtual assistant: the messages you write in the chat.",
          "Cookies and similar technologies — described in the Cookie policy.",
        ],
      },
      {
        h: "Why we use the data",
        ul: [
          "to respond to your booking request and contact you to confirm the day and time;",
          "to prepare for your visit (for example from the description and photos);",
          "to understand which channels requests come from (UTM parameters);",
          "to improve the website with usage statistics — only with your consent;",
          "to protect the website against abuse (for example, limiting repeated requests).",
        ],
      },
      {
        h: "Legal basis",
        p: [
          "We process data based on your consent (given in the form or for cookies), in order to act on your request before any work is carried out, and on our legitimate interest in keeping the website secure, in accordance with the personal data protection legislation of the Republic of Moldova.",
        ],
      },
      {
        h: "How data is sent and stored",
        ul: [
          "Booking requests are sent to ForceCar by email. The website does not store requests in a database.",
          "Attached photos are sent only as an attachment to the internal email and are not saved on the website's server.",
          "Conversations with the virtual assistant are not saved by the website. If the assistant uses an artificial intelligence service, messages are sent to it only to generate the reply.",
          "ForceCar keeps the data only as long as needed to respond to the request and for its service records.",
        ],
      },
      {
        h: "Who we share data with",
        p: [
          "Data may be processed by the website's technical providers: hosting, the email service and, if enabled, the assistant's artificial intelligence service and analytics or marketing tools (only with your consent). We do not sell personal data.",
        ],
      },
      {
        h: "Your rights",
        ul: [
          "to know what data we hold about you and receive a copy;",
          "to ask for it to be corrected or deleted;",
          "to object to processing or withdraw your consent at any time;",
          "to lodge a complaint with the National Center for Personal Data Protection of the Republic of Moldova.",
        ],
      },
      {
        h: "Security",
        p: [
          "The website uses an encrypted connection (HTTPS) and the form is protected against automated and abusive submissions. Access to requests is limited to the ForceCar team.",
        ],
      },
      {
        h: "Changes",
        p: ["We may update this policy. The date of the last update is shown above."],
      },
    ],
  },
  cookies: {
    intro:
      "Cookies are small files saved by your browser. We only use them as far as necessary: some are essential for the website to work, the others are enabled only with your consent.",
    sections: [
      {
        h: "Necessary cookies",
        p: [
          "They remember your chosen language and your cookie preferences. They can't be switched off, because the website wouldn't work properly without them.",
        ],
      },
      {
        h: "Analytics and marketing cookies",
        p: [
          "These are enabled only with your consent. They help us understand how the website is used and measure how well campaigns work. You can refuse them and the website will work just as well.",
        ],
      },
      {
        h: "External content loaded on request",
        p: [
          "YouTube videos and the Google Maps map don't load automatically. They load only after you click them; at that point those providers may set their own cookies.",
        ],
      },
    ],
    tableTitle: "What we use on this website",
    columns: { name: "Name", purpose: "Purpose", duration: "Duration", category: "Category" },
    categories: { necessary: "Necessary", analytics: "Analytics", marketing: "Marketing", external: "External, on request" },
    rows: {
      locale: { purpose: "Remembers the language you chose.", duration: "1 year" },
      consent: { purpose: "Remembers your cookie preferences.", duration: "6 months" },
      bookingDraft: {
        purpose: "Temporarily keeps what you've entered in the booking form if you reload the page.",
        duration: "Until the tab is closed",
      },
      utm: {
        purpose: "Remembers the campaign you came from, to attach it to your booking request.",
        duration: "Until the tab is closed; 30 days only with analytics consent",
      },
      ga: { purpose: "Google Analytics — website usage statistics.", duration: "Up to 2 years" },
      ads: { purpose: "Google Ads — measuring ad conversions.", duration: "Up to 90 days" },
      meta: { purpose: "Meta Pixel — measuring Facebook/Instagram ads.", duration: "Up to 90 days" },
      youtube: { purpose: "YouTube (youtube-nocookie.com) — playing video reviews.", duration: "Set by YouTube" },
      maps: { purpose: "Google Maps — showing the map on the contact page.", duration: "Set by Google" },
    },
    manage: {
      h: "How to change your preferences",
      p: [
        "You can change your choice at any time from the “Cookie settings” link in the footer. You can also delete cookies in your browser settings.",
      ],
    },
  },
};

export default en;
