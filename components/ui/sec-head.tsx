/** Nagłówek sekcji w stylu szablonu: „01. o mnie”. */
export function SecHead({ id, num, title }: { id: string; num: string; title: string }) {
  return (
    <h2 id={id} className="sec-head">
      <span className="num">{num}.</span>
      <span>{title}</span>
    </h2>
  );
}
