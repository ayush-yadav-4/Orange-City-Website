import { PrismaClient, Category, BatteryType, StockStatus, ReviewSource } from "@prisma/client";

const prisma = new PrismaClient();

const localities = [
  { name: "Pardi", slug: "pardi", pincode: "440035", deliveryEtaHours: 2, landmarkNote: "Home of Orange City Batteries — same-day and 6 AM emergency service." },
  { name: "Sadar", slug: "sadar", pincode: "440001", deliveryEtaHours: 3, landmarkNote: "Near Sadar Bazaar and railway station." },
  { name: "Dharampeth", slug: "dharampeth", pincode: "440010", deliveryEtaHours: 3, landmarkNote: "West Nagpur — Dharampeth & Shankar Nagar belt." },
  { name: "Sitabuldi", slug: "sitabuldi", pincode: "440012", deliveryEtaHours: 3, landmarkNote: "Central Nagpur commercial hub." },
  { name: "Hingna", slug: "hingna", pincode: "440016", deliveryEtaHours: 4, landmarkNote: "Hingna Road industrial & residential corridor." },
  { name: "Wardha Road", slug: "wardha-road", pincode: "440015", deliveryEtaHours: 4, landmarkNote: "Airport & MIHAN side — Wardha Road stretch." },
  { name: "Manish Nagar", slug: "manish-nagar", pincode: "440015", deliveryEtaHours: 4, landmarkNote: "South Nagpur residential locality." },
  { name: "Trimurti Nagar", slug: "trimurti-nagar", pincode: "440022", deliveryEtaHours: 3, landmarkNote: "Near Ring Road / Trimurti Nagar square." },
  { name: "Civil Lines", slug: "civil-lines", pincode: "440001", deliveryEtaHours: 3, landmarkNote: "Premium Civil Lines & seminary hills area." },
  { name: "Ramdaspeth", slug: "ramdaspeth", pincode: "440010", deliveryEtaHours: 3, landmarkNote: "Ramdaspeth & adjacent west Nagpur." },
  { name: "Khamla", slug: "khamla", pincode: "440025", deliveryEtaHours: 4, landmarkNote: "Khamla & Pratap Nagar belt." },
  { name: "Nandanvan", slug: "nandanvan", pincode: "440009", deliveryEtaHours: 4, landmarkNote: "East Nagpur — Nandanvan & surrounding." },
  { name: "Gandhibagh", slug: "gandhibagh", pincode: "440002", deliveryEtaHours: 3, landmarkNote: "Old city / Gandhibagh market area." },
  { name: "Koradi Road", slug: "koradi-road", pincode: "440013", deliveryEtaHours: 5, landmarkNote: "North Nagpur along Koradi Road." },
  { name: "Besa", slug: "besa", pincode: "440037", deliveryEtaHours: 4, landmarkNote: "Besa & Beltarodi residential zone." },
  { name: "Wadi", slug: "wadi", pincode: "440023", deliveryEtaHours: 4, landmarkNote: "Wadi & MIDC side." },
  { name: "Jaripatka", slug: "jaripatka", pincode: "440014", deliveryEtaHours: 4, landmarkNote: "Jaripatka & Kamptee Road approach." },
  { name: "Lakadganj", slug: "lakadganj", pincode: "440008", deliveryEtaHours: 3, landmarkNote: "Lakadganj & Itwari side." },
  { name: "Pratap Nagar", slug: "pratap-nagar", pincode: "440022", deliveryEtaHours: 3, landmarkNote: "Pratap Nagar square & Ring Road." },
  { name: "Hudkeshwar", slug: "hudkeshwar", pincode: "440034", deliveryEtaHours: 5, landmarkNote: "Hudkeshwar Road expanding suburbs." },
];

const brands = [
  { name: "Exide", slug: "exide", logoUrl: null, color: "bg-red-600" },
  { name: "Amaron", slug: "amaron", logoUrl: null, color: "bg-green-700" },
  { name: "SF Sonic", slug: "sf-sonic", logoUrl: null, color: "bg-blue-700" },
  { name: "Luminous", slug: "luminous", logoUrl: null, color: "bg-yellow-600" },
  { name: "Livfast", slug: "livfast", logoUrl: null, color: "bg-orange-600" },
  { name: "Bosch", slug: "bosch", logoUrl: null, color: "bg-ink-800" },
];

