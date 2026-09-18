import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content/store";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await getContent();
  const post = content.blogs.find((p) => p.slug === params.slug);
  if (!post) return { title: "Guide | Orange City Batteries" };
  return { title: `${post.title} | Orange City Batteries`, description: post.excerpt };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const content = await getContent();
  const post = content.blogs.find((p) => p.slug === params.slug && p.published);
  if (!post) notFound();

  return (
    <article className="section-spacing">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" priority />
          </div>
          <h1 className="section-title">{post.title}</h1>
          <p className="section-sub mt-3">{post.excerpt}</p>
          <div className="prose prose-sm mt-10 max-w-none space-y-8">
            {post.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-xl font-bold">{s.heading}</h2>
                <p className="mt-3 leading-relaxed text-[hsl(var(--muted-foreground))]">{s.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-12 rounded-xl border border-brand-300 bg-brand-500/10 p-6 text-center">
            <p className="font-semibold">Ready to buy? Browse our marketplace with live Nagpur prices.</p>
            <Link href="/marketplace" className="btn-primary mt-4 inline-flex">Shop Batteries</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
