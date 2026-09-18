import { prisma } from "@/lib/prisma";
import { getDefaultContent } from "@/lib/content/default-content";
import type { SiteContent, BlogPost, VehicleModels } from "@/lib/content/types";

export function parseBlogSections(content: string): BlogPost["sections"] {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    /* markdown fallback */
  }
  return [{ heading: "Overview", body: content }];
}

export function stringifyBlogSections(sections: BlogPost["sections"]): string {
  return JSON.stringify(sections);
}

function mapProduct(
  p: {
    id: string;
    slug: string;
    modelName: string;
    category: string;
    batteryType: string;
    capacityAh: number;
    warrantyMonths: number;
    mrp: number;
    priceWithExchange: number;
    priceWithoutExchange: number;
    stockStatus: string;
    images: string;
    description: string;
    partNumber?: string;
    warrantyText?: string;
    longDescription?: string;
    batteryLayout?: string;
    specifications?: string;
    features?: string;
    recommendedFor?: string;
    active: boolean;
    brand: { slug: string };
    compatibilities: { vehicleMake: string; vehicleModel: string }[];
  }
) {
  return {
    id: p.id,
    slug: p.slug,
    modelName: p.modelName,
    category: p.category,
    batteryType: p.batteryType,
    capacityAh: p.capacityAh,
    warrantyMonths: p.warrantyMonths,
    mrp: p.mrp,
    priceWithExchange: p.priceWithExchange,
    priceWithoutExchange: p.priceWithoutExchange,
    stockStatus: p.stockStatus,
    images: p.images,
    description: p.description,
    partNumber: p.partNumber ?? "",
    warrantyText: p.warrantyText ?? "",
    longDescription: p.longDescription ?? "",
    batteryLayout: p.batteryLayout ?? "",
    specifications: p.specifications ?? "{}",
    features: p.features ?? "[]",
    recommendedFor: p.recommendedFor ?? "",
    brandSlug: p.brand.slug,
    active: p.active,
    vehicles: p.compatibilities.map((v) => ({
      make: v.vehicleMake,
      model: v.vehicleModel,
    })),
  };
}

function buildVehicleModels(
  rows: { category: string; make: string; model: string; active: boolean }[]
): VehicleModels {
  const map: VehicleModels = {};
  for (const row of rows.filter((r) => r.active)) {
    if (!map[row.category]) map[row.category] = {};
    if (!map[row.category][row.make]) map[row.category][row.make] = [];
    map[row.category][row.make].push(row.model);
  }
  return map;
}

export async function getContentFromDb(): Promise<SiteContent> {
  const [settings, brands, products, blogs, gallery, vehicleRows] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "default" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: { active: true },
      include: { brand: true, compatibilities: true },
      orderBy: { modelName: "asc" },
    }),
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } }),
    prisma.galleryItem.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } }),
    prisma.vehicleCatalog.findMany({ orderBy: [{ category: "asc" }, { make: "asc" }, { model: "asc" }] }),
  ]);

  if (!settings || brands.length === 0) {
    return getDefaultContent();
  }

  return {
    settings: {
      siteName: settings.siteName,
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
      address: settings.address,
      rating: settings.rating,
      reviewCount: settings.reviewCount,
      hours: settings.hours,
      emergencyHours: settings.emergencyHours,
      mapsUrl: settings.mapsUrl,
      heroTitle: settings.heroTitle ?? undefined,
      heroSubtitle: settings.heroSubtitle ?? undefined,
    },
    brands: brands
      .filter((b) => b.active)
      .map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        color: b.color,
        logoUrl: b.logoUrl ?? "",
        active: b.active,
      })),
    products: products.map((p) => mapProduct(p)),
    blogs: blogs.map((b) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      coverImage: b.coverImage ?? "",
      sections: parseBlogSections(b.content),
      published: b.published,
    })),
    gallery: gallery.map((g) => ({
      id: g.id,
      src: g.src,
      alt: g.alt,
      caption: g.caption,
      active: g.active,
    })),
    vehicleModels: buildVehicleModels(vehicleRows),
  };
}

export async function getAdminContent(): Promise<SiteContent & { allBrands: SiteContent["brands"] }> {
  const [settings, brands, products, blogs, gallery, vehicleRows] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "default" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      include: { brand: true, compatibilities: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } }),
    prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.vehicleCatalog.findMany({ orderBy: [{ category: "asc" }, { make: "asc" }, { model: "asc" }] }),
  ]);

  const defaultSettings = getDefaultContent().settings;

  return {
    settings: settings
      ? {
          siteName: settings.siteName,
          phone: settings.phone,
          whatsapp: settings.whatsapp,
          email: settings.email,
          address: settings.address,
          rating: settings.rating,
          reviewCount: settings.reviewCount,
          hours: settings.hours,
          emergencyHours: settings.emergencyHours,
          mapsUrl: settings.mapsUrl,
          heroTitle: settings.heroTitle ?? undefined,
          heroSubtitle: settings.heroSubtitle ?? undefined,
        }
      : defaultSettings,
    brands: brands.map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      color: b.color,
      logoUrl: b.logoUrl ?? "",
      active: b.active,
    })),
    allBrands: brands.map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      color: b.color,
      logoUrl: b.logoUrl ?? "",
      active: b.active,
    })),
    products: products.map((p) => mapProduct(p)),
    blogs: blogs.map((b) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      coverImage: b.coverImage ?? "",
      sections: parseBlogSections(b.content),
      published: b.published,
    })),
    gallery: gallery.map((g) => ({
      id: g.id,
      src: g.src,
      alt: g.alt,
      caption: g.caption,
      active: g.active,
    })),
    vehicleModels: buildVehicleModels(vehicleRows),
  };
}