type ProductSeed = {
  brandSlug: string;
  modelName: string;
  slug: string;
  category: Category;
  batteryType: BatteryType;
  capacityAh: number;
  warrantyMonths: number;
  mrp: number;
  priceWithExchange: number;
  priceWithoutExchange: number;
  stockStatus: StockStatus;
  featured: boolean;
  description: string;
  images: string[];
  vehicles: { make: string; model: string; yearFrom: number; yearTo: number }[];
  partNumber?: string;
  warrantyText?: string;
  longDescription?: string;
  batteryLayout?: string;
  specifications?: string;
  features?: string;
  recommendedFor?: string;
};

const products: ProductSeed[] = [
  {
    brandSlug: "exide",
    modelName: "Xpress XP800",
    slug: "exide-xpress-xp800-car-battery",
    category: "car",
    batteryType: "flat",
    capacityAh: 35,
    warrantyMonths: 48,
    mrp: 6200,
    priceWithExchange: 4499,
    priceWithoutExchange: 5299,
    stockStatus: "in_stock",
    featured: true,
    description:
      "Exide Xpress XP800 is a popular hatchback and compact sedan battery with strong cranking power for Nagpur summers. Free doorstep installation across Pardi and major Nagpur localities.",
    images: [
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80",
    ],
    vehicles: [
      { make: "Maruti Suzuki", model: "Swift", yearFrom: 2015, yearTo: 2024 },
      { make: "Maruti Suzuki", model: "Dzire", yearFrom: 2015, yearTo: 2024 },
      { make: "Hyundai", model: "i20", yearFrom: 2016, yearTo: 2023 },
      { make: "Tata", model: "Tiago", yearFrom: 2016, yearTo: 2024 },
    ],
  },
  {
    brandSlug: "amaron",
    modelName: "Go FLO 35B20L",
    slug: "amaron-go-flo-35b20l-car-battery",
    category: "car",
    batteryType: "flat",
    capacityAh: 35,
    warrantyMonths: 55,
    mrp: 6800,
    priceWithExchange: 4799,
    priceWithoutExchange: 5599,
    stockStatus: "in_stock",
    featured: true,
    description:
      "Amaron Go FLO delivers maintenance-free performance with high charge acceptance — ideal for cars with start-stop and city traffic around Nagpur.",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    ],
    vehicles: [
      { make: "Honda", model: "City", yearFrom: 2014, yearTo: 2024 },
      { make: "Honda", model: "Amaze", yearFrom: 2015, yearTo: 2024 },
      { make: "Hyundai", model: "Creta", yearFrom: 2015, yearTo: 2020 },
      { make: "Maruti Suzuki", model: "Baleno", yearFrom: 2015, yearTo: 2024 },
    ],
  },
  {
    brandSlug: "sf-sonic",
    modelName: "STZ-5L",
    slug: "sf-sonic-stz-5l-bike-battery",
    category: "bike",
    batteryType: "vrla",
    capacityAh: 5,
    warrantyMonths: 24,
    mrp: 2200,
    priceWithExchange: 1499,
    priceWithoutExchange: 1799,
    stockStatus: "in_stock",
    featured: true,
    description:
      "SF Sonic STZ-5L VRLA motorcycle battery — sealed, spill-proof, and ready for two-wheelers across Nagpur. Quick fitment at your doorstep.",
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
    ],
    vehicles: [
      { make: "Honda", model: "Activa", yearFrom: 2015, yearTo: 2024 },
      { make: "TVS", model: "Jupiter", yearFrom: 2015, yearTo: 2024 },
      { make: "Hero", model: "Splendor", yearFrom: 2014, yearTo: 2024 },
      { make: "Bajaj", model: "Pulsar", yearFrom: 2015, yearTo: 2023 },
    ],
  },
  {
    brandSlug: "exide",
    modelName: "Milege M35",
    slug: "exide-milege-m35-bike-battery",
    category: "bike",
    batteryType: "vrla",
    capacityAh: 5,
    warrantyMonths: 18,
    mrp: 2100,
    priceWithExchange: 1399,
    priceWithoutExchange: 1699,
    stockStatus: "in_stock",
    featured: false,
    description:
      "Reliable Exide Milege series for scooters and bikes. Transparent Nagpur pricing with exchange discount and same-day fitment.",
    images: [
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80",
    ],
    vehicles: [
      { make: "Honda", model: "Activa", yearFrom: 2012, yearTo: 2024 },
      { make: "Suzuki", model: "Access", yearFrom: 2015, yearTo: 2024 },
      { make: "Yamaha", model: "Fascino", yearFrom: 2015, yearTo: 2024 },
    ],
  },
  {
    brandSlug: "luminous",
    modelName: "ILTT 18060",
    slug: "luminous-iltt-18060-inverter-battery",
    category: "inverter",
    batteryType: "tubular",
    capacityAh: 150,
    warrantyMonths: 48,
    mrp: 16500,
    priceWithExchange: 12499,
    priceWithoutExchange: 13999,
    stockStatus: "in_stock",
    featured: true,
    description:
      "Luminous tall tubular inverter battery built for long backup during Nagpur power cuts. Ideal for homes and small shops. Old battery exchange available.",
    images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    ],
    vehicles: [],
  },
  {
    brandSlug: "livfast",
    modelName: "XP1500",
    slug: "livfast-xp1500-inverter-battery",
    category: "inverter",
    batteryType: "tubular",
    capacityAh: 150,
    warrantyMonths: 60,
    mrp: 17200,
    priceWithExchange: 12999,
    priceWithoutExchange: 14499,
    stockStatus: "in_stock",
    featured: true,
    description:
      "Livfast XP1500 tubular battery with thick plates for deep discharge cycles — a strong pick for inverter backup across Nagpur homes.",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    ],
    vehicles: [],
  },
  {
    brandSlug: "exide",
    modelName: "Endura 100Ah",
    slug: "exide-endura-100ah-truck-battery",
    category: "truck",
    batteryType: "flat",
    capacityAh: 100,
    warrantyMonths: 18,
    mrp: 12500,
    priceWithExchange: 9899,
    priceWithoutExchange: 10999,
    stockStatus: "in_stock",
    featured: false,
    description:
      "Heavy-duty Exide Endura for commercial vehicles, tempos and trucks operating on Nagpur–Hingna and Wardha Road routes.",
    images: [
      "https://images.unsplash.com/photo-1601584115197-04ecc1da5d9a?w=800&q=80",
    ],
    vehicles: [
      { make: "Tata", model: "Ace", yearFrom: 2015, yearTo: 2024 },
      { make: "Mahindra", model: "Bolero Pickup", yearFrom: 2014, yearTo: 2024 },
      { make: "Ashok Leyland", model: "Dost", yearFrom: 2015, yearTo: 2023 },
    ],
  },
  {
    brandSlug: "bosch",
    modelName: "S4 005",
    slug: "bosch-s4-005-car-battery",
    category: "car",
    batteryType: "flat",
    capacityAh: 60,
    warrantyMonths: 36,
    mrp: 8900,
    priceWithExchange: 6999,
    priceWithoutExchange: 7799,
    stockStatus: "low_stock",
    featured: true,
    description:
      "Bosch S4 series for mid-size sedans and SUVs. OEM-grade reliability with transparent exchange pricing in Nagpur.",
    images: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    ],
    vehicles: [
      { make: "Toyota", model: "Innova", yearFrom: 2012, yearTo: 2022 },
      { make: "Mahindra", model: "XUV500", yearFrom: 2015, yearTo: 2021 },
      { make: "Hyundai", model: "Creta", yearFrom: 2020, yearTo: 2024 },
      { make: "Kia", model: "Seltos", yearFrom: 2019, yearTo: 2024 },
    ],
  },
  {
    brandSlug: "amaron",
    modelName: "Freshpak Pro 65D26L",
    slug: "amaron-freshpak-pro-65d26l-car-battery",
    category: "car",
    batteryType: "flat",
    capacityAh: 65,
    warrantyMonths: 60,
    mrp: 9800,
    priceWithExchange: 7599,
    priceWithoutExchange: 8499,
    stockStatus: "in_stock",
    featured: true,
    description:
      "Higher capacity Amaron for SUVs and premium sedans — free Nagpur delivery & installation.",
    partNumber: "AAM-FP-65D26L",
    warrantyText: "60 Months (30 Months Full Replacement + 30 Months Pro Rata)",
    batteryLayout: "Left Layout",
    longDescription:
      "Amaron Freshpak Pro 65D26L is a 65AH, 12V maintenance-free car battery engineered for Indian heat and stop-go city driving. Built in a QS 9000 & ISO certified plant with SILVEN X silver alloy plates for low corrosion and zero top-ups.\n\nIdeal for mid-size sedans, compact SUVs, and premium hatchbacks in Nagpur. Alternator charging voltage across terminals should be maintained at 14.00±0.20V. Apply petroleum jelly to cable clamps — never grease.\n\nBest suited as upgrade for DIN 60AH / 65AH OEM fitments with higher cranking reserve for AC load.",
    specifications: JSON.stringify({
      Model: "AAM-FP-65D26L (65D26L)",
      Voltage: "12V",
      Layout: "Left Layout",
    }),
    features: JSON.stringify([
      "High cranking power for AC-heavy driving",
      "Maintenance-free SILVEN X alloy technology",
      "High heat tolerance & vibration resistance",
      "Patented BIC vents for enhanced safety",
      "Factory charged — ready to use",
      "Long life reformulated paste recipe",
    ]),
    recommendedFor:
      "Hyundai Creta Diesel, Hyundai Verna, Skoda Rapid, Volkswagen Vento, Mahindra Scorpio, Tata Nexon, Maruti Ertiga, Renault Duster, Nissan Kicks, Ford EcoSport, Toyota Innova Hycross",
    images: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
    ],
    vehicles: [
      { make: "Mahindra", model: "Scorpio", yearFrom: 2015, yearTo: 2024 },
      { make: "Tata", model: "Nexon", yearFrom: 2017, yearTo: 2024 },
      { make: "Maruti Suzuki", model: "Ertiga", yearFrom: 2015, yearTo: 2024 },
      { make: "Hyundai", model: "Creta", yearFrom: 2020, yearTo: 2024 },
      { make: "Skoda", model: "Rapid", yearFrom: 2015, yearTo: 2022 },
    ],
  },
  {
    brandSlug: "luminous",
    modelName: "Red Charge RC25000",
    slug: "luminous-red-charge-rc25000-inverter-battery",
    category: "inverter",
    batteryType: "tubular",
    capacityAh: 200,
    warrantyMonths: 60,
    mrp: 21000,
    priceWithExchange: 16499,
    priceWithoutExchange: 17999,
    stockStatus: "in_stock",
    featured: false,
    description:
      "High-capacity Luminous Red Charge for larger homes and shops needing extended inverter backup during peak summer load shedding.",
    images: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    ],
    vehicles: [],
  },
  {
    brandSlug: "sf-sonic",
    modelName: "STZ-7L",
    slug: "sf-sonic-stz-7l-bike-battery",
    category: "bike",
    batteryType: "vrla",
    capacityAh: 7,
    warrantyMonths: 24,
    mrp: 2800,
    priceWithExchange: 1899,
    priceWithoutExchange: 2199,
    stockStatus: "in_stock",
    featured: false,
    description:
      "Higher Ah SF Sonic for bigger scooters and motorcycles with more electrical load — ABS, LED, USB chargers.",
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    ],
    vehicles: [
      { make: "Honda", model: "Shine", yearFrom: 2015, yearTo: 2024 },
      { make: "TVS", model: "Apache", yearFrom: 2016, yearTo: 2024 },
      { make: "Royal Enfield", model: "Classic 350", yearFrom: 2015, yearTo: 2023 },
    ],
  },
  {
    brandSlug: "exide",
    modelName: "InstaBrite IB1500",
    slug: "exide-instabrite-ib1500-ups-battery",
    category: "ups",
    batteryType: "vrla",
    capacityAh: 26,
    warrantyMonths: 24,
    mrp: 4500,
    priceWithExchange: 3499,
    priceWithoutExchange: 3999,
    stockStatus: "in_stock",
    featured: false,
    description:
      "Exide InstaBrite VRLA for home UPS and office backup systems. Compact sealed design for indoor installation.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    vehicles: [],
  },
];

