import type { SiteContent } from "@/lib/content";

export function Projekty({ t }: { t: SiteContent }) {
  const projekty = t.projekty;
  return (
    <section id="projekty" aria-labelledby="projekty-title" className="sheet-section">
      <span className="eyebrow font-mono">
        {projekty.kicker} · {projekty.title}
      </span>
      <div className="mt-[18px] max-w-[60ch]">
        <h2
          id="projekty-title"
          className="font-display text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.04] tracking-[-0.02em]"
        >
          {projekty.h2}
        </h2>
      </div>

      <div className="mt-[46px] grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        {projekty.items.map((p) => (
          <article key={p.name} className="design-card">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{p.tag}</span>
            <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{p.name}</h3>
            <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-text2">{p.p}</p>
            {p.stack && (
              <div className="mt-3.5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-border px-[11px] py-1 text-[12px] text-text2">
                    {s}
                  </span>
                ))}
              </div>
            )}
            {"link" in p && p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-block font-mono text-[13px] text-accent transition-colors hover:text-accent2"
              >
                ↗ {p.linkLabel}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
