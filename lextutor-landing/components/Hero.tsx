"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#020300]">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="relative min-h-screen px-4 md:hidden sm:px-6">
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

          <p className="absolute bottom-[15%] left-0 z-20 w-full px-6 text-center text-xs text-gray-400">
            Join LexTutor and experience a new paradigm of learning with
            structure and precision.
          </p>
        </div>

        <div className="hidden min-h-[100svh] items-center gap-10 px-10 pt-28 md:grid md:grid-cols-1 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-16 lg:pt-40">
          <div className="mx-auto flex w-full max-w-[720px] flex-col justify-center space-y-6 lg:mx-0 lg:space-y-8 md:mt-16 lg:mt-24">
            <div className="relative">
              <h1 className="text-6xl font-extrabold leading-[0.95] tracking-tight text-[#f2edf1] lg:text-7xl">
                Master Legal Concepts with{" "}
                <br className="hidden md:block" />
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
              </h1>
              {/* AI Boot Sequence Overlay for Desktop Headline */}
              <h1
                className="animate-text-charge absolute inset-0 text-6xl font-extrabold leading-[0.95] tracking-tight lg:text-7xl pointer-events-none"
                aria-hidden="true"
              >
                Master Legal Concepts with{" "}
                <br className="hidden md:block" />
                <span>AI Precision</span>
              </h1>
            </div>

            <p className="max-w-xl text-base leading-relaxed text-gray-400 lg:text-lg">
              Legal education rewards memory. The profession requires structure.
              Experience a legal engineering environment designed for elite
              performance.
            </p>

            <button className="inline-flex w-fit justify-center rounded-full bg-white px-7 py-3 text-base font-semibold text-black shadow-lg transition-colors hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-xl">
              Start Your Free Trial
            </button>
          </div>

          <div className="flex h-full w-full items-end justify-center lg:justify-end lg:pr-8">
            <div className="animate-boot-image-container relative mx-auto w-full max-w-[32rem] lg:mx-0 lg:max-w-[1280px] lg:mr-[-16rem]">
              <div className="pointer-events-none absolute inset-0 z-10 hidden bg-gradient-to-r from-[#020300] via-[#020300]/5 to-transparent lg:block" />
              <Image
                src="/images/hero.jpg"
                alt="Futuristic Lady Justice statue representing AI-powered legal precision"
                width={800}
                height={1000}
                priority
                className="h-auto w-full max-h-[68vh] object-contain object-right-bottom lg:max-h-[96vh]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
