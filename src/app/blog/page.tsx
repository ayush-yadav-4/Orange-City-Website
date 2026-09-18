import Link from "next/link";
import Image from "next/image";
import { getContent } from "@/lib/content/store";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | Orange City Batteries — Nagpur",
  description: "Battery buying guides, price updates, and maintenance tips for Nagpur customers.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const content = await getContent();
  const posts = content.blogs.filter((b) => b.published);

  return (
    <div className="section-spacing">
      <div className="container-page">
        <h1 className="section-title">Blog &amp; Guides</h1>
        <p className="section-sub mt-2">Expert battery advice, Nagpur price updates, and maintenance tips.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group surface overflow-hidden transition hover:border-brand-400 hover:shadow-md"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h2 className="font-display text-lg font-bold group-hover:text-brand-600">{post.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-[hsl(var(--muted-foreground))]">{post.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
