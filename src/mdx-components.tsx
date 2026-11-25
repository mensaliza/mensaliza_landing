import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import { BlogCta } from "@/components/blog/blog-cta";
import { Callout } from "@/components/blog/callout";
import { DownloadButton } from "@/components/blog/download-button";
import { MessageTemplate } from "@/components/blog/message-template";
import { cn } from "cn";

/**
 * Global MDX element styles (required by @next/mdx in the App Router).
 * Custom components listed here can be used in any post without importing.
 */
const components = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-12 scroll-mt-28 font-heading text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-balance text-foreground",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-mt-28 font-heading text-lg leading-[1.3] font-semibold tracking-[-0.01em] text-balance text-foreground",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("mt-5 leading-[1.75] text-pretty", className)} {...props} />
  ),
  a: ({ href = "", className, ...props }) => {
    const linkClassName = cn(
      "font-medium text-primary underline underline-offset-4 decoration-primary/40 transition-colors hover:text-foreground hover:decoration-foreground/40",
      className
    );

    if (href.startsWith("/") || href.startsWith("#")) {
      return <Link href={href} className={linkClassName} {...props} />;
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName} {...props} />
    );
  },
  ul: ({ className, ...props }) => (
    <ul className={cn("mt-5 flex list-disc flex-col gap-2 pl-5 marker:text-primary", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("mt-5 flex list-decimal flex-col gap-2 pl-5 marker:font-medium marker:text-primary", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("pl-1 leading-[1.7] text-pretty", className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("mt-6 border-l-2 border-primary pl-5 text-foreground/80 [&>p:first-child]:mt-0", className)}
      {...props}
    />
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
  code: ({ className, ...props }) => (
    <code
      className={cn("rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border">
      <table className={cn("w-full min-w-[32rem] border-collapse text-left text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn("border-b border-border bg-muted/60 px-4 py-3 font-semibold text-foreground", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("border-b border-border px-4 py-3 align-top leading-relaxed [tr:last-child_&]:border-b-0", className)} {...props} />
  ),
  BlogCta,
  Callout,
  DownloadButton,
  MessageTemplate,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
