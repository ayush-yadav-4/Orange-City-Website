import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const brand = await prisma.brand.findUnique({ where: { id: params.id } });
  if (!brand) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(brand);
}

export async function PUT(req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const brand = await prisma.brand.update({
    where: { id: params.id },
    data: {
      name: body.name,
      slug: body.slug,
      color: body.color,
      logoUrl: body.logoUrl || null,
      active: body.active ?? true,
    },
  });
  return NextResponse.json(brand);
}

export async function PATCH(req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const brand = await prisma.brand.update({
    where: { id: params.id },
    data: { active: body.active },
  });
  return NextResponse.json(brand);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.brand.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
