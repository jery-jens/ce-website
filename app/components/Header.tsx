"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import Button from "./Button";

interface MenuLinkProps {
  href: string;
  children: string;
  onClick?: () => void;
  className?: string;
}

function MenuLink({ href, children, onClick, className = "" }: MenuLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cloneRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleMouseEnter = () => {
    gsap.to(textRef.current, {
      y: "-100%",
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.3,
      ease: "causality",
    });
    gsap.to(cloneRef.current, {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.3,
      ease: "causality",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(textRef.current, {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.3,
      ease: "causality",
    });
    gsap.to(cloneRef.current, {
      y: "100%",
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.3,
      ease: "causality",
    });
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();

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

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`menu-link relative block ${className}`}
    >
      <span className="relative block overflow-hidden">
        <span ref={textRef} className="block">
          {children}
        </span>
        <span
          ref={cloneRef}
          className="absolute top-0 left-0 translate-y-full opacity-0 blur-xs"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const menuTextRef = useRef<HTMLSpanElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLAnchorElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if we're on studio pages
  const isStudio = pathname?.startsWith("/studio");

  // Initial header animation (only once on mount)
  useEffect(() => {
    gsap.set(headerRef.current, {
      y: -20,
      opacity: 0,
      filter: "blur(10px)",
    });

    gsap.to(headerRef.current, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      delay: 1.2,
      ease: "causality",
    });
  }, []);

  // Setup ScrollTriggers - re-run when pathname changes
  useEffect(() => {
    // Reset light state when navigating
    setIsLight(false);
    setIsScrolled(false);

    // Kill only header-related triggers before creating new ones
    ScrollTrigger.getAll().forEach((trigger) => {
      const id = trigger.vars.id as string | undefined;
      if (id?.startsWith("header-")) {
        trigger.kill();
      }
    });

    // Store created triggers for cleanup
    const headerTriggers: ScrollTrigger[] = [];

    // Detect light sections and update header theme after a delay to ensure DOM is ready
    const setupLightSectionTriggers = () => {
      const lightSections = document.querySelectorAll('[data-header-theme="light"]');

      lightSections.forEach((section, index) => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 60px",
          end: "bottom 60px",
          onEnter: () => setIsLight(true),
          onLeave: () => setIsLight(false),
          onEnterBack: () => setIsLight(true),
          onLeaveBack: () => setIsLight(false),
          id: `header-light-section-${index}`,
        });
        headerTriggers.push(trigger);
      });

      // Scroll detection for compact header using ScrollTrigger (synced with Lenis)
      const scrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top -50px",
        end: "max",
        onUpdate: (self) => {
          setIsScrolled(self.progress > 0);
        },
        id: "header-scroll-state",
      });
      headerTriggers.push(scrollTrigger);

      ScrollTrigger.refresh();
    };

    // Wait for the page transition and DOM to be ready
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(setupLightSectionTriggers);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      headerTriggers.forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  useEffect(() => {
    // Kill any existing animations
    gsap.killTweensOf([menuPanelRef.current, line1Ref.current, line2Ref.current]);

    const menuLinks = menuLinksRef.current?.querySelectorAll(".menu-link");
    const socialIcons = socialIconsRef.current?.querySelectorAll("a");

    if (menuLinks) gsap.killTweensOf(menuLinks);
    if (socialIcons) gsap.killTweensOf(socialIcons);
    if (videoRef.current) gsap.killTweensOf(videoRef.current);
    if (backdropRef.current) gsap.killTweensOf(backdropRef.current);

    if (isOpen) {
      // Backdrop blur animation
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "causality" }
      );

      // Opening animation
      gsap.to(line1Ref.current, {
        rotation: 45,
        y: 3.25,
        duration: 0.3,
        ease: "causality",
        transformOrigin: "center center",
      });
      gsap.to(line2Ref.current, {
        rotation: -45,
        y: -3.25,
        duration: 0.3,
        ease: "causality",
        transformOrigin: "center center",
      });

      // Menu panel slides down and fades in
      gsap.fromTo(menuPanelRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "causality" }
      );

      // Animate menu links with stagger
      if (menuLinks) {
        gsap.fromTo(menuLinks,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "causality",
            stagger: 0.06,
            delay: 0.15
          }
        );
      }

      // Animate social icons with stagger
      if (socialIcons) {
        gsap.fromTo(socialIcons,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "causality",
            stagger: 0.05,
            delay: 0.35
          }
        );
      }

      // Animate video section - scale image from 110% to 100%
      if (videoRef.current) {
        const videoImage = videoRef.current.querySelector("img");
        if (videoImage) {
          gsap.fromTo(videoImage,
            { scale: 1.1 },
            { scale: 1, duration: 0.6, ease: "causality", delay: 0.15 }
          );
        }
        gsap.fromTo(videoRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "causality", delay: 0.15 }
        );
      }
    } else {
      // Backdrop fade out
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });

      // Closing animation
      gsap.to(line1Ref.current, {
        rotation: 0,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
        transformOrigin: "center center",
      });
      gsap.to(line2Ref.current, {
        rotation: 0,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
        transformOrigin: "center center",
      });

      // Menu panel fades out and slides up
      gsap.to(menuPanelRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  // Hide header on studio pages
  if (isStudio) {
    return null;
  }

  return (
    <>
      {/* Backdrop blur */}
      <div
        ref={backdropRef}
        className={`fixed inset-0 bg-background/50 backdrop-blur-md z-90 opacity-0 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <header
        ref={headerRef}
        className="fixed w-full top-4 left-0 right-0 z-100 flex flex-col items-center pointer-events-none"
      >
        {/* Nav bar */}
      <div
        ref={containerRef}
        className={`w-full h-[44px] transition-all duration-300 pointer-events-auto mx-4 md:mx-0 ${
          isLight && !isOpen ? 'bg-neutral-200' : 'bg-neutral-900'
        } ${isScrolled && !isOpen ? 'md:max-w-sm max-w-2xs' : 'md:max-w-xl max-w-xs'} rounded-full`}
      >
        <nav
          ref={navRef}
          className="relative flex items-center w-full justify-between p-1 h-[44px]"
        >
          <button
            onClick={handleMenuClick}
            className={`flex items-center gap-2 px-3 md:px-4 h-[34px] rounded-full font-sans font-medium text-sm tracking-tight cursor-pointer transition-all duration-300 ${
              isLight && !isOpen ? 'text-background' : 'text-foreground'
            }`}
          >
            <div className="relative w-[14px] h-[8px] flex flex-col justify-between">
              <span
                ref={line1Ref}
                className={`w-full h-[1.5px] rounded-full transition-colors duration-300 ${
                  isLight && !isOpen ? 'bg-background' : 'bg-foreground'
                }`}
              />
              <span
                ref={line2Ref}
                className={`w-full h-[1.5px] rounded-full transition-colors duration-300 ${
                  isLight && !isOpen ? 'bg-background' : 'bg-foreground'
                }`}
              />
            </div>
            <span ref={menuTextRef} className="hidden md:inline">Menu</span>
          </button>

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={(e) => {
              e.preventDefault();

              // If already on home page, don't animate - just scroll to top
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
              }

              const container = document.querySelector(".page-transition");
              if (!container) {
                router.push("/");
                return;
              }
              gsap.to(container, {
                opacity: 0,
                filter: "blur(12px)",
                scale: 0.98,
                duration: 0.4,
                ease: "causality",
                onComplete: () => {
                  router.push("/");
                },
              });
            }}
          >
            <Image
              ref={logoRef}
              src="/images/star.svg"
              alt="Causality Engine"
              width={18}
              height={18}
              className={`transition-all duration-300 ${isLight && !isOpen ? 'invert' : ''}`}
            />
          </Link>

          <div className="flex items-center gap-1">
            <div className={`hidden md:block transition-all duration-300 overflow-hidden ${isScrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              <Button variant="secondary" mode={isLight && !isOpen ? "light" : "dark"} href="https://app.causalityengine.ai/signin">
                Sign in
              </Button>
            </div>
            <Button variant="primary" mode={isLight && !isOpen ? "light" : "dark"} href="https://app.causalityengine.ai/signup">
              Try now
            </Button>
          </div>
        </nav>
      </div>

      {/* Detached Menu Panel */}
      <div
        ref={menuPanelRef}
        className={`w-full mx-4 md:mx-0 md:max-w-xl max-w-xs mt-2 bg-neutral-900 rounded-lg overflow-hidden opacity-0 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Navigation */}
          <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <p className="menu-link text-foreground/40 text-[10px] font-sans font-medium tracking-wider uppercase mb-3 md:mb-4">
                Explore
              </p>
              <nav ref={menuLinksRef} className="flex flex-col">
                <MenuLink
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground font-sans font-medium text-base md:text-lg py-2.5 md:py-3 border-b border-foreground/10"
                >
                  Pricing
                </MenuLink>
                <MenuLink
                  href="/resources"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground font-sans font-medium text-base md:text-lg py-2.5 md:py-3"
                >
                  Resources
                </MenuLink>
              </nav>
            </div>

            {/* Social Icons */}
            <div ref={socialIconsRef} className="flex gap-1 mt-4 md:mt-6">
              <a
                href="https://www.linkedin.com/company/causalityengine/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.94 5C6.94 5.53 6.72 6.04 6.33 6.41C5.94 6.79 5.42 7 4.88 7C4.34 7 3.82 6.79 3.43 6.41C3.04 6.04 2.82 5.53 2.82 5C2.82 4.47 3.04 3.96 3.43 3.59C3.82 3.21 4.34 3 4.88 3C5.42 3 5.94 3.21 6.33 3.59C6.72 3.96 6.94 4.47 6.94 5ZM7 8.48H3V21H7V8.48ZM13.32 8.48H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.9 14.94 7.13 13.28 10.16L13.32 8.48Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Video section - hidden on mobile */}
          <a
            ref={videoRef}
            href="https://www.youtube.com/watch?v=1v2oCw8NzyM"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block w-[280px]"
          >
            <div className="relative h-full min-h-[280px] overflow-hidden bg-neutral-700">
              <Image
                src="/images/joris-demo.jpeg"
                alt="Demo video"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent from-30% to-black/90" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-foreground group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80 group-hover:opacity-100 transition-opacity">
                  <path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"/>
                </svg>
                <span className="text-xs font-sans font-medium tracking-tight">Play demo</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </header>
    </>
  );
}
