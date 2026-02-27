"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import DottedArrow from "./DottedArrow";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

type Stage = {
  id: string;
  tagline: string;
  headline: string;
  text: string;
  imageSrc: string;
  stageLabel: string;
  surface: string;
};

const stages: Stage[] = [
  {
    id: "intro",
    tagline: "THE PROGRESSION ENGINE",
    headline: "LEGAL COMPETENCE, COMPOUNDED",
    text: "A structured AI system that continuously levels legal judgment from recall to elite execution.",
    imageSrc: "/images/instant-synthesis.png",
    stageLabel: "SYSTEM PRIMER",
    surface: "#D6EEDC",
  },
  {
    id: "junior",
    tagline: "THE FOUNDATION",
    headline: "JUNIOR COUNSEL",
    text: "Mastery of procedural rules, statute hierarchy, and foundational case-law retrieval.",
    imageSrc: "/images/junior.jpg",
    stageLabel: "STAGE 01 / 04",
    surface: "#F2A486",
  },
  {
    id: "associate",
    tagline: "THE ARCHITECT",
    headline: "ASSOCIATE STRATEGIST",
    text: "Synthesis of complex legal arguments across jurisdictions with disciplined drafting flow.",
    imageSrc: "/images/associate.jpg",
    stageLabel: "STAGE 02 / 04",
    surface: "#BFE5D0",
  },
  {
    id: "senior",
    tagline: "THE AUTHORITY",
    headline: "SENIOR ADVOCATE",
    text: "Advanced architectural mastery for high-stakes strategic reasoning and legal precision.",
    imageSrc: "/images/SAN.jpg",
    stageLabel: "STAGE 03 / 04",
    surface: "#E8CFA5",
  },
  {
    id: "lead",
    tagline: "THE VISIONARY",
    headline: "LEAD LITIGATOR",
    text: "Precision orchestration across discovery, motion practice, and courtroom execution.",
    imageSrc: "/images/lead.jpg",
    stageLabel: "STAGE 04 / 04",
    surface: "#9CCCEE",
  },
];

