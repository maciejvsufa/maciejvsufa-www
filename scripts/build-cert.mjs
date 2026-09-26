/**
 * Certyfikat „Umiejętności Jutra: AI” (Google & SGH) ze skanu na Pulpicie → wersje na stronę.
 * Przycina pusty dół skanu, wybiela tło (normalizacja), zapisuje miniaturę i wersję pełną.
 * Uruchom: node scripts/build-cert.mjs "<ścieżka do skanu>"
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";

const src = process.argv[2] ?? "C:/Users/andro/Desktop/Certyfikat AI Umiejętności Jutra.jpg";
const meta = await sharp(src).metadata();
const crop = { left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.935) };

for (const [file, width, q] of [
  ["public/cert/umiejetnosci-jutra-ai.webp", 1600, 82],
  ["public/cert/umiejetnosci-jutra-ai-640.webp", 640, 80],
]) {
  await sharp(src).extract(crop).normalise().linear(1.08, -6).resize({ width }).webp({ quality: q }).toFile(file);
  const { size } = await stat(file);
  console.log(`${file}: ${(size / 1024).toFixed(1)} KB`);
}
