"use client";

import { useState } from "react";

export default function CTA() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("paul@lextutor.online");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="w-full bg-[var(--lt-page)] pt-8 md:pt-10 pb-10 md:pb-12"
    >
      <div className="mx-auto max-w-[1640px] px-0 md:px-8 lg:px-14">
        <div className="relative overflow-hidden bg-[var(--lt-surface)] border border-[var(--lt-line)] px-6 py-8 md:px-12 md:py-11 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Caryatid Frieze Etching (dimmed watermark so foreground text pops) */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-0 right-0 w-[300px] sm:w-[380px] md:w-[460px] aspect-[16/10] opacity-[0.18]"
            style={{
              maskImage:
                "radial-gradient(ellipse 92% 88% at 88% 18%, #000 24%, rgba(0,0,0,0.45) 58%, transparent 92%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 92% 88% at 88% 18%, #000 24%, rgba(0,0,0,0.45) 58%, transparent 92%)",
            }}
          >
            <img
              src="/assets/branding/caryatid_frieze_dark.webp"
              alt=""
              className="lt-art-dark w-full h-full object-cover object-right-top"
            />
            <img
              src="/assets/branding/caryatid_frieze_light.webp"
              alt=""
              className="lt-art-light w-full h-full object-cover object-right-top"
            />
          </div>

          {/* Left: Compact Kicker + Heading + 1-line Note */}
          <div className="relative z-10 max-w-[56ch]">
            <p className="lt-kicker mb-1.5">Contact &amp; Inquiries</p>
            <h2
              id="cta-heading"
              className="lt-headline text-[clamp(1.6rem,2.3vw,2.2rem)] mb-2"
            >
              <span className="hl-lead">Preparing for release.</span>{" "}
              <em>Get in touch with us.</em>
            </h2>
            <p className="text-[14.5px] leading-[1.52] text-[var(--lt-muted)]">
              For general inquiries, institutional correspondence, or launch
              updates, reach out directly.
            </p>
          </div>

          {/* Right: Direct Contact + Copy Address Action */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5 lg:gap-8 lg:border-l lg:border-[var(--lt-line)] lg:pl-8">
            <div>
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--lt-quiet)]">
                Direct Correspondence
              </span>
              <strong className="block font-display text-[15.5px] font-medium text-[var(--lt-ink)] mt-0.5">
                Ayooluwa Paul Obembe, Esq.
              </strong>
              <span className="text-[12.5px] text-[var(--lt-muted)]">
                Founder &amp; Lead Systems Architect
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="lt-btn-primary cursor-pointer"
              >
                <span>{copied ? "Address copied" : "Copy address"}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {copied ? (
                    <path d="M5 13l4 4L19 7" />
                  ) : (
                    <>
                      <rect x="9" y="9" width="11" height="11" rx="1.5" />
                      <path d="M5 15H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 3h9a1.5 1.5 0 0 1 1.5 1.5v1" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
