import type { SiteContent } from "@/lib/content";
import { SecHead } from "@/components/ui/sec-head";
import { Reveal } from "@/components/ui/reveal";

export function JakPracuje({ t }: { t: SiteContent }) {
  const j = t.jakPracuje;
  return (
    <section id="jak-pracuje" aria-labelledby="jak-pracuje-title" className="cv-section">
      <SecHead id="jak-pracuje-title" num={j.kicker} title={j.title} />
      <p className="max-w-[62ch] text-[16px] leading-[1.7] text-text2">{j.intro}</p>
      <ol className="mt-8 grid gap-6 sm:grid-cols-3">
        {j.points.map((p, i) => (
          <Reveal as="li" key={p.h} delay={i * 60} className="border-t border-border pt-4">
            <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
            <h3 className="mt-2 text-[17px] font-semibold">{p.h}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-text2">{p.p}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
