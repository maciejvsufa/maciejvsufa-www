import Image from "next/image";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";
import { Rune } from "@/components/ui/rune";

const PORTRAIT = "/portrait-cutout.png";

export function Hero() {
  return (
    <section
      aria-label="Wprowadzenie"
      className="sheet-section hero grid min-h-[88vh] grid-cols-1 items-center gap-8 pt-[clamp(120px,14vw,180px)] md:grid-cols-[0.84fr_1.16fr] md:gap-[34px]"
    >
      <div>
        <div className="badge inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/70 px-[13px] py-1.5 font-mono text-[12px] text-accent">
          <span className="h-2 w-2 animate-[pulseDot_1.8s_ease-in-out_infinite] rounded-full bg-accent" />
          {hero.badge}
        </div>

        <h1 className="mt-[22px] max-w-[18ch] font-display text-[clamp(40px,5.6vw,74px)] font-semibold leading-[0.99] tracking-[-0.03em]">
          {hero.h1}
        </h1>

        <p className="mt-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-accent">{hero.enTitle}</p>

        <p className="mt-6 max-w-[52ch] rounded-[14px] border border-border bg-surface/66 px-[18px] py-[15px] text-[clamp(15px,1.3vw,17px)] leading-[1.62] text-text2">
          {hero.subhead}
        </p>

        <p className="mt-4 font-mono text-[13px] text-text3">{hero.en}</p>

        <div className="mt-[30px] flex flex-wrap items-center gap-3.5">
          <a className="btn btn-primary btn-sound" href="#co-robie">
            Zobacz, co robię <span className="arr">↓</span>
          </a>
          <a className="btn btn-ghost btn-sound" href="/cv/Maciej_Sufa_CV.pdf">
            Pobierz CV <span className="arr">↗</span>
          </a>
        </div>

        <div className="mt-[26px] flex flex-wrap gap-[22px] font-mono text-[13px] text-text3">
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

      <div className="portrait-wrap relative mx-auto aspect-[4/5] w-full max-w-[660px] overflow-hidden">
        <Image
          src={PORTRAIT}
          alt="Maciej Sufa"
          fill
          sizes="(max-width: 720px) 85vw, 660px"
          priority
          className="object-contain object-bottom [filter:contrast(1.04)_saturate(0.94)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 52%, rgba(8,8,10,0.55) 78%, var(--bg) 100%)",
          }}
        />
        <Rune symbol="dazbog" style={{ left: "1%", top: "44%" }} />
        <Rune symbol="perun" style={{ right: "0.5%", top: "30%" }} />
        <Rune symbol="tecza" style={{ left: "9%", bottom: "5%" }} />
      </div>
    </section>
  );
}
