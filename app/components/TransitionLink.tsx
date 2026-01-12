"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "@/app/lib/gsap";
import { ReactNode, MouseEvent } from "react";

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function TransitionLink({
    href,
    children,
    className = "",
    onClick,
}: TransitionLinkProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        // Call any additional onClick handler
        if (onClick) onClick();

        // If already on the same page, don't animate - just scroll to top
        if (pathname === href) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        // Get the page transition container
        const container = document.querySelector(".page-transition");
        if (!container) {
            router.push(href);
            return;
        }

        // Animate out
        gsap.to(container, {
            opacity: 0,
            filter: "blur(12px)",
            scale: 0.98,
            duration: 0.4,
            ease: "causality",
            onComplete: () => {
                router.push(href);
            },
        });
    };

    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
}
