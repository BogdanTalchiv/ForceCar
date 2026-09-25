#!/usr/bin/env node
/**
 * Importă o fotografie brută (JPG/PNG/HEIC convertit etc.) în structura ForceCar:
 *   - convertește în WebP de înaltă calitate (master pentru next/image)
 *   - limitează lățimea la 2560px
 *   - elimină metadatele EXIF (inclusiv GPS)
 *
 * Utilizare:
 *   node scripts/import-image.mjs <fisier-sursa> <cale-destinatie-relativa>
 *   node scripts/import-image.mjs "C:\poze\IMG_8328.jpg" brakes/reparatie-frane-forcecar-chisinau.webp
 *
 * Destinația este relativă la public/images/forcecar/.
 * După import rulează `npm run images` și adaugă imaginea în src/config/forcecar-images.ts.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DEST_ROOT = path.join(ROOT, "public", "images", "forcecar");
const MAX_WIDTH = 2560;

const [, , src, dest] = process.argv;

if (!src || !dest) {
  console.error("Utilizare: node scripts/import-image.mjs <sursa> <destinatie.webp>");
  process.exit(1);
}

if (!/^[a-z0-9/-]+\.webp$/.test(dest)) {
  console.error("Destinația trebuie să fie de forma categorie/nume-descriptiv.webp (litere mici, cifre, cratime).");
  process.exit(1);
}

const out = path.join(DEST_ROOT, dest);
await mkdir(path.dirname(out), { recursive: true });

const info = await sharp(src)
  .rotate()
  .resize({ width: MAX_WIDTH, withoutEnlargement: true })
  .webp({ quality: 90, effort: 6, smartSubsample: true })
  .toFile(out);

console.log(`✔ ${dest} — ${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
