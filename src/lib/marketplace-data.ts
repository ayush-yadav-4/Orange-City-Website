import type { ProductCardData } from "@/components/product-card";

export type MarketplaceProduct = ProductCardData & {
  batteryType: string;
  vehicles: { make: string; model: string }[];
};

export const brandLogos: Record<string, string> = {
  exide: "https://logo.clearbit.com/exideindustries.com",
  amaron: "https://logo.clearbit.com/amaron.in",
  luminous: "https://logo.clearbit.com/luminousindia.com",
  "sf-sonic": "https://logo.clearbit.com/sonicbatteries.com",
  bosch: "https://logo.clearbit.com/bosch.com",
  livfast: "https://logo.clearbit.com/livfast.com",
  microtek: "https://logo.clearbit.com/microtek.com",
  okaya: "https://logo.clearbit.com/okaya.com",
  powerzone: "https://logo.clearbit.com/powerzone.in",
};

export const categoryMeta: Record<
  string,
  { title: string; description: string; category: string; icon: string }
> = {
  "car-batteries": {
    title: "Car Batteries",
    description: "Genuine car & SUV batteries for all makes — Exide, Amaron, Bosch & more with free Nagpur delivery.",
    category: "car",
    icon: "🚗",
  },
  "two-wheeler-battery": {
    title: "Two Wheeler Batteries",
    description: "Bike & scooter batteries — sealed VRLA with doorstep fitment across Nagpur.",
    category: "bike",
    icon: "🏍️",
  },
  "inverter-batteries": {
    title: "Inverter Batteries",
    description: "Tubular & flat plate inverter batteries for homes, shops & small industries.",
    category: "inverter",
    icon: "⚡",
  },
  "heavy-engine-batteries": {
    title: "Heavy Engine Batteries",
    description: "Truck, tempo & commercial vehicle batteries with heavy-duty cranking power.",
    category: "truck",
    icon: "🚚",
  },
  "inverter-home-ups": {
    title: "Inverter & Home UPS",
    description: "Complete inverter + battery combos for uninterrupted home power backup.",
    category: "inverter",
    icon: "🏠",
  },
};

