#!/usr/bin/env node
/**
 * Scanează public/images/forcecar/** și generează src/config/generated/image-manifest.json:
 *   - dimensiuni reale (previn CLS)
 *   - placeholder blur (base64, ~200 B)
 *   - variantă Open Graph 1200×630 JPEG (decupare "attention")
 *
 * Rulează automat înainte de `dev` și `build`. Nu modifică fotografiile originale.
 * Raportează imaginile referite în src/config/forcecar-images.ts care lipsesc
 * și fotografiile noi care nu sunt încă descrise în configurație.
 */
import sharp from "sharp";
import { readdir, readFile, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images", "forcecar");
const OG_DIR_NAME = "_og";
const OG_DIR = path.join(IMAGES_DIR, OG_DIR_NAME);
const MANIFEST = path.join(ROOT, "src", "config", "generated", "image-manifest.json");
const CONFIG = path.join(ROOT, "src", "config", "forcecar-images.ts");
const EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);
const LARGE_FILE = 1.5 * 1024 * 1024;

async function walk(dir) {
  const out = [];
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.name.startsWith(".") || e.name === OG_DIR_NAME) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (EXT.has(path.extname(e.name).toLowerCase())) out.push(full);
  }
  return out;
}

async function isFresh(target, source) {
  try {
    const [t, s] = await Promise.all([stat(target), stat(source)]);
    return t.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

const files = await walk(IMAGES_DIR);
await mkdir(OG_DIR, { recursive: true });
await mkdir(path.dirname(MANIFEST), { recursive: true });

const manifest = {};
const warnings = [];

for (const file of files.sort()) {
  const rel = path.relative(IMAGES_DIR, file).split(path.sep).join("/");
  const { size } = await stat(file);
  const image = sharp(file);
  const meta = await image.metadata();
  const width = meta.autoOrient?.width ?? meta.width;
  const height = meta.autoOrient?.height ?? meta.height;

  const blurBuffer = await sharp(file).rotate().resize(16).webp({ quality: 40 }).toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

  const ogName = rel.replace(/\//g, "--").replace(/\.[a-z]+$/i, ".jpg");
  const ogPath = path.join(OG_DIR, ogName);
  if (!(await isFresh(ogPath, file))) {
    await sharp(file)
      .rotate()
      .resize(1200, 630, { fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(ogPath);
  }

  if (size > LARGE_FILE) {
    warnings.push(`Fișier mare (${(size / 1048576).toFixed(1)} MB): ${rel} — rulează scripts/import-image.mjs pentru optimizare.`);
  }

  manifest[rel] = {
    src: `/images/forcecar/${rel}`,
    width,
    height,
    blurDataURL,
    og: `/images/forcecar/${OG_DIR_NAME}/${ogName}`,
    bytes: size,
  };
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");

// Iconițe PNG (Apple touch icon + manifest) din semnul F al logoului oficial, altfel din icon.svg.
const ICON_SVG = path.join(ROOT, "src", "app", "icon.svg");
const LOGO_PNG = path.join(IMAGES_DIR, OG_DIR_NAME, "forcecarlogo2.png");
const iconSource = (await stat(LOGO_PNG).then(() => LOGO_PNG).catch(() => null)) ?? ICON_SVG;
const iconTargets = [
  [path.join(ROOT, "src", "app", "apple-icon.png"), 180],
  [path.join(ROOT, "public", "brand", "icon-192.png"), 192],
  [path.join(ROOT, "public", "brand", "icon-512.png"), 512],
];

async function brandMark(size) {
  if (iconSource === LOGO_PNG) {
    return sharp(LOGO_PNG)
      .extract({ left: 910, top: 196, width: 290, height: 270 })
      .resize(size, size, { fit: "contain", background: { r: 11, g: 12, b: 14, alpha: 1 } })
      .flatten({ background: { r: 11, g: 12, b: 14 } })
      .ensureAlpha()
      .png()
      .toBuffer();
  }
  return sharp(ICON_SVG, { density: 72 * (size / 64) }).ensureAlpha().resize(size, size).png().toBuffer();
}

await mkdir(path.join(ROOT, "public", "brand"), { recursive: true });
for (const [target, size] of iconTargets) {
  if (await isFresh(target, iconSource)) continue;
  try {
    await sharp(await brandMark(size)).toFile(target);
  } catch (err) {
    warnings.push(`Iconița ${path.basename(target)} nu a putut fi generată: ${err.message}`);
  }
}

// favicon.ico (PNG încapsulat în ICO: 16, 32, 48 px) — browserele îl cer implicit la fiecare vizită.
const FAVICON = path.join(ROOT, "src", "app", "favicon.ico");
if (!(await isFresh(FAVICON, iconSource))) {
  try {
    const sizes = [16, 32, 48];
    const pngs = await Promise.all(sizes.map((s) => brandMark(s)));
    const header = Buffer.alloc(6 + 16 * sizes.length);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(sizes.length, 4);
    let offset = header.length;
    sizes.forEach((s, i) => {
      const e = 6 + i * 16;
      header.writeUInt8(s, e);
      header.writeUInt8(s, e + 1);
      header.writeUInt16LE(1, e + 4);
      header.writeUInt16LE(32, e + 6);
      header.writeUInt32LE(pngs[i].length, e + 8);
      header.writeUInt32LE(offset, e + 12);
      offset += pngs[i].length;
    });
    await writeFile(FAVICON, Buffer.concat([header, ...pngs]));
  } catch (err) {
    warnings.push(`favicon.ico nu a putut fi generat: ${err.message}`);
  }
}

// Verificare încrucișată cu configurația centrală.
let configSource = "";
try {
  configSource = await readFile(CONFIG, "utf8");
} catch {
  /* configurația poate lipsi la prima rulare */
}
const referenced = new Set(
  [...configSource.matchAll(/["'`]([a-z0-9-]+\/[a-z0-9./-]+\.(?:webp|jpe?g|png|avif))["'`]/gi)].map((m) => m[1]),
);
const missing = [...referenced].filter((r) => !manifest[r]);
const unreferenced = Object.keys(manifest).filter((k) => !referenced.has(k));

console.log(`[images] ${Object.keys(manifest).length} fotografii ForceCar indexate → src/config/generated/image-manifest.json`);
for (const w of warnings) console.warn(`[images] ⚠ ${w}`);
if (missing.length) {
  console.warn(`[images] ⚠ Lipsesc ${missing.length} imagini configurate (se afișează fallback controlat):`);
  for (const m of missing) console.warn(`           - public/images/forcecar/${m}`);
}
if (unreferenced.length) {
  console.log(`[images] ℹ ${unreferenced.length} fotografii noi, neconfigurate — apar automat în galerie cu text alternativ generic:`);
  for (const u of unreferenced) console.log(`           - ${u}`);
}
