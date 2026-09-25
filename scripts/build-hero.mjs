/**
 * Warstwy hero w stylu szablonu Syntax CV (czerń i biel):
 *  - hero-bg.webp  — tło: zdjęcie z garnituru mocno rozmyte i przyciemnione (sam nastrój),
 *  - hero-fig*.webp — postać: wycinanka (przezroczyste tło), stoi przy prawej krawędzi ekranu,
 *    więc przy przewijaniu wizerunek zostaje widoczny obok czarnego panelu.
 * Uruchom: node scripts/build-hero.mjs
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";

await sharp("cv/maciej-garnitur.png")
  .resize({ width: 640 })
  .blur(28)
  .grayscale()
  .linear(0.38, -4)
  .webp({ quality: 70 })
  .toFile("public/hero-bg.webp");

for (const [file, width] of [
  ["public/hero-fig.webp", 800],
  ["public/hero-fig-480.webp", 480],
]) {
  await sharp("public/portrait-cutout.webp")
    .resize({ width })
    .grayscale()
    .linear(0.82, 0)
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(file);
}

for (const f of ["public/hero-bg.webp", "public/hero-fig.webp", "public/hero-fig-480.webp"]) {
  const { size } = await stat(f);
  console.log(`${f}: ${(size / 1024).toFixed(1)} KB`);
}
