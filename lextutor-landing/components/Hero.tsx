"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#020300] min-h-[100svh] lg:min-h-screen flex flex-col">
      <div className="mx-auto flex-1 w-full max-w-[1920px] px-6 md:px-10 lg:px-16 flex flex-col justify-center pb-12 pt-24 lg:pt-32">
        <div className="relative w-full px-4 md:hidden sm:px-6">
          <h1 className="absolute left-0 top-0 z-20 w-full px-4 pt-24 text-center text-4xl font-extrabold leading-[0.9] tracking-[-0.03em] text-[#f2edf1] drop-shadow-lg sm:px-6 sm:pt-24 sm:text-5xl">
            Master Legal Concepts with
            <span className="block">
              <span className="relative inline-block">
                <span className="opacity-0 animate-boot-text-reveal">
                  <span className="text-[#62bfd0]">AI </span>
                  <span className="bg-[linear-gradient(90deg,#8ecbe6_0%,#8fc9e3_72%,#b6bfd3_88%,#daafc3_100%)] bg-clip-text text-transparent">
                    Precision
                  </span>
                </span>
                <span className="absolute left-0 top-0 w-full text-center text-[#f2edf1] animate-boot-text-hide pointer-events-none" aria-hidden="true">
                  AI Precision
                </span>
              </span>
            </span>
          </h1>
          {/* AI Boot Sequence Overlay for Mobile Headline */}
          <h1
            className="animate-text-charge absolute left-0 top-0 z-30 w-full px-4 pt-24 text-center text-4xl font-extrabold leading-[0.9] tracking-[-0.03em] drop-shadow-lg sm:px-6 sm:pt-24 sm:text-5xl pointer-events-none"
            aria-hidden="true"
          >
            Master Legal Concepts with
            <span className="block">AI Precision</span>
          </h1>

          <div className="animate-boot-image-container absolute left-1/2 top-[50%] z-10 flex w-full -translate-x-1/2 -translate-y-1/2 justify-center">
            <Image
              src="/images/hero.jpg"
              alt="Futuristic Lady Justice statue representing AI-powered legal precision"
              width={900}
              height={1200}
              priority
              className="h-auto w-full max-h-[85vh] scale-[1.08] object-contain sm:scale-[1.05]"
            />
            <div className="pointer-events-none absolute bottom-[-1.5%] right-[0.0009%] h-16 w-16 rounded-md bg-[#000000]" />
          </div>

          <p className="absolute bottom-[10%] left-0 z-20 w-full px-6 text-center text-xs text-gray-400">
            Join LexTutor and experience a new paradigm of learning with
            structure and precision.
          </p>
        </div>

        <div className="hidden flex-1 w-full items-center gap-10 md:grid md:grid-cols-1 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="flex w-full flex-col justify-center z-20">
            <div className="relative">
              <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-[#f2edf1] lg:text-6xl">
                Master Legal Concepts with{" "}
                <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-[#daafc3] to-[#62bfd0] bg-clip-text text-transparent drop-shadow-sm">
                  AI Precision
                </span>
              </h1>
              {/* Desktop Text Wave Animation Overlay */}
              <h1
                className="animate-text-charge absolute left-0 top-0 z-30 w-full text-5xl font-extrabold leading-[0.95] tracking-tight drop-shadow-sm lg:text-6xl pointer-events-none"
                aria-hidden="true"
              >
                Master Legal Concepts with{" "}
                <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-[#daafc3] to-[#62bfd0] bg-clip-text text-transparent">
                  AI Precision
                </span>
              </h1>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-gray-400 lg:text-lg mb-8 mt-6">
              Legal education rewards memory. The profession requires structure.
              Experience a legal engineering environment designed for elite
              performance.
            </p>

            <button className="inline-flex w-fit justify-center rounded-md border border-white/20 bg-transparent px-8 py-3.5 text-sm font-medium text-white shadow-lg transition-colors hover:border-white hover:bg-white hover:text-black lg:text-base">
              Start Your Free Trial
            </button>
          </div>

          <div className="flex h-full w-full items-end justify-center lg:justify-end lg:pr-8">
            <div className="animate-boot-image-container relative mx-auto w-full max-w-[32rem] lg:mx-0 lg:max-w-[1280px] xl:mr-[-16rem] lg:mr-[-8rem]">
              <div className="pointer-events-none absolute inset-0 z-10 hidden bg-gradient-to-r from-[#020300] via-[#020300]/5 to-transparent lg:block" />
              <div className="relative w-full h-full -translate-x-12 lg:-translate-x-24 xl:-translate-x-32">
                <Image
                  src="/images/hero.jpg"
                  alt="Futuristic Lady Justice statue representing AI-powered legal precision"
                  width={800}
                  height={1000}
                  priority
                  className="h-auto w-full max-h-[70vh] object-contain object-right-bottom lg:max-h-[85vh]"
                />
                {/* Mask to hide the extra baked-in artifact layer on the right edge */}
                <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-48 bg-[#000000] blur-xl" />
                <div className="pointer-events-none absolute bottom-0 right-[-5%] h-full w-[15%] bg-[#000000]" />
              </div>
            </div>
          </div>
        </div >
      </div >
    </section >
  );
}
