const jobs = [
  {
    company: "STAMP2FLY",
    period: "Apr 2025 — Jan 2026",
    role: "Marketing & Sales Intern",
    accent: "var(--emerald)",
    highlights: [
      <>Built the company&apos;s B2B marketing framework and aligned the sales and marketing teams for efficiency.</>,
      <>Ran business research to identify and secure <b>high-profile leads</b>.</>,
      <>Achieved <b>20% revenue growth</b> by streamlining lead acquisition and conversion.</>,
    ],
  },
  {
    company: "Budding Mariners",
    period: "Feb 2024 — Mar 2025",
    role: "Marketing & Sales Head",
    accent: "var(--gold)",
    highlights: [
      <>Led end-to-end marketing and sales for rapid community and revenue growth.</>,
      <>Grew the GP Rating Community from <b>10,000 to 50,000+ members</b> in 4 months across Telegram and WhatsApp.</>,
      <>Built Telegram channels from 0 to <b>5,000+ members</b> with strong retention.</>,
      <>Headed <b>30 sales callers</b> and lifted revenue from <b>Rs. 40,000 to Rs. 3,10,000</b> in 2 months.</>,
    ],
  },
  {
    company: "The Jus Anima",
    period: "Mar 2025 — Aug 2025",
    role: "Social Media & Community Growth Manager",
    accent: "var(--ocean)",
    highlights: [
      <>Scaled a legal-education community from <b>1,500 to 6,000 members</b> in 2 months.</>,
      <>Built content planning and daily engagement that produced <b>300% growth</b>.</>,
      <>Improved organic reach with audience-centric legal content and tight posting schedules.</>,
    ],
  },
  {
    company: "Voodaz",
    period: "Sep 2024 — Nov 2024",
    role: "Marketing & Sales Head",
    accent: "var(--plum)",
    highlights: [
      <>Learned and implemented <b>Meta Ads</b> strategies to scale paid campaigns.</>,
      <>Grew the official Facebook page from <b>1,000 to 7,000+ followers</b> via targeted ads and organic engagement.</>,
      <>Analyzed ad performance to optimize CPC, targeting, and campaign ROI.</>,
    ],
  },
  {
    company: "Cureable",
    period: "Dec 2023 — Mar 2024",
    role: "Content Writer Intern",
    accent: "var(--clay)",
    highlights: [
      <>Wrote material aligned with inclusivity and empowerment.</>,
      <>Contributed blog posts, website copy, and landing-page content.</>,
      <>Supported social captions and awareness campaigns to expand reach.</>,
    ],
  },
];

export function Experience() {
  return (
    <section className="section" id="experience" style={{ paddingTop: "40px" }}>
      <div className="wrap">
        <span className="eyebrow rv">Experience</span>
        <h2 className="title rv rv-d1">
          A timeline of growth systems, not just job titles.
        </h2>
        <p className="lede rv rv-d2">
          Each role framed around the business problem it solved: community scale,
          lead generation, revenue, and content operations.
        </p>
        <div className="timeline">
          {jobs.map((job, i) => (
            <div
              key={job.company}
              className={`tl-item rv${i > 0 ? ` rv-d${Math.min(i, 4)}` : ""}`}
              style={{ "--accent": job.accent } as React.CSSProperties}
            >
              <span className="tl-dot" />
              <div className="tl-card">
                <div className="tl-top">
                  <span className="tl-co">{job.company}</span>
                  <span className="tl-date">{job.period}</span>
                </div>
                <div className="tl-role">{job.role}</div>
                <ul>
                  {job.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
