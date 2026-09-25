import type { SiteContent } from "@/lib/content";
import { SecHead } from "@/components/ui/sec-head";
import { Reveal } from "@/components/ui/reveal";

export function OMnie({ t }: { t: SiteContent }) {
  const a = t.about;
  return (
    <section id="o-mnie" aria-labelledby="o-mnie-title" className="cv-section">
      <SecHead id="o-mnie-title" num={a.kicker} title={a.title} />
      <Reveal>
        <p className="text-[clamp(22px,3vw,30px)] font-medium leading-[1.3] tracking-[-0.02em]">{a.lead}</p>
        {a.body.map((p) => (
          <p key={p.slice(0, 24)} className="mt-5 max-w-[62ch] text-[16px] leading-[1.7] text-text2">
            {p}
          </p>
        ))}
      </Reveal>
    </section>
  );
}
