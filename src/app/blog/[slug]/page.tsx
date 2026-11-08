import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogBreadcrumb } from "@/components/blog/blog-breadcrumb";
import { BlogCta } from "@/components/blog/blog-cta";
import { PostCard } from "@/components/blog/post-card";
import { PostFaq } from "@/components/blog/post-faq";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import {
  BLOG_PATH,
  blogCategories,
  formatPostDate,
  getAllPosts,
  getPost,
  getRelatedPosts,
} from "@/lib/blog";
import {
  buildArticleMetadata,
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const result = await getPost(slug);
  if (!result) return {};

  const { post } = result;
  return buildArticleMetadata({
    title: post.title,
    description: post.description,
    path: post.path,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tags: post.tags,
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const result = await getPost(slug);
  if (!result) notFound();

  const { post, Content } = result;
  const related = await getRelatedPosts(post);
  const toc = post.faq?.length
    ? [...post.headings, { id: "perguntas-frequentes", text: "Perguntas frequentes" }]
    : post.headings;
  const updated = post.updatedAt && post.updatedAt !== post.publishedAt ? post.updatedAt : null;

  const jsonLd = [
    buildBlogPostingJsonLd(post),
    buildBreadcrumbJsonLd([
      { name: "Início", path: "/" },
      { name: "Blog", path: BLOG_PATH },
      { name: post.title, path: post.path },
    ]),
    ...(post.faq?.length ? [buildFaqPageJsonLd(post.faq)] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main id="conteudo-principal" className="flex-1">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <BlogBreadcrumb
            items={[{ name: "Início", path: "/" }, { name: "Blog", path: BLOG_PATH }, { name: post.title }]}
          />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
            <article className="min-w-0 max-w-[70ch]">
              <header className="flex flex-col gap-4 border-b border-border pb-8">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground/72">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {blogCategories[post.category]}
                  </span>
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                  {updated ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>
                        Atualizado em <time dateTime={updated}>{formatPostDate(updated)}</time>
                      </span>
                    </>
                  ) : null}
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTimeMinutes} min de leitura</span>
                </p>
                <h1 className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance">
                  {post.title}
                </h1>
                <p className="text-lg leading-relaxed text-pretty text-muted-foreground">{post.description}</p>
              </header>

              {toc.length > 1 ? (
                <nav
                  aria-labelledby="indice-mobile"
                  className="mt-8 rounded-xl border border-border bg-muted/60 p-5 lg:hidden"
                >
                  <p id="indice-mobile" className="font-heading text-sm font-semibold text-foreground">
                    Neste artigo
                  </p>
                  <TocList headings={toc} />
                </nav>
              ) : null}

              <div className="text-base text-foreground/80 sm:text-[1.0625rem]">
                <Content />
              </div>

              {post.faq?.length ? <PostFaq items={post.faq} /> : null}

              <BlogCta />
            </article>

            {toc.length > 1 ? (
              <aside className="hidden lg:block">
                <nav aria-labelledby="indice" className="sticky top-28 flex flex-col gap-1">
                  <p id="indice" className="font-heading text-sm font-semibold text-foreground">
                    Neste artigo
                  </p>
                  <TocList headings={toc} />
                </nav>
              </aside>
            ) : null}
          </div>

          {related.length > 0 ? (
            <section aria-labelledby="leia-tambem" className="flex flex-col gap-5 border-t border-border pt-12">
              <h2
                id="leia-tambem"
                className="font-heading text-xl font-semibold tracking-[-0.01em] text-foreground"
              >
                Leia também
              </h2>
              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <PostCard post={item} headingLevel="h3" />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function TocList({ headings }: { headings: { id: string; text: string }[] }) {
  return (
    <ol className="mt-2 flex flex-col">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className="flex min-h-9 items-center rounded-sm py-1 text-sm leading-snug text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
