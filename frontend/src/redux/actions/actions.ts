// actions.js

import {
  START_GAME,
  STOP_GAME,
  SHOW_GAME_OVER,
  HIDE_GAME_OVER
} from './actionTypes';

// INICIAR SNAKE GAME
export const startGame = (isGameRunning: boolean) => ({
  type: START_GAME,
  payload: isGameRunning,
});

// DETENER SNAKE GAME
export const stopGame = (isGameRunning: boolean) => ({
  type: STOP_GAME,
  payload: isGameRunning,
})

// MOSTRAR GAME OVER
export const showGameOver = (isGameOver: boolean) => ({
  type: SHOW_GAME_OVER,
  payload: isGameOver,
})

// OCULTAR GAME OVER
export const hideGameOver = (isGameOver: boolean) => ({
  type: HIDE_GAME_OVER,
  payload: isGameOver,
})

export default { startGame, stopGame, showGameOver, hideGameOver }
