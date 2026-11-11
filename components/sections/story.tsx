import { ImageIcon, Instagram, Video } from "lucide-react";

const pastTeam = [
  { role: "Graphic designer", Icon: ImageIcon },
  { role: "Video editor", Icon: Video },
  { role: "Instagram manager", Icon: Instagram },
];

const knowHow = [
  { idx: "(a)", skill: "use AI" },
  { idx: "(b)", skill: "generate images" },
  { idx: "(c)", skill: "get things done" },
];

export function Story() {
  return (
    <section id="story">
      <div className="section"><div className="wrap">
        <div className="chapter">
          <span className="label rv">01 / Then vs now</span>
          <h2 className="h2 rv rv-d1">
            Three years back, I had a <span className="serif">team</span> working under me.
          </h2>
          <div className="roles">
            {pastTeam.map(({ role, Icon }) => (
              <div key={role} className="card role-card sx">
                <Icon aria-hidden="true" />
                <p><span className="strike">{role}</span></p>
              </div>
            ))}
          </div>
          <div className="card card-accent today rv">
            <div>
              <span className="label ember bare">Today</span>
              <p>Now I do all of these things myself, using Claude AI.</p>
            </div>
            <div className="chips">
              <span className="chip">Design</span>
              <span className="chip">Video</span>
              <span className="chip">Instagram</span>
              <span className="to" aria-hidden="true">→</span>
              <span className="chip ember">One person</span>
            </div>
          </div>
        </div>

        <div className="chapter">
          <span className="label rv">02 / Honestly</span>
          <h2 className="h2 sx rv rv-d1">
            I won&apos;t tell you I&apos;m the{" "}
            <span className="serif lilac strike">world&apos;s best marketer</span>.
          </h2>
          <div className="honest-row rv rv-d2">
            <p className="lede">
              I have pretty solid results. I have achieved many things, and the numbers are
              right below.
            </p>
            <a href="#proof" className="btn btn-white">
              See the results <span className="arr down" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="chapter">
          <span className="label rv">03 / But I&apos;ll definitely tell you this</span>
          <ul className="know">
            {knowHow.map(({ idx, skill }) => (
              <li key={idx} className="rv from-left sx">
                <span className="idx">{idx}</span>
                <p>
                  I know how to <span className="hl"><span className="serif">{skill}</span></span>.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div></div>

      <div className="section band-deep deal">
        <div className="wrap">
          <span className="label ember rv">04 / So here&apos;s the deal</span>
          <p className="lede rv rv-d1">
            If you want to <b>grow your business</b>. If you want someone who can{" "}
            <b>work independently</b>, without too much guidance or micromanagement.
          </p>
          <h2 className="rv scale rv-d2">
            Then go ahead and <span className="serif">hire me</span> in the first place.
          </h2>
          <a href="#contact" className="btn btn-primary rv rv-d3">
            Hire me <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
