import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Define categories
const CATEGORIES = [
  { title: "Guide", slug: "guide", description: "How-to guides, tips, and strategies" },
  { title: "Research", slug: "research", description: "Industry analysis, insights, and case studies" },
  { title: "Explainer", slug: "explainer", description: "Concepts and terminology explained" },
];

// Rules to categorize articles based on title patterns
function categorizeArticle(title: string): string {
  const lowerTitle = title.toLowerCase();

  // Explainer articles
  if (
    lowerTitle.includes("attribution models explained") ||
    lowerTitle.includes("what is") ||
    lowerTitle.includes("understanding") ||
    lowerTitle.includes("definition") ||
    lowerTitle.includes("a comprehensive guide") ||
    lowerTitle.includes("the complete guide")
  ) {
    return "explainer";
  }

  // Guide articles
  if (
    lowerTitle.includes("how to") ||
    lowerTitle.includes("how do") ||
    lowerTitle.includes("tips for") ||
    lowerTitle.includes("marketing tips") ||
    lowerTitle.includes("strategies for") ||
    lowerTitle.includes("top 15") ||
    lowerTitle.includes("top 10") ||
    lowerTitle.startsWith("how ") ||
    lowerTitle.includes("solves") ||
    lowerTitle.includes("maximize") ||
    lowerTitle.includes("boost") ||
    lowerTitle.includes("effective")
  ) {
    return "guide";
  }

  // Research articles (default for insight/analysis pieces)
  if (
    lowerTitle.includes("hidden") ||
    lowerTitle.includes("unseen") ||
    lowerTitle.includes("invisible") ||
    lowerTitle.includes("challenge") ||
    lowerTitle.includes("crisis") ||
    lowerTitle.includes("story") ||
    lowerTitle.includes("journey") ||
    lowerTitle.includes("cost of") ||
    lowerTitle.includes("why") ||
    lowerTitle.includes("when") ||
    lowerTitle.includes("will") ||
    lowerTitle.includes("attribution in") ||
    lowerTitle.includes("the data gap") ||
    lowerTitle.includes("innovation")
  ) {
    return "research";
  }

  // Default to guide
  return "guide";
}

async function main() {
  console.log("Starting category assignment...\n");

  // Create categories
  const categoryMap = new Map<string, string>();

  for (const cat of CATEGORIES) {
    const existing = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]._id`,
      { slug: cat.slug }
    );

    if (existing) {
      console.log(`Category "${cat.title}" already exists`);
      categoryMap.set(cat.slug, existing);
    } else {
      const created = await client.create({
        _type: "category",
        title: cat.title,
        slug: { _type: "slug", current: cat.slug },
        description: cat.description,
      });
      console.log(`Created category: ${cat.title}`);
      categoryMap.set(cat.slug, created._id);
    }
  }

  console.log("\nCategories ready. Fetching posts...\n");

  // Fetch all posts
  const posts = await client.fetch(`*[_type == "post"]{_id, title}`);
  console.log(`Found ${posts.length} posts to categorize\n`);

  // Categorize and update
  const stats = { guide: 0, research: 0, explainer: 0 };

  for (const post of posts) {
    const categorySlug = categorizeArticle(post.title);
    const categoryId = categoryMap.get(categorySlug);

    if (categoryId) {
      await client
        .patch(post._id)
        .set({ category: { _type: "reference", _ref: categoryId } })
        .commit();

      stats[categorySlug as keyof typeof stats]++;
      console.log(`[${categorySlug.toUpperCase()}] ${post.title.substring(0, 60)}...`);
    }
  }

  console.log("\n--- Categorization Complete ---");
  console.log(`Guide: ${stats.guide}`);
  console.log(`Research: ${stats.research}`);
  console.log(`Explainer: ${stats.explainer}`);
  console.log(`Total: ${posts.length}`);
}

main().catch(console.error);
