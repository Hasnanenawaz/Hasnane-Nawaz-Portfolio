const stats = [
  { target: "2.5", dec: "1", suf: "+", cap: "Years in growth marketing" },
  { target: "50", suf: "k+", cap: "Community members scaled" },
  { target: "300", suf: "%", cap: "Legal community growth in 2 months" },
  { target: "7", suf: "x+", cap: "Revenue jump in 2 months", ember: true },
];

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
        <div className="stats">
          {stats.map((s, i) => (
            <div
              key={s.cap}
              className={`card stat lift rv${i > 0 ? ` rv-d${i}` : ""}${s.ember ? " ember" : ""}`}
            >
              <div className="big">
                <span className="count" data-target={s.target} data-dec={s.dec} data-suf={s.suf}>
                  {s.target}{s.suf}
                </span>
              </div>
              <div className="cap">{s.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
