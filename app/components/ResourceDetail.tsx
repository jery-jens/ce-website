"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/app/lib/gsap";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Resource {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    body: PortableTextBlock[];
}

interface ResourceDetailProps {
    resource: Resource;
}

const portableTextComponents: PortableTextComponents = {
    unknownMark: ({ children, markType, value }) => {
        // Handle link marks that were created with random keys during migration
        if (value?.href) {
            return (
                <a
                    href={value.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline"
                >
                    {children}
                </a>
            );
        }
        // Return children as-is for truly unknown marks
        return <>{children}</>;
    },
    block: {
        h2: ({ children }) => (
            <h2 className="font-serif font-medium text-xl md:text-2xl text-foreground tracking-tight mt-8 first:mt-0">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="font-sans font-medium text-lg text-foreground mt-6">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="font-sans font-medium text-base text-foreground mt-4">
                {children}
            </h4>
        ),
        normal: ({ children }) => (
            <p className="font-sans text-base text-foreground/80 leading-relaxed">
                {children}
            </p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-foreground/30 pl-4 italic text-foreground/70">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 font-sans text-base text-foreground/80 leading-relaxed">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 font-sans text-base text-foreground/80 leading-relaxed">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-medium">{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        code: ({ children }) => (
            <code className="bg-foreground/10 px-1 py-0.5 rounded text-sm font-mono">
                {children}
            </code>
        ),
        link: ({ children, value }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
            >
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset) return null;
            return (
                <div className="relative w-full h-[300px] md:h-[400px] my-6 rounded-lg overflow-hidden">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || ""}
                        fill
                        className="object-cover"
                    />
                </div>
            );
        },
    },
};

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
                            {resource.body && (
                                <PortableText
                                    value={resource.body}
                                    components={portableTextComponents}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
