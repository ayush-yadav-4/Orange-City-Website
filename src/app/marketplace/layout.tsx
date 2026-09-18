import { MarketplaceStickyCall } from "@/components/marketplace-sticky-call";

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1">{children}</div>
      <MarketplaceStickyCall />
    </div>
  );
}
