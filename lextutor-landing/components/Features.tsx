"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type WorkspaceTab = "draft" | "practice" | "charge" | "lexa";

export default function Features() {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceTab>("draft");
  const [markupView, setMarkupView] = useState<"corrected" | "original">(
    "corrected"
  );
  const [showChanges, setShowChanges] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!panelRef.current) return;

      const copyBlock = panelRef.current.querySelector(".lt-leader-copy");
      const canvasBlock = panelRef.current.querySelector(
        ".lt-leader-canvas, .lt-picture-panel"
      );
      const staggeredItems = panelRef.current.querySelectorAll(
        ".ws-animate-item"
      );

      gsap.fromTo(
        [copyBlock, canvasBlock].filter(Boolean),
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        }
      );

      if (staggeredItems.length > 0) {
        gsap.fromTo(
          staggeredItems,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.045,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 84%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [activeWorkspace] }
  );

  return (
    <section
      ref={sectionRef}
      id="environment"
      aria-labelledby="workspaces-heading"
      className="w-full bg-[var(--lt-page)] pt-10 md:pt-14"
    >
      <div className="mx-auto max-w-[1640px] px-0 md:px-8 lg:px-14">
        {/* Section Header + House Hairline Tabs */}
        <div className="bg-[var(--lt-surface)] border-t border-x border-[var(--lt-line)] px-6 pt-8 pb-0 md:px-12 md:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-7">
            <div className="lg:col-span-7">
              <p className="lt-kicker">The Working Surfaces</p>
              <h2
                id="workspaces-heading"
                className="lt-headline text-[clamp(2rem,3vw,2.95rem)]"
              >
                <span className="hl-lead">One house vocabulary.</span>{" "}
                <em>Four specialized rooms.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-[var(--lt-line)] lg:pl-8">
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--lt-quiet)] mb-2">
                Workspace Matrix · 04 Rooms
              </span>
              <p className="text-[15px] leading-[1.58] text-[var(--lt-muted)]">
                Select a workspace below to inspect how the system typesets,
                marks, and audits legal drafts and procedural answers on the
                page.
              </p>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="LexTutor workspaces"
            className="lt-tab-row"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeWorkspace === "draft"}
              onClick={() => setActiveWorkspace("draft")}
              className={`lt-tab-btn ${
                activeWorkspace === "draft" ? "is-active" : ""
              }`}
            >
              Build · Draft Lab
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeWorkspace === "practice"}
              onClick={() => setActiveWorkspace("practice")}
              className={`lt-tab-btn ${
                activeWorkspace === "practice" ? "is-active" : ""
              }`}
            >
              Answer · Paper Practice
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeWorkspace === "charge"}
              onClick={() => setActiveWorkspace("charge")}
              className={`lt-tab-btn ${
                activeWorkspace === "charge" ? "is-active" : ""
              }`}
            >
              Charge · N-ADPOPS Engine
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeWorkspace === "lexa"}
              onClick={() => setActiveWorkspace("lexa")}
              className={`lt-tab-btn ${
                activeWorkspace === "lexa" ? "is-active" : ""
              }`}
            >
              Review · Lexa Points
            </button>
          </div>
        </div>

        <div ref={panelRef}>
          {/* WORKSPACE 1: DRAFT LAB */}
          {activeWorkspace === "draft" && (
            <div className="lt-leader-grid border-x border-[var(--lt-line)]">
              <div className="lt-leader-copy">
                <div className="lt-watermark-art" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/branding/leader-dome.webp"
                    alt=""
                    decoding="async"
                    className="lt-watermark-img"
                  />
                </div>

                <p className="lt-kicker">Draft Lab · Runtime Draft Audit</p>
                <h3 className="lt-headline text-[clamp(2rem,2.9vw,2.85rem)] mb-4">
                  <span className="hl-lead">Build the document</span>{" "}
                  <em>in the order law requires.</em>
                </h3>

                <p className="text-[16px] leading-[1.56] text-[var(--lt-muted)] max-w-[52ch] mb-6">
                  Keep the drafted instrument in view while each operative part
                  is audited against deterministic rules and dynamic pattern
                  checks: form, sequence, enabling authority, and legal
                  consequence working together on a single standing sheet.
                </p>

                <div className="lt-availability mb-7">
                  <span>Workspace</span>
                  <strong>One document, built and audited in order</strong>
                  <p>
                    The examiner&rsquo;s redline strikes only the defective
                    words, places the correction in gold beside them, and ties
                    each mark to its margin note.
                  </p>
                </div>

                {/* Sequential Component Spine */}
                <div className="border-t border-[var(--lt-line)] pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { n: "01", name: "Caption & Court" },
                    { n: "02", name: "Parties & Relief" },
                    { n: "03", name: "Grounds & Facts" },
                    { n: "04", name: "Seal & Attestation" },
                  ].map((part) => (
                    <div
                      key={part.n}
                      className="ws-animate-item border-l border-[var(--lt-line)] pl-3"
                    >
                      <span className="block font-mono text-[10px] text-[var(--lt-gold)] tabular-nums">
                        {part.n}
                      </span>
                      <span className="font-display text-[13.5px] font-medium text-[var(--lt-ink)]">
                        {part.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel: Authentic Draft Lab Redline Surface (.dlx-mk-sheet) */}
              <div className="lt-leader-canvas">
                {/* Review Toolbar (matching #dlx-review-toolbar) */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-[var(--lt-line)] text-[12.5px]">
                  <div className="flex items-center gap-4 text-[var(--lt-muted)]">
                    <span>
                      <b className="text-[var(--lt-ink)] font-semibold tabular-nums">
                        8
                      </b>{" "}
                      verified
                    </span>
                    <span>
                      <b className="text-[var(--lt-ink)] font-semibold tabular-nums">
                        1
                      </b>{" "}
                      correction
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div
                      role="group"
                      aria-label="Document view"
                      className="inline-flex border border-[var(--lt-line)] text-[12px]"
                    >
                      <button
                        type="button"
                        aria-pressed={markupView === "corrected"}
                        onClick={() => setMarkupView("corrected")}
                        className={`px-2.5 py-1 cursor-pointer transition-colors ${
                          markupView === "corrected"
                            ? "bg-[var(--lt-mark-gold-soft)] text-[var(--lt-ink)] font-medium"
                            : "text-[var(--lt-muted)] hover:text-[var(--lt-ink)]"
                        }`}
                      >
                        Corrected
                      </button>
                      <button
                        type="button"
                        aria-pressed={markupView === "original"}
                        onClick={() => setMarkupView("original")}
                        className={`px-2.5 py-1 cursor-pointer transition-colors ${
                          markupView === "original"
                            ? "bg-[var(--lt-mark-gold-soft)] text-[var(--lt-ink)] font-medium"
                            : "text-[var(--lt-muted)] hover:text-[var(--lt-ink)]"
                        }`}
                      >
                        Original
                      </button>
                    </div>

                    {markupView === "corrected" && (
                      <label className="inline-flex items-center gap-2 text-[12px] text-[var(--lt-muted)] cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={showChanges}
                          onChange={(e) => setShowChanges(e.target.checked)}
                          className="accent-[var(--lt-gold)]"
                        />
                        Show changes
                      </label>
                    )}
                  </div>
                </div>

                {/* The Document Sheet */}
                <article
                  className="ws-animate-item dlx-mk-sheet text-[13px] leading-[1.62]"
                  aria-label="Marked-up Motion on Notice"
                >
                  <div className="text-center font-bold tracking-[0.02em] uppercase mb-3">
                    <div>IN THE HIGH COURT OF LAGOS STATE</div>
                    <div>IN THE LAGOS JUDICIAL DIVISION</div>
                    <div>HOLDEN AT LAGOS</div>
                  </div>

                  <div className="text-right font-mono text-[11px] mb-3">
                    SUIT NO: LD/4192GCM/2025
                  </div>

                  <div className="mb-3 text-[12.5px]">
                    <div className="font-semibold">BETWEEN:</div>
                    <div className="flex justify-between items-baseline mt-1">
                      <span>CROWNFIELD PROPERTIES LTD</span>
                      <span className="font-mono text-[10.5px] uppercase text-[var(--lt-muted)]">
                        CLAIMANT / APPLICANT
                      </span>
                    </div>
                    <div className="my-1 font-semibold">AND</div>
                    <div className="flex justify-between items-baseline">
                      <span>APEX LOGISTICS NIGERIA PLC</span>
                      <span className="font-mono text-[10.5px] uppercase text-[var(--lt-muted)]">
                        DEFENDANT / RESPONDENT
                      </span>
                    </div>
                  </div>

                  <div className="text-center font-bold uppercase underline underline-offset-4 my-4">
                    MOTION ON NOTICE
                  </div>

                  <p className="mb-3 text-justify">
                    BROUGHT{" "}
                    {markupView === "original" ? (
                      <span>
                        pursuant to the inherent jurisdiction of this Court only
                      </span>
                    ) : showChanges ? (
                      <>
                        <del className="dlx-mk-was">
                          pursuant to the inherent jurisdiction of this Court
                          only
                        </del>
                        <ins className="dlx-mk-now">
                          PURSUANT TO ORDER 43 RULE 1 OF THE HIGH COURT OF LAGOS
                          STATE (CIVIL PROCEDURE) RULES 2019 AND UNDER THE
                          INHERENT JURISDICTION OF THIS HONOURABLE COURT
                        </ins>
                        <sup className="dlx-mk-n">1</sup>
                      </>
                    ) : (
                      <span>
                        PURSUANT TO ORDER 43 RULE 1 OF THE HIGH COURT OF LAGOS
                        STATE (CIVIL PROCEDURE) RULES 2019 AND UNDER THE
                        INHERENT JURISDICTION OF THIS HONOURABLE COURT
                      </span>
                    )}
                  </p>

                  <p className="mb-4 text-justify">
                    <strong>TAKE NOTICE</strong> that this Honourable Court will
                    be moved on Tuesday the 14th day of October 2025 at the hour
                    of 9 o&rsquo;clock in the forenoon or so soon thereafter as
                    Counsel on behalf of the Claimant/Applicant may be heard
                    praying the Court for an Order of interlocutory injunction.
                  </p>

                  {/* Execution & NBA Stamp beside the signature */}
                  <div className="mt-5 pt-3 border-t border-[var(--lt-line)] flex items-center justify-between gap-4">
                    <div className="text-[12px] leading-[1.45]">
                      <div>Dated this 3rd day of October 2025.</div>
                      <div className="mt-2 font-semibold">
                        A. P. Obembe, Esq.
                      </div>
                      <div className="text-[var(--lt-muted)]">
                        Counsel to the Claimant/Applicant · Victoria Island,
                        Lagos
                      </div>
                    </div>
                    <div
                      className="dlx-doc-nba-seal-indicator"
                      aria-label="Nigerian Bar Association Stamp and Seal"
                    >
                      NBA SEAL
                      <br />
                      VERIFIED
                      <br />
                      SCN094812
                    </div>
                  </div>
                </article>

                {/* Connected Margin Note */}
                <div className="ws-animate-item mt-3 border-l-2 border-[var(--lt-gold)] bg-[var(--lt-surface)] pl-4 py-2.5 pr-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--lt-gold)]">
                      Note 1 · Enabling Rule
                    </span>
                    <span className="font-mono text-[10px] text-[var(--lt-quiet)]">
                      Order 43 Rule 1, Lagos 2019
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-[1.48] text-[var(--lt-muted)]">
                    An interlocutory motion in Lagos must state both the
                    specific Order and Rule conferring jurisdiction and the
                    inherent jurisdiction of the Court.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* WORKSPACE 2: PAPER PRACTICE */}
          {activeWorkspace === "practice" && (
            <div className="lt-leader-grid border-x border-[var(--lt-line)]">
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

                <p className="lt-kicker">Paper Practice</p>
                <h3 className="lt-headline text-[clamp(2rem,2.9vw,2.85rem)] mb-4">
                  <span className="hl-lead">Answer the past paper.</span>{" "}
                  <em>See where you trip.</em>
                </h3>

                <p className="text-[16px] leading-[1.56] text-[var(--lt-muted)] max-w-[52ch] mb-6">
                  Every Bar Finals sitting from 2010 to 2025. The hybrid
                  evaluation pipeline reads your answer clause by clause, names
                  the exact procedural omission, and places your attempt from{" "}
                  <em>Not quite</em> to <em>Exam-ready</em>.
                </p>

                <div className="lt-availability mb-7">
                  <span>Status</span>
                  <strong>Readiness, per attempt</strong>
                  <p>
                    Procedure checked. Omissions named. Progress tracked across
                    every question part.
                  </p>
                </div>

                <div className="border-t border-[var(--lt-line)] pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    "Court & Procedure",
                    "Omission & Consequence",
                    "Authority & Pinpoint",
                    "Readiness & Progress",
                  ].map((item, idx) => (
                    <div
                      key={item}
                      className="ws-animate-item border-l border-[var(--lt-line)] pl-3"
                    >
                      <span className="block font-mono text-[10px] text-[var(--lt-gold)] tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-[13.5px] font-medium text-[var(--lt-ink)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lt-leader-canvas">
                {/* Readiness Ladder Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-[var(--lt-line)]">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--lt-gold)]">
                      Civil Litigation · 2024 Question 1(b)
                    </span>
                    <h4 className="font-display text-[16px] font-medium text-[var(--lt-ink)]">
                      Summary Judgment under Order 13 Rule 1
                    </h4>
                  </div>
                  <div
                    className="inline-flex font-mono text-[10px] uppercase tracking-[0.1em]"
                    aria-label="Readiness ladder"
                  >
                    {["Not quite", "Developing", "Close", "Exam-ready"].map(
                      (step) => (
                        <span
                          key={step}
                          className={`px-2.5 py-1.5 border-b ${
                            step === "Close"
                              ? "border-b-2 border-[var(--lt-gold)] text-[var(--lt-ink)] font-semibold"
                              : "border-[var(--lt-line)] text-[var(--lt-quiet)]"
                          }`}
                        >
                          {step}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Candidate Answer & Clause Audit */}
                <div className="bg-[var(--lt-line)] border border-[var(--lt-line)] grid gap-[1px]">
                  <div className="ws-animate-item bg-[var(--lt-surface)] p-5">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--lt-muted)] mb-2">
                      Your Answer · Proposition 2
                    </span>
                    <p className="font-serif text-[14px] leading-[1.6] text-[var(--lt-ink)]">
                      &ldquo;To enter summary judgment in Lagos under Order 13
                      Rule 1, the Claimant shall file a Writ of Summons
                      accompanied by the Statement of Claim, list of witnesses,
                      written statements on oath, and a Motion on Notice
                      supported by an affidavit.&rdquo;
                    </p>
                  </div>

                  <div className="ws-animate-item bg-[var(--lt-surface)] p-5">
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--lt-gold)]">
                        Lexa&rsquo;s Reading · Missing Document
                      </span>
                      <span className="font-mono text-[10px] text-[var(--lt-quiet)]">
                        Order 13 Rule 1, Lagos 2019
                      </span>
                    </div>
                    <p className="text-[13.5px] leading-[1.52] text-[var(--lt-ink)] mb-2">
                      You listed the originating processes and the Motion on
                      Notice, but omitted the{" "}
                      <strong className="text-[var(--lt-gold)] font-semibold">
                        Written Brief in support of the application
                      </strong>
                      .
                    </p>
                    <p className="text-[13px] leading-[1.48] text-[var(--lt-muted)]">
                      Under Order 13 Rule 1 of the Lagos Rules 2019, the
                      application for summary judgment must be accompanied by an
                      affidavit stating the grounds for belief that there is no
                      defence, copies of exhibits, and a Written Brief.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WORKSPACE 3: CRIMINAL CHARGE ENGINE */}
          {activeWorkspace === "charge" && (
            <div className="lt-leader-grid border-x border-[var(--lt-line)]">
              <div className="lt-leader-copy">
                <div className="lt-watermark-art" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/branding/temple_etching_light.webp"
                    alt=""
                    decoding="async"
                    className="lt-watermark-img"
                  />
                </div>

                <p className="lt-kicker">Criminal Litigation · Charge Engine</p>
                <h3 className="lt-headline text-[clamp(2rem,2.9vw,2.85rem)] mb-4">
                  <span className="hl-lead">Draft the charge.</span>{" "}
                  <em>Test every count by statute.</em>
                </h3>

                <p className="text-[16px] leading-[1.56] text-[var(--lt-muted)] max-w-[52ch] mb-6">
                  Every count on a charge sheet or information is parsed against
                  the nine statutory requirements of Sections 194 to 209 of the
                  Administration of Criminal Justice Act 2015—catching
                  duplicity, misjoinder, and definition-versus-punishment
                  section errors.
                </p>

                <div className="lt-availability mb-7">
                  <span>Gate Architecture</span>
                  <strong>Nine deterministic statutory gates per count</strong>
                  <p>
                    Audits Accused identity, Date, Place, Offence, Victim,
                    Particulars, Creating Section, Punishment Section, and the
                    Rule Against Duplicity.
                  </p>
                </div>
              </div>

              <div className="lt-leader-canvas">
                <div className="flex items-baseline justify-between gap-4 pb-3 mb-4 border-b border-[var(--lt-line)]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--lt-gold)]">
                    Count One · Statutory Sufficiency Audit
                  </span>
                  <span className="font-mono text-[10px] text-[var(--lt-quiet)]">
                    ACJA 2015 s. 196 &amp; s. 209
                  </span>
                </div>

                <div className="ws-animate-item dlx-mk-sheet text-[13px] leading-[1.6] mb-4">
                  <div className="text-center font-bold uppercase mb-2">
                    IN THE HIGH COURT OF THE FEDERAL CAPITAL TERRITORY
                    <br />
                    IN THE ABUJA JUDICIAL DIVISION
                  </div>
                  <div className="font-bold uppercase underline underline-offset-4 my-2">
                    COUNT ONE
                  </div>
                  <p className="text-justify">
                    That you, <strong>MUSA DANJUMA</strong>, on or about the
                    12th day of May 2025 at Wuse Zone 4 within the Abuja
                    Judicial Division,{" "}
                    <del className="dlx-mk-was">
                      robbed Chidi Okafor and Emeka Nwosu of their laptops
                    </del>
                    <ins className="dlx-mk-now">
                      robbed Chidi Okafor of one Apple MacBook Pro laptop while
                      armed with a firearm
                    </ins>
                    <sup className="dlx-mk-n">1</sup> and thereby committed an
                    offence punishable under{" "}
                    <strong>
                      Section 1(2)(a) of the Robbery and Firearms (Special
                      Provisions) Act
                    </strong>
                    .
                  </p>
                </div>

                {/* 9-Gate Ledger */}
                <div className="bg-[var(--lt-line)] border border-[var(--lt-line)] grid grid-cols-3 gap-[1px] font-mono text-[10.5px]">
                  {[
                    { gate: "01 Accused", state: "Verified" },
                    { gate: "02 Date", state: "Verified" },
                    { gate: "03 Place", state: "Verified" },
                    { gate: "04 Offence", state: "Verified" },
                    { gate: "05 Victim", state: "Split Count" },
                    { gate: "06 Weapon", state: "Verified" },
                    { gate: "07 Statute", state: "Verified" },
                    { gate: "08 Section 1(2)(a)", state: "Verified" },
                    { gate: "09 Duplicity Rule", state: "Corrected" },
                  ].map((item) => (
                    <div
                      key={item.gate}
                      className="ws-animate-item bg-[var(--lt-surface)] px-3 py-2.5 flex items-center justify-between gap-2"
                    >
                      <span className="text-[var(--lt-ink)] truncate">
                        {item.gate}
                      </span>
                      <span
                        className={
                          item.state === "Verified"
                            ? "text-[var(--lt-quiet)]"
                            : "text-[var(--lt-gold)] font-semibold"
                        }
                      >
                        {item.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WORKSPACE 4: LEXA POINTS */}
          {activeWorkspace === "lexa" && (
            <div className="lt-leader-grid border-x border-[var(--lt-line)]">
              <div className="lt-leader-copy">
                <p className="lt-kicker">Lexa Points</p>
                <h3 className="lt-headline text-[clamp(2rem,2.9vw,2.85rem)] mb-4">
                  <span className="hl-lead">Read the answer</span>{" "}
                  <em>at the point it turns.</em>
                </h3>

                <p className="text-[16px] leading-[1.56] text-[var(--lt-muted)] max-w-[52ch] mb-6">
                  Lexa places recognition, correction, non-advancing points, and
                  the next point to develop beside the exact sentence that
                  prompted each finding—and keeps a standing file of your
                  progress across sessions.
                </p>

                <div className="lt-availability mb-7">
                  <span>Your file</span>
                  <strong>Every completed review, kept</strong>
                  <p>
                    Every note in Lexa&rsquo;s console is grounded in a specific
                    attempt and names the question part it rests on.
                  </p>
                </div>

                {/* Authentic Lexa Console Feed Rows */}
                <div className="border-t border-[var(--lt-line)]">
                  {[
                    {
                      n: "01",
                      tag: "Pre-action notice vs. contractual arbitration clause",
                      time: "2M AGO",
                      snippet:
                        "Based on 2023 Q4(a) · You treated the arbitration clause as ousting jurisdiction rather than a ground for stay under s. 5 AMA 2023.",
                    },
                    {
                      n: "02",
                      tag: "Electronic document certificate under Section 84(4)",
                      time: "1H AGO",
                      snippet:
                        "Based on 2022 Q1(c) · Your foundation named device reliability but left out the maker's signature and capacity on the certificate.",
                    },
                  ].map((note) => (
                    <div
                      key={note.n}
                      className="ws-animate-item grid grid-cols-[42px_minmax(0,1fr)_auto] gap-x-3 gap-y-1.5 items-baseline py-4 border-b border-[var(--lt-line)]"
                    >
                      <span className="row-span-2 self-start font-sans text-[22px] leading-none text-[var(--lt-gold)] tabular-nums">
                        {note.n}
                      </span>
                      <strong className="font-sans text-[16.5px] font-medium tracking-[-0.01em] text-[var(--lt-ink)] truncate">
                        {note.tag}
                      </strong>
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--lt-muted)] tabular-nums">
                        {note.time}
                      </span>
                      <p className="col-span-2 font-sans text-[13.5px] leading-[1.48] text-[var(--lt-muted)]">
                        {note.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel: Authentic Framed Intaglio Plate of Lady Justice */}
              <div
                className="lt-picture-panel"
                aria-label="A statue of Justice, blindfolded, holding scales and a sword"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/branding/leader-justice-dark.webp"
                  alt="A statue of Justice, blindfolded, holding scales and a sword"
                  decoding="async"
                  className="lt-only-dark absolute inset-0 h-full w-full object-cover object-[50%_12%] select-none"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/branding/leader-justice.webp"
                  alt="A statue of Justice, blindfolded, holding scales and a sword"
                  decoding="async"
                  className="lt-only-light absolute inset-0 h-full w-full object-cover object-[50%_12%] mix-blend-multiply select-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
