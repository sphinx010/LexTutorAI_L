"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type PremiseTabId = "structure" | "interpretation" | "hybrid";

interface PremiseTab {
  id: PremiseTabId;
  label: string;
  sheetTitle: string;
  caption: string;
  rows: Array<{
    code: string;
    title: string;
    authority: string;
    detail: string;
    weight: number;
  }>;
}

const PREMISE_TABS: PremiseTab[] = [
  {
    id: "structure",
    label: "The Structure",
    sheetTitle: "Deterministic guardrails & formal schema",
    caption:
      "Codified statutory locks verify jurisdiction, filing sequence, and instrument structure.",
    rows: [
      {
        code: "01",
        title: "Hierarchy of Authority",
        authority: "1999 Constitution s. 1(3) & s. 6(6)(b)",
        detail:
          "Constitutional provisions govern statutes; statutes govern rules of court; appellate ratio binds lower courts.",
        weight: 100,
      },
      {
        code: "02",
        title: "Procedural Sequence",
        authority: "High Court Civil Procedure Rules",
        detail:
          "Jurisdiction, originating process, interlocutory relief, and trial sequence are checked in strict filing order.",
        weight: 94,
      },
      {
        code: "03",
        title: "Statutory Conditions",
        authority: "Evidence Act 2011 s. 84(2) & (4)",
        detail:
          "Nested statutory prerequisites and mandatory certificate elements are audited item by item.",
        weight: 92,
      },
      {
        code: "04",
        title: "Draft & Instrument Form",
        authority: "ACJA 2015 s. 196 · CAMA 2020 s. 20",
        detail:
          "Court headings, party capacities, charge counts, deeds, and execution blocks are audited in the exact form the law requires.",
        weight: 96,
      },
    ],
  },
  {
    id: "interpretation",
    label: "The Interpretation",
    sheetTitle: "Dynamic pattern & semantic evaluation",
    caption:
      "Hybridizes deterministic guardrails with semantic evaluation to predict dynamic patterns across legal reasoning and drafts.",
    rows: [
      {
        code: "01",
        title: "Dynamic Pattern Recognition",
        authority: "Decision API",
        detail:
          "Captures nuanced reasoning and drafting patterns that extend beyond static rules while remaining within the evaluation boundary.",
        weight: 95,
      },
      {
        code: "02",
        title: "Issue & Fact Alignment",
        authority: "Scenario Fact Graph",
        detail:
          "Evaluates propositions and drafted clauses against the specific dates, parties, and factual variations fixed by the scenario.",
        weight: 90,
      },
      {
        code: "03",
        title: "Consequence of Omission",
        authority: "Procedural Sufficiency",
        detail:
          "Distinguishes curable procedural irregularities from fatal defects that nullify a writ, motion, or charge count.",
        weight: 88,
      },
      {
        code: "04",
        title: "Actionable Synthesis",
        authority: "Frontier Models",
        detail:
          "Culminates deterministic and decision-layer signals into line-anchored redlines and practitioner-grade feedback.",
        weight: 98,
      },
    ],
  },
  {
    id: "hybrid",
    label: "Three-Tier Audit",
    sheetTitle: "End-to-end hybrid evaluation pipeline",
    caption:
      "Every submitted draft or answer passes through deterministic rules, pattern decision APIs, and frontier synthesis.",
    rows: [
      {
        code: "01",
        title: "Tier I · Deterministic Guardrails",
        authority: "Codified Rule Locks",
        detail:
          "Audits forum venue, originating mode, statutory notice windows, count duplicity, and formal execution blocks.",
        weight: 100,
      },
      {
        code: "02",
        title: "Tier II · Decision API",
        authority: "Hybrid Pattern Engine",
        detail:
          "Combines deterministic signals with semantic evaluation to catch dynamic legal patterns beyond rigid keyword or rule checks.",
        weight: 94,
      },
      {
        code: "03",
        title: "Tier III · Frontier Synthesis",
        authority: "Frontier Models & Inference Services",
        detail:
          "Translates the combined evaluation signals into actionable insights, clause-by-clause draft corrections, and margin notes.",
        weight: 97,
      },
      {
        code: "04",
        title: "Draft & Reasoning Coverage",
        authority: "Motions · Charges · Deeds · Answers",
        detail:
          "Applies the same three-tier rigor to court drafts, transactional instruments, and multi-issue procedural answers.",
        weight: 92,
      },
    ],
  },
];

