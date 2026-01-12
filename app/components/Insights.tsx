import Link from "next/link";
import AnimatedLink from "./AnimatedLink";

interface InsightPost {
    category: string;
    date: string;
    title: string;
    description: string;
    href: string;
}

const posts: InsightPost[] = [
    {
        category: "Research",
        date: "Dec 18, 2025",
        title: "Evaluating chain-of-thought monitorability",
        description: "We introduce evaluations for chain-of-thought monitorability and study how it scales with test-time compute, reinforcement learning, and pretraining.",
        href: "/blog/1",
    },
    {
        category: "Research",
        date: "Dec 18, 2025",
        title: "Evaluating chain-of-thought monitorability",
        description: "We introduce evaluations for chain-of-thought monitorability and study how it scales with test-time compute, reinforcement learning, and pretraining.",
        href: "/blog/2",
    },
    {
        category: "Research",
        date: "Dec 18, 2025",
        title: "Evaluating chain-of-thought monitorability",
        description: "We introduce evaluations for chain-of-thought monitorability and study how it scales with test-time compute, reinforcement learning, and pretraining.",
        href: "/blog/3",
    },
    {
        category: "Research",
        date: "Dec 18, 2025",
        title: "Evaluating chain-of-thought monitorability",
        description: "We introduce evaluations for chain-of-thought monitorability and study how it scales with test-time compute, reinforcement learning, and pretraining.",
        href: "/blog/4",
    },
    {
        category: "Research",
        date: "Dec 18, 2025",
        title: "Evaluating chain-of-thought monitorability",
        description: "We introduce evaluations for chain-of-thought monitorability and study how it scales with test-time compute, reinforcement learning, and pretraining.",
        href: "/blog/5",
    },
];

export default function Insights() {
    return (
        <div className="px-4 md:px-12 bg-foreground" data-header-theme="light">
            <div className="max-w-7xl mx-auto border-l border-r border-background/30">
                <div className="flex items-end justify-between px-4 md:px-8 pt-12 md:pt-20 pb-8 md:pb-12 border-b border-background/30">
                    <h2 className="font-serif text-background font-medium text-2xl md:text-[32px] tracking-tighter leading-[1.2]">
                        Latest news
                    </h2>
                    <AnimatedLink href="/blog" className="font-sans font-medium text-sm text-background/70 relative group" showUnderline>
                        View all
                    </AnimatedLink>
                </div>

                {posts.map((post, index) => (
                    <Link
                        key={index}
                        href={post.href}
                        className={`insight-post flex flex-col md:flex-row gap-4 md:gap-32 items-start p-4 md:p-8 ${index < posts.length - 1 ? 'border-b border-background/30' : ''} hover:bg-background/[0.02] transition-colors`}
                    >
                        <div className="flex flex-row md:flex-col gap-2 shrink-0 md:w-[120px]">
                            <p className="font-sans font-medium text-sm text-background">
                                {post.category}
                            </p>
                            <span className="md:hidden text-background/40">·</span>
                            <p className="font-sans font-medium text-sm text-background/60">
                                {post.date}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-4 max-w-[480px]">
                            <h3 className="font-sans font-medium text-base md:text-xl text-background">
                                {post.title}
                            </h3>
                            <p className="font-sans text-sm text-background/60 leading-[1.5]">
                                {post.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
