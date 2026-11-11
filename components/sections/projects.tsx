const caseStudies = [
  {
    title: "GP Rating community scale-up",
    from: "10k",
    to: "50k+",
    summary: "Telegram and WhatsApp growth loops, tied into sales coordination.",
    tags: ["Telegram", "WhatsApp", "Community"],
    variant: "dark",
  },
  {
    title: "Revenue conversion system",
    from: "₹40k",
    to: "₹3.1L",
    summary:
      "Monthly revenue in 2 months, through lead management, 30-caller coordination and conversion tracking.",
    tags: ["Sales team", "Lead gen", "Tracking"],
    variant: "card-accent",
  },
  {
    title: "Legal education community",
    from: "1.5k",
    to: "6k",
    summary:
      "300% growth through audience-focused legal content, engagement rituals and a steady posting schedule.",
    tags: ["Content plan", "Engagement"],
    variant: "surface",
  },
  {
    title: "Meta Ads growth sprint",
    from: "1k",
    to: "7k+",
    summary: "Facebook followers, through sharper targeting, ad-placement tests and CPC analysis.",
    tags: ["Meta Ads", "CPC"],
    variant: "ember",
  },
];

export function Projects() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <h2 className="h2 rv">
          Before <span className="serif lilac" aria-hidden="true">→</span>
          <span className="sr-only">to</span> <span className="serif">after</span>.
        </h2>
        <div className="cases">
          {caseStudies.map((cs, i) => (
            <div key={cs.title} className={`card case lift ${cs.variant} rv${i % 2 ? " rv-d1" : ""}`}>
              <div className="delta">
                <span className="from">{cs.from}</span>
                <span className="ar" aria-hidden="true">→</span>
                <span className="sr-only">to</span>
                <span className="to">{cs.to}</span>
              </div>
              <h3>{cs.title}</h3>
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
