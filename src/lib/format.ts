/** Înlocuiește `{cheie}` cu valorile date. Cheile lipsă rămân neschimbate. */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

/** Formatează un număr E.164 moldovenesc: +37369123456 → +373 69 123 456 */
export function formatPhone(e164: string): string {
  const digits = e164.replace(/[^\d+]/g, "");
  const md = digits.match(/^\+373(\d{2})(\d{3})(\d{3})$/);
  if (md) return `+373 ${md[1]} ${md[2]} ${md[3]}`;
  return digits;
}

export function telHref(e164: string): string {
  return `tel:${e164.replace(/[^\d+]/g, "")}`;
}

/** Listează elemente în limba dată: „a, b și c”. */
export function listFormat(items: string[], locale: string): string {
  try {
    return new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(items);
  } catch {
    return items.join(", ");
  }
}

export function lowerFirst(text: string, locale: string): string {
  if (!text) return text;
  return text.charAt(0).toLocaleLowerCase(locale) + text.slice(1);
}
