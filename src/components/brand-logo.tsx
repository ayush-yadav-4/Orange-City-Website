"use client";

import { useState } from "react";
import { brandLogos } from "@/lib/marketplace-data";

interface BrandLogoProps {
  slug: string;
  name: string;
  color?: string;
  className?: string;
  customUrl?: string;
}

export function BrandLogo({
  slug,
  name,
  color = "bg-brand-600",
  className = "h-8 w-auto object-contain",
  customUrl,
}: BrandLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const logoUrl = customUrl || brandLogos[slug];

  // If custom URL is provided (e.g. from Cloudinary) or fallback URL
  if (logoUrl && !logoUrl.includes("clearbit.com") && !imgFailed) {
    return (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className={className}
        onError={() => setImgFailed(true)}
        loading="lazy"
      />
    );
  }

  // High-fidelity brand SVG marks for major Indian battery brands
  switch (slug.toLowerCase()) {
    case "exide":
      return (
        <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exide Batteries">
          <rect width="160" height="50" rx="6" fill="#ED1C24" />
          <text x="80" y="32" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" textAnchor="middle" letterSpacing="2">
            EXIDE
          </text>
          <text x="80" y="44" fill="#FFE5E5" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="7" textAnchor="middle" letterSpacing="1.5">
            BATTERIES
          </text>
        </svg>
      );

    case "amaron":
      return (
        <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Amaron Batteries">
          <rect width="160" height="50" rx="6" fill="#15803D" />
          <text x="80" y="33" fill="#A3E635" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="24" textAnchor="middle" letterSpacing="1.5">
            AMARON
          </text>
          <text x="80" y="44" fill="#DCFCE7" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="7" textAnchor="middle" letterSpacing="1">
            LASTS LONG, REALLY LONG
          </text>
        </svg>
      );

    case "luminous":
      return (
        <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Luminous">
          <rect width="160" height="50" rx="6" fill="#1E3A8A" />
          <circle cx="28" cy="25" r="10" fill="#FACC15" />
          <text x="96" y="33" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="19" textAnchor="middle" letterSpacing="1">
            LUMINOUS
          </text>
        </svg>
      );

    case "bosch":
      return (
        <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bosch">
          <rect width="160" height="50" rx="6" fill="#0F172A" />
          <circle cx="28" cy="25" r="12" stroke="#EF4444" strokeWidth="3" fill="none" />
          <line x1="28" y1="13" x2="28" y2="37" stroke="#EF4444" strokeWidth="3" />
          <text x="96" y="33" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" textAnchor="middle" letterSpacing="1.5">
            BOSCH
          </text>
        </svg>
      );

    case "livfast":
    case "livguard":
      return (
        <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Livfast">
          <rect width="160" height="50" rx="6" fill="#EA580C" />
          <polygon points="26,14 18,28 27,28 22,38 34,24 25,24" fill="#FEF08A" />
          <text x="94" y="33" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="21" textAnchor="middle" letterSpacing="1">
            LIVFAST
          </text>
        </svg>
      );

    case "microtek":
      return (
        <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Microtek">
          <rect width="160" height="50" rx="6" fill="#0369A1" />
          <text x="80" y="30" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="19" textAnchor="middle" letterSpacing="1.5">
            MICROTEK
          </text>
          <text x="80" y="42" fill="#BAE6FD" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="7" textAnchor="middle" letterSpacing="1">
            POWER BACKUP
          </text>
        </svg>
      );

    case "okaya":
      return (
        <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Okaya">
          <rect width="160" height="50" rx="6" fill="#991B1B" />
          <text x="80" y="32" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" textAnchor="middle" letterSpacing="2">
            OKAYA
          </text>
          <text x="80" y="43" fill="#FECACA" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="7" textAnchor="middle" letterSpacing="1.5">
            POWER OF JAPAN
          </text>
        </svg>
      );

    case "sf-sonic":
    case "sfsonic":
      return (
        <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SF Sonic">
          <rect width="160" height="50" rx="6" fill="#1E293B" />
          <text x="80" y="32" fill="#38BDF8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="21" textAnchor="middle" letterSpacing="1.5">
            SF SONIC
          </text>
          <text x="80" y="43" fill="#94A3B8" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="7" textAnchor="middle" letterSpacing="1">
            POWER THAT NEVER DIES
          </text>
        </svg>
      );

    case "powerzone":
      return (
        <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Powerzone">
          <rect width="160" height="50" rx="6" fill="#18181B" />
          <text x="80" y="32" fill="#F59E0B" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="19" textAnchor="middle" letterSpacing="1.5">
            POWERZONE
          </text>
          <text x="80" y="43" fill="#A1A1AA" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="7" textAnchor="middle" letterSpacing="1">
            HEAVY DUTY
          </text>
        </svg>
      );

    default:
      return (
        <div className={`flex h-10 px-4 items-center justify-center rounded-lg ${color} text-xs font-bold text-white shadow-sm`}>
          {name}
        </div>
      );
  }
}
