const steps = [
  {
    title: "Read the audience",
    text: "Research what people want, what stops them, and the exact words they use.",
  },
  {
    title: "Build the system",
    text: "Channel positioning, posting cadence, lead capture and caller scripts, with AI doing the heavy lifting on content.",
  },
  {
    title: "Convert and track",
    text: "Hand qualified leads to sales, measure every step, and feed what works back into the loop.",
  },
];

export function Approach() {
  return (
    <section className="section" id="approach" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2 className="h2 rv" style={{ maxWidth: "22ch" }}>
          How I <span className="serif lilac">work</span>: a simple loop that keeps getting sharper.
        </h2>
        <div className="steps">
          {steps.map((step, i) => (
            <div key={step.title} className={`card step lift rv${i > 0 ? ` rv-d${i}` : ""}`}>
              <div className="no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
