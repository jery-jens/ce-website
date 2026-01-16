"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";

interface Feature {
    id: string;
    name: string;
    description: string;
    position: { top: string; left: string };
}

interface FeaturePillProps {
    feature: Feature;
    isActive: boolean;
    onHover: (id: string | null) => void;
}

function FeaturePill({ feature, isActive, onHover }: FeaturePillProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!cardRef.current || !iconRef.current) return;

        // Kill any running animations on these elements
        gsap.killTweensOf(cardRef.current);
        gsap.killTweensOf(iconRef.current);

        if (isActive) {
            // Animate card slide in from bottom with blur
            gsap.fromTo(cardRef.current,
                {
                    opacity: 0,
                    y: 20,
                    filter: "blur(8px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.4,
                    ease: "causality",
                }
            );
            // Animate icon rotation
            gsap.to(iconRef.current, {
                rotation: 90,
                duration: 0.3,
                ease: "causality",
            });
        } else {
            // Animate card slide out with blur
            gsap.to(cardRef.current, {
                opacity: 0,
                y: 20,
                filter: "blur(8px)",
                duration: 0.3,
                ease: "causality",
            });
            // Reset icon rotation
            gsap.to(iconRef.current, {
                rotation: 0,
                duration: 0.3,
                ease: "causality",
            });
        }
    }, [isActive]);

    const handleMouseEnter = useCallback(() => {
        onHover(feature.id);
    }, [feature.id, onHover]);

    const handleMouseLeave = useCallback(() => {
        onHover(null);
    }, [onHover]);

    return (
        <div
            className={`feature-pill absolute ${isActive ? "z-50" : "z-10"}`}
            style={{
                top: feature.position.top,
                left: feature.position.left,
                transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Feature Card - positioned above pill, hidden on mobile */}
            <div
                ref={cardRef}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[200px] bg-neutral-800 rounded-lg overflow-hidden shadow-xl z-10 opacity-0 pointer-events-none hidden md:block"
            >
                <div className="p-3 space-y-1">
                    <p className="font-sans font-medium text-sm text-foreground">
                        {feature.name}
                    </p>
                    <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                        {feature.description}
                    </p>
                </div>
            </div>

            {/* Pill button */}
            <button
                className={`flex items-center gap-1.5 h-7 md:h-9 px-1.5 md:px-2 pr-3 md:pr-4 rounded-full transition-colors md:cursor-pointer whitespace-nowrap ${
                    isActive
                        ? "bg-neutral-800"
                        : "bg-background md:hover:bg-neutral-800"
                }`}
            >
                <span
                    ref={iconRef}
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-xs shrink-0 leading-none ${
                        isActive ? "bg-orange-500 text-background" : "bg-foreground/20 text-foreground"
                    }`}
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </span>
                <span className="font-sans font-medium text-xs md:text-sm text-foreground">
                    {feature.name}
                </span>
            </button>
        </div>
    );
}

const features: Feature[] = [
    {
        id: "journey",
        name: "Journey Acceleration",
        description: "Speed up customer journeys with AI-powered path optimization and predictive touchpoints.",
        position: { top: "35%", left: "25%" }, // Inner orbit, top-left
    },
    {
        id: "revenue",
        name: "Revenue Attribution",
        description: "See the true impact of every channel with intelligence-adjusted attribution. No more guesswork.",
        position: { top: "65%", left: "70%" }, // Inner orbit, bottom-right
    },
    {
        id: "talk",
        name: "Talk with Causality",
        description: "Ask questions in plain language and get instant insights about your marketing performance.",
        position: { top: "93%", left: "50%" }, // Outer orbit, bottom center
    },
    {
        id: "channel",
        name: "Channel Amplification",
        description: "Identify and amplify your best-performing channels with real-time budget reallocation.",
        position: { top: "20%", left: "70%" }, // Outer orbit, top-right
    },
    {
        id: "campaign",
        name: "Campaign Optimization",
        description: "Automatically optimize campaigns with AI that learns from every interaction.",
        position: { top: "60%", left: "13%" }, // Outer orbit, left
    },
];

export default function Engine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const outerOrbitRef = useRef<SVGEllipseElement>(null);
    const innerOrbitRef = useRef<SVGEllipseElement>(null);
    const comet2Ref = useRef<SVGEllipseElement>(null);
    const orbitsContainerRef = useRef<HTMLDivElement>(null);
    const [activeFeature, setActiveFeature] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current || !headingRef.current) return;

        const triggers: ScrollTrigger[] = [];

        // Animate heading on scroll
        const lines = headingRef.current.querySelectorAll(".headline-line");

        gsap.set(lines, {
            y: "100%",
            opacity: 0,
            filter: "blur(10px)",
        });

        const headingTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            animation: gsap.to(lines, {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.6,
                ease: "causality",
                stagger: 0.1,
            }),
            id: "engine-heading",
        });
        triggers.push(headingTrigger);

        // Animate visual elements
        if (visualRef.current) {
            const orbits = visualRef.current.querySelectorAll(".orbit");
            const featurePills = visualRef.current.querySelectorAll(".feature-pill");

            gsap.set(orbits, { opacity: 0, scale: 0.8 });
            gsap.set(featurePills, { opacity: 0, y: 20 });

            const orbitsTrigger = ScrollTrigger.create({
                trigger: visualRef.current,
                start: "top 80%",
                animation: gsap.to(orbits, {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "causality",
                    stagger: 0.2,
                }),
                id: "engine-orbits",
            });
            triggers.push(orbitsTrigger);

            const pillsTrigger = ScrollTrigger.create({
                trigger: visualRef.current,
                start: "top 80%",
                animation: gsap.to(featurePills, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "causality",
                    stagger: 0.1,
                    delay: 0.5,
                }),
                id: "engine-pills",
            });
            triggers.push(pillsTrigger);

            // Continuous orbit animations
            if (outerOrbitRef.current) {
                gsap.to(outerOrbitRef.current, {
                    strokeDashoffset: -100,
                    duration: 2,
                    ease: "none",
                    repeat: -1,
                });
            }

            // Comet 1 - main white comet
            if (innerOrbitRef.current) {
                gsap.fromTo(innerOrbitRef.current,
                    { strokeDashoffset: 0 },
                    {
                        strokeDashoffset: -1500,
                        duration: 8,
                        ease: "none",
                        repeat: -1,
                    }
                );
            }

            // Comet 2 - orange trailing comet (offset start)
            if (comet2Ref.current) {
                gsap.fromTo(comet2Ref.current,
                    { strokeDashoffset: -750 },
                    {
                        strokeDashoffset: -2250,
                        duration: 8,
                        ease: "none",
                        repeat: -1,
                    }
                );
            }

            // Subtle perspective animation on orbits container
            if (orbitsContainerRef.current) {
                gsap.to(orbitsContainerRef.current, {
                    rotateX: 8,
                    rotateY: -5,
                    duration: 6,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            }
        }

        return () => {
            triggers.forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="hidden md:block px-4 md:px-12 bg-background border-t border-foreground/30">
            <div className="max-w-7xl mx-auto border-l border-r border-foreground/30">
                <div className="px-4 md:px-8 py-12 md:py-20 space-y-8 md:space-y-12">
                    {/* Header */}
                    <div className="space-y-6 md:space-y-12">
                        <p className="text-foreground/70 uppercase font-sans font-medium text-[10px] tracking-wider">
                            Meet the engine
                        </p>
                        <h2 ref={headingRef} className="font-serif font-medium text-3xl md:text-7xl text-foreground tracking-tighter leading-[1.2] max-w-[780px]">
                            <span className="block overflow-hidden">
                                <span className="headline-line block">Where Causality Engine</span>
                            </span>
                            <span className="block overflow-hidden">
                                <span className="headline-line block">delivers impact</span>
                            </span>
                        </h2>
                    </div>

                    {/* Visual Area */}
                    <div ref={visualRef} className="relative h-[280px] md:h-[480px]">
                        {/* Orbits */}
                        <div
                            ref={orbitsContainerRef}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                        >
                            {/* Outer orbit - dashed */}
                            <svg
                                className="orbit absolute w-full h-full"
                                viewBox="0 0 1000 500"
                                fill="none"
                                preserveAspectRatio="xMidYMid meet"
                                style={{ transform: "rotate(-8deg)" }}
                            >
                                <ellipse
                                    ref={outerOrbitRef}
                                    cx="500"
                                    cy="280"
                                    rx="480"
                                    ry="180"
                                    stroke="white"
                                    strokeOpacity="0.2"
                                    strokeWidth="1"
                                    strokeDasharray="8 8"
                                    fill="none"
                                />
                            </svg>
                            {/* Inner orbit - base solid line */}
                            <svg
                                className="orbit absolute w-full h-full"
                                viewBox="0 0 1000 500"
                                fill="none"
                                preserveAspectRatio="xMidYMid meet"
                                style={{ transform: "rotate(-8deg)" }}
                            >
                                <ellipse
                                    cx="500"
                                    cy="280"
                                    rx="360"
                                    ry="120"
                                    stroke="white"
                                    strokeOpacity="0.15"
                                    strokeWidth="1"
                                    fill="none"
                                />
                            </svg>
                            {/* Inner orbit - animated comet/glow effect */}
                            <svg
                                className="orbit absolute w-full h-full"
                                viewBox="0 0 1000 500"
                                fill="none"
                                preserveAspectRatio="xMidYMid meet"
                                style={{ transform: "rotate(-8deg)", filter: "blur(0.5px)" }}
                            >
                                <defs>
                                    <linearGradient id="comet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                                        <stop offset="70%" stopColor="white" stopOpacity="0.3" />
                                        <stop offset="90%" stopColor="white" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="white" stopOpacity="1" />
                                    </linearGradient>
                                </defs>
                                <ellipse
                                    ref={innerOrbitRef}
                                    cx="500"
                                    cy="280"
                                    rx="360"
                                    ry="120"
                                    stroke="url(#comet-gradient)"
                                    strokeWidth="2"
                                    strokeDasharray="300 1200"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            </svg>
                            {/* Second comet for extra effect */}
                            <svg
                                className="orbit absolute w-full h-full"
                                viewBox="0 0 1000 500"
                                fill="none"
                                preserveAspectRatio="xMidYMid meet"
                                style={{ transform: "rotate(-8deg)", filter: "blur(1px)" }}
                            >
                                <defs>
                                    <linearGradient id="comet-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#F54E00" stopOpacity="0" />
                                        <stop offset="80%" stopColor="#F54E00" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                                    </linearGradient>
                                </defs>
                                <ellipse
                                    ref={comet2Ref}
                                    cx="500"
                                    cy="280"
                                    rx="360"
                                    ry="120"
                                    stroke="url(#comet-gradient-2)"
                                    strokeWidth="3"
                                    strokeDasharray="150 1350"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            </svg>
                        </div>

                        {/* Feature Pills */}
                        {features.map((feature) => (
                            <FeaturePill
                                key={feature.id}
                                feature={feature}
                                isActive={activeFeature === feature.id}
                                onHover={setActiveFeature}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
