"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";

export default function Platform() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const text = "AI that spots hidden revenue, trims wasted spend, and accelerates customer journeys.";

    useEffect(() => {
        if (!headingRef.current) return;

        const chars = headingRef.current.querySelectorAll(".char");

        gsap.set(chars, { opacity: 0.3 });

        gsap.to(chars, {
            opacity: 1,
            stagger: 0.02,
            ease: "none",
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            },
        });

        // Perspective scroll effect on dashboard image
        if (imageRef.current) {
            gsap.set(imageRef.current, {
                rotateX: 15,
                scale: 0.95,
                filter: "blur(8px)",
            });

            gsap.to(imageRef.current, {
                rotateX: 0,
                scale: 1,
                filter: "blur(0px)",
                ease: "none",
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: true,
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="px-12 relative z-10">
            <div className="max-w-7xl w-full mx-auto px-12 border-foreground/30 border-l border-r py-32">
                <div className="flex mx-auto">
                    <p className="text-foreground/70 uppercase font-sans font-medium text-[10px] tracking-wider text-center mx-auto">Connects seamlessly with</p>
                </div>

                <h2 ref={headingRef} className="font-serif font-medium text-4xl leading-[90%] max-w-lg mt-6 text-center mx-auto">
                    {text.split("").map((char, index) => (
                        <span key={index} className="char">
                            {char}
                        </span>
                    ))}
                </h2>

                <div ref={imageContainerRef} className="mt-12 perspective-[1500px]">
                    <Image ref={imageRef} src="/images/dashboard.png" className="max-w-5xl w-full h-auto mx-auto backdrop-blur-3xl" width={2560} height={2560} alt="Dashboard" />
                </div>
            </div>
        </div>
    )
}