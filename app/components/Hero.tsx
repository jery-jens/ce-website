"use client";

import Link from "next/link";
import { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "@/app/lib/gsap";
import Button from "./Button";
import SplitText from "./SplitText";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerContentRef = useRef<HTMLDivElement>(null);
  const rectTopLeftRef = useRef<HTMLDivElement>(null);
  const rectBottomLeftRef = useRef<HTMLDivElement>(null);
  const rectTopRightRef = useRef<HTMLDivElement>(null);
  const rectBottomRightRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  // Set initial states synchronously before paint
  useLayoutEffect(() => {
    gsap.set(heroImageRef.current, {
      scale: 1.2,
      opacity: 0,
      filter: "blur(20px)",
    });

    gsap.set([leftLineRef.current, rightLineRef.current], {
      scaleY: 0,
      transformOrigin: "top center",
    });

    gsap.set(
      [
        rectTopLeftRef.current,
        rectBottomLeftRef.current,
        rectTopRightRef.current,
        rectBottomRightRef.current,
      ],
      {
        scale: 0,
        opacity: 0,
      }
    );

    gsap.set(bannerRef.current, {
      scaleX: 0,
      opacity: 1,
    });

    gsap.set(bannerContentRef.current, {
      opacity: 0,
      y: "100%",
      filter: "blur(10px)",
    });
  }, []);

  // Run animations after paint
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Hero image fades in and scales down
    tl.to(heroImageRef.current, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "causality",
    });

    // 2. Vertical lines grow from top (overlaps with image)
    tl.to(
      [leftLineRef.current, rightLineRef.current],
      {
        scaleY: 1,
        duration: 0.8,
        ease: "causality",
      },
      "-=0.8"
    );

    // 3. Top corner rectangles appear (where lines meet the banner)
    tl.to(
      [rectTopLeftRef.current, rectTopRightRef.current],
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "causality",
      },
      "-=0.3"
    );

    // 4. Banner expands horizontally from the rectangles
    tl.to(
      bannerRef.current,
      {
        scaleX: 1,
        duration: 0.5,
        ease: "causality",
      },
      "-=0.1"
    );

    // 5. Bottom corner rectangles appear
    tl.to(
      [rectBottomLeftRef.current, rectBottomRightRef.current],
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "causality",
      },
      "-=0.3"
    );

    // 6. Banner content fades in from bottom
    tl.to(
      bannerContentRef.current,
      {
        opacity: 1,
        y: "0%",
        filter: "blur(0px)",
        duration: 0.5,
        ease: "causality",
      },
      "-=0.2"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="h-screen 2xl:h-[70vh] w-screen sticky top-0 px-4 md:px-12 overflow-hidden z-10">
      <div className="w-full max-w-7xl mx-auto h-full absolute inset-0 left-1/2 -translate-x-1/2 overflow-hidden px-4 md:px-12">
        <Image ref={heroImageRef} src="/images/hero-background.png" alt="Hero" className="w-full h-full top-64 absolute inset-0 z-0 object-cover" width={1280} height={1280} />
      </div>
      <div className="rounded-full absolute w-[150%] h-[80%] blur-3xl left-[-25%] top-[-25%] z-10 bg-background"></div>

      <div
        ref={containerRef}
        className="w-full max-w-7xl mx-auto h-full relative pt-20 md:pt-20 z-10"
      >

        <div
          ref={leftLineRef}
          className="absolute left-0 top-0 bottom-0 w-px bg-foreground/30"
        />
        <div
          ref={rightLineRef}
          className="absolute right-0 top-0 bottom-0 w-px bg-foreground/30"
        />

        <div className="relative z-10">
          <div
            ref={rectTopLeftRef}
            className="w-2 h-2 absolute -left-1 -top-1 bg-foreground hidden md:block"
          />
          <div
            ref={rectBottomLeftRef}
            className="w-2 h-2 absolute -left-1 -bottom-1 bg-foreground hidden md:block"
          />
          <div
            ref={rectTopRightRef}
            className="w-2 h-2 absolute -right-1 -top-1 bg-foreground hidden md:block"
          />
          <div
            ref={rectBottomRightRef}
            className="w-2 h-2 absolute -right-1 -bottom-1 bg-foreground hidden md:block"
          />

          <div
            ref={bannerRef}
            className="border-t border-b border-foreground/30 w-full h-8 text-xs md:text-sm font-medium flex items-center justify-center gap-1 md:gap-2 font-sans opacity-0 overflow-hidden px-2"
          >
            <div
              ref={bannerContentRef}
              className="flex items-center justify-center gap-1 md:gap-2"
            >
              <span className="text-center">We recently launched our V1</span>
              <Link href="https://app.causalityengine.ai/signup" className="text-foreground/70 underline whitespace-nowrap">
                Try it out
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto mt-6 md:mt-10 px-4 md:px-0">
          <SplitText
            as="h1"
            className="text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[1.1] font-serif font-medium text-center"
          >
            {`Ad spend wasted.\nRevenue recovered.`}
          </SplitText>
          <p className="text-foreground/70 text-center mt-4 md:mt-6 max-w-[480px] mx-auto font-sans text-sm md:text-base">
            Your spend keeps growing, but attribution stays blurry. Causality
            connects the dots, trims waste, and accelerates journey.
          </p>

          <Button variant="primary" href="https://app.causalityengine.ai/signup" className="mx-auto w-fit mt-6 md:mt-8">
            Start for free
          </Button>
        </div>
      </div>
    </div>
  );
}
