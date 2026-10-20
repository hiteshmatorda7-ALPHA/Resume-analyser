"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { icons } from "../Icons";

const rnd = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const short = (n) => (n >= 1e5 ? "₹" + (n / 1e5).toFixed(1) + "L" : n >= 1e3 ? "₹" + Math.round(n / 1e3) + "k" : "₹" + n);

function series(range) {
  const r = rnd(range === "7D" ? 7 : range === "30D" ? 30 : 12);
  const n = range === "7D" ? 7 : range === "30D" ? 30 : 12;
  const base = range === "12M" ? 640000 : 22000;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  return Array.from({ length: n }, (_, i) => {
    const trend = 1 + i / n * 0.35;
    const weekend = range !== "12M" && i % 7 >= 5 ? 1.3 : 1;
    return { label: range === "7D" ? days[i] : range === "30D" ? `${i + 1} Sep` : months[i], v: base * trend * weekend * (0.85 + r() * 0.3) };
  });
}

const PRODUCTS = [["Organic honey 500g", 312], ["Cold-pressed oil 1L", 248], ["Millet muesli", 196], ["Green tea pack", 141], ["Dry-fruit box", 97]];
const NAMES = ["Anjali, Patiala", "Rohit, Mohali", "Simran, Rajpura", "Karan, Ludhiana", "Neha, Chandigarh", "Vikram, Ambala"];

function LineChart({ data }) {
  const [hover, setHover] = useState(null);
  const ref = useRef(null);
  const W = 560, H = 210, P = { l: 44, r: 10, t: 10, b: 26 };
  const max = Math.max(...data.map((d) => d.v)) * 1.1;
  const x = (i) => P.l + (i / (data.length - 1)) * (W - P.l - P.r);
  const y = (v) => H - P.b - (v / max) * (H - P.t - P.b);
  const path = data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.v).toFixed(1)}`).join("");
  const area = `${path}L${x(data.length - 1)},${H - P.b}L${x(0)},${H - P.b}Z`;
  const ticks = [0, 0.5, 1].map((f) => max * f / 1.1);
  const every = Math.ceil(data.length / 7);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - P.l) / (W - P.l - P.r)) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };

  return (
    <div className="chart-wrap">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Revenue over time" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        <defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e4fd6" stopOpacity=".16" /><stop offset="1" stopColor="#1e4fd6" stopOpacity="0" /></linearGradient></defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="#e6eaf0" />
            <text x={P.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#6b7686">{short(t)}</text>
          </g>
        ))}
        {data.map((d, i) => i % every === 0 && <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="#6b7686">{d.label}</text>)}
        <path d={area} fill="url(#ar)" />
        <path d={path} fill="none" stroke="#1e4fd6" strokeWidth="2" strokeLinejoin="round" />
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="#0d1b2a" strokeDasharray="3 3" strokeOpacity=".4" />
            <circle cx={x(hover)} cy={y(data[hover].v)} r="5" fill="#1e4fd6" stroke="#fff" strokeWidth="2" />
          </g>
        )}
        <rect x={P.l} y={P.t} width={W - P.l - P.r} height={H - P.t - P.b} fill="transparent" />
      </svg>
      {hover !== null && (
        <div className="tip" style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(data[hover].v) / H) * 100}%` }}>
          <b>{data[hover].label}</b> · {inr(data[hover].v)}
        </div>
      )}
    </div>
  );
}

export default function DashboardDemo() {
  const [range, setRange] = useState("30D");
  const data = useMemo(() => series(range), [range]);
  const total = data.reduce((a, d) => a + d.v, 0);
  const [feed, setFeed] = useState(() => NAMES.slice(0, 3).map((n, i) => ({ id: i, n, amt: 600 + i * 430, ago: `${(i + 1) * 2} min ago` })));
  const [live, setLive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setFeed((f) => [{ id: Date.now(), n: NAMES[Math.floor(Math.random() * NAMES.length)], amt: 300 + Math.round(Math.random() * 2400), ago: "just now" }, ...f].slice(0, 4));
      setLive((l) => l + 1);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const maxP = PRODUCTS[0][1];
  const orders = Math.round(total / 820) + live;

  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <div><b style={{ fontFamily: "var(--font-head)", fontSize: "1.1rem" }}>GreenLeaf Organics</b> <span className="muted" style={{ fontSize: ".9rem" }}>· sales dashboard</span></div>
        <div className="seg">{["7D", "30D", "12M"].map((r) => <button key={r} aria-pressed={range === r} onClick={() => setRange(r)}>{r}</button>)}</div>
      </div>
      <div className="kpis">
        <div className="kpi"><span>Revenue</span><b>{short(total)}</b><em>▲ 18% vs last period</em></div>
        <div className="kpi"><span>Orders</span><b>{orders.toLocaleString("en-IN")}</b><em>▲ 12%</em></div>
        <div className="kpi"><span>Avg. order value</span><b>{inr(total / orders)}</b><em>▲ 5%</em></div>
        <div className="kpi"><span>Repeat customers</span><b>38%</b><em>▲ 4 pts</em></div>
      </div>
      <div className="dash-grid">
        <div className="card">
          <h4>Revenue <span className="muted" style={{ fontWeight: 400, fontSize: ".82rem" }}>hover the chart</span></h4>
          <LineChart data={data} />
        </div>
        <div className="card">
          <h4>Top products <span className="muted" style={{ fontWeight: 400, fontSize: ".82rem" }}>units</span></h4>
          <div className="hbar">
            {PRODUCTS.map(([n, v]) => (
              <div key={n} title={`${n}: ${v} units`}><span><span>{n}</span><b>{v}</b></span><i style={{ width: `${(v / maxP) * 100}%` }} /></div>
            ))}
          </div>
        </div>
      </div>
      <div className="dash-grid">
        <div className="insight" style={{ marginTop: 0 }}>
          <span className="ico">{icons.sparkle}</span>
          <div><b>AI insight:</b> Weekend sales are 30% higher than weekdays, and honey buyers often add muesli. Try a Saturday combo offer — estimated +₹18k/month.</div>
        </div>
        <div className="card">
          <h4>Live orders <span style={{ color: "var(--green)", fontSize: ".8rem" }}>● live</span></h4>
          <div className="feed" aria-live="off">
            {feed.map((o) => <div key={o.id}><span>{o.n}</span><b>{inr(o.amt)}</b><span className="muted">{o.ago}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
