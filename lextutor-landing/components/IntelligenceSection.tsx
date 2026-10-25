"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const EVALUATION_TIERS = [
  {
    step: "TIER I",
    role: "Deterministic Guardrails",
    title: "Codified Statutory & Formal Rules",
    summary:
      "Enforces bright-line statutory and procedural requirements across legal drafts and answers: forum venue, originating mode, statutory notice windows, charge count duplicity, and execution blocks.",
    spec: "1999 Constitution · Evidence Act 2011 · ACJA 2015 · CAMA 2020 · RPC 2023",
    signalLabel: "Formal & Statutory Sufficiency",
    signalFill: 100,
    metric: "100% Rule Lock",
  },
  {
    step: "TIER II",
    role: "Hybrid Decision Layer",
    title: "Decision API & Pattern Engine",
    summary:
      "Culminates deterministic checks with semantic evaluation via decision APIs—predicting and catching dynamic patterns in legal reasoning and drafted clauses that go beyond static rules while remaining strictly within the evaluation rubric.",
    spec: "Semantic + deterministic hybridization · Dynamic pattern capture",
    signalLabel: "Dynamic Pattern & Rubric Alignment",
    signalFill: 94,
    metric: "Decision API",
  },
  {
    step: "TIER III",
    role: "Frontier Synthesis",
    title: "Actionable Insight & Draft Redlining",
    summary:
      "Frontier models and inference services culminate the deterministic and decision-layer findings into line-anchored draft redlines, margin notes, and clear next steps for the user.",
    spec: "Frontier models · Inference services · Clause-level redline & practitioner guidance",
    signalLabel: "Actionable Output Synthesis",
    signalFill: 98,
    metric: "Frontier Models",
  },
] as const;

const PIPELINE_WORKFLOWS = [
  {
    id: "draft-audit",
    label: "Draft & Instrument Audit",
    artifact: "Motion on Notice, Charge Sheet, Deed of Assignment, Special Resolution",
    tier1: "Verifies court heading, parties, statutory notice computation, nine-gate count structure, and NBA seal placement.",
    tier2: "The Decision API evaluates whether the relief sought, affidavit facts, and operative clauses match the dynamic pattern of the scenario.",
    tier3: "Frontier models render teacher's-pen strikes on defective words, insert gold corrections inline, and attach margin notes.",
  },
  {
    id: "reasoning-audit",
    label: "Procedural & Doctrinal Evaluation",
    artifact: "Multi-issue Bar Finals & Litigation Advisory Answers",
    tier1: "Checks cited statutory sections, limitation periods, and governing appellate authorities against the local primary-law library.",
    tier2: "The Decision API weighs the candidate's application of canons and exceptions against dynamic factual variations in the problem.",
    tier3: "Frontier models synthesize what was recognised, what requires correction, and the exact next point to develop on the readiness ladder.",
  },
] as const;

