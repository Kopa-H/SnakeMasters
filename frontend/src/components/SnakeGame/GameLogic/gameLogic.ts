// MANAGES THE ENTIRE GAME LOGIC

import { useState, useEffect, useRef } from "react";
import { RootState } from "../../../redux/store";

import manageDirectionInputs from "./manageInputs";

// IMPORTACIONES PARA MANEJAR REDUX DESDE LA FUNCIÓN:
import { useSelector, useDispatch } from "react-redux";

import { SnakeSegment } from "../interfaces/snake";
import { Fruit, FruitsEaten } from "../interfaces/fruit";

import LEVELS_INFO from "../Parameters/levels_info";

import { invertedControlsState } from "../Fruits/fruit_effects/crazy";
import { speedUpState } from "../Fruits/fruit_effects/cheeta";
import { stopSnakeState } from "../Fruits/fruit_effects/paralysis";

// IMPORTACIÓN DE LA FUNCIÓN QUE AÑADE FRUTAS VERDES SI NO HAY FRUTAS VERDES EN PANTALLA:
import addGreenFruits from "../Fruits/addGreenFruit";

import moveSnake from "./moveSnake";

import manageFruitConsumption from "../Fruits/fruitConsumption";
import handleGameOver from "../GameOver/handleGameOver";

import { inmortalState } from "../Fruits/fruit_effects/dragon";

import { loadChallenge, manageChallengeCompletion } from "./loadChallenge";

