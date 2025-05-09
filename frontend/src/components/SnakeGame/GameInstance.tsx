// IMPORTACIONES DE COMPONENTES
import Particles from "../SpecialEffects/Particles";
import SnakeGamePresentation from "./GamePresentation";

// IMPORTACIONES DE ESTILOS
import { useParams, Navigate } from "react-router-dom";
import LEVELS_INFO from "./Parameters/levels_info";
import CHALLENGES_INFO from "./Parameters/challenges_info";

import "./styles/levels.css";
import "../../components/SpecialEffects/Particles.css";

// Funcion que ajusta la velocidad de la serpiente si el usuario juega con teclado (+ sencillo, + velocidad):
function handleFirstKeydown(): void {
  Object.keys(LEVELS_INFO).forEach((levelKey) => {
    const currentLevel = LEVELS_INFO[levelKey];
    const updatedLevel = {
      ...currentLevel,
      snakeSpeed: currentLevel.snakeSpeed * 0.8,
    };
    LEVELS_INFO[levelKey] = updatedLevel;
  });
  window.removeEventListener("keydown", handleFirstKeydown);
}

// Se agrega el eventListener para detectar la primera pulsación de cualquier tecla
window.addEventListener("keydown", handleFirstKeydown, { once: true });

// Define el máximo nivel y desafío
const MAX_LEVEL = Object.keys(LEVELS_INFO).length;
const MAX_CHALLENGE = Object.keys(CHALLENGES_INFO).length;

const GameInstance = () => {
  // Obtener el parámetro de la ruta ":level" y ":challenge"
  const isChallengeMode = window.location.pathname.includes("challenge");
  const { lvl = "", challenge = "" } = useParams();

  // Convertir el nivel y desafío a un número entero
  const levelNumber = parseInt(lvl);
  const challengeNumber = parseInt(challenge);

  // Verificar si el nivel está dentro del rango válido
  if (
    (lvl &&
      (isNaN(levelNumber) || levelNumber < 1 || levelNumber > MAX_LEVEL)) ||
    (challenge &&
      (isNaN(challengeNumber) ||
        challengeNumber < 1 ||
        challengeNumber > MAX_CHALLENGE))
  ) {
    return <Navigate to="/level-not-found" />;
  }

  return (
    <div className={`level-${levelNumber} challenge-${challengeNumber}`}>
      <Particles className="particles"></Particles>
      <SnakeGamePresentation
        isChallengeMode={isChallengeMode}
        level={levelNumber}
        challenge={challengeNumber}
      ></SnakeGamePresentation>
    </div>
  );
};

export default GameInstance;
