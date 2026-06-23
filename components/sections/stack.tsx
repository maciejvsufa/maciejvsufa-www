import { Reveal } from "@/components/ui/reveal";
import { stack } from "@/lib/content";

export function Stack() {
  return (
    <section aria-labelledby="stack-title" className="pad-x mx-auto max-w-[1180px] py-20">
      <Reveal>
        <p className="font-mono text-[13px] text-accent">{stack.kicker} — narzędzia</p>
        <h2 id="stack-title" className="mt-2 font-display text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.02em] text-text">
          {stack.title}
        </h2>
      </Reveal>
      <div className="mt-8 space-y-3">
        {stack.groups.map((g, idx) => (
          <Reveal key={g} delay={idx * 50}>
            <p className="rounded-xl border border-border bg-surface px-5 py-4 font-mono text-[14px] leading-relaxed text-text2">
              {g}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
