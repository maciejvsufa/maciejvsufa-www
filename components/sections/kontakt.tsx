import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";

export function Kontakt({ t }: { t: SiteContent }) {
  const kontakt = t.kontakt;
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="sheet-section pb-[clamp(80px,9vw,130px)] text-center">
      <span className="eyebrow mx-auto justify-center font-mono">
        {kontakt.kicker} · {kontakt.title}
      </span>
      <h2
        id="kontakt-title"
        className="mx-auto mt-[18px] max-w-[18ch] font-display text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.025em]"
      >
        {kontakt.headline}
      </h2>
      <p className="mx-auto mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-text2">{kontakt.lead}</p>

      <div className="mt-[34px] flex flex-wrap items-center justify-center gap-3.5">
        <a className="btn btn-primary btn-sound" href={`mailto:${site.email}`}>
          ↗ {site.email}
        </a>
        <a
          className="btn btn-ghost btn-sound"
          href={site.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn <span className="arr">↗</span>
        </a>
        <a className="btn btn-ghost btn-sound" href={site.socials.github} target="_blank" rel="noopener noreferrer">
          GitHub <span className="arr">↗</span>
        </a>
      </div>
    </section>
  );
}
