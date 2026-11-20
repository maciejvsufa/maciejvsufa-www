export type Reel = {
  img?: string;
  title: string;
  /** Angielski podpis haka. Tylko EN — bez tego pola podpis zostaje po polsku. */
  titleEn?: string;
  date: string;
  /** Tylko gdy jest pomiar. Bez liczby nie pokazujemy wyświetleń. */
  views?: number;
  /** Gotowy podpis liczby, gdy sam format „n wyświetleń” nie wystarcza. */
  viewsText?: string;
  /** Link do opublikowanej rolki. Bez linku okładka zostaje obrazem. */
  href?: string;
  /** Napis w ramce, gdy nie ma pliku okładki. */
  frameLabel?: string;
};

const nf = (n: number, lang: "pl" | "en") =>
  lang === "en" ? n.toLocaleString("en-US") : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Trzy okładki wielkości telefonu. Każda z adresem jest linkiem. */
export function ReelRow({ reels, viewsWord, lang = "pl" }: { reels: Reel[]; viewsWord: string; lang?: "pl" | "en" }) {
  return (
    <div className="reel-row">
      {reels.map((r) => {
        const views = r.viewsText ?? (r.views ? `${nf(r.views, lang)} ${viewsWord}` : null);
        const alt = r.titleEn ? `${r.title} ${r.titleEn}` : r.title;
        const captionBody = (
          <>
            <b>{r.title}</b>
            {r.titleEn ? <span className="reel-en">{r.titleEn}</span> : null}
            <small>
              {r.date}
              {views ? ` · ${views}` : ""}
            </small>
          </>
        );
        const frame = (
          <span className="reel-frame">
            {r.img ? (
              // eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, okładka 180×320
              <img src={r.img} alt={alt} width={180} height={320} />
            ) : (
              <span className="reel-fallback">{r.frameLabel}</span>
            )}
            {r.href ? (
              <span className="reel-play" aria-hidden="true">
                <i />
              </span>
            ) : null}
          </span>
        );
        const key = r.href ?? r.title;
        if (r.href) {
          const titled = r.title.replace(/[. ]+$/, "");
          const gloss = r.titleEn ? ` ${r.titleEn}` : "";
          const name = views ? `${titled}.${gloss} ${r.date}. ${views}.` : `${titled}.${gloss} ${r.date}.`;
          return (
            <a key={key} className="reel" href={r.href} target="_blank" rel="noopener noreferrer" aria-label={name}>
              {frame}
              <span className="reel-cap">{captionBody}</span>
            </a>
          );
        }
        return (
          <figure key={key} className="reel">
            {frame}
            <figcaption className="reel-cap">{captionBody}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
