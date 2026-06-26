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

export default function Home() {
  return (
    <>
      <SiteNav />
      <SiteEffectsLazy />
      <main className="sheet" id="top">
        <Hero />
        <CoRobie />
        <Projekty />
        <JakPracuje />
        <Stack />
        <OMnie />
        <Kontakt />
        <SiteFooter />
      </main>
    </>
  );
}
