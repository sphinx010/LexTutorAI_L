// The house action: square, solid, with a label that rolls to its twin and an arrow that
// leaves and returns on hover. Motion is transform-only and still under reduced motion.

type Props = {
  href: string;
  children: string;
  variant?: "solid" | "line";
  size?: "md" | "sm";
};

export function ArrowGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

export default function Button({ href, children, variant = "solid", size = "md" }: Props) {
  return (
    <a href={href} className={`lx-btn lx-btn--${variant} lx-btn--${size}`}>
      <span className="lx-btn-roll">
        <span className="lx-btn-label">{children}</span>
        <span className="lx-btn-label" aria-hidden="true">
          {children}
        </span>
      </span>
      <span className="lx-btn-chip" aria-hidden="true">
        <span className="lx-btn-arrow">
          <ArrowGlyph />
        </span>
        <span className="lx-btn-arrow lx-btn-arrow--in">
          <ArrowGlyph />
        </span>
      </span>
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="lx-tlink">
      <span>{children}</span>
      <ArrowGlyph />
    </a>
  );
}
