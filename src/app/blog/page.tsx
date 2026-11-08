import { BlogBreadcrumb } from "@/components/blog/blog-breadcrumb";
import { PostCard } from "@/components/blog/post-card";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE, getAllPosts } from "@/lib/blog";
import {
  buildBlogJsonLd,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  withGeneratedImages,
} from "@/lib/seo";

export const metadata = {
  ...withGeneratedImages(
    buildPageMetadata({
      title: "Blog",
      openGraphTitle: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      path: BLOG_PATH,
    })
  ),
  alternates: {
    canonical: BLOG_PATH,
    types: { "application/rss+xml": `${BLOG_PATH}/rss.xml` },
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Blog", path: BLOG_PATH },
          ]),
          buildBlogJsonLd({
            name: BLOG_TITLE,
            description: BLOG_DESCRIPTION,
            path: BLOG_PATH,
            posts,
          }),
        ]}
      />
      <SiteHeader />
      <main id="conteudo-principal" className="flex-1">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <BlogBreadcrumb items={[{ name: "Início", path: "/" }, { name: "Blog" }]} />

          <header className="flex max-w-3xl flex-col gap-3">
            <h1 className="text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance">
              Cobrança sem constrangimento, mês após mês
            </h1>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              {BLOG_DESCRIPTION}
            </p>
          </header>

          {posts.length > 0 ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Nenhum artigo publicado ainda.</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
