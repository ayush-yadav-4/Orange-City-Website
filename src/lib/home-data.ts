import type { ProductCardData } from "@/components/product-card";
import { categorySlugUrl } from "@/lib/marketplace-url";

export const featuredProducts: ProductCardData[] = [
  {
    id: "1",
    slug: "luminous-iltt-18060-inverter-battery",
    modelName: "ILTT 18060 (150AH)",
    category: "inverter",
    capacityAh: 150,
    warrantyMonths: 48,
    mrp: 16500,
    priceWithExchange: 12499,
    priceWithoutExchange: 13999,
    stockStatus: "in_stock",
    images: JSON.stringify(["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"]),
    brand: { name: "Luminous", slug: "luminous" },
  },
  {
    id: "2",
    slug: "exide-xpress-xp800-car-battery",
    modelName: "Xpress XP800 (35AH)",
    category: "car",
    capacityAh: 35,
    warrantyMonths: 48,
    mrp: 6200,
    priceWithExchange: 4499,
    priceWithoutExchange: 5299,
    stockStatus: "in_stock",
    images: JSON.stringify(["https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80"]),
    brand: { name: "Exide", slug: "exide" },
  },
  {
    id: "3",
    slug: "amaron-go-flo-35b20l-car-battery",
    modelName: "Go FLO 35B20L (35AH)",
    category: "car",
    capacityAh: 35,
    warrantyMonths: 55,
    mrp: 6800,
    priceWithExchange: 4799,
    priceWithoutExchange: 5599,
    stockStatus: "in_stock",
    images: JSON.stringify(["https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"]),
    brand: { name: "Amaron", slug: "amaron" },
  },
  {
    id: "4",
    slug: "bosch-s4-005-car-battery",
    modelName: "S4 005 (60AH)",
    category: "car",
    capacityAh: 60,
    warrantyMonths: 36,
    mrp: 8900,
    priceWithExchange: 6999,
    priceWithoutExchange: 7799,
    stockStatus: "low_stock",
    images: JSON.stringify(["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"]),
    brand: { name: "Bosch", slug: "bosch" },
  },
];

export const categories = [
  {
    name: "Car Batteries",
    desc: "Hatchback to SUV",
    href: categorySlugUrl("car-batteries"),
    icon: "🚗",
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    name: "Inverter Batteries",
    desc: "Home & shop backup",
    href: categorySlugUrl("inverter-batteries"),
    icon: "⚡",
    color: "from-amber-500/20 to-amber-600/5",
  },
  {
    name: "Two Wheeler",
    desc: "Bike & scooter",
    href: categorySlugUrl("two-wheeler-battery"),
    icon: "🏍️",
    color: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    name: "Heavy Engine",
    desc: "Truck & commercial",
    href: categorySlugUrl("heavy-engine-batteries"),
    icon: "🚚",
    color: "from-red-500/20 to-red-600/5",
  },
  {
    name: "Lithium Battery",
    desc: "Next-gen power",
    href: "/lithium-battery",
    icon: "🔋",
    color: "from-purple-500/20 to-purple-600/5",
  },
  {
    name: "Inverter + Combo",
    desc: "Complete solution",
    href: categorySlugUrl("inverter-home-ups"),
    icon: "🏠",
    color: "from-orange-500/20 to-orange-600/5",
  },
];

export const carManufacturers = [
  { name: "Maruti Suzuki", slug: "maruti-suzuki", logo: "🚗" },
  { name: "Hyundai", slug: "hyundai", logo: "🚙" },
  { name: "Honda", slug: "honda", logo: "🚘" },
  { name: "Tata Motors", slug: "tata", logo: "🚐" },
  { name: "Mahindra", slug: "mahindra", logo: "🛻" },
  { name: "Toyota", slug: "toyota", logo: "🚗" },
  { name: "Kia", slug: "kia", logo: "🚙" },
  { name: "Volkswagen", slug: "volkswagen", logo: "🚘" },
];

export const brands = [
  { name: "Exide", slug: "exide", color: "bg-red-600" },
  { name: "Amaron", slug: "amaron", color: "bg-green-600" },
  { name: "Luminous", slug: "luminous", color: "bg-yellow-500" },
  { name: "SF Sonic", slug: "sf-sonic", color: "bg-blue-600" },
  { name: "Bosch", slug: "bosch", color: "bg-ink-700" },
  { name: "Livfast", slug: "livfast", color: "bg-orange-500" },
  { name: "Microtek", slug: "microtek", color: "bg-indigo-600" },
  { name: "PowerZONE", slug: "powerzone", color: "bg-brand-600" },
];

export const whyChooseUs = [
  {
    title: "Free Delivery*",
    desc: "Doorstep delivery across Nagpur — Pardi, Sadar, Dharampeth & 20+ localities.",
    icon: "truck",
  },
  {
    title: "Free Installation*",
    desc: "Expert technicians install your battery at home. No extra labour charges.",
    icon: "wrench",
  },
  {
    title: "Best Prices",
    desc: "Genuine batteries at the lowest market rates. We beat any high-street quote.",
    icon: "tag",
  },
  {
    title: "Cash on Delivery*",
    desc: "Pay only when your battery arrives — simple, secure, and hassle-free.",
    icon: "wallet",
  },
  {
    title: "UPI / Card / Net Banking",
    desc: "Instant order confirmation with multiple online payment options.",
    icon: "credit-card",
  },
];

