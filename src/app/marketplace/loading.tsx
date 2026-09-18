import { CatalogSkeleton } from "@/components/catalog-skeleton";

export default function MarketplaceLoading() {
  return (
    <div className="section-spacing">
      <div className="container-page">
        <CatalogSkeleton />
      </div>
    </div>
  );
}
