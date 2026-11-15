export type Reel = {
  img: string;
  title: string;
  date: string;
  /** Tylko gdy jest pomiar. Bez liczby nie pokazujemy wyświetleń. */
  views?: number;
  /** Link do opublikowanej rolki. Bez linku okładka zostaje obrazem. */
  href?: string;
};

const nf = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Trzy okładki wielkości telefonu. Klikalna jest tylko rolka, do której mamy adres. */
export function ReelRow({ reels, viewsWord }: { reels: Reel[]; viewsWord: string }) {
  return (
    <div className="reel-row">
      {reels.map((r) => {
        const views = r.views ? `${nf(r.views)} ${viewsWord}` : null;
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
            {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, okładka 180×320 */}
            <img src={r.img} alt="" width={180} height={320} />
            {r.href ? (
              <span className="reel-play" aria-hidden="true">
                <i />
              </span>
            ) : null}
          </span>
        );
        if (r.href) {
          const name = views ? `${r.title}. ${r.date}. ${views}.` : `${r.title}. ${r.date}.`;
          return (
            <a key={r.img} className="reel" href={r.href} target="_blank" rel="noopener noreferrer" aria-label={name}>
              {frame}
              {caption}
            </a>
          );
        }
        return (
          <figure key={r.img} className="reel">
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
