import { SiteHeader } from "@/components/site-header";
import { Hero, HeroBackdrop } from "@/components/sections/hero";
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
import type { SiteContent } from "@/lib/content";

/**
 * Kompozycja: stałe tło sceny (osobna warstwa po bokach), stały nagłówek, pierwszy ekran
 * ze zdjęciem (przypięty, gaśnie przy przewijaniu), potem „taśma” — arkusz z sekcjami
 * z perforacją po bokach, który najeżdża na zdjęcie i całkowicie je zakrywa.
 */
export function HomePage({ t }: { t: SiteContent }) {
  return (
    <>
      <a href="#o-mnie" className="skip-link">
        {t.ui.skipLink}
      </a>
      <div className="stage" aria-hidden="true" />
      <SiteHeader t={t} />
      <main className="page">
        <div className="hero-wrap">
          <HeroBackdrop alt={t.hero.photoAlt} />
          <Hero t={t} />
        </div>
        <div className="sheet">
          <OMnie t={t} />
          <Doswiadczenie t={t} />
          <CoRobie t={t} />
          <JakPracuje t={t} />
          <Umiejetnosci t={t} />
          <Edukacja t={t} />
          <Jezyki t={t} />
          <Kontakt t={t} />
          <Thanks t={t} />
        </div>
      </main>
    </>
  );
}
