"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button, { TextLink } from "./Button";
import { ACCESS_HREF, hero } from "./content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(".lx-h1-line > span", { y: 0, duration: 1.2, stagger: 0.09 }, 0.1)
          .to(".lx-hero-fade", { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.55)
          .to(".lx-window", { opacity: 1, y: 0, duration: 1.2 }, 0.7);

        // The product rises and opens to the full measure as the reader scrolls into it.
        gsap.fromTo(
          ".lx-window-frame",
          { scale: 0.86 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".lx-window", start: "top 95%", end: "top 20%", scrub: 0.6 },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="lx-hero" aria-labelledby="lx-title">
      <div className="lx-cols" aria-hidden="true" />
      <div className="lx-hero-glow" aria-hidden="true" />

      <div className="lx-wrap lx-hero-inner">
        <p className="lx-label lx-hero-fade">{hero.label}</p>
        <h1 id="lx-title" className="lx-h1">
          {hero.lines.map((line, i) => (
            <span key={line} className={`lx-h1-line${i === hero.lines.length - 1 ? " is-accent" : ""}`}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <div className="lx-hero-foot">
          <p className="lx-hero-lede lx-hero-fade">{hero.lede}</p>
          <div className="lx-hero-actions lx-hero-fade">
            <Button href={ACCESS_HREF}>{hero.primary}</Button>
            <TextLink href="#workspaces">{hero.secondary}</TextLink>
          </div>
          <p className="lx-hero-proof lx-hero-fade">{hero.proof}</p>
        </div>
      </div>

      <div className="lx-wrap lx-window">
        <div className="lx-window-frame">
          <div className="lx-window-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <em>LexTutor · Home</em>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/landing/app-home.webp"
            width={2880}
            height={1800}
            alt="LexTutor's home: an engraved colonnade under the line 'Train the judgment the exam demands', with Start a paper between the middle pillars."
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
