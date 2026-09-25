"use client";

import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { track } from "@/lib/analytics/track";
import { OPEN_CHAT_EVENT } from "@/lib/chat/types";
import type { ChatWidgetProps } from "./ChatWidget";

/** Widgetul complet se descarcă doar la prima deschidere (nu încetinește încărcarea paginii). */
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });
const preload = () => void import("./ChatWidget");

export type ChatLauncherProps = Omit<ChatWidgetProps, "open" | "onClose">;

export function ChatLauncher(props: ChatLauncherProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const show = useCallback(() => {
    setLoaded(true);
    setOpen(true);
    track("chat_open", { locale: props.locale satisfies Locale });
  }, [props.locale]);

  useEffect(() => {
    window.addEventListener(OPEN_CHAT_EVENT, show);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, show);
  }, [show]);

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={show}
          onPointerEnter={preload}
          onFocus={preload}
          aria-label={props.labels.open}
          className="fixed right-6 bottom-6 z-40 hidden h-14 items-center gap-2.5 rounded-full bg-ink-900 pr-5 pl-4 font-bold text-white shadow-float ring-1 ring-white/10 transition-transform hover:-translate-y-0.5 lg:flex"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-brand">
            <MessageCircle className="size-[1.125rem]" aria-hidden="true" />
          </span>
          {props.labels.launcher}
        </button>
      )}
      {loaded && <ChatWidget {...props} open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
