export interface Food {
  name: string;
  calories: number;
  portion: number;
  carbs: number;
  fiber?: number;
  protein: number;
  fat: number;
  satfat?: number;
  sodium?: number;
  notes?: string;
}
export interface Log {
  date: string;
  food: string;
  portion: number;
}
export interface Weight {
  date: string;
  weight: number;
}
export interface DailyMacros {
  carbs: number;
  protein: number;
  fat: number;
}

export interface Measurements {
  biceps?: number;
  abs?: number;
  chest?: number;
}
