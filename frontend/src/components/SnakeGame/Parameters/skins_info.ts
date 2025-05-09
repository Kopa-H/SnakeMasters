/// PROBABILITIES IN ALL LEVELS ///

// INTERFAZ DE UNA SKIN:
interface SkinInfo {
  name: string;
  content: string;
  price: number;
  description?: string;
}

// INTERFAZ DE TODAS LAS SKINS:
interface SkinsInfo {
  [key: string]: SkinInfo;
}

const SKINS_INFO: SkinsInfo = {
  // DEFAULT SKIN:
  DEFAULT: {
    name: "default",
    content: "😙",
    price: 0,
    description: "none",
  },

  // COOL SKIN:
  COOL: {
    name: "cool",
    content: "😎",
    price: 50,
    description: "It's useless, but it looks really cool!",
  },

  // CRAZY SKIN:
  CRAZY: {
    name: "crazy",
    content: "🤩",
    price: 75,
    description: "Each crazy fruit consumed give 2 extra points.",
  },

  // ARMOR SKIN:
  ARMOR: {
    name: "armor",
    content: "🛡️",
    price: 100,
    description: "The first two spiky fruits consumed in a game won't harm the snake.",
  },

  // BOLT SKIN:
  BOLT: {
    name: "bolt",
    content: "🚀",
    price: 100,
    description: "Cheetah fruits will grant 2 extra points, and the speed boost provided by the fruit will increase by 20%.",
  },

  // SPECTATOR SKIN:
  SPECTATOR: {
    name: "spectator",
    content: "👁️",
    price: 125,
    description: "Paralysis fruits will now give 1 extra point.",
  },

  // WARRIOR SKIN:
  WARRIOR: {
    name: "warrior",
    content: "⚔️",
    price: 125,
    description: "Castle fruit effect won't cover the entire game board. It will also give 2 extra points each.",
  },

  // STONED SKIN:
  STONED: {
    name: "stoned",
    content: "🗿",
    price: 125,
    description: "The snake will move 20% slower, but the snake will grow faster.",
  },

  // UNBALANCED SKIN:
  UNBALANCED: {
    name: "unbalanced",
    content: "🤹",
    price: 150,
    description: "Grass fruits will give 1 extra point, but spiky fruits will take 3 extra points.",
  },

  // DRAGON SKIN:
  DRAGON: {
    name: "dragon",
    content: "🐲",
    price: 150,
    description: "Dragon fruits effect will last 2 extra seconds.",
  },

  // RICH SKIN:
  RICH: {
    name: "rich",
    content: "🤑",
    price: 500,
    description: "Each golden fruit consumed gives 2 extra of gold.",
  },

  // DEATH SKIN:
  DEATH: {
    name: "death",
    content: "💀",
    price: 750,
    description: "The first death fruit consumed in a game won't kill the snake.",
  },

  // GOD SKIN:
  GOD: {
    name: "god",
    content: "🧞‍♂️",
    price: 1500,
    description: "Combine the effects of multiple skins: armor, bolt, spectator, warrior, dragon, rich, and death.",
  },
};

export default SKINS_INFO;
