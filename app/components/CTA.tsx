"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import SplitText from "./SplitText";
import Button from "./Button";

export default function CTA() {
    const gridRef = useRef<HTMLDivElement>(null);

    // Generate a random-looking but consistent pattern for the blocks
    const generateBlockPattern = () => {
        const rows = 3;
        const cols = 20;
        const blocks: { row: number; col: number; shouldAnimate: boolean }[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Bottom row always animates to black
                // Top rows have random pattern - some animate, some stay white
                let shouldAnimate = true;
                if (row < rows - 1) {
                    const seed = Math.sin(row * 5 + col * 11) * 10000;
                    shouldAnimate = (seed - Math.floor(seed)) > 0.3;
                }
                blocks.push({ row, col, shouldAnimate });
            }
        }

        return blocks;
    };

    const blocks = generateBlockPattern();

    useEffect(() => {
        if (!gridRef.current) return;

        const blockElements = gridRef.current.querySelectorAll(".pixel-block.animate");

        gsap.set(blockElements, {
            backgroundColor: "#ffffff",
        });

        const ctaTrigger = ScrollTrigger.create({
            trigger: gridRef.current,
            start: "top 100%",
            end: "top 20%",
            scrub: true,
            animation: gsap.to(blockElements, {
                backgroundColor: "#000000",
                stagger: {
                    each: 0.02,
                    from: "random",
                },
                ease: "none",
            }),
            id: "cta-blocks",
        });

        return () => {
            ctaTrigger.kill();
        };
    }, []);

    return (
        <div className="bg-foreground border-t border-background/30" data-header-theme="light">
            <div className="px-4 md:px-12">
                <div className="border-l border-r border-background/30 max-w-7xl mx-auto">
                    <div className="px-4 md:px-12 py-12 md:py-20">
                        <SplitText
                            as="h2"
                            className="text-background text-4xl md:text-7xl font-serif font-medium tracking-tighter leading-[1.1]"
                        >
                            {`Ad spend wasted.\nRevenue recovered.`}
                        </SplitText>
                        <div className="flex flex-col sm:flex-row gap-2 mt-6 md:mt-8">
                            <Button variant="primary" mode="light" href="https://app.causalityengine.ai/signup">
                                Try now
                            </Button>
                            <Button variant="secondary" mode="light" href="https://app.causalityengine.ai/signup">
                                Book a demo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={gridRef} className="relative">
                <div className="grid grid-cols-20 w-full">
                    {blocks.map((block, index) => (
                        <div
                            key={index}
                            className={`pixel-block aspect-square ${block.shouldAnimate ? 'animate bg-background' : 'bg-foreground'}`}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 pointer-events-none px-4 md:px-12">
                    <div className="max-w-7xl mx-auto h-full border-l border-r border-background/30"></div>
                </div>
            </div>
        </div>
    )
}