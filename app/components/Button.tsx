"use client";

import Link from "next/link";
import { useRef, MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "@/app/lib/gsap";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  mode?: "dark" | "light";
  href?: string;
  onClick?: () => void;
  className?: string;
  small?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  mode = "dark",
  href,
  onClick,
  className = "",
  small = false,
}: ButtonProps) {
  const bgRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const labelCloneRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 0.95,
        duration: 0.3,
        ease: "causality",
      });
    }
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
  };

  const handleMouseLeave = () => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "causality",
      });
    }
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
  };

  const baseStyles = `relative font-sans font-medium text-sm tracking-tight flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 ${
    small ? "h-[30px] px-3" : "h-[34px] px-4"
  }`;

  const bgVariants = {
    dark: {
      primary: "bg-foreground",
      secondary: "bg-foreground/[0.08]",
    },
    light: {
      primary: "bg-background",
      secondary: "bg-background/[0.08]",
    },
  };

  const textVariants = {
    dark: {
      primary: "text-background",
      secondary: "text-foreground",
    },
    light: {
      primary: "text-foreground",
      secondary: "text-background",
    },
  };

  const content = (
    <>
      <span
        ref={bgRef}
        className={`absolute inset-0 rounded-full ${bgVariants[mode][variant]}`}
      />
      <span className={`relative z-10 ${textVariants[mode][variant]} overflow-hidden`}>
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
      </span>
    </>
  );

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!href) return;
    e.preventDefault();

    // If already on the same page, don't animate - just scroll to top
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const container = document.querySelector(".page-transition");
    if (!container) {
      router.push(href);
      return;
    }

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

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${className}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  );
}
