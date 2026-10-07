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

type FormSubmitResult = { ok: boolean; activating: boolean; message: string };

async function postFormSubmit(url: string, origin: string, fd: FormData): Promise<FormSubmitResult> {
  const res = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", Origin: origin, Referer: `${origin}/` },
    body: fd,
    signal: AbortSignal.timeout(20_000),
  });
  const raw = await res.text();
  let parsed: { success?: string | boolean; message?: string } = {};
  try {
    parsed = JSON.parse(raw) as { success?: string | boolean; message?: string };
  } catch {
    parsed = {};
  }
  const activating = /activat/i.test(parsed.message ?? "");
  const ok = activating || (res.ok && parsed.success !== false && parsed.success !== "false");
  return { ok, activating, message: parsed.message || `FormSubmit ${res.status}: ${raw.slice(0, 180)}` };
}

function formSubmitBase(mail: OutgoingMail, cc: string[]): FormData {
  const fd = new FormData();
  fd.set("_subject", mail.subject);
  fd.set("_template", "box");
  fd.set("_captcha", "false");
  if (mail.replyTo) fd.set("_replyto", mail.replyTo);
  if (cc.length) fd.set("_cc", cc.join(","));
  const fields = labeledFields(mail.text);
  const keys = Object.keys(fields);
  if (keys.length) {
    for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  } else {
    fd.set("Mesaj", mail.text);
  }
  return fd;
}

async function sendViaFormSubmit(mail: OutgoingMail, logo: MailAttachment | null): Promise<void> {
  const inbox = getBookingRecipients()[0];
  if (!inbox) throw new MailerNotConfiguredError();
  const listed = (Array.isArray(mail.to) ? mail.to : [mail.to]).map((s) => s.trim()).filter(Boolean);
  const cc = listed.filter((addr) => addr.toLowerCase() !== inbox.toLowerCase());
  const origin = siteConfig.url || "http://localhost:3000";
  const url = `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`;
  const brandedHtml = withPreviewLogo(mail.html, logo);
  const extraFiles = (mail.attachments ?? []).filter((a) => a.cid !== EMAIL_LOGO_CID);
  const extraBytes = extraFiles.reduce((n, a) => n + a.content.length, 0);
  const logoBytes = logo?.content.length ?? 0;
  const htmlBytes = Buffer.byteLength(brandedHtml, "utf8");
  const sendExtras = extraBytes + logoBytes + htmlBytes <= FORMSUBMIT_MAX;

  const withFiles = (includeHtml: boolean, includeLogo: boolean, includeExtras: boolean) => {
    const fd = formSubmitBase(mail, cc);
    if (includeHtml) {
      fd.append("email_html", new Blob([brandedHtml], { type: "text/html;charset=utf-8" }), "ForceCar.html");
    }
    if (includeLogo && logo) {
      fd.append("logo", new Blob([new Uint8Array(logo.content)], { type: "image/png" }), "forcecar-logo.png");
    }
    if (includeExtras && sendExtras) {
      for (const [i, file] of extraFiles.entries()) {
        fd.append(`fisier_${i + 1}`, new Blob([new Uint8Array(file.content)], { type: file.contentType }), file.filename);
      }
    } else if (includeExtras && extraFiles.length) {
      fd.set("Fotografii", "Nu au putut fi atașate — fișierele sunt prea mari.");
    }
    return fd;
  };

  let result = await postFormSubmit(url, origin, withFiles(true, true, true));
  if (!result.ok) {
    result = await postFormSubmit(url, origin, withFiles(false, true, true));
  }
  if (!result.ok) {
    result = await postFormSubmit(url, origin, withFiles(false, false, false));
  }
  if (!result.ok) {
    throw new Error(result.message);
  }
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
