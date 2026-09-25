#!/usr/bin/env node
/**
 * Test rapid pe un server pornit (`npm run build && npm start`):
 *   node scripts/smoke.mjs [baseUrl]
 * Verifică statusurile paginilor, antetele de securitate, SEO de bază și API-urile.
 */
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
let failures = 0;

function check(label, ok, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "✓" : "✗"} ${label}${detail ? ` — ${detail}` : ""}`);
}

async function get(path, init) {
  return fetch(`${BASE}${path}`, { redirect: "manual", ...init });
}

// Pagini
const pages = [
  "/ro", "/ru", "/it", "/en",
  "/ro/servicii", "/ro/programare", "/ro/contact", "/ro/intrebari-frecvente", "/ro/despre-noi", "/ro/lucrari", "/ro/sfaturi-auto",
  "/ro/politica-de-confidentialitate", "/ro/politica-cookie", "/ru/uslugi", "/en/services", "/it/servizi",
  "/ro/servicii/diagnostica-auto-chisinau", "/en/car-advice/when-to-replace-timing-belt",
];
for (const p of pages) {
  const res = await get(p);
  const html = await res.text();
  check(`GET ${p}`, res.status === 200, String(res.status));
  if (res.status === 200) {
    check(`  canonical ${p}`, html.includes(`rel="canonical"`));
    check(`  hreflang x-default ${p}`, html.includes(`hrefLang="x-default"`) || html.includes(`hreflang="x-default"`));
    check(`  JSON-LD ${p}`, html.includes("application/ld+json"));
    check(`  un singur <h1> ${p}`, (html.match(/<h1[\s>]/g) ?? []).length === 1, String((html.match(/<h1[\s>]/g) ?? []).length));
  }
}

const home = await get("/ro");
for (const h of ["content-security-policy", "x-content-type-options", "referrer-policy", "strict-transport-security", "permissions-policy", "x-frame-options"]) {
  check(`antet ${h}`, home.headers.has(h));
}

const root = await get("/");
check("/ → redirect", [307, 308].includes(root.status), `${root.status} ${root.headers.get("location")}`);

for (const p of ["/ro/nu-exista", "/ro/servicii/nu-exista", "/xx", "/ro/a/b/c"]) {
  const res = await get(p);
  const html = await res.text();
  check(`404 ${p}`, res.status === 404, String(res.status));
  check(`  noindex ${p}`, /noindex/.test(html));
}
const dev = await get("/ro/dev");
check("/ro/dev ascuns în producție", dev.status === 404, String(dev.status));

for (const p of ["/robots.txt", "/sitemap.xml", "/manifest.webmanifest", "/icon.svg"]) {
  const res = await get(p);
  check(`GET ${p}`, res.status === 200, String(res.status));
}

// API chat
const chat = await get("/api/chat", {
  method: "POST",
  headers: { "content-type": "application/json", origin: BASE },
  body: JSON.stringify({ locale: "ro", messages: [{ role: "user", content: "Cât costă plăcuțele de frână?" }] }),
});
const chatJson = await chat.json().catch(() => null);
check("POST /api/chat", chat.status === 200 && typeof chatJson?.reply === "string", `${chat.status} ${chatJson?.mode}`);
const chatForeign = await get("/api/chat", {
  method: "POST",
  headers: { "content-type": "application/json", origin: "https://evil.example" },
  body: "{}",
});
check("POST /api/chat altă origine → 403", chatForeign.status === 403, String(chatForeign.status));
const chatBad = await get("/api/chat", { method: "POST", headers: { "content-type": "application/json", origin: BASE }, body: "not json" });
check("POST /api/chat JSON invalid → 400", chatBad.status === 400, String(chatBad.status));

// API booking — validare (nu trimite email)
const bad = new FormData();
bad.set("locale", "ro");
bad.set("name", "X");
const booking = await get("/api/booking", { method: "POST", body: bad, headers: { accept: "application/json", origin: BASE } });
const bookingJson = await booking.json().catch(() => null);
check("POST /api/booking invalid → 400 + câmpuri", booking.status === 400 && bookingJson?.fields?.phone, `${booking.status}`);
const trap = new FormData();
trap.set("website", "spam");
const honeypot = await get("/api/booking", { method: "POST", body: trap, headers: { accept: "application/json", origin: BASE } });
check("POST /api/booking honeypot → succes fals", honeypot.status === 200, String(honeypot.status));
const noJs = await get("/api/booking", { method: "POST", body: bad, headers: { origin: BASE } });
check("POST /api/booking fără JS → 303", noJs.status === 303, `${noJs.status} ${noJs.headers.get("location")}`);

console.log(failures ? `\n${failures} verificări eșuate` : "\nToate verificările au trecut");
process.exit(failures ? 1 : 0);
