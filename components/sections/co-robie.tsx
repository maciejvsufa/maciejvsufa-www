import { coRobie } from "@/lib/content";

export function CoRobie() {
  return (
    <section id="co-robie" aria-labelledby="co-robie-title" className="sheet-section">
      <span className="eyebrow font-mono">{coRobie.kicker} · Co robię</span>
      <div className="mt-[18px] flex max-w-[60ch] flex-col gap-3.5">
        <h2
          id="co-robie-title"
          className="font-display text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.04] tracking-[-0.02em]"
        >
          Mniej powtarzalnej roboty.
          <br />
          Więcej miejsca na człowieka.
        </h2>
        <p className="max-w-[54ch] text-[clamp(15px,1.3vw,17px)] leading-[1.6] text-text2">{coRobie.lead}</p>
      </div>

      <div className="mt-[46px] grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        {coRobie.items.map((it, idx) => (
          <article key={it.h} className="design-card">
            <span className="absolute right-[22px] top-5 font-mono text-[12px] text-text3">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{it.h}</h3>
            <p className="mt-2.5 text-[14.5px] leading-[1.6] text-text2">{it.p}</p>
            {it.note && <p className="mt-3 font-mono text-[12.5px] text-text3">{it.note}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
