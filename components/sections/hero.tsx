import { HeroChart } from "@/components/portfolio/hero-chart";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      <div className="wrap hero-grid">
        <div>
          <span className="avail">
            <span className="live-dot" />
            Available for growth roles &amp; freelance campaigns
          </span>
          <span className="eyebrow role show">
            Social media marketer · Community &amp; growth systems
          </span>
          <h1>
            <span className="ln"><span>Hasnane</span></span>
            <span className="ln"><span className="grad">Nawaz</span></span>
          </h1>
          <p className="sub">
            I turn scattered attention into <b>structured communities</b>,{" "}
            <b>qualified leads</b>, and <b>measurable revenue</b>. Content instincts,
            sales discipline, and the research mind of a law student, all pointed at one
            job: growth that shows up in the numbers, not just the likes.
          </p>
          <div className="hero-meta">
            <span>Telegram</span>
            <span>WhatsApp</span>
            <span>Facebook</span>
            <span>Meta Ads</span>
            <span>Lead Gen</span>
          </div>
          <div className="hero-cta">
            <a href="#work" className="btn btn-primary magnet">
              See the growth cases <span className="arr">↗</span>
            </a>
            <a href="#contact" className="btn btn-ghost magnet">
              Hire Hasnane
            </a>
          </div>
        </div>

        <div className="panel rv from-right">
          <div className="panel-head">
            <span className="lab">Trajectory · 2024 → 2026</span>
            <span className="live">
              <span className="pulse" />
              Compounding
            </span>
          </div>
          <HeroChart />
        </div>
      </div>
    </section>
  );
}
