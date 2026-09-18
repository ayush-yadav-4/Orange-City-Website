import { Metadata } from "next";
import { SITE } from "@/lib/utils";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { GoogleMapEmbed } from "@/components/google-map-embed";

export const metadata: Metadata = {
  title: "Contact Us | Orange City Batteries — Nagpur",
  description: "Contact Orange City Batteries for battery support, doorstep service, and appointments in Nagpur.",
};

export default function ContactUsPage() {
  return (
    <div className="section-spacing">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-sub mt-2">
            How can we help? Let us solve your power problem — call, WhatsApp, or visit our shop in Pardi, Nagpur.
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Phone size={24} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Call Us</h3>
                  <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{SITE.hours}</p>
                  <a href={`tel:${SITE.phone}`} className="mt-2 inline-block font-bold text-brand-600 hover:underline">
                    {SITE.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <MessageCircle size={24} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">WhatsApp</h3>
                  <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">We typically reply in minutes.</p>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-bold text-brand-600 hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Mail size={24} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <a href={`mailto:${SITE.email}`} className="mt-2 inline-block font-medium text-brand-600 hover:underline">
                    {SITE.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <MapPin size={24} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Visit Our Shop</h3>
                  <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{SITE.address}</p>
                  <a
                    href={SITE.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-brand-600 hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Clock size={24} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Emergency Service</h3>
                  <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{SITE.emergencyHours}</p>
                </div>
              </div>
            </div>

            <div className="surface p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold">Send a Message</h3>
              <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                Free doorstep battery checkup when you book through this form.
              </p>
              <ContactForm />
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[hsl(var(--border))] shadow-lg">
            <GoogleMapEmbed title="Orange City Batteries on Google Maps" />
          </div>
        </div>
      </div>
    </div>
  );
}
