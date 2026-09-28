import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { revalidateSiteContent } from "@/lib/content/revalidate";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const item = await prisma.vehicleCatalog.update({
    where: { id: params.id },
    data: {
      category: body.category ? String(body.category).trim().toLowerCase() : undefined,
      make: body.make ? String(body.make).trim() : undefined,
      model: body.model ? String(body.model).trim() : undefined,
      active: body.active,
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
  const item = await prisma.vehicleCatalog.update({
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
  await prisma.vehicleCatalog.delete({ where: { id: params.id } });

  revalidateSiteContent();

  return NextResponse.json({ ok: true });
}