const reviews = [
  {
    rating: 5,
    text: "Got my Swift battery replaced at 7 AM in Pardi. Transparent exchange price and quick fitment. Highly recommend.",
    authorName: "Rahul M.",
    source: "google" as ReviewSource,
  },
  {
    rating: 5,
    text: "Best battery shop in Nagpur. Amaron with exchange was cheaper than what others quoted online.",
    authorName: "Priya S.",
    source: "google" as ReviewSource,
  },
  {
    rating: 5,
    text: "Inverter battery delivered to Dharampeth same day. Technician was professional.",
    authorName: "Amit K.",
    source: "justdial" as ReviewSource,
  },
  {
    rating: 4,
    text: "Good service for Activa battery. COD option made it easy.",
    authorName: "Sneha P.",
    source: "site" as ReviewSource,
  },
  {
    rating: 5,
    text: "Called for emergency truck battery on Wardha Road — they reached within 2 hours.",
    authorName: "Vikram T.",
    source: "google" as ReviewSource,
  },
];

const blogPosts = [
  {
    title: "Battery Price in Nagpur 2026 — Complete Buying Guide",
    slug: "battery-price-in-nagpur-2026",
    excerpt:
      "Current car, bike and inverter battery prices in Nagpur with exchange vs without exchange, plus tips to avoid overpaying.",
    content: `Looking for battery price in Nagpur? Orange City Batteries lists live MRP, with-exchange and without-exchange prices for Exide, Amaron, SF Sonic, Luminous and more.

## Why prices vary
Brand, Ah capacity, warranty and old-battery exchange value all affect the final amount. Always compare with-exchange vs without-exchange before deciding.

## Car batteries
Hatchback batteries (35Ah) typically start lower; SUV batteries (60–65Ah) cost more. We publish both prices on every product page.

## Bike batteries
Most scooters use 5Ah VRLA. Bigger bikes may need 7Ah. Fitment is usually under 20 minutes at your doorstep.

## Inverter batteries
Tubular batteries (150–200Ah) are preferred for Nagpur summers. Factor in backup hours and inverter matching.

## Localities we cover
Pardi, Sadar, Dharampeth, Sitabuldi, Hingna, Wardha Road and more — with locality-specific delivery ETAs.`,
    coverImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80",
  },
  {
    title: "How to Choose a Car Battery in Nagpur Heat",
    slug: "choose-car-battery-nagpur-heat",
    excerpt:
      "Ah rating, warranty and heat tolerance — what matters when summers hit 45°C in Nagpur.",
    content: `Nagpur summers stress car batteries. Choose adequate Ah for your vehicle, prefer brands with strong heat performance, and replace before monsoon if cranking is weak.

Check compatible models on our Battery Finder, compare exchange pricing, and book doorstep installation in your locality.`,
    coverImage: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80",
  },
  {
    title: "Inverter Battery Buying Guide for Nagpur Homes",
    slug: "inverter-battery-buying-guide-nagpur",
    excerpt:
      "Tubular vs flat plate, backup calculation, and when exchange makes sense for home inverter setups.",
    content: `For frequent power cuts, tall tubular batteries last longer under deep discharge. Match Ah to your inverter VA and load. Old battery exchange can cut cost significantly — we show both prices clearly.`,
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
  },
];

