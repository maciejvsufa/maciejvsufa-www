import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import {
  CoRobie,
  Doswiadczenie,
  Edukacja,
  JakPracuje,
  Jezyki,
  Kontakt,
  OMnie,
  Umiejetnosci,
} from "@/components/sections/cv-sections";
import { Thanks } from "@/components/sections/thanks";
import { StoryController } from "@/components/story/story-controller";
import type { SiteContent } from "@/lib/content";

/**
 * „Jedna strona”: ramka (.frame) jest przypięta i nie przesuwa się — przewijanie tylko
 * podmienia sceny i punkty w scenach. Pod ramką leżą niewidzialne kroki (.story-steps),
 * które nadają stronie wysokość i niosą kotwice (#o-mnie, #kontakt…).
 * Kolejność scen w .frame = kolejność kroków w .story-steps.
 */
export function HomePage({ t }: { t: SiteContent }) {
  const steps: { id: string; n: number; nPhone?: number; label: string }[] = [
    { id: "top", n: 1, label: t.hero.aria },
    { id: "o-mnie", n: 1, nPhone: 2, label: t.about.title },
    { id: "doswiadczenie", n: t.experience.items.length, label: t.experience.title },
    { id: "co-robie", n: t.coRobie.items.length, label: t.coRobie.title },
    { id: "jak-pracuje", n: t.jakPracuje.points.length, label: t.jakPracuje.title },
    { id: "umiejetnosci", n: 1, label: t.skills.title },
    { id: "edukacja", n: t.education.items.length, label: t.education.title },
    { id: "jezyki", n: 1, label: t.languages.title },
    { id: "kontakt", n: 1, label: t.kontakt.title },
    { id: "koniec", n: 1, label: t.thanks.lines.join(" ") },
  ];
  return (
    <>
      <a href="#o-mnie" className="skip-link">
        {t.ui.skipLink}
      </a>
      <div className="stage" aria-hidden="true" />
      <SiteHeader t={t} />
      <main className="story">
        <div className="story-pin">
          <div className="frame" data-tone="white">
            <span className="grain" aria-hidden="true" />
            <Hero t={t} />
            <OMnie t={t} />
            <Doswiadczenie t={t} />
            <CoRobie t={t} />
            <JakPracuje t={t} />
            <Umiejetnosci t={t} />
            <Edukacja t={t} />
            <Jezyki t={t} />
            <Kontakt t={t} />
            <Thanks t={t} />
            {/* nawigacja po scenach: 01–08 z boku ramki */}
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
        <div className="story-steps" aria-hidden="true">
          {steps.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="step"
              style={{ "--n": s.n, "--n-m": s.nPhone ?? s.n } as React.CSSProperties}
            />
          ))}
        </div>
      </main>
      <StoryController />
    </>
  );
}
