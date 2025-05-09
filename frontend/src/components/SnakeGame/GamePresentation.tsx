import GameBoard from "./GameBoard.tsx";
import MainTitle from "../Title/MainTitle.tsx";

import GameOver from "./GameOver/GameOver.tsx";
import getGameScore from "./GameOver/getScore.ts";
import getAccessToken from "../../api/utilities/getAccessToken.ts";

import { useEffect, useState, useCallback } from "react";
import getUserLevelAndActiveSkin from "../../api/fetchInfo/getUserLevelAndSkin.ts";
import getUserGameRecord from "../../api/fetchInfo/getUserRecord.ts";

import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store.tsx";
import { useDispatch, useSelector } from "react-redux";
import { hideGameOver } from "../../redux/actions/actions.ts";
import { startGame } from "../../redux/actions/actions.ts";

import manageGameLogic from "./GameLogic/gameLogic.ts";
import ShowTextAnimation from "./GameOver/showTextAnimation.tsx";

import "./styles/buttonControls.css";
import "./styles/secondaryElements.css";
import "./styles/responsive.css";

import setPageHeader from "../../utilities/setPageHeader.ts";
import { EXECUTION_ENVIRONMENT } from "../../config/config.ts";
import { FruitInfo } from "./interfaces/fruit.ts";
import FRUITS_INFO from "./Parameters/fruit_info.ts";

interface Props {
  isChallengeMode: boolean;
  level: number;
  challenge?: number;
  onGameScoreChange?: (score: number) => void;
  centerInPage?: boolean;
}

const findFruitByEmoji = (emoji: string): FruitInfo | null => {
  // Recorre los valores de FRUITS_INFO para encontrar el emoji
  for (const key in FRUITS_INFO) {
    if (FRUITS_INFO[key].emoji === emoji) {
      return FRUITS_INFO[key]; // Retorna el objeto de la fruta encontrada
    }
  }
  return null; // Si no se encuentra, devuelve null
};

