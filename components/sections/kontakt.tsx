import { Reveal } from "@/components/ui/reveal";
import { kontakt } from "@/lib/content";
import { site } from "@/lib/site";

export function Kontakt() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="pad-x mx-auto max-w-[1180px] py-24">
      <Reveal>
        <p className="font-mono text-[13px] text-accent">{kontakt.kicker} — kontakt</p>
        <h2 id="kontakt-title" className="mt-2 font-display text-[clamp(32px,4.4vw,56px)] font-semibold tracking-[-0.02em] text-text">
          {kontakt.title}
        </h2>
        <p className="mt-4 max-w-[58ch] leading-[1.6] text-text2">{kontakt.lead}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-xl bg-accent px-6 py-3.5 font-medium text-ink no-underline transition-colors hover:bg-accent2"
          >
            ✉ {site.email}
          </a>
          <a
            href="/cv/Maciej_Sufa_CV.pdf"
            className="rounded-xl border border-border px-6 py-3.5 font-medium text-text no-underline transition-colors hover:border-accent"
          >
            Pobierz CV
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border px-6 py-3.5 font-medium text-text no-underline transition-colors hover:border-accent"
          >
            LinkedIn ↗
          </a>
        </div>
      </Reveal>
    </section>
  );
}
