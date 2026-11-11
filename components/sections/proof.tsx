type Figure = { target: string; dec?: string; suf?: string; pre?: string };
type Stat = Figure & { cap: string; ember?: boolean; from?: Figure };

const stats: Stat[] = [
  { target: "2.5", dec: "1", suf: "+", cap: "Years in growth marketing" },
  { target: "50", suf: "k+", cap: "Community members scaled" },
  { target: "300", suf: "%", cap: "Legal community growth in 2 months" },
  { target: "7", suf: "x+", cap: "Revenue jump in 2 months", ember: true },
];

const metaStats: Stat[] = [
  { target: "20", suf: "+", cap: "Ad campaigns run at Stamp2Fly" },
  {
    from: { target: "4", pre: "₹", suf: "k" },
    target: "50",
    pre: "₹",
    suf: "k",
    cap: "Ad spend turned into revenue (two campaigns)",
  },
  { target: "12.5", dec: "1", suf: "x", cap: "Return on ad spend", ember: true },
  { from: { target: "110" }, target: "40", cap: "Leads → paying customers" },
];

function Count({ target, dec, suf = "", pre }: Figure) {
  return (
    <>
      {pre}
      <span className="count" data-target={target} data-dec={dec} data-suf={suf}>
        {target}{suf}
      </span>
    </>
  );
}

function StatGrid({ items }: { items: Stat[] }) {
  return (
    <div className="stats">
      {items.map((s, i) => (
        <div
          key={s.cap}
          className={`card stat lift rv${i > 0 ? ` rv-d${i}` : ""}${s.ember ? " ember" : ""}`}
        >
          <div className={`big${s.from ? " pair" : ""}`}>
            {s.from && (
              <>
                <Count {...s.from} />
                <span className="ar" aria-hidden="true"> → </span>
                <span className="sr-only"> to </span>
              </>
            )}
            <Count {...s} />
          </div>
          <div className="cap">{s.cap}</div>
        </div>
      ))}
    </div>
  );
}

export function Proof() {
  return (
    <section className="section" id="proof">
      <div className="wrap">
        <div className="head-row">
          <h2 className="h2 rv">
            The results, in <span className="serif">numbers</span>.
          </h2>
          <p className="lede rv rv-d1">
            Communities built, revenue moved and audiences grown across Telegram, WhatsApp,
            Facebook and Meta Ads.
          </p>
        </div>
        <StatGrid items={stats} />
        <h3 className="h2 stats-title rv">
          Meta Ads, in <span className="serif">numbers</span>.
        </h3>
        <StatGrid items={metaStats} />
      </div>
    </section>
  );
}
