"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/app/lib/gsap";
import Button from "./Button";

export default function NotFoundContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !numberRef.current || !textRef.current) return;

        const tl = gsap.timeline({ delay: 0.3 });

        gsap.set(numberRef.current, {
            opacity: 0,
            y: 50,
            filter: "blur(20px)",
        });

        gsap.set(textRef.current.children, {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
        });

        tl.to(numberRef.current, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "causality",
        });

        tl.to(textRef.current.children, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "causality",
            stagger: 0.1,
        }, "-=0.4");

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-background">
            <div className="px-4 md:px-12">
                <div className="max-w-7xl mx-auto border-l border-r border-foreground/30">
                    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-12 py-20">
                        <h1
                            ref={numberRef}
                            className="font-serif font-medium text-[120px] md:text-[200px] text-foreground tracking-tighter leading-none"
                        >
                            404
                        </h1>

                        <div ref={textRef} className="flex flex-col items-center gap-6 mt-4">
                            <p className="font-serif font-medium text-2xl md:text-4xl text-foreground tracking-tight text-center">
                                Page not found
                            </p>
                            <p className="font-sans text-sm md:text-base text-foreground/70 text-center max-w-md">
                                The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
                            </p>
                            <div className="flex gap-2 mt-2">
                                <Button variant="primary" href="/">
                                    Go home
                                </Button>
                                <Button variant="secondary" href="/pricing">
                                    View pricing
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
