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
    <radialGradient id="glow" cx="80%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#c9a24a" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#c9a24a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#f5efe3"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="72" y="120" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="600" fill="#8f6b22">17 lat przed kamerą · od 2025 content z AI</text>
  <text x="72" y="270" font-family="'Segoe UI', Arial, sans-serif" font-size="104" font-weight="700" fill="#0f1b2d" letter-spacing="-3">MACIEJ</text>
  <text x="72" y="368" font-family="'Segoe UI', Arial, sans-serif" font-size="104" font-weight="700" fill="#0f1b2d" letter-spacing="-3">V. SUFA</text>
  <text x="72" y="446" font-family="'Segoe UI', Arial, sans-serif" font-size="30" font-weight="600" fill="#0f1b2d">Social Media Content Creator (AI-powered)</text>
  <rect x="72" y="500" width="56" height="3" fill="#c9a24a"/>
  <text x="72" y="556" font-family="'Segoe UI', Arial, sans-serif" font-size="22" fill="#5b6475" letter-spacing="3">MACIEJVSUFA.PL</text>
</svg>`;

const portrait = sharp("public/hero-fig.webp").resize({ height: 600 });
const portraitBuf = await portrait.toBuffer();
const pMeta = await sharp(portraitBuf).metadata();

await sharp(Buffer.from(bgSvg))
  .composite([{ input: portraitBuf, left: W - pMeta.width - 40, top: H - pMeta.height }])
  .png({ compressionLevel: 9 })
  .toFile("public/og-image.png");

// Ikony: złota kropka marki na granacie
const iconSvg = (s) => `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${s}" height="${s}" rx="${s * 0.18}" fill="#0f1b2d"/>
  <circle cx="${s / 2}" cy="${s / 2}" r="${s * 0.2}" fill="#c9a24a"/>
</svg>`;

await sharp(Buffer.from(iconSvg(192))).png().toFile("public/icon-192.png");
await sharp(Buffer.from(iconSvg(512))).png().toFile("public/icon-512.png");
await sharp(Buffer.from(iconSvg(180))).png().toFile("public/apple-touch-icon.png");

for (const f of ["public/og-image.png", "public/icon-192.png", "public/icon-512.png", "public/apple-touch-icon.png"]) {
  const { size } = await stat(f);
  console.log(`${f}: ${(size / 1024).toFixed(1)} KB`);
}
