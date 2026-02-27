import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MemorySection from "@/components/MemorySection";
import Features from "@/components/Features";
import IntelligenceSection from "@/components/IntelligenceSection";
import ProgressionLoop from "@/components/ProgressionLoop";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-background text-foreground w-full overflow-clip selection:bg-primary/10 selection:text-primary scroll-smooth">
        <div id="top"></div>
        <Hero />
        <MemorySection />
        <Features />
        <IntelligenceSection />
        <ProgressionLoop />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
