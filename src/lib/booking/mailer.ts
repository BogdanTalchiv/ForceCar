/**
 * Trimiterea emailurilor — DOAR pe server.
 *
 * 1. Gmail OAuth2 / SMTP — dacă SMTP_PASS (sau OAuth) este setat
 * 2. FormSubmit — implicit: doar BOOKING_TO_EMAIL, fără parolă; HTML ForceCar + logo atașate
 * 3. Outbox — development, dacă lipsește destinația
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer, { type Transporter } from "nodemailer";
import { business } from "@/config/business";
import { siteConfig } from "@/config/site";
import { EMAIL_LOGO_CID } from "@/lib/booking/emails";

export type MailerMode = "oauth2" | "smtp" | "formsubmit" | "outbox" | "none";

export interface MailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
  cid?: string;
  contentDisposition?: "inline" | "attachment";
}

export interface OutgoingMail {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}

export class MailerNotConfiguredError extends Error {
  constructor() {
    super("Email delivery is not configured");
    this.name = "MailerNotConfiguredError";
  }
}

const env = (key: string) => process.env[key]?.trim() || undefined;
const LOGO_FILE = path.join(process.cwd(), "public/images/forcecar/_og/forcecarlogo2.png");

export function getMailerMode(): MailerMode {
  if (env("GMAIL_OAUTH_CLIENT_ID") && env("GMAIL_OAUTH_CLIENT_SECRET") && env("GMAIL_OAUTH_REFRESH_TOKEN") && env("SMTP_USER")) {
    return "oauth2";
  }
  if (env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASS")) return "smtp";
  if (getBookingRecipients().length > 0) return "formsubmit";
  if (process.env.NODE_ENV !== "production") return "outbox";
  return "none";
}

/** Destinatarii interni. BOOKING_TO_EMAIL poate conține mai multe adrese separate prin virgulă. */
export function getBookingRecipients(): string[] {
  return (env("BOOKING_TO_EMAIL") ?? business.email ?? env("SMTP_USER") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function fromAddress(): string {
  return env("MAIL_FROM") ?? `ForceCar <${env("SMTP_USER") ?? "no-reply@localhost"}>`;
}

let transporter: Transporter | null = null;

function getTransporter(mode: "oauth2" | "smtp"): Transporter {
  if (transporter) return transporter;
  if (mode === "oauth2") {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env("SMTP_USER"),
        clientId: env("GMAIL_OAUTH_CLIENT_ID"),
        clientSecret: env("GMAIL_OAUTH_CLIENT_SECRET"),
        refreshToken: env("GMAIL_OAUTH_REFRESH_TOKEN"),
      },
    });
  } else {
    const port = Number(env("SMTP_PORT") ?? 465);
    transporter = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port,
      secure: env("SMTP_SECURE") ? env("SMTP_SECURE") === "true" : port === 465,
      auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return transporter;
}

async function logoInline(): Promise<MailAttachment | null> {
  try {
    const content = await readFile(LOGO_FILE);
    return {
      filename: "forcecar-logo.png",
      content,
      contentType: "image/png",
      cid: EMAIL_LOGO_CID,
      contentDisposition: "inline",
    };
  } catch {
    return null;
  }
}

function withPreviewLogo(html: string, logo: MailAttachment | null): string {
  if (!logo) return html;
  return html.split(`cid:${EMAIL_LOGO_CID}`).join(`data:image/png;base64,${logo.content.toString("base64")}`);
}

async function writeToOutbox(mail: OutgoingMail, logo: MailAttachment | null): Promise<void> {
  const dir = path.join(process.cwd(), ".outbox");
  await mkdir(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const slug = mail.subject.replace(/[^\p{L}\p{N}]+/gu, "-").slice(0, 60);
  const base = path.join(dir, `${stamp}-${slug}`);
  await writeFile(`${base}.html`, withPreviewLogo(mail.html, logo), "utf8");
  await writeFile(
    `${base}.json`,
    JSON.stringify(
      {
        to: mail.to,
        replyTo: mail.replyTo,
        subject: mail.subject,
        attachments: mail.attachments?.map((a) => ({ filename: a.filename, contentType: a.contentType, bytes: a.content.length })),
        text: mail.text,
      },
      null,
      2,
    ),
    "utf8",
  );
  console.info(`[ForceCar] Email salvat local (dev, fără SMTP_PASS): ${base}.html`);
}

const FORMSUBMIT_MAX = 9 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function labeledFields(text: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const used = new Set<string>();
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const idx = t.indexOf(": ");
    if (idx < 1 || idx > 40) continue;
    const base = t.slice(0, idx).replace(/^_+/, "").slice(0, 40);
    if (!base) continue;
    let key = base;
    let n = 2;
    while (used.has(key.toLowerCase())) key = `${base} (${n++})`;
    used.add(key.toLowerCase());
    fields[key] = t.slice(idx + 2).slice(0, 4000);
  }
  return fields;
}

function listedAddresses(to: OutgoingMail["to"]): string[] {
  return (Array.isArray(to) ? to : [to]).map((s) => s.trim()).filter(Boolean);
}

function guestEmailOf(mail: OutgoingMail, inbox: string): string | undefined {
  if (mail.replyTo && EMAIL_RE.test(mail.replyTo)) return mail.replyTo;
  const listed = listedAddresses(mail.to);
  return listed.find((addr) => addr.toLowerCase() !== inbox.toLowerCase() && EMAIL_RE.test(addr)) ?? listed.find((addr) => EMAIL_RE.test(addr));
}

function isFileRejection(message: string): boolean {
  return /file|upload|extension|attach|mime|10\s*mb|too large|not allowed|invalid type/i.test(message);
}

