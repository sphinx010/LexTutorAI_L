"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      const beats = heroRef.current.querySelectorAll(".hero-beat");
      const cards = heroRef.current.querySelectorAll(".home-capability");

      gsap.fromTo(
        beats,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.56,
          stagger: 0.065,
          delay: 0.22,
          ease: "power3.out",
        }
      );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="home-overview-title"
      className="lt-masthead w-full"
    >
      <div className="lt-masthead-stage">
        {/* Desktop & Tablet Masthead Stage (>= 761px): Printed Round Colonnade Plate */}
        <div className="hidden md:block relative">
          <div className="lt-masthead-plate" aria-hidden="true" />
          <div className="lt-masthead-cast" aria-hidden="true" />

          {/* Kicker & Two-Scale Headline in the open sky above the curved architrave beam */}
          <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center px-6 pt-[106px] lg:pt-[116px] pointer-events-none">
            <p className="hero-beat lt-kicker text-[9.5px] lg:text-[10px] tracking-[0.14em] !mb-[6px]">
              LexTutor legal evaluation system
            </p>
            <h1
              id="home-overview-title"
              className="hero-beat lt-headline text-[clamp(40px,4.4cqi,56px)] max-w-none"
            >
              <span className="hl-lead">Law is structural and interpretive.</span>
              <em>Audited at the point of work.</em>
            </h1>
          </div>
        </div>

        {/* Mobile Cover Layout (<= 760px): Engraved cover at top, fading into the page */}
        <div className="md:hidden flex flex-col pb-7">
          <div
            className="relative w-full h-[clamp(240px,35vh,300px)] overflow-hidden -mb-4 pointer-events-none"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 42%, rgba(0,0,0,0.45) 72%, transparent 94%)",
              maskImage:
                "linear-gradient(to bottom, #000 42%, rgba(0,0,0,0.45) 72%, transparent 94%)",
            }}
            aria-hidden="true"
          >
            <div
              className="lt-only-dark w-full h-full bg-cover bg-[50%_32%]"
              style={{
                backgroundImage:
                  'url("/assets/branding/leader-round-colonnade-dark.webp")',
              }}
            />
            <div
              className="lt-only-light w-full h-full bg-cover bg-[50%_38%] opacity-70"
              style={{
                backgroundImage:
                  'url("/assets/branding/leader-round-colonnade.webp")',
              }}
            />
          </div>

          <div className="relative z-10 px-[22px]">
            <p className="lt-kicker mb-2.5">
              LexTutor legal evaluation system
            </p>
            <h1 className="lt-headline text-[clamp(34px,9.4vw,40px)] mb-3">
              <span className="hl-lead">Law is structural and interpretive.</span>{" "}
              <em>Audited at the point of work.</em>
            </h1>
          </div>
        </div>

        {/* Four Connected Workspaces Row (under the colonnade steps) */}
        <div className="px-0 md:px-8 lg:px-14 pb-8 md:pb-12 md:mt-1">
          <nav
            className="home-capability-grid"
            aria-label="LexTutor workspaces"
          >
            <a
              href="#environment"
              className="home-capability home-capability--practice"
            >
              <span className="home-workspace-token">Answer</span>
              <strong>Paper Practice</strong>
              <small>
                Work past examination questions under timed or tutor conditions.
              </small>
              <svg
                className="home-capability-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h13M13 7l5 5-5 5" />
              </svg>
            </a>

            <a
              href="#telemetry"
              className="home-capability home-capability--topic"
            >
              <span className="home-workspace-token">Trace</span>
              <strong>Topic Drilldown</strong>
              <small>
                See how one legal principle changes across examination years.
              </small>
              <svg
                className="home-capability-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h13M13 7l5 5-5 5" />
              </svg>
            </a>

            <a
              href="#environment"
              className="home-capability home-capability--draft"
            >
              <span className="home-workspace-token">Build</span>
              <strong>Draft Lab</strong>
              <small>
                Build court documents and charges in the order the law requires.
              </small>
              <svg
                className="home-capability-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h13M13 7l5 5-5 5" />
              </svg>
            </a>

            <a
              href="#intelligence"
              className="home-capability home-capability--lexa"
            >
              <span className="home-workspace-token">Review</span>
              <strong>Lexa Points</strong>
              <small>
                See what each sentence gets right, misses, or needs on the page.
              </small>
              <svg
                className="home-capability-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h13M13 7l5 5-5 5" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
