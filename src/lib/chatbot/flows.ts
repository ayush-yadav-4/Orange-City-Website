import { brandUrl, categorySlugUrl } from "@/lib/marketplace-url";

export type ChatOption =
  | { type: "node"; nodeId: string; label: string }
  | { type: "link"; href: string; label: string }
  | { type: "call"; label: string }
  | { type: "whatsapp"; label: string };

export type ChatNode = {
  id: string;
  messages: string[];
  options: ChatOption[];
};

const CALL: ChatOption = { type: "call", label: "Call us now" };
const WHATSAPP: ChatOption = { type: "whatsapp", label: "Chat on WhatsApp" };
const MAIN: ChatOption = { type: "node", nodeId: "root", label: "Main menu" };

function withSupport(options: ChatOption[]): ChatOption[] {
  return [...options, CALL, WHATSAPP, MAIN];
}

export const CHAT_NODES: Record<string, ChatNode> = {
  root: {
    id: "root",
    messages: [
      "Hi! I'm your Orange City Batteries assistant.",
      "I can help you find the right battery, browse products, or reach our Nagpur team. What would you like to do?",
    ],
    options: [
      { type: "node", nodeId: "vehicle", label: "Find battery for my vehicle" },
      { type: "node", nodeId: "categories", label: "Browse by category" },
      { type: "node", nodeId: "brands", label: "Browse by brand" },
      { type: "link", href: "/battery-finder", label: "Battery finder tool" },
      { type: "link", href: "/fitment-check", label: "Check fitment compatibility" },
      { type: "node", nodeId: "orders", label: "Orders, delivery & payment" },
      { type: "node", nodeId: "support", label: "Talk to our team" },
      CALL,
      WHATSAPP,
    ],
  },

  vehicle: {
    id: "vehicle",
    messages: ["What type of vehicle do you need a battery for?"],
    options: withSupport([
      { type: "link", href: categorySlugUrl("car-batteries"), label: "Car battery" },
      { type: "link", href: categorySlugUrl("two-wheeler-battery"), label: "Bike / scooter battery" },
      { type: "link", href: categorySlugUrl("heavy-engine-batteries"), label: "Truck / heavy vehicle" },
      { type: "link", href: "/battery-finder", label: "Use battery finder" },
      { type: "link", href: "/fitment-check", label: "Check exact fitment" },
    ]),
  },

  categories: {
    id: "categories",
    messages: ["Pick a category to browse batteries with prices and exchange offers:"],
    options: withSupport([
      { type: "link", href: categorySlugUrl("car-batteries"), label: "Car batteries" },
      { type: "link", href: categorySlugUrl("two-wheeler-battery"), label: "Two-wheeler batteries" },
      { type: "link", href: categorySlugUrl("inverter-batteries"), label: "Inverter batteries" },
      { type: "link", href: categorySlugUrl("inverter-home-ups"), label: "Inverter & home UPS" },
      { type: "link", href: categorySlugUrl("heavy-engine-batteries"), label: "Heavy engine batteries" },
      { type: "link", href: "/lithium-battery", label: "Lithium batteries" },
      { type: "link", href: "/marketplace", label: "View all in marketplace" },
    ]),
  },

  brands: {
    id: "brands",
    messages: ["Which brand are you looking for?"],
    options: withSupport([
      { type: "link", href: brandUrl("exide"), label: "Exide" },
      { type: "link", href: brandUrl("amaron"), label: "Amaron" },
      { type: "link", href: brandUrl("luminous"), label: "Luminous" },
      { type: "link", href: brandUrl("microtek"), label: "Microtek" },
      { type: "link", href: brandUrl("sf-sonic"), label: "SF Sonic" },
      { type: "link", href: brandUrl("bosch"), label: "Bosch" },
      { type: "link", href: "/brands", label: "See all brands" },
    ]),
  },

  orders: {
    id: "orders",
    messages: [
      "We offer free delivery & installation in Nagpur, COD, and UPI/card payments.",
      "What do you need help with?",
    ],
    options: withSupport([
      { type: "link", href: "/cart", label: "View my cart" },
      { type: "link", href: "/checkout", label: "Go to checkout" },
      { type: "link", href: "/profile", label: "My account & orders" },
      { type: "link", href: "/buying-guide", label: "Buying guide" },
      { type: "link", href: "/faq", label: "FAQs" },
    ]),
  },

  support: {
    id: "support",
    messages: [
      "Our shop is in Surya Nagar, Pardi, Nagpur. We're open Mon–Sun, 8 AM – 9 PM.",
      "How can we help you today?",
    ],
    options: withSupport([
      { type: "link", href: "/contact-us", label: "Contact us page" },
      { type: "link", href: "/about-us", label: "About our shop" },
      { type: "link", href: "/blog", label: "Battery tips & blog" },
      { type: "link", href: "/faq", label: "Frequently asked questions" },
    ]),
  },
};

export function getChatNode(id: string): ChatNode {
  return CHAT_NODES[id] ?? CHAT_NODES.root;
}
