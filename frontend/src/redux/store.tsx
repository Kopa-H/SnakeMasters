/*
 El store en Redux es un objeto que contiene el estado global de tu aplicación.
Es el único lugar donde reside el estado de toda la aplicación.
*/

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import gameReducer from "./reducers/gameReducer";

// Tipos del estado global
export interface GameState {
  isGameRunning: boolean;
  isGameOver: boolean;
}

// Estructura del estado global:
export interface RootState {
  game: GameState;
}

const rootReducer = combineReducers({
  game: gameReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: false,
});
export type AppDispatch = typeof store.dispatch;

export default store;
