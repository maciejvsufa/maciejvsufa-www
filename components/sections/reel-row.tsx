export type Reel = {
  img?: string;
  title: string;
  date: string;
  /** Tylko gdy jest pomiar. Bez liczby nie pokazujemy wyświetleń. */
  views?: number;
  /** Gotowy podpis liczby, gdy sam format „n wyświetleń” nie wystarcza. */
  viewsText?: string;
  /** Link do opublikowanej rolki. Bez linku okładka zostaje obrazem. */
  href?: string;
  /** Napis w ramce, gdy nie ma pliku okładki. */
  frameLabel?: string;
  /** Druga linia w ramce, pod liczbą. Np. „udostępnień”. */
  frameNote?: string;
  /** Kadr okładki, gdy domyślne przycięcie ucina twarz. */
  imgPos?: string;
};

const nf = (n: number, lang: "pl" | "en") =>
  lang === "en" ? n.toLocaleString("en-US") : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Trzy okładki wielkości telefonu. Każda z adresem jest linkiem. */
export function ReelRow({ reels, viewsWord, lang = "pl" }: { reels: Reel[]; viewsWord: string; lang?: "pl" | "en" }) {
  return (
    <div className="reel-row">
      {reels.map((r) => {
        const views = r.viewsText ?? (r.views ? `${nf(r.views, lang)} ${viewsWord}` : null);
        const caption = (
          <span className="reel-cap">
            <b>{r.title}</b>
            <small>
              {r.date}
              {views ? ` · ${views}` : ""}
            </small>
          </span>
        );
        const frame = (
          <span className="reel-frame">
            {r.img ? (
              // eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, okładka 180×320
              <img src={r.img} alt={r.title} width={180} height={320} style={r.imgPos ? { objectPosition: r.imgPos } : undefined} />
            ) : (
              <span className="reel-fallback">
                {r.frameLabel}
                {r.frameNote ? <small>{r.frameNote}</small> : null}
              </span>
            )}
            {r.href ? (
              <span className="reel-play" aria-hidden="true">
                <i />
              </span>
            ) : null}
          </span>
        );
        const key = `${r.href ?? ""}-${r.frameLabel ?? r.title}`;
        if (r.href) {
          const titled = r.title.replace(/[. ]+$/, "");
          const name = views ? `${titled}. ${r.date}. ${views}.` : `${titled}. ${r.date}.`;
          return (
            <a key={key} className="reel" href={r.href} target="_blank" rel="noopener noreferrer" aria-label={name}>
              {frame}
              {caption}
            </a>
          );
        }
        return (
          <figure key={key} className="reel">
            {frame}
            <figcaption className="reel-cap">
              <b>{r.title}</b>
              <small>
                {r.date}
                {views ? ` · ${views}` : ""}
              </small>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
