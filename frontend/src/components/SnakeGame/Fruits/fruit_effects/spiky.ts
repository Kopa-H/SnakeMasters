// BURN TAIL EFFECT:

import FRUITS_INFO from "../../Parameters/fruit_info";
import { SnakeSegment } from "../../interfaces/snake";

const activateBurnTailEffect = (
  snake: SnakeSegment[],
  setSnake: (snake: SnakeSegment[]) => void
) => {
  // Se clona la serpiente actual
  let newSnake = [...snake];

  // Se quema la cola:
  for (let i = newSnake.length - 1; i >= 0; i--) {
    if (newSnake[i].color !== FRUITS_INFO.SPIKY.colorHex) {
      newSnake[i].color = FRUITS_INFO.SPIKY.colorHex;
      break;
    }
  }

  // Se actualiza la serpiente
  setSnake(newSnake);
};

export default activateBurnTailEffect;
