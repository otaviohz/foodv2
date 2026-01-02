import { Command } from "jsr:@cliffy/command@1.0.0-rc.8";
import { DailyMacros, Food, Log, Weight } from "./src/types.ts";
import {
  listFoods,
  loadFoods,
  loadLogs,
  loadWeights,
  saveFood,
  saveLog,
  saveWeight,
  showDay,
} from "./src/repo.ts";

import { promptFood, promptLog, promptWeight } from "./src/prompts.ts";
import { getISODate } from "./src/utils.ts";

async function addFood() {
  const db = loadFoods();
  const f: Food = await promptFood();
  await saveFood(f);
}
async function addLog() {
  const db = loadLogs();
  const log: Log = await promptLog();
  await saveLog(log);
}

async function addWeight() {
}

async function main() {
  await new Command()
    .name("food")
    .version("0.2")
    .description("Simple CLI food tracker.")
    .command("add-food", "Add new food.")
    .action(async () => await addFood())
    .command("del-food", "Delete food.")
    .action(() => console.log("this will delete foods"))
    .command("add-log", "Add food log.")
    .action(async () => await addLog())
    .command("list-foods", "List foods")
    .action(async () => await listFoods())
    .command("show-day", "Show logs of the day")
    .action(async () => await showDay(getISODate()))
    .command("weight", "addFood")
    .action(() => console.log("this will show the food logs of the day"))
    .parse(Deno.args);
}

await main();
