/// PROBABILITIES IN ALL LEVELS ///

import { FruitInfo } from "../interfaces/fruit";
import FRUITS_INFO from "./fruit_info";

// Define la interfaz de la información del nivel
interface LevelInfo {
  initialFruit: FruitInfo;
  snakeSpeed: number;
  scores: {
    bronzeScore: number;
    silverScore: number;
    goldScore: number;
  };
  secondsForNewFruit: number;
  addedFruitsInConsumption: number;
  maxFruitsInScreen: number;
  probabilities: {
    [key: string]: number; // Firma de índice para las probabilidades
  };
}

interface LevelsInfo {
  [key: string]: LevelInfo;
}


const LEVELS_INFO: LevelsInfo = {
  // FIRST LEVEL:
  LEVEL_1: {
    initialFruit: FRUITS_INFO.GRASS,
    snakeSpeed: 250,
    scores: {
      bronzeScore: 20,
      silverScore: 30,
      goldScore: 40,
    },
    secondsForNewFruit: 5,
    addedFruitsInConsumption: 1,
    maxFruitsInScreen: 3,
    probabilities: {
      // in %:
      grass: 55,
      spiky: 25,
      gold: 20,
    },
  },

  // SECOND LEVEL:
  LEVEL_2: {
    initialFruit: FRUITS_INFO.CHEETA,
    snakeSpeed: 240,
    scores: {
      bronzeScore: 20,
      silverScore: 30,
      goldScore: 40,
    },
    secondsForNewFruit: 5,
    addedFruitsInConsumption: 1,
    maxFruitsInScreen: 3,
    probabilities: {
      grass: 50,
      spiky: 20,
      gold: 10,
      cheeta: 10,
      castle: 10,
    },
  },

  // THIRD LEVEL:
  LEVEL_3: {
    initialFruit: FRUITS_INFO.CASTLE,
    snakeSpeed: 230,
    scores: {
      bronzeScore: 20,
      silverScore: 30,
      goldScore: 40,
    },
    secondsForNewFruit: 4,
    addedFruitsInConsumption: 1,
    maxFruitsInScreen: 4,
    probabilities: {
      grass: 50,
      spiky: 20,
      gold: 10,
      cheeta: 10,
      castle: 5,
      dragon: 5,
    },
  },

  // FOURTH LEVEL:
  LEVEL_4: {
    initialFruit: FRUITS_INFO.DRAGON,
    snakeSpeed: 220,
    scores: {
      bronzeScore: 20,
      silverScore: 30,
      goldScore: 40,
    },
    secondsForNewFruit: 3,
    addedFruitsInConsumption: 1,
    maxFruitsInScreen: 4,
    probabilities: {
      grass: 40,
      spiky: 15,
      gold: 10,
      cheeta: 5,
      castle: 5,
      dragon: 10,
      death: 15,
    },
  },

  // FIVETH LEVEL:
  LEVEL_5: {
    initialFruit: FRUITS_INFO.CRAZY,
    snakeSpeed: 210,
    scores: {
      bronzeScore: 20,
      silverScore: 30,
      goldScore: 40,
    },
    secondsForNewFruit: 3,
    addedFruitsInConsumption: 1,
    maxFruitsInScreen: 5,
    probabilities: {
      grass: 35,
      spiky: 10,
      gold: 10,
      cheeta: 5,
      castle: 5,
      dragon: 10,
      death: 15,
      crazy: 10,
      paralysis: 10,
    },
  },

  // SIXTH LEVEL:
  LEVEL_6: {
    initialFruit: FRUITS_INFO.RANDOM,
    snakeSpeed: 200,
    scores: {
      bronzeScore: 20,
      silverScore: 30,
      goldScore: 40,
    },
    secondsForNewFruit: 2,
    addedFruitsInConsumption: 2,
    maxFruitsInScreen: 5,
    probabilities: {
      grass: 35,
      spiky: 5,
      gold: 10,
      cheeta: 5,
      castle: 5,
      dragon: 10,
      death: 5,
      crazy: 5,
      paralysis: 5,
      random: 15,
    },
  },
};

export default LEVELS_INFO;