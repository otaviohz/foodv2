import { DailyMacros, Food, Log, Weight } from "./types.ts";
import { readYaml, writeYaml } from "./db.ts";
import {} from "./utils.ts";

const FOOD_DB = "./db/food.yaml";
const LOG_DB = "./db/log.yaml";
const WEIGHT_DB = "./db/weight.yaml";
const DAILY_MACROS: DailyMacros = {
  carbs: 0,
  protein: 0,
  fat: 0,
};

//
// --- Food functions
//

export async function loadFoods() {
  const foods = await readYaml<Food[]>(FOOD_DB, []);
  const foodList: string[] = [];
  const foodMap = new Map<string, Food>();
  const foodSet = new Set<string>();

  for (const food of foods) {
    const name = food.name.toLowerCase();

    foodList.push(food.name);
    foodMap.set(name, food);
    foodSet.add(name);
  }

  return {
    foods,
    foodList,
    foodMap,
    foodSet,
  };
}
export async function saveFood(food: Food) {
  const foods = await loadFoods();

  const key = food.name;

  if (foods.foodSet.has(key)) {
    throw new Error(`Food "${food.name}" already exists.`);
  }

  foods.foods.push(food);

  await writeYaml(FOOD_DB, foods.foods);
}

export async function listFoods() {
  const db = await loadFoods();
  console.log(db.foodSet);
}

//
// --- Log Functions
//

export async function loadLogs(): Promise<Log[]> {
  return await readYaml<Log[]>(LOG_DB, []);
}

export async function saveLog(log: Log) {
  const logs = await loadLogs();
  logs.push(log);
  await writeYaml(LOG_DB, logs);
}

export async function showDay(date: string) {
  const foods = await loadFoods();
  const logs = await loadLogs();

  const day = date;

  const entries = logs.filter((log) => log.date === day);

  const totals = {
    calories: 0,
    carbs: 0,
    fiber: 0,
    protein: 0,
    fat: 0,
    satfat: 0,
    sodium: 0,
    missingFoods: [] as string[],
  };

  let macros: DailyMacros = {
    carbs: 0,
    protein: 0,
    fat: 0,
  };

  for (const entry of entries) {
    const food = foods.foodMap.get(entry.food);

    if (!food) {
      totals.missingFoods.push(entry.food);
      continue;
    }

    const factor = entry.portion / food.portion;

    totals.calories += food.calories * factor;
    totals.carbs += food.carbs * factor;
    totals.fiber += (food.fiber ?? 0) * factor;
    totals.protein += food.protein * factor;
    totals.fat += food.fat * factor;
    totals.satfat += (food.satfat ?? 0) * factor;
    totals.sodium += (food.sodium ?? 0) * factor;
  }

  console.log(totals);
}

//
// --- Weight functions
//

export async function loadWeights() {
}

export async function saveWeight(weight: Weight) {
}