async function main() {
  console.log("Seeding Orange City Batteries catalog...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productLocalityAvailability.deleteMany();
  await prisma.vehicleCompatibility.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.locality.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.vehicleCatalog.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.user.deleteMany();

  for (const l of localities) {
    await prisma.locality.create({ data: l });
  }

  const brandMap = new Map<string, string>();
  for (const b of brands) {
    const created = await prisma.brand.create({ data: b });
    brandMap.set(b.slug, created.id);
  }

  const allLocalities = await prisma.locality.findMany();

  for (const p of products) {
    const brandId = brandMap.get(p.brandSlug);
    if (!brandId) throw new Error(`Brand missing: ${p.brandSlug}`);

    const product = await prisma.product.create({
      data: {
        brandId,
        modelName: p.modelName,
        slug: p.slug,
        category: p.category,
        batteryType: p.batteryType,
        capacityAh: p.capacityAh,
        warrantyMonths: p.warrantyMonths,
        mrp: p.mrp,
        priceWithExchange: p.priceWithExchange,
        priceWithoutExchange: p.priceWithoutExchange,
        stockStatus: p.stockStatus,
        featured: p.featured,
        description: p.description,
        partNumber: p.partNumber ?? "",
        warrantyText: p.warrantyText ?? "",
        longDescription: p.longDescription ?? "",
        batteryLayout: p.batteryLayout ?? "",
        specifications: p.specifications ?? "{}",
        features: p.features ?? "[]",
        recommendedFor: p.recommendedFor ?? "",
        images: JSON.stringify(p.images),
        installationIncluded: true,
        compatibilities: {
          create: p.vehicles.map((v) => ({
            vehicleMake: v.make,
            vehicleModel: v.model,
            yearFrom: v.yearFrom,
            yearTo: v.yearTo,
          })),
        },
        localityAvailability: {
          create: allLocalities.map((loc) => ({
            localityId: loc.id,
            inStock: p.stockStatus !== "out_of_stock",
            etaOverride: null,
          })),
        },
      },
    });

    console.log(`  + ${product.slug}`);
  }

  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }

  await prisma.siteSettings.create({
    data: {
      id: "default",
      siteName: "Orange City Batteries",
      phone: "+919325417265",
      whatsapp: "919325417265",
      email: "orders@ocbnagpur.in",
      address: "Surya Nagar, Pardi, Nagpur, Maharashtra 440008",
      rating: 4.9,
      reviewCount: 500,
      hours: "Mon–Sat 8 AM – 8 PM, Sun 9 AM – 6 PM",
      emergencyHours: "6 AM emergency service available",
      mapsUrl: "https://www.google.com/maps?cid=17376480873825153670",
      heroTitle: "Buy Genuine Batteries Online in Nagpur",
      heroSubtitle: "Car, bike, inverter & truck batteries with free doorstep delivery.",
    },
  });

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80", alt: "Car battery installation", caption: "Doorstep car battery fitment" },
    { src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80", alt: "Bike battery service", caption: "Two-wheeler battery replacement" },
    { src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80", alt: "Inverter battery delivery", caption: "Inverter battery delivery & setup" },
    { src: "https://images.unsplash.com/photo-1601584115197-04ecc1da5d9a?w=800&q=80", alt: "Commercial vehicle battery", caption: "Truck & tempo batteries" },
  ];
  for (let i = 0; i < galleryImages.length; i++) {
    await prisma.galleryItem.create({ data: { ...galleryImages[i], sortOrder: i, active: true } });
  }

  const vehicleEntries = [
    { category: "car", make: "Maruti Suzuki", model: "Swift" },
    { category: "car", make: "Maruti Suzuki", model: "Dzire" },
    { category: "car", make: "Hyundai", model: "i20" },
    { category: "car", make: "Honda", model: "City" },
    { category: "bike", make: "Honda", model: "Activa" },
    { category: "bike", make: "Hero", model: "Splendor" },
    { category: "bike", make: "TVS", model: "Jupiter" },
    { category: "truck", make: "Tata", model: "Ace" },
  ];
  for (const v of vehicleEntries) {
    await prisma.vehicleCatalog.create({ data: { ...v, active: true } });
  }

  await prisma.user.createMany({
    data: [
      { name: "Rahul Mehta", email: "rahul@example.com", phone: "9876543210", password: "demo123", active: true, lastLoginAt: new Date() },
      { name: "Priya Sharma", email: "priya@example.com", phone: "9876543211", password: "demo123", active: true, lastLoginAt: new Date() },
      { name: "Amit Kumar", email: "amit@example.com", phone: "9876543212", password: "demo123", active: false },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
