export type Level = 1 | 2 | 3 | 4;

export interface Ingredient {
  q: number;
  u: string;
  name: string;
}

export interface Step {
  n: number;
  text: string;
  timer: number;
}

export interface Recipe {
  id: string;
  title: string;
  region: string;
  level: string;
  lv: Level;
  time: number;
  rating: number;
  author: string;
  comments: number;
  blurb: string;
  ing: Ingredient[];
  steps: Step[];
}

export interface LevelInfo {
  lv: Level;
  vi: string;
  en: string;
  sub: string;
}

export interface Comment {
  name: string;
  stars: string;
  when: string;
  text: string;
}
