"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DottedArrow from "./DottedArrow";

import IDCardMobile from "./IDCardMobile";

gsap.registerPlugin(ScrollTrigger);

const AUTO_CYCLE_SECONDS = 9;

type FeatureItem = {
    title: string;
    desc: string;
    refLabel: string;
    refDesc: string;
    serial: string;
    icon: string;
    barcodeGlow: string;
};

const features: FeatureItem[] = [
    {
        title: "Cognitive Mapping",
        desc: "Get diagnostic analysis of personal reasoning patterns, infuse learning with psychology.",
        refLabel: "REF: SEC. 28 / CRIMINAL CODE",
        refDesc: "(Defence of Insanity)",
        serial: "LX-COG-9921-KL",
        icon: "/icons/cognitive-mapping.png",
        barcodeGlow: "rgba(86,182,194,0.5)",
    },
    {
        title: "Precedent Analysis",
        desc: "Trace case law evolution with temporal graphs.",
        refLabel: "REF: SEC. 167 / EVIDENCE ACT",
        refDesc: "(Presumptions of facts/Judicial notice)",
        serial: "LX-PREC-0082-3164",
        icon: "/icons/precedent-analysis.png",
        barcodeGlow: "rgba(124,255,158,0.5)",
    },
    {
        title: "Balanced Reasoning",
        desc: "Study with smart intellisense, instantly lints submissions for missing authorities.",
        refLabel: "REF: RULE 1 / RPC 2023",
        refDesc: "(General Responsibilites of a Lawyer)",
        serial: "LX-BAL-7731-MN",
        icon: "/icons/balanced-reasoning.png",
        barcodeGlow: "rgba(242,201,76,0.5)",
    },
    {
        title: "Bar Ready",
        desc: "Secure your expectations with AI-driven performance tracking.",
        refLabel: "REF: SEC. 84 / EVIDENCE ACT",
        refDesc: "(Admissibility of computer-generated evidence)",
        serial: "LX-BAR-4452-PQ",
        icon: "/icons/bar-ready.png",
        barcodeGlow: "rgba(255,47,146,0.5)",
    },
    {
        title: "Instant Synthesis",
        desc: "Convert hours of reading into minutes of insight.",
        refLabel: "REF: SEC. 126 / EVIDENCE ACT",
        refDesc: "(Oral evidence must be direct)",
        serial: "LX-SYN-1183-RS",
        icon: "/icons/instant-synthesis.png?v=20260221103432",
        barcodeGlow: "rgba(86,182,194,0.5)",
    },
    {
        title: "Socratic Study",
        desc: "AI-driven dialogue that challenges foundational legal reasoning.",
        refLabel: "REF: SEC. 36 / 1999 CONSTITUTION",
        refDesc: "(Right to fair hearing)",
        serial: "LX-SOC-6694-TU",
        icon: "/icons/socratic-study.png?v=20260221101531",
        barcodeGlow: "rgba(124,255,158,0.5)",
    },
];

