import {
  Input,
  Number as CNumber,
  prompt,
} from "jsr:@cliffy/prompt@1.0.0-rc.8";
import { Food, Log, Macros, Weight } from "./types.ts";
import { checkISODate, foodSuggestions, getISODate } from "./utils.ts";

export async function promptFood() {
  const p = await prompt([
    {
      name: "name",
      message: "food name:",
      type: Input,
    },
    {
      name: "portion",
      message: "portion size (default 100g):",
      type: CNumber,
      min: 0,
      default: 100,
    },
    {
      name: "calories",
      message: "calories per portion:",
      type: CNumber,
      float: true,
      min: 0,
    },
    {
      name: "carbs",
      message: "carbs per portion:",
      type: CNumber,
      float: true,
      min: 0,
    },
    {
      name: "fiber",
      message: "fiber per portion (optional):",
      type: CNumber,
      float: true,
      min: 0,
      default: 0,
    },
    {
      name: "protein",
      message: "protein per portion:",
      type: CNumber,
      float: true,
      min: 0,
    },
    {
      name: "fat",
      message: "fat per portion:",
      type: CNumber,
      float: true,
      min: 0,
    },
    {
      name: "satfat",
      message: "satfat per portion (optional):",
      type: CNumber,
      float: true,
      min: 0,
      default: 0,
    },
    {
      name: "sodium",
      message: "sodium (mg) per portion (optional):",
      type: CNumber,
      float: true,
      min: 0,
      default: 0,
    },
    {
      name: "notes",
      message: "notes (optional):",
      type: Input,
      default: "",
    },
  ]);
  return p as Food;
}

export async function promptLog(): Promise<Log> {
  const foodList = await foodSuggestions();
  const p = await prompt([
    {
      name: "food",
      message: "Food: ",
      info: true,
      list: true,
      type: Input,
      suggestions: foodList,
    },
    {
      name: "portion",
      message: "Ammount (g): ",
      type: CNumber,
      min: 1,
    },
    {
      name: "date",
      message: "date: ",
      type: Input,
      default: getISODate(),
      validate: (v) => checkISODate(v),
    },
  ]);
  const { date, food, portion } = p;
  if (!date || !food || portion == null) {
    throw new Error("Incomplete log entry");
  }

  const log: Log = { date, food, portion };
  return log;
}

export async function promptWeight() {
}

export async function promptConfirm() {
}

export async function pickFood() {
}
