import { SnakeSegment } from "../interfaces/snake";
import { Fruit } from "../interfaces/fruit";

import activateBurnTailEffect from "./fruit_effects/spiky";

import { activateSpeedUpEffect } from "./fruit_effects/cheeta";
import { activateCloseWallsEffect } from "./fruit_effects/close_walls";
import { activateInvertControlsEffect } from "./fruit_effects/crazy";
import { activateStopSnakeEffect } from "./fruit_effects/paralysis";
import activateRandomEffect from "./fruit_effects/random_effect";
import { activateInmortalEffect } from "./fruit_effects/dragon";

import { manageFruitGeneration } from "./fruitGenerator";
import handleAddFruit from "./addFruit";

import LEVELS_INFO from "../Parameters/levels_info";
import FRUITS_INFO from "../Parameters/fruit_info";

const fruitConsumption = (
  fruits: Fruit[],
  newSnake: SnakeSegment[],
  newHead: SnakeSegment,

  setSnake: React.Dispatch<React.SetStateAction<SnakeSegment[]>>,
  setFruits: React.Dispatch<React.SetStateAction<Fruit[]>>,
  level: number,
  setCurrentScore: React.Dispatch<React.SetStateAction<number>>,
  setActiveFruitEffects: React.Dispatch<React.SetStateAction<string[]>>,
  setFruitsEaten: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>,
  setSnakeKilledByFruit: React.Dispatch<React.SetStateAction<boolean>>,
) => {

  function eatFruit(fruit: Fruit) {
    // SE ELIMINA LA FRUTA CONSUMIDA DE LA LISTA DE FRUTAS:
    const newFruits = fruits.filter((f) => f.x !== fruit.x || f.y !== fruit.y);
    setFruits(newFruits);

    // SE AÑADE LA PUNTUACIÓN:
    setCurrentScore((prev) => prev + fruit.color.value);

    // SE AGREGA UN NUEVO SEGMENTO A LA SERPIENTE SI LA FRUTA CONSUMIDA TIENE UN EFECTO DE AGRANDAMIENTO:
    if (fruit.color.enlargeSnake) {
      newSnake.unshift({
        x: newHead.x,
        y: newHead.y,
        color: fruit.color.colorHex,
      });
    }

    const snakeBody = newSnake.slice(1);

    // Si la fruta consumida tiene algún efecto:
    if (fruit.color.effect !== "none") {
      switch (fruit.color.effect) {
        case "burn-tail":
          activateBurnTailEffect(newSnake, setSnake);
          break;
        case "speed-up":
          activateSpeedUpEffect(fruit.color.effectDuration, setActiveFruitEffects);
          break;
        case "close-walls":
          // console.log("CLOSE WALLS");
          activateCloseWallsEffect(fruit.color.effectDuration, newSnake, setFruits, setActiveFruitEffects);
          break;
        case "become-inmortal":
          activateInmortalEffect(fruit.color.effectDuration, setActiveFruitEffects);
          break;
        case "invert-controls":
          // console.log("INVERT CONTROLS");
          activateInvertControlsEffect(fruit.color.effectDuration, setActiveFruitEffects);
          break;
        case "stop-snake":
          // console.log("STOP SNAKE");
          activateStopSnakeEffect(fruit.color.effectDuration, setActiveFruitEffects);
          break;
        case "random-effect":
          // console.log("RANDOM EFFECT");
          activateRandomEffect(setFruits, snakeBody);
          break;
        case "kill-snake":
          // console.log("KILL SNAKE");
          setSnakeKilledByFruit(true);
          break;
        default:
          break;
      }
    }
  }

  // SI LA SERPIENTE ESTÁ COMIENDO COMIDA EN EL FRAME ACTUAL:
  let snakeWillMove = true;
  for (const fruitItem of fruits) {
    if (newHead.x === fruitItem.x && newHead.y === fruitItem.y) {
      eatFruit(fruitItem);

      // SI SE COME UNA FRUTA PARÁLISIS SE DETIENE EL MOVIMIENTO:
      if (fruitItem.color === FRUITS_INFO.PARALYSIS) {
        snakeWillMove = false;
      }

      // SI LA FRUTA CONSUMIDA NO TIENE EFECTO DE CIERRE DE PAREDES:
      if (fruitItem.color.effect !== "kill-snake" && fruitItem.color.effect !== "close-walls") {
        const fruitsToAdd = LEVELS_INFO[`LEVEL_${level}`].addedFruitsInConsumption;
        for (let i = 0; i < fruitsToAdd; i++) {
          // SE GENERA UNA NUEVA COMIDA:
          const newFruit = { ...manageFruitGeneration(level, newSnake) };
          // SE AÑADE LA FRUTA:
          handleAddFruit(newFruit, setFruits);
        }
      }

      // SE GUARDA LA FRUTA EN fruitsEaten para la puntuación final:
      setFruitsEaten((prevFruitsEaten) => {
        return {
          ...prevFruitsEaten,
          [fruitItem.color.name.toUpperCase()]:
            prevFruitsEaten[fruitItem.color.name.toUpperCase()] + 1,
        };
      });

      // Si se ha encontrado una fruta, se sale del bucle:
      break;
    }
  }

  if (snakeWillMove) {
    // SE ACTUALIZA LA CABEZA DE LA SERPIENTE:
    newSnake[0] = newHead;
  }

  return newSnake;
};

export default fruitConsumption;
