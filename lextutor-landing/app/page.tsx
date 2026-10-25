import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MemorySection from "@/components/MemorySection";
import Features from "@/components/Features";
import TelemetryGraphSection from "@/components/TelemetryGraphSection";
import IntelligenceSection from "@/components/IntelligenceSection";
import ProgressionLoop from "@/components/ProgressionLoop";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-[var(--lt-page)] text-[var(--lt-ink)] w-full overflow-x-hidden selection:bg-[var(--lt-gold)]/20 selection:text-[var(--lt-gold)] scroll-smooth">
        <div id="top" />
        <Hero />
        <MemorySection />
        <Features />
        <TelemetryGraphSection />
        <IntelligenceSection />
        <ProgressionLoop />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
