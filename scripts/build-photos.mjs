/**
 * Zdjęcia strony → webp w public/photos/.
 * Źródło: photos-src/kolaz-2026-09-27.png (kolaż 4 zdjęć od Macieja, 1536×1024) — wycinamy
 * każde zdjęcie po białych odstępach (kolumny 598–603 i 1096–1101, w prawej kolumnie wiersz 565–569).
 *  - hero-portret  — 1: uśmiech, marynarka, kontakt wzrokowy → pierwszy ekran
 *  - dosw-portret  — 2: zamyślony, marynarka → „Doświadczenie”
 *  - osobiste      — 3: biały sweter, zachód słońca → „O mnie”
 *  - plener-luz    — 4: czapka i kurtka w plenerze → „Co robię”
 * Uruchom: node scripts/build-photos.mjs
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const SRC = "photos-src/kolaz-2026-09-27.png";
const E = 2; // margines od białego odstępu
const crops = {
  "hero-portret": { left: 0, top: 0, width: 598 - E, height: 1024 },
  "dosw-portret": { left: 604 + E, top: 0, width: 1096 - 604 - 2 * E, height: 1024 },
  osobiste: { left: 1102 + E, top: 0, width: 1536 - 1102 - E, height: 565 - E },
  "plener-luz": { left: 1102 + E, top: 570 + E, width: 1536 - 1102 - E, height: 1024 - 570 - E },
};

await mkdir("public/photos", { recursive: true });
for (const [name, box] of Object.entries(crops)) {
  for (const [suffix, width, q] of [
    ["", box.width, 86],
    ["-480", Math.min(480, box.width), 80],
  ]) {
    const out = `public/photos/${name}${suffix}.webp`;
    await sharp(SRC).extract(box).resize({ width }).webp({ quality: q }).toFile(out);
    const { size } = await stat(out);
    console.log(`${out}: ${box.width}×${box.height} → ${width}px, ${(size / 1024).toFixed(1)} KB`);
  }
}
