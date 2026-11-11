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
    const p = Math.min((t - start) / 1500, 1);
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

  // Hero h1 animation + scroll progress + nav scroll
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateHero = () => {
      if (reduce) return;
      document.querySelectorAll<HTMLElement>(".hero h1 .ln span").forEach((s, i) => {
        s.style.animation = `rise .9s cubic-bezier(.2,.7,.2,1) ${i * 0.12 + 0.15}s forwards`;
      });
    };

    if (document.querySelector(".ldr")) {
      window.addEventListener("loader:exit", animateHero, { once: true });
    } else {
      animateHero();
    }

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
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("loader:exit", animateHero);
    };
  }, []);

  // Reveal + count-up via IntersectionObserver
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Magnetic + tilt effects (fine pointer / desktop only)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !window.matchMedia("(pointer:fine)").matches) return;

    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".magnet").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.3 - 2}px)`;
        });
        btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
      });

      document.querySelectorAll<HTMLElement>(".tilt").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `translateY(-6px) perspective(900px) rotateX(${-py * 4}deg) rotateY(${px * 5}deg)`;
        });
        card.addEventListener("mouseleave", () => { card.style.transform = ""; });
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
