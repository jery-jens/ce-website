"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/app/lib/gsap";
import Link from "next/link";

interface Resource {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
}

interface ResourcesGridProps {
    resources: Resource[];
}

export default function ResourcesGrid({ resources }: ResourcesGridProps) {
    const postsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!postsRef.current) return;

        const posts = postsRef.current.querySelectorAll(".resource-post");
        gsap.set(posts, { opacity: 0, y: 20 });

        gsap.to(posts, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "causality",
            stagger: 0.08,
            delay: 0.5,
        });
    }, [resources]);

    return (
        <div className="bg-background flex-1 flex flex-col">
            <div className="px-4 md:px-12 flex-1 flex flex-col">
                <div className="max-w-7xl mx-auto border-l border-r border-foreground/30 flex-1 w-full">
                    {/* Resources List */}
                    <div ref={postsRef} className="flex flex-col">
                        {resources.map((resource, index) => (
                            <Link
                                key={resource.slug}
                                href={`/resources/${resource.slug}`}
                                className={`resource-post flex flex-col md:flex-row gap-4 md:gap-32 items-start p-4 md:p-8 ${
                                    index < resources.length - 1 ? "border-b border-foreground/30" : ""
                                } hover:bg-foreground/2 transition-colors`}
                            >
                                <div className="flex flex-row md:flex-col gap-2 shrink-0 md:w-[120px]">
                                    <p className="font-sans font-medium text-sm text-foreground">
                                        {resource.category}
                                    </p>
                                    <span className="md:hidden text-foreground/40">·</span>
                                    <p className="font-sans font-medium text-sm text-foreground/60">
                                        {resource.date}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 md:gap-4 max-w-[480px]">
                                    <h3 className="font-sans font-medium text-base md:text-xl text-foreground">
                                        {resource.title}
                                    </h3>
                                    <p className="font-sans text-sm text-foreground/60 leading-normal">
                                        {resource.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty state */}
                    {resources.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="font-sans text-foreground/70">
                                No resources in this category yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
