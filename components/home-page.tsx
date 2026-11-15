import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { Kontakt, Osoba, Zakres } from "@/components/sections/cv-sections";
import { StoryController } from "@/components/story/story-controller";
import { ActingDialog } from "@/components/ui/acting-dialog";
import { CertificateDialog } from "@/components/ui/certificate-dialog";
import type { SiteContent } from "@/lib/content";

/**
 * Wizytówka „jednej strony”: ramka (.frame) jest przypięta i nie przesuwa się — przewijanie tylko
 * podmienia sceny. Pod ramką leżą niewidzialne kroki (.story-steps), które nadają stronie wysokość
 * i niosą kotwice (#co-robie, #kontakt). Kolejność scen w .frame = kolejność kroków w .story-steps.
 * Komputer: 4 tablice (bohater, Co robię, opis osoby, kontakt). Telefon: „Co robię”
 * ma dodatkowy znacznik, bo tam są dwie karty.
 */
export function HomePage({ t }: { t: SiteContent }) {
  const steps: { id: string; phoneExtra: number }[] = [
    { id: "top", phoneExtra: 0 },
    { id: "co-robie", phoneExtra: 1 },
    { id: "o-mnie", phoneExtra: 0 },
    { id: "kontakt", phoneExtra: 0 },
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
            <Zakres t={t} />
            <Osoba t={t} />
            <Kontakt t={t} />
          </div>
        </div>
        {/* jeden znacznik = jedna karta; przewijanie zatrzymuje się na każdym (scroll-snap-stop),
            więc jedno przesunięcie palcem to zawsze jedna karta. */}
        <div className="story-steps" aria-hidden="true">
          {steps.map((s) => (
            <div key={s.id} id={s.id} className="step">
              <span className="snap" />
              {Array.from({ length: s.phoneExtra }, (_, i) => (
                <span key={i} className="snap snap-phone" />
              ))}
            </div>
          ))}
        </div>
      </main>
      <ActingDialog a={t.aktorstwo} />
      <CertificateDialog c={t.certyfikat} />
      <StoryController />
    </>
  );
}