export default function IntelligenceSection() {
  const [selectedWorkflowId, setSelectedWorkflowId] =
    useState<string>("draft-audit");
  const sectionRef = useRef<HTMLElement | null>(null);
  const tiersGridRef = useRef<HTMLDivElement | null>(null);
  const workflowRef = useRef<HTMLDivElement | null>(null);

  const activeWorkflow =
    PIPELINE_WORKFLOWS.find((w) => w.id === selectedWorkflowId) ??
    PIPELINE_WORKFLOWS[0];

  useGSAP(
    () => {
      if (!tiersGridRef.current) return;

      const cards = tiersGridRef.current.querySelectorAll(".tier-card");
      const bars = tiersGridRef.current.querySelectorAll(".tier-signal-bar");
      const counters = tiersGridRef.current.querySelectorAll(
        ".tier-signal-pct"
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tiersGridRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tiersGridRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      counters.forEach((el, idx) => {
        const targetVal = EVALUATION_TIERS[idx]?.signalFill ?? 100;
        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: targetVal,
          duration: 0.95,
          delay: idx * 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tiersGridRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counterObj.val)}%`;
          },
        });
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (!workflowRef.current) return;
      const steps = workflowRef.current.querySelectorAll(".workflow-step-cell");
      const stepBars = workflowRef.current.querySelectorAll(
        ".workflow-step-bar"
      );

      gsap.fromTo(
        steps,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        stepBars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    },
    { scope: sectionRef, dependencies: [selectedWorkflowId] }
  );

  return (
    <section
      ref={sectionRef}
      id="intelligence"
      aria-labelledby="hybrid-arch-heading"
      className="w-full bg-[var(--lt-page)] pt-10 md:pt-14"
    >
      <div className="mx-auto max-w-[1640px] px-0 md:px-8 lg:px-14">
        {/* Header Block */}
        <div className="bg-[var(--lt-surface)] border-t border-x border-[var(--lt-line)] px-6 py-8 md:px-12 md:py-11">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <p className="lt-kicker">Three-Tier Hybrid Architecture</p>
              <h2
                id="hybrid-arch-heading"
                className="lt-headline text-[clamp(2rem,3vw,2.95rem)]"
              >
                <span className="hl-lead">
                  Deterministic statutory guardrails.
                </span>{" "}
                <em>Hybrid pattern judgment.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-[var(--lt-line)] lg:pl-8">
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--lt-quiet)] mb-2">
                Tier I Rules · Tier II Decision API · Tier III Frontier Synthesis
              </span>
              <p className="text-[15px] leading-[1.58] text-[var(--lt-muted)]">
                LexTutor is a hybrid evaluation engine. Deterministic statutory
                checks lock down formal rules, the Decision API captures
                dynamic patterns across legal processes and drafts, and frontier
                models synthesize those findings into actionable corrections.
              </p>
            </div>
          </div>
        </div>

        {/* 3-Column Connected Hairline Architecture Board */}
        <div
          ref={tiersGridRef}
          className="bg-[var(--lt-line)] border border-[var(--lt-line)] grid grid-cols-1 lg:grid-cols-3 gap-[1px]"
        >
          {EVALUATION_TIERS.map((tier) => (
            <article
              key={tier.step}
              className="tier-card bg-[var(--lt-surface)] p-6 md:p-9 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-6">
                  <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--lt-gold)]">
                    {tier.role}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--lt-quiet)] tabular-nums">
                    {tier.step}
                  </span>
                </div>

                <h3 className="font-display text-[20px] font-medium tracking-[-0.02em] text-[var(--lt-ink)] mb-3">
                  {tier.title}
                </h3>

                <p className="text-[14.5px] leading-[1.56] text-[var(--lt-muted)]">
                  {tier.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--lt-line)]">
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--lt-muted)]">
                    {tier.signalLabel}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-[var(--lt-gold)]">
                      {tier.metric}
                    </span>
                    <span className="tier-signal-pct font-mono text-[10px] text-[var(--lt-ink)] tabular-nums">
                      {tier.signalFill}%
                    </span>
                  </div>
                </div>

                {/* Animated Signal Bar */}
                <div className="h-[2px] w-full bg-[var(--lt-track)] overflow-hidden mb-3">
                  <div
                    className="tier-signal-bar h-full bg-[var(--lt-gold)] origin-left"
                    style={{ width: `${tier.signalFill}%` }}
                  />
                </div>

                <span className="font-mono text-[10px] leading-[1.45] text-[var(--lt-quiet)] block">
                  {tier.spec}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Pipeline Execution Trace: Draft Audit vs. Procedural Reasoning Audit */}
        <div
          ref={workflowRef}
          className="bg-[var(--lt-surface-2)] border-x border-b border-[var(--lt-line)] px-6 py-7 md:px-12 md:py-9"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[var(--lt-line)]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--lt-gold)] block mb-1">
                Runtime Execution Trace
              </span>
              <h3 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--lt-ink)]">
                How the three tiers evaluate {activeWorkflow.label.toLowerCase()}
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Evaluation mode trace"
              className="lt-tab-row !border-b-0"
            >
              {PIPELINE_WORKFLOWS.map((wf) => {
                const isSelected = wf.id === activeWorkflow.id;
                return (
                  <button
                    key={wf.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedWorkflowId(wf.id)}
                    className={`lt-tab-btn !py-2 ${
                      isSelected ? "is-active" : ""
                    }`}
                  >
                    {wf.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                tier: "01 · Deterministic Guardrails",
                desc: activeWorkflow.tier1,
                pct: "100%",
              },
              {
                tier: "02 · Decision API Pattern Match",
                desc: activeWorkflow.tier2,
                pct: "96%",
              },
              {
                tier: "03 · Frontier Actionable Output",
                desc: activeWorkflow.tier3,
                pct: "100%",
              },
            ].map((item) => (
              <div
                key={item.tier}
                className="workflow-step-cell bg-[var(--lt-surface)] border border-[var(--lt-line)] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--lt-gold)]">
                      {item.tier}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--lt-quiet)]">
                      Active
                    </span>
                  </div>
                  <p className="text-[13.5px] leading-[1.52] text-[var(--lt-muted)]">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--lt-line)]">
                  <div className="h-[2px] w-full bg-[var(--lt-track)] overflow-hidden">
                    <div
                      className="workflow-step-bar h-full bg-[var(--lt-gold)] origin-left"
                      style={{ width: item.pct }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
