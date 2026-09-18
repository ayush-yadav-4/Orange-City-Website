import { Star } from "lucide-react";
import { SITE } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function GoogleRatingBadge({ compact }: { compact?: boolean }) {
  return (
    <a
      href={SITE.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex shrink-0 items-center gap-0.5 rounded-md border border-yellow-300 bg-yellow-400 font-extrabold text-ink-900 shadow-md transition hover:bg-yellow-300",
        compact ? "px-1.5 py-1.5 text-[10px]" : "gap-1 px-2 py-2 text-xs lg:px-2.5"
      )}
      title={`${SITE.rating} star rating on Google`}
    >
      <Star size={compact ? 12 : 14} className="fill-ink-900 text-ink-900" />
      <span>{SITE.rating}</span>
      {!compact && <span className="hidden font-bold lg:inline">Google</span>}
    </a>
  );
}
