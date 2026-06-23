import Image from "next/image";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";

const PORTRAIT = "/portrait.png";

export function Hero() {
  return (
    <section aria-label="Wprowadzenie" className="relative overflow-hidden">
      {/* siatka kropek (dekoracja) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
          opacity: 0.18,
        }}
      />
      {/* fioletowa poświata */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[40px] top-[40px] h-[560px] w-[560px] animate-[floatGlow_12s_ease-in-out_infinite] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-rgb),0.16), transparent 68%)",
        }}
      />

      <div className="pad-x relative mx-auto grid min-h-[720px] max-w-[1180px] grid-cols-1 items-center gap-8 py-20 md:grid-cols-[0.82fr_1.18fr] max-[720px]:py-14">
        {/* lewa: treść */}
        <div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[12px] text-accent">
            <span className="h-2 w-2 animate-[pulseDot_1.8s_ease-in-out_infinite] rounded-full bg-accent" />
            {hero.badge}
          </div>

          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(40px,6vw,76px)] font-semibold leading-[0.98] tracking-[-0.03em] text-text">
            {hero.h1}
          </h1>

          <p className="mt-6 max-w-[52ch] rounded-[14px] border border-border bg-surface/80 px-[18px] py-[14px] text-[clamp(15px,1.4vw,18px)] leading-[1.6] text-text2">
            {hero.subhead}
          </p>

          <p className="mt-4 font-mono text-[13px] text-text3">{hero.en}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projekty"
              className="rounded-xl bg-accent px-6 py-3.5 font-medium text-ink no-underline transition-colors hover:bg-accent2"
            >
              Zobacz projekty ↓
            </a>
            <a
              href="/cv/Maciej_Sufa_CV.pdf"
              className="rounded-xl border border-border px-6 py-3.5 font-medium text-text no-underline transition-colors hover:border-accent"
            >
              Pobierz CV
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-6 font-mono text-[13px] text-text3">
            <a className="transition-colors hover:text-accent" href={site.socials.github} target="_blank" rel="noopener noreferrer">
              ↗ GitHub
            </a>
            <a className="transition-colors hover:text-accent" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
              ↗ LinkedIn
            </a>
            <a className="transition-colors hover:text-accent" href={`mailto:${site.email}`}>
              ↗ {site.email}
            </a>
          </div>
        </div>

        {/* prawa: portret — desktop = cząsteczki three.js, mobile = statyczne zdjęcie */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[680px]">
          {/* zdjęcie WKOMPONOWANE: krawędzie wtopione w tło maską (nie „doklejona” płytka) */}
          <Image
            src={PORTRAIT}
            alt="Maciej Sufa"
            fill
            sizes="(max-width: 720px) 85vw, 600px"
            priority
            className="object-cover [filter:contrast(1.04)_saturate(0.92)_brightness(0.96)]"
            style={{
              maskImage:
                "radial-gradient(78% 86% at 50% 40%, #000 48%, transparent 86%)",
              WebkitMaskImage:
                "radial-gradient(78% 86% at 50% 40%, #000 48%, transparent 86%)",
            }}
          />
          {/* dolne wtopienie w czerń strony — usuwa twardą krawędź u dołu */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 52%, var(--bg) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
