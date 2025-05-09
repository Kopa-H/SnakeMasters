/// PROBABILITIES IN ALL LEVELS ///

import { FruitInfo } from "../interfaces/fruit";

interface FruitsInfo {
  [key: string]: FruitInfo;
}

const FRUITS_INFO: FruitsInfo = {
  // GRASS FRUIT:
  GRASS: {
    name: "Grass",
    colorHex: "#228B22",
    lifeExpectancy: 10, // in seconds
    effect: "none",
    effectDuration: 0,
    value: 1,
    enlargeSnake: true,
    emoji: "🌿",
    description:
      "The grass fruit is a frequent find! It grants you 1 point and makes you grow 1 unit.",
  },

  // SPIKY FRUIT:
  SPIKY: {
    name: "Spiky",
    colorHex: "#FF0040",
    lifeExpectancy: 5,
    effect: "burn-tail",
    effectDuration: 0,
    value: -1,
    enlargeSnake: false,
    emoji: "🔥",
    description:
      "Look out! The spiky fruit is fiery and will burn your tail, making you lose 1 point!",
  },

  // GOLD FRUIT:
  GOLD: {
    name: "Gold",
    colorHex: "#FFD700",
    lifeExpectancy: 2,
    effect: "none",
    effectDuration: 0,
    value: 0,
    enlargeSnake: false,
    emoji: "💰",
    description:
      "Here we have an authentic treasure. It gives you 0 points in-game but it's worth 5$. Don't forget to check out the skins shop!",
  },

  // CHEETA FRUIT:
  CHEETA: {
    name: "Cheeta",
    colorHex: "#0000FF",
    lifeExpectancy: 4,
    effect: "speed-up",
    effectDuration: 3,
    value: 2,
    enlargeSnake: true,
    emoji: "🐆",
    description:
      "The cheetah fruit speeds things up for 3 seconds. Perfect for the more intrepid. You get 2 points and grow 1 unit.",
  },

  // CASTLE FRUIT:
  CASTLE: {
    name: "Castle",
    colorHex: "#483D8B",
    lifeExpectancy: 4,
    effect: "close-walls",
    effectDuration: 3,
    value: 2,
    enlargeSnake: true,
    emoji: "🏰",
    description:
      "The castle fruit raises walls of death fruits around the game board for 3 seconds, meaning you cannot cross the edges. You get 2 points and grow 1 unit.",
  },

  // DRAGON FRUIT:
  DRAGON: {
    name: "Dragon",
    colorHex: "#9966CC",
    lifeExpectancy: 3,
    effect: "become-inmortal",
    effectDuration: 3,
    value: 1,
    enlargeSnake: true,
    emoji: "🐉",
    description:
      "The dragon fruit makes you inmortal for 3 seconds. You get 1 point and grow 1 unit.",
  },

  // DEATH FRUIT:
  DEATH: {
    name: "Death",
    colorHex: "#000000",
    lifeExpectancy: 3,
    effect: "kill-snake",
    effectDuration: 0,
    value: -3,
    enlargeSnake: false,
    emoji: "💀",
    description:
      "The death fruit kills you instantly. You lose 3 points and the game is over. Don't even think about it...",
  },

  // CRAZY FRUIT:
  CRAZY: {
    name: "Crazy",
    colorHex: "#CD5C5C",
    lifeExpectancy: 4,
    effect: "invert-controls",
    effectDuration: 3,
    value: 2,
    enlargeSnake: true,
    emoji: "🤪",
    description:
      "The crazy fruit inverts your controls for 3 seconds. It's fun until it's not. You get 2 points and grow 1 unit.",
  },

  // PARALYSIS FRUIT:
  PARALYSIS: {
    name: "Paralysis",
    colorHex: "#FFFFFF",
    lifeExpectancy: 5,
    effect: "stop-snake",
    effectDuration: 2,
    value: 0,
    enlargeSnake: false,
    emoji: "🛑",
    description:
      "The paralysis fruit stops you for 2 seconds. You don't get points and you don't grow, but it gives you the opportunity to think about your life choices.",
  },

  // RANDOM FRUIT:
  RANDOM: {
    name: "Random",
    colorHex: "#FF00FF",
    lifeExpectancy: 4,
    effect: "random-effect",
    effectDuration: 0,
    value: 0,
    enlargeSnake: false,
    emoji: "🎲",
    description:
      "The random fruit invokes an army of fruits. They can be good or they can be bad... discover yourself! You don't get points and you don't grow.",
  },

    // GOAL FRUIT (USED EXCLUSIVELY IN CHALLENGES):
    GOAL: {
      name: "Goal",
      colorHex: "#8a2be2",
      lifeExpectancy: 10, // in seconds
      effect: "none",
      effectDuration: 0,
      value: 0,
      enlargeSnake: false,
      emoji: "📍",
      description:
        "The goal fruit is the objective of the challenge. It doesn't give you points, but it's the key to win the challenge.",
    },
};

export default FRUITS_INFO;
