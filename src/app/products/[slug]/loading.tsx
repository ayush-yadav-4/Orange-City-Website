export default function ProductLoading() {
  return (
    <div className="container-page animate-pulse py-10 sm:py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-[hsl(var(--muted))]" />
        <div className="space-y-4">
          <div className="h-4 w-32 rounded bg-[hsl(var(--muted))]" />
          <div className="h-10 w-3/4 rounded bg-[hsl(var(--muted))]" />
          <div className="h-24 rounded bg-[hsl(var(--muted))]" />
          <div className="h-12 w-full rounded bg-[hsl(var(--muted))]" />
        </div>
      </div>
    </div>
  );
}
