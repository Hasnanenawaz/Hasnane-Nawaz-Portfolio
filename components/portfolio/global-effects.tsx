"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function countUp(el: HTMLElement, reduce: boolean) {
  if (el.dataset.done) return;
  el.dataset.done = "1";
  const target = parseFloat(el.dataset.target ?? "0");
  const dec = parseInt(el.dataset.dec ?? "0", 10);
  const suf = el.dataset.suf ?? "";
  if (reduce) { el.textContent = target.toFixed(dec) + suf; return; }
  let start: number | null = null;
  const step = (t: number) => {
    if (!start) start = t;
    const p = Math.min((t - start) / 2000, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toFixed(dec) + suf;
  };
  requestAnimationFrame(step);
}

export function GlobalEffects() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  // Scroll progress + nav scroll
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (st / h) * 100 : 0);
      const nav = document.getElementById("nav");
      if (nav) nav.classList.toggle("scrolled", st > 40);
      setShowTop(st > 700);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero entrance + reveal + scroll effects + count-up via IntersectionObserver
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateHero = () => document.querySelector(".hero")?.classList.add("in");
    if (document.querySelector(".ldr")) {
      window.addEventListener("loader:exit", animateHero, { once: true });
    } else {
      animateHero();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("show");
          e.target.querySelectorAll<HTMLElement>(".count").forEach((el) => countUp(el, reduce));
          io.unobserve(e.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".rv, .sx").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      window.removeEventListener("loader:exit", animateHero);
    };
  }, [pathname]);

  const handleTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div
        className="progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <button
        className={`totop${showTop ? " show" : ""}`}
        onClick={handleTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
