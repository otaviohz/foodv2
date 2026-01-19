import { loadFoods } from "./repo.ts";
import { Food, Log, Macros, Weight } from "./types.ts";

//
// --- Date functions
//

export function getISODate(): string {
  const date = Temporal.Now.plainDateISO().toString();
  return date;
}

export function checkISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function addMacro(a: Macros, b: Macros): Macros {
  return {
    carbs: a.carbs + b.carbs,
    protein: a.protein + b.protein,
    fat: a.fat + b.fat,
  };
}

export async function foodSuggestions(): Promise<string[]> {
  const db = await loadFoods();
  const foodList = Array.from(db.foodSet).sort();
  return foodList;
}
