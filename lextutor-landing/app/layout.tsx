import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google"; // Import Playfair Display
import "../styles/globals.css";
import SmoothScroll from "@/components/SmoothScroll"; // Adjust path as needed
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LexTutor - AI Legal Intelligence",
  description: "Master legal concepts efficiently with advanced AI-powered tutoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          playfair.variable, // Add Playfair variable
          "antialiased font-sans bg-background text-foreground"
        )}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
