import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full bg-[var(--lt-canvas)] border-t border-[var(--lt-line)] text-[var(--lt-muted)]"
    >
      <div className="mx-auto max-w-[1640px] px-6 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-7 w-7 items-center justify-center border border-[var(--lt-line)] bg-[#141519] p-1">
            <Image
              src="/images/logo/LT_logo_type_1_white_L_gold_T.svg"
              alt="LexTutor Monogram"
              width={22}
              height={22}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <span className="font-display text-[15px] font-medium text-[var(--lt-ink)]">
              Lex<span className="text-[var(--lt-gold)]">Tutor</span>
            </span>
            <span className="mx-2.5 text-[var(--lt-line)]">·</span>
            <span className="text-[13px] text-[var(--lt-muted)]">
              Runtime Legal Evaluation System
            </span>
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-6 text-[13px]"
        >
          <a
            href="#vision"
            className="hover:text-[var(--lt-ink)] transition-colors"
          >
            Premise
          </a>
          <a
            href="#environment"
            className="hover:text-[var(--lt-ink)] transition-colors"
          >
            Workspaces
          </a>
          <a
            href="#telemetry"
            className="hover:text-[var(--lt-ink)] transition-colors"
          >
            Topic Drilldown
          </a>
          <a
            href="#intelligence"
            className="hover:text-[var(--lt-ink)] transition-colors"
          >
            Architecture
          </a>
          <a
            href="#domains"
            className="hover:text-[var(--lt-ink)] transition-colors"
          >
            Courses
          </a>
          <a
            href="#cta"
            className="lt-dotted-link text-[13px]"
          >
            Get in touch
          </a>
        </nav>

        <div className="font-mono text-[11px] text-[var(--lt-quiet)]">
          © {new Date().getFullYear()} LexTutor · lextutor.online
        </div>
      </div>
    </footer>
  );
}
