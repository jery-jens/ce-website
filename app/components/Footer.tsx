import Image from "next/image";
import Link from "next/link";
import AnimatedLink from "./AnimatedLink";

export default function Footer() {
    return (
        <div className="px-4 md:px-12 border-t border-foreground/30 bg-background">
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 border-l border-r border-foreground/30 space-y-12 md:space-y-32">
                <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                    <Link href="/">
                        <Image src="/images/ce-logo.svg" alt="Logo" className="w-20 md:w-24 h-auto" width={100} height={100} />
                    </Link>

                    <div className="grid grid-cols-2 md:flex md:justify-end w-full gap-6 md:gap-0">
                        <div className="md:max-w-[160px] md:w-full flex flex-col gap-2">
                            <p className="font-medium font-sans text-sm">Product</p>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="/pricing">Pricing</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="/resources">Resources</AnimatedLink>
                        </div>
                        <div className="md:max-w-[160px] md:w-full flex flex-col gap-2">
                            <p className="font-medium font-sans text-sm">Account</p>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="/signin">Sign in</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="/signup">Sign up</AnimatedLink>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 md:justify-between">
                    {/* Social Icons */}
                    <div className="flex gap-1 order-1 md:order-none">
                        <a
                            href="https://www.linkedin.com/company/causalityengine/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.94 5C6.94 5.53 6.72 6.04 6.33 6.41C5.94 6.79 5.42 7 4.88 7C4.34 7 3.82 6.79 3.43 6.41C3.04 6.04 2.82 5.53 2.82 5C2.82 4.47 3.04 3.96 3.43 3.59C3.82 3.21 4.34 3 4.88 3C5.42 3 5.94 3.21 6.33 3.59C6.72 3.96 6.94 4.47 6.94 5ZM7 8.48H3V21H7V8.48ZM13.32 8.48H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.9 14.94 7.13 13.28 10.16L13.32 8.48Z"/>
                            </svg>
                        </a>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 order-2 md:order-none md:absolute md:left-1/2 md:-translate-x-1/2">
                        <AnimatedLink href="/privacy" className="font-sans text-[10px] text-foreground/70 tracking-tight">
                            Privacy Policy
                        </AnimatedLink>
                        <AnimatedLink href="/terms" className="font-sans text-[10px] text-foreground/70 tracking-tight">
                            Terms & Conditions
                        </AnimatedLink>
                        <AnimatedLink href="/cookies" className="font-sans text-[10px] text-foreground/70 tracking-tight">
                            Cookie Policy
                        </AnimatedLink>
                    </div>

                    {/* Copyright */}
                    <p className="font-sans text-[10px] text-foreground/70 tracking-tight order-3 md:order-none">
                        © Copyright 2026, Causality Engine
                    </p>
                </div>
            </div>
        </div>
    )
}