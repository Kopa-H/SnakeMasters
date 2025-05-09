
import screenConfig from "../Parameters/screen_info";
import { SnakeSegment } from "../interfaces/snake";

const moveSnake = ( snake: SnakeSegment[], direction: string, isGameRunning: boolean) => {
    let selfCollision = false;

    // Se clona la serpiente actual
    let newSnake = [...snake];

    // Se clona la cabeza de la serpiente
    let newHead = { ...newSnake[0] };

    // Mueve la cabeza de la serpiente según la dirección actual
    switch (direction) {
      case "UP":
        newHead.y = newHead.y === 0 ? screenConfig.rows - 1 : newHead.y - 1;
        break;
      case "DOWN":
        newHead.y = newHead.y === screenConfig.rows - 1 ? 0 : newHead.y + 1;
        break;
      case "LEFT":
        newHead.x =
          newHead.x === 0 ? screenConfig.columns - 1 : newHead.x - 1;
        break;
      case "RIGHT":
        newHead.x =
          newHead.x === screenConfig.columns - 1 ? 0 : newHead.x + 1;
        break;
      default:
        break;
    }

    // SE MUEVE EL CUERPO DE LA SERPIENTE 1 POSICIÓN HACIA ADELANTE:
    for (let i = newSnake.length - 1; i > 0; i--) {
      newSnake[i].x = newSnake[i - 1].x;
      newSnake[i].y = newSnake[i - 1].y;

      // SI HAY UNA COLISIÓN CON EL CUERPO DE LA SERPIENTE:
      if (newHead.x === newSnake[i].x && newHead.y === newSnake[i].y) {
        if (isGameRunning) {
          selfCollision = true;
        }
      }
    }

    return { newSnake, newHead, selfCollision };
};

export default moveSnake;