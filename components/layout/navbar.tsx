"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav" id="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="logo">
          <span className="dot" />
          Hasnane.
        </a>
        <nav className={`nav-links${open ? " open" : ""}`} id="navLinks">
          <a href="#about" onClick={close}>About</a>
          <a href="#approach" onClick={close}>Approach</a>
          <a href="#experience" onClick={close}>Experience</a>
          <a href="#work" onClick={close}>Work</a>
          <a href="#proof" onClick={close}>Proof</a>
          <Link href="/blog" onClick={close}>Blog</Link>
          <a href="#contact" className="nav-cta" onClick={close}>Let&apos;s talk</a>
        </nav>
        <button
          className={`burger${open ? " open" : ""}`}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
