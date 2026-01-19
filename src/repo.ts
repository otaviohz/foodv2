import { Food, Log, Macros, Weight } from "./types.ts";
import { readYaml, writeYaml } from "./db.ts";
import {} from "./utils.ts";
import { add, scale, sum, zero } from "./nutrients.ts";

const FOOD_DB = "./db/food.yaml";
const LOG_DB = "./db/log.yaml";
const WEIGHT_DB = "./db/weight.yaml";
const DAILY_MACROS: Macros = {
  carbs: 185,
  protein: 180,
  fat: 50,
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

export async function showDay(day: string) {
  const foodDb = await loadFoods();
  const logDb = await loadLogs();

  const date = day;

  const entries = logDb.filter((log) => log.date === date);

  const totals = sum(entries, (entry) => {
    const food = foodDb.foodMap.get(entry.food);
    if (!food) return zero();

    const factor = entry.portion / food.portion;
    return scale(food, factor);
  });

  const missingFoods = entries
    .filter((e) => !foodDb.foodMap.has(e.food))
    .map((e) => e.food);

  console.log(totals);
  console.log(missingFoods);
}

//
// --- Weight functions
//

export async function loadWeights() {
}

export async function saveWeight(weight: Weight) {
}
