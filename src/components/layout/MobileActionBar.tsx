"use client";

import Link from "next/link";
import { Bot, CalendarCheck, MessageCircle, Phone, X } from "lucide-react";
import { useRef } from "react";
import { OPEN_CHAT_EVENT } from "@/lib/chat/types";

interface Props {
  phone: { href: string; label: string } | null;
  messengers: { id: string; href: string; name: string }[];
  bookingHref: string;
  labels: { call: string; message: string; book: string; messageTitle: string; assistant: string; close: string; region: string };
}

/** Bara fixă de pe mobil: Sună (dacă există telefon) · Mesaj · Programare. */
export function MobileActionBar({ phone, messengers, bookingHref, labels }: Props) {
  const sheet = useRef<HTMLDialogElement>(null);
  const openChat = () => {
    sheet.current?.close();
    window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
  };
  const onMessage = () => (messengers.length ? sheet.current?.showModal() : openChat());

  const item = "flex flex-1 flex-col items-center justify-center gap-1 text-[0.6875rem] font-bold tracking-wide";

  return (
    <>
      <nav
        aria-label={labels.region}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/97 pb-[env(safe-area-inset-bottom)] text-white backdrop-blur lg:hidden"
      >
        <div className="flex h-[4.25rem] items-stretch gap-1.5 px-2 py-2">
          {phone && (
            <a href={phone.href} className={`${item} rounded-md hover:bg-white/8`} data-track-location="mobile_bar">
              <Phone className="size-5" aria-hidden="true" />
              {labels.call}
            </a>
          )}
          <button type="button" onClick={onMessage} className={`${item} rounded-md hover:bg-white/8`}>
            <MessageCircle className="size-5" aria-hidden="true" />
            {labels.message}
          </button>
          <Link href={bookingHref} className={`${item} flex-[1.4] rounded-md bg-brand hover:bg-brand-hover`}>
            <CalendarCheck className="size-5" aria-hidden="true" />
            {labels.book}
          </Link>
        </div>
      </nav>

      {messengers.length > 0 && (
        <dialog
          ref={sheet}
          aria-label={labels.messageTitle}
          className="m-0 mt-auto w-full max-w-none rounded-t-xl bg-white p-0 text-text backdrop:bg-black/50 lg:hidden"
          onClick={(e) => {
            if (e.target === sheet.current) sheet.current?.close();
          }}
        >
          <div className="px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-extrabold">{labels.messageTitle}</p>
              <button
                type="button"
                onClick={() => sheet.current?.close()}
                aria-label={labels.close}
                className="flex size-10 items-center justify-center rounded-md hover:bg-mist"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <ul className="grid gap-2">
              {messengers.map((m) => (
                <li key={m.id}>
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 items-center gap-3 rounded-md px-4 font-bold ring-1 ring-line hover:ring-ink-900"
                    data-track-location="mobile_sheet"
                  >
                    <MessageCircle className="size-5 text-brand" aria-hidden="true" />
                    {m.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openChat}
                  className="flex h-14 w-full items-center gap-3 rounded-md px-4 font-bold ring-1 ring-line hover:ring-ink-900"
                >
                  <Bot className="size-5 text-brand" aria-hidden="true" />
                  {labels.assistant}
                </button>
              </li>
            </ul>
          </div>
        </dialog>
      )}
    </>
  );
}
