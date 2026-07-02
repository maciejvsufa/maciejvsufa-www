import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { CoRobie } from "@/components/sections/co-robie";
import { Projekty } from "@/components/sections/projekty";
import { JakPracuje } from "@/components/sections/jak-pracuje";
import { Stack } from "@/components/sections/stack";
import { OMnie } from "@/components/sections/o-mnie";
import { Kontakt } from "@/components/sections/kontakt";
import { SiteEffectsLazy } from "@/components/fx/site-effects-lazy";
import type { SiteContent } from "@/lib/content";

/** Wspólna kompozycja strony głównej — "/" (pl) i "/en/" (en) różnią się tylko słownikiem. */
export function HomePage({ t }: { t: SiteContent }) {
  return (
    <>
      <a href="#top" className="skip-link">
        {t.ui.skipLink}
      </a>
      <SiteNav t={t} />
      <SiteEffectsLazy />
      <main className="sheet" id="top">
        <Hero t={t} />
        <CoRobie t={t} />
        <Projekty t={t} />
        <JakPracuje t={t} />
        <Stack t={t} />
        <OMnie t={t} />
        <Kontakt t={t} />
        <SiteFooter t={t} />
      </main>
    </>
  );
}
