import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Foot } from "@/components/sections/cv-sections";
import { RecordEmbed } from "@/components/sections/record-embed";
import { site } from "@/lib/site";
import { content } from "@/lib/content";
import { reelLinks } from "@/lib/reels";

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
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og-image.png"],
  },
};

const recordLinks = [
  { href: reelLinks.recordFb, label: "Facebook · 237 414" },
  { href: reelLinks.recordYt, label: "YouTube · 85 330" },
  { href: reelLinks.recordTt, label: "TikTok · 66 956" },
  { href: reelLinks.recordIg, label: "Instagram · 12 866" },
];

const cards = [
  {
    title: "Modlitwa, którą znasz od dziecka, brzmi inaczej, niż myślisz.",
    meta: "18.11.2026 · hook i dystrybucja",
    numbers:
      "402 566 wyświetleń w 2 dni. Facebook 237 414 i 2 920 polubień. YouTube 85 330, 1 376 polubień, 157 komentarzy, 441 udostępnień. TikTok 66 956, 1 147 polubień, 319 komentarzy, 291 udostępnień. Instagram 12 866, 236 polubień, 54 komentarze, 112 udostępnień, 104 zapisy.",
    shows:
      "Jeden komentarz do sprawy, która już żyła w ludziach, ten sam materiał na czterech platformach, setki komentarzy.",
    href: reelLinks.recordYt,
    link: "YouTube",
  },
  {
    title: "Po tym jednym słowie widać, czy związek przetrwa",
    meta: "22.10.2026 · Instagram · pomysł, który zostaje",
    numbers: "10 198 wyświetleń, 120 zapisów, 53 udostępnienia.",
    shows: "Dużo zapisów jak na ten zasięg. Ludzie wracają do rolki, nie tylko ją przesuwają.",
    href: reelLinks.ig2210,
    link: "Instagram",
  },
  {
    title: "Idziesz jutro na groby?",
    meta: "31.10.2026 · TikTok · społeczność",
    numbers: "7 336 wyświetleń, 177 komentarzy.",
    shows: "Dużo rozmowy przy mniejszym zasięgu. Liczy się udział, nie samo odtworzenie.",
    href: reelLinks.groby,
    link: "TikTok",
  },
  {
    title: "Zostaniesz sama? Sama to nie samotna.",
    meta: "13.11.2026 · YouTube · głos i temat",
    numbers: "1 690 wyświetleń.",
    shows: "Temat, który prowadzę na co dzień. Warsztat przed kamerą, nie tylko jeden wiral.",
    href: reelLinks.samotna,
    link: "YouTube",
  },
];

const rest = [
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
    p: "Pomysł → scenariusz z pomocą Claude → nagranie aparatem Canon → montaż w DaVinci Resolve Studio → publikacja → statystyki w Metricool i Arkuszach Google → społeczność (komentarze i odpowiedzi).",
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
          Content creator i autor. Od 17 lat pracuję przed kamerą. Dziś robię krótkie wideo od scenariusza po wnioski z
          liczb — w tym rolkę, która w dwa dni zebrała ponad 400 tys. wyświetleń.
        </p>

        <div className="mt-10 grid gap-5">
          <section className="pcard" aria-labelledby="h-01">
            <p className="meta mb-2">01 · Marka osobista</p>
            <h2 id="h-01" className="font-display text-[24px] font-semibold text-text">
              400 tys. wyświetleń w 2 dni
            </h2>
            <p className="mt-2 leading-[1.6] text-text2">
              18.11.2026 nagrałem rolkę o tym, że modlitwa, którą znasz od dziecka, brzmi inaczej, niż myślisz. W dwa dni
              zebrała 402 566 wyświetleń na Facebooku, YouTube, TikToku i Instagramie. Od pomysłu po publikację i rozmowę
              w komentarzach robię to sam.
            </p>
            <RecordEmbed title="Rolka z 18.11.2026: Papież poprawił „Ojcze nasz”" />
            <p className="reel-links">
              {recordLinks.map((l) => (
                <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </p>
            <div className="results-strip">
              <p className="font-semibold text-text">Wyniki kanałów @maciejvsufa</p>
              <p className="mt-2 leading-[1.6] text-text2">
                Facebook 4 963 obserwujących (stan na 19.11.2026) · Instagram 3 629 · YouTube 217 (15.11 było 65) ·
                TikTok 76.
              </p>
              <p className="mt-2 font-mono text-[13px] text-text3">
                Źródło: Metricool, stan na 20.11.2026, o ile nie podano inaczej.
              </p>
            </div>
            <ul className="mt-2 divide-y divide-line">
              {cards.map((c) => (
                <li key={c.href} className="py-4">
                  <p className="font-semibold leading-[1.4] text-text">{c.title}</p>
                  <p className="mt-1 font-mono text-[13px] text-text3">{c.meta}</p>
                  <p className="mt-2 leading-[1.6] text-text2">{c.numbers}</p>
                  <p className="mt-2 leading-[1.6] text-text2">{c.shows}</p>
                  <p className="mt-2">
                    <a className="lnk" href={c.href} target="_blank" rel="noopener noreferrer">
                      {c.link} ↗
                    </a>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-2 leading-[1.6] text-text2">
              Każdą rolkę prowadzę od początku do końca: pomysł, nagranie, montaż w DaVinci Resolve, publikacja i rozmowa
              z ludźmi w komentarzach. Przy scenariuszu korzystam z Claude. Statystyki sprawdzam w Metricool i Arkuszach
              Google.
            </p>
          </section>

          {rest.map((c) => (
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
              {"status" in c && c.status ? <p className="mt-3 font-mono text-[13px] text-text3">{c.status}</p> : null}
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
