// UnauthenticatedButtons.jsNoLoginElements
import Button from "../../components/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SnakeGamePresentation from "../../components/SnakeGame/GamePresentation";

// IMPORTACIONES DE REDUX
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "./styles.css";

const NoLoginElements = () => {
  const navigate = useNavigate();

  // SE OBTIENE LA VARIABLE DE SI EL JUEGO ESTÁ EN EJECUCIÓN
  const isGameRunning = useSelector(
    (state: RootState) => state.game.isGameRunning
  );

  // Se utiliza para enviar la puntuación a la página de registro para que se guarde!
  const [gameScore, setGameScore] = useState(0);

  // Función para actualizar gameScore
  function handleGameScoreChange(score: number) {
    setGameScore(score);
  }

  function handleSingUp() {
    navigate(`/register?gameScore=${gameScore}`);
  }

  function handleLogIn() {
    navigate("/login");
  }

  return (
    <>
      {/* Presentación del juego de la serpiente */}
      <SnakeGamePresentation
        level={1}
        onGameScoreChange={handleGameScoreChange}
      ></SnakeGamePresentation>

      {!isGameRunning && (
        <div className="top-right-buttons">
          <Button
            className="sign-up-button button"
            content="Sign-Up"
            onClick={handleSingUp}
          ></Button>
          <Button
            className="log-in-button button"
            content="Log-In"
            onClick={handleLogIn}
          ></Button>
        </div>
      )}
    </>
  );
};

export default NoLoginElements;
