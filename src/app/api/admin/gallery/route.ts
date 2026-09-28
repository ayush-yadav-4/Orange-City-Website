import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(items);
}

import { revalidateSiteContent } from "@/lib/content/revalidate";

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const item = await prisma.galleryItem.create({
    data: {
      src: body.src,
      alt: body.alt,
      caption: body.caption,
      active: body.active ?? true,
      sortOrder: Number(body.sortOrder) || 0,
    },
  });

  revalidateSiteContent();

  return NextResponse.json(item);
}
