"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { lexaSpecimen, specimen, workspaces, type Workspace } from "./content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The four workspaces: the statement holds on the left while each workspace's proof passes on the right.
export default function Workspaces() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".lx-ws-card");
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const onEnter = (sel: string, build: (tl: gsap.core.Timeline) => void) => {
          const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "power2.out" },
            scrollTrigger: { trigger: sel, start: "top 72%", once: true },
          });
          build(tl);
          tl.play();
        };

        onEnter(".lx-ws-card--answer .lx-checks", (tl) =>
          tl.to(".lx-check", { opacity: 1, x: 0, duration: 0.5, stagger: 0.18 }).to(
            ".lx-check-mark",
            { scale: 1, duration: 0.45, stagger: 0.18, ease: "back.out(2.2)" },
            0.2
          )
        );

        onEnter(".lx-ws-card--trace .lx-shot", (tl) =>
          tl.to(".lx-ws-card--trace .lx-shot img", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" })
        );

        onEnter(".lx-ws-card--build .lx-sheet", (tl) =>
          tl
            .to(".lx-sheet .lx-del", { "--lx-find": 1, duration: 0.4 })
            .to(".lx-sheet .lx-del", { "--lx-strike": 1, "--lx-dim": 1, "--lx-find": 0, duration: 0.7, ease: "none" }, "+=0.15")
            .to(".lx-sheet .lx-w", { display: "inline", opacity: 1, duration: 0.12, stagger: 0.045 }, "+=0.1")
            .to(".lx-sheet .lx-mark", { opacity: 1, duration: 0.2 })
            .to(".lx-sheet-note", { opacity: 1, y: 0, duration: 0.5 }, "-=0.05")
        );

        onEnter(".lx-ws-card--review .lx-lexa", (tl) =>
          tl
            .to(".lx-lexa-flag", { "--lx-find": 1, duration: 0.6 })
            .to(".lx-lexa-leader", { scaleY: 1, duration: 0.5, ease: "expo.out" }, "+=0.1")
            .to(".lx-lexa-note", { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="workspaces" className="lx-section lx-ch-green lx-ws" aria-labelledby="lx-ws-title">
      <div className="lx-cols" aria-hidden="true" />
      <div className="lx-wrap lx-ws-grid">
        <div className="lx-ws-side">
          <div className="lx-ws-sticky">
            <p className="lx-label">Workspaces</p>
            <h2 id="lx-ws-title" className="lx-h2" data-reveal>
              Four workspaces. <span className="lx-accent">One engine.</span>
            </h2>
            <p className="lx-body lx-ws-intro" data-reveal>
              Each workspace is the engine pointed at one kind of legal work: an answer, a topic, a court document, a
              review.
            </p>
            <ol className="lx-ws-index" aria-label="Workspaces">
              {workspaces.map((w, i) => (
                <li key={w.id} className={i === active ? "is-active" : undefined}>
                  <a href={`#ws-${w.id}`}>
                    <span>{w.n}</span>
                    <strong>{w.verb}</strong>
                    <em>{w.name}</em>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lx-ws-cards">
          {workspaces.map((w) => (
            <Card key={w.id} w={w} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ w }: { w: Workspace }) {
  return (
    <article id={`ws-${w.id}`} className={`lx-ws-card lx-ws-card--${w.id}`} aria-labelledby={`ws-${w.id}-t`}>
      <header className="lx-ws-head">
        <p className="lx-ws-kicker">
          <span>{w.n}</span> {w.verb}
        </p>
        <h3 id={`ws-${w.id}-t`}>{w.name}</h3>
        <p className="lx-ws-line">{w.line}</p>
      </header>
      <div className="lx-ws-visual">
        {w.id === "answer" && <AnswerVisual />}
        {w.id === "trace" && <TraceVisual />}
        {w.id === "build" && <BuildVisual />}
        {w.id === "review" && <ReviewVisual />}
      </div>
      <p className="lx-ws-fact">{w.fact}</p>
    </article>
  );
}

function AnswerVisual() {
  const checks = [
    ["Court and procedure", "The court, the originating process, the rule that governs it"],
    ["Omission and consequence", "The point left out, and what it costs the answer"],
    ["Authority and pinpoint", "The provision or case, cited to the rule or holding"],
  ];
  return (
    <div className="lx-answer">
      <div className="lx-shot lx-shot--crop">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/app-question.webp"
          width={2880}
          height={1800}
          loading="lazy"
          alt="The question room: the 2025 Question 3 scenario on summary judgment beside the answer page."
        />
      </div>
      <ul className="lx-checks" aria-label="What a reading checks">
        {checks.map(([t, d]) => (
          <li key={t} className="lx-check">
            <span className="lx-check-mark" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </span>
            <strong>{t}</strong>
            <em>{d}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TraceVisual() {
  return (
    <div className="lx-shot lx-shot--graph">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/app-topic-graph.webp"
        width={2880}
        height={1800}
        loading="lazy"
        alt="Topic Drilldown for Interlocutory Applications and Orders: set in 15 of 18 sittings, compulsory in 8, last set in 2024, with a column graph of parts of the paper by sitting from 2010 to 2025."
      />
    </div>
  );
}

function BuildVisual() {
  const words = specimen.inserted.split(" ");
  return (
    <article className="lx-sheet" aria-label="Specimen motion on notice with LexTutor's correction">
      <div className="lx-sheet-court">
        {specimen.court.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
      <div className="lx-sheet-suit">{specimen.suit}</div>
      <div className="lx-sheet-title">{specimen.title}</div>
      <p className="lx-sheet-para">
        BROUGHT <del className="lx-del">{specimen.struck}</del>{" "}
        <ins className="lx-ins">
          {words.map((w, i) => (
            <span key={i} className="lx-w">
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </ins>
        <sup className="lx-mark">1</sup>
      </p>
      <p className="lx-sheet-para lx-sheet-dim">
        <strong>TAKE NOTICE</strong> {specimen.takeNotice}
      </p>
      <div className="lx-sheet-note">
        <p>1 · {specimen.note.cite}</p>
        <p>{specimen.note.body}</p>
      </div>
    </article>
  );
}

function ReviewVisual() {
  const s = lexaSpecimen;
  return (
    <div className="lx-lexa">
      <p className="lx-lexa-q">{s.question}</p>
      <p className="lx-lexa-answer">
        {s.before}
        <mark className="lx-lexa-flag">{s.flagged}</mark>
        {s.after}
      </p>
      <span className="lx-lexa-leader" aria-hidden="true" />
      <aside className="lx-lexa-note" aria-label="Lexa's note">
        <p className="lx-lexa-kind">
          <span>Lexa</span> {s.note.kind}
        </p>
        <p className="lx-lexa-cite">{s.note.cite}</p>
        <p className="lx-lexa-body">{s.note.body}</p>
      </aside>
    </div>
  );
}
