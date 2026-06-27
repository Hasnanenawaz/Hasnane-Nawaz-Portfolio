const skillGroups = [
  {
    title: "Growth",
    accent: "var(--emerald)",
    chips: ["Social Media Marketing", "Lead Generation", "Community Growth", "Sales Tracking"],
  },
  {
    title: "Content",
    accent: "var(--clay)",
    chips: ["Content Strategy", "Campaign Planning", "Copywriting", "Organic Reach"],
  },
  {
    title: "Leadership",
    accent: "var(--ocean)",
    chips: ["Communication", "Teamwork", "30-Member Teams", "Time Management"],
  },
  {
    title: "Analysis",
    accent: "var(--plum)",
    chips: ["Meta Ads", "CPC Optimization", "ROI Thinking", "Critical Thinking"],
  },
];

export function Skills() {
  return (
    <section className="section" id="skills" style={{ paddingTop: "40px" }}>
      <div className="wrap">
        <span className="eyebrow rv">Skills</span>
        <h2 className="title rv rv-d1">
          Built for growth work that touches content, community, and sales.
        </h2>
        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
              className={`sk-card rv${i > 0 ? ` rv-d${i}` : ""}`}
              style={{ "--accent": group.accent } as React.CSSProperties}
            >
              <h4>
                <i />
                {group.title}
              </h4>
              {group.chips.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
