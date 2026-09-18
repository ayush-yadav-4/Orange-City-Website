import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import type { BatteryType, Category, StockStatus } from "@prisma/client";

function parseCsv(text: string): string[][] {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((c) => c.trim().replace(/^"|"$/g, "")));
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const type = form.get("type") as string;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const text = await file.text();
  const rows = parseCsv(text);
  if (rows.length < 2) return NextResponse.json({ error: "CSV must have header + rows" }, { status: 400 });

  const headers = rows[0].map((h) => h.toLowerCase());
  const data = rows.slice(1);

  if (type === "products") {
    const required = ["slug", "brandslug", "modelname", "category", "capacityah", "mrp", "pricewithexchange", "pricewithoutexchange"];
    for (const r of required) {
      if (!headers.includes(r)) {
        return NextResponse.json({ error: `Missing column: ${r}` }, { status: 400 });
      }
    }
    let imported = 0;
    for (const row of data) {
      const get = (k: string) => row[headers.indexOf(k)] ?? "";
      const brand = await prisma.brand.findUnique({ where: { slug: get("brandslug") } });
      if (!brand) continue;
      await prisma.product.upsert({
        where: { slug: get("slug") },
        create: {
          brandId: brand.id,
          slug: get("slug"),
          modelName: get("modelname"),
          category: get("category") as Category,
          batteryType: (get("batterytype") || "flat") as BatteryType,
          capacityAh: parseInt(get("capacityah")) || 0,
          warrantyMonths: parseInt(get("warrantymonths")) || 24,
          mrp: parseInt(get("mrp")) || 0,
          priceWithExchange: parseInt(get("pricewithexchange")) || 0,
          priceWithoutExchange: parseInt(get("pricewithoutexchange")) || 0,
          stockStatus: (get("stockstatus") || "in_stock") as StockStatus,
          images: get("images") ? JSON.stringify([get("images")]) : "[]",
          description: get("description") || "",
          active: true,
        },
        update: {
          modelName: get("modelname"),
          category: get("category") as Category,
          capacityAh: parseInt(get("capacityah")) || 0,
          mrp: parseInt(get("mrp")) || 0,
          priceWithExchange: parseInt(get("pricewithexchange")) || 0,
          priceWithoutExchange: parseInt(get("pricewithoutexchange")) || 0,
        },
      });
      imported++;
    }
    return NextResponse.json({ ok: true, imported });
  }

  if (type === "brands") {
    let imported = 0;
    for (const row of data) {
      const get = (k: string) => row[headers.indexOf(k)] ?? "";
      await prisma.brand.upsert({
        where: { slug: get("slug") },
        create: {
          name: get("name"),
          slug: get("slug"),
          color: get("color") || "bg-brand-600",
          logoUrl: get("logourl") || null,
          active: true,
        },
        update: {
          name: get("name"),
          color: get("color") || "bg-brand-600",
          logoUrl: get("logourl") || null,
        },
      });
      imported++;
    }
    return NextResponse.json({ ok: true, imported });
  }

  return NextResponse.json({ error: "Invalid type. Use products or brands" }, { status: 400 });
}
