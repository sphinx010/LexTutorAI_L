import Image from "next/image";
import type { CSSProperties } from "react";

export interface FeatureItem {
    title: string;
    desc: string;
    refLabel: string;
    refDesc: string;
    icon: string;
    serial: string;
    barcodeGlow: string;
}

export interface IDCardProps {
    current: FeatureItem;
    activeIndex: number;
}

export default function IDCard({ current, activeIndex }: IDCardProps) {
    const barcodeGlowStyle = { "--barcode-glow": current.barcodeGlow } as CSSProperties;

    return (
        <div className="group relative h-full w-full overflow-hidden rounded-[1.2rem] border border-white/15 bg-black/80 shadow-[0_24px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1">
            {/* Background FX Layers */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.2rem] bg-[linear-gradient(132deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.08)_16%,rgba(255,255,255,0.02)_30%,rgba(255,255,255,0)_52%,rgba(255,255,255,0.1)_100%)] opacity-45" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(255,255,255,0.08),transparent_44%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.05),transparent_38%)] opacity-60" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:12px_12px] opacity-[0.12]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-xl border border-white/10" />
            <div className="pointer-events-none absolute left-8 top-0 h-px w-1/3 bg-gradient-to-r from-white/75 via-white/45 to-transparent opacity-80" />
            <div className="pointer-events-none absolute right-0 top-10 h-1/3 w-px bg-gradient-to-b from-white/55 via-white/20 to-transparent" />
            <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-36 rotate-[-18deg] bg-white/25 blur-2xl opacity-25" />
            <div className="pointer-events-none absolute -right-12 bottom-[-52px] h-28 w-44 rotate-[12deg] bg-white/15 blur-2xl opacity-20" />

            {/* Grid Layout Container : Exactly like desktop but scaled for mobile */}
            <div className="relative z-10 grid h-full grid-cols-3">
                {/* Left Column (Image & ID) */}
                <div className="col-span-1 border-r border-white/10 bg-[#191919] flex flex-col items-center p-3 sm:px-4 sm:py-4">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),transparent_54%)]" />

                    <div className="relative z-10 w-full aspect-square shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/42 p-2 shadow-[0_12px_24px_rgba(0,0,0,0.42)]">
                        <Image
                            src={current.icon}
                            alt={current.title}
                            width={420}
                            height={420}
                            priority={activeIndex === 0}
                            className="relative z-10 h-full w-full rounded-lg object-contain [mask-image:radial-gradient(ellipse_80%_80%_at_50%_46%,black_58%,transparent_100%)]"
                        />
                        <div className="pointer-events-none absolute inset-0 z-20 rounded-xl bg-[radial-gradient(circle_at_95%_95%,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.8)_12%,transparent_30%)]" />
                        <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_24px_10px_rgba(13,13,13,0.9)]" />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
                    </div>

                    <div className="z-10 mt-3 w-full text-center">
                        <p className="text-[6px] sm:text-[8px] font-mono uppercase tracking-[0.16em] text-gray-400">User ID</p>
                        <p className="mt-0.5 text-[7px] sm:text-[10px] font-mono leading-tight tracking-[0.08em] text-[#FF2F92] truncate">{current.serial}</p>
                    </div>

                    <div className="z-10 mt-auto mb-1 w-full border-t border-white/10 pt-3 flex flex-col items-center">
                        <p className="mb-1 text-[6px] sm:text-[8px] font-mono uppercase tracking-widest text-gray-500 text-center w-full">
                            SCAN CODE
                        </p>
                        <div className="relative h-4 w-[90%]" style={barcodeGlowStyle}>
                            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#fff_0px,#fff_1px,transparent_1px,transparent_3px)] opacity-60" />
                        </div>
                    </div>
                </div>

                {/* Right Column (Content) */}
                <div className="relative col-span-2 flex h-full flex-col justify-center bg-[#111111] p-4 sm:p-5 min-w-0">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_22%,rgba(255,255,255,0)_52%,rgba(255,255,255,0.04)_100%)]" />
                    <div className="pointer-events-none absolute left-0 top-0 h-px w-2/3 bg-gradient-to-r from-white/55 via-white/20 to-transparent" />
                    <div className="pointer-events-none absolute -top-10 right-10 h-24 w-36 rotate-[14deg] bg-white/15 blur-2xl opacity-20" />

                    <div className="absolute top-3 inset-x-4 flex justify-between items-start z-30">
                        <p className="text-[6px] sm:text-[8px] font-mono uppercase tracking-[0.16em] text-white/30 text-left">
                            LEX TUTOR CLEARANCE<br />LEVEL 5
                        </p>
                    </div>

                    <div className="mt-4">
                        <p className="mb-1 text-[7px] sm:text-[8px] font-mono uppercase tracking-widest text-gray-500">
                            FEATURE
                        </p>

                        <h3 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-[#F2C94C] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.1)] drop-shadow-[0_0_8px_rgba(242,201,76,0.35)] truncate">
                            {current.title}
                        </h3>

                        <hr className="my-2 border-white/10" />

                        <p className="mb-3 text-[10px] sm:text-xs font-medium leading-relaxed text-white/95 line-clamp-2">
                            {current.desc}
                        </p>

                        <hr className="mb-3 border-white/10" />

                        <div className="min-w-0">
                            <p className="mb-1 text-[7px] sm:text-[8px] font-mono uppercase tracking-widest text-[#66D9EF]">
                                LEGAL REFERENCE
                            </p>
                            <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wide text-[#7CFF9E] leading-tight truncate">
                                {current.refLabel}
                            </p>
                            <p className="mt-0.5 text-[9px] sm:text-[10px] font-mono text-[#7CFF9E] leading-tight truncate">
                                {current.refDesc}
                            </p>
                        </div>
                    </div>

                    <p className="absolute bottom-3 right-4 text-[6px] sm:text-[8px] font-mono uppercase tracking-[0.16em] text-white/30 text-right z-30">
                        AUTHORIZED PERSONNEL<br />ONLY
                    </p>
                </div>
            </div>
        </div>
    );
}
