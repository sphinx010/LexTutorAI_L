"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const DARK_SECTION_IDS = new Set(["hero", "features", "structure"]);

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkSection, setIsDarkSection] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isRopeActive, setIsRopeActive] = useState(false);
  const [animationFrameTime, setAnimationFrameTime] = useState(0);

  const lastScrollYRef = useRef(0);

  const targetCenterRef = useRef(50);
  const animatedCenterRef = useRef(50);
  const targetPullRef = useRef(0.9);
  const animatedPullRef = useRef(0.9);
  const centerVelocityRef = useRef(0);
  const pullVelocityRef = useRef(0);
  const isRopeActiveRef = useRef(false);
  const ripplesRef = useRef<Array<{ center: number; start: number }>>([]);
  const rafRef = useRef<number | null>(null);

  const lineTrackRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const navRowRef = useRef<HTMLDivElement | null>(null);

  const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

  const updateCenterFromElement = useCallback((element: HTMLElement) => {
    if (!lineTrackRef.current) return;
    const targetRect = element.getBoundingClientRect();
    const trackRect = lineTrackRef.current.getBoundingClientRect();
    if (trackRect.width <= 0) return;

    const centerPercent =
      ((targetRect.left + targetRect.width / 2 - trackRect.left) / trackRect.width) *
      100;
    targetCenterRef.current = clampPercent(centerPercent);
  }, []);

  const updateCenterFromClientX = (clientX: number) => {
    if (!lineTrackRef.current) return;
    const trackRect = lineTrackRef.current.getBoundingClientRect();
    if (trackRect.width <= 0) return;

    const percent = ((clientX - trackRect.left) / trackRect.width) * 100;
    targetCenterRef.current = clampPercent(percent);
  };

  const handleNavMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updateCenterFromClientX(event.clientX);

    if (navRowRef.current) {
      const navRect = navRowRef.current.getBoundingClientRect();
      const yRatio =
        clampPercent(((navRect.bottom - event.clientY) / navRect.height) * 100) / 100;
      targetPullRef.current = 3.4 + yRatio * 13.8;
    }

    isRopeActiveRef.current = true;
    setIsRopeActive(true);
  };

  const handleLinkFocus = (event: React.FocusEvent<HTMLAnchorElement>) => {
    updateCenterFromElement(event.currentTarget);
    targetPullRef.current = 9.2;
    isRopeActiveRef.current = true;
    setIsRopeActive(true);
  };

  const ropePath = useMemo(() => {
    const points: string[] = [];
    const baseY = 14;
    const step = 1;
    const center = animatedCenterRef.current;
    const now = animationFrameTime || performance.now();
    const hoverPull = isRopeActive ? animatedPullRef.current : 0.95;
    const sigma = isRopeActive ? 7.8 : 40;

    for (let x = 0; x <= 100; x += step) {
      const dx = x - center;
      const u = dx / sigma;
      const nFold = (u * u - 1) * Math.exp(-(u * u) / 2);
      const hoverCurve = hoverPull * 0.96 * nFold;

      let rippleWave = 0;
      for (const ripple of ripplesRef.current) {
        const age = (now - ripple.start) / 1000;
        if (age > 1.25) continue;

        const distance = Math.abs(x - ripple.center);
        const waveSpeed = 78;
        const front = waveSpeed * age;
        const frontDistance = Math.abs(distance - front);
        const frontEnvelope = Math.exp(-(frontDistance * frontDistance) / (2 * 8.8 * 8.8));
        const timeFalloff = Math.exp(-age * 1.55);
        const wavelength = 11.8;
        const k = (2 * Math.PI) / wavelength;
        const phase = k * (distance - front);
        rippleWave += Math.sin(phase) * 4.1 * frontEnvelope * timeFalloff;
      }

      const y = baseY + hoverCurve + rippleWave;
      points.push(`${x},${y.toFixed(2)}`);
    }

    return `M ${points.join(" L ")}`;
  }, [animationFrameTime, isRopeActive]);

  useEffect(() => {
    const firstLink = navLinksRef.current?.querySelector("a");
    if (firstLink instanceof HTMLElement) {
      window.requestAnimationFrame(() => updateCenterFromElement(firstLink));
    }

    const handleResize = () => {
      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLAnchorElement &&
        navLinksRef.current?.contains(activeElement)
      ) {
        updateCenterFromElement(activeElement);
        return;
      }
      const fallbackLink = navLinksRef.current?.querySelector("a");
      if (fallbackLink instanceof HTMLElement) {
        updateCenterFromElement(fallbackLink);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCenterFromElement]);

  useEffect(() => {
    const threshold = 50;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      setHasScrolled(currentScrollY > 8);

      if (currentScrollY <= threshold) {
        setIsVisible(true);
      } else if (Math.abs(delta) > 4) {
        if (delta > 0) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (sections.length === 0) return;

    const getLuminance = (section: HTMLElement) => {
      const color = window.getComputedStyle(section).backgroundColor;
      const channels = color.match(/\d+(\.\d+)?/g);
      if (!channels || channels.length < 3) return 255;
      const r = Number(channels[0]);
      const g = Number(channels[1]);
      const b = Number(channels[2]);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const isSectionDark = (section: HTMLElement) => {
      if (DARK_SECTION_IDS.has(section.id)) return true;
      return getLuminance(section) < 130;
    };

    const getSectionBounds = () => {
      return sections
        .map((section) => {
          const rect = section.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = Math.max(rect.height, section.offsetHeight, 1);
          return { section, top, bottom: top + height };
        })
        .sort((a, b) => a.top - b.top);
    };

    const detectThemeFromNavPosition = () => {
      const sectionBounds = getSectionBounds();
      if (sectionBounds.length === 0) return;
      const navHeight = navRowRef.current?.getBoundingClientRect().height ?? 64;
      const probeDocY = window.scrollY + navHeight + 6;

      // Hard guard: as long as the nav probe is within hero bounds, force dark mode
      // to preserve contrast on the black hero background.
      const hero = document.getElementById("hero");
      if (hero) {
        const heroTop = hero.offsetTop;
        const heroBottom = heroTop + Math.max(hero.offsetHeight, 1);
        if (probeDocY < heroBottom - 2) {
          setIsDarkSection(true);
          return;
        }
      }

      let active = sectionBounds[0];
      for (const entry of sectionBounds) {
        if (probeDocY >= entry.top) {
          active = entry;
        } else {
          break;
        }
      }

      setIsDarkSection(isSectionDark(active.section));
    };

    const scheduleThemeDetection = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        detectThemeFromNavPosition();
      });
    };

    const handleResize = () => {
      scheduleThemeDetection();
    };

    detectThemeFromNavPosition();
    window.addEventListener("load", scheduleThemeDetection);
    window.addEventListener("scroll", scheduleThemeDetection, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", scheduleThemeDetection);
      window.removeEventListener("scroll", scheduleThemeDetection);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const animate = (timestamp: number) => {
      const current = animatedCenterRef.current;
      const target = targetCenterRef.current;
      const centerForce = (target - current) * 0.86;
      centerVelocityRef.current = (centerVelocityRef.current + centerForce) * 0.56;
      animatedCenterRef.current = current + centerVelocityRef.current;

      const pullCurrent = animatedPullRef.current;
      const pullTarget = targetPullRef.current;
      const pullForce = (pullTarget - pullCurrent) * 0.74;
      pullVelocityRef.current = (pullVelocityRef.current + pullForce) * 0.58;
      animatedPullRef.current = pullCurrent + pullVelocityRef.current;

      ripplesRef.current = ripplesRef.current.filter(
        (ripple) => timestamp - ripple.start < 1250,
      );

      const hasMotion = Math.abs(animatedCenterRef.current - target) > 0.005;
      const hasPullMotion = Math.abs(animatedPullRef.current - targetPullRef.current) > 0.01;

      if (
        isMounted &&
        (hasMotion ||
          hasPullMotion ||
          Math.abs(centerVelocityRef.current) > 0.002 ||
          Math.abs(pullVelocityRef.current) > 0.002 ||
          isRopeActiveRef.current ||
          ripplesRef.current.length > 0)
      ) {
        setAnimationFrameTime(timestamp);
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);
    return () => {
      isMounted = false;
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (!lineTrackRef.current) return;
      const rect = lineTrackRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      const clampedX = Math.min(Math.max(event.clientX, rect.left), rect.right);
      const percent = ((clampedX - rect.left) / rect.width) * 100;

      ripplesRef.current.push({
        center: clampPercent(percent),
        start: performance.now(),
      });
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  const isHeroAtRest = !hasScrolled;
  const useLightTheme = hasScrolled && !isDarkSection;
  const navBackgroundClass = isHeroAtRest
    ? "bg-transparent border-b border-transparent"
    : useLightTheme
      ? "bg-white/72 backdrop-blur-xl border-b border-black/10"
      : "bg-[#020300]/72 backdrop-blur-xl border-b border-white/10";

  const navTextClass = useLightTheme
    ? "text-[0.95rem] font-semibold tracking-[-0.02em] text-black opacity-90 transition-opacity hover:opacity-70 focus:opacity-100"
    : "text-[0.95rem] font-semibold tracking-[-0.02em] text-white opacity-90 transition-opacity hover:opacity-70 focus:opacity-100";

  const signInClass = useLightTheme
    ? "font-semibold tracking-[-0.02em] text-black opacity-90 transition-opacity hover:opacity-70"
    : "font-semibold tracking-[-0.02em] text-white opacity-90 transition-opacity hover:opacity-70";

  const ctaClass = useLightTheme
    ? "border-black text-black hover:bg-black hover:text-white active:bg-black active:text-white"
    : "group/cta border-white text-white hover:border-transparent active:border-transparent";

  const lineStroke = useLightTheme ? "rgba(15,23,42,0.96)" : "rgba(255,255,255,0.94)";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 font-sans transition-transform duration-300 ease-in-out py-3 md:py-0 ${navBackgroundClass} ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div
        ref={navRowRef}
        className="relative z-10 mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 mt-2 md:mt-0 md:px-10 md:py-4 lg:px-16"
        onMouseMove={handleNavMouseMove}
        onMouseEnter={() => {
          targetPullRef.current = 8.2;
          isRopeActiveRef.current = true;
          setIsRopeActive(true);
        }}
        onMouseLeave={() => {
          targetPullRef.current = 0.9;
          isRopeActiveRef.current = false;
          setIsRopeActive(false);
        }}
      >
        <a href="/" className="group flex items-center">
          <div className="flex items-center">
            <Image
              src="/images/whiteLogo.png"
              alt="LexTutor"
              width={67}
              height={58}
              priority
              className={`relative z-0 h-9 w-9 object-contain transition-transform group-hover:scale-[1.04] md:h-12 md:w-12 ${useLightTheme ? "invert" : ""}`}
            />
            <span
              className={`relative z-10 -ml-1.5 md:-ml-2.5 text-lg font-bold tracking-[-0.03em] leading-none md:text-xl lg:text-3xl ${useLightTheme ? "text-[#0f172a]" : "text-white"}`}
            >
              LexTutor
            </span>
          </div>
        </a>

        <div ref={navLinksRef} className="hidden space-x-8 md:flex">
          {["Environment", "Intelligence", "Growth", "Vision"].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`group relative ${navTextClass}`}
              data-index={index}
              onFocus={handleLinkFocus}
              onBlur={() => {
                targetPullRef.current = 0.9;
                isRopeActiveRef.current = false;
                setIsRopeActive(false);
              }}
              onMouseEnter={(event) => {
                updateCenterFromElement(event.currentTarget);
                targetPullRef.current = 12.4;
                isRopeActiveRef.current = true;
                setIsRopeActive(true);
              }}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button className={`${signInClass} text-[13px] md:text-[0.95rem]`}>
            Sign In
          </button>
          <button
            className={`relative overflow-hidden rounded-md border px-4 py-2 text-[13px] font-semibold tracking-[-0.01em] md:px-6 md:py-2.5 md:text-[0.95rem] ${ctaClass}`}
          >
            {!useLightTheme && <div className="iridescent-border" />}
            <span className={!useLightTheme ? "relative z-10 transition-colors group-hover/cta:bg-gradient-to-r group-hover/cta:from-[#daafc3] group-hover/cta:to-[#62bfd0] group-hover/cta:bg-clip-text group-hover/cta:text-transparent group-active/cta:bg-gradient-to-r group-active/cta:from-[#daafc3] group-active/cta:to-[#62bfd0] group-active/cta:bg-clip-text group-active/cta:text-transparent" : "relative z-10 transition-colors"}>
              Get Started
            </span>
          </button>
        </div>
      </div>

      <div className="relative z-20 w-screen left-1/2 -translate-x-1/2">
        <div ref={lineTrackRef} className="relative mt-2 w-full overflow-visible md:mt-1">
          {/* AI Boot Sequence Glows */}
          <div className="animate-boot-left"></div>
          <div className="animate-boot-right"></div>
          <div className="animate-boot-flash"></div>

          <svg
            viewBox="-2 -8 104 36"
            preserveAspectRatio="none"
            className="animate-boot-rope h-6 w-full overflow-visible md:h-8"
          >
            <path
              d={ropePath}
              fill="none"
              stroke={lineStroke}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}
