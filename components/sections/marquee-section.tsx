const items = [
  "Social Media Marketing",
  "AI Content",
  "AI Image Generation",
  "Community Growth",
  "Meta Ads",
  "Lead Generation",
  "Copywriting",
  "CPC Optimization",
];

export function MarqueeSection() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <ul aria-label="Skills">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <ul aria-hidden="true">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