export default function ProgressionLoop() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const stageRef = useRef<HTMLParagraphElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const transitionGuardRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const activeStage = stages[activeIndex];

  activeIndexRef.current = activeIndex;
  isTransitioningRef.current = isTransitioning;

  const progressPercentage = `${((activeIndex + 1) / stages.length) * 100}%`;

  const transitionTo = (nextIndex: number) => {
    if (isTransitioningRef.current) return;

    const normalized = (nextIndex + stages.length) % stages.length;
    if (normalized === activeIndexRef.current) return;

    setIsTransitioning(true);
    isTransitioningRef.current = true;
    if (transitionGuardRef.current) {
      clearTimeout(transitionGuardRef.current);
      transitionGuardRef.current = null;
    }
    transitionGuardRef.current = setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
      transitionGuardRef.current = null;
    }, 1600);

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => setActiveIndex(normalized),
      onInterrupt: () => {
        if (transitionGuardRef.current) {
          clearTimeout(transitionGuardRef.current);
          transitionGuardRef.current = null;
        }
        setIsTransitioning(false);
        isTransitioningRef.current = false;
      },
    });

    if (taglineRef.current && headlineRef.current && bodyRef.current && stageRef.current) {
      tl.to(
        [taglineRef.current, headlineRef.current, bodyRef.current, stageRef.current],
        { autoAlpha: 0, y: 20, duration: 0.28, ease: "power3.inOut" },
        0
      );
    }

    if (sectionRef.current) {
      tl.to(
        sectionRef.current,
        { backgroundColor: stages[normalized].surface, duration: 0.8, ease: "power3.inOut" },
        0
      );
    }

    if (imageWrapRef.current) {
      tl.to(
        imageWrapRef.current,
        { autoAlpha: 0, y: 20, scale: 1.05, duration: 0.28, ease: "power3.inOut" },
        0
      );
    }
  };

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !textWrapRef.current ||
      !taglineRef.current ||
      !headlineRef.current ||
      !bodyRef.current ||
      !stageRef.current ||
      !imageWrapRef.current ||
      !progressFillRef.current
    ) {
      return;
    }

    gsap.set(sectionRef.current, { backgroundColor: stages[0].surface });
    gsap.set(textWrapRef.current, { autoAlpha: 1, y: 0 });
    gsap.set([taglineRef.current, headlineRef.current, bodyRef.current, stageRef.current], { autoAlpha: 1, y: 0 });
    gsap.set(imageWrapRef.current, { autoAlpha: 1, y: 0, scale: 1 });
    gsap.set(progressFillRef.current, { width: `${100 / stages.length}%` });
  }, []);

  useLayoutEffect(() => {
    if (
      !taglineRef.current ||
      !headlineRef.current ||
      !bodyRef.current ||
      !stageRef.current ||
      !imageWrapRef.current ||
      !progressFillRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        if (transitionGuardRef.current) {
          clearTimeout(transitionGuardRef.current);
          transitionGuardRef.current = null;
        }
        setIsTransitioning(false);
        isTransitioningRef.current = false;
      },
    });

    tl.fromTo(
      imageWrapRef.current,
      { autoAlpha: 0, y: 20, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.inOut" },
      0
    )
      .fromTo(
        [taglineRef.current, headlineRef.current, bodyRef.current],
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.inOut" },
        0.1
      )
      .fromTo(
        stageRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.inOut" },
        0.35
      )
      .to(progressFillRef.current, { width: progressPercentage, duration: 0.8, ease: "power3.inOut" }, 0);

    return () => {
      tl.kill();
    };
  }, [activeIndex, progressPercentage]);

  useLayoutEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") transitionTo(activeIndexRef.current + 1);
      if (event.key === "ArrowLeft") transitionTo(activeIndexRef.current - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const prev = () => transitionTo(activeIndex - 1);
  const next = () => transitionTo(activeIndex + 1);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartXRef.current;
    const dy = touch.clientY - touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) transitionTo(activeIndexRef.current + 1);
    if (dx > 0) transitionTo(activeIndexRef.current - 1);
  };

  return (
    <section
      id="vision"
      ref={sectionRef}
      className={`${inter.variable} relative h-[90vh] w-full overflow-hidden`}
      style={{ backgroundColor: activeStage.surface }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto grid h-full w-full max-w-[1920px] grid-cols-1 px-6 py-10 md:px-10 md:py-11 lg:grid-cols-2 lg:items-center lg:px-16 lg:py-12">
        <div ref={textWrapRef} className="flex items-center">
          <div className="max-w-[680px]">
            <p ref={taglineRef} className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#4B5563] [font-family:var(--font-inter)]">
              {activeStage.tagline}
            </p>

            <h2 ref={headlineRef} className="mt-4 font-[var(--font-inter)] text-[2.35rem] font-extrabold leading-[0.9] tracking-[-0.03em] text-[#111827] sm:text-[3.35rem] lg:text-[4.9rem]">
              {activeStage.headline}
            </h2>

            <p ref={bodyRef} className="mt-5 max-w-[50ch] text-base leading-relaxed text-[#374151] md:text-[1.03rem]">
              {activeStage.text}
            </p>

            <p ref={stageRef} className="mt-6 text-[0.72rem] uppercase tracking-[0.24em] text-[#4B5563] [font-family:var(--font-inter)]">
              {activeStage.stageLabel}
            </p>

            <div className="mt-6 w-[280px] max-w-full">
              <div className="h-[1px] w-full bg-black/25">
                <div ref={progressFillRef} className="h-[1px] bg-[#111827]" />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-sm font-medium uppercase tracking-[0.2em] text-[#1F2937] [font-family:var(--font-inter)] w-[280px] max-w-full">
              <button
                type="button"
                onClick={prev}
                className="inline-flex items-center gap-3 opacity-85 transition hover:opacity-100 hover:-translate-x-0.5 disabled:opacity-45"
              >
                <DottedArrow direction="left" className="h-4 w-4 md:h-5 md:w-5" />
                Prev
              </button>
              <button
                type="button"
                onClick={next}
                className="group inline-flex items-center gap-3 opacity-85 transition hover:opacity-100 hover:translate-x-0.5 disabled:opacity-45"
              >
                Next
                <DottedArrow direction="right" className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={imageWrapRef}
          className="mt-10 flex items-center justify-center lg:mt-0 lg:justify-end lg:pr-8"
        >
          <div className="relative h-[39vh] w-full max-w-[760px] md:h-[45vh] lg:h-[56vh]">
            <Image
              key={activeStage.id}
              src={activeStage.imageSrc}
              alt={activeStage.headline}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-contain object-center lg:object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
