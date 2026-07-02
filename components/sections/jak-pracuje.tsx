import type { SiteContent } from "@/lib/content";

const markers = ["①", "②", "③"];

export function JakPracuje({ t }: { t: SiteContent }) {
  const jakPracuje = t.jakPracuje;
  return (
    <section id="jak-pracuje" aria-labelledby="jak-pracuje-title" className="sheet-section">
      <span className="eyebrow font-mono">
        {jakPracuje.kicker} · {jakPracuje.title}
      </span>
      <div className="mt-[18px] flex max-w-[60ch] flex-col gap-3.5">
        <h2
          id="jak-pracuje-title"
          className="font-display text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.04] tracking-[-0.02em]"
        >
          {jakPracuje.lead}
        </h2>
        <p className="max-w-[54ch] text-[clamp(15px,1.3vw,17px)] leading-[1.6] text-text2">{jakPracuje.intro}</p>
      </div>

      <div className="mt-[46px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
        {jakPracuje.points.map((pt, idx) => (
          <article key={pt.h} className="design-card">
            <span className="absolute right-[22px] top-5 font-mono text-[12px] text-text3">{markers[idx]}</span>
            <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{pt.h}</h3>
            <p className="mt-2.5 text-[14.5px] leading-[1.6] text-text2">{pt.p}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
