"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FIVE_COURSES = [
  {
    code: "01",
    name: "Civil Litigation",
    statutes:
      "High Court Civil Procedure Rules (Lagos 2019 & FCT 2018) · Evidence Act 2011",
    processes:
      "Writ of Summons, Originating Summons, Motion on Notice, Summary Judgment, Notice to Quit",
    sittings: "2010–2025 Sittings",
    module: "Draft Lab & Paper Practice",
  },
  {
    code: "02",
    name: "Criminal Litigation",
    statutes:
      "Administration of Criminal Justice Act 2015 · ACJL Lagos · Evidence Act 2011",
    processes:
      "Magistrate & High Court Charges, Bail Summons & Motions, Trial-Within-Trial, Final Written Addresses",
    sittings: "2010–2025 Sittings",
    module: "N-ADPOPS 9-Gate Charge Engine",
  },
  {
    code: "03",
    name: "Corporate Law Practice",
    statutes: "Companies and Allied Matters Act 2020 · FCCPA 2018 · ISA 2007",
    processes:
      "Board & Special Resolutions, Statutory Notices, Restructuring Schemes, Winding-Up Petitions",
    sittings: "2010–2025 Sittings",
    module: "Transactional & Regulatory Schemas",
  },
  {
    code: "04",
    name: "Property Law Practice",
    statutes:
      "Land Use Act 1978 · Lagos Land Registration Law 2015 · Wills Law · MPL 2010",
    processes:
      "Deeds of Assignment, Legal Mortgages, Leases, Powers of Attorney, Wills & Codicils, Probate",
    sittings: "2010–2025 Sittings",
    module: "Conveyancing & Perfection Audit",
  },
  {
    code: "05",
    name: "Professional Ethics & Skills",
    statutes:
      "Rules of Professional Conduct 2023 · Legal Practitioners Act · Money Laundering Act 2022",
    processes:
      "Legal Opinions, Client Letters, Bills of Charges, Contempt & LPDC Disciplinary Procedure",
    sittings: "2010–2025 Sittings",
    module: "Statutory & Ethical Compliance",
  },
] as const;

const SAMPLE_PLAN_DAYS = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const status: "done" | "current" | "upcoming" =
    day < 12 ? "done" : day === 12 ? "current" : "upcoming";
  return { day, status };
});

