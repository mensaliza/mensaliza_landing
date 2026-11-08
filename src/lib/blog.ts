import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import GithubSlugger from "github-slugger";
import type { MDXContent } from "mdx/types";

export const BLOG_PATH = "/blog";
export const BLOG_TITLE = "Blog do Mensaliza";
export const BLOG_DESCRIPTION =
  "Guias práticos sobre cobrança de mensalidades, mensagens no WhatsApp, Pix e organização financeira para profissionais autônomos e pequenos negócios.";

export const blogCategories = {
  cobranca: "Cobrança",
  whatsapp: "WhatsApp",
  pix: "Pix e pagamentos",
  gestao: "Gestão",
  profissoes: "Por profissão",
} as const;

export type BlogCategory = keyof typeof blogCategories;

export type BlogFaqItem = {
  question: string;
  answer: string;
};

/** Shape of the `export const meta = {...}` block at the top of every post. */
export type BlogPostMeta = {
  title: string;
  /** Shorter headline for the generated share image. Defaults to `title` without "(...)" or ": subtitle". */
  ogTitle?: string;
  /** Used as meta description and listing excerpt. Aim for 140–160 characters. */
  description: string;
  /** ISO date, e.g. "2026-11-08". */
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  tags?: string[];
  /** Rendered at the end of the post and emitted as FAQPage JSON-LD. */
  faq?: BlogFaqItem[];
  /** Drafts render in development only. */
  draft?: boolean;
};

export type BlogHeading = {
  id: string;
  text: string;
};

export type BlogPost = BlogPostMeta & {
  slug: string;
  path: string;
  readingTimeMinutes: number;
  /** `##` headings, with the same ids rehype-slug gives them. */
  headings: BlogHeading[];
};

type BlogModule = {
  default: MDXContent;
  meta: BlogPostMeta;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WORDS_PER_MINUTE = 200;

function assertValidMeta(slug: string, meta: unknown): asserts meta is BlogPostMeta {
  const m = meta as Partial<BlogPostMeta> | undefined;
  const problems: string[] = [];

  if (!m) problems.push("missing `export const meta`");
  else {
    if (!m.title) problems.push("title");
    if (!m.description) problems.push("description");
    if (!m.publishedAt || Number.isNaN(parseISO(m.publishedAt).getTime())) {
      problems.push("publishedAt (ISO date)");
    }
    if (!m.category || !(m.category in blogCategories)) problems.push("category");
  }

  if (problems.length > 0) {
    throw new Error(`Blog post "${slug}" has invalid meta: ${problems.join(", ")}`);
  }
}

async function loadModule(slug: string): Promise<BlogModule> {
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as BlogModule;
  assertValidMeta(slug, mod.meta);
  return mod;
}

function estimateReadingTime(source: string): number {
  const prose = source
    .replace(/^export const meta[\s\S]*?\n};?\n/m, "")
    .replace(/^import .*$/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|[\]()-]/g, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Mirrors rehype-slug: one slugger per document, applied to every heading in order. */
function extractHeadings(source: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  let inCodeFence = false;

  for (const line of source.split("\n")) {
    if (line.startsWith("```")) inCodeFence = !inCodeFence;
    if (inCodeFence) continue;

    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    const id = slugger.slug(text);
    if (match[1].length === 2) headings.push({ id, text });
  }

  return headings;
}

async function listSlugs(): Promise<string[]> {
  const entries = await fs.readdir(CONTENT_DIR);
  return entries
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .filter((slug) => SLUG_PATTERN.test(slug));
}

function isVisible(meta: BlogPostMeta): boolean {
  return !meta.draft || process.env.NODE_ENV === "development";
}

async function toPost(slug: string, meta: BlogPostMeta): Promise<BlogPost> {
  const source = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  return {
    ...meta,
    slug,
    path: `${BLOG_PATH}/${slug}`,
    readingTimeMinutes: estimateReadingTime(source),
    headings: extractHeadings(source),
  };
}

/** All visible posts, newest first. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = await listSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { meta } = await loadModule(slug);
      return isVisible(meta) ? toPost(slug, meta) : null;
    })
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(
  slug: string
): Promise<{ post: BlogPost; Content: MDXContent } | null> {
  if (!SLUG_PATTERN.test(slug)) return null;

  const slugs = await listSlugs();
  if (!slugs.includes(slug)) return null;

  const { default: Content, meta } = await loadModule(slug);
  if (!isVisible(meta)) return null;

  return { post: await toPost(slug, meta), Content };
}

/** Same-category posts first, then the most recent ones. */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const others = (await getAllPosts()).filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatPostDate(isoDate: string): string {
  return format(parseISO(isoDate), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}
