import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const item = await prisma.galleryItem.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

import { revalidateSiteContent } from "@/lib/content/revalidate";

export async function PUT(req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const item = await prisma.galleryItem.update({
    where: { id: params.id },
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

export async function PATCH(req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const item = await prisma.galleryItem.update({
    where: { id: params.id },
    data: { active: body.active },
  });

  revalidateSiteContent();

  return NextResponse.json(item);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.galleryItem.delete({ where: { id: params.id } });

  revalidateSiteContent();

  return NextResponse.json({ ok: true });
}
