import { Metadata } from "next";
import Link from "next/link";
import { buyingGuides, maintenanceChecklist, troubleshootingSteps } from "@/lib/guides-data";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Battery Buying Guides & Tools | Orange City Batteries",
  description: "Expert battery buying guides, maintenance checklists, and troubleshooting for Nagpur customers.",
};

export default function BuyingGuidePage() {
  return (
    <div className="section-spacing">
      <div className="container-page">
        <h1 className="section-title">Battery Buying Guides &amp; Tools</h1>
        <p className="section-sub mt-2">
          Expert advice to help you choose the right battery and extend its lifespan — from [OCB Nagpur](https://ocbnagpur.in/).
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buyingGuides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group surface flex flex-col p-6 transition hover:border-brand-400 hover:shadow-md"
            >
              <span className="text-3xl">{g.icon}</span>
              <h2 className="mt-3 font-display text-lg font-bold group-hover:text-brand-600">{g.title}</h2>
              <p className="mt-2 flex-1 text-sm text-[hsl(var(--muted-foreground))]">{g.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                Read more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <section id="maintenance" className="mt-16">
          <h2 className="font-display text-2xl font-bold">Maintenance Checklist</h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Keep your battery running strong for years with this routine check.
          </p>
          <ul className="mt-6 space-y-3">
            {maintenanceChecklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="troubleshooting" className="mt-16">
          <h2 className="font-display text-2xl font-bold">Troubleshooting Guide</h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Engine clicks? Inverter beeping? Use this diagnostic guide before calling a mechanic.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {troubleshootingSteps.map((t) => (
              <div key={t.problem} className="surface p-5">
                <h3 className="font-bold text-brand-700 dark:text-brand-300">{t.problem}</h3>
                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  Possible causes: {t.causes.join(", ")}
                </p>
                <p className="mt-2 text-sm font-semibold">{t.action}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
