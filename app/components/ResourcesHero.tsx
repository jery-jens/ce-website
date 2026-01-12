"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "@/app/lib/gsap";

interface ResourcesHeroProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function ResourcesHero({ categories, activeCategory, onCategoryChange }: ResourcesHeroProps) {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const filtersRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (titleRef.current) {
            gsap.set(titleRef.current, { opacity: 0, y: 20, filter: "blur(10px)" });
        }
        if (filtersRef.current) {
            gsap.set(filtersRef.current.children, { opacity: 0, y: 10 });
        }
    }, []);

    useEffect(() => {
        if (titleRef.current) {
            gsap.to(titleRef.current, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "causality",
                delay: 0.2,
            });
        }
        if (filtersRef.current) {
            gsap.to(filtersRef.current.children, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "causality",
                stagger: 0.05,
                delay: 0.4,
            });
        }
    }, []);

    return (
        <div className="bg-background">
            <div className="px-4 md:px-12">
                <div className="max-w-7xl mx-auto border-l border-r border-foreground/30">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 px-4 md:px-8 pt-32 pb-8 md:pb-12 border-b border-foreground/30">
                        <h1
                            ref={titleRef}
                            className="font-serif font-medium text-4xl md:text-[56px] tracking-tighter leading-[1.1]"
                        >
                            Resources
                        </h1>
                        <div
                            ref={filtersRef}
                            className="flex flex-wrap items-center gap-4 md:gap-8"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => onCategoryChange(category)}
                                    className={`font-sans font-medium text-sm md:text-base transition-colors cursor-pointer ${
                                        activeCategory === category
                                            ? "text-foreground"
                                            : "text-foreground/40 hover:text-foreground/70"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
