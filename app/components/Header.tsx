"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
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

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onClick}
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
  const videoRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

    // Detect light sections and update header theme after a short delay to ensure DOM is ready
    const setupLightSectionTriggers = () => {
      const lightSections = document.querySelectorAll('[data-header-theme="light"]');

      lightSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 60px",
          end: "bottom 60px",
          onEnter: () => setIsLight(true),
          onLeave: () => setIsLight(false),
          onEnterBack: () => setIsLight(true),
          onLeaveBack: () => setIsLight(false),
        });
      });

      ScrollTrigger.refresh();
    };

    // Wait for next frame to ensure all components are mounted
    requestAnimationFrame(() => {
      requestAnimationFrame(setupLightSectionTriggers);
    });

    // Scroll detection for compact header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        className={`w-full transition-[max-width] duration-300 pointer-events-auto ${
          isLight && !isOpen ? 'bg-neutral-200' : 'bg-neutral-900'
        } ${isScrolled && !isOpen ? 'max-w-sm' : 'max-w-xl'} rounded-full`}
        style={{ height: isScrolled ? 38 : 44 }}
      >
        <nav
          ref={navRef}
          className={`flex items-center w-full justify-between p-1 ${
            isScrolled ? 'h-[38px]' : 'h-[44px]'
          }`}
        >
          <button
            onClick={handleMenuClick}
            className={`flex items-center gap-2 px-4 rounded-full font-sans font-medium text-sm tracking-tight cursor-pointer transition-all duration-300 ${
              isLight && !isOpen ? 'text-background' : 'text-foreground'
            } ${isScrolled ? 'h-[30px]' : 'h-[34px]'}`}
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
            <span ref={menuTextRef}>Menu</span>
          </button>

          <Link href="/" className="absolute left-1/2 top-[22px] -translate-x-1/2 -translate-y-1/2">
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
            <div className={`transition-all duration-300 overflow-hidden ${isScrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              <Button variant="secondary" mode={isLight && !isOpen ? "light" : "dark"} href="/signin">
                Sign in
              </Button>
            </div>
            <Button variant="primary" mode={isLight && !isOpen ? "light" : "dark"} href="/signup" small={isScrolled}>
              Start for free
            </Button>
          </div>
        </nav>
      </div>

      {/* Detached Menu Panel */}
      <div
        ref={menuPanelRef}
        className={`w-full max-w-xl mt-2 bg-neutral-900 rounded-lg overflow-hidden opacity-0 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="flex">
          {/* Left Column - Navigation */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <p className="menu-link text-foreground/40 text-[10px] font-sans font-medium tracking-wider uppercase mb-4">
                Explore
              </p>
              <nav ref={menuLinksRef} className="flex flex-col">
                <MenuLink
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground font-sans font-medium text-lg py-3 border-b border-foreground/10"
                >
                  Pricing
                </MenuLink>
                <MenuLink
                  href="/resources"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground font-sans font-medium text-lg py-3 border-b border-foreground/10"
                >
                  Resources
                </MenuLink>
                <MenuLink
                  href="/company"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground font-sans font-medium text-lg py-3"
                >
                  Company
                </MenuLink>
              </nav>
            </div>

            {/* Social Icons */}
            <div ref={socialIconsRef} className="flex gap-2 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 7.5C14.485 7.5 16.5 9.515 16.5 12C16.5 14.485 14.485 16.5 12 16.5C9.515 16.5 7.5 14.485 7.5 12C7.5 9.515 9.515 7.5 12 7.5ZM12 9C10.343 9 9 10.343 9 12C9 13.657 10.343 15 12 15C13.657 15 15 13.657 15 12C15 10.343 13.657 9 12 9ZM17.25 7.5C17.25 7.914 16.914 8.25 16.5 8.25C16.086 8.25 15.75 7.914 15.75 7.5C15.75 7.086 16.086 6.75 16.5 6.75C16.914 6.75 17.25 7.086 17.25 7.5Z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.94 5C6.94 5.53 6.72 6.04 6.33 6.41C5.94 6.79 5.42 7 4.88 7C4.34 7 3.82 6.79 3.43 6.41C3.04 6.04 2.82 5.53 2.82 5C2.82 4.47 3.04 3.96 3.43 3.59C3.82 3.21 4.34 3 4.88 3C5.42 3 5.94 3.21 6.33 3.59C6.72 3.96 6.94 4.47 6.94 5ZM7 8.48H3V21H7V8.48ZM13.32 8.48H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.9 14.94 7.13 13.28 10.16L13.32 8.48Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div ref={videoRef} className="w-[280px]">
            <div className="relative h-full min-h-[280px] overflow-hidden bg-neutral-700">
              <Image
                src="/images/joris-demo.jpeg"
                alt="Demo video"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent from-30% to-black/90" />
              <button className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-foreground cursor-pointer group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80 group-hover:opacity-100 transition-opacity">
                  <path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"/>
                </svg>
                <span className="text-xs font-sans font-medium tracking-tight">Play demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
