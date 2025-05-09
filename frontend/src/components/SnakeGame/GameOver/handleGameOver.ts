
import getGameScore from "./getScore";
import { stopGame } from "../../../redux/actions/actions";
import { showGameOver } from "../../../redux/actions/actions";
import { FruitsEaten } from "../interfaces/fruit";
import { Dispatch } from "redux";

function handleGameOver(dispatch: Dispatch, isGameRunning: boolean, fruitsEaten: FruitsEaten, onGameScoreChange: (score: number) => void) {
    dispatch(stopGame(isGameRunning));

    // SE OBTIENE LA PUNTUACIÓN DEL JUEGO:
    const gameScore = getGameScore(fruitsEaten);
    // Se actualiza la puntuación del juego en la página, para mandarse al register:
    if (onGameScoreChange) {
      onGameScoreChange(gameScore);
    }

    // Se activa el game over en REDUX:
    dispatch(showGameOver(true));
}

export default handleGameOver;