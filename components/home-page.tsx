import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { OMnie } from "@/components/sections/o-mnie";
import { CoRobie } from "@/components/sections/co-robie";
import { Doswiadczenie } from "@/components/sections/doswiadczenie";
import { JakPracuje } from "@/components/sections/jak-pracuje";
import { Umiejetnosci } from "@/components/sections/umiejetnosci";
import { Edukacja } from "@/components/sections/edukacja";
import { Kontakt } from "@/components/sections/kontakt";
import type { SiteContent } from "@/lib/content";

/** Wspólna kompozycja strony głównej — "/" (pl) i "/en/" (en) różnią się tylko słownikiem. */
export function HomePage({ t }: { t: SiteContent }) {
  return (
    <>
      <a href="#top" className="skip-link">
        {t.ui.skipLink}
      </a>
      <SiteNav t={t} />
      <main className="cv" id="top">
        <Hero t={t} />
        <OMnie t={t} />
        <CoRobie t={t} />
        <Doswiadczenie t={t} />
        <JakPracuje t={t} />
        <Umiejetnosci t={t} />
        <Edukacja t={t} />
        <Kontakt t={t} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
