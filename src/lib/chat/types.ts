export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type ChatAction = { type: "booking"; serviceId?: string } | { type: "contact" } | { type: "call" };

export interface ChatReply {
  reply: string;
  serviceId?: string;
  actions: ChatAction[];
  mode: "ai" | "fallback";
  limitReached?: boolean;
}

/** Evenimentul global care deschide asistentul (din bara mobilă sau din alte butoane). */
export const OPEN_CHAT_EVENT = "fc:open-chat";

/** Transferul din chat în formularul de programare (sessionStorage, doar în browser). */
export const CHAT_PREFILL_KEY = "fc_chat_prefill";

export interface ChatPrefill {
  serviceId?: string;
  description?: string;
}
