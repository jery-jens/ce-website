import Link from "next/link";
import AnimatedLink from "./AnimatedLink";

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
];

// Get the last 3 resources
const latestResources = resources.slice(0, 3);

export default function Insights() {
    return (
        <div className="px-4 md:px-12 bg-foreground" data-header-theme="light">
            <div className="max-w-7xl mx-auto border-l border-r border-background/30">
                <div className="flex items-end justify-between px-4 md:px-8 pt-12 md:pt-20 pb-8 md:pb-12 border-b border-background/30">
                    <h2 className="font-serif text-background font-medium text-2xl md:text-[32px] tracking-tighter leading-[1.2]">
                        Latest resources
                    </h2>
                    <AnimatedLink href="/resources" className="font-sans font-medium text-sm text-background/70 relative group" showUnderline>
                        View all
                    </AnimatedLink>
                </div>

                {latestResources.map((resource, index) => (
                    <Link
                        key={resource.slug}
                        href={`/resources/${resource.slug}`}
                        className={`insight-post flex flex-col md:flex-row gap-4 md:gap-32 items-start p-4 md:p-8 ${index < latestResources.length - 1 ? 'border-b border-background/30' : ''} hover:bg-background/[0.02] transition-colors`}
                    >
                        <div className="flex flex-row md:flex-col gap-2 shrink-0 md:w-[120px]">
                            <p className="font-sans font-medium text-sm text-background">
                                {resource.category}
                            </p>
                            <span className="md:hidden text-background/40">·</span>
                            <p className="font-sans font-medium text-sm text-background/60">
                                {resource.date}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-4 max-w-[480px]">
                            <h3 className="font-sans font-medium text-base md:text-xl text-background">
                                {resource.title}
                            </h3>
                            <p className="font-sans text-sm text-background/60 leading-[1.5]">
                                {resource.excerpt}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
