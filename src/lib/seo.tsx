import { SITE } from "./utils";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    image: `${SITE.url}/og-image.png`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pardi",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      postalCode: "440035",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.1458,
      longitude: 79.0882,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "06:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating,
      reviewCount: SITE.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: "₹₹",
    areaServed: {
      "@type": "City",
      name: "Nagpur",
    },
  };
}

export function productJsonLd(product: {
  name: string;
  slug: string;
  description: string;
  images: string[];
  brand: string;
  mrp: number;
  price: number;
  stockStatus: string;
  rating?: number;
  reviewCount?: number;
}) {
  const availability =
    product.stockStatus === "out_of_stock"
      ? "https://schema.org/OutOfStock"
      : "https://schema.org/InStock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.slug,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability,
      seller: { "@type": "Organization", name: SITE.shortName },
    },
    ...(product.rating && product.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.href}`,
    })),
  };
}

export function localityBusinessJsonLd(locality: {
  name: string;
  slug: string;
  pincode: string;
}) {
  return {
    ...localBusinessJsonLd(),
    name: `${SITE.shortName} — ${locality.name}, Nagpur`,
    url: `${SITE.url}/locality/${locality.slug}`,
    areaServed: {
      "@type": "Place",
      name: `${locality.name}, Nagpur`,
      address: {
        "@type": "PostalAddress",
        addressLocality: locality.name,
        addressRegion: "Maharashtra",
        postalCode: locality.pincode,
        addressCountry: "IN",
      },
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