function asBlob(content: Buffer | string, type: string): Blob {
  return typeof content === "string" ? new Blob([content], { type }) : new Blob([new Uint8Array(content)], { type });
}

type FormSubmitResult = { ok: boolean; activating: boolean; message: string };

async function postFormSubmit(url: string, origin: string, fd: FormData): Promise<FormSubmitResult> {
  const res = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", Origin: origin, Referer: `${origin}/` },
    body: fd,
    signal: AbortSignal.timeout(45_000),
  });
  const raw = await res.text();
  let parsed: { success?: string | boolean; message?: string } = {};
  try {
    parsed = JSON.parse(raw) as { success?: string | boolean; message?: string };
  } catch {
    parsed = {};
  }
  const activating = /activat/i.test(parsed.message ?? raw);
  const ok = activating || (res.ok && parsed.success !== false && parsed.success !== "false");
  return { ok, activating, message: parsed.message || `FormSubmit ${res.status}: ${raw.slice(0, 180)}` };
}

function formSubmitPayload(
  mail: OutgoingMail,
  inbox: string,
  files: { html?: string; logo?: MailAttachment | null; extras?: MailAttachment[] },
): FormData {
  const fd = new FormData();
  const guest = guestEmailOf(mail, inbox);
  const cc = listedAddresses(mail.to).filter((addr) => addr.toLowerCase() !== inbox.toLowerCase() && EMAIL_RE.test(addr));
  fd.set("_subject", mail.subject);
  fd.set("_template", "box");
  fd.set("_captcha", "false");
  if (guest) {
    fd.set("email", guest);
    fd.set("_replyto", guest);
  }
  if (cc.length) fd.set("_cc", cc.join(","));
  const fields = labeledFields(mail.text);
  for (const [key, value] of Object.entries(fields)) {
    if (key.toLowerCase() === "email") continue;
    fd.set(key, value);
  }
  if (fields.Nume && !fd.has("name")) fd.set("name", fields.Nume);
  if (!fd.has("name")) fd.set("name", "ForceCar");
  fd.set("Mesaj", mail.text.slice(0, 8000));
  if (files.html) fd.append("email_html", asBlob(files.html, "text/html;charset=utf-8"), "ForceCar.html");
  if (files.logo) fd.append("logo", asBlob(files.logo.content, "image/png"), "forcecar-logo.png");
  for (const [i, file] of (files.extras ?? []).entries()) {
    fd.append(`fisier_${i + 1}`, asBlob(file.content, file.contentType), file.filename);
  }
  return fd;
}

async function sendViaFormSubmit(mail: OutgoingMail, logo: MailAttachment | null): Promise<void> {
  const inbox = getBookingRecipients()[0];
  if (!inbox || !EMAIL_RE.test(inbox)) throw new MailerNotConfiguredError();
  const origin = siteConfig.url || "http://localhost:3000";
  // FormSubmit identifică formularul după adresa din URL. Nu encode-ui `@` — altfel e alt formular, neactivat.
  const url = `https://formsubmit.co/ajax/${inbox}`;
  const brandedHtml = withPreviewLogo(mail.html, logo);
  const extras = (mail.attachments ?? []).filter((a) => a.cid !== EMAIL_LOGO_CID);
  const htmlBytes = Buffer.byteLength(brandedHtml, "utf8");
  const logoBytes = logo?.content.length ?? 0;
  const extraBytes = extras.reduce((n, a) => n + a.content.length, 0);
  const extrasFit = extraBytes + logoBytes + htmlBytes <= FORMSUBMIT_MAX;
  const payloadMail =
    extrasFit || extras.length === 0
      ? mail
      : { ...mail, text: `${mail.text}\n\n(Fotografiile nu au putut fi atașate — fișierele sunt prea mari.)` };

  let result = await postFormSubmit(
    url,
    origin,
    formSubmitPayload(payloadMail, inbox, { html: brandedHtml, logo, extras: extrasFit ? extras : [] }),
  );
  if (!result.ok && isFileRejection(result.message)) {
    result = await postFormSubmit(url, origin, formSubmitPayload(payloadMail, inbox, {}));
  }
  if (!result.ok) throw new Error(result.message);
  const cc = listedAddresses(mail.to).filter((addr) => addr.toLowerCase() !== inbox.toLowerCase());
  if (result.activating) {
    console.info(`[ForceCar] FormSubmit: deschide inboxul ${inbox} și apasă „Activate Form” (doar prima dată).`);
  } else {
    console.info(`[ForceCar] Cerere trimisă prin FormSubmit către ${inbox}${cc.length ? ` (copie: ${cc.join(", ")})` : ""}.`);
  }
}

export async function sendMail(mail: OutgoingMail): Promise<void> {
  const mode = getMailerMode();
  if (mode === "none") throw new MailerNotConfiguredError();
  const logo = await logoInline();
  if (mode === "outbox") return writeToOutbox(mail, logo);
  if (mode === "formsubmit") return sendViaFormSubmit(mail, logo);

  const attachments = [
    ...(logo ? [logo] : []),
    ...(mail.attachments ?? []).filter((a) => a.cid !== EMAIL_LOGO_CID),
  ].map((a) => ({
    filename: a.filename,
    content: a.content,
    contentType: a.contentType,
    cid: a.cid,
    contentDisposition: a.contentDisposition ?? (a.cid ? "inline" : "attachment"),
  }));

  await getTransporter(mode).sendMail({
    from: fromAddress(),
    to: mail.to,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    replyTo: mail.replyTo,
    attachments,
  });
}
