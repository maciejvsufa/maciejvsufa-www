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
 * Kompozycja jak w szablonie Syntax CV: stałe zdjęcie na cały ekran, stały nagłówek,
 * pierwszy ekran z imieniem, potem czarny panel z sekcjami (na desktopie 2/3 szerokości —
 * po prawej widać zdjęcie).
 */
export function HomePage({ t }: { t: SiteContent }) {
  return (
    <>
      <a href="#o-mnie" className="skip-link">
        {t.ui.skipLink}
      </a>
      <HeroBackdrop alt={t.hero.photoAlt} />
      <SiteHeader t={t} />
      <main className="page">
        <Hero t={t} />
        <div className="panel">
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
