import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@sanity/client";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

// Sanity client with write access
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

interface CSVRow {
  Name: string;
  Slug: string;
  "Collection ID": string;
  "Locale ID": string;
  "Item ID": string;
  Archived: string;
  Draft: string;
  "Created On": string;
  "Updated On": string;
  "Published On": string;
  "Post Body": string;
  "Post Summary": string;
  "Explainer video": string;
  "Main Image": string;
  "Thumbnail image": string;
  "Featured?": string;
  Category: string;
  Author: string;
}

function generateKey(): string {
  return Math.random().toString(36).substring(2, 10);
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\*\*/g, "") // Remove markdown bold
    .replace(/\*/g, "") // Remove markdown italic
    .trim();
}

// Improved HTML + Markdown to Portable Text converter
function htmlToPortableText(html: string): any[] {
  if (!html) return [];

  const blocks: any[] = [];

  // Remove script tags
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove style tags
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // Convert markdown headings to HTML before processing
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Convert markdown bold
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Convert markdown italic
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Convert markdown links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert markdown lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>");

  // Wrap consecutive <li> items in <ul>
  html = html.replace(/(<li>.*?<\/li>(\s*<li>.*?<\/li>)*)/gs, "<ul>$1</ul>");

  // Split content by block-level elements
  const blockRegex = /<(h1|h2|h3|h4|p|ul|ol|li|blockquote|figure|div)[^>]*>([\s\S]*?)<\/\1>/gi;

  let lastIndex = 0;
  let match;

  while ((match = blockRegex.exec(html)) !== null) {
    // Handle text before this match
    const textBefore = html.substring(lastIndex, match.index).trim();
    if (textBefore) {
      const textBlock = createTextBlock(textBefore);
      if (textBlock) blocks.push(textBlock);
    }

    const tagName = match[1].toLowerCase();
    const content = match[2];

    switch (tagName) {
      case "h1":
      case "h2":
        blocks.push(createBlock(content, "h2"));
        break;
      case "h3":
        blocks.push(createBlock(content, "h3"));
        break;
      case "h4":
        blocks.push(createBlock(content, "h4"));
        break;
      case "p":
        const pBlock = createBlock(content, "normal");
        if (pBlock.children.length > 0) blocks.push(pBlock);
        break;
      case "ul":
      case "ol":
        const listType = tagName === "ul" ? "bullet" : "number";
        const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
        items.forEach((item) => {
          const itemContent = item.replace(/<\/?li[^>]*>/gi, "");
          blocks.push(createListItem(itemContent, listType));
        });
        break;
      case "blockquote":
        blocks.push(createBlock(content, "blockquote"));
        break;
      default:
        const defaultBlock = createBlock(content, "normal");
        if (defaultBlock.children.length > 0) blocks.push(defaultBlock);
    }

    lastIndex = match.index + match[0].length;
  }

  // Handle remaining text
  const remaining = html.substring(lastIndex).trim();
  if (remaining) {
    const textBlock = createTextBlock(remaining);
    if (textBlock) blocks.push(textBlock);
  }

  // Filter out empty blocks
  return blocks.filter(
    (block) => block.children && block.children.length > 0 &&
    block.children.some((child: any) => child.text && child.text.trim())
  );
}

function createBlock(content: string, style: string): any {
  const children = parseInlineContent(content);
  return {
    _type: "block",
    _key: generateKey(),
    style,
    children: children.length > 0 ? children : [{ _type: "span", _key: generateKey(), text: "", marks: [] }],
  };
}

function createListItem(content: string, listType: string): any {
  const children = parseInlineContent(content);
  return {
    _type: "block",
    _key: generateKey(),
    style: "normal",
    listItem: listType,
    level: 1,
    children: children.length > 0 ? children : [{ _type: "span", _key: generateKey(), text: "", marks: [] }],
  };
}

function createTextBlock(text: string): any | null {
  const cleanText = stripHtml(text).trim();
  if (!cleanText) return null;

  // Split by double newlines to create paragraphs
  const paragraphs = cleanText.split(/\n\n+/);

  if (paragraphs.length === 1) {
    return {
      _type: "block",
      _key: generateKey(),
      style: "normal",
      children: [{ _type: "span", _key: generateKey(), text: cleanText, marks: [] }],
    };
  }

  // Return first paragraph, others will be handled differently
  return {
    _type: "block",
    _key: generateKey(),
    style: "normal",
    children: [{ _type: "span", _key: generateKey(), text: paragraphs[0], marks: [] }],
  };
}

