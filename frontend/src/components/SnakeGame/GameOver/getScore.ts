// getGameScore.ts

import { FruitsEaten } from "../interfaces/fruit";
import FRUIT_INFO from "../Parameters/fruit_info";

const getGameScore = (fruitsEaten: FruitsEaten) => {
  let gameScore = 0;

  // Se realiza la suma de todas las frutas:
  for (const fruit in fruitsEaten) {
    for (let i = 0; i < fruitsEaten[fruit]; i++) {
      gameScore += FRUIT_INFO[fruit].value;
    }
  }

  return gameScore;
};

export default getGameScore;
