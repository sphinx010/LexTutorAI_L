"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { courses, engine } from "./content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Engine() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".lx-tier-rule", {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".lx-tiers", start: "top 75%", once: true },
        });
        gsap.to(".lx-tier-body", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".lx-tiers", start: "top 75%", once: true },
        });

        // Figures count up once, from zero to the real number.
        gsap.utils.toArray<HTMLElement>(".lx-stat-n").forEach((el) => {
          const end = Number(el.dataset.value);
          const o = { v: 0 };
          gsap.to(o, {
            v: end,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(o.v));
            },
          });
        });

        gsap.to(".lx-course", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".lx-course-list", start: "top 80%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="lx-ch-bone">
      <div id="engine" className="lx-section lx-engine" aria-labelledby="lx-engine-title">
        <div className="lx-cols" aria-hidden="true" />
        <div className="lx-wrap lx-split">
          <p className="lx-label lx-split-label">{engine.label}</p>
          <div>
            <h2 id="lx-engine-title" className="lx-h2" data-reveal>
              {engine.heading[0]} <span className="lx-accent">{engine.heading[1]}</span>
            </h2>
          </div>
        </div>

        <div className="lx-wrap lx-split lx-tiers">
          <span className="lx-split-label" aria-hidden="true" />
          <ol className="lx-tier-list">
            {engine.tiers.map((t) => (
              <li key={t.n} className="lx-tier">
                <span className="lx-tier-rule" aria-hidden="true" />
                <div className="lx-tier-body">
                  <span className="lx-tier-n">{t.n}</span>
                  <h3>{t.name}</h3>
                  <p>{t.body}</p>
                  <span className={`lx-status${t.status === "In development" ? " is-dev" : ""}`}>{t.status}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="lx-wrap lx-proof">
          <div className="lx-proof-shot">
            <div className="lx-window-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <em>LexTutor · Draft Lab · Process library</em>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/landing/app-draftlab.webp"
              width={2880}
              height={1800}
              loading="lazy"
              alt="Draft Lab's process library: ten categories and forty-three court processes, from affidavits and motions to originating processes, pleadings and notices to quit."
            />
          </div>
          <div className="lx-proof-copy">
            <p className="lx-statement-s" data-reveal>
              The engine is not tied to one exam. Draft Lab already checks every component of 43 court processes against
              the drafting rules that govern them, whatever the matter.
            </p>
            <dl className="lx-stats">
              {engine.stats.map((s) => (
                <div key={s.label} className="lx-stat">
                  <dt>{s.label}</dt>
                  <dd>
                    <span className="lx-stat-n" data-value={s.value}>
                      {s.value}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div id="courses" className="lx-section lx-courses" aria-labelledby="lx-courses-title">
        <div className="lx-cols" aria-hidden="true" />
        <div className="lx-wrap lx-split">
          <p className="lx-label lx-split-label">{courses.label}</p>
          <h2 id="lx-courses-title" className="lx-h2" data-reveal>
            {courses.heading}
          </h2>
        </div>
        <div className="lx-wrap lx-split">
          <span className="lx-split-label" aria-hidden="true" />
          <ul className="lx-course-list">
            {courses.rows.map((c) => (
              <li key={c.name} className="lx-course">
                <h3>{c.name}</h3>
                <div className="lx-course-tags">
                  {c.tags.map((t) => (
                    <span key={t} className="lx-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <span className={`lx-status${c.status === "Live" ? " is-live" : c.status === "Next" ? " is-next" : " is-dev"}`}>
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
