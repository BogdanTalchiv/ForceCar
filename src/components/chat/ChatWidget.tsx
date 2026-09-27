"use client";

import Image from "next/image";
import Link from "next/link";
import { Bot, CalendarCheck, Phone, Send, X } from "lucide-react";
import { business } from "@/config/business";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { chatLimits } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ro";
import { track } from "@/lib/analytics/track";
import { CHAT_PREFILL_KEY, type ChatAction, type ChatMessage, type ChatReply, type ChatPrefill } from "@/lib/chat/types";

export interface ChatWidgetProps {
  locale: Locale;
  labels: Dictionary["chat"];
  bookingHref: string;
  contactHref: string;
  phone: { href: string; label: string } | null;
  serviceNames: Record<string, string>;
  open: boolean;
  onClose: () => void;
}

interface UiMessage extends ChatMessage {
  id: number;
  actions?: ChatAction[];
}

let nextId = 1;

export default function ChatWidget({ locale, labels, bookingHref, contactHref, phone, serviceNames, open, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const send = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || pending || limitReached) return;
    if (trimmed.length > chatLimits.maxMessageChars) return;
    const userMessage: UiMessage = { id: nextId++, role: "user", content: trimmed };
    const history = [...messages, userMessage];
    setMessages(history);
    setText("");
    setPending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: history.slice(-chatLimits.maxHistory).map(({ role, content: c }) => ({ role, content: c })),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as ChatReply;
      if (data.limitReached) setLimitReached(true);
      setMessages((m) => [...m, { id: nextId++, role: "assistant", content: data.reply, actions: data.actions }]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: nextId++, role: "assistant", content: labels.error, actions: [{ type: "booking" }, { type: "contact" }] },
      ]);
    } finally {
      setPending(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(text);
    }
  };

  const handoff = (serviceId?: string) => {
    const description = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join("\n")
      .slice(0, 1000);
    const prefill: ChatPrefill = { serviceId, description };
    try {
      sessionStorage.setItem(CHAT_PREFILL_KEY, JSON.stringify(prefill));
    } catch {
      /* stocare indisponibilă */
    }
    track("chat_lead", { service: serviceId });
    onClose();
  };

  const renderAction = (a: ChatAction, key: number) => {
    const cls =
      "inline-flex h-10 items-center gap-2 rounded-md px-3.5 text-sm font-bold transition-colors";
    if (a.type === "booking") {
      const name = a.serviceId ? serviceNames[a.serviceId] : undefined;
      return (
        <Link
          key={key}
          href={a.serviceId ? `${bookingHref}?service=${a.serviceId}` : bookingHref}
          onClick={() => handoff(a.serviceId)}
          className={`${cls} bg-brand text-white hover:bg-brand-hover`}
        >
          <CalendarCheck className="size-4" aria-hidden="true" />
          {name ? labels.bookServiceCta.replace("{service}", name) : labels.bookCta}
        </Link>
      );
    }
    if (a.type === "call" && phone) {
      return (
        <a key={key} href={phone.href} className={`${cls} bg-ink-900 text-white hover:bg-ink-700`} data-track-location="chat">
          <Phone className="size-4" aria-hidden="true" />
          {phone.label}
        </a>
      );
    }
    if (a.type === "contact") {
      return (
        <Link key={key} href={contactHref} onClick={onClose} className={`${cls} bg-white text-text ring-1 ring-line hover:ring-ink-900`}>
          {labels.contactCta}
        </Link>
      );
    }
    return null;
  };

  const userTurns = messages.filter((m) => m.role === "user").length;
  const tooLong = text.length > chatLimits.maxMessageChars;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="fc-chat-title"
      hidden={!open}
      className="fixed inset-0 z-50 flex flex-col bg-white shadow-float lg:inset-auto lg:right-6 lg:bottom-6 lg:h-[min(40rem,calc(100dvh-3rem))] lg:w-[24rem] lg:overflow-hidden lg:rounded-xl lg:ring-1 lg:ring-black/10"
    >
      <header className="flex shrink-0 items-center gap-3 bg-ink-900 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white">
        {business.logo ? (
          <Image src={business.logo} alt="" width={2117} height={743} className="h-9 w-auto" />
        ) : (
          <span className="flex size-10 items-center justify-center rounded-full bg-brand">
            <Bot className="size-5" aria-hidden="true" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h2 id="fc-chat-title" className="truncate font-extrabold">
            {labels.name}
          </h2>
          <p className="text-xs text-steel-300">{labels.subtitle}</p>
        </div>
        <button type="button" onClick={onClose} aria-label={labels.close} className="flex size-10 items-center justify-center rounded-md hover:bg-white/10">
          <X className="size-5" aria-hidden="true" />
        </button>
      </header>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto bg-mist px-4 py-5" aria-live="polite" aria-relevant="additions">
        <Bubble role="assistant" label={labels.assistantLabel}>
          {labels.welcome}
        </Bubble>
        {messages.map((m) => (
          <div key={m.id}>
            <Bubble role={m.role} label={m.role === "user" ? labels.youLabel : labels.assistantLabel}>
              {m.content}
            </Bubble>
            {m.actions && m.actions.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{m.actions.map(renderAction)}</div>}
          </div>
        ))}
        {pending && (
          <p className="flex items-center gap-1.5 text-sm text-muted" role="status">
            <span className="sr-only">{labels.typing}</span>
            {[0, 1, 2].map((i) => (
              <span key={i} aria-hidden="true" className="size-2 rounded-full bg-steel-400" style={{ animation: `fc-dot 1.2s ${i * 0.15}s infinite` }} />
            ))}
          </p>
        )}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {labels.quick.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => void send(q)}
                className="rounded-full bg-white px-3.5 py-2 text-sm font-semibold ring-1 ring-line hover:ring-ink-900"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {(limitReached || userTurns >= chatLimits.maxUserTurns) && (
          <div className="rounded-md bg-white p-3 text-sm ring-1 ring-line">
            <p>{labels.limitReached}</p>
            <div className="mt-2 flex flex-wrap gap-2">{renderAction({ type: "booking" }, 0)}</div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(text);
        }}
        className="shrink-0 border-t border-line bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-end gap-2">
          <label htmlFor="fc-chat-input" className="sr-only">
            {labels.inputLabel}
          </label>
          <textarea
            id="fc-chat-input"
            ref={inputRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={labels.placeholder}
            disabled={limitReached}
            aria-invalid={tooLong || undefined}
            className="max-h-32 min-h-11 flex-1 resize-none rounded-md border border-line px-3 py-2.5 text-base leading-snug focus:border-ink-900 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!text.trim() || pending || tooLong || limitReached}
            aria-label={labels.send}
            className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand text-white hover:bg-brand-hover disabled:opacity-50"
          >
            <Send className="size-5" aria-hidden="true" />
          </button>
        </div>
        {tooLong && (
          <p className="mt-1.5 text-xs font-semibold text-danger">{labels.tooLong.replace("{max}", String(chatLimits.maxMessageChars))}</p>
        )}
        <p className="mt-2 text-[0.6875rem] leading-snug text-muted">{labels.disclaimer}</p>
      </form>
    </section>
  );
}

function Bubble({ role, label, children }: { role: "user" | "assistant"; label: string; children: React.ReactNode }) {
  const user = role === "user";
  return (
    <div className={`flex ${user ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-[0.9375rem] leading-relaxed whitespace-pre-line ${
          user ? "rounded-br-sm bg-ink-900 text-white" : "rounded-bl-sm bg-white text-text ring-1 ring-line"
        }`}
      >
        <span className="sr-only">{label}: </span>
        {children}
      </p>
    </div>
  );
}
