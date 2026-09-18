import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

function mapBody(body: Record<string, unknown>) {
  return {
    siteName: String(body.siteName ?? ""),
    phone: String(body.phone ?? ""),
    whatsapp: String(body.whatsapp ?? ""),
    email: String(body.email ?? ""),
    address: String(body.address ?? ""),
    rating: Number(body.rating) || 4.9,
    reviewCount: Number(body.reviewCount) || 500,
    hours: String(body.hours ?? ""),
    emergencyHours: String(body.emergencyHours ?? ""),
    mapsUrl: String(body.mapsUrl ?? ""),
    heroTitle: body.heroTitle ? String(body.heroTitle) : null,
    heroSubtitle: body.heroSubtitle ? String(body.heroSubtitle) : null,
    tagline: body.tagline ? String(body.tagline) : null,
    metaDescription: body.metaDescription ? String(body.metaDescription) : null,
    announcement: body.announcement ? String(body.announcement) : null,
    deliveryNote: body.deliveryNote ? String(body.deliveryNote) : null,
    instagramUrl: body.instagramUrl ? String(body.instagramUrl) : null,
    facebookUrl: body.facebookUrl ? String(body.facebookUrl) : null,
    youtubeUrl: body.youtubeUrl ? String(body.youtubeUrl) : null,
    codEnabled: Boolean(body.codEnabled),
  };
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const data = mapBody(body);
  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...data },
    update: data,
  });
  return NextResponse.json(settings);
}
