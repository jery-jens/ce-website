"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import Button from "./Button";
import Image from "next/image";

interface Feature {
    id: string;
    title: string;
    description: string;
    image: string;
}

const features: Feature[] = [
    {
        id: "attribution",
        title: "Attribution Reimagined.",
        description: "First/last touch hides the real story. Causality applies AI-adjusted attribution to show the true ROI of every channel.",
        image: "/images/feature-attribution.jpg",
    },
    {
        id: "journey",
        title: "Journey Intelligence.",
        description: "Map every touchpoint across the customer journey. See how channels work together to drive conversions.",
        image: "/images/feature-journey.jpg",
    },
    {
        id: "optimization",
        title: "Optimization Queue.",
        description: "Get AI-powered recommendations on where to allocate budget for maximum impact.",
        image: "/images/feature-optimization.jpg",
    },
    {
        id: "discovery",
        title: "Hidden Value Discovery.",
        description: "Uncover undervalued channels and hidden revenue opportunities your competitors are missing.",
        image: "/images/feature-discovery.jpg",
    },
];

export default function Features() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!containerRef.current || !headingRef.current) return;

        // Animate heading on scroll
        const headingLines = headingRef.current.querySelectorAll(".headline-line");

        gsap.set(headingLines, {
            y: "100%",
            opacity: 0,
            filter: "blur(10px)",
        });

        gsap.to(headingLines, {
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "causality",
            stagger: 0.1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
        });

        // Create scroll triggers for each section to update active tab
        sectionRefs.current.forEach((section, index) => {
            if (!section) return;

            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index),
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const scrollToSection = (index: number) => {
        const section = sectionRefs.current[index];
        if (section) {
            const yOffset = tabsRef.current ? -tabsRef.current.offsetHeight - 32 : -100;
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div ref={containerRef} className="border-b border-foreground/30 relative z-10">
            <div className="px-12 relative z-10">
                <div className="max-w-7xl mx-auto border-l border-r border-foreground/30">
                    <div className="px-8 pt-48 pb-16">
                        <h2
                            ref={headingRef}
                            className="font-serif font-medium text-6xl text-foreground tracking-tighter leading-[1.1] max-w-[564px]"
                        >
                            <span className="block overflow-hidden">
                                <span className="headline-line block">Everything you need</span>
                            </span>
                            <span className="block overflow-hidden">
                                <span className="headline-line block">to turn marketing</span>
                            </span>
                            <span className="block overflow-hidden">
                                <span className="headline-line block">into revenue.</span>
                            </span>
                        </h2>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-100 relative z-10" data-header-theme="light">
                <div className="px-12">
                    <div className="max-w-7xl mx-auto border-l border-r border-background/16">
                        <div
                            ref={tabsRef}
                            className="sticky top-0 z-50 bg-neutral-100 pt-20 pb-px px-8"
                        >
                            <div className="flex border border-background/16 rounded-t-lg overflow-hidden">
                                {features.map((feature, index) => (
                                    <button
                                        key={feature.id}
                                        onClick={() => scrollToSection(index)}
                                        className={`flex-1 flex items-center justify-center gap-2.5 h-12 transition-colors cursor-pointer ${
                                            index < features.length - 1 ? "border-r border-background/16" : ""
                                        } ${
                                            activeIndex === index
                                                ? "bg-white"
                                                : "bg-transparent hover:bg-white/50"
                                        }`}
                                    >
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            className={activeIndex === index ? "text-orange-500" : "text-background/40"}
                                        >
                                            <path
                                                d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <span className="font-sans font-medium text-sm text-background">
                                            {feature.title.replace(".", "")}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="px-8">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    ref={(el) => {
                                        sectionRefs.current[index] = el;
                                    }}
                                >
                                    <div className="h-8 border-l border-r border-background/16" />

                                    {/* Content Card */}
                                    <div className="bg-white border border-background/16 flex h-[640px]">
                                        {/* Left - Text */}
                                        <div className="flex-1 flex flex-col items-start justify-between p-8 overflow-hidden">
                                            <div className="space-y-6 max-w-[380px]">
                                                <h3 className="font-serif font-medium text-[32px] text-background tracking-tight leading-[1.2]">
                                                    {feature.title}
                                                </h3>
                                                <p className="font-sans text-lg text-background/70 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                            <Button variant="primary" mode="light" href="/signup">
                                                Start for free
                                            </Button>
                                        </div>

                                        {/* Right - Image */}
                                        <div className="w-[720px] h-full bg-neutral-200 overflow-hidden relative">
                                            {/* Placeholder for image */}
                                            <div className="absolute inset-0 bg-linear-to-br from-neutral-300 to-neutral-400" />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Final Divider */}
                            <div className="h-8 border-l border-r border-background/16" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
