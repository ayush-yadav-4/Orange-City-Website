import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { buildProductPayload } from "@/lib/admin/product-payload";
import { prisma } from "@/lib/prisma";
import type { BatteryType, Category, StockStatus } from "@prisma/client";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { brand: true, compatibilities: true },
  });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const payload = buildProductPayload(body);
  const brand = payload.brandSlug
    ? await prisma.brand.findUnique({ where: { slug: payload.brandSlug } })
    : null;

  await prisma.vehicleCompatibility.deleteMany({ where: { productId: params.id } });

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...(brand ? { brandId: brand.id } : {}),
      modelName: payload.modelName,
      slug: payload.slug,
      category: payload.category as Category,
      batteryType: payload.batteryType as BatteryType,
      capacityAh: payload.capacityAh,
      warrantyMonths: payload.warrantyMonths,
      mrp: payload.mrp,
      priceWithExchange: payload.priceWithExchange,
      priceWithoutExchange: payload.priceWithoutExchange,
      stockStatus: payload.stockStatus as StockStatus,
      images: payload.images as string,
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

export async function PATCH(req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id: params.id },
    data: { active: body.active },
    include: { brand: true },
  });
  return NextResponse.json(product);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
