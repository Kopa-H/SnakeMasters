// Objective: Generate a new fruit position for the snake game

import screenConfig from "../Parameters/screen_info";

import { closeWallsState } from "./fruit_effects/close_walls";

import LEVELS_INFO from "../Parameters/levels_info";
import FRUITS_INFO from "../Parameters/fruit_info";
import { FruitInfo } from "../interfaces/fruit";

const CASTLE_BORDER_OFFSET = 3; // Offset to avoid generating castles on the border

// Function to generate all possible positions within given bounds
const generateAllPositions = (minX: number, maxX: number, minY: number, maxY: number) => {
  const positions = [];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      positions.push({ x, y });
    }
  }
  return positions;
};

// NEW FRUIT POSITION
export const generateFruitPosition = (newFruitColor: FruitInfo, newSnake: { x: number; y: number}[]) => {

  // Ajustar el rango para generar números aleatorios
  let minX = 0, maxX = screenConfig.rows - 1;
  let minY = 0, maxY = screenConfig.columns - 1;

  // Si las paredes están cerradas, se evitan los bordes:
  if (closeWallsState) {
    minX = 1;
    maxX = screenConfig.rows - 2;
    minY = 1;
    maxY = screenConfig.columns - 2;
  }

  // Si es un castillo, ajustar el rango para evitar los bordes
  if (newFruitColor.emoji === FRUITS_INFO.CASTLE.emoji) {
    minX = CASTLE_BORDER_OFFSET;
    maxX = screenConfig.rows - CASTLE_BORDER_OFFSET - 1;
    minY = CASTLE_BORDER_OFFSET;
    maxY = screenConfig.columns - CASTLE_BORDER_OFFSET - 1;
  }

  const allPositions = generateAllPositions(minX, maxX, minY, maxY);

  //Filtrar las posiciones ocupadas por la serpiente
  const availablePositions = allPositions.filter(
    (position) => !newSnake.some((segment) => segment.x === position.x && segment.y === position.y)
  );

  if (availablePositions.length === 0) return null; // No space available

  const newFruitPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];

  return newFruitPosition; // Devuelve la nueva posición de la comida
};

// NEW FRUIT COLOR
const generateFruitColor = (level: number) => {
  const levelInfo = LEVELS_INFO[`LEVEL_${level}`] || LEVELS_INFO.LEVEL_1;
  const probabilities = levelInfo.probabilities;

  // Calcula el peso total (siempre debería ser 100)
  const totalWeight = Object.values(probabilities).reduce(
    (total, weight) => total + weight,
    0
  );

  // Genera un número aleatorio entre 0 y el peso total
  const randomValue = Math.random() * totalWeight;

  // Encuentra la fruta correspondiente al número aleatorio
  let accumulatedWeight = 0;
  // Iteramos sobre cada entrada del objeto probabilities
  for (const [fruitName, weight] of Object.entries(probabilities)) {
    accumulatedWeight += weight;
    if (randomValue < accumulatedWeight) {
      return FRUITS_INFO[fruitName.toUpperCase()];
    }
  }

  // En caso de que algo falle, devuelve la fruta GRASS:
  console.log("Something went wrong, returning GRASS fruit by default");
  return FRUITS_INFO.GRASS;
};

export const manageFruitGeneration = (
  level: number,
  newSnake: { x: number; y: number }[]
) => {

  const newFruitColor = generateFruitColor(level);
  const newFruitPosition = generateFruitPosition(newFruitColor, newSnake);
  const newFruit = { ...newFruitPosition, color: newFruitColor };

  return newFruit;
};

export const generateGrassFruit = (newSnake: { x: number; y: number }[]) => {
  const newFruitPosition = generateFruitPosition(FRUITS_INFO.GRASS, newSnake);
  if (!newFruitPosition) return null; // No space available (game over)

  return {
    ...newFruitPosition,
    color: FRUITS_INFO.GRASS,
  };
};