export const allProducts: MarketplaceProduct[] = [
  {
    id: "1", slug: "exide-xpress-xp800-car-battery", modelName: "Xpress XP800", category: "car",
    batteryType: "flat", capacityAh: 35, warrantyMonths: 48, mrp: 6200, priceWithExchange: 4499, priceWithoutExchange: 5299,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80"]),
    brand: { name: "Exide", slug: "exide" },
    vehicles: [{ make: "Maruti Suzuki", model: "Swift" }, { make: "Maruti Suzuki", model: "Dzire" }, { make: "Hyundai", model: "i20" }, { make: "Tata Motors", model: "Tiago" }],
  },
  {
    id: "2", slug: "amaron-go-flo-35b20l-car-battery", modelName: "Go FLO 35B20L", category: "car",
    batteryType: "flat", capacityAh: 35, warrantyMonths: 55, mrp: 6800, priceWithExchange: 4799, priceWithoutExchange: 5599,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"]),
    brand: { name: "Amaron", slug: "amaron" },
    vehicles: [{ make: "Honda", model: "City" }, { make: "Honda", model: "Amaze" }, { make: "Hyundai", model: "Creta" }, { make: "Maruti Suzuki", model: "Baleno" }],
  },
  {
    id: "3", slug: "bosch-s4-005-car-battery", modelName: "S4 005", category: "car",
    batteryType: "flat", capacityAh: 60, warrantyMonths: 36, mrp: 8900, priceWithExchange: 6999, priceWithoutExchange: 7799,
    stockStatus: "low_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"]),
    brand: { name: "Bosch", slug: "bosch" },
    vehicles: [{ make: "Toyota", model: "Innova" }, { make: "Mahindra", model: "XUV500" }, { make: "Hyundai", model: "Creta" }, { make: "Kia", model: "Seltos" }],
  },
  {
    id: "4", slug: "amaron-freshpak-pro-65d26l-car-battery", modelName: "Freshpak Pro 65D26L", category: "car",
    batteryType: "flat", capacityAh: 65, warrantyMonths: 60, mrp: 9800, priceWithExchange: 7599, priceWithoutExchange: 8499,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80"]),
    brand: { name: "Amaron", slug: "amaron" },
    vehicles: [{ make: "Mahindra", model: "Scorpio" }, { make: "Tata Motors", model: "Nexon" }, { make: "Maruti Suzuki", model: "Ertiga" }],
  },
  {
    id: "5", slug: "sf-sonic-stz-5l-bike-battery", modelName: "STZ-5L", category: "bike",
    batteryType: "vrla", capacityAh: 5, warrantyMonths: 24, mrp: 2200, priceWithExchange: 1499, priceWithoutExchange: 1799,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80"]),
    brand: { name: "SF Sonic", slug: "sf-sonic" },
    vehicles: [{ make: "Honda", model: "Activa" }, { make: "TVS", model: "Jupiter" }, { make: "Hero", model: "Splendor" }, { make: "Bajaj", model: "Pulsar" }],
  },
  {
    id: "6", slug: "exide-milege-m35-bike-battery", modelName: "Milege M35", category: "bike",
    batteryType: "vrla", capacityAh: 5, warrantyMonths: 18, mrp: 2100, priceWithExchange: 1399, priceWithoutExchange: 1699,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80"]),
    brand: { name: "Exide", slug: "exide" },
    vehicles: [{ make: "Honda", model: "Activa" }, { make: "Suzuki", model: "Access" }, { make: "Yamaha", model: "Fascino" }],
  },
  {
    id: "7", slug: "luminous-iltt-18060-inverter-battery", modelName: "ILTT 18060", category: "inverter",
    batteryType: "tubular", capacityAh: 150, warrantyMonths: 48, mrp: 16500, priceWithExchange: 12499, priceWithoutExchange: 13999,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"]),
    brand: { name: "Luminous", slug: "luminous" }, vehicles: [],
  },
  {
    id: "8", slug: "livfast-xp1500-inverter-battery", modelName: "XP1500", category: "inverter",
    batteryType: "tubular", capacityAh: 150, warrantyMonths: 60, mrp: 17200, priceWithExchange: 12999, priceWithoutExchange: 14499,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"]),
    brand: { name: "Livfast", slug: "livfast" }, vehicles: [],
  },
  {
    id: "9", slug: "luminous-red-charge-rc25000-inverter-battery", modelName: "Red Charge RC25000", category: "inverter",
    batteryType: "tubular", capacityAh: 200, warrantyMonths: 60, mrp: 19800, priceWithExchange: 14999, priceWithoutExchange: 16499,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"]),
    brand: { name: "Luminous", slug: "luminous" }, vehicles: [],
  },
  {
    id: "10", slug: "exide-endura-100ah-truck-battery", modelName: "Endura 100Ah", category: "truck",
    batteryType: "flat", capacityAh: 100, warrantyMonths: 18, mrp: 12500, priceWithExchange: 9899, priceWithoutExchange: 10999,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1601584115197-04ecc1da5d9a?w=800&q=80"]),
    brand: { name: "Exide", slug: "exide" },
    vehicles: [{ make: "Tata Motors", model: "Ace" }, { make: "Mahindra", model: "Bolero Pickup" }],
  },
  {
    id: "11", slug: "amaron-hiway-100ah-truck-battery", modelName: "HiWAY 100Ah", category: "truck",
    batteryType: "flat", capacityAh: 100, warrantyMonths: 36, mrp: 13200, priceWithExchange: 10299, priceWithoutExchange: 11499,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1601584115197-04ecc1da5d9a?w=800&q=80"]),
    brand: { name: "Amaron", slug: "amaron" },
    vehicles: [{ make: "Ashok Leyland", model: "Dost" }, { make: "Mahindra", model: "Bolero Pickup" }],
  },
  {
    id: "12", slug: "exide-inva-tubular-it500-inverter-battery", modelName: "Inva Tubular IT500", category: "inverter",
    batteryType: "tubular", capacityAh: 150, warrantyMonths: 66, mrp: 20643, priceWithExchange: 13200, priceWithoutExchange: 17000,
    stockStatus: "in_stock", images: JSON.stringify(["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"]),
    brand: { name: "Exide", slug: "exide" }, vehicles: [],
  },
];

export function filterProducts(
  products: MarketplaceProduct[],
  filters: {
    category?: string;
    brand?: string;
    make?: string;
    model?: string;
    capacity?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  }
) {
  return products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.brand && p.brand.slug !== filters.brand) return false;
    if (filters.capacity && p.capacityAh !== parseInt(filters.capacity)) return false;
    if (filters.minPrice && p.priceWithExchange < filters.minPrice) return false;
    if (filters.maxPrice && p.priceWithExchange > filters.maxPrice) return false;
    if (filters.make) {
      const match = p.vehicles.some((v) => v.make.toLowerCase() === filters.make!.toLowerCase());
      if (!match && p.vehicles.length > 0) return false;
    }
    if (filters.model) {
      const match = p.vehicles.some((v) => v.model.toLowerCase() === filters.model!.toLowerCase());
      if (!match && p.vehicles.length > 0) return false;
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const hay = `${p.brand.name} ${p.modelName} ${p.category} ${p.capacityAh}ah ${p.vehicles.map((v) => v.make + " " + v.model).join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function getUniqueMakes(products: MarketplaceProduct[]) {
  const makes = new Set<string>();
  products.forEach((p) => p.vehicles.forEach((v) => makes.add(v.make)));
  return Array.from(makes).sort();
}

export function getModelsForMake(products: MarketplaceProduct[], make: string) {
  const models = new Set<string>();
  products.filter((p) => p.vehicles.some((v) => v.make === make)).forEach((p) =>
    p.vehicles.filter((v) => v.make === make).forEach((v) => models.add(v.model))
  );
  return Array.from(models).sort();
}
