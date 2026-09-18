import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

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
  const item = await prisma.vehicleCatalog.create({
    data: {
      category: body.category,
      make: body.make,
      model: body.model,
      active: body.active ?? true,
    },
  });
  return NextResponse.json(item);
}
