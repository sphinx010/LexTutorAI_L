import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const platformLinks = [
        { label: "Environment", href: "#hero" },
        { label: "Simulations", href: "#features" },
        { label: "Pricing", href: "#pricing" },
    ];

    const companyLinks = [
        { label: "Intelligence", href: "#about" },
        { label: "Research", href: "#" },
        { label: "Careers", href: "#" },
    ];

    const supportLinks = [
        { label: "Help Center", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Status", href: "#" },
    ];

    const legalBottomLinks = [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Ethics", href: "#" },
    ];

    return (
        <footer className="w-full border-t border-[#0f0f10] bg-[#050505] px-6 py-10 text-[#A1A1AA] md:py-14">
            <div className="mx-auto w-full max-w-[1920px] px-0 lg:px-10">
                <div className="grid grid-cols-3 items-start gap-x-6 gap-y-8 md:grid-cols-4 md:gap-10 lg:gap-12">
                    <div className="hidden max-w-md flex-col lg:pr-8 md:col-span-1 md:flex">
                        <Link href="/" className="inline-flex items-center gap-0">
                            <Image
                                src="/images/whiteLogo.png"
                                alt="LexTutor logo"
                                width={120}
                                height={120}
                                className="h-12 w-12 object-contain"
                            />
                            <span className="-ml-3 font-body text-[1.65rem] font-semibold leading-none tracking-tight text-white">LexTutor</span>
                        </Link>

                        <p className="-mt-2 max-w-[32ch] text-[0.9rem] leading-[1.45] text-[#8B8B93]">
                            AI-native pedagogical legal infrastructure.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white sm:text-xs">
                            Platform
                        </h3>
                        <ul className="space-y-2">
                            {platformLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-[0.84rem] text-[#A1A1AA] transition-colors duration-200 hover:text-white sm:text-[1.03rem]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white sm:text-xs">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-[0.84rem] text-[#A1A1AA] transition-colors duration-200 hover:text-white sm:text-[1.03rem]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white sm:text-xs">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-[0.84rem] text-[#A1A1AA] transition-colors duration-200 hover:text-white sm:text-[1.03rem]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-[#1A1A1A] pt-5">
                    <div className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
                        <p className="text-[#81818A]">
                            &copy; {new Date().getFullYear()} LexTutor Inc. All rights reserved.
                        </p>

                        <div className="flex w-full items-center justify-between md:w-auto md:justify-end">
                            <nav className="flex items-center gap-6">
                                {legalBottomLinks.map((link) => (
                                    <Link key={link.label} href={link.href} className="text-[#A1A1AA] transition-colors duration-200 hover:text-white">
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <Link href="/" className="ml-2 inline-flex shrink-0 items-center md:hidden">
                                <Image
                                    src="/images/whiteLogo.png"
                                    alt="LexTutor logo"
                                    width={60}
                                    height={60}
                                    className="h-8 w-8 object-contain"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