export default function MemorySection() {
  const [activeTabId, setActiveTabId] = useState<PremiseTabId>("structure");
  const sectionRef = useRef<HTMLElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const activeTab =
    PREMISE_TABS.find((t) => t.id === activeTabId) ?? PREMISE_TABS[0];

  useGSAP(
    () => {
      if (!sheetRef.current) return;
      const rows = sheetRef.current.querySelectorAll(".premise-sheet-row");
      const bars = sheetRef.current.querySelectorAll(".premise-row-bar");

      gsap.fromTo(
        rows,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.065,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sheetRef.current,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sheetRef.current,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [activeTabId] }
  );

  return (
    <section
      ref={sectionRef}
      id="vision"
      aria-labelledby="premise-heading"
      className="w-full bg-[var(--lt-page)]"
    >
      <div className="mx-auto max-w-[1640px] px-0 md:px-8 lg:px-14">
        <div className="lt-leader-grid">
          {/* Left Column: Copy, Watermark Etching, Availability Rule, and House Hairline Tabs */}
          <div className="lt-leader-copy">
            <div className="lt-watermark-art" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/branding/leader-great-hall.webp"
                alt=""
                decoding="async"
                className="lt-watermark-img"
              />
            </div>

            <p className="lt-kicker">Architectural Premise</p>
            <h2
              id="premise-heading"
              className="lt-headline text-[clamp(2rem,3.1vw,3.15rem)] max-w-[19ch] mb-4"
            >
              <span className="hl-lead">
                Law is structural and interpretive.
              </span>{" "}
              <em>The engine hybridizes both.</em>
            </h2>

            <p className="text-[16px] leading-[1.62] text-[var(--lt-muted)] max-w-[54ch] mb-6">
              Legal work demands both strict structural compliance and nuanced
              interpretive judgment. LexTutor combines deterministic statutory
              guardrails with dynamic pattern evaluation via decision APIs and
              frontier synthesis—auditing legal drafts and procedural answers
              against the rules and authorities of the forum.
            </p>

            <div className="lt-availability mb-7">
              <span>Foundation</span>
              <strong>
                Hybrid evaluation &amp; runtime draft-auditing engine
              </strong>
              <p>
                Deterministic rule locks, dynamic pattern decisions, and
                frontier inference services demonstrated across Nigerian Bar
                examination workflows.
              </p>
            </div>

            {/* House Hairline Tabs (Principle 13: Tracked labels standing on a hairline) */}
            <div
              role="tablist"
              aria-label="Architectural dimensions"
              className="lt-tab-row mb-6"
            >
              {PREMISE_TABS.map((tab) => {
                const isSelected = tab.id === activeTab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`lt-tab-btn ${isSelected ? "is-active" : ""}`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div>
              <a href="#environment" className="lt-btn-primary">
                <span>Inspect the workspaces</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Connected Brief Sheet on --lt-surface-2 */}
          <div
            ref={sheetRef}
            className="lt-leader-canvas"
            aria-label={activeTab.sheetTitle}
          >
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--lt-gold)]">
                {activeTab.sheetTitle}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--lt-quiet)]">
                Hybrid Schema
              </span>
            </div>

            {/* Connected Hairline Sheet */}
            <div className="bg-[var(--lt-line)] border border-[var(--lt-line)] grid gap-[1px]">
              {activeTab.rows.map((row) => (
                <div
                  key={`${activeTab.id}-${row.code}`}
                  className="premise-sheet-row bg-[var(--lt-surface)] p-5 transition-colors hover:bg-[var(--lt-page)]"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1.5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10.5px] font-medium text-[var(--lt-gold)] tabular-nums">
                        {row.code}
                      </span>
                      <h3 className="font-display text-[16.5px] font-medium tracking-[-0.02em] text-[var(--lt-ink)] whitespace-nowrap">
                        {row.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.02em] text-[var(--lt-quiet)] pl-6 sm:pl-0">
                      {row.authority}
                    </span>
                  </div>
                  <p className="pl-6 text-[13.5px] leading-[1.5] text-[var(--lt-muted)] mb-3">
                    {row.detail}
                  </p>
                  <div className="pl-6">
                    <div className="h-[2px] w-full bg-[var(--lt-track)] overflow-hidden">
                      <div
                        className="premise-row-bar h-full bg-[var(--lt-gold)] origin-left"
                        style={{ width: `${row.weight}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[13px] leading-[1.5] text-[var(--lt-muted)]">
              {activeTab.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
