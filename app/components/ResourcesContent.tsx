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

const resources: Resource[] = [
    {
        slug: "bayesian-attribution-modeling-roas-tracking-inaccuracy-cosmetics-acab2",
        title: "How Bayesian Attribution Modeling Solves ROAS Tracking Inaccuracy for DTC Supplement Founders in Europe",
        excerpt: "Learn how Bayesian attribution modeling solves ROAS tracking inaccuracy for cosmetics brands. Improve Customer Retention Rate with proven strategies for Shopify.",
        category: "Research",
        date: "Jan 8, 2026",
    },
    {
        slug: "when-the-trail-goes-cold-the-attribution-challenge-in-nonprofit-work",
        title: "When the Trail Goes Cold: The Attribution Challenge in Nonprofit Work",
        excerpt: "Learn Google Ads ROI for Shopify beauty & fashion brands. Optimize your marketing ROI with Causality Engine.",
        category: "Research",
        date: "Dec 10, 2025",
    },
    {
        slug: "the-invisible-thread-why-environmental-services-need-better-knowledge-sharing",
        title: "The Invisible Thread: Why Environmental Services Need Better Knowledge Sharing",
        excerpt: "Learn Facebook Ads ROAS for Shopify beauty & fashion brands. Optimize your marketing ROI with Causality Engine.",
        category: "Research",
        date: "Dec 10, 2025",
    },
    {
        slug: "digital-attribution-in-aerospace-defense-an-analysis-of-current-challenges",
        title: "Digital Attribution in Aerospace: A Journey Through the Unknown",
        excerpt: "Learn email marketing ROI for Shopify beauty & fashion brands. Optimize your marketing ROI with Causality Engine.",
        category: "Research",
        date: "Dec 10, 2025",
    },
    {
        slug: "the-unseen-story-attribution-in-entertainment-media",
        title: "The Unseen Story: Attribution in Entertainment Media",
        excerpt: "Learn marketing attribution for Shopify beauty & fashion brands. Optimize your marketing ROI with Causality Engine.",
        category: "Research",
        date: "Dec 10, 2025",
    },
    {
        slug: "when-credit-gets-lost-the-hidden-story-behind-geriatric-care-innovation",
        title: "When Credit Gets Lost: The Hidden Story Behind Geriatric Care Innovation",
        excerpt: "Learn Shopify attribution for Shopify beauty & fashion brands. Optimize your marketing ROI with Causality Engine.",
        category: "Research",
        date: "Dec 10, 2025",
    },
    {
        slug: "the-unseen-journey-understanding-decision-making-in-industrial-automation",
        title: "The Unseen Journey: Understanding Decision-Making in Industrial Automation",
        excerpt: "Learn Shopify attribution for Shopify beauty & fashion brands. Optimize your marketing ROI with Causality Engine.",
        category: "Research",
        date: "Dec 10, 2025",
    },
    {
        slug: "first-party-data-tracking-ad-spend-waste-cosmetics-2f946",
        title: "How First-Party Data Tracking Solves Ad Spend Waste for Shopify Cosmetics Brands",
        excerpt: "Learn how First-party data tracking solves ad spend waste for cosmetics brands. Improve ROAS with proven strategies for Shopify.",
        category: "Guide",
        date: "Dec 10, 2025",
    },
    {
        slug: "first-party-data-tracking-attribution-discrepancy-athleisure-6baf4",
        title: "How First-Party Data Tracking Solves Attribution Discrepancy for Shopify Cosmetics Brands",
        excerpt: "Learn how First-party data tracking solves attribution discrepancy for athleisure brands. Improve Customer Retention Rate with proven strategies for TikTok Ads.",
        category: "Guide",
        date: "Dec 10, 2025",
    },
    {
        slug: "causal-inference-modeling-cookie-deprecation-impact-beauty-a656c",
        title: "How Causal Inference Modeling Solves Cookie Deprecation Impact for Beauty Brand Founders Optimizing Meta Ads Spend",
        excerpt: "Learn how Causal inference modeling solves cookie deprecation impact for beauty brands. Improve Marketing ROI with proven strategies for Meta Ads Manager.",
        category: "Guide",
        date: "Dec 10, 2025",
    },
];

// Get unique categories from resources
const categories = ["All", ...Array.from(new Set(resources.map(r => r.category)))];

export default function ResourcesContent() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredResources = activeCategory === "All"
        ? resources
        : resources.filter(r => r.category === activeCategory);

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
