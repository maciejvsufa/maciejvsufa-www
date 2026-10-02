import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import {
  CoRobie,
  Faq,
  JakPracuje,
  Kontakt,
  Korzysci,
  Omnie,
  Realizacje,
  Uslugi,
  Wspolpraca,
} from "@/components/sections/cv-sections";
import { Thanks } from "@/components/sections/thanks";
import { StoryController } from "@/components/story/story-controller";
import type { SiteContent } from "@/lib/content";

/**
 * „Jedna strona”: ramka (.frame) jest przypięta i nie przesuwa się — przewijanie tylko
 * podmienia sceny i punkty w scenach. Pod ramką leżą niewidzialne kroki (.story-steps),
 * które nadają stronie wysokość i niosą kotwice (#uslugi, #kontakt…).
 * Kolejność scen w .frame = kolejność kroków w .story-steps.
 */
export function HomePage({ t }: { t: SiteContent }) {
  const steps: { id: string; n: number; label: string }[] = [
    { id: "top", n: 1, label: t.hero.aria },
    { id: "co-robie", n: t.coRobie.items.length, label: t.coRobie.title },
    { id: "korzysci", n: 1, label: t.korzysci.title },
    { id: "uslugi", n: t.uslugi.items.length, label: t.uslugi.title },
    { id: "jak-pracuje", n: t.jakPracuje.items.length, label: t.jakPracuje.title },
    { id: "wspolpraca", n: 1, label: t.wspolpraca.title },
    { id: "realizacje", n: t.realizacje.items.length, label: t.realizacje.title },
    { id: "o-mnie", n: t.omnie.items.length, label: t.omnie.title },
    { id: "faq", n: 1, label: t.faq.title },
    { id: "kontakt", n: 1, label: t.kontakt.title },
    { id: "koniec", n: 1, label: t.thanks.lines.join(" ") },
  ];
  return (
    <>
      <a href="#co-robie" className="skip-link">
        {t.ui.skipLink}
      </a>
      <div className="stage" aria-hidden="true" />
      <SiteHeader t={t} />
      <main className="story">
        <div className="story-pin">
          <div className="frame" data-tone="white">
            <Hero t={t} />
            <CoRobie t={t} />
            <Korzysci t={t} />
            <Uslugi t={t} />
            <JakPracuje t={t} />
            <Wspolpraca t={t} />
            <Realizacje t={t} />
            <Omnie t={t} />
            <Faq t={t} />
            <Kontakt t={t} />
            <Thanks t={t} />
            {/* nawigacja po scenach: 01–09 z boku ramki */}
            <nav className="rail" aria-label={t.lang === "en" ? "Sections" : "Sekcje"}>
              {steps.slice(1, -1).map((s, i) => (
                <a key={s.id} href={`#${s.id}`} data-i={i + 1}>
                  <span className="rail-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rail-label">{s.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
        {/* jeden znacznik = jedna karta; przewijanie zatrzymuje się na każdym (scroll-snap-stop),
            więc jedno przesunięcie palcem to zawsze jedna karta. */}
        <div className="story-steps" aria-hidden="true">
          {steps.map((s) => (
            <div key={s.id} id={s.id} className="step">
              {Array.from({ length: s.n }, (_, i) => (
                <span key={i} className="snap" />
              ))}
            </div>
          ))}
        </div>
      </main>
      <StoryController />
    </>
  );
}
