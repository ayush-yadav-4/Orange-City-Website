import { Metadata } from "next";
import { FitmentWizard } from "@/components/fitment-wizard";
import { MarketplaceStickyCall } from "@/components/marketplace-sticky-call";

export const metadata: Metadata = {
  title: "Battery Fitment Check | Orange City Batteries — Nagpur",
  description: "Answer a few quick questions to get a battery recommendation for your car, bike, inverter or truck in Nagpur.",
};

export default function FitmentCheckPage() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="section-spacing flex-1">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="section-title">Battery Fitment Check</h1>
            <p className="section-sub mx-auto mt-2">
              Answer a few quick questions to get a battery recommendation — then book a free on-site check in Nagpur.
            </p>
          </div>
          <div className="mt-10">
            <FitmentWizard />
          </div>
        </div>
      </div>
      <MarketplaceStickyCall />
    </div>
  );
}
