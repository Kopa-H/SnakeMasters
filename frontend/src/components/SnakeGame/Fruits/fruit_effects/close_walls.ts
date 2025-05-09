import { SnakeSegment } from '../../interfaces/snake';
import { Fruit } from '../../interfaces/fruit';

import screenConfig from '../../Parameters/screen_info';
import FRUITS_INFO from '../../Parameters/fruit_info';

import addFruit from '../addFruit';

export let closeWallsState = false;

export const activateCloseWallsEffect = (
  durationInSeconds: number,
  snake: SnakeSegment[],
  setFruits: React.Dispatch<React.SetStateAction<Fruit[]>>,
  setActiveFruitEffects: React.Dispatch<React.SetStateAction<string[]>>,
) => {

  closeWallsState = true;

  const castleEmoji = FRUITS_INFO.CASTLE.emoji;
  setActiveFruitEffects((prev) => {
    if (!prev.includes(castleEmoji)) {
      return [...prev, castleEmoji];
    }
    return prev;
  });

  // SE AÑADEN DEATH FRUITS CON DURACIÓN EN PANTALLA DE CASTLE FRUIT:
  const deathFruitColor = FRUITS_INFO.DEATH;
  deathFruitColor.lifeExpectancy = FRUITS_INFO.CASTLE.effectDuration;

  for (let i = 0; i < screenConfig.rows; i++) {
    for (let j = 0; j < screenConfig.columns; j++) {
      if (i === 0 || j === 0 || i === screenConfig.rows - 1 || j === screenConfig.rows - 1) {
        if (!snake.some(segment => segment.x === i && segment.y === j)) {
          const newFruit: Fruit = {
            x: i,
            y: j,
            color: deathFruitColor,
          };
          addFruit(newFruit, setFruits);
        }
      }
    }
  }

  setTimeout(() => {
    closeWallsState = false;
    setActiveFruitEffects((prev) => prev.filter(effect => effect !== castleEmoji));
  }, durationInSeconds * 1000);
};