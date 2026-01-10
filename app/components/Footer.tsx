import Image from "next/image";
import Link from "next/link";
import AnimatedLink from "./AnimatedLink";

export default function Footer() {
    return (
        <div className="px-12 border-t border-foreground/30 bg-background">
            <div className="max-w-7xl mx-auto px-12 py-12 border-l border-r border-foreground/30 space-y-32">
                <div className="flex">
                    <Link href="">
                        <Image src="/images/ce-logo.svg" alt="Logo" className="w-24 h-auto" width={100} height={100} />
                    </Link>

                    <div className="flex justify-end w-full">
                        <div className="max-w-[160px] w-full flex flex-col gap-2">
                            <p className="font-medium font-sans text-sm">Label</p>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                        </div>
                        <div className="max-w-[160px] w-full flex flex-col gap-2">
                            <p className="font-medium font-sans text-sm">Label</p>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                        </div>
                        <div className="max-w-[160px] w-full flex flex-col gap-2">
                            <p className="font-medium font-sans text-sm">Label</p>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                            <AnimatedLink className="font-medium font-sans text-sm text-foreground/70" href="">Page link</AnimatedLink>
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-between">
                    {/* Social Icons */}
                    <div className="flex gap-1">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                            </svg>
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"/>
                            </svg>
                        </a>
                        <a
                            href="https://linkedin.com"
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
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
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
                    <p className="font-sans text-[10px] text-foreground/70 tracking-tight">
                        © Copyright 2026, Causality Engine
                    </p>
                </div>
            </div>
        </div>
    )
}