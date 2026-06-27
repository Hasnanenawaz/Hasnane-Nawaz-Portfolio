const caseStudies = [
  {
    kind: "Community Growth",
    title: "BM GP Rating Community Scale-Up",
    from: "10k",
    to: "50k+",
    summary:
      "A focused Telegram and WhatsApp growth engine: targeted campaigns, consistent engagement loops, and sales-team coordination, adding 40,000+ new members in 4 months.",
    tags: ["Telegram", "WhatsApp", "GrowthLoops", "SalesTeam"],
    accent: "var(--emerald)",
  },
  {
    kind: "Sales Operations",
    title: "Revenue Conversion System",
    from: "₹40k",
    to: "₹3.10L",
    summary:
      "Structured lead management, 30-caller coordination, and conversion tracking that turned community attention into measurable monthly revenue in just 2 months.",
    tags: ["LeadManagement", "SalesTracking", "RevenueGrowth"],
    accent: "var(--gold)",
  },
  {
    kind: "Content-Led Community",
    title: "Legal Education Community Growth",
    from: "1.5k",
    to: "300%",
    summary:
      "Audience-centric legal content, daily engagement rituals, and optimized posting schedules grew a student-driven community from 1,500 to 6,000 members.",
    tags: ["LegalContent", "Engagement", "OrganicReach"],
    accent: "var(--ocean)",
  },
  {
    kind: "Paid Growth",
    title: "Meta Ads Growth Sprint",
    from: "1k",
    to: "7k+",
    summary:
      "Campaign targeting, ad-placement experiments, and CPC analysis grew a Facebook audience with a paid-plus-organic strategy tuned for ROI.",
    tags: ["MetaAds", "CPC", "Facebook", "ROI"],
    accent: "var(--clay)",
  },
];

export function Projects() {
  return (
    <section className="section" id="work" style={{ paddingTop: "40px" }}>
      <div className="wrap">
        <span className="eyebrow rv">Case studies</span>
        <h2 className="title rv rv-d1">
          Portfolio projects written as measurable <em>growth stories</em>.
        </h2>
        <p className="lede rv rv-d2">
          Scan the result first, then read the operating thinking behind it.
        </p>
        <div className="proj-grid">
          {caseStudies.map((cs, i) => (
            <div
              key={cs.title}
              className={`proj tilt rv${i > 0 ? ` rv-d${Math.min(i, 4)}` : ""}`}
              style={{ "--accent": cs.accent } as React.CSSProperties}
            >
              <span className="kind">{cs.kind}</span>
              <h3>{cs.title}</h3>
              <div className="delta">
                <span className="from">{cs.from}</span>
                <span className="ar" />
                <span className="to">{cs.to}</span>
              </div>
              <p>{cs.summary}</p>
              <div className="tags">
                {cs.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
