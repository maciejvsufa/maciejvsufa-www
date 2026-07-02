# maciejvsufa.pl

Portfolio / strona „zatrudnij mnie" — **Maciej Sufa — automatyzacja i usprawnianie procesów z AI**.
Next.js 16 (App Router, static export) · React 19 · Tailwind v4 · three.js.

> Wzorzec techniczny zainspirowany publicznym repo brata (`MarcinSufa/marcin-sufa-portfolio`)
> — własna treść, design (paleta charcoal + miedź) i parametry animacji.

## Wyniki (Lighthouse, desktop)
Performance **99** · Accessibility **100** · Best Practices **100** · SEO **100** · CLS **0**.
Mobile potwierdzane na żywej domenie (GitHub Pages = realny CDN, brotli, HTTP/2).

## Cechy
- **Hero z polem cząsteczek three.js** — ładowane leniwie (`requestIdleCallback`, osobny chunk,
  `ssr:false`), **na mobile pomijane** (statyczny hero, LCP < 1s), pauza poza ekranem,
  `prefers-reduced-motion`.
- Statyczny eksport, fonty lokalne (next/font), **zero CDN/trackerów**.
- Treść w jednym pliku `lib/content.ts` (DRY). Draft + tory komunikatu: `COPY-maciejvsufa.md`.
- SEO/Agentic: `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt` (markdown PL+EN), JSON-LD Person.

## Rozwój
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # eksport do out/
```
Podgląd buildu lokalnie:
```bash
npm run build
cd out && python -m http.server 5174   # http://localhost:5174
```

## CV (PDF + Word)
Treść w `cv/content.json`. Regeneracja po edycji:
```bash
npm run build:cv
```
Wyjście w `public/cv/`:
- `Maciej_Sufa_CV.pdf` / `.docx` — PL (link na stronie: „Pobierz CV")
- `Maciej_Sufa_CV_EN.pdf` / `.docx` — EN

## Struktura
| Ścieżka | Co |
| --- | --- |
| `app/` | layout (meta/OG/JSON-LD), strony, globals.css (tokeny palety) |
| `components/sections/` | sekcje strony (hero, co-robie, projekty, jak-pracuje, stack, o-mnie, kontakt) |
| `components/hero/` | particle-field (three.js) + lazy wrapper |
| `components/ui/` | reveal-on-scroll |
| `lib/content.ts` | źródło prawdy treści |
| `lib/cv-content.ts` | typy + eksport treści CV (źródło: `cv/content.json`) |
| `cv/content.json` | treść CV PL + EN |
| `cv/cv.css` | styl druku CV |
| `scripts/build-cv.mjs` | generacja PDF + DOCX + HTML |
| `public/cv/` | gotowe pliki CV (PDF, DOCX, HTML, zdjęcie) |
| `lib/browser.ts` | helpery animacji (isSmallScreen, clampDpr, watchVisibility) |

## Deploy
GitHub Pages — `.github/workflows/deploy.yml` (build → `out/` + CNAME `maciejvsufa.pl` + `.nojekyll`),
auto na każdy push do `main`. Alternatywa: statyczny `out/` na własny serwer (rsync/scp).

## TODO przed go-live
- [x] `public/cv/Maciej_Sufa_CV.pdf` (Etap 2 — CV) — generuj: `npm run build:cv`
- [ ] og-image 1200×630
- [ ] zmiana loginu GitHub na `maciejvsufa` (linki w stopce/llms.txt już to zakładają)