const GamePresentation = ({
  isChallengeMode,
  level,
  onGameScoreChange,
  centerInPage,
}: Props) => {
  const nagivate = useNavigate();
  const dispatch = useDispatch();

  setPageHeader(`Snake Masters - Level ${level}`);

  // SE OBTIENE EL ESTADO DE SI EL JUEGO TERMINÓ EN REDUX:
  const isGameOver = useSelector((state: RootState) => state.game.isGameOver);
  const isGameRunning = useSelector(
    (state: RootState) => state.game.isGameRunning
  );

  /* <-- SE OBTIENEN LOS DATOS DEL USUARIO AL CARGAR EL COMPONENTE --> */
  const [userLevelAndSkin, setUserLevelAndSkin] = useState({
    maxLevel: 1,
    activeSkin: "",
  });

  const [startButtonVisible, setStartButtonVisible] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);
  const [activeFruitEffects, setActiveFruitEffects] = useState<string[]>([]);

  const [challengeWon, setChallengeWon] = useState(false);

  // SE OBTIENE EL NIVEL DE USUARIO Y LA SKIN ACTIVA
  useEffect(() => {
    const fetchUserLevelAndActiveSkin = async () => {
      // Valores predeterminados
      let userLevelAndSkin = { maxLevel: 1, activeSkin: "🥳" };

      // Si el user está loggeado se obtienen los datos del usuario:
      const accessToken = getAccessToken();
      if (accessToken) {
        userLevelAndSkin = await getUserLevelAndActiveSkin();
      }

      // Se actualiza el estado de userLevelAndSkin:
      setUserLevelAndSkin(userLevelAndSkin);

      // Si el usuario no ha alcanzado el nivel del juego, se le redirige a la página de inicio:
      if (!userLevelAndSkin || userLevelAndSkin.maxLevel < level) {
        console.log("You are not allowed to play this level yet!");
        nagivate("/home");
      }
    };
    fetchUserLevelAndActiveSkin();
  }, []);

  // SE OBTIENE EL RECORD DEL NIVEL ACTUAL:
  const [userGameRecord, setUserGameRecord] = useState<any | null>(null);
  useEffect(() => {
    const fetchUserGameRecord = async () => {
      try {
        const value = await getUserGameRecord(level);

        if (!value) {
          // Debería hacerse un if para no mostrar error si el user está en Home y no está loggeado:
          // console.error("Error al obtener los datos de los Game Records");
          return;
        }

        setUserGameRecord(value.maxScore);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserGameRecord();
  }, []);

  // SE INICIALIZA EL GAME_OVER EN FALSE
  useEffect(() => {
    dispatch(hideGameOver(isGameOver));
  }, []);

  // SE MANEJA LA LÓGICA DEL JUEGO
  const {
    snake,
    fruits,
    fruitsEatenToSend: fruitsEaten,
    gameFps,
    setDirectionButtonPressed,
  } = manageGameLogic(
    isChallengeMode,
    level,
    setCurrentScore,
    setActiveFruitEffects,
    setChallengeWon,
    onGameScoreChange
  );

  // FUNCION PARA ALTERNAR ENTRE CONTROL TÁCTIL O POR BOTONES:
  const [controlsOption, setControlsOption] = useState("🕹️");
  const changeControls = () => {
    setControlsOption(controlsOption === "🕹️" ? "📲" : "🕹️");
  };

  // FUNCIONES PARA MANEJO DE LOS INPUTS POR BOTÓN
  const handleClickUp = useCallback(() => {
    setDirectionButtonPressed("UP");
  }, [setDirectionButtonPressed]);

  const handleClickLeft = useCallback(() => {
    setDirectionButtonPressed("LEFT");
  }, [setDirectionButtonPressed]);

  const handleClickRight = useCallback(() => {
    setDirectionButtonPressed("RIGHT");
  }, [setDirectionButtonPressed]);

  const handleClickDown = useCallback(() => {
    setDirectionButtonPressed("DOWN");
  }, [setDirectionButtonPressed]);

  const gameType = isChallengeMode ? "Challenge" : "Level";

  return (
    <>
      {/* TÍTULO PRINCIPAL */}
      {!isGameOver && !isGameRunning && (
        <MainTitle className="main-title-in-game" rotate={true}></MainTitle>
      )}

      {/* ANIMACIONES DE TEXTO */}
      {activeFruitEffects.map((effect) => (
        <ShowTextAnimation
          content={effect}
          size={"1.5rem"}
          color={findFruitByEmoji(effect)?.colorHex}
        />
      ))}

      {/* PANTALLA DEL JUEGO */}
      <div
        className={`game-screen ${
          isGameRunning && !isGameOver && controlsOption === "🕹️"
            ? "controls-visible"
            : ""
        }`}
        style={{
          top: centerInPage ? "50%" : "auto",
          left: centerInPage ? "50%" : "auto",
          transform: centerInPage ? "translate(-50%, -50%)" : "none",
        }}
      >
        {!isGameOver && isGameRunning && (
          <>
            {/* PUNTUACIÓN ACTUAL */}
            <div className="current-score">Score: {currentScore}p</div>

            {/* RECORD */}
            {userGameRecord !== null && !isChallengeMode && (
              <div className="game-record">
                Max Score: {userGameRecord !== undefined ? userGameRecord : "0"}
                p
              </div>
            )}

            {/* ACTIVE FRUIT EFFECTS */}
            <div className="active-fruit-effects">
              {activeFruitEffects.map((effect) => (
                <div key={effect} className="active-fruit-effect">
                  {effect}
                </div>
              ))}
            </div>

            {/* FPS */}
            {String(EXECUTION_ENVIRONMENT) === "development" && (
              <div className="fps-container">FPS: {Math.floor(gameFps)}</div>
            )}
          </>
        )}

        {/* INSTANCIA DEL TABLERO DEL JUEGO */}
        <GameBoard
          snake={snake.map((s) => ({ ...s }))}
          fruits={fruits.map((f) => ({ ...f }))}
          activeSkin={userLevelAndSkin.activeSkin}
        />

        {startButtonVisible && (
          <button
            className="start-game-button button"
            onClick={() => {
              dispatch(startGame(isGameRunning));
              setStartButtonVisible(false);
            }}
          >{`Play ${gameType} ${level}!`}</button>
        )}

        {/* MENSAJE DE GAME OVER*/}
        <div>
          {isGameOver && fruitsEaten && (
            <GameOver
              gameScore={getGameScore(fruitsEaten)}
              fruitsEaten={fruitsEaten}
              level={level}
              userGameRecord={userGameRecord}
              isChallengeMode={isChallengeMode}
              challengeWon={challengeWon}
            />
          )}
        </div>
      </div>

      {!isGameOver && isGameRunning && (
        <>
          {/* CONTROLS OPTION */}
          <div className="controls-option-container">
            <button className="controls-option" onClick={changeControls}>
              {controlsOption === "📲" ? "📲" : "🕹️"}
            </button>
          </div>

          {/* BUTTON CONTROLS */}
          <div
            className="button-controls-container"
            style={{ display: controlsOption !== "🕹️" ? "none" : "" }}
          >
            <button className="top-button" onClick={handleClickUp}>
              🔼
            </button>

            <div className="left-right-buttons">
              <button className="left-button" onClick={handleClickLeft}>
                ◀️
              </button>

              <button className="right-button" onClick={handleClickRight}>
                ▶️
              </button>
            </div>

            <button className="bottom-button" onClick={handleClickDown}>
              🔽
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default GamePresentation;