export default function ProgressionLoop() {
  const [selectedDay, setSelectedDay] = useState<number>(12);
  const sectionRef = useRef<HTMLElement | null>(null);
  const coursesRef = useRef<HTMLDivElement | null>(null);
  const planStripRef = useRef<HTMLOListElement | null>(null);

  useGSAP(
    () => {
      if (coursesRef.current) {
        const rows = coursesRef.current.querySelectorAll(".course-ledger-row");
        gsap.fromTo(
          rows,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.52,
            stagger: 0.075,
            ease: "power3.out",
            scrollTrigger: {
              trigger: coursesRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (planStripRef.current) {
        const cells =
          planStripRef.current.querySelectorAll(".plan-strip-mark");
        gsap.fromTo(
          cells,
          { opacity: 0, scaleY: 0, transformOrigin: "bottom center" },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.45,
            stagger: 0.022,
            ease: "power3.out",
            scrollTrigger: {
              trigger: planStripRef.current,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="domains"
      aria-labelledby="domains-heading"
      className="w-full bg-[var(--lt-page)] pt-10 md:pt-14"
    >
      <div className="mx-auto max-w-[1640px] px-0 md:px-8 lg:px-14">
        {/* Five Courses Connected Ledger */}
        <div className="bg-[var(--lt-surface)] border-t border-x border-[var(--lt-line)] px-6 py-8 md:px-12 md:py-11">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <p className="lt-kicker">Domain Implementation</p>
              <h2
                id="domains-heading"
                className="lt-headline text-[clamp(2rem,3vw,2.95rem)]"
              >
                <span className="hl-lead">One evaluation engine.</span>{" "}
                <em>Five Bar Finals courses.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-[var(--lt-line)] lg:pl-8">
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--lt-quiet)] mb-2">
                Production Proof-of-Concept · 2010–2025 Corpus
              </span>
              <p className="text-[15px] leading-[1.58] text-[var(--lt-muted)]">
                While the underlying hybrid evaluation architecture is
                domain-agnostic, its full production proof-of-concept spans all
                five compulsory courses of the Nigerian Law School Bar Part II
                examination.
              </p>
            </div>
          </div>
        </div>

        {/* Courses Rows */}
        <div
          ref={coursesRef}
          className="bg-[var(--lt-line)] border border-[var(--lt-line)] grid gap-[1px]"
        >
          {FIVE_COURSES.map((course) => (
            <div
              key={course.code}
              className="course-ledger-row bg-[var(--lt-surface)] px-6 py-5 md:px-12 md:py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline transition-colors hover:bg-[var(--lt-surface-2)]"
            >
              <div className="lg:col-span-3 flex items-baseline gap-3.5">
                <span className="font-mono text-[11px] text-[var(--lt-gold)] tabular-nums">
                  {course.code}
                </span>
                <h3 className="font-display text-[18.5px] font-medium tracking-[-0.024em] text-[var(--lt-ink)]">
                  {course.name}
                </h3>
              </div>

              <div className="lg:col-span-3">
                <span className="block font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--lt-quiet)] mb-1">
                  Governing Statutes &amp; Rules
                </span>
                <p className="text-[13.5px] leading-[1.48] text-[var(--lt-muted)]">
                  {course.statutes}
                </p>
              </div>

              <div className="lg:col-span-3">
                <span className="block font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--lt-quiet)] mb-1">
                  Audited Drafts &amp; Instruments
                </span>
                <p className="text-[13.5px] leading-[1.48] text-[var(--lt-muted)]">
                  {course.processes}
                </p>
              </div>

              <div className="lg:col-span-3 lg:text-right">
                <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--lt-gold)] whitespace-nowrap">
                  {course.sittings}
                </span>
                <span className="block font-mono text-[10.5px] text-[var(--lt-muted)] mt-1 whitespace-nowrap">
                  {course.module}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* The Thirty-Day Plan Strip (Authentic .plan-strip from the learner shell) */}
        <div className="bg-[var(--lt-surface)] border-x border-b border-[var(--lt-line)] px-6 py-8 md:px-12 md:py-11">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="lt-kicker">Scheduled Revision</p>
              <h3 className="font-display text-[22px] font-medium tracking-[-0.03em] text-[var(--lt-ink)]">
                The thirty-day plan, built from your record
              </h3>
            </div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--lt-muted)] tabular-nums">
              Day {selectedDay} of 30 · 11 completed in gold
            </p>
          </div>

          <ol
            ref={planStripRef}
            className="plan-strip mb-7"
            aria-label="Thirty-day revision strip"
          >
            {SAMPLE_PLAN_DAYS.map((d) => (
              <li key={d.day}>
                <button
                  type="button"
                  onClick={() => setSelectedDay(d.day)}
                  className="w-full p-0 bg-transparent border-0 cursor-pointer"
                  aria-label={`Day ${d.day}`}
                >
                  <span
                    className={`plan-strip-mark ${
                      d.status === "done"
                        ? "is-done"
                        : d.status === "current"
                        ? "is-current"
                        : ""
                    } ${
                      selectedDay === d.day
                        ? "shadow-[inset_0_-3px_0_var(--lt-ink)]"
                        : ""
                    }`}
                  >
                    {String(d.day).padStart(2, "0")}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* Selected Day Tasks on Ruled Hairlines */}
          <div className="border-t border-[var(--lt-line)]">
            {[
              {
                kind: "Paper",
                title: `Day ${selectedDay} · Compulsory Question Part (2023 Q1)`,
                sub: "Interlocutory injunction & undertaking as to damages in Lagos and Abuja.",
                state: selectedDay < 12 ? "Completed" : "Open part",
              },
              {
                kind: "Draft",
                title: "Motion on Notice & Supporting Affidavit",
                sub: "Compose the caption, relief, grounds, and NBA seal in Draft Lab.",
                state: selectedDay < 12 ? "Completed" : "Open room",
              },
            ].map((task) => (
              <div
                key={task.kind}
                className="grid grid-cols-[4.8rem_minmax(0,1fr)_auto] gap-4 items-center py-3.5 border-b border-[var(--lt-line)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--lt-gold)]">
                  {task.kind}
                </span>
                <div>
                  <strong className="block font-display text-[15px] font-medium text-[var(--lt-ink)]">
                    {task.title}
                  </strong>
                  <small className="block text-[13px] text-[var(--lt-muted)] mt-0.5">
                    {task.sub}
                  </small>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--lt-gold)]">
                  {task.state}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
