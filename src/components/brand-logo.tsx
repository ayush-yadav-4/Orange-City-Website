"use client";

import Image from "next/image";
import { useState } from "react";
import { brandLogos } from "@/lib/marketplace-data";

export function BrandLogo({
  slug,
  name,
  color,
  className = "max-h-12 w-auto object-contain",
}: {
  slug: string;
  name: string;
  color: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const logo = brandLogos[slug];

  if (!logo || failed) {
    return (
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color} text-sm font-bold text-white`}>
        {name.slice(0, 2)}
      </div>
    );
  }

  return (
    <Image
      src={logo}
      alt={`${name} logo`}
      width={112}
      height={56}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
