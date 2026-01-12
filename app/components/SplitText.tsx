"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "@/app/lib/gsap";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  delay?: number;
  stagger?: number;
  duration?: number;
}

export default function SplitText({
  children,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.1,
  duration = 0.6,
}: SplitTextProps) {
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const lines = linesRef.current.filter(Boolean);

    gsap.set(lines, {
      y: "100%",
      opacity: 0,
      filter: "blur(10px)",
    });

    gsap.to(lines, {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      duration,
      ease: "causality",
      stagger,
      delay,
    });
  }, [delay, stagger, duration]);

  const lines = children.split("\n");

  return (
    <Tag className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden pb-1">
          <span
            ref={(el) => {
              linesRef.current[lineIndex] = el;
            }}
            className="block"
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
