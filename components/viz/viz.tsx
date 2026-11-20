import type { CSSProperties } from "react";
import type { Viz as VizData } from "@/lib/content";

/*
 * Infografiki w stylu szablonu Makro: biały widżet „aplikacji” pływający nad rozmytym tłem.
 * Wejście animuje CSS, gdy karta-rodzic staje się aktywna (.scene-item[data-state="active"]):
 * słupki rosną, linia się rysuje, kroki i dymki pojawiają się po kolei (--i = kolejność).
 */

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function Head({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="w-head">
      <span className="w-title">{title}</span>
      {badge ? <span className="w-badge">{badge}</span> : null}
    </div>
  );
}

function Line({ v }: { v: Extract<VizData, { type: "line" }> }) {
  const W = 300;
  const H = 110;
  const max = Math.max(...v.points);
  const min = Math.min(...v.points);
  const xy = v.points.map((p, k) => [(k / (v.points.length - 1)) * W, 10 + (1 - (p - min) / Math.max(1e-6, max - min)) * (H - 24)]);
  const d = xy.map(([x, y], k) => {
    if (k === 0) return `M${x},${y}`;
    const [px, py] = xy[k - 1];
    const cx = (px + x) / 2;
    return `C${cx},${py} ${cx},${y} ${x},${y}`;
  }).join(" ");
  const yAt = (x: number) => {
    const k = Math.min(xy.length - 2, Math.floor((x / W) * (xy.length - 1)));
    const [x0, y0] = xy[k];
    const [x1, y1] = xy[k + 1];
    const t = (x - x0) / (x1 - x0);
    const s = t * t * (3 - 2 * t);
    return y0 + (y1 - y0) * s;
  };
  const ticks = Array.from({ length: 38 }, (_, k) => 4 + k * 8);
  return (
    <>
      <Head title={v.title} badge={v.badge} />
      <p className="w-value">{v.value}</p>
      <div className="w-chart">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          {ticks.map((x) => (
            <line key={x} x1={x} x2={x} y1={yAt(x)} y2={H} className="w-tick" />
          ))}
          <path d={d} className="w-line" pathLength={1} />
        </svg>
        {v.axis.length ? (
          <div className="w-axis">
            {v.axis.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
        ) : null}
      </div>
      {v.foot.length ? (
        <div className="w-foot">
          {v.foot.map(([k, val]) => (
            <span key={k}>
              <small>{k}</small>
              {val}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}

function Bars({ v }: { v: Extract<VizData, { type: "bars" }> }) {
  const max = Math.max(...v.bars);
  return (
    <>
      <Head title={v.title} badge={v.badge} />
      <p className="w-value">{v.value}</p>
      <div className="w-bars">
        {v.bars.map((b, k) => (
          <span key={k} className="w-bar-col">
            <span className={`w-bar${k === v.bars.length - 1 ? " is-hi" : ""}`} style={{ ...i(k), height: `${(b / max) * 100}%` }} />
            <small>{v.axis[k]}</small>
          </span>
        ))}
      </div>
    </>
  );
}

function List({ v }: { v: Extract<VizData, { type: "list" }> }) {
  return (
    <>
      <Head title={v.title} />
      <ul className="w-list">
        {v.rows.map((r, k) => (
          <li key={r.t} style={i(k)}>
            <span className="w-row-t">
              {r.t}
              {r.s ? <small>{r.s}</small> : null}
            </span>
            <span className={`w-pill is-${r.tone}`}>
              <i aria-hidden="true" />
              {r.pill}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Progress({ v }: { v: Extract<VizData, { type: "progress" }> }) {
  return (
    <>
      <Head title={v.title} />
      <ul className="w-prog">
        {v.rows.map((r, k) => (
          <li key={r.t}>
            <span className="w-prog-top">
              <span>{r.t}</span>
              <b>{r.p}%</b>
            </span>
            <span className="w-prog-track">
              <span className={r.p === 100 ? "is-done" : ""} style={{ ...i(k), width: `${r.p}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <p className="w-gate">
        <i aria-hidden="true">✓</i>
        {v.gate}
      </p>
    </>
  );
}

function Flow({ v }: { v: Extract<VizData, { type: "flow" }> }) {
  return (
    <>
      <Head title={v.title} />
      <ol className="w-flow">
        {v.steps.map((s, k) => (
          <li key={s} style={i(k)}>
            <span className="w-flow-dot" aria-hidden="true">
              ✓
            </span>
            {s}
          </li>
        ))}
      </ol>
      <p className="w-status">
        <i aria-hidden="true" />
        {v.status}
      </p>
    </>
  );
}

function Calendar({ v }: { v: Extract<VizData, { type: "calendar" }> }) {
  return (
    <>
      <Head title={v.title} />
      <div className="w-cal">
        {v.days.map((d, k) => {
          const item = v.items.find(([day]) => day === k);
          return (
            <span key={d} className="w-cal-day" style={i(k)}>
              <small>{d}</small>
              {item ? <span className={`w-cal-chip c-${k % 3}`}>{item[1]}</span> : <span className="w-cal-empty" />}
            </span>
          );
        })}
      </div>
    </>
  );
}

/** Planer jak w Later / Metricool: dwa tygodnie, prawdziwe okładki, wyświetlenia albo godzina publikacji. */
function Planner({ v }: { v: Extract<VizData, { type: "planner" }> }) {
  const cells = Array.from({ length: 14 }, (_, k) => v.start + k);
  const nf = (n: string) => Number(n).toLocaleString("pl-PL");
  return (
    <>
      <Head title={v.title} badge={v.range} />
      <div className="w-plan">
        {v.days.map((d) => (
          <span key={d} className="w-plan-dow">
            {d}
          </span>
        ))}
        {cells.map((day, k) => {
          const it = v.items.find((x) => x.day === day);
          return (
            <span key={day} className={`w-plan-cell${it ? ` is-${it.state}` : ""}`} style={i(k)}>
              <small className="w-plan-n">{day}</small>
              {it ? (
                <span className="w-plan-post" title={it.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, okładka 180×320 */}
                  <img src={it.img} alt={it.label} width={180} height={320} loading="lazy" decoding="async" />
                  {it.more ? <b className="w-plan-more">+{it.more}</b> : null}
                  <em className="w-plan-meta">
                    {it.state === "pub" && it.meta && Number.isFinite(Number(it.meta)) ? (
                      <>
                        <svg width="7" height="8" viewBox="0 0 7 8" aria-hidden="true">
                          <path d="M0 0l7 4-7 4z" fill="currentColor" />
                        </svg>
                        {nf(it.meta)}
                      </>
                    ) : (
                      it.meta
                    )}
                  </em>
                </span>
              ) : (
                <span className="w-plan-empty" />
              )}
            </span>
          );
        })}
      </div>
      <div className="w-plan-legend">
        <span>
          <i className="dot pub" />
          {v.legend[0]}
        </span>
        <span>
          <i className="dot plan" />
          {v.legend[1]}
        </span>
      </div>
      <p className="w-plan-src">{v.source}</p>
    </>
  );
}

/** Trzy rolki: okładka, tytuł, data. Pasek i liczba tylko tam, gdzie jest pomiar wyświetleń. */
function Rank({ v }: { v: Extract<VizData, { type: "rank" }> }) {
  const max = Math.max(1, ...v.rows.map((r) => r.views ?? 0));
  const nf = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (
    <>
      <Head title={v.title} />
      <ul className="w-rank">
        {v.rows.map((r, k) => (
          <li key={r.img} style={i(k)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, okładka 180×320 */}
            <img src={r.img} alt={r.title} width={180} height={320} />
            <span className="w-rank-t">
              <span className="w-rank-title">{r.title}</span>
              <small>{r.date}</small>
              {r.views ? (
                <span className="w-rank-bar" style={{ "--p": `${Math.round((r.views / max) * 100)}%` } as CSSProperties}>
                  <i />
                </span>
              ) : null}
            </span>
            {r.views ? <b className="w-rank-n">{nf(r.views)}</b> : null}
          </li>
        ))}
      </ul>
      <p className="w-plan-src">{v.source}</p>
    </>
  );
}

function Orbit({ v }: { v: Extract<VizData, { type: "orbit" }> }) {
  const n = v.nodes.length;
  return (
    <>
      <Head title={v.title} />
      <div className="w-orbit">
        <svg viewBox="0 0 200 110" aria-hidden="true" preserveAspectRatio="none">
          <path d="M10 100 Q100 -20 190 100" className="w-orbit-arc" />
        </svg>
        {v.nodes.map((node, k) => {
          const t = n === 1 ? 0.5 : k / (n - 1);
          const x = 5 + t * 90;
          const y = 88 - Math.sin(t * Math.PI) * 70;
          return (
            <span key={node} className="w-orbit-node" style={{ ...i(k), left: `${x}%`, top: `${y}%` }}>
              {node}
            </span>
          );
        })}
        <span className="w-orbit-center">
          <b>{v.center}</b>
          <small>{v.sub}</small>
        </span>
      </div>
    </>
  );
}

function Alert({ v }: { v: Extract<VizData, { type: "alert" }> }) {
  return (
    <div className="w-alert">
      <div className="w-alert-top">
        <span className="w-alert-ico" aria-hidden="true">
          !
        </span>
        <span>
          <b>{v.title}</b>
          <span>{v.text}</span>
          <small>{v.meta}</small>
        </span>
      </div>
      <div className="w-alert-bar">
        <span>{v.action}</span>
        <i aria-hidden="true">✓</i>
      </div>
    </div>
  );
}

function Call({ v }: { v: Extract<VizData, { type: "call" }> }) {
  return (
    <>
      <Head title={v.title} badge="●" />
      <ul className="w-call">
        {v.lines.map((l, k) => (
          <li key={k} className={`is-${l.who}`} style={i(k)}>
            {l.t}
          </li>
        ))}
      </ul>
      <p className="w-status" style={i(v.lines.length)}>
        <i aria-hidden="true" />
        {v.ticket}
      </p>
    </>
  );
}

/** Widżet bez ramki (np. do bento, gdzie tło daje kafel). */
export function VizBody({ v }: { v: VizData }) {
  switch (v.type) {
    case "line":
      return <Line v={v} />;
    case "bars":
      return <Bars v={v} />;
    case "list":
      return <List v={v} />;
    case "progress":
      return <Progress v={v} />;
    case "flow":
      return <Flow v={v} />;
    case "calendar":
      return <Calendar v={v} />;
    case "planner":
      return <Planner v={v} />;
    case "rank":
      return <Rank v={v} />;
    case "orbit":
      return <Orbit v={v} />;
    case "alert":
      return <Alert v={v} />;
    case "call":
      return <Call v={v} />;
    case "photo":
      return null;
  }
}

/** Panel wizualny kafla: rozmyte tło, dwa „duchy” widżetów w tle i główny widżet albo zdjęcie. */
export function VizPanel({ v, sample, tint = 0 }: { v: VizData; sample: string; tint?: number }) {
  if (v.type === "photo") {
    return (
      <div className={`tile-visual is-photo${v.contain ? " is-contain" : ""}`}>
        {v.contain && (
          // eslint-disable-next-line @next/next/no-img-element -- rozmyte tło pod zdjęciem
          <img className="photo-fill" src={v.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, plik już zoptymalizowany */}
        <img src={v.src} alt={v.alt} width={v.contain ? 800 : 640} height={v.contain ? 703 : 640} loading="lazy" decoding="async" />
      </div>
    );
  }
  return (
    <div className={`tile-visual tint-${tint % 3}`}>
      <span className="ghost g1" aria-hidden="true" />
      <span className="ghost g2" aria-hidden="true" />
      <div className={`viz viz-${v.type}`} aria-hidden="true">
        <VizBody v={v} />
      </div>
      <span className="tile-sample">{sample}</span>
    </div>
  );
}
