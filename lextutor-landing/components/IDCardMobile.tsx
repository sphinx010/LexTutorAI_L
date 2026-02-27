import Image from "next/image";
import type { CSSProperties } from "react";
import { FeatureItem } from "./IDCard";

export interface IDCardMobileProps {
    current: FeatureItem;
    activeIndex: number;
}

export default function IDCardMobile({ current, activeIndex }: IDCardMobileProps) {
    return (
        <div className="relative w-full h-full max-w-[340px] mx-auto active:scale-[0.98] transition-transform duration-300 group">

            {/* 
        1. THE OUTER SHELL (Silver Border)
      */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-[0_0_25px_rgba(0,0,0,0.8)]"
                style={{ clipPath: "polygon(15% 0, 85% 0, 100% 12%, 100% 100%, 0 100%, 0 12%)" }}
            >
                {/* 
          2. THE INNER BODY (Black Content Area)
        */}
                <div
                    className="absolute inset-[2px] bg-[#0A0A0A] overflow-hidden flex flex-col"
                    style={{ clipPath: "polygon(15% 0, 85% 0, 100% 12%, 100% 100%, 0 100%, 0 12%)" }}
                >
                    {/* Subtle inner top reflection */}
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-white/20" />

                    {/* Glass-morphism scanline overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 z-10 mix-blend-overlay" />

                    {/* CONTENT STACK (Top to Bottom) */}
                    <div className="relative z-20 flex flex-col pt-10 px-6 h-full">

                        {/* Header: Pill Badge (High contrast) */}
                        <div className="flex justify-center mb-4 mt-2">
                            <div className="inline-flex items-center px-4 py-1.5 border border-white/80 rounded bg-transparent">
                                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.1em] text-white">
                                    USER ID: {current.serial}
                                </span>
                            </div>
                        </div>

                        {/* Reference Info (Pulled upwards closer to the Badge) */}
                        <div className="mb-auto flex flex-col items-center">
                            <h4 className="text-[12px] sm:text-[14px] font-sans font-extrabold tracking-[0.05em] text-gray-400 uppercase leading-none mb-2">
                                REF / SEC: {current.refLabel}
                            </h4>
                            <span className="text-[10px] sm:text-[11px] text-cyan-400 font-mono tracking-widest truncate max-w-[90%] text-center">
                                {current.refDesc}
                            </span>
                        </div>

                        {/* The Typography (Massive, Bold, Uppercase) - Pushed Downwards */}
                        <div className="mb-4 text-center mt-6">
                            <h3 className="text-3xl sm:text-[38px] font-extrabold text-[#F3F4F6] uppercase leading-none tracking-tight">
                                {current.title}
                            </h3>
                        </div>

                        {/* Description Header text */}

                        {/* Quote / Body Block */}
                        <div className="mb-6 relative z-30">
                            <p className="text-[14px] sm:text-[15px] text-white/95 font-medium leading-relaxed">
                                "{current.desc}"
                            </p>
                        </div>

                    </div>

                    {/* 
            STEP ONE ONLY: The Hero Image
            - Space at the bottom
            - Cropped significantly smaller
            - No green/color highlights or bursts
            - Feature section is just a black background
            - Edges rounded and blurred with a radial mask gradient so it blends
          */}
                    <div className="absolute bottom-6 inset-x-0 h-[35%] flex items-center justify-center pointer-events-none z-10">
                        <div
                            className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center rounded-full overflow-hidden"
                            style={{
                                maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
                                WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)'
                            }}
                        >
                            <Image
                                src={current.icon}
                                alt={current.title}
                                width={200}
                                height={200}
                                priority={activeIndex === 0}
                                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* 
        The Side Grips (Notches)
      */}
            <div className="absolute -left-1.5 top-[30%] w-1.5 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-l-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] z-0" />
            <div className="absolute -right-1.5 top-[25%] w-1.5 h-24 bg-gradient-to-l from-gray-400 to-gray-500 rounded-r-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] z-0" />

            {/* Top Right Clearance Badge floating notch */}
            <div className="absolute top-14 right-0 transform translate-x-1/2 rotate-90 origin-bottom-right hidden sm:block">
                <span className="text-[7px] text-gray-500 font-mono tracking-[0.2em] uppercase">
                    LEVEL {activeIndex + 1}
                </span>
            </div>

        </div>
    );
}
