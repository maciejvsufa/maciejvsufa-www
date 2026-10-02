/** Przycisk główny jak w szablonie Makro: limonkowy kwadrat ze strzałką + grafitowa pigułka. */
export function Cta({ href, label }: { href: string; label: string }) {
  return (
    <a className="cta" href={href}>
      <span className="cta-arrow" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="cta-label">{label}</span>
    </a>
  );
}
