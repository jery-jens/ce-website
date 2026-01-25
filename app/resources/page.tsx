import { Metadata } from "next";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import ResourcesContent from "../components/ResourcesContent";
import { client } from "@/sanity/lib/client";
import { postsQuery, categoriesQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
    title: "Resources — Causality Engine",
    description: "Insights, case studies, and practical guides on attribution, incrementality, and marketing decisions powered by causal analysis.",
};

interface SanityPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    publishedAt: string;
}

interface SanityCategory {
    _id: string;
    title: string;
    slug: string;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default async function ResourcesPage() {
    const [posts, categories]: [SanityPost[], SanityCategory[]] = await Promise.all([
        client.fetch(postsQuery),
        client.fetch(categoriesQuery),
    ]);

    const resources = posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category || "Uncategorized",
        date: formatDate(post.publishedAt),
    }));

    const categoryNames = ["All", ...categories.map((c) => c.title)];

    return (
        <>
            <ResourcesContent
                initialResources={resources}
                categories={categoryNames}
            />
            <CTA />
            <Footer />
        </>
    );
}
