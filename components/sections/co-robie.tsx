import type { SiteContent } from "@/lib/content";
import { SecHead } from "@/components/ui/sec-head";
import { Reveal } from "@/components/ui/reveal";

export function CoRobie({ t }: { t: SiteContent }) {
  const c = t.coRobie;
  return (
    <section id="co-robie" aria-labelledby="co-robie-title" className="cv-section">
      <SecHead id="co-robie-title" num={c.kicker} title={c.title} />
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {c.items.map((it, i) => (
          <Reveal key={it.h} delay={i * 60}>
            <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{it.h}</h3>
            <p className="mt-2 text-[15px] leading-[1.65] text-text2">{it.p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
