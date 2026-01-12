"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import Image from "next/image";

interface CustomerStory {
    label: string;
    title: string;
    image: string;
    logo: string;
    href: string;
}

const stories: CustomerStory[] = [
    {
        label: "Customer story",
        title: "Reclaiming 34% of hidden revenue\nby fixing attribution blind spots\nat OFFFTRACK",
        image: "/images/offftrack-story-bg.png",
        logo: "/images/offftrack-logo.svg",
        href: "/customers/offftrack",
    },
    {
        label: "Customer story",
        title: "How Brand X increased ROAS\nby 2.5x with AI-powered\nbudget allocation",
        image: "/images/offftrack-story-bg.png",
        logo: "/images/offftrack-logo.svg",
        href: "/customers/brandx",
    },
    {
        label: "Customer story",
        title: "Reducing CAC by 40% through\nsmarter customer journey mapping",
        image: "/images/offftrack-story-bg.png",
        logo: "/images/offftrack-logo.svg",
        href: "/customers/company",
    },
];

const AUTO_SWITCH_DURATION = 5000;

export default function CustomerStories() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const progressRef = useRef<SVGCircleElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
        setProgress(0);
        startTimeRef.current = Date.now();
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
        setProgress(0);
        startTimeRef.current = Date.now();
    }, []);

    // Auto-switch timer with progress
    useEffect(() => {
        startTimeRef.current = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min(elapsed / AUTO_SWITCH_DURATION, 1);
            setProgress(newProgress);

            if (newProgress >= 1) {
                goToNext();
            } else {
                animationRef.current = requestAnimationFrame(updateProgress);
            }
        };

        animationRef.current = requestAnimationFrame(updateProgress);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [currentIndex, goToNext]);

    useEffect(() => {
        if (!contentRef.current) return;

        gsap.set(contentRef.current, {
            opacity: 0,
            y: 30,
        });

        const contentTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            animation: gsap.to(contentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "causality",
            }),
            id: "customer-stories-content",
        });

        return () => {
            contentTrigger.kill();
        };
    }, []);

    // Animate headline on slide change (like SplitText)
    useEffect(() => {
        if (!headlineRef.current) return;

        const lines = headlineRef.current.querySelectorAll(".headline-line");

        gsap.fromTo(
            lines,
            { y: "100%", opacity: 0, filter: "blur(10px)" },
            { y: "0%", opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "causality", stagger: 0.1 }
        );

        // Animate logo
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current.querySelectorAll(".animate-slide"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "causality", delay: 0.2 }
            );
        }
    }, [currentIndex]);

    const currentStory = stories[currentIndex];

    // SVG circle properties for progress indicator
    const circleRadius = 18;
    const circumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div ref={containerRef} className="relative border-t border-foreground/30 px-4 md:px-12 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto border-l border-r border-foreground/30 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src={currentStory.image}
                        alt={currentStory.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div ref={contentRef} className="p-4 md:p-8 min-h-screen md:min-h-[600px] flex flex-col justify-between relative z-10">
                    {/* Top Label */}
                    <p className="text-foreground/70 uppercase font-sans font-medium text-[10px] tracking-wider">
                        Customer story
                    </p>

                    <div className="flex-1 flex items-center py-6 md:py-0">
                        <h2 ref={headlineRef} className="font-serif font-medium text-2xl md:text-5xl text-foreground tracking-tighter leading-[1.2] max-w-[680px]" style={{ textWrap: "balance" }}>
                            {currentStory.title.split("\n").map((line, lineIndex) => (
                                <span key={`${currentIndex}-${lineIndex}`} className="block overflow-hidden">
                                    <span className="headline-line block">
                                        {line}
                                    </span>
                                </span>
                            ))}
                        </h2>
                    </div>

                    <div className="flex items-end justify-between">
                        <div className="flex gap-1">
                            <button
                                onClick={goToPrevious}
                                className="relative w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors cursor-pointer"
                                aria-label="Previous story"
                            >
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r={circleRadius}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeOpacity="0.3"
                                        strokeWidth="1"
                                    />
                                </svg>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button
                                onClick={goToNext}
                                className="relative w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors cursor-pointer"
                                aria-label="Next story"
                            >
                                {/* Background circle */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r={circleRadius}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeOpacity="0.3"
                                        strokeWidth="1"
                                    />
                                    {/* Progress circle */}
                                    <circle
                                        ref={progressRef}
                                        cx="20"
                                        cy="20"
                                        r={circleRadius}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        className="transition-none"
                                    />
                                </svg>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>

                        <div className="animate-slide w-24 md:w-32 h-10 md:h-14 flex items-center justify-end">
                            <Image
                                src={currentStory.logo}
                                alt="Customer logo"
                                width={130}
                                height={55}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
