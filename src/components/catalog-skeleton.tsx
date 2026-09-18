export function CatalogSkeleton() {
  return (
    <div className="animate-pulse pb-4">
      <div className="mb-6 h-24 rounded-xl bg-[hsl(var(--muted))]" />
      <div className="mb-4 h-8 w-64 rounded bg-[hsl(var(--muted))]" />
      <div className="mb-6 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-20 rounded-sm bg-[hsl(var(--muted))]" />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-4">
        <div className="hidden h-80 rounded-xl bg-[hsl(var(--muted))] lg:block" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:col-span-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-[hsl(var(--border))]">
              <div className="aspect-[4/3] bg-[hsl(var(--muted))]" />
              <div className="space-y-2 p-4">
                <div className="h-3 w-16 rounded bg-[hsl(var(--muted))]" />
                <div className="h-5 w-3/4 rounded bg-[hsl(var(--muted))]" />
                <div className="h-4 w-1/2 rounded bg-[hsl(var(--muted))]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
