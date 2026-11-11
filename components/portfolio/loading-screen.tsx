"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const CHARS = "HASNANE NAWAZ".split("");

export function LoadingScreen() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"in" | "out" | "done">(
    pathname !== "/" ? "done" : "in"
  );

  useEffect(() => {
    if (phase === "done") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setPhase("done");
      window.dispatchEvent(new CustomEvent("loader:exit"));
      return;
    }

    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => {
      setPhase("out");
      window.dispatchEvent(new CustomEvent("loader:exit"));
    }, 1400);

    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "done") return null;

  return (
    <div className={`ldr${phase === "out" ? " ldr--out" : ""}`} aria-hidden="true">
      <div className="ldr__body">
        <div className="ldr__mono">HN</div>
        <div className="ldr__name">
          {CHARS.map((char, i) =>
            char === " " ? (
              <span key={i} className="ldr__sp" />
            ) : (
              <span
                key={i}
                className="ldr__ch"
                style={{ animationDelay: `${i * 0.035 + 0.15}s` }}
              >
                {char}
              </span>
            )
          )}
        </div>
        <p className="ldr__tag">Growth Strategist · Social Media Marketer</p>
        <div className="ldr__track">
          <div className="ldr__fill" />
        </div>
      </div>
    </div>
  );
}
