"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// All available logos
const logos = [
    "/images/offftrack-logo.svg",
    "/images/the-two-sisters.png",
    "/images/twinkels.png",
    "/images/vivid-merve.png",
    "/images/me-gorgeous.png",
    "/images/rapid-spine.png",
];

// Each cell starts at a different logo index
const startIndices = [0, 1, 2, 3, 4];

const LOGO_SWITCH_DURATION = 3000;

interface LogoCellProps {
    startIndex: number;
    delay: number;
}

function LogoCell({ startIndex, delay }: LogoCellProps) {
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear any existing timers
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);

        // Wait for initial delay, then start cycling
        timeoutRef.current = setTimeout(() => {
            // Set up the recurring interval
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % logos.length);
            }, LOGO_SWITCH_DURATION);
        }, delay);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [delay]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-12 flex items-center justify-center overflow-hidden">
                <div
                    key={currentIndex}
                    className="flex items-center justify-center animate-[fadeSlideIn_0.5s_ease-out]"
                >
                    <Image
                        src={logos[currentIndex]}
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
        <>
            <style jsx global>{`
                @keyframes fadeSlideIn {
                    0% {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <div className="border-foreground/30 border-t px-4 md:px-12 bg-background">
                <div className="w-full max-w-7xl mx-auto h-full border-foreground/30 border-l border-r">
                    <div className="pt-8 md:pt-12 pb-4 md:pb-6">
                        <p className="text-foreground/70 uppercase font-sans font-medium text-[10px] tracking-wider text-center mx-auto">Used by top companies</p>
                    </div>

                    <div className="border-foreground/30 border-t grid grid-cols-3 md:grid-cols-5">
                        {startIndices.map((startIndex, index) => (
                            <div
                                key={index}
                                className={`w-full aspect-square ${
                                    index >= 3 ? "hidden md:block" : ""
                                } ${
                                    index < startIndices.length - 1 ? "border-r border-foreground/30" : ""
                                } ${
                                    index === 2 ? "border-r-0 md:border-r" : ""
                                }`}
                            >
                                <LogoCell startIndex={startIndex} delay={index * 500} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
