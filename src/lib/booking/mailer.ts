/**
 * Trimiterea emailurilor — DOAR pe server. Credențialele vin din variabile de mediu.
 *
 * Moduri (în ordinea priorității):
 *  1. Gmail OAuth2  — GMAIL_OAUTH_CLIENT_ID / _SECRET / _REFRESH_TOKEN + SMTP_USER
 *  2. SMTP          — SMTP_HOST / SMTP_PORT / SMTP_SECURE / SMTP_USER / SMTP_PASS (ex. Gmail App Password)
 *  3. Outbox (dev)  — fără configurare, în development emailurile sunt salvate în .outbox/ pentru previzualizare
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer, { type Transporter } from "nodemailer";

export type MailerMode = "oauth2" | "smtp" | "outbox" | "none";

export interface MailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
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

export function getMailerMode(): MailerMode {
  if (env("GMAIL_OAUTH_CLIENT_ID") && env("GMAIL_OAUTH_CLIENT_SECRET") && env("GMAIL_OAUTH_REFRESH_TOKEN") && env("SMTP_USER")) {
    return "oauth2";
  }
  if (env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASS")) return "smtp";
  if (process.env.NODE_ENV !== "production") return "outbox";
  return "none";
}

/** Destinatarii interni. BOOKING_TO_EMAIL poate conține mai multe adrese separate prin virgulă. */
export function getBookingRecipients(): string[] {
  return (env("BOOKING_TO_EMAIL") ?? env("SMTP_USER") ?? "")
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

async function writeToOutbox(mail: OutgoingMail): Promise<void> {
  const dir = path.join(process.cwd(), ".outbox");
  await mkdir(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const slug = mail.subject.replace(/[^\p{L}\p{N}]+/gu, "-").slice(0, 60);
  const base = path.join(dir, `${stamp}-${slug}`);
  await writeFile(`${base}.html`, mail.html, "utf8");
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
  console.info(`[ForceCar] Email salvat local (dev, fără SMTP): ${base}.html`);
}

export async function sendMail(mail: OutgoingMail): Promise<void> {
  const mode = getMailerMode();
  if (mode === "none") throw new MailerNotConfiguredError();
  if (mode === "outbox") return writeToOutbox(mail);
  await getTransporter(mode).sendMail({
    from: fromAddress(),
    to: mail.to,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    replyTo: mail.replyTo,
    attachments: mail.attachments,
  });
}
