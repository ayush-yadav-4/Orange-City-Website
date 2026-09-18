import { Phone } from "lucide-react";
import { SITE } from "@/lib/utils";

export function MarketplaceStickyCall() {
  return (
    <div className="sticky bottom-0 z-40 border-t-2 border-brand-500 bg-brand-600 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      <div className="container-page flex flex-col items-center justify-between gap-2 py-3 sm:flex-row sm:gap-4">
        <p className="text-center text-xs font-semibold text-white sm:text-left sm:text-sm">
          <span className="font-extrabold">Can&apos;t find your product?</span>{" "}
          <span className="hidden sm:inline">Our Nagpur experts will find the right battery for you — call now!</span>
          <span className="sm:hidden">Call our Nagpur experts now!</span>
        </p>
        <a
          href={`tel:${SITE.phone}`}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-sm bg-white px-4 py-2.5 text-sm font-extrabold text-brand-700 shadow transition hover:bg-brand-50 sm:w-auto sm:px-6"
        >
          <Phone size={18} strokeWidth={2.5} />
          <span className="sm:hidden">Call Now</span>
          <span className="hidden sm:inline">Call Now — {SITE.phone}</span>
        </a>
      </div>
    </div>
  );
}
