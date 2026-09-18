"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AdminFilterSelect, AdminPageHeader, AdminToolbar, DuplicateBadge, StatusBadge,
} from "@/components/admin/admin-ui";
import { findDuplicateIds } from "@/lib/admin/duplicates";
import { Plus, Trash2 } from "lucide-react";

type Vehicle = { id: string; category: string; make: string; model: string; active: boolean };

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [makeFilter, setMakeFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [category, setCategory] = useState("car");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    fetch("/api/admin/vehicles").then((r) => r.json()).then(setVehicles);
  }, []);

  const duplicates = useMemo(
    () => findDuplicateIds(vehicles, (v) => `${v.category}:${v.make}:${v.model}`),
    [vehicles]
  );

  const makeOptions = useMemo(() => {
    const set = new Set(vehicles.map((v) => v.make));
    return [{ value: "", label: "All makes" }, ...Array.from(set).sort().map((m) => ({ value: m, label: m }))];
  }, [vehicles]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return vehicles.filter((v) => {
      if (typeFilter && v.category !== typeFilter) return false;
      if (makeFilter && v.make !== makeFilter) return false;
      if (modelFilter && !v.model.toLowerCase().includes(modelFilter.toLowerCase())) return false;
      if (q && !v.make.toLowerCase().includes(q) && !v.model.toLowerCase().includes(q) && !v.category.includes(q)) return false;
      return true;
    });
  }, [vehicles, search, typeFilter, makeFilter, modelFilter]);

  const grouped = useMemo(() => {
    const map: Record<string, Record<string, Vehicle[]>> = {};
    for (const v of filtered) {
      if (!map[v.category]) map[v.category] = {};
      if (!map[v.category][v.make]) map[v.category][v.make] = [];
      map[v.category][v.make].push(v);
    }
    return map;
  }, [filtered]);

  async function addVehicle(e: React.FormEvent) {
    e.preventDefault();
    if (!make || !model) return;
    const res = await fetch("/api/admin/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, make, model, active: true }),
    });
    if (res.ok) {
      const item = await res.json();
      setVehicles((prev) => [...prev, item]);
      setMake("");
      setModel("");
    }
  }

  async function toggleActive(id: string, active: boolean) {
    const res = await fetch(`/api/admin/vehicles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    if (res.ok) {
      const updated = await res.json();
      setVehicles((prev) => prev.map((v) => (v.id === id ? updated : v)));
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this vehicle model?")) return;
    const res = await fetch(`/api/admin/vehicles/${id}`, { method: "DELETE" });
    if (res.ok) setVehicles((prev) => prev.filter((v) => v.id !== id));
  }

  const dupeCount = duplicates.size;

  return (
    <div>
      <AdminPageHeader
        title="Vehicle Catalog"
        subtitle={`${filtered.length} of ${vehicles.length} entries${dupeCount ? ` · ${dupeCount} duplicates` : ""}`}
      />
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search make, model..."
        filter={
          <div className="flex flex-wrap gap-3">
            <AdminFilterSelect
              label="Vehicle type"
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { value: "", label: "All types" },
                { value: "car", label: "Car" },
                { value: "bike", label: "Bike" },
                { value: "truck", label: "Truck" },
              ]}
            />
            <AdminFilterSelect label="Brand / Make" value={makeFilter} onChange={setMakeFilter} options={makeOptions} />
            <div className="sm:w-40">
              <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">Model name</label>
              <input
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                placeholder="Filter model..."
                className="input-field"
              />
            </div>
          </div>
        }
      />

      <form onSubmit={addVehicle} className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="select-field">
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">Make</label>
          <input value={make} onChange={(e) => setMake(e.target.value)} className="input-field" placeholder="e.g. Maruti Suzuki" required />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">Model</label>
          <input value={model} onChange={(e) => setModel(e.target.value)} className="input-field" placeholder="e.g. Swift" required />
        </div>
        <button type="submit" className="btn-primary inline-flex items-center gap-1.5 text-sm">
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="mt-8 space-y-6">
        {Object.entries(grouped).map(([cat, makes]) => (
          <div key={cat} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="font-display text-lg font-bold capitalize">{cat}</h3>
            <div className="mt-4 space-y-4">
              {Object.entries(makes).map(([makeName, models]) => (
                <div key={makeName}>
                  <p className="text-sm font-semibold text-brand-600">{makeName}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {models.map((v) => (
                      <div
                        key={v.id}
                        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${
                          duplicates.has(v.id)
                            ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20"
                            : "border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30"
                        }`}
                      >
                        <span>{v.model}</span>
                        <StatusBadge active={v.active} />
                        {duplicates.has(v.id) && <DuplicateBadge />}
                        <button type="button" onClick={() => toggleActive(v.id, v.active)} className="text-xs font-semibold text-brand-600">
                          {v.active ? "Off" : "On"}
                        </button>
                        <button type="button" onClick={() => remove(v.id)} className="text-red-600">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
