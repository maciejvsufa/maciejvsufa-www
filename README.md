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

## Struktura
| Ścieżka | Co |
| --- | --- |
| `app/` | layout (meta/OG/JSON-LD), strony, globals.css (tokeny palety) |
| `components/sections/` | sekcje strony (hero, co-robie, projekty, jak-pracuje, stack, o-mnie, kontakt) |
| `components/hero/` | particle-field (three.js) + lazy wrapper |
| `components/ui/` | reveal-on-scroll |
| `lib/content.ts` | źródło prawdy treści |
| `lib/browser.ts` | helpery animacji (isSmallScreen, clampDpr, watchVisibility) |

## Deploy
GitHub Pages — `.github/workflows/deploy.yml` (build → `out/` + CNAME `maciejvsufa.pl` + `.nojekyll`),
auto na każdy push do `main`. Alternatywa: statyczny `out/` na własny serwer (rsync/scp).

## TODO przed go-live
- [ ] `public/cv/Maciej_Sufa_CV.pdf` (Etap 2 — CV)
- [ ] og-image 1200×630
- [ ] zmiana loginu GitHub na `maciejvsufa` (linki w stopce/llms.txt już to zakładają)
