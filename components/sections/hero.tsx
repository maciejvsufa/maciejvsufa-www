import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";

/** Hero w stylu Syntax CV: imię dużym krojem, rola pisana litera po literze, liczby, cytat. */
export function Hero({ t }: { t: SiteContent }) {
  const h = t.hero;
  return (
    <section aria-label={h.aria}>
      <div className="hero-grid">
        <div>
          <p className="font-mono text-[13px] text-text3">{h.place}</p>
          <h1 className="hero-name mt-5">
            {h.first}{" "}
            <br />
            <span className="dim">{h.last}</span>
          </h1>
          {/* Litery to dekoracja (aria-hidden); czytnik ekranu dostaje całą rolę z sr-only. */}
          <p className="mt-6 text-[clamp(17px,2.2vw,21px)] font-medium text-accent">
            <span className="sr-only">{h.role}</span>
            <span className="typed" aria-hidden="true">
              {Array.from(h.role).map((ch, i) => (
                <span key={i} className="ch" style={{ "--i": i } as React.CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          </p>
        </div>

        <div className="hero-photo mx-auto md:mx-0">
          <picture>
            <source media="(max-width: 720px)" srcSet="/portrait-cutout-480.webp" type="image/webp" />
            <source srcSet="/portrait-cutout.webp" type="image/webp" />
            <img
              src="/portrait-cutout-800.png"
              alt={h.photoAlt}
              width={800}
              height={995}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-border py-6">
        {h.stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse justify-end">
            <dt className="mt-1 font-mono text-[12.5px] text-text3">{s.label}</dt>
            <dd className="stat-value">{s.value}</dd>
          </div>
        ))}
      </dl>

      <blockquote className="quote mt-10 max-w-[40ch]">
        {h.quoteBefore}
        <em>{h.quoteEm}</em>
        {h.quoteAfter}
      </blockquote>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a className="btn btn-primary" href={`mailto:${site.email}`}>
          {t.ui.heroCtaPrimary} <span className="arr">↗</span>
        </a>
        <a className="btn btn-ghost" href={t.ui.cvHref}>
          {t.ui.heroCtaCv} <span className="arr">↓</span>
        </a>
      </div>
    </section>
  );
}
