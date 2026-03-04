"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DottedArrow from "./DottedArrow";

gsap.registerPlugin(ScrollTrigger);

const CYCLE_DURATION_SECONDS = 9;

const STATES = [
    {
        tagline: "THE FOUNDATION",
        headline: "Memory is the baseline.",
        subtext:
            "Traditional legal training optimizes for recall. While essential, this creates a bottleneck for modern practitioners.",
        phase: "PHASE 01 / 02",
    },
    {
        tagline: "THE EVOLUTION",
        headline: "Structure is mastery.",
        subtext:
            "Engineering legal outcomes requires architectural reasoning, mapping dependencies, and strategic logic under pressure.",
        phase: "PHASE 02 / 02",
    },
] as const;

export default function MemorySection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const leftPanelRef = useRef<HTMLDivElement | null>(null);
    const videoPanelRef = useRef<HTMLDivElement | null>(null);
    const taglineRef = useRef<HTMLParagraphElement | null>(null);
    const headlineRef = useRef<HTMLHeadingElement | null>(null);
    const subtextRef = useRef<HTMLParagraphElement | null>(null);
    const phaseRef = useRef<HTMLParagraphElement | null>(null);
    const progressFillRef = useRef<HTMLDivElement | null>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);
    const isTransitioningRef = useRef(false);
    const progressTweenRef = useRef<gsap.core.Tween | null>(null);
    const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    activeIndexRef.current = activeIndex;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (leftPanelRef.current) {
                gsap.fromTo(
                    leftPanelRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".memory-section",
                            start: "top 80%",
                            once: true,
                        },
                    }
                );
            }

            if (videoPanelRef.current) {
                gsap.fromTo(
                    videoPanelRef.current,
                    { y: 36, opacity: 0, scale: 0.98 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".memory-section",
                            start: "top 76%",
                            once: true,
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        const nodes = [taglineRef.current, headlineRef.current, subtextRef.current, phaseRef.current].filter(Boolean) as HTMLElement[];
        if (nodes.length === 0 || !progressFillRef.current) return;

        progressTweenRef.current?.kill();

        gsap.set(nodes, { autoAlpha: 0, y: 16 });
        gsap.set(progressFillRef.current, { width: "0%" });

        gsap.to(nodes, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
            onComplete: () => {
                isTransitioningRef.current = false;
            },
        });

        progressTweenRef.current = gsap.to(progressFillRef.current, {
            width: "100%",
            duration: CYCLE_DURATION_SECONDS,
            ease: "none",
        });

        return () => {
            progressTweenRef.current?.kill();
        };
    }, [activeIndex]);

    useEffect(() => {
        if (autoTimerRef.current) {
            clearTimeout(autoTimerRef.current);
            autoTimerRef.current = null;
        }

        autoTimerRef.current = setTimeout(() => {
            transitionTo(activeIndexRef.current + 1);
        }, CYCLE_DURATION_SECONDS * 1000);

        return () => {
            if (autoTimerRef.current) {
                clearTimeout(autoTimerRef.current);
                autoTimerRef.current = null;
            }
        };
    }, [activeIndex]);

    const transitionTo = (nextIndex: number) => {
        if (isTransitioningRef.current) return;

        const normalized = (nextIndex + STATES.length) % STATES.length;
        if (normalized === activeIndexRef.current) return;

        isTransitioningRef.current = true;
        progressTweenRef.current?.kill();
        if (autoTimerRef.current) {
            clearTimeout(autoTimerRef.current);
            autoTimerRef.current = null;
        }

        const nodes = [taglineRef.current, headlineRef.current, subtextRef.current, phaseRef.current].filter(Boolean) as HTMLElement[];
        if (nodes.length === 0) {
            setActiveIndex(normalized);
            return;
        }

        gsap.to(nodes, {
            autoAlpha: 0,
            y: -12,
            duration: 0.22,
            ease: "power2.in",
            onComplete: () => {
                setActiveIndex(normalized);
            },
        });
    };

    const goNext = () => transitionTo(activeIndexRef.current + 1);
    const goPrev = () => transitionTo(activeIndexRef.current - 1);

    const state = STATES[activeIndex];

    return (
        <section id="environment" ref={sectionRef} className="memory-section relative w-full overflow-hidden bg-[#9CCCEE]">
            <div className="mx-auto w-full max-w-[1920px] px-6 md:px-10 lg:px-16">
                <div className="flex min-h-[78vh] w-full flex-col lg:min-h-[78vh] lg:flex-row">
                    <div ref={leftPanelRef} className="w-full pt-10 pb-6 lg:w-1/2 lg:py-16 flex flex-col justify-center">
                        <div className="flex w-full max-w-[680px] flex-col" onClick={goNext}>
                            <p ref={taglineRef} className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-800 mb-4 cursor-pointer">
                                {state.tagline}
                            </p>
                            <h2 ref={headlineRef} className="text-5xl font-extrabold leading-[0.9] tracking-tight text-gray-900 md:text-7xl cursor-pointer">
                                {state.headline}
                            </h2>

                            {/* Mobile Image Injection (Hidden on Desktop) */}
                            <div className="lg:hidden mt-6 mb-6 flex w-full items-center justify-center">
                                <div className="relative h-[43vh] w-full max-w-[820px] overflow-hidden md:h-[50vh]">
                                    <Image
                                        src="/images/memory-stress.png"
                                        alt="Lawyer under cognitive overload with stacked legal books"
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 46vw, 92vw"
                                        className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-700 ease-in-out ${activeIndex === 0 ? "opacity-100" : "opacity-0"
                                            }`}
                                    />
                                    <Image
                                        src="/images/structure-mastery.png"
                                        alt="Lawyer in calm structured workflow using laptop and phone"
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 46vw, 92vw"
                                        className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-700 ease-in-out ${activeIndex === 1 ? "opacity-100" : "opacity-0"
                                            }`}
                                    />
                                </div>
                            </div>

                            <p ref={subtextRef} className="mt-2 lg:mt-6 max-w-md text-sm lg:text-lg leading-relaxed text-gray-800 cursor-pointer">
                                {state.subtext}
                            </p>
                            <p ref={phaseRef} className="mb-6 lg:mb-8 mt-4 lg:mt-6 text-xs font-medium uppercase tracking-widest text-gray-700 cursor-pointer">
                                {state.phase}
                            </p>

                            <button
                                type="button"
                                onClick={goNext}
                                className="w-40 text-left"
                                aria-label="Skip to next memory phase"
                            >
                                <div className="relative h-px w-full bg-gray-300">
                                    <div ref={progressFillRef} className="absolute left-0 top-0 h-px w-0 bg-gray-900" />
                                </div>
                            </button>

                            <div className="mt-4 lg:mt-5 flex w-40 items-center justify-between text-sm font-medium uppercase tracking-[0.2em] text-[#1F2937]">
                                <button type="button" onClick={goPrev} className="inline-flex items-center gap-3 opacity-90 transition hover:opacity-100 hover:-translate-x-0.5">
                                    <DottedArrow direction="left" className="h-4 w-4 md:h-5 md:w-5" />
                                    Prev
                                </button>
                                <button type="button" onClick={goNext} className="inline-flex items-center gap-3 opacity-90 transition hover:opacity-100 hover:translate-x-0.5">
                                    Next
                                    <DottedArrow direction="right" className="h-4 w-4 md:h-5 md:w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Image Injection (Hidden on Mobile) */}
                    <div ref={videoPanelRef} className="hidden lg:flex w-full items-center justify-end lg:w-1/2 lg:pr-8">
                        <div className="relative h-[64vh] w-full max-w-[820px] overflow-hidden">
                            <Image
                                src="/images/memory-stress.png"
                                alt="Lawyer under cognitive overload with stacked legal books"
                                fill
                                priority
                                sizes="(min-width: 1024px) 46vw, 92vw"
                                className={`absolute inset-0 h-full w-full object-contain object-center lg:object-right transition-opacity duration-700 ease-in-out ${activeIndex === 0 ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                            <Image
                                src="/images/structure-mastery.png"
                                alt="Lawyer in calm structured workflow using laptop and phone"
                                fill
                                priority
                                sizes="(min-width: 1024px) 46vw, 92vw"
                                className={`absolute inset-0 h-full w-full object-contain object-center lg:object-right transition-opacity duration-700 ease-in-out ${activeIndex === 1 ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
