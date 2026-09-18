"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { HelpCtaBanner } from "./help-cta-banner";
import { ChatAssistant } from "./chat-assistant";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin-panel");
  const isMarketplace = pathname === "/marketplace" || pathname.startsWith("/marketplace/");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      {!isMarketplace && <HelpCtaBanner />}
      <Footer className={isMarketplace ? "mt-20" : undefined} />
      <ChatAssistant />
    </>
  );
}
