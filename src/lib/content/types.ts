export type Brand = {
  id: string;
  name: string;
  slug: string;
  color: string;
  logoUrl?: string;
  active?: boolean;
};

export type Product = {
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
  description?: string;
  partNumber?: string;
  warrantyText?: string;
  longDescription?: string;
  batteryLayout?: string;
  specifications?: string;
  features?: string;
  recommendedFor?: string;
  brandSlug: string;
  vehicles: { make: string; model: string }[];
  active?: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  sections: { heading: string; body: string }[];
  published: boolean;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  active?: boolean;
};

export type SiteSettings = {
  siteName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  rating: number;
  reviewCount: number;
  hours: string;
  emergencyHours: string;
  mapsUrl: string;
  heroTitle?: string;
  heroSubtitle?: string;
};

/** category key -> make -> models[] */
export type VehicleModels = Record<string, Record<string, string[]>>;

export type SiteContent = {
  settings: SiteSettings;
  brands: Brand[];
  products: Product[];
  blogs: BlogPost[];
  gallery: GalleryItem[];
  vehicleModels: VehicleModels;
};
