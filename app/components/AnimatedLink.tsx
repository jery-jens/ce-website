"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "@/app/lib/gsap";

interface AnimatedLinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
    showUnderline?: boolean;
}

export default function AnimatedLink({
    children,
    href,
    className = "",
    showUnderline = false,
}: AnimatedLinkProps) {
    const labelRef = useRef<HTMLSpanElement>(null);
    const labelCloneRef = useRef<HTMLSpanElement>(null);
    const underlineRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        if (labelRef.current && labelCloneRef.current) {
            gsap.to(labelRef.current, {
                y: "-100%",
                opacity: 0,
                filter: "blur(4px)",
                duration: 0.3,
                ease: "causality",
            });
            gsap.to(labelCloneRef.current, {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.3,
                ease: "causality",
            });
        }
        if (showUnderline && underlineRef.current) {
            gsap.to(underlineRef.current, {
                scaleX: 1,
                transformOrigin: "left center",
                duration: 0.3,
                ease: "causality",
            });
        }
    };

    const handleMouseLeave = () => {
        if (labelRef.current && labelCloneRef.current) {
            gsap.to(labelRef.current, {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.3,
                ease: "causality",
            });
            gsap.to(labelCloneRef.current, {
                y: "100%",
                opacity: 0,
                filter: "blur(4px)",
                duration: 0.3,
                ease: "causality",
            });
        }
        if (showUnderline && underlineRef.current) {
            gsap.to(underlineRef.current, {
                scaleX: 0,
                transformOrigin: "right center",
                duration: 0.3,
                ease: "causality",
            });
        }
    };

    return (
        <Link
            href={href}
            className={`relative overflow-hidden block ${showUnderline ? 'pb-2' : ''} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span ref={labelRef} className="block">
                {children}
            </span>
            <span
                ref={labelCloneRef}
                className="absolute inset-0 translate-y-full opacity-0 blur-xs"
                aria-hidden="true"
            >
                {children}
            </span>
            {showUnderline && (
                <span
                    ref={underlineRef}
                    className="absolute left-0 right-0 bottom-0 h-px bg-current scale-x-0"
                    aria-hidden="true"
                />
            )}
        </Link>
    );
}
