import { allProducts } from "@/lib/marketplace-data";
import { blogPosts } from "@/lib/guides-data";
import { galleryImages, trustedPartners, carModels } from "@/lib/home-data";
import { SITE } from "@/lib/utils";
import type { SiteContent } from "./types";

export function getDefaultContent(): SiteContent {
  return {
    settings: {
      siteName: SITE.shortName,
      phone: SITE.phone,
      whatsapp: SITE.whatsapp,
      email: SITE.email,
      address: SITE.address,
      rating: SITE.rating,
      reviewCount: SITE.reviewCount,
      hours: SITE.hours,
      emergencyHours: SITE.emergencyHours,
      mapsUrl: SITE.mapsUrl,
      heroTitle: "Buy Genuine Batteries Online in Nagpur",
      heroSubtitle: "Car, bike, inverter & truck batteries with free doorstep delivery and installation.",
    },
    brands: trustedPartners.map((b, i) => ({
      id: String(i + 1),
      name: b.name,
      slug: b.slug,
      color: b.color,
      logoUrl: "",
    })),
    products: allProducts.map((p) => ({
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
      brandSlug: p.brand.slug,
      vehicles: p.vehicles,
    })),
    blogs: blogPosts.map((b, i) => ({
      id: String(i + 1),
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      coverImage: b.coverImage,
      sections: b.sections,
      published: true,
    })),
    gallery: galleryImages.map((g, i) => ({
      id: String(i + 1),
      src: g.src,
      alt: g.alt,
      caption: g.caption,
    })),
    vehicleModels: {
      car: carModels,
      bike: {
        Honda: ["Activa", "Shine", "Unicorn"],
        Hero: ["Splendor", "Passion", "Xtreme"],
        TVS: ["Jupiter", "Apache", "NTorq"],
        Bajaj: ["Pulsar", "Platina", "Avenger"],
        Suzuki: ["Access", "Gixxer"],
        Yamaha: ["Fascino", "FZ"],
      },
      truck: {
        "Tata Motors": ["Ace", "407", "LPT"],
        Mahindra: ["Bolero Pickup", "Jeeto"],
        "Ashok Leyland": ["Dost", "Partner"],
      },
    },
  };
}
