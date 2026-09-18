import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  Clock,
  Award,
  MapPin,
  Phone,
  Mail,
  Users,
  Battery,
  Wrench,
} from "lucide-react";
import { SITE } from "@/lib/utils";
import { services } from "@/lib/home-data";
import { GoogleMapEmbed } from "@/components/google-map-embed";

export const metadata: Metadata = {
  title: "About Us | Orange City Batteries — Nagpur",
  description:
    "Orange City Batteries is Nagpur's trusted authorized battery dealer in Pardi. Genuine Exide, Amaron, SF Sonic, Luminous batteries with doorstep service.",
};

const stats = [
  { value: `${SITE.yearsExperience}+`, label: "Years Experience", icon: Award },
  { value: `${SITE.happyCustomers}+`, label: "Happy Customers", icon: Users },
  { value: `${SITE.batteriesInstalled}+`, label: "Batteries Installed", icon: Battery },
  { value: "6 AM", label: "Emergency Service", icon: Clock },
];

const weServe = [
  "Two Wheelers",
  "Cars & SUVs",
  "Trucks",
  "Commercial Vehicles",
  "Homes & Shops",
  "Small Industries",
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[hsl(var(--muted))]/40 py-14 sm:py-20">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                Authorized Dealer — Exide, Amaron, SF Sonic, Luminous & More
              </span>
              <h1 className="section-title mt-4">About Orange City Batteries</h1>
              <p className="section-sub mt-4">
                <strong>Orange City Batteries (OCB Nagpur)</strong> is Nagpur&apos;s trusted destination for
                automotive batteries, inverter batteries, home backup systems, auto electrical repairs, alternator
                repair, starter motor repair, and professional power solutions.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                We deliver genuine multi-brand batteries, expert installation, and fast doorstep service across
                Nagpur — from two-wheelers to commercial fleets and home power backup. Our real shop in Surya
                Nagar, Pardi means you get local trust, not a distant call center.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${SITE.phone}`} className="btn-primary">
                  <Phone size={16} />
                  Call {SITE.phone}
                </a>
                <Link href="/contact-us" className="btn-secondary">
                  Book Appointment
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[hsl(var(--border))] shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80"
                alt="Orange City Batteries shop — automotive and inverter batteries in Nagpur"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-spacing container-page">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="surface flex flex-col items-center p-6 text-center"
            >
              <s.icon className="mb-3 h-8 w-8 text-brand-500" />
              <p className="font-display text-3xl font-extrabold text-[hsl(var(--foreground))]">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission + We Serve */}
      <section className="bg-[hsl(var(--muted))]/40 py-14 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="surface p-8">
            <h2 className="font-display text-2xl font-bold">Our Mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              To deliver reliable power solutions to every doorstep in Nagpur with unparalleled customer service,
              transparent pricing, and genuine products. We believe every customer deserves a real shop they can
              trust — not just an online listing.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "100% Genuine Authorized Products",
                "Free Doorstep Delivery & Installation",
                "Best Prices with Exchange Offers",
                "Full Warranty Claim Assistance",
                "6 AM Emergency Morning Service",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface p-8">
            <h2 className="font-display text-2xl font-bold">We Serve</h2>
            <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
              From personal vehicles to industrial power — we have the right battery and service for every need.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {weServe.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-4 py-3 text-sm font-medium"
                >
                  <Truck className="h-4 w-4 text-brand-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-spacing container-page">
        <div className="text-center">
          <h2 className="section-title">Our Services</h2>
          <p className="section-sub mx-auto">
            Professional battery &amp; electrical solutions — at our workshop or at your doorstep.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="surface p-5 transition hover:shadow-md">
              <Wrench className="mb-3 h-6 w-6 text-brand-500" />
              <h3 className="font-semibold text-[hsl(var(--foreground))]">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location + Map */}
      <section className="bg-[hsl(var(--muted))]/40 py-14 sm:py-16">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="section-title">Visit Our Shop</h2>
              <p className="section-sub mt-2">
                Come see our full range of batteries in person at our Pardi shop.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                  <div>
                    <p className="font-semibold">Orange City Batteries (OCB Nagpur)</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{SITE.address}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-brand-500" />
                  <a href={`tel:${SITE.phone}`} className="font-semibold hover:text-brand-600">{SITE.phone}</a>
                </div>
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-brand-500" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-brand-600">{SITE.email}</a>
                </div>
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-brand-500" />
                  <div className="text-sm">
                    <p className="font-semibold">{SITE.hours}</p>
                    <p className="text-[hsl(var(--muted-foreground))]">{SITE.emergencyHours}</p>
                  </div>
                </div>
              </div>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 inline-flex"
              >
                <MapPin size={16} />
                Open in Google Maps
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] shadow-lg">
              <GoogleMapEmbed />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
