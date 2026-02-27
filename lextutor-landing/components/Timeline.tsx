"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const phases = [
    {
        phase: "PHASE 01",
        role: "Junior Counsel",
        detail: "Mastery of procedural rules and foundational case-law retrieval.",
    },
    {
        phase: "PHASE 02",
        role: "Associate Strategist",
        detail: "Synthesis of complex legal arguments and multi-faceted drafting.",
    },
    {
        phase: "PHASE 03",
        role: "Senior Advocate",
        detail: "Advanced architectural mastery and high-stakes decision logic.",
    },
    {
        phase: "PHASE 04",
        role: "Lead Litigator",
        detail: "Precision orchestration across discovery, motion practice, and trial framing.",
    },
];

export default function Timeline() {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".timeline-line-fill", { scaleY: 0, transformOrigin: "top center" });
            gsap.set(".timeline-dot", { scale: 0, opacity: 0 });
            gsap.set(".timeline-role", { opacity: 0, y: 4 });
            gsap.set(".timeline-phase", { opacity: 0, y: 4 });

            phases.forEach((_, i) => {
                gsap.set(`.timeline-role-${i}`, { x: i % 2 === 0 ? -64 : 64 });
                gsap.set(`.timeline-phase-${i}`, { x: i % 2 === 0 ? 48 : -48 });
            });

            gsap.to(".timeline-line-fill", {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".timeline-section",
                    start: "top 82%",
                    end: "bottom 56%",
                    scrub: 0.25,
                    invalidateOnRefresh: true,
                    refreshPriority: 1,
                },
            });

            phases.forEach((_, i) => {
                const rowTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: `.timeline-row-${i}`,
                        start: "top 90%",
                        end: "top 68%",
                        toggleActions: "play none none reverse",
                        invalidateOnRefresh: true,
                        fastScrollEnd: true,
                    },
                });

                rowTl.to(`.timeline-dot-${i}`, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.12,
                    ease: "power2.out",
                }, 0)
                    .to(`.timeline-role-${i}`, {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.28,
                        ease: "power3.out",
                    }, 0.03)
                    .to(`.timeline-phase-${i}`, {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.22,
                        ease: "power3.out",
                    }, 0.07)
                    .to(`.timeline-phase-label-${i}`, {
                        color: "#22C7E8",
                        duration: 0.18,
                        ease: "power2.out",
                    }, 0.07);
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="pricing" ref={containerRef} className="timeline-section relative overflow-hidden bg-background py-16 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                <div className="mb-10 text-center md:mb-20">
                    <p className="mb-3 text-xs font-bold tracking-[0.24em] text-muted-foreground/90">THE PROGRESSION</p>
                    <h2 className="font-heading text-2xl sm:text-3xl font-medium leading-tight md:text-6xl">
                        Progress That Reflects Competence.
                    </h2>
                </div>

                <div className="timeline-container relative mx-auto max-w-5xl">
                    <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-border md:block"></div>
                    <div className="timeline-line-fill absolute left-1/2 top-0 bottom-0 hidden w-[2px] -translate-x-1/2 bg-primary md:block"></div>

                    <div className="space-y-8 md:space-y-14">
                        {phases.map((item, i) => {
                            const leftPrimary = i % 2 === 0;
                            return (
                                <div key={item.phase} className={cn("grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-8", `timeline-row-${i}`)}>
                                    <div className={cn("timeline-role timeline-role-" + i, leftPrimary ? "md:text-right" : "md:order-3 md:text-left")}>
                                        <h3 className="font-heading text-3xl italic md:text-5xl">{item.role}</h3>
                                        <p className="mt-2 md:mt-3 text-base leading-relaxed text-muted-foreground md:text-xl">{item.detail}</p>
                                    </div>

                                    <div className="timeline-dot-wrapper relative z-10 hidden md:flex md:order-2 md:h-8 md:w-8 md:items-center md:justify-center">
                                        <span className={cn(
                                            "timeline-dot rounded-full border border-primary/20 bg-primary shadow-[0_0_0_4px_hsl(var(--background))]",
                                            "h-3.5 w-3.5",
                                            "timeline-dot-" + i
                                        )}></span>
                                    </div>

                                    <div className={cn("timeline-phase timeline-phase-" + i, leftPrimary ? "md:order-3 md:text-left" : "md:text-right")}>
                                        <p className={cn("text-xs md:text-sm font-semibold tracking-[0.22em] text-muted-foreground", "timeline-phase-label-" + i)}>{item.phase}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
