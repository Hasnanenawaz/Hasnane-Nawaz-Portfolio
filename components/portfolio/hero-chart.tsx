"use client";

import { useEffect, useRef } from "react";

function countUp(el: HTMLElement, reduce: boolean) {
  if (el.dataset.done) return;
  el.dataset.done = "1";
  const target = parseFloat(el.dataset.target ?? "0");
  const dec = parseInt(el.dataset.dec ?? "0", 10);
  const suf = el.dataset.suf ?? "";
  if (reduce) { el.textContent = target.toFixed(dec) + suf; return; }
  let start: number | null = null;
  const step = (t: number) => {
    if (!start) start = t;
    const p = Math.min((t - start) / 1500, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toFixed(dec) + suf;
  };
  requestAnimationFrame(step);
}

export function HeroChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<SVGPathElement>(null);
  const runnerRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chart = chartRef.current;
    const curve = curveRef.current;
    const runner = runnerRef.current;
    if (!chart || !curve) return;

    const len = curve.getTotalLength();
    curve.style.strokeDasharray = String(len);
    curve.style.strokeDashoffset = reduce ? "0" : String(len);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          chart.classList.add("in");
          // Count up all .count spans in the chart area
          chart.querySelectorAll<HTMLElement>(".count").forEach((el) => countUp(el, reduce));
          chart.querySelectorAll<HTMLElement>(".node").forEach((n, i) => {
            n.style.animationDelay = `${1.0 + i * 0.22}s`;
          });
          if (!reduce && runner) {
            const RD = 2600;
            let t0: number | null = null;
            const travel = (ts: number) => {
              if (!t0) t0 = ts;
              const p = ((ts - t0) % RD) / RD;
              const pt = curve.getPointAtLength(p * len);
              runner.setAttribute("cx", String(pt.x));
              runner.setAttribute("cy", String(pt.y));
              requestAnimationFrame(travel);
            };
            setTimeout(() => requestAnimationFrame(travel), 1800);
          }
          io.unobserve(e.target);
        });
      },
      { threshold: 0.3 }
    );

    io.observe(chart);
    return () => io.disconnect();
  }, []);

  return (
    <div>
      {/* SVG chart with inline labels (hidden on mobile via CSS) */}
      <div className="chart" id="chart" ref={chartRef}>
        <svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="g-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16623E" stopOpacity=".24" />
              <stop offset="100%" stopColor="#16623E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="g-line" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#16623E" />
              <stop offset="60%" stopColor="#2C7D8C" />
              <stop offset="100%" stopColor="#A9D820" />
            </linearGradient>
          </defs>
          <line className="grid-l" x1="0" y1="75" x2="400" y2="75" />
          <line className="grid-l" x1="0" y1="150" x2="400" y2="150" />
          <line className="grid-l" x1="0" y1="225" x2="400" y2="225" />
          <path
            className="area"
            d="M30,248 C110,232 135,182 168,165 C215,148 238,112 262,95 C312,62 332,52 352,40 L352,300 L30,300 Z"
          />
          <path
            className="curve"
            ref={curveRef}
            d="M30,248 C110,232 135,182 168,165 C215,148 238,112 262,95 C312,62 332,52 352,40"
          />
          <circle className="runner" ref={runnerRef} r={5} cx={30} cy={248} />
        </svg>

        {/* Node 1 — bottom-left, label BELOW (default) */}
        <div className="node" style={{ left: "7%", top: "83%" }}>
          <div className="pt" />
          <div className="num">
            <span className="count" data-target="2.5" data-dec="1" data-suf="+">0</span>
          </div>
          <div className="cap">years in growth</div>
        </div>

        {/* Node 2 — label ABOVE to avoid overlapping curve */}
        <div className="node above" style={{ left: "42%", top: "55%" }}>
          <div className="pt" />
          <div className="num">
            <span className="count" data-target="50" data-suf="k+">0</span>
          </div>
          <div className="cap">members scaled</div>
        </div>

        {/* Node 3 — label ABOVE to avoid overlapping curve */}
        <div className="node above" style={{ left: "66%", top: "32%" }}>
          <div className="pt" />
          <div className="num">
            <span className="count" data-target="300" data-suf="%">0</span>
          </div>
          <div className="cap">community growth</div>
        </div>

        {/* Node 4 — top-right, label BELOW */}
        <div className="node peak" style={{ left: "84%", top: "14%" }}>
          <div className="pt" />
          <div className="num">
            <span className="count" data-target="7" data-suf="x+">0</span>
          </div>
          <div className="cap">revenue jump</div>
        </div>
      </div>

      {/* Mobile fallback: 2×2 stat grid (chart labels hidden on small screens) */}
      <div className="chart-stats">
        <div className="cs-item">
          <span className="cs-big">2.5+</span>
          <span className="cs-cap">Years in growth</span>
        </div>
        <div className="cs-item">
          <span className="cs-big">50k+</span>
          <span className="cs-cap">Members scaled</span>
        </div>
        <div className="cs-item">
          <span className="cs-big">300%</span>
          <span className="cs-cap">Community growth</span>
        </div>
        <div className="cs-item">
          <span className="cs-big">7x+</span>
          <span className="cs-cap">Revenue jump</span>
        </div>
      </div>
    </div>
  );
}
