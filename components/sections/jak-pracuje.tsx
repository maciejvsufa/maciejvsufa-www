import { Reveal } from "@/components/ui/reveal";
import { jakPracuje } from "@/lib/content";

export function JakPracuje() {
  return (
    <section id="jak-pracuje" aria-labelledby="jak-pracuje-title" className="pad-x mx-auto max-w-[1180px] py-20">
      <Reveal>
        <p className="font-mono text-[13px] text-accent">{jakPracuje.kicker} — jak pracuję</p>
        <h2 id="jak-pracuje-title" className="mt-2 font-display text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.02em] text-text">
          {jakPracuje.lead}
        </h2>
        <p className="mt-4 max-w-[60ch] leading-[1.6] text-text2">{jakPracuje.intro}</p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {jakPracuje.points.map((pt, idx) => (
          <Reveal key={pt.h} delay={idx * 70}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <span className="font-mono text-[12px] text-accent">0{idx + 1}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-text">{pt.h}</h3>
              <p className="mt-2 leading-[1.55] text-text2">{pt.p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
