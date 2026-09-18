import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(brands);
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const brand = await prisma.brand.create({
    data: {
      name: body.name,
      slug: body.slug,
      color: body.color ?? "bg-brand-600",
      logoUrl: body.logoUrl || null,
      active: body.active ?? true,
    },
  });
  return NextResponse.json(brand);
}
