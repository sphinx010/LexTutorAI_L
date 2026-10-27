"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { ACCESS_HREF, nav } from "./content";

export function LogoMark() {
  return (
    <svg viewBox="0 0 687 687" aria-hidden="true">
      <path
        fill="currentColor"
        d="M70 50H158Q170 50 170 62V470C170 501 194 523 225 523H438Q444 523 449 528L539 618Q546 625 541 632Q537 637 527 637H70Q58 637 58 625V62Q58 50 70 50Z"
      />
      <path
        fill="var(--lx-gold)"
        d="M257 50H617Q629 50 629 62V151Q629 163 617 163H526C514 163 505 172 505 184V501L397 393Q395 391 395 386V184C395 172 386 163 374 163H257Q245 163 245 151V62Q245 50 257 50Z"
      />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`lx-nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="lx-wrap lx-nav-inner">
        <a href="#top" className="lx-brand" aria-label="LexTutor, back to top">
          <LogoMark />
          <span>LexTutor</span>
        </a>

        <nav className="lx-nav-links" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="lx-nav-end">
          <Button href={ACCESS_HREF} size="sm">
            Request access
          </Button>
          <button
            type="button"
            className="lx-menu-btn"
            aria-expanded={open}
            aria-controls="lx-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="lx-sr">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav id="lx-menu" className="lx-menu" aria-label="Menu" hidden={!open}>
        {nav.map((item, i) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        ))}
        <a href={ACCESS_HREF} className="lx-menu-access" onClick={() => setOpen(false)}>
          Request access
        </a>
      </nav>
    </header>
  );
}
