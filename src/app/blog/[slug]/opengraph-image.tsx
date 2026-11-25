import { blogCategories, getAllPosts, getPost } from "@/lib/blog";
import { OG_SIZE, renderBlogOgImage, toOgTitle } from "@/lib/blog-og";

export const alt = "Artigo do blog do Mensaliza";
export const size = OG_SIZE;
export const contentType = "image/png";

// Pre-render one image per post at build time.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getPost(slug);

  return renderBlogOgImage({
    title: result ? (result.post.ogTitle ?? toOgTitle(result.post.title)) : "Blog do Mensaliza",
    label: result ? blogCategories[result.post.category] : "Blog",
    footer: "mensaliza.com/blog",
  });
}
