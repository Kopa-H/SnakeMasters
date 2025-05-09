export interface FruitInfo {
  name: string;
  colorHex: string;
  lifeExpectancy: number;
  effect: string;
  effectDuration: number;
  value: number;
  enlargeSnake: boolean;
  emoji: string;
  description: string;
}

export interface Fruit {
  color: FruitInfo;
  x?: number;
  y?: number;
  id?: string;
}

export interface FruitsEaten {
  [key: string]: number;
}
