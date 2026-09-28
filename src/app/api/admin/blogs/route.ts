import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { stringifyBlogSections } from "@/lib/db/content";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const blogs = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(blogs);
}

import { revalidateSiteContent } from "@/lib/content/revalidate";

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const blog = await prisma.blogPost.create({
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      coverImage: body.coverImage || null,
      content: stringifyBlogSections(body.sections ?? [{ heading: "", body: "" }]),
      published: body.published ?? true,
    },
  });

  revalidateSiteContent();

  return NextResponse.json(blog);
}
