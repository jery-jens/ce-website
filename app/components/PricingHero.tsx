"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import Button from "./Button";
import Image from "next/image";

interface PricingFeature {
    text: string;
}

const features: PricingFeature[] = [
    { text: "Pay only when you run an analysis" },
    { text: "No historical analysis data retention" },
    { text: "Full access to all features" },
    { text: "Intelligence-Adjusted Attribution" },
    { text: "Optimization Queue" },
];

export default function PricingHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const cardInnerRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    // Set initial states synchronously before paint
    useLayoutEffect(() => {
        if (headlineRef.current) {
            const lines = headlineRef.current.querySelectorAll(".headline-line");
            gsap.set(lines, { y: "100%", opacity: 0, filter: "blur(10px)" });
        }
        if (cardRef.current) {
            gsap.set(cardRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
        }
        if (cardInnerRef.current) {
            gsap.set(cardInnerRef.current, { y: 30 });
        }
        if (backgroundRef.current) {
            gsap.set(backgroundRef.current, { opacity: 0, scale: 1.1 });
        }
    }, []);

    // Run animations after paint
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        // Animate headline
        if (headlineRef.current) {
            const lines = headlineRef.current.querySelectorAll(".headline-line");
            tl.to(lines, {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "causality",
                stagger: 0.1,
            });
        }

        // Animate card with clip-path mask reveal from top
        if (cardRef.current && cardInnerRef.current) {
            // Reveal card with clip-path expanding downward
            tl.to(cardRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1,
                ease: "causality",
            }, "-=0.3");

            // Content slides up as it's revealed
            tl.to(cardInnerRef.current, {
                y: 0,
                duration: 1,
                ease: "causality",
            }, "<");
        }

        // Animate background
        if (backgroundRef.current) {
            tl.to(backgroundRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "causality",
            }, 0);
        }

        // Parallax effect on background
        const parallaxTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            animation: gsap.to(backgroundRef.current, {
                y: "20%",
                ease: "none",
            }),
            id: "pricing-hero-parallax",
        });

        return () => {
            parallaxTrigger.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative bg-background overflow-hidden">
            <div className="px-12">
                <div className="max-w-7xl mx-auto border-l border-r border-foreground/30 relative overflow-hidden">
                    {/* Background image */}
                    <div
                        ref={backgroundRef}
                        className="absolute left-0 right-0 bottom-0 h-[500px] pointer-events-none"
                    >
                        <div className="relative w-full h-full rotate-180">
                            <Image
                                src="/images/hero-pricing.png"
                                alt=""
                                fill
                                className="object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-16 pt-32 pb-20 px-8 relative z-10">
                        {/* Header */}
                        <div className="flex flex-col items-center gap-6">
                            <p className="text-foreground/70 uppercase font-sans font-medium text-[10px] tracking-wider">
                                Pricing
                            </p>
                            <div ref={headlineRef} className="text-center">
                                <h1 className="font-serif font-medium text-7xl tracking-tighter leading-[1.1]">
                                    <span className="block overflow-hidden pb-1">
                                        <span className="headline-line block">Our pricing.</span>
                                    </span>
                                    <span className="block overflow-hidden pb-1">
                                        <span className="headline-line block">Really simple.</span>
                                    </span>
                                </h1>
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div
                            ref={cardRef}
                            className="w-full max-w-[400px] bg-neutral-800 rounded-lg overflow-hidden"
                        >
                            <div ref={cardInnerRef}>
                                {/* Card Header */}
                                <div className="p-6 border-b border-foreground/15 flex flex-col gap-8">
                                    <div className="flex flex-col gap-4">
                                        <h2 className="font-serif text-xl text-foreground tracking-tight">
                                            Pay-per-use
                                        </h2>
                                        <div className="flex items-end gap-1">
                                            <span className="font-sans font-medium text-3xl text-foreground">
                                                €99
                                            </span>
                                            <span className="font-sans font-medium text-sm text-foreground pb-1">
                                                / analysis
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="primary" href="https://app.causalityengine.ai/signup" className="w-full">
                                        Try now
                                    </Button>
                                </div>

                                {/* Card Features */}
                                <div className="p-6 flex flex-col gap-3">
                                    <p className="text-foreground/70 uppercase font-sans font-medium text-[10px] tracking-wider pb-2">
                                        Includes
                                    </p>
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex gap-2 items-start">
                                            <div className="pt-0.5">
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15 4.5L6.75 12.75L3 9"
                                                        stroke="white"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="font-sans font-medium text-sm text-foreground leading-relaxed">
                                                {feature.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
