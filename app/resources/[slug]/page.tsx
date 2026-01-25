import { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import CTA from "../../components/CTA";
import ResourceDetail from "../../components/ResourceDetail";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { PortableTextBlock } from "@portabletext/types";

interface SanityPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    body: PortableTextBlock[];
    coverImage?: {
        asset: {
            _ref: string;
        };
    };
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export async function generateStaticParams() {
    const posts = await client.fetch(postSlugsQuery);
    return posts.map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

    if (!post) {
        return {
            title: "Resource Not Found — Causality Engine",
        };
    }

    return {
        title: `${post.title} — Causality Engine`,
        description: post.excerpt,
    };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

    if (!post) {
        notFound();
    }

    const resource = {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category || "Uncategorized",
        date: formatDate(post.publishedAt),
        body: post.body,
    };

    return (
        <>
            <ResourceDetail resource={resource} />
            <CTA />
            <Footer />
        </>
    );
}
