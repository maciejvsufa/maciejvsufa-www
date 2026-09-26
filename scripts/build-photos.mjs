/**
 * Zdjęcia strony ze źródeł w photos-src/ → webp w public/photos/.
 *  - hero-portret*: „elegancja uśmiech 2” — pionowy panel przy prawej krawędzi pierwszego ekranu
 *  - plener*: „plener 1” — zdjęcie w scenie „O mnie”
 * Uruchom: node scripts/build-photos.mjs
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

await mkdir("public/photos", { recursive: true });
const jobs = [
  ["photos-src/elegancja-usmiech-2.jpg", "public/photos/hero-portret.webp", 1000, 84],
  ["photos-src/elegancja-usmiech-2.jpg", "public/photos/hero-portret-640.webp", 640, 80],
  ["photos-src/plener-1.jpg", "public/photos/plener.webp", 900, 82],
  ["photos-src/plener-1.jpg", "public/photos/plener-480.webp", 480, 80],
];
for (const [src, out, width, q] of jobs) {
  await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: q }).toFile(out);
  const { size } = await stat(out);
  console.log(`${out}: ${(size / 1024).toFixed(1)} KB`);
}
