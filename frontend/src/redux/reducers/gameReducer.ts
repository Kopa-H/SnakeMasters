// reducer.js

/*
Los reducers son responsables de actualizar partes específicas
del estado de la aplicación en función del tipo de acción que se recibe.
*/

import {
  START_GAME,
  STOP_GAME,
  SHOW_GAME_OVER,
  HIDE_GAME_OVER
} from '../actions/actionTypes';

interface Action {
  type: string;
  payload?: any; // Opcional: contiene datos adicionales relevantes para la acción
}

const initialState = {
  isGameRunning: false,
  isGameOver: false
};

const gameReducer = (state = initialState, action: Action) => {

  switch (action.type) {

    case START_GAME:
      return {
        ...state,
        isGameRunning: true
      };

    case STOP_GAME:
      return {
        ...state,
        isGameRunning: false
      };

      case SHOW_GAME_OVER:
      return {
        ...state,
        isGameOver: true
      };

      case HIDE_GAME_OVER:
      return {
        ...state,
        isGameOver: false
      };

    default:
      return state;
  }
};

export default gameReducer;