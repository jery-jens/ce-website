"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/app/lib/gsap";

export default function PageTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!containerRef.current) return;

        // Skip animation on first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            gsap.set(containerRef.current, {
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
            });
            return;
        }

        // Scroll to top smoothly
        window.scrollTo(0, 0);

        // Small delay to ensure the exit animation has completed
        // and the DOM has updated with new content
        const timer = setTimeout(() => {
            // Animate in the new page
            gsap.fromTo(
                containerRef.current,
                {
                    opacity: 0,
                    filter: "blur(8px)",
                    scale: 0.98,
                },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    duration: 0.5,
                    ease: "causality",
                }
            );
        }, 50);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div ref={containerRef} className="page-transition will-change-[transform,opacity,filter]">
            {children}
        </div>
    );
}
