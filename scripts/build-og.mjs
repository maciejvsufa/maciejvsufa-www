/**
 * Generuje public/og-image.png (1200×630) oraz ikony PWA/manifest
 * (icon-192.png, icon-512.png, apple-touch-icon.png) — sharp, zero CDN.
 * Uruchom: node scripts/build-og.mjs
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";

const W = 1200;
const H = 630;

const bgSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="78%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#c9c0ad" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#c9c0ad" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="comet" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#e8e2d4" stop-opacity="0"/>
      <stop offset="60%" stop-color="#f4f0e8" stop-opacity="0.45"/>
      <stop offset="88%" stop-color="#fffdf8" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#e8e2d4" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#08080a"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g transform="rotate(-8 600 200)">
    <rect x="60" y="196" width="860" height="2.5" fill="url(#comet)"/>
    <circle cx="905" cy="197" r="4.5" fill="#fffdf8"/>
  </g>
  <rect x="72" y="300" width="46" height="3" fill="#c9c0ad" opacity="0.75"/>
  <text x="72" y="382" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="600" fill="#f3f1ec" letter-spacing="-1">Maciej V. Sufa</text>
  <text x="72" y="448" font-family="'Segoe UI', Arial, sans-serif" font-size="32" fill="#b8b5ad">Usprawniam i automatyzuję procesy w firmach z AI</text>
  <text x="72" y="548" font-family="Consolas, monospace" font-size="22" fill="#c9c0ad" letter-spacing="3">MACIEJVSUFA.PL</text>
</svg>`;

const portrait = sharp("public/portrait-cutout.webp").resize({ height: 560 });
const portraitBuf = await portrait.toBuffer();
const pMeta = await sharp(portraitBuf).metadata();

await sharp(Buffer.from(bgSvg))
  .composite([{ input: portraitBuf, left: W - pMeta.width - 40, top: H - pMeta.height }])
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile("public/og-image.png");

// Ikony: „gem" marki (romb platyna na czerni)
const iconSvg = (s) => `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${s}" height="${s}" rx="${s * 0.18}" fill="#08080a"/>
  <rect x="${s * 0.32}" y="${s * 0.32}" width="${s * 0.36}" height="${s * 0.36}" fill="#c9c0ad"
        transform="rotate(45 ${s / 2} ${s / 2})"/>
</svg>`;

await sharp(Buffer.from(iconSvg(192))).png().toFile("public/icon-192.png");
await sharp(Buffer.from(iconSvg(512))).png().toFile("public/icon-512.png");
await sharp(Buffer.from(iconSvg(180))).png().toFile("public/apple-touch-icon.png");

for (const f of ["public/og-image.png", "public/icon-192.png", "public/icon-512.png", "public/apple-touch-icon.png"]) {
  const { size } = await stat(f);
  console.log(`${f}: ${(size / 1024).toFixed(1)} KB`);
}