export default function Features() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const leftRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const progressFillRef = useRef<HTMLDivElement | null>(null);
    const progressPulseRef = useRef<HTMLDivElement | null>(null);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fillTweenRef = useRef<gsap.core.Tween | null>(null);
    const pulseTweenRef = useRef<gsap.core.Tween | null>(null);
    const isTransitioningRef = useRef(false);
    const activeIndexRef = useRef(0);

    const [activeIndex, setActiveIndex] = useState(0);
    activeIndexRef.current = activeIndex;

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const stopProgress = useCallback(() => {
        fillTweenRef.current?.kill();
        pulseTweenRef.current?.kill();
        fillTweenRef.current = null;
        pulseTweenRef.current = null;
    }, []);

    const startProgress = useCallback(() => {
        if (!progressFillRef.current || !progressPulseRef.current) return;

        gsap.set(progressFillRef.current, { width: "0%" });
        gsap.set(progressPulseRef.current, { left: "0%", x: -18, opacity: 0.9 });

        fillTweenRef.current = gsap.to(progressFillRef.current, {
            width: "100%",
            duration: AUTO_CYCLE_SECONDS,
            ease: "none",
        });

        pulseTweenRef.current = gsap.to(progressPulseRef.current, {
            left: "100%",
            duration: AUTO_CYCLE_SECONDS,
            ease: "none",
        });
    }, []);

    const goToIndex = useCallback(
        (nextIndex: number) => {
            if (isTransitioningRef.current) return;

            const normalized = (nextIndex + features.length) % features.length;
            if (normalized === activeIndexRef.current) return;

            clearTimer();
            stopProgress();
            isTransitioningRef.current = true;

            if (!cardRef.current) {
                setActiveIndex(normalized);
                isTransitioningRef.current = false;
                return;
            }

            gsap.to(cardRef.current, {
                autoAlpha: 0,
                scale: 0.985,
                y: 10,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    setActiveIndex(normalized);
                    isTransitioningRef.current = false;
                },
            });
        },
        [clearTimer, stopProgress]
    );

    const goPrev = useCallback(() => goToIndex(activeIndexRef.current - 1), [goToIndex]);
    const goNext = useCallback(() => goToIndex(activeIndexRef.current + 1), [goToIndex]);

    const scheduleAutoCycle = useCallback(() => {
        clearTimer();
        timerRef.current = setTimeout(() => {
            goToIndex(activeIndexRef.current + 1);
        }, AUTO_CYCLE_SECONDS * 1000);
    }, [clearTimer, goToIndex]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (leftRef.current) {
                gsap.fromTo(
                    leftRef.current,
                    { y: 28, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".built-structure-section",
                            start: "top 82%",
                            once: true,
                        },
                    }
                );
            }

            if (cardRef.current) {
                gsap.fromTo(
                    cardRef.current,
                    { y: 28, opacity: 0, scale: 0.985 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".built-structure-section",
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
        if (!cardRef.current) return;

        gsap.fromTo(
            cardRef.current,
            { autoAlpha: 0, scale: 0.985, y: 10 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.42, ease: "power2.out" }
        );

        startProgress();
        scheduleAutoCycle();
    }, [activeIndex, scheduleAutoCycle, startProgress]);

    useEffect(() => {
        return () => {
            clearTimer();
            stopProgress();
        };
    }, [clearTimer, stopProgress]);

    const current = features[activeIndex];

    const stageLabel = `STAGE ${String(activeIndex + 1).padStart(2, "0")} / ${String(features.length).padStart(2, "0")}`;
    return (
        <section ref={sectionRef} id="environment" className="built-structure-section relative w-full bg-[#020300] h-[90vh]">
            <div className="mx-auto h-full w-full max-w-[1920px] px-6 md:px-10 lg:px-16 flex flex-col justify-center">

                {/* 
                  MOBILE LAYOUT (< lg) 
                  Hierarchy: Heading -> ID Card -> Short Desc -> Controls 
                */}
                <div className="flex flex-col items-center text-center lg:hidden">
                    <p className="mb-3 text-[0.72rem] font-bold tracking-[0.24em] text-gray-500 uppercase">THE ENVIRONMENT</p>
                    <h2 className="mb-2 text-4xl font-extrabold tracking-tight leading-[1.05] text-white sm:text-5xl">
                        Built for Structure
                    </h2>
                    <p className="mb-6 max-w-sm text-sm leading-relaxed text-gray-400">
                        Move beyond memorization. LexTutor architects your legal understanding.
                    </p>

                    {/* Scaled ID Card Stack Vertical Mobile Edition */}
                    <div className="flex w-full justify-center px-4 mb-4 xl:hidden">
                        <div className="w-full max-w-[340px] h-[550px] sm:h-[650px]">
                            <IDCardMobile current={current} activeIndex={activeIndex} />
                        </div>
                    </div>

                    <p className="mb-4 font-mono text-[10px] tracking-widest text-gray-500">
                        {stageLabel}
                    </p>

                    <div className="flex w-full max-w-[240px] items-center justify-between">
                        <button
                            type="button"
                            onClick={goPrev}
                            className="group flex cursor-pointer items-center gap-2 text-xs font-medium text-white transition-all hover:-translate-x-0.5"
                        >
                            <DottedArrow direction="left" gradient className="h-5 w-5 opacity-70 drop-shadow-[0_0_8px_rgba(98,191,208,0.5)] transition-all group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(98,191,208,0.8)]" />
                            Prev
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            className="group flex cursor-pointer items-center gap-2 text-xs font-medium text-white transition-all hover:translate-x-0.5"
                        >
                            Next
                            <DottedArrow direction="right" gradient className="h-5 w-5 opacity-70 drop-shadow-[0_0_8px_rgba(98,191,208,0.5)] transition-all group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(98,191,208,0.8)]" />
                        </button>
                    </div>
                </div>

                {/* 
                  DESKTOP LAYOUT (>= lg) 
                  Preserved Original Structure 
                */}
                <div className="hidden lg:flex flex-row items-center gap-14">
                    <div ref={leftRef} className="w-full pr-0 lg:w-[42%] xl:w-[45%] lg:pr-12">
                        <p className="mb-4 text-[0.72rem] font-bold tracking-[0.24em] text-gray-400 uppercase">THE ENVIRONMENT</p>
                        <h2 className="mb-6 text-5xl font-extrabold tracking-tight leading-[0.9] text-white xl:text-7xl">
                            Built for Structure
                        </h2>
                        <p className="mb-12 max-w-xl text-lg leading-relaxed text-gray-400">
                            Move beyond memorization. LexTutor architects your legal understanding.
                        </p>

                        <p className="mb-4 font-mono text-xs tracking-widest text-gray-500">{stageLabel}</p>

                        <button
                            type="button"
                            onClick={goNext}
                            className="mb-8 block w-[360px] md:w-[400px] max-w-full text-left"
                            aria-label="Skip to next structure card"
                        >
                            <div className="relative h-px w-full overflow-hidden bg-gray-800">
                                <div ref={progressFillRef} className="h-full w-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                <div ref={progressPulseRef} className="pointer-events-none absolute left-0 top-1/2 h-2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 blur-sm shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            </div>
                        </button>

                        <div className="flex items-center justify-between w-[360px] md:w-[400px] max-w-full">
                            <button
                                type="button"
                                onClick={goPrev}
                                className="group flex cursor-pointer items-center gap-2 text-sm font-medium text-white transition-all hover:-translate-x-0.5"
                            >
                                <DottedArrow direction="left" gradient className="h-6 w-6 opacity-70 drop-shadow-[0_0_8px_rgba(98,191,208,0.5)] transition-all group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(98,191,208,0.8)] md:h-8 md:w-8" />
                                Prev
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                className="group flex cursor-pointer items-center gap-2 text-sm font-medium text-white transition-all hover:translate-x-0.5"
                            >
                                Next
                                <DottedArrow direction="right" gradient className="h-6 w-6 opacity-70 drop-shadow-[0_0_8px_rgba(98,191,208,0.5)] transition-all group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(98,191,208,0.8)] md:h-8 md:w-8" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-[58%] xl:w-[55%] flex items-center justify-end lg:pr-8">
                        <div
                            ref={cardRef}
                            className="group relative flex h-[360px] w-full max-w-[640px] lg:h-[370px] xl:h-[380px] lg:max-w-[760px] xl:max-w-[800px] overflow-hidden rounded-3xl border border-white/15 bg-black/80 shadow-[0_24px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1"
                        >
                            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(132deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.08)_16%,rgba(255,255,255,0.02)_30%,rgba(255,255,255,0)_52%,rgba(255,255,255,0.1)_100%)] opacity-45" />
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(255,255,255,0.08),transparent_44%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.05),transparent_38%)] opacity-60" />
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:12px_12px] opacity-[0.12]" />
                            <div className="pointer-events-none absolute inset-[1px] rounded-[1.45rem] border border-white/10" />
                            <div className="pointer-events-none absolute left-8 top-0 h-px w-1/3 bg-gradient-to-r from-white/75 via-white/45 to-transparent opacity-80" />
                            <div className="pointer-events-none absolute right-0 top-10 h-1/3 w-px bg-gradient-to-b from-white/55 via-white/20 to-transparent" />
                            <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-36 rotate-[-18deg] bg-white/25 blur-2xl opacity-25" />
                            <div className="pointer-events-none absolute -right-12 bottom-[-52px] h-28 w-44 rotate-[12deg] bg-white/15 blur-2xl opacity-20" />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:from-transparent group-hover:via-white/5 group-hover:to-transparent group-hover:opacity-100" />

                            <div className="relative flex h-full w-1/3 border-r border-white/10 bg-[#191919]">
                                <div className="relative flex h-full w-full flex-col items-center justify-start px-5 pb-5 pt-7">
                                    <div className="absolute inset-4 rounded-2xl border border-white/10" />
                                    <div className="pointer-events-none absolute inset-[22px] rounded-xl border border-dashed border-white/10" />
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),transparent_54%)]" />

                                    <div className="relative z-10 mt-1 h-[154px] w-[154px] overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/42 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.42)]">
                                        <Image
                                            src={current.icon}
                                            alt={current.title}
                                            width={420}
                                            height={420}
                                            priority={activeIndex === 0}
                                            className="relative z-10 h-full w-full rounded-[0.95rem] object-contain [mask-image:radial-gradient(ellipse_80%_80%_at_50%_46%,black_58%,transparent_100%)]"
                                        />
                                        <div className="pointer-events-none absolute inset-0 z-20 rounded-[1.2rem] bg-[radial-gradient(circle_at_95%_95%,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.8)_12%,transparent_30%)]" />
                                        <div className="pointer-events-none absolute inset-0 rounded-[1.2rem] shadow-[inset_0_0_24px_10px_rgba(13,13,13,0.9)]" />
                                        <div className="pointer-events-none absolute inset-0 rounded-[1.2rem] ring-1 ring-white/10" />
                                    </div>

                                    <div className="z-10 mt-3 max-w-[160px]">
                                        <p className="text-[8px] font-mono uppercase tracking-[0.16em] text-gray-400">User ID</p>
                                        <p className="mt-0.5 text-[10px] font-mono leading-tight tracking-[0.08em] text-[#FF2F92]">{current.serial}</p>
                                    </div>

                                    <div className="z-10 mt-auto mb-1 w-[160px] border-t border-white/10 pt-4 transition-colors group-hover:border-white/20">
                                        <p className="mb-1 text-[8px] font-mono uppercase tracking-widest text-gray-500">
                                            SCAN CODE
                                        </p>
                                        <div className="relative h-6 w-full" style={{ "--barcode-glow": current.barcodeGlow } as React.CSSProperties}>
                                            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#fff_0px,#fff_1px,transparent_1px,transparent_3px)] opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:[box-shadow:0_0_10px_var(--barcode-glow)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex h-full flex-1 flex-col justify-center bg-[#111111] p-8 lg:p-10">
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_22%,rgba(255,255,255,0)_52%,rgba(255,255,255,0.04)_100%)]" />
                                <div className="pointer-events-none absolute left-0 top-0 h-px w-2/3 bg-gradient-to-r from-white/55 via-white/20 to-transparent" />
                                <div className="pointer-events-none absolute inset-[1px] rounded-r-[1.45rem] border border-white/10" />
                                <div className="pointer-events-none absolute -top-10 right-10 h-24 w-36 rotate-[14deg] bg-white/15 blur-2xl opacity-20" />

                                <p className="absolute left-8 lg:left-10 top-6 text-[8px] font-mono uppercase tracking-[0.16em] text-black/80 [text-shadow:0_1px_1px_rgba(255,255,255,0.15)] group-hover:text-[#FB923C] group-hover:[text-shadow:0_0_10px_rgba(251,146,60,0.5)] transition-all duration-300">
                                    LEX TUTOR CLEARANCE LEVEL 5
                                </p>
                                <p className="absolute right-8 lg:right-10 bottom-6 text-[8px] font-mono uppercase tracking-[0.16em] text-black/80 [text-shadow:0_1px_1px_rgba(255,255,255,0.15)] group-hover:text-[#FB923C] group-hover:[text-shadow:0_0_10px_rgba(251,146,60,0.5)] transition-all duration-300">
                                    AUTHORIZED PERSONNEL ONLY
                                </p>

                                <p className="mt-4 mb-1 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                                    FEATURE
                                </p>
                                <h3 className="mb-2 text-2xl lg:text-3xl font-bold tracking-tight text-[#F2C94C] [text-shadow:0_1px_0_rgba(255,255,255,0.1)] drop-shadow-[0_0_8px_rgba(242,201,76,0.35)]">
                                    {current.title}
                                </h3>
                                <hr className="my-3 border-white/10" />
                                <p className="mb-5 text-sm lg:text-base font-medium leading-relaxed text-white/95">
                                    {current.desc}
                                </p>

                                <hr className="mb-4 border-white/10" />
                                <p className="mb-1 text-[10px] lg:text-[11px] font-mono uppercase tracking-widest text-[#66D9EF]">
                                    LEGAL REFERENCE
                                </p>
                                <p className="text-xs lg:text-sm font-mono uppercase tracking-wide text-[#7CFF9E] drop-shadow-[0_0_8px_rgba(124,255,158,0.3)]">
                                    {current.refLabel}
                                </p>
                                <p className="mt-1 text-xs lg:text-sm font-mono text-[#7CFF9E]">
                                    {current.refDesc}
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
