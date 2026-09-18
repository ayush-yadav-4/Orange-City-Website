import { brandUrl, categorySlugUrl } from "./marketplace-url";

export const mainNav = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/about-us", label: "About Us" },
  {
    href: "/brands",
    label: "Brands",
    dropdown: [
      { href: brandUrl("exide"), label: "Exide" },
      { href: brandUrl("amaron"), label: "Amaron" },
      { href: brandUrl("luminous"), label: "Luminous" },
      { href: brandUrl("microtek"), label: "Microtek" },
      { href: brandUrl("sf-sonic"), label: "SF Sonic" },
      { href: brandUrl("bosch"), label: "Bosch" },
      { href: brandUrl("livfast"), label: "Livfast" },
    ],
  },
  {
    href: "/categories",
    label: "Categories",
    dropdown: [
      { href: categorySlugUrl("car-batteries"), label: "Car Batteries" },
      { href: categorySlugUrl("inverter-batteries"), label: "Inverter Batteries" },
      { href: categorySlugUrl("inverter-home-ups"), label: "Inverter & Home UPS" },
      { href: categorySlugUrl("two-wheeler-battery"), label: "Two Wheeler Battery" },
      { href: categorySlugUrl("heavy-engine-batteries"), label: "Heavy Engine Batteries" },
    ],
  },
  { href: "/lithium-battery", label: "Lithium Battery" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
];

export const footerShop = [
  { href: categorySlugUrl("car-batteries"), label: "Car Batteries" },
  { href: categorySlugUrl("two-wheeler-battery"), label: "Bike Batteries" },
  { href: categorySlugUrl("inverter-batteries"), label: "Inverter Batteries" },
  { href: categorySlugUrl("heavy-engine-batteries"), label: "Truck Batteries" },
];

export const footerResources = [
  { href: "/about-us", label: "About Us" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/fitment-check", label: "Fitment Check" },
  { href: "/buying-guide", label: "Buying Guide" },
  { href: "/blog", label: "Blog" },
  { href: "/blog/battery-price-in-nagpur-2026", label: "Battery Price Guide" },
  { href: "/contact-us", label: "Contact" },
];
