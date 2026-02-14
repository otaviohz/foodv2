import {
  blue,
  bold,
  cyan,
  gray,
  green,
  magenta,
  red,
  yellow,
} from "jsr:@std/fmt/colors";

export async function printDayHeader(date: string) {
  console.log(bold(`📅 \t ${date}`));
}

export async function printTotalsTable(
  totals: { calories?: number; carbs?: number; protein?: number; fat?: number },
) {
  const row = [
    yellow("Totals:"),
    green(`${totals.calories?.toFixed(2) ?? "0"}kcal`),
    blue(`${totals.carbs?.toFixed(2) ?? "0"}g carbs`),
    red(`${totals.protein?.toFixed(2) ?? "0"}g protein`),
    magenta(`${totals.fat?.toFixed(2) ?? "0"}g fat`),
  ];

  console.log(row.join(" "));
}

export async function printFoodsList(entries: any[], foodDb: any) {
  if (entries.length === 0) {
    console.log(gray("No food entries for this day..."));
  }
}

export async function printMissingFoods() {
}
