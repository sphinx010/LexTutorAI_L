import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import "../styles/landing.css";
import SmoothScroll from "@/components/SmoothScroll";

// Lexa's notes are set in Geist (design principle 12).
const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LexTutor — Legal work, checked against the law it answers to",
  description:
    "LexTutor audits legal drafts and procedural matters against the rules and authorities that govern them. Demonstrated across the Nigerian Bar Finals, 2010–2025.",
  icons: {
    icon: "/images/logo/LT_logo_type_1_white_L_gold_T.svg",
  },
};

// Before paint: arm the entrance states only when motion is allowed, so a still page shows everything.
const bootScript = `(function(){if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('lx-motion');})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={geist.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:wght@400;500;600&family=Source+Sans+3:wght@400;500;600&family=Tinos:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[var(--lt-canvas)] text-[var(--lt-ink)]">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
