type RuneProps = {
  symbol: "dazbog" | "tecza" | "sila" | "perun" | "mir";
  className?: string;
  style?: React.CSSProperties;
};

export function Rune({ symbol, className = "", style }: RuneProps) {
  return (
    <div className={`rune ${className}`} style={style}>
      <svg className="rg" viewBox="0 0 24 44" aria-hidden="true">
        <use href={`#r-${symbol}`} />
      </svg>
    </div>
  );
}
