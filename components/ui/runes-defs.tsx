/** Definicje run słowiańskich — wspólne symbole SVG. */
export function RunesDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="r-dazbog" viewBox="0 0 24 44">
          <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M9 4 V40" />
            <path d="M9 11 L18.5 5" />
            <path d="M9 21 L18.5 15" />
          </g>
        </symbol>
        <symbol id="r-tecza" viewBox="0 0 24 44">
          <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M8 4 V40" />
            <path d="M8 4 C19 6 19 19 8 21" />
            <path d="M8 21 L18 40" />
          </g>
        </symbol>
        <symbol id="r-sila" viewBox="0 0 24 44">
          <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 5 L9 18 L17 26 L9 39" />
          </g>
        </symbol>
        <symbol id="r-perun" viewBox="0 0 24 44">
          <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 4 V40" />
            <path d="M9 6 H19" />
            <path d="M19 6 L9 19" />
          </g>
        </symbol>
        <symbol id="r-mir" viewBox="0 0 24 44">
          <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M12 8 V40" />
            <path d="M12 16 L4 8" />
            <path d="M12 16 L20 8" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}
