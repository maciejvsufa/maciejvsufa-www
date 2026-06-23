import { Reveal } from "@/components/ui/reveal";
import { oMnie } from "@/lib/content";

export function OMnie() {
  return (
    <section aria-labelledby="o-mnie-title" className="pad-x mx-auto max-w-[1180px] py-20">
      <Reveal>
        <p className="font-mono text-[13px] text-accent">{oMnie.kicker} — o mnie</p>
        <h2 id="o-mnie-title" className="mt-2 font-display text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.02em] text-text">
          {oMnie.title}
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="border-l-2 border-accent pl-6 font-display text-[clamp(19px,2.2vw,26px)] leading-[1.45] text-text">
            {oMnie.motto}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="space-y-4 text-text2">
            <p className="leading-[1.6]">{oMnie.background}</p>
            <p className="font-mono text-[13px] text-text3">{oMnie.cert}</p>
            <p className="leading-[1.55]">{oMnie.english}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
