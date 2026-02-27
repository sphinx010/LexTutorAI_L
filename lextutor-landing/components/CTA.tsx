"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Button } from "./ui/button";

export default function CTA() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let handoffLoop: gsap.core.Timeline | null = null;
        let accentLoop: gsap.core.Timeline | null = null;
        let ctaObserver: IntersectionObserver | null = null;

        const setWaveState = (target: "none" | "secondary" | "primary") => {
            const scope = containerRef.current as HTMLElement | null;
            if (!scope) return;

            const primaryBtn = scope.querySelector(".cta-primary-btn");
            const secondaryLabel = scope.querySelector(".cta-secondary-label");
            if (!primaryBtn || !secondaryLabel) return;

            primaryBtn.classList.toggle("cta-primary-btn-wave", target === "primary");
            secondaryLabel.classList.toggle("cta-wave-text", target === "secondary");
        };

        const stopWaveLoop = () => {
            if (handoffLoop) {
                handoffLoop.kill();
                handoffLoop = null;
            }
            setWaveState("none");
        };

        const startWaveLoop = () => {
            if (handoffLoop) return;
            handoffLoop = gsap.timeline({ repeat: -1 });
            handoffLoop
                .add(() => setWaveState("secondary"))
                .to({}, { duration: 1.15 })
                .add(() => setWaveState("primary"))
                .to({}, { duration: 1.15 });
        };

        const stopAccentLoop = () => {
            if (accentLoop) {
                accentLoop.kill();
                accentLoop = null;
            }
            stopWaveLoop();
        };

        const startAccentLoop = () => {
            if (accentLoop) return;
            accentLoop = gsap.timeline({ repeat: -1 });
            accentLoop
                .add(() => setWaveState("none"))
                .to({}, { duration: 2.19 })
                .add(() => startWaveLoop())
                .to({}, { duration: 2.3 })
                .add(() => stopWaveLoop());
        };

        const ctx = gsap.context(() => {
            gsap.from(".cta-content", {
                scrollTrigger: {
                    trigger: ".cta-section",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });

            // Gradient shift
            gsap.to(".cta-gradient", {
                scrollTrigger: {
                    trigger: ".cta-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                yPercent: -20,
                ease: "none"
            });

            const sectionEl = containerRef.current as HTMLElement | null;
            if (!sectionEl) return;

            ctaObserver = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (!entry) return;
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.28) {
                        startAccentLoop();
                    } else {
                        stopAccentLoop();
                    }
                },
                { threshold: [0, 0.2, 0.28, 0.4, 0.6] }
            );

            ctaObserver.observe(sectionEl);

            // Immediate check so it works when landing directly on this section.
            const rect = sectionEl.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const visiblePx = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
            if (visiblePx / Math.max(1, vh) >= 0.28) {
                startAccentLoop();
            }
        }, containerRef);

        return () => {
            if (ctaObserver) {
                ctaObserver.disconnect();
                ctaObserver = null;
            }
            stopAccentLoop();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={containerRef} className="cta-section relative py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[52vh] md:min-h-[60vh] bg-foreground text-background">

            {/* Animated Gradient Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="cta-gradient absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/10 via-transparent to-transparent opacity-40"></div>
            </div>

            <div className="cta-content relative z-10 max-w-3xl mx-auto text-center px-4 md:px-6">
                <h2 className="cta-heading font-heading text-3xl md:text-6xl font-medium mb-5 md:mb-8 tracking-tight text-balance">
                    Ready to Structure Your Practice?
                </h2>
                <p className="cta-subtext text-secondary/80 text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                    Join the legal professionals using LexTutor to amplify their expertise with intelligent, agentic workflows.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                    <Button size="lg" className="cta-primary-btn rounded-full h-12 md:h-14 px-7 md:px-8 text-[0.95rem] md:text-base font-medium bg-background text-foreground hover:bg-background/90 hover:-translate-y-[2px] transition-all duration-[180ms] shadow-lg hover:shadow-xl">
                        <span>Get Started Now</span>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full h-12 md:h-14 px-7 md:px-8 text-[0.95rem] md:text-base font-medium border-background/20 text-background bg-transparent hover:bg-background/10 hover:-translate-y-[2px] transition-all duration-[180ms]">
                        <span className="cta-secondary-label">Schedule Demo</span>
                    </Button>
                </div>
            </div>
        </section>
    );
}
