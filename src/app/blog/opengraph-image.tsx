import { BLOG_TITLE } from "@/lib/blog";
import { OG_SIZE, renderBlogOgImage } from "@/lib/blog-og";

export const alt = BLOG_TITLE;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderBlogOgImage({
    title: "Cobrança sem constrangimento, mês após mês",
    label: "Blog",
    footer: "mensaliza.com/blog",
    titleSize: 62,
  });
}
