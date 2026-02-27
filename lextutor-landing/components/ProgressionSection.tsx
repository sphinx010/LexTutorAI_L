"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

type Stage = {
  id: number;
  tagline: string;
  headline: string;
  description: string;
  progressText: string;
  bgColor: string;
  imageSrc: string;
};

const stages: Stage[] = [
  {
    id: 1,
    tagline: "THE FOUNDATION",
    headline: "JUNIOR COUNSEL",
    description:
      "Master procedural rules, statutory hierarchy, and foundational case-law retrieval with disciplined legal clarity.",
    progressText:
      "Stage 01 of 04 - Daily use builds precision in legal recall and procedural grounding.",
    bgColor: "#F7E2D2", // Peach
    imageSrc: "/images/junior.jpg",
  },
  {
    id: 2,
    tagline: "THE SYNTHESIS",
    headline: "ASSOCIATE STRATEGIST",
    description:
      "Synthesize complex legal arguments across jurisdictions while preserving precision in drafting and structure.",
    progressText:
      "Stage 02 of 04 - Consistent practice compounds into cross-jurisdictional synthesis.",
    bgColor: "#DFE8DA", // Sage
    imageSrc: "/images/associate.jpg",
  },
  {
    id: 3,
    tagline: "THE ARCHITECTURE",
    headline: "SENIOR ADVOCATE",
    description:
      "Engineer robust legal frameworks and high-stakes reasoning chains that hold under adversarial pressure.",
    progressText:
      "Stage 03 of 04 - Structured feedback sharpens argument architecture and decision logic.",
    bgColor: "#EDE4D5", // Sand
    imageSrc: "/images/SAN.jpg",
  },
  {
    id: 4,
    tagline: "THE EXECUTION",
    headline: "LEAD LITIGATOR",
    description:
      "Orchestrate discovery, motion practice, and courtroom strategy with elite procedural fluency and control.",
    progressText:
      "Stage 04 of 04 - Repeated workflow mastery translates to full-spectrum litigation execution.",
    bgColor: "#DDE8F7", // Blue
    imageSrc: "/images/lead-litigator.jpg",
  },
];

export default function ProgressionSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section) => {
        if (!section) return;

        const textNodes = section.querySelectorAll<HTMLElement>("[data-progress-text]");
        const imageNode = section.querySelector<HTMLElement>("[data-progress-image]");

        if (!textNodes.length || !imageNode) return;

        gsap.set(textNodes, { y: 50, autoAlpha: 0 });
        gsap.set(imageNode, { scale: 0.95, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "top 35%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(
          imageNode,
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power2.out",
          },
          0
        ).to(
          textNodes,
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: "power3.out",
          },
          0.1
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${inter.variable} w-full`}
      aria-label="LexTutor progression section"
    >
      <div className="w-full border-y border-black/5 bg-[#f7f7f4] px-6 py-14 md:px-12 md:py-16 lg:px-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45 [font-family:var(--font-inter)]">
            The Progression
          </p>
          <h2 className="mt-3 max-w-4xl font-heading text-[2rem] leading-[0.98] text-black md:text-[3rem]">
            Progress That Reflects Competence.
          </h2>
          <p className="mt-4 max-w-3xl text-[1rem] leading-relaxed text-black/65 [font-family:var(--font-inter)] md:text-[1.08rem]">
            LexTutor levels legal practitioners through repeated, structured use -
            from recall discipline to strategic synthesis, then to full litigation
            command.
          </p>
        </div>
      </div>

      {stages.map((stage, index) => (
        <article
          key={stage.id}
          ref={(node) => {
            sectionRefs.current[index] = node;
          }}
          className="relative w-full min-h-[80vh] overflow-hidden border-t border-black/5"
          style={{ backgroundColor: stage.bgColor }}
        >
          <div className="mx-auto flex min-h-[80vh] w-full max-w-[1440px] flex-col px-6 py-10 md:px-12 md:py-14 lg:flex-row lg:items-stretch lg:justify-between lg:px-20">
            <div className="z-10 flex w-full flex-col justify-center lg:max-w-[46%]">
              <p
                data-progress-text
                className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-black/20 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black/70 [font-family:var(--font-inter)] md:text-[0.74rem]"
              >
                <MoveUpRight className="h-3.5 w-3.5" />
                {stage.tagline}
              </p>

              <h2
                data-progress-text
                className="font-heading text-[2.15rem] font-semibold uppercase leading-[0.95] tracking-tight text-black md:text-[3.1rem] lg:text-[4rem]"
              >
                {stage.headline}
              </h2>

              <p
                data-progress-text
                className="mt-5 max-w-[58ch] text-base leading-relaxed text-black/75 [font-family:var(--font-inter)] md:text-[1.08rem]"
              >
                {stage.description}
              </p>

              <p
                data-progress-text
                className="mt-5 w-fit border-b border-black/25 pb-1 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-black/60 [font-family:var(--font-inter)] md:text-[0.86rem]"
              >
                {stage.progressText}
              </p>
            </div>

            <div className="relative mt-8 h-[44vh] w-full lg:mt-0 lg:h-auto lg:min-h-[80vh] lg:w-[48%]">
              <div
                data-progress-image
                className="pointer-events-none absolute inset-0"
              >
                <Image
                  src={stage.imageSrc}
                  alt={stage.headline}
                  fill
                  priority={stage.id === 1}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-contain object-bottom lg:object-right-bottom"
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
