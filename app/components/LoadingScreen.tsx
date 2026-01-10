"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "@/app/lib/gsap";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial animation - logo and text fade in
    const tl = gsap.timeline();

    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(textRef.current, { opacity: 0, y: 15 });

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "causality",
      delay: 0.4,
    });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "causality",
    }, "-=0.5");

    // Wait for page to be fully loaded
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === "complete") {
      setTimeout(() => setIsLoaded(true), 1500);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      const tl = gsap.timeline();

      // Fade out logo and text
      tl.to([logoRef.current, textRef.current], {
        opacity: 0,
        scale: 0.95,
        filter: "blur(8px)",
        duration: 0.6,
        ease: "causality",
      });

      // Split panels apart
      tl.to(topPanelRef.current, {
        y: "-100%",
        duration: 1,
        ease: "causality",
      }, "-=0.2");

      tl.to(bottomPanelRef.current, {
        y: "100%",
        duration: 1,
        ease: "causality",
      }, "<");

      // Hide container after animation
      tl.set(containerRef.current, {
        display: "none",
      });
    }
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
    >
      {/* Top panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-neutral-900"
      />

      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-neutral-900"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <Image
          ref={logoRef}
          src="/images/ce-logo.svg"
          alt="Causality Engine"
          width={60}
          height={60}
          className="w-15 h-auto"
          priority
        />
        <div
          ref={textRef}
          className="flex flex-col items-center gap-1"
        >
          <p className="font-serif text-foreground text-lg tracking-tight">
            Causality Engine
          </p>
          <p className="font-sans text-foreground/50 text-xs tracking-tight">
            Connecting the dots
          </p>
        </div>
      </div>
    </div>
  );
}
