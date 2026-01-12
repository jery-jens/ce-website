"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/app/lib/gsap";
import Link from "next/link";

interface Resource {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    content: string;
}

interface ResourceDetailProps {
    resource: Resource;
}

export default function ResourceDetail({ resource }: ResourceDetailProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll(".animate-in");
        gsap.set(elements, { opacity: 0, y: 20 });

        gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "causality",
            stagger: 0.1,
            delay: 0.3,
        });
    }, []);

    // Simple markdown-like content rendering
    const renderContent = (content: string) => {
        const lines = content.trim().split("\n");
        const elements: React.ReactNode[] = [];
        let currentParagraph: string[] = [];
        let listItems: string[] = [];
        let inList = false;

        const flushParagraph = () => {
            if (currentParagraph.length > 0) {
                const text = currentParagraph.join(" ").trim();
                if (text) {
                    elements.push(
                        <p key={elements.length} className="font-sans text-base text-foreground/80 leading-relaxed">
                            {text}
                        </p>
                    );
                }
                currentParagraph = [];
            }
        };

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={elements.length} className="list-disc list-inside space-y-2 font-sans text-base text-foreground/80 leading-relaxed">
                        {listItems.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                );
                listItems = [];
                inList = false;
            }
        };

        lines.forEach((line) => {
            const trimmedLine = line.trim();

            // Heading 2
            if (trimmedLine.startsWith("## ")) {
                flushParagraph();
                flushList();
                elements.push(
                    <h2 key={elements.length} className="font-serif font-medium text-xl md:text-2xl text-foreground tracking-tight mt-8 first:mt-0">
                        {trimmedLine.slice(3)}
                    </h2>
                );
                return;
            }

            // Heading 3
            if (trimmedLine.startsWith("### ")) {
                flushParagraph();
                flushList();
                elements.push(
                    <h3 key={elements.length} className="font-sans font-medium text-lg text-foreground mt-6">
                        {trimmedLine.slice(4)}
                    </h3>
                );
                return;
            }

            // List item
            if (trimmedLine.startsWith("- ")) {
                flushParagraph();
                inList = true;
                // Handle bold text in list items
                const itemText = trimmedLine.slice(2).replace(/\*\*(.*?)\*\*/g, "$1");
                listItems.push(itemText);
                return;
            }

            // Numbered list
            if (/^\d+\.\s/.test(trimmedLine)) {
                flushParagraph();
                if (!inList) {
                    flushList();
                }
                inList = true;
                const itemText = trimmedLine.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "$1");
                listItems.push(itemText);
                return;
            }

            // Empty line
            if (trimmedLine === "") {
                flushParagraph();
                if (inList) {
                    flushList();
                }
                return;
            }

            // Regular text
            if (inList) {
                flushList();
            }
            currentParagraph.push(trimmedLine.replace(/\*\*(.*?)\*\*/g, "$1"));
        });

        flushParagraph();
        flushList();

        return elements;
    };

    return (
        <div className="bg-background min-h-screen">
            <div className="px-4 md:px-12">
                <div ref={containerRef} className="max-w-7xl mx-auto border-l border-r border-foreground/30">
                    {/* Header */}
                    <div className="px-4 md:px-8 pt-32 pb-8 md:pb-12 border-b border-foreground/30">
                        <div className="max-w-2xl mx-auto">
                            <Link
                                href="/resources"
                                className="animate-in inline-flex items-center gap-2 font-sans text-sm text-foreground/60 hover:text-foreground transition-colors mb-8"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Back to Resources
                            </Link>

                            <div className="animate-in flex flex-row gap-2 mb-4">
                                <p className="font-sans font-medium text-sm text-foreground">
                                    {resource.category}
                                </p>
                                <span className="text-foreground/40">·</span>
                                <p className="font-sans font-medium text-sm text-foreground/60">
                                    {resource.date}
                                </p>
                            </div>

                            <h1 className="animate-in font-serif font-medium text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tighter leading-tight">
                                {resource.title}
                            </h1>

                            <p className="animate-in font-sans text-lg text-foreground/60 mt-6 leading-relaxed">
                                {resource.excerpt}
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 md:px-8 py-12 md:py-16">
                        <div className="animate-in max-w-2xl mx-auto flex flex-col gap-4">
                            {renderContent(resource.content)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
