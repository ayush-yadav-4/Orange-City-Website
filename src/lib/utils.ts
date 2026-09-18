import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(paiseOrRupees: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paiseOrRupees);
}

export function discountPercent(mrp: number, price: number) {
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function parseImages(images: string): string[] {
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function categoryLabel(category: string) {
  const map: Record<string, string> = {
    car: "Car Battery",
    bike: "Bike Battery",
    inverter: "Inverter Battery",
    truck: "Truck Battery",
    industrial: "Industrial Battery",
    ups: "UPS Battery",
  };
  return map[category] ?? category;
}

export function stockLabel(status: string) {
  const map: Record<string, string> = {
    in_stock: "In Stock",
    low_stock: "Low Stock",
    out_of_stock: "Out of Stock",
    preorder: "Pre-order",
  };
  return map[status] ?? status;
}

export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Orange City Batteries - Nagpur",
  shortName: "Orange City Batteries",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+919325417265",
  whatsapp: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "919325417265",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "orders@ocbnagpur.in",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Surya Nagar, Pardi, Nagpur, Maharashtra 440008",
  mapsUrl:
    "https://www.google.com/maps?ll=21.151254,79.147626&z=16&t=m&hl=en&gl=IN&mapclient=embed&cid=17376480873825153670",
  hours: "Mon – Sun: 8:00 AM – 9:00 PM",
  emergencyHours: "6:00 AM – 10:00 AM emergency service",
  rating: 4.9,
  reviewCount: 58,
  city: "Nagpur",
  state: "Maharashtra",
  yearsExperience: 10,
  batteriesInstalled: 5000,
  happyCustomers: 3000,
};
