// RANDOM EFFECT:

import FRUITS_INFO from "../../Parameters/fruit_info";
import { generateFruitPosition } from "../fruitGenerator";
import addFruit from "../addFruit";
import { Fruit } from "../../interfaces/fruit";

const activateRandomEffect = (setFruits: React.Dispatch<React.SetStateAction<Fruit[]>>, newSnake: { x: number; y: number }[]) => {
  const fruitsArray = [FRUITS_INFO.SPIKY, FRUITS_INFO.GOLD]
  const randomFruit = fruitsArray[Math.floor(Math.random() * fruitsArray.length)];
  const fruitsToSpawn = 4;

  for (let i = 0; i < fruitsToSpawn; i++) {
    const fruitPosition = generateFruitPosition(randomFruit, newSnake);

    const newFruit = { ...fruitPosition, color: randomFruit };

    addFruit(newFruit, setFruits);
  }
};

export default activateRandomEffect;
