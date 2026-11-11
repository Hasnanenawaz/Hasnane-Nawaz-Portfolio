"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#story", label: "Why me" },
  { href: "/#proof", label: "Proof" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav" id="nav">
      <div className="nav-inner">
        <Link href="/" className="logo" onClick={close}>
          <span className="badge" aria-hidden="true">HN</span>
          Hasnane Nawaz
        </Link>
        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>
        <Link href="/#contact" className="btn btn-white nav-cta">
          Hire me <span className="arr" aria-hidden="true">→</span>
        </Link>
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="nav-sheet"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>
      <nav className="nav-sheet" id="nav-sheet" aria-label="Main mobile" hidden={!open}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={close}>{l.label}</Link>
        ))}
        <Link href="/#contact" className="btn btn-primary" onClick={close}>
          Hire me <span className="arr" aria-hidden="true">→</span>
        </Link>
      </nav>
    </header>
  );
}
