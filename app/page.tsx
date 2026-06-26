import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { CoRobie } from "@/components/sections/co-robie";
import { Projekty } from "@/components/sections/projekty";
import { JakPracuje } from "@/components/sections/jak-pracuje";
import { Stack } from "@/components/sections/stack";
import { OMnie } from "@/components/sections/o-mnie";
import { Kontakt } from "@/components/sections/kontakt";
import { SiteEffects } from "@/components/fx/site-effects";

export default function Home() {
  return (
    <>
      <SiteNav />
      <SiteEffects />
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
