import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import LEVELS_INFO from "../../components/SnakeGame/Parameters/levels_info";

import getAccessToken from "../../api/utilities/getAccessToken";
import getUserLevelAndActiveSkin from "../../api/fetchInfo/getUserLevelAndSkin";
import { useEffect, useState } from "react";

import MainTitle from "../../components/Title/MainTitle";

import "./styles.css";
import CHALLENGES_INFO from "../../components/SnakeGame/Parameters/challenges_info";

const LoginElements = () => {
  const navigate = useNavigate();

  function handleUserProfile() {
    navigate("/user-profile");
  }

  function handleFruitsInfo() {
    navigate("/fruits-info");
  }

  function handleSkinsShop() {
    navigate("/skins-shop");
  }

  function handleLevelNavigation(levelKey: string) {
    const level = levelKey.split("_")[1];
    navigate(`/level/${level}`);
  }

  function handleChallengeNavigation(challengeKey: number) {
    navigate(`/challenge/${challengeKey}`);
  }

  /* <-- SE OBTIENEN LOS DATOS DEL USUARIO AL CARGAR EL COMPONENTE --> */
  const [userLevelAndSkin, setUserLevelAndSkin] = useState({
    maxLevel: 1,
    activeSkin: "",
  });

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
    };
    fetchUserLevelAndActiveSkin();
  }, []);

  function handleTitleClick() {
    window.location.reload();
  }

  return (
    <>
      {/* Título principal de la página */}
      <MainTitle
        className={"home-main-title"}
        rotate={true}
        onClick={handleTitleClick}
      ></MainTitle>

      <div className="top-right-buttons">
        {/* Botón de User-Profile */}
        <Button
          content="User Profile"
          className="user-profile-button button"
          background={"linear-gradient(to right, #FF4500, #FF8C00)"}
          onClick={handleUserProfile}
        ></Button>
      </div>

      <div className="bottom-left-buttons">
        {/* Botón de Fruits-Info */}
        <Button
          content="Fruits Info"
          className="fruits-info-button button"
          onClick={handleFruitsInfo}
        ></Button>

        {/* Botón de Skins-Shop */}
        <Button
          content="Skins Shop"
          className="skins-shop-button button"
          onClick={handleSkinsShop}
        ></Button>
      </div>

      <div className="bottom-right-buttons">
        {/* Botón de Top Players */}
        <Button
          content="Top Players"
          className="top-players-button button"
          onClick={() => navigate("/top-players")}
        ></Button>
      </div>

      {/* GRID DE NIVELES y CHALLENGES */}
      <div className="levels-grid">
        {/* Obtén el userMaxLevel solo una vez */}
        {(() => {
          const userMaxLevel = userLevelAndSkin.maxLevel;

          // Mapeo de niveles
          const levelsButtons = Object.keys(LEVELS_INFO).map((levelKey) => {
            const currentLevel = parseInt(levelKey.split("_")[1]);

            // Si el jugador no ha alcanzado este nivel, se deshabilita el botón
            const disabled = userMaxLevel < currentLevel;

            return (
              <Button
                key={levelKey}
                content={`Level ${currentLevel}`}
                className="level-item button"
                background={disabled ? "#808080" : "#FF4500"}
                onClick={
                  disabled ? undefined : () => handleLevelNavigation(levelKey)
                }
              />
            );
          });

          // Mapeo de desafíos
          const challengesButtons: JSX.Element[] = CHALLENGES_INFO.map(
            (challenge) => {
              // Lógica para determinar si el jugador ha alcanzado este desafío (si no lo ha alcanzado, deshabilitar el botón)
              const disabled = userMaxLevel < challenge.id + 4;

              return (
                <Button
                  key={challenge.id}
                  content={challenge.name}
                  className="level-item button"
                  background={disabled ? "#808080" : "#FF8C00"}
                  onClick={
                    disabled
                      ? undefined
                      : () => handleChallengeNavigation(challenge.id)
                  }
                />
              );
            }
          );

          return (
            <>
              {/* Suponiendo que levelsButtons está definido en otro lugar */}
              {levelsButtons}
              {challengesButtons}
            </>
          );
        })()}
      </div>
    </>
  );
};

export default LoginElements;
