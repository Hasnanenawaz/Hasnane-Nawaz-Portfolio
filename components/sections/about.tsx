export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <span className="eyebrow rv">About</span>
        <h2 className="title rv rv-d1">
          A marketer who thinks like a <em>researcher</em> and executes like an{" "}
          <em>operator</em>.
        </h2>
        <p className="lede rv rv-d2">
          The story underneath the numbers: measurable community growth, sales alignment,
          and content that earns trust long before it asks for anything.
        </p>
        <div className="about-grid">
          <div
            className="a-card rv from-left"
            style={{ "--accent": "var(--emerald)" } as React.CSSProperties}
          >
            <span className="idx">01</span>
            <h3>The unusual advantage</h3>
            <p>
              Hasnane is pursuing BA LLB, but marketing became the real arena. Research,
              persuasion, and audience psychology all turned into practical growth skills
              you can put on a dashboard.
            </p>
          </div>
          <div
            className="a-card rv from-right rv-d1"
            style={{ "--accent": "var(--gold)" } as React.CSSProperties}
          >
            <span className="idx">02</span>
            <h3>From posts to systems</h3>
            <p>
              The work isn&apos;t posting content. It&apos;s building repeatable systems
              around audience intent, channel positioning, lead capture, caller
              coordination, and conversion follow-through.
            </p>
          </div>
          <div className="a-card feature rv rv-d2">
            <h3>Community as a business asset.</h3>
            <p>
              Across Telegram, WhatsApp, Facebook, and legal-education communities the
              pattern is the same: grow trust first, then turn attention into pipeline
              that actually pays.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
