"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { premise } from "./content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The statement fills from quiet to ink, word by word, as it is read.
export default function Premise() {
  const root = useRef<HTMLElement>(null);
  const words = premise.statement.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".lx-fill-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: ".lx-fill", start: "top 78%", end: "bottom 45%", scrub: 0.5 },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="lx-section lx-premise" aria-labelledby="lx-premise">
      <div className="lx-cols" aria-hidden="true" />
      <div className="lx-wrap lx-split">
        <p id="lx-premise" className="lx-label lx-split-label">
          {premise.label}
        </p>
        <p className="lx-statement lx-fill">
          {words.map((w, i) => (
            <span key={i} className="lx-fill-word">
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
