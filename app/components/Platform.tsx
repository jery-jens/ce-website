"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";

export default function Platform() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const dashboardContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const text = "AI that spots hidden revenue, trims wasted spend, and accelerates customer journeys.";

    useEffect(() => {
        if (!headingRef.current) return;

        const triggers: ScrollTrigger[] = [];
        const chars = headingRef.current.querySelectorAll(".char");

        gsap.set(chars, { opacity: 0.3 });

        const charsTrigger = ScrollTrigger.create({
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            animation: gsap.to(chars, {
                opacity: 1,
                stagger: 0.02,
                ease: "none",
            }),
            id: "platform-chars",
        });
        triggers.push(charsTrigger);

        // Perspective scroll effect on dashboard
        if (imageRef.current) {
            gsap.set(imageRef.current, {
                rotateX: 15,
                scale: 0.95,
                filter: "blur(8px)",
            });

            const dashboardTrigger = ScrollTrigger.create({
                trigger: dashboardContainerRef.current,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
                animation: gsap.to(imageRef.current, {
                    rotateX: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    ease: "none",
                }),
                id: "platform-dashboard",
            });
            triggers.push(dashboardTrigger);
        }

        return () => {
            triggers.forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="px-4 md:px-12 relative z-10">
            <div className="max-w-7xl w-full mx-auto px-4 md:px-12 border-foreground/30 border-l border-r py-16 md:py-32">
                <div className="flex mx-auto">
                    <p className="text-foreground/70 uppercase font-sans font-medium text-[10px] tracking-wider text-center mx-auto">Connects seamlessly with</p>
                </div>

                <h2 ref={headingRef} className="font-serif font-medium text-2xl md:text-4xl leading-[1.2] max-w-lg mt-4 md:mt-6 text-center mx-auto px-4 md:px-0">
                    {text.split("").map((char, index) => (
                        <span key={index} className="char">
                            {char}
                        </span>
                    ))}
                </h2>

                <div ref={dashboardContainerRef} className="mt-8 md:mt-12 perspective-[1500px]">
                    <Image ref={imageRef} src="/images/ce-dashboard.svg" className="max-w-5xl w-full h-auto mx-auto backdrop-blur-3xl" width={2560} height={2560} alt="Dashboard" />
                </div>
            </div>
        </div>
    )
}
