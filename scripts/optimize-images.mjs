import sharp from "sharp";
import { stat } from "node:fs/promises";

const src = "public/portrait-cutout-800.png";

const jobs = [
  sharp(src).resize(800).webp({ quality: 82, effort: 6 }).toFile("public/portrait-cutout.webp"),
  sharp(src)
    .resize(480)
    .webp({ quality: 80, effort: 6 })
    .toFile("public/portrait-cutout-480.webp"),
  sharp(src)
    .resize(800)
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toFile("public/portrait-cutout-800.png"),
];

await Promise.all(jobs);

for (const f of [
  "public/portrait-cutout.webp",
  "public/portrait-cutout-480.webp",
  "public/portrait-cutout-800.png",
]) {
  const { size } = await stat(f);
  console.log(`${f}: ${(size / 1024).toFixed(1)} KB`);
}
