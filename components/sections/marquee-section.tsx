export function MarqueeSection() {
  const items = [
    "Community Growth",
    "Lead Generation",
    "Meta Ads",
    "Content Strategy",
    "Sales Alignment",
  ];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
