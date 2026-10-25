"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Premise", href: "#vision" },
  { label: "Workspaces", href: "#environment" },
  { label: "Topic Drilldown", href: "#telemetry" },
  { label: "Architecture", href: "#intelligence" },
  { label: "Courses", href: "#domains" },
] as const;

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
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

  useEffect(() => {
    const initial =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    setTheme(initial);
  }, []);

  const toggleTheme = (nextTheme?: "dark" | "light") => {
    const resolved = nextTheme ?? (theme === "dark" ? "light" : "dark");
    setTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
  };

  const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

  const updateCenterFromElement = useCallback((element: HTMLElement) => {
    if (!lineTrackRef.current) return;
    const targetRect = element.getBoundingClientRect();
    const trackRect = lineTrackRef.current.getBoundingClientRect();
    if (trackRect.width <= 0) return;

    const centerPercent =
      ((targetRect.left + targetRect.width / 2 - trackRect.left) /
        trackRect.width) *
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
        clampPercent(
          ((navRect.bottom - event.clientY) / navRect.height) * 100
        ) / 100;
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
    const now =
      animationFrameTime ||
      (typeof performance !== "undefined" ? performance.now() : 0);
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
        const frontEnvelope = Math.exp(
          -(frontDistance * frontDistance) / (2 * 8.8 * 8.8)
        );
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
      setHasScrolled(currentScrollY > 18);

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
    let isMounted = true;
    const animate = (timestamp: number) => {
      const current = animatedCenterRef.current;
      const target = targetCenterRef.current;
      const centerForce = (target - current) * 0.86;
      centerVelocityRef.current =
        (centerVelocityRef.current + centerForce) * 0.56;
      animatedCenterRef.current = current + centerVelocityRef.current;

      const pullCurrent = animatedPullRef.current;
      const pullTarget = targetPullRef.current;
      const pullForce = (pullTarget - pullCurrent) * 0.74;
      pullVelocityRef.current = (pullVelocityRef.current + pullForce) * 0.58;
      animatedPullRef.current = pullCurrent + pullVelocityRef.current;

      ripplesRef.current = ripplesRef.current.filter(
        (ripple) => timestamp - ripple.start < 1250
      );

      const hasMotion = Math.abs(animatedCenterRef.current - target) > 0.005;
      const hasPullMotion =
        Math.abs(animatedPullRef.current - targetPullRef.current) > 0.01;

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
  const navBackgroundClass = isHeroAtRest
    ? "bg-transparent"
    : "bg-[var(--lt-surface)]/92 backdrop-blur-md";

  const lineStroke =
    theme === "light" ? "rgba(113, 83, 31, 0.58)" : "rgba(210, 180, 129, 0.65)";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 font-sans transition-transform duration-300 ease-in-out py-2 md:py-0 ${navBackgroundClass} ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        ref={navRowRef}
        className="relative z-10 mx-auto flex w-full max-w-[1640px] items-center justify-between px-5 md:px-10 md:py-3.5 lg:px-14"
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
        {/* Brand Mark */}
        <a href="#top" className="group flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center border border-[var(--lt-line)] bg-[#141519] p-1.5 transition-colors group-hover:border-[var(--lt-gold)]">
            <Image
              src="/images/logo/LT_logo_type_1_white_L_gold_T.svg"
              alt="LexTutor Monogram"
              width={28}
              height={28}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-display text-[17px] font-medium tracking-[-0.025em] text-[var(--lt-ink)]">
            Lex<span className="text-[var(--lt-gold)]">Tutor</span>
          </span>
        </a>

        {/* Center Navigation Links */}
        <nav
          ref={navLinksRef}
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[13.5px] font-medium tracking-[-0.01em] text-[var(--lt-muted)] transition-colors hover:text-[var(--lt-ink)] focus:text-[var(--lt-ink)]"
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
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Authentic Appearance Switch (Light | Dark) + Square Desk Action */}
        <div className="flex items-center gap-4 md:gap-5">
          <div
            role="group"
            aria-label="Appearance"
            className="inline-flex items-center gap-2 border border-[var(--lt-line)] bg-[var(--lt-surface)] px-2.5 py-1.5 text-[12px]"
          >
            {theme === "dark" ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-3.5 w-3.5 text-[var(--lt-gold)]"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-3.5 w-3.5 text-[var(--lt-gold)]"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
            <button
              type="button"
              onClick={() => toggleTheme("light")}
              aria-pressed={theme === "light"}
              className={`cursor-pointer transition-colors ${
                theme === "light"
                  ? "font-semibold text-[var(--lt-ink)]"
                  : "text-[var(--lt-muted)] hover:text-[var(--lt-ink)]"
              }`}
            >
              Light
            </button>
            <span className="text-[var(--lt-line)]" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => toggleTheme("dark")}
              aria-pressed={theme === "dark"}
              className={`cursor-pointer transition-colors ${
                theme === "dark"
                  ? "font-semibold text-[var(--lt-ink)]"
                  : "text-[var(--lt-muted)] hover:text-[var(--lt-ink)]"
              }`}
            >
              Dark
            </button>
          </div>

          <a
            href="#cta"
            className="hidden sm:inline-flex items-center gap-2.5 border border-[var(--lt-btn-border)] bg-[var(--lt-deck)] px-3.5 py-2 text-[13px] font-semibold text-[var(--lt-btn-ink)] transition-colors hover:border-[var(--lt-btn-hover-bg)] hover:bg-[var(--lt-btn-hover-bg)] hover:text-[var(--lt-btn-hover-ink)]"
          >
            <span>Get in touch</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Founder's Interactive Rope Rule */}
      <div className="relative z-20 w-screen left-1/2 -translate-x-1/2">
        <div
          ref={lineTrackRef}
          className="relative mt-1 w-full overflow-visible md:mt-0"
        >
          <div className="animate-boot-left" />
          <div className="animate-boot-right" />
          <div className="animate-boot-flash" />

          <svg
            viewBox="-2 -8 104 36"
            preserveAspectRatio="none"
            className="animate-boot-rope h-5 w-full overflow-visible md:h-6"
          >
            <path
              d={ropePath}
              fill="none"
              stroke={lineStroke}
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
