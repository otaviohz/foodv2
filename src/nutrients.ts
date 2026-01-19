import { NUTRIENT_KEYS, Nutrients } from "./types.ts";

export function scale<T extends Nutrients>(obj: T, factor: number): T {
  return NUTRIENT_KEYS.reduce((acc, key) => {
    const value = obj[key];
    if (value != null) acc[key] = value * factor;
    return acc;
  }, {} as T);
}

export function add<T extends Nutrients>(
  a: Nutrients,
  b: Nutrients,
): Nutrients {
  return NUTRIENT_KEYS.reduce((acc, key) => {
    const value = (a[key] ?? 0) + (b[key] ?? 0);
    if (value !== 0) acc[key] = value;
    return acc;
  }, {} as T);
}

export function sum<T>(
  items: T[],
  fn: (item: T) => Nutrients,
): Nutrients {
  return items.reduce((acc, item) => {
    return add(acc, fn(item));
  }, {} as Nutrients);
}

export function zero(): Nutrients {
  return {};
}
