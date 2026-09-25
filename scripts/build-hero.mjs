/**
 * Generuje tło hero w stylu szablonu Syntax CV: czerń i biel, przyciemnione.
 * Źródło: cv/maciej-garnitur.png (zdjęcie z tłem). Uruchom: node scripts/build-hero.mjs
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";

const src = "cv/maciej-garnitur.png";
const out = [
  ["public/hero-bw.webp", 1254],
  ["public/hero-bw-800.webp", 800],
];

for (const [file, width] of out) {
  await sharp(src)
    .resize({ width })
    .grayscale()
    .linear(0.46, -4) // przyciemnienie jak w szablonie
    .modulate({ brightness: 1 })
    .webp({ quality: 78 })
    .toFile(file);
  const { size } = await stat(file);
  console.log(`${file}: ${(size / 1024).toFixed(1)} KB`);
}
