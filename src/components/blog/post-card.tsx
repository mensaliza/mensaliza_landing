import Link from "next/link";

import { blogCategories, formatPostDate, type BlogPost } from "@/lib/blog";

type PostCardProps = {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
};

export function PostCard({ post, headingLevel: Heading = "h2" }: PostCardProps) {
  return (
    <article className="group relative flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/35 sm:p-8">
      <p className="flex flex-wrap items-center gap-x-2 text-xs font-medium text-foreground/72">
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
          {blogCategories[post.category]}
        </span>
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTimeMinutes} min de leitura</span>
      </p>
      <Heading className="font-heading text-lg leading-[1.3] font-semibold tracking-[-0.01em] text-balance text-foreground sm:text-xl">
        <Link
          href={post.path}
          className="rounded-sm after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-3 focus-visible:after:ring-ring/50 group-hover:text-primary"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="leading-relaxed text-pretty text-foreground/72">{post.description}</p>
    </article>
  );
}
