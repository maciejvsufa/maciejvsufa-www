import type { SiteContent } from "@/lib/content";
import { FitText } from "@/components/fx/fit-text";
import { SplitText } from "@/components/fx/split-text";

/**
 * Tło hero: zdjęcie na cały ekran, stałe (przewijana treść jedzie po nim), czarno-białe.
 * Wejście: skala 1.2 → 1 przez 3 s (jak w szablonie).
 */
export function HeroBackdrop({ alt }: { alt: string }) {
  return (
    <div className="hero-bg">
      <picture>
        <source media="(max-width: 809px)" srcSet="/hero-bw-800.webp" type="image/webp" />
        <img src="/hero-bw.webp" alt={alt} width={1254} height={1254} fetchPriority="high" decoding="async" />
      </picture>
    </div>
  );
}

/** Pierwszy ekran: miętowe liczby, wielkie imię, rola na dole, cytat wersalikami w kolumnie 75%. */
export function Hero({ t }: { t: SiteContent }) {
  const h = t.hero;
  return (
    <section aria-label={h.aria} className="hero" id="top">
      <SplitText as="p" text={h.quote.toUpperCase()} by="word" trigger="mount" start={2} stagger={0.075} className="hero-quote" />

      <div className="hero-main">
        <p className="hero-stats">
          {h.stats.map((s) => (
            <span key={s} className="block">
              {s}
            </span>
          ))}
        </p>
        <div className="hero-name-box">
          <FitText as="h1" lines={h.nameLines} align="right" className="hero-name" />
        </div>
        <SplitText as="p" text={h.roleLine} by="word" trigger="mount" start={0.5} stagger={0.075} className="hero-role" />
      </div>
    </section>
  );
}
