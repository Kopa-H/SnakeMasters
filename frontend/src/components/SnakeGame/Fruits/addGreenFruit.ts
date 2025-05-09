import LEVELS_INFO from "../Parameters/levels_info";

import { SnakeSegment } from "../interfaces/snake";
import { Fruit } from "../interfaces/fruit";

import { generateGrassFruit } from "./fruitGenerator";
import handleAddFruit from "./addFruit";

function useAddGreenFruitsLogic(isGameRunning: boolean, fruits: Fruit[], snake: SnakeSegment[], level: number, setFruits: any) {
    if (!isGameRunning || fruits.length >= LEVELS_INFO[`LEVEL_${level}`].maxFruitsInScreen) {
        return;
    }

    let justBadFruits = false;
    for (let i = 0; i < fruits.length; i++) {
        if (
            fruits[i].color.name !== "Spiky" &&
            fruits[i].color.name !== "Death"
        ) {
            justBadFruits = false;
            return;
        }
        justBadFruits = true;
    }

    if (fruits.length < 1 || justBadFruits) {
        const fruitsToAdd = LEVELS_INFO[`LEVEL_${level}`].addedFruitsInConsumption;
        for (let i = 0; i < fruitsToAdd; i++) {
            const grassFruit = generateGrassFruit(snake);
            if (grassFruit) handleAddFruit(grassFruit, setFruits);
        }
    }
  }

export default useAddGreenFruitsLogic;