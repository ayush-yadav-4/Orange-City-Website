import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { revalidateSiteContent } from "@/lib/content/revalidate";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await prisma.vehicleCatalog.findMany({
    orderBy: [{ category: "asc" }, { make: "asc" }, { model: "asc" }],
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();

  if (!body.category || !body.make || !body.model) {
    return NextResponse.json({ error: "Category, Make, and Model are required" }, { status: 400 });
  }

  const category = String(body.category).trim().toLowerCase();
  const make = String(body.make).trim();
  const model = String(body.model).trim();

  // Check if exists
  const existing = await prisma.vehicleCatalog.findFirst({
    where: { category, make: { equals: make, mode: "insensitive" }, model: { equals: model, mode: "insensitive" } },
  });

  if (existing) {
    return NextResponse.json({ error: `Vehicle "${make} ${model}" already exists under category "${category}"` }, { status: 409 });
  }

  const item = await prisma.vehicleCatalog.create({
    data: {
      category,
      make,
      model,
      active: body.active ?? true,
    },
  });

  revalidateSiteContent();

  return NextResponse.json(item);
}
