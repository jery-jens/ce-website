"use client";

import { useState } from "react";
import ResourcesHero from "./ResourcesHero";
import ResourcesGrid from "./ResourcesGrid";

interface Resource {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
}

interface ResourcesContentProps {
    initialResources: Resource[];
    categories: string[];
}

export default function ResourcesContent({ initialResources, categories }: ResourcesContentProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredResources = activeCategory === "All"
        ? initialResources
        : initialResources.filter(r => r.category === activeCategory);

    return (
        <div className="flex flex-col min-h-screen">
            <ResourcesHero
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />
            <ResourcesGrid resources={filteredResources} />
        </div>
    );
}
