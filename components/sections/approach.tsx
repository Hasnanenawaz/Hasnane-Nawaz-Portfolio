export function Approach() {
  return (
    <section className="section" id="approach" style={{ paddingTop: "40px" }}>
      <div className="wrap">
        <span className="eyebrow rv">How it works</span>
        <h2 className="title rv rv-d1">
          Growth isn&apos;t luck. It&apos;s a <em>sequence</em>.
        </h2>
        <p className="lede rv rv-d2">
          Every result on this page came from the same three-step loop, repeated until
          the numbers moved.
        </p>
        <div className="steps">
          <div
            className="step rv from-left"
            style={{ "--accent": "var(--ocean)" } as React.CSSProperties}
          >
            <div className="no">01</div>
            <h4>Read the audience</h4>
            <p>
              Research the intent, the objections, and the language people already use.
              The content writes itself once you actually know who is on the other side.
            </p>
            <span className="bar" />
          </div>
          <div
            className="step rv rv-d1"
            style={{ "--accent": "var(--emerald)" } as React.CSSProperties}
          >
            <div className="no">02</div>
            <h4>Build the system</h4>
            <p>
              Channel positioning, posting cadence, lead capture, and caller scripts
              wired into one engine, so growth doesn&apos;t depend on a single viral
              post.
            </p>
            <span className="bar" />
          </div>
          <div
            className="step rv from-right rv-d2"
            style={{ "--accent": "var(--clay)" } as React.CSSProperties}
          >
            <div className="no">03</div>
            <h4>Convert and track</h4>
            <p>
              Hand qualified attention to the sales floor, track every step, and feed
              the numbers back in. Trust becomes pipeline, pipeline becomes revenue.
            </p>
            <span className="bar" />
          </div>
        </div>
      </div>
    </section>
  );
}