function parseInlineContent(html: string): any[] {
  const spans: any[] = [];

  // Clean HTML entities
  let text = html
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Remove images and figures
  text = text.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, "");
  text = text.replace(/<img[^>]*>/gi, "");

  // Handle links
  const linkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Text before link
    const before = stripHtml(text.substring(lastIndex, match.index));
    if (before) {
      spans.push({
        _type: "span",
        _key: generateKey(),
        text: before,
        marks: [],
      });
    }

    // Link text
    const linkText = stripHtml(match[2]);
    if (linkText) {
      const markKey = generateKey();
      spans.push({
        _type: "span",
        _key: generateKey(),
        text: linkText,
        marks: [markKey],
        markDefs: [{ _type: "link", _key: markKey, href: match[1] }],
      });
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  const after = stripHtml(text.substring(lastIndex));
  if (after) {
    spans.push({
      _type: "span",
      _key: generateKey(),
      text: after,
      marks: [],
    });
  }

  // If no links were found, just return the stripped text
  if (spans.length === 0) {
    const cleanText = stripHtml(text);
    if (cleanText) {
      spans.push({
        _type: "span",
        _key: generateKey(),
        text: cleanText,
        marks: [],
      });
    }
  }

  return spans;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function deleteAllPosts() {
  console.log("Deleting existing posts...");
  const posts = await client.fetch(`*[_type == "post"]._id`);

  if (posts.length > 0) {
    const transaction = client.transaction();
    posts.forEach((id: string) => transaction.delete(id));
    await transaction.commit();
    console.log(`Deleted ${posts.length} posts`);
  }
}

async function main() {
  console.log("Starting migration...");

  // Delete existing posts first
  await deleteAllPosts();

  // Read CSV file
  const csvPath = path.join(process.cwd(), "CausalityEngine_Articles_last100.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");

  // Parse CSV
  const records: CSVRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
  });

  console.log(`Found ${records.length} articles`);

  // Extract unique categories
  const categories = new Set<string>();
  for (const record of records) {
    if (record.Category && record.Category.trim()) {
      categories.add(record.Category.trim());
    }
  }

  console.log(`Found ${categories.size} unique categories:`, Array.from(categories));

  // Create categories in Sanity
  const categoryMap = new Map<string, string>();

  for (const categoryName of categories) {
    const slug = slugify(categoryName);

    const existing = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]._id`,
      { slug }
    );

    if (existing) {
      console.log(`Category "${categoryName}" already exists`);
      categoryMap.set(categoryName, existing);
    } else {
      const created = await client.create({
        _type: "category",
        title: categoryName,
        slug: { _type: "slug", current: slug },
      });
      console.log(`Created category: ${categoryName}`);
      categoryMap.set(categoryName, created._id);
    }
  }

  // Create posts
  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const record of records) {
    try {
      const slug = record.Slug?.trim();
      if (!slug) {
        console.log(`Skipping article without slug: ${record.Name}`);
        skipped++;
        continue;
      }

      // Convert HTML body to Portable Text
      const body = htmlToPortableText(record["Post Body"] || "");

      // Get category reference
      const categoryName = record.Category?.trim();
      const categoryId = categoryName ? categoryMap.get(categoryName) : null;

      // Parse date
      const publishedAt = record["Published On"]
        ? new Date(record["Published On"]).toISOString()
        : new Date().toISOString();

      // Clean excerpt
      const excerpt = stripHtml(record["Post Summary"] || "").substring(0, 500);

      // Create post
      const post = {
        _type: "post",
        title: record.Name?.trim() || "Untitled",
        slug: { _type: "slug", current: slug },
        excerpt,
        publishedAt,
        body,
        ...(categoryId && {
          category: { _type: "reference", _ref: categoryId },
        }),
      };

      await client.create(post);
      created++;
      console.log(`Created post: ${record.Name}`);
    } catch (error) {
      console.error(`Error creating post "${record.Name}":`, error);
      errors++;
    }
  }

  console.log("\n--- Migration Complete ---");
  console.log(`Created: ${created}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);
}

main().catch(console.error);