export const googleReviews = [
  {
    name: "Anas Khan",
    text: "Best shop for batteries and services regarding the batteries in East Nagpur. Services were quite great and on time.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Meet Rawal",
    text: "Good battery and have long life",
    rating: 5,
    source: "Google",
  },
  {
    name: "Ahsan Ahmad",
    text: "Excellent services 👍",
    rating: 5,
    source: "Google",
  },
  {
    name: "Khushal Umratkar",
    text: "Best shop for batteries in East Nagpur. Services were quite great and on time. U can definitely try.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Super Roadways",
    text: "Very very excellent service and product for light and heavy vehicles.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Shubham Bhute",
    text: "Very nice assembly of lithium ion battery and service is excellent.",
    rating: 5,
    source: "Google",
  },
];

export const testimonials = googleReviews;

export const trustedPartners = [
  { name: "Exide", slug: "exide", color: "bg-red-600" },
  { name: "Amaron", slug: "amaron", color: "bg-green-600" },
  { name: "SF Sonic", slug: "sf-sonic", color: "bg-blue-600" },
  { name: "Luminous", slug: "luminous", color: "bg-yellow-500" },
  { name: "Okaya", slug: "okaya", color: "bg-indigo-600" },
  { name: "Autobat", slug: "autobat", color: "bg-ink-700" },
  { name: "Microtek", slug: "microtek", color: "bg-purple-600" },
  { name: "Bosch", slug: "bosch", color: "bg-ink-800" },
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80",
    alt: "Automotive battery installation at Orange City Batteries, Nagpur",
    caption: "Automotive battery installation",
  },
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80",
    alt: "Exide and Amaron car batteries on shelf at OCB Nagpur",
    caption: "Exide & Amaron brands in stock",
  },
  {
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    alt: "Inverter battery setup for home backup in Nagpur",
    caption: "Home inverter battery setup",
  },
  {
    src: "https://images.unsplash.com/photo-1601584115197-04ecc1da5d9a?w=600&q=80",
    alt: "Heavy-duty truck battery at Orange City Batteries",
    caption: "Commercial truck batteries",
  },
  {
    src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80",
    alt: "Two-wheeler battery fitment at doorstep in Nagpur",
    caption: "Doorstep bike battery fitment",
  },
  {
    src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
    alt: "Battery load testing at OCB Nagpur workshop",
    caption: "Digital battery load testing",
  },
];

export const services = [
  { title: "Automotive Batteries", desc: "Genuine car, bike & SUV batteries with expert fitment and warranty support." },
  { title: "Home Inverter Systems", desc: "Complete inverter setup for uninterrupted home and shop power backup." },
  { title: "Inverter Battery Installation", desc: "Deep-cycle inverter batteries installed with safety checks." },
  { title: "Starter Motor Repair", desc: "Fast diagnosis and repair for failing starter motors." },
  { title: "Alternator Repair", desc: "Professional alternator servicing for reliable charging." },
  { title: "Auto Electrical Works", desc: "Wiring, lighting, accessories & full electrical troubleshooting." },
  { title: "Doorstep Battery Replacement", desc: "On-site battery testing and replacement across Nagpur." },
  { title: "Morning Emergency Services", desc: "6:00 AM to 10:00 AM emergency battery & power support." },
];

export const carMakes = [
  "Maruti Suzuki", "Hyundai", "Honda", "Tata Motors", "Mahindra",
  "Toyota", "Kia", "Volkswagen", "Skoda", "Renault", "Nissan", "Ford",
];

export const carModels: Record<string, string[]> = {
  "Maruti Suzuki": ["Swift", "Dzire", "Baleno", "Ertiga", "Brezza", "Wagon R"],
  Hyundai: ["i20", "Creta", "Venue", "Verna", "Grand i10"],
  Honda: ["City", "Amaze", "Elevate", "WR-V"],
  "Tata Motors": ["Nexon", "Tiago", "Harrier", "Punch", "Safari"],
  Mahindra: ["Scorpio", "XUV700", "Thar", "Bolero", "XUV300"],
  Toyota: ["Innova", "Fortuner", "Glanza", "Urban Cruiser"],
  Kia: ["Seltos", "Sonet", "Carens"],
  Volkswagen: ["Polo", "Vento", "Taigun"],
  Skoda: ["Kushaq", "Slavia", "Rapid"],
  Renault: ["Kwid", "Triber", "Kiger"],
  Nissan: ["Magnite", "Kicks"],
  Ford: ["EcoSport", "Endeavour"],
};

export const nagpurLocalities = [
  "Pardi", "Sadar", "Dharampeth", "Sitabuldi", "Civil Lines",
  "Trimurti Nagar", "Manish Nagar", "Wardha Road", "Hingna", "Koradi Road",
];

export const inverterCapacities = ["100 AH", "120 AH", "135 AH", "150 AH", "180 AH", "200 AH"];
