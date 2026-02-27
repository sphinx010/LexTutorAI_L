"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";

const FEATURES = [
    {
        title: "Relational Mapping",
        description: "Contextual understanding of cross-jurisdictional precedents.",
    },
    {
        title: "Cognitive Feedback",
        description: "Diagnostic analysis of personal reasoning patterns.",
    },
    {
        title: "Precedent Integrity",
        description: "Real-time verification of authorities and citation chains.",
    },
] as const;

export default function IntelligenceSection() {
    const containerRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".intelligence-section",
                    start: "top 75%",
                    once: true,
                },
            });

            tl.fromTo(
                ".intelligence-tagline",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" }
            )
                .fromTo(
                    ".intelligence-headline-line",
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.15, duration: 0.95, ease: "power3.out" },
                    "-=0.2"
                );

            tl.fromTo(
                ".intelligence-subtext",
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.35"
            ).fromTo(
                ".intelligence-feature",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.12, duration: 0.72, ease: "power2.out" },
                "-=0.35"
            );

            gsap.fromTo(
                ".intelligence-brain-image",
                { scale: 1.08, opacity: 0, y: 28 },
                {
                    scale: 1.16,
                    opacity: 1,
                    y: 0,
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".intelligence-section",
                        start: "top 78%",
                        once: true,
                    },
                }
            );

            gsap.to(".intelligence-brain-float", {
                y: -20,
                duration: 3.8,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={containerRef}
            className="intelligence-section relative overflow-hidden bg-[#EEEEEE] py-10 md:py-12 lg:h-[77vh] lg:max-h-[640px] lg:overflow-visible lg:py-12"
        >
            <div className="intelligence-brain-shell pointer-events-none absolute inset-y-0 right-0 hidden w-[66%] overflow-hidden lg:block">
                <div className="intelligence-brain-float absolute inset-0">
                    <Image
                        src="/images/cognitive.png"
                        alt="Cognitive intelligence brain visualization"
                        fill
                        priority={true}
                        quality={100}
                        sizes="66vw"
                        className="intelligence-brain-image object-cover object-[85%_52%] opacity-100"
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_64px_26px_#EEEEEE]" />
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#eeeeee] to-transparent" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1920px] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-6">
                    <div className="flex items-center lg:min-h-[430px]">
                        <div className="w-full max-w-2xl">
                            <p className="intelligence-tagline mb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
                                THE INTELLIGENCE LAYER
                            </p>

                            <h2 className="font-sans text-4xl font-black leading-[0.82] tracking-[-0.03em] text-slate-900 md:text-[3.1rem] lg:text-[3.35rem]">
                                <span className="intelligence-headline-line block">Powered by</span>
                                <span className="intelligence-headline-line block text-[#57B7E9]">Agentic</span>
                                <span className="intelligence-headline-line block">Legal</span>
                                <span className="intelligence-headline-line block">Intelligence</span>
                            </h2>

                            <p className="intelligence-subtext mb-6 mt-4 max-w-xl font-sans text-[0.98rem] leading-relaxed text-gray-700 md:text-base">
                                Our architecture does not just process text. It maps legal relationships and surfaces logical inconsistencies in real time.
                            </p>

                            <ul className="mt-1 pb-1">
                                {FEATURES.map(({ title, description }) => (
                                    <li key={title} className="intelligence-feature">
                                        <div className="my-3.5 h-[0.5px] w-[78%] bg-slate-900/90" />
                                        <p className="font-sans text-[1rem] font-bold text-slate-900 md:text-[1.01rem]">{title}</p>
                                        <p className="mt-1 font-sans text-sm leading-snug text-slate-600 md:text-[0.95rem]">{description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="hidden lg:block" />
                </div>

                <div className="intelligence-brain-shell relative mt-10 h-[330px] w-full overflow-hidden md:h-[420px] lg:hidden">
                    <Image
                        src="/images/cognitive.png"
                        alt="Cognitive intelligence brain visualization"
                        fill
                        priority={true}
                        quality={100}
                        sizes="100vw"
                        className="object-cover object-center opacity-100"
                    />
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_44px_16px_#EEEEEE]" />
                </div>
            </div>
        </section>
    );
}
