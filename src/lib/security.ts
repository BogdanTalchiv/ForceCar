/** Escapare HTML pentru orice text introdus de utilizator și inserat în emailuri. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Elimină CR/LF și caracterele de control — previne injecția în antetele emailului (Subject, Reply-To). */
export function singleLine(value: string, max = 200): string {
  return value
    .replace(/[\r\n\u2028\u2029]+/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** Text multi-linie: păstrează rândurile noi, elimină restul caracterelor de control. */
export function multiLine(value: string, max: number): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim()
    .slice(0, max);
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

/** Acceptă doar cereri de pe același site (protecție CSRF simplă pentru API-urile publice). */
export function isSameOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  if (!origin) return true;
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
