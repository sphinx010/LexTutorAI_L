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
            id="intelligence"
            ref={containerRef}
            className="intelligence-section relative overflow-hidden bg-[#EEEEEE] h-[90vh]"
        >
            <div className="intelligence-brain-shell pointer-events-none absolute inset-y-0 right-0 hidden w-[66%] lg:w-[58%] xl:w-[50%] overflow-hidden lg:flex items-center justify-end pr-10">
                <div className="intelligence-brain-float relative w-full h-[88%] mix-blend-darken [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]">
                    <Image
                        src="/images/cognitive.png"
                        alt="Cognitive intelligence brain visualization"
                        fill
                        priority={true}
                        quality={100}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="intelligence-brain-image object-contain object-right opacity-90"
                    />
                </div>
            </div>

            <div className="relative z-10 mx-auto h-full w-full max-w-[1920px] px-6 md:px-10 lg:px-16 flex flex-col justify-center">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center h-full">
                        <div className="w-full max-w-2xl text-left">
                            <p className="intelligence-tagline mb-3 text-[0.72rem] font-bold tracking-[0.24em] text-gray-500 uppercase">
                                THE INTELLIGENCE LAYER
                            </p>

                            <h2 className="font-sans mb-2 text-3xl font-black leading-[1.05] tracking-[-0.03em] text-slate-900 md:text-4xl lg:text-[2.8rem] xl:text-[3.2rem]">
                                <span className="intelligence-headline-line block">Powered by</span>
                                <span className="intelligence-headline-line block text-[#57B7E9] mt-1">Agentic</span>
                                <span className="intelligence-headline-line block mt-1">Legal</span>
                                <span className="intelligence-headline-line block mt-1">Intelligence</span>
                            </h2>

                            <p className="intelligence-subtext mb-6 mt-4 max-w-xl font-sans text-[0.95rem] leading-relaxed text-gray-700 md:text-base">
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
                        className="object-cover object-center mix-blend-darken [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] opacity-90"
                    />
                </div>
            </div>
        </section>
    );
}
