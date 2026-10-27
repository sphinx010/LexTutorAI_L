"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "./Button";
import { ACCESS_HREF, CONTACT_EMAIL, founder, nav } from "./content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Founder() {
  const root = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".lx-mark-letter", {
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".lx-wordmark", start: "top 92%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="lx-ch-ember lx-grain lx-closing">
      <section id="founder" className="lx-section lx-founder" aria-labelledby="lx-founder-title">
        <div className="lx-cols" aria-hidden="true" />
        <div className="lx-wrap lx-split">
          <p className="lx-label lx-split-label">{founder.label}</p>
          <div className="lx-founder-body">
            <h2 id="lx-founder-title" className="lx-founder-name" data-reveal>
              {founder.name}
            </h2>
            <p className="lx-founder-role">{founder.role}</p>
            <p className="lx-body lx-founder-text" data-reveal>
              {founder.body}
            </p>
          </div>
        </div>

        <div className="lx-wrap lx-close">
          <p className="lx-close-line" data-reveal>
            {founder.close}
          </p>
          <div className="lx-close-actions">
            <Button href={ACCESS_HREF}>Request access</Button>
            <button type="button" className="lx-copy" onClick={copy}>
              <span>{copied ? "Address copied" : CONTACT_EMAIL}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                {copied ? (
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                ) : (
                  <path d="M5.5 5.5h7v7h-7zM3.5 10.5v-7h7" fill="none" stroke="currentColor" strokeWidth="1.3" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </section>

      <footer className="lx-foot">
        <div className="lx-wrap lx-foot-row">
          <span>© 2026 LexTutor</span>
          <nav aria-label="Footer">
            {nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <p className="lx-wordmark" aria-hidden="true">
          {"LexTutor".split("").map((ch, i) => (
            <span key={i} className="lx-mark-mask">
              <span className="lx-mark-letter">{ch}</span>
            </span>
          ))}
        </p>
      </footer>
    </div>
  );
}
