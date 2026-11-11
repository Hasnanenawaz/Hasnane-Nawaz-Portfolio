import { ImageIcon, Instagram, Video } from "lucide-react";

const headline = [
  { text: "Without", dim: true },
  { text: "wasting", dim: true },
  { text: "time,", dim: true },
  { text: "I'll" },
  { text: "just" },
  { text: "tell" },
  { text: "you" },
  { text: "why" },
  { text: "you" },
  { text: "should" },
  { text: "hire", serif: true },
  { text: "me.", serif: true },
];

const roles = ["a graphic designer.", "a video editor.", "an Instagram manager.", "a whole team."];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <span className="avail hf">
            <span className="live-dot" aria-hidden="true" />
            Open to growth roles, internships &amp; freelance
          </span>
          <h1>
            {headline.map((word, i) => (
              <span key={i}>
                <span className={`w${word.dim ? " dim" : ""}${word.serif ? " serif" : ""}`}>
                  <span style={{ "--i": i } as React.CSSProperties}>{word.text}</span>
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="sub hf" style={{ "--d": ".55s" } as React.CSSProperties}>
            The thing is, in today&apos;s world, <b>marketing is not just marketing</b>. AI has
            wholly changed the world of marketing.
          </p>
          <p className="rot hf" style={{ "--d": ".65s" } as React.CSSProperties}>
            One person doing all the work of{" "}
            <span className="sr-only">{roles.join(", ")}</span>
            <span className="rot-win" aria-hidden="true">
              <span className="rot-list">
                {[...roles, roles[0]].map((role, i) => (
                  <span key={i}>{role}</span>
                ))}
              </span>
            </span>
          </p>
          <div className="hero-cta hf" style={{ "--d": ".75s" } as React.CSSProperties}>
            <a href="#contact" className="btn btn-primary">
              Hire me <span className="arr" aria-hidden="true">→</span>
            </a>
            <a href="#story" className="btn btn-ghost">Why you should</a>
          </div>
        </div>

        <div className="orbit hf" style={{ "--d": ".4s" } as React.CSSProperties} aria-hidden="true">
          <div className="orbit-ring" />
          <div className="orbit-ring inner" />
          <div className="orbit-core">
            <b>Me</b>
          </div>
          <div className="orbit-spin">
            <span className="orbit-chip c1"><span><ImageIcon />Graphic design</span></span>
            <span className="orbit-chip c2"><span><Video />Video editing</span></span>
            <span className="orbit-chip c3"><span><Instagram />Instagram</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
