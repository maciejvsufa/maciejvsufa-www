import { stack } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="sheet-section">
      <span className="eyebrow font-mono">{stack.kicker} · Stack</span>
      <div className="mt-[18px] max-w-[60ch]">
        <h2
          id="stack-title"
          className="font-display text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.04] tracking-[-0.02em]"
        >
          Narzędzia, w&nbsp;których pracuję.
        </h2>
      </div>
      <div className="mt-[30px] flex flex-col gap-3">
        {stack.groups.map((g) => (
          <div
            key={g}
            className="rounded-xl border border-border bg-gradient-to-b from-surface2/50 to-surface/40 px-5 py-[15px] font-mono text-[14px] text-text2 transition-[border-color,color] hover:border-accent/50 hover:text-text"
          >
            {g}
          </div>
        ))}
      </div>
    </section>
  );
}
