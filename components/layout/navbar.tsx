"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav" id="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="logo">
          <span className="dot" />
          Hasnane.
        </Link>
        <nav className={`nav-links${open ? " open" : ""}`} id="navLinks">
          <Link href="/#about" onClick={close}>About</Link>
          <Link href="/#approach" onClick={close}>Approach</Link>
          <Link href="/#experience" onClick={close}>Experience</Link>
          <Link href="/#work" onClick={close}>Work</Link>
          <Link href="/#proof" onClick={close}>Proof</Link>
          <Link href="/blog" onClick={close}>Blog</Link>
          <Link href="/#contact" className="nav-cta" onClick={close}>Let&apos;s talk</Link>
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
