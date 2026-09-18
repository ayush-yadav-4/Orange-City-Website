import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))]">
        <li>
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-300">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-brand-600 dark:hover:text-brand-300">
                {item.name}
              </Link>
            ) : (
              <span className="font-medium text-[hsl(var(--foreground))]">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
