import { Reveal } from "@/components/ui/reveal";
import { projekty } from "@/lib/content";

export function Projekty() {
  return (
    <section id="projekty" aria-labelledby="projekty-title" className="pad-x mx-auto max-w-[1180px] py-20">
      <Reveal>
        <p className="font-mono text-[13px] text-accent">{projekty.kicker} — case study</p>
        <h2 id="projekty-title" className="mt-2 font-display text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.02em] text-text">
          {projekty.title}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projekty.items.map((p, idx) => (
          <Reveal key={p.name} as="article" delay={idx * 70}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-text">{p.name}</h3>
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent">{p.tag}</p>
              <p className="mt-3 flex-1 leading-[1.6] text-text2">{p.p}</p>
              {p.stack && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-text3">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-fit font-mono text-[13px] text-accent transition-colors hover:text-accent2"
                >
                  {p.linkLabel} ↗
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