const manageGameLogic = (
  isChallengeMode: boolean,
  level: number,
  setCurrentScore: React.Dispatch<React.SetStateAction<number>>,
  setActiveFruitEffects: React.Dispatch<React.SetStateAction<string[]>>,
  setChallengeWon: React.Dispatch<React.SetStateAction<boolean>>,
  onGameScoreChange?: any
) => {
  const dispatch = useDispatch();
  const [challengeGoal, setChallengeGoal] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // SE OBTIENE EL ESTADO DE GAME OVER:
  const isGameOver = useSelector((state: RootState) => state.game.isGameOver);
  // SE OBTIENE EL ESTADO DE JUEGO EN EJECUCIÓN:
  const isGameRunning = useSelector(
    (state: RootState) => state.game.isGameRunning
  );

  // SE INICIALIZA LA SERPIENTE CON 1 SEGMENTO EN LA POSICIÓN (2, 2) de color verde:
  const [snake, setSnake] = useState<SnakeSegment[]>([
    {
      x: 2,
      y: 2,
      color: "green",
    },
  ]);

  // SE INICIALIZA LA FRUTA EN LA POSICIÓN (5, 5):
  const [fruits, setFruits] = useState<Fruit[]>([]);
  useEffect(() => {
    const initialFruit: Fruit = {
      x: 5,
      y: 5,
      // Cada nivel tiene una fruta inicial diferente:
      color: LEVELS_INFO[`LEVEL_${level}`].initialFruit,
    };
    setFruits([initialFruit]);
  }, []);

  // SE CARGA EL CHALLENGE SI EL MODO DE JUEGO ES DESAFÍO:
  useEffect(() => {
    if (isChallengeMode) {
      loadChallenge(isChallengeMode, level, setFruits, setSnake, setChallengeGoal);
    }
  }, [isChallengeMode, level]);

  // SE INICIALIZA LA DIRECCIÓN DE LA SERPIENTE:
  const [direction, setDirection] = useState("RIGHT");

  // SE INICIALIZA EL INDICADOR DE MOVIMIENTO en false:
  const [hasMoved, setHasMoved] = useState(false);

  const [directionButtonPressed, setDirectionButtonPressed] = useState<string>("");

  // SE INICIALIZA EL ESTADO DE MUERTE POR FRUTA:
  const [snakeKilledByFruit, setSnakeKilledByFruit] = useState(false);

  // SE INICIALIZA EL ESTADO DEL TIEMPO TRANSCURRIDO PARA EL BUCLE DE JUEGO:
  const [gameFps, setGameFps] = useState(0);
  const lastExecution = useRef(0);
  const lastFrameTime = useRef(performance.now());

  // SE INICIALIZA EL ESTADO DE FRUTAS COMIDAS:
  const [fruitsEaten, setFruitsEaten] = useState<FruitsEaten>({
    GRASS: 0,
    SPIKY: 0,
    GOLD: 0,
    CHEETA: 0,
    CASTLE: 0,
    DRAGON: 0,
    DEATH: 0,
    CRAZY: 0,
    PARALYSIS: 0,
    RANDOM: 0,
  });

  function gameLoopLogic() {
    // MANEJAR MOVIMIENTO DE LA SERPIENTE
    let { newSnake, newHead, selfCollision } = moveSnake(snake, direction, isGameRunning);
    if (selfCollision && !inmortalState) handleGameOver(dispatch, isGameRunning, fruitsEaten, onGameScoreChange);

    // MANEJAR CONSUMO DE FRUTAS
    newSnake = manageFruitConsumption(fruits, newSnake, newHead, setSnake, setFruits, level, setCurrentScore, setActiveFruitEffects, setFruitsEaten, setSnakeKilledByFruit);

    // MANEJAR COMPLETITUD DE DESAFÍOS
    manageChallengeCompletion(newHead, challengeGoal, level, fruitsEaten, setCurrentScore, dispatch, onGameScoreChange, setChallengeWon);

    if (snakeKilledByFruit && !inmortalState) handleGameOver(dispatch, isGameRunning, fruitsEaten, onGameScoreChange);

    // SE ACTUALIZA EL CUERPO DE LA SERPIENTE:
    setSnake(newSnake);

    // SE ACTUALIZA EL INDICADOR DE MOVIMIENTO:
    setHasMoved(false);
  }

  // <--- SE LLAMA A LA FUNCIÓN PARA MANEJAR LOS DIRECTION INPUTS --->
  manageDirectionInputs(
    direction,
    directionButtonPressed,
    setDirectionButtonPressed,
    hasMoved,
    setDirection,
    setHasMoved,
    invertedControlsState,
  );

  // <--- SE AÑADE UNA FRUTA VERDE SI SOLAMENTE EXISTEN FRUTAS MALIGNAS --->
  if (!isChallengeMode) {
      addGreenFruits(isGameRunning, fruits, snake, level, setFruits);
  }

  // <--- LOGICS --->
  useEffect(() => {
    let gameLoopTimer: NodeJS.Timeout;
    const snakeSpeed = LEVELS_INFO[`LEVEL_${level}`].snakeSpeed;

    const gameLoop = () => {
      if (!isGameRunning) return;

      // Se obtiene el tiempo actual:
      const now = performance.now();
      // Se obtiene el tiempo transcurrido desde la última ejecución del bucle de juego:
      const elapsed = now - lastFrameTime.current;
      // Se actualiza el tiempo de la última ejecución del bucle de juego al momento actual:
      lastFrameTime.current = now;
      // Se actualiza el tiempo transcurrido desde el último movimiento de la serpiente:
      lastExecution.current += elapsed;

      if (!stopSnakeState && lastExecution.current > snakeSpeed || (speedUpState && lastExecution.current > snakeSpeed / 1.5)) {
        gameLoopLogic();
        lastExecution.current = 0;
      }

      // Se actualizan los Fps que ha tardado en ejecutarse el bucle:
      if (lastExecution.current > 150) setGameFps(elapsed);

      // Programar la próxima ejecución del bucle de juego: en 30ms
      gameLoopTimer = setTimeout(gameLoop, 30);
    };

    // Iniciar el bucle de juego
    gameLoop();

    // Limpieza: detener el bucle de juego si se detiene el juego
    return () => {
      clearTimeout(gameLoopTimer);
    };
  }, [isGameRunning, snake, direction, fruits]);

  // SOLO SE ENVÍA FRUITSEATEN SI EL JUEGO HA TERMINADO:
  const fruitsEatenToSend = isGameOver ? fruitsEaten : undefined;

  // Devuelve la serpiente y la comida.
  return { snake, fruits, fruitsEatenToSend, gameFps, setDirectionButtonPressed };
};

export default manageGameLogic;