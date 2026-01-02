import { loadFoods } from "./repo.ts";
import { Food, Log, Weight } from "./types.ts";

export function getISODate(): string {
  const date = Temporal.Now.plainDateISO().toString();
  return date;
}

export function checkISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function checkExistingFood(food: Food) {
}

export async function foodSuggestions(): Promise<string[]> {
  const db = await loadFoods();
  const foodList = Array.from(db.foodSet).sort();
  return foodList;
}
