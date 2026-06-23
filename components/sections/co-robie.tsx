import { Reveal } from "@/components/ui/reveal";
import { coRobie } from "@/lib/content";

export function CoRobie() {
  return (
    <section id="co-robie" aria-labelledby="co-robie-title" className="pad-x mx-auto max-w-[1180px] py-20">
      <Reveal>
        <p className="font-mono text-[13px] text-accent">{coRobie.kicker} — kompetencje</p>
        <h2 id="co-robie-title" className="mt-2 font-display text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.02em] text-text">
          {coRobie.title}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {coRobie.items.map((it, idx) => (
          <Reveal key={it.h} as="article" delay={idx * 70}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
              <h3 className="font-display text-xl font-semibold text-text">{it.h}</h3>
              <p className="mt-3 leading-[1.6] text-text2">{it.p}</p>
              {it.note && <p className="mt-3 font-mono text-[12px] text-text3">{it.note}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
