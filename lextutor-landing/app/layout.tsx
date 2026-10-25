import type { Metadata } from "next";
import "../styles/globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "LexTutor — Runtime Legal Evaluation System",
  description:
    "Law is structural and interpretive. LexTutor combines structured legal schemas, runtime artifact evaluation, and bound inference to audit legal work against applicable rules, authorities, and procedure.",
  icons: {
    icon: "/images/logo/LT_logo_type_1_white_L_gold_T.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Geist:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans bg-[var(--lt-canvas)] text-[var(--lt-ink)] overflow-x-hidden">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
