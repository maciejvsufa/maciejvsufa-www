import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Foot } from "@/components/sections/cv-sections";
import { site } from "@/lib/site";
import { content } from "@/lib/content";

/**
 * Portfolio v0 (15.11.2026). Zasady z briefu:
 * - liczby tylko z datą i źródłem, bez danych demo;
 * - bez iframe’ów Instagrama i TikToka (muzyka z biblioteki aplikacji) — osadzamy tylko YouTube albo dajemy link;
 * - bez rolek o kościele i polityce;
 * - czego jeszcze nie ma, ma status „w realizacji”, a nie pustą ramkę.
 */

const TITLE = "Portfolio — Maciej V. Sufa, content creator";
const DESC =
  "Krótkie wideo od scenariusza po wnioski z liczb. 17 lat przed kamerą. Marka @maciejvsufa, warsztat aktorski, strony www, narzędzia.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: "/portfolio/",
    languages: { pl: "/portfolio/", en: "/en/portfolio/", "x-default": "/portfolio/" },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${site.url}/portfolio/`,
    siteName: site.name,
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
};

type Case = { kicker: string; h: string; p: string; facts: string[]; status?: string; link?: { href: string; label: string } };

const cases: Case[] = [
  {
    kicker: "01 · Marka osobista",
    h: "@maciejvsufa",
    p: "Trzy rolki w tygodniu. Sam piszę scenariusz, występuję, montuję w DaVinci Resolve, publikuję i sprawdzam, które tematy działają.",
    facts: [
      "Rolka z 22.10.2026 na Instagramie: 9 460 wyświetleń, 7 456 osób zasięgu, 106 zapisów, 51 udostępnień (Metricool, pomiar 1–3.11.2026).",
      "Instagram: 3 604 obserwujących (Metricool, 1–3.11.2026).",
    ],
    link: { href: "https://www.instagram.com/reel/Dezb4BlAZRD/", label: "Zobacz rolkę na Instagramie" },
    status: "Pełny opis projektu i wybrane filmy: w realizacji (stan na 15.11.2026).",
  },
  {
    kicker: "02 · Warsztat przed kamerą",
    h: "17 lat przed kamerą",
    p: "Swoboda przed obiektywem i mikrofonem to podstawa krótkiego wideo. Wyniosłem ją z planu i ze sceny.",
    facts: [
      "Główna rola: detektyw Robert Barcz w serialu „Gliniarze” (Polsat, 2016–2017).",
      "„Kobiety mafii”, reż. Patryk Vega (2018).",
      "Teatr Wielki – Opera Narodowa (2023).",
    ],
    status: "Showreel 60–90 s: w realizacji.",
  },
  {
    kicker: "03 · Strony www",
    h: "maciejvsufa.pl",
    p: "Tę stronę zaprojektowałem i zbudowałem sam: Next.js, wersja polska i angielska, szybka na telefonie.",
    facts: ["Lighthouse: wydajność 93, dostępność 100, dobre praktyki 100, SEO 100 (pomiar 30.10.2026)."],
  },
  {
    kicker: "04 · Narzędzia i proces",
    h: "Od pomysłu do liczb",
    p: "Pomysł → scenariusz z pomocą Claude → nagranie aparatem Canon → montaż w DaVinci Resolve Studio → publikacja → statystyki w Metricool i Arkuszach Google.",
    facts: ["Na co dzień także: CapCut, Canva."],
  },
];

const channels = [
  { href: site.socials.instagram, label: "Instagram" },
  { href: site.socials.tiktok, label: "TikTok" },
  { href: site.socials.youtube, label: "YouTube" },
  { href: site.socials.facebook, label: "Facebook" },
  { href: site.socials.linkedin, label: "LinkedIn" },
];

export default function Portfolio() {
  return (
    <>
      <SiteHeader t={content.pl} showScroll={false} />
      <main id="main" className="page pad-x mx-auto max-w-[860px] pb-20 pt-[160px]">
        <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold uppercase text-text">Portfolio</h1>
        <p className="mt-4 max-w-[640px] text-[18px] leading-[1.6] text-text2">
          Content creator i autor. Od 17 lat pracuję przed kamerą, dziś robię krótkie wideo od scenariusza
          po wnioski z liczb.
        </p>

        <div className="mt-10 grid gap-5">
          {cases.map((c) => (
            <section key={c.kicker} className="pcard" aria-labelledby={`h-${c.kicker.slice(0, 2)}`}>
              <p className="meta mb-2">{c.kicker}</p>
              <h2 id={`h-${c.kicker.slice(0, 2)}`} className="font-display text-[24px] font-semibold text-text">
                {c.h}
              </h2>
              <p className="mt-2 leading-[1.6] text-text2">{c.p}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 leading-[1.6] text-text2">
                {c.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              {c.link ? (
                <p className="mt-3">
                  <a className="lnk" href={c.link.href} target="_blank" rel="noopener noreferrer">
                    {c.link.label} ↗
                  </a>
                </p>
              ) : null}
              {c.status ? <p className="mt-3 font-mono text-[13px] text-text3">{c.status}</p> : null}
            </section>
          ))}
        </div>

        <section className="mt-10" aria-labelledby="h-kanaly">
          <h2 id="h-kanaly" className="font-display text-[22px] font-semibold text-text">
            Kanały
          </h2>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {channels.map((s) => (
              <a key={s.label} className="lnk" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} ↗
              </a>
            ))}
          </p>
        </section>

        <section className="mt-10" aria-labelledby="h-kontakt">
          <h2 id="h-kontakt" className="font-display text-[22px] font-semibold text-text">
            Kontakt
          </h2>
          <p className="mt-3 leading-[1.6] text-text2">
            Szukam roli social media content creator, etat albo B2B, zdalnie w Polsce i UE. Napisz:{" "}
            <a className="lnk" href={`mailto:${site.email}?subject=${encodeURIComponent("Portfolio")}`}>
              {site.email}
            </a>{" "}
            albo przez{" "}
            <a className="lnk" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            .
          </p>
        </section>

        <p className="mt-12 font-mono text-[13px] text-text3">
          Materiały stock: w tej wersji brak. Montaż, scenariusz i realizacja: Maciej V. Sufa.
        </p>
        <Foot t={content.pl} />
      </main>
    </>
  );
}
