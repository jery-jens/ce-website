"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/app/lib/gsap";
import Image from "next/image";

// Logo data - 5 logos per grid cell, cycling through them
const logoSets = [
    ["/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg"],
    ["/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg"],
    ["/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg"],
    ["/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg"],
    ["/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg", "/images/ing-logo.svg"],
];

const LOGO_SWITCH_DURATION = 5000;

interface LogoCellProps {
    logos: string[];
    delay: number;
}

function LogoCell({ logos, delay }: LogoCellProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentLogoRef = useRef<HTMLDivElement>(null);
    const nextLogoRef = useRef<HTMLDivElement>(null);

    const animateToNext = useCallback(() => {
        if (!currentLogoRef.current || !nextLogoRef.current) return;

        const nextIndex = (currentIndex + 1) % logos.length;

        // Set initial state for next logo (coming from bottom)
        gsap.set(nextLogoRef.current, {
            y: "100%",
        });

        // Animate current logo out (slide up)
        gsap.to(currentLogoRef.current, {
            y: "-100%",
            duration: .5,
            ease: "causality",
        });

        // Animate next logo in (slide up from bottom)
        gsap.to(nextLogoRef.current, {
            y: "0%",
            duration: .5,
            ease: "causality",
            onComplete: () => {
                setCurrentIndex(nextIndex);
                // Reset current logo position for next animation
                if (currentLogoRef.current) {
                    gsap.set(currentLogoRef.current, {
                        y: "0%",
                    });
                }
            },
        });
    }, [currentIndex, logos.length]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const timeoutId = setTimeout(() => {
            animateToNext();
            intervalId = setInterval(animateToNext, LOGO_SWITCH_DURATION);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [animateToNext, delay]);

    const nextIndex = (currentIndex + 1) % logos.length;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Logo mask container */}
            <div className="relative w-full h-12 overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)" }}>
                <div
                    ref={currentLogoRef}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Image
                        src={logos[currentIndex]}
                        alt="Partner logo"
                        width={100}
                        height={40}
                        className="object-contain max-h-8"
                    />
                </div>
                <div
                    ref={nextLogoRef}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: "translateY(100%)" }}
                >
                    <Image
                        src={logos[nextIndex]}
                        alt="Partner logo"
                        width={100}
                        height={40}
                        className="object-contain max-h-8"
                    />
                </div>
            </div>
        </div>
    );
}

export default function LogoGrid() {
    return (
        <div className="border-foreground/30 border-t px-4 md:px-12 bg-background">
            <div className="w-full max-w-7xl mx-auto h-full border-foreground/30 border-l border-r">
                <div className="pt-8 md:pt-12 pb-4 md:pb-6">
                    <p className="text-foreground/70 uppercase font-sans font-medium text-[10px] tracking-wider text-center mx-auto">Used by top companies</p>
                </div>

                <div className="border-foreground/30 border-t grid grid-cols-3 md:grid-cols-5">
                    {logoSets.map((logos, index) => (
                        <div
                            key={index}
                            className={`w-full aspect-square ${
                                /* Mobile: hide 4th and 5th logo, show border-right except last visible */
                                index >= 3 ? "hidden md:block" : ""
                            } ${
                                /* Border logic: on mobile (3 cols) no border on 3rd item, on desktop (5 cols) no border on 5th */
                                index < logoSets.length - 1 ? "border-r border-foreground/30" : ""
                            } ${
                                /* Remove border on last mobile item (3rd) */
                                index === 2 ? "border-r-0 md:border-r" : ""
                            }`}
                        >
                            <LogoCell logos={logos} delay={LOGO_SWITCH_DURATION + index * 2500} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
