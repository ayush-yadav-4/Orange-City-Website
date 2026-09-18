import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { buildProductPayload } from "@/lib/admin/product-payload";
import { prisma } from "@/lib/prisma";
import type { BatteryType, Category, StockStatus } from "@prisma/client";

export async function GET(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const brandSlug = new URL(req.url).searchParams.get("brand");
  const products = await prisma.product.findMany({
    where: brandSlug ? { brand: { slug: brandSlug } } : undefined,
    select: {
      id: true,
      modelName: true,
      slug: true,
      category: true,
      capacityAh: true,
      mrp: true,
      priceWithExchange: true,
      active: true,
      images: true,
      brand: { select: { name: true, slug: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = buildProductPayload(await req.json());
  const brand = await prisma.brand.findFirst({
    where: { OR: [{ slug: payload.brandSlug }, { id: payload.brandSlug }] },
  });
  if (!brand) return NextResponse.json({ error: "Brand not found" }, { status: 400 });

  const product = await prisma.product.create({
    data: {
      brandId: brand.id,
      modelName: payload.modelName,
      slug: payload.slug,
      category: payload.category as Category,
      batteryType: payload.batteryType as BatteryType,
      capacityAh: payload.capacityAh || 0,
      warrantyMonths: payload.warrantyMonths || 24,
      mrp: payload.mrp || 0,
      priceWithExchange: payload.priceWithExchange || 0,
      priceWithoutExchange: payload.priceWithoutExchange || 0,
      stockStatus: (payload.stockStatus ?? "in_stock") as StockStatus,
      images: (payload.images as string) ?? "[]",
      description: payload.description,
      partNumber: payload.partNumber,
      warrantyText: payload.warrantyText,
      longDescription: payload.longDescription,
      batteryLayout: payload.batteryLayout,
      specifications: payload.specifications,
      features: payload.features,
      recommendedFor: payload.recommendedFor,
      active: payload.active,
      featured: payload.featured,
      compatibilities: {
        create: payload.vehicles.map((v: { make: string; model: string }) => ({
          vehicleMake: v.make,
          vehicleModel: v.model,
          yearFrom: 2010,
          yearTo: 2026,
        })),
      },
    },
    include: { brand: true, compatibilities: true },
  });
  return NextResponse.json(product);
}
