/** Returns set of item IDs that share a duplicate key with another item */
export function findDuplicateIds<T extends { id: string }>(
  items: T[],
  keyFn: (item: T) => string
): Set<string> {
  const groups = new Map<string, string[]>();
  for (const item of items) {
    const k = keyFn(item).toLowerCase().trim();
    const list = groups.get(k) ?? [];
    list.push(item.id);
    groups.set(k, list);
  }
  const dupIds = new Set<string>();
  for (const ids of Array.from(groups.values())) {
    if (ids.length > 1) ids.forEach((id) => dupIds.add(id));
  }
  return dupIds;
}
