import { FruitsEaten } from "../interfaces/fruit";
import FRUITS_INFO from "../Parameters/fruit_info";
import LEVELS_INFO from "../Parameters/levels_info";

import Button from "../../Button/Button";

import levelUpUser from "../../../api/userActions/levelUpUser";
import addCashToUser from "../../../api/userActions/addCashToUser";
import sumTotalScore from "../../../api/userActions/sumTotalScore";
import setNewRecord from "../../../api/userActions/setNewRecord";

import getFormattedDate from "../../../utilities/getFormattedDate";

import { useEffect, useState } from "react";

import "./GameOverStyle.css";
import ShowTextAnimation from "./showTextAnimation";
import CHALLENGES_INFO from "../Parameters/challenges_info";

const GameOver = ({
  gameScore,
  fruitsEaten,
  level,
  userGameRecord,
  isChallengeMode,
  challengeWon,
}: {
  gameScore: number;
  fruitsEaten: FruitsEaten;
  level: number;
  userGameRecord: number;
  isChallengeMode: boolean;
  challengeWon: boolean;
}) => {
  // Obtiene las puntuaciones mínimas para cada medalla
  const bronzeScore = LEVELS_INFO[`LEVEL_${level}`].scores.bronzeScore;
  const silverScore = LEVELS_INFO[`LEVEL_${level}`].scores.silverScore;
  const goldScore = LEVELS_INFO[`LEVEL_${level}`].scores.goldScore;

  // Obtiene los nombres de las frutas, sus colores y sus puntuaciones
  const [fruitsData, setFruitsData] = useState<
    { name: string; colorHex: string; score: number; emoji: string }[]
  >([]);
  const [cashEarned, setCashEarned] = useState(0);

  // Estado local que guarda el nuevo record
  const [newRecordNumber, setNewRecordNumber] = useState(0);

  function hexToRgb(hex: string) {
    hex = hex.replace("#", "");
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  useEffect(() => {
    // Si no se trata de un desafío (es un nivel convencional)
    if (isChallengeMode && challengeWon) {
      const challenge = CHALLENGES_INFO.find((c) => c.id === level);
      if (!challenge) {
        console.error(`Challenge with level ${level} not found.`);
        return;
      }

      setCashEarned(challenge.goldReward);

      addCashToUser(challenge.goldReward);

      // Sumamos la puntuación total al backend
      sumTotalScore(challenge.goldReward);

      return;
    }

    // Creamos un array temporal para almacenar los datos actualizados de las frutas
    const updatedFruitsData = [];
    let earnedCash = 0;

    // Iteramos sobre las frutas comidas
    for (const fruit in fruitsEaten) {
      const fruitInfo = FRUITS_INFO[fruit];
      const fruitScore = fruitsEaten[fruit];

      updatedFruitsData.push({
        name: fruitInfo.name,
        colorHex: fruitInfo.colorHex,
        score: fruitScore,
        emoji: fruitInfo.emoji,
      });

      if (fruit === "GOLD") {
        // Si es la fruta GOLD, añadimos dinero ganado
        earnedCash += fruitScore * 10;
      }
    }

    // Actualizamos los estados con los nuevos datos de las frutas y el dinero ganado
    setFruitsData(updatedFruitsData);

    setCashEarned(earnedCash);
    addCashToUser(earnedCash);

    // Sumamos la puntuación total al backend
    sumTotalScore(gameScore);

    // Si el user ha superado su record, este se actualiza en el backend:
    if (gameScore > userGameRecord) {
      // Se guarda el record en el backend
      const achievementDate = getFormattedDate();
      setNewRecord(level, gameScore, achievementDate);

      // Se invoca una animación para mostrar el nuevo record
      setNewRecordNumber(gameScore);
    } else {
      setNewRecordNumber(gameScore);
    }

    // Si gameScore es superior o igual a bronzeScore, enviar solicitud GET al backend para actualizar el nivel del usuario
    if (gameScore >= bronzeScore) {
      levelUpUser(level);
    }
  }, [challengeWon]);

  // Calcula el mensaje de éxito o fracaso
  let message = "😣You Lose!😣";
  if (gameScore >= bronzeScore) {
    if (gameScore >= silverScore) {
      if (gameScore >= goldScore) {
        message = "🥇 GOLD MEDAL 🥇";
      } else {
        message = "🥈 SILVER MEDAL 🥈";
      }
    } else {
      message = "🥉 BRONZE MEDAL 🥉";
    }
  }

  if (challengeWon) {
    message = "🎉 Challenge Completed! 🎉";
  }

  return (
    <>
      {/* ANIMACIÓN DE TEXTO */}
      {newRecordNumber > 0 && (
        <ShowTextAnimation content={String(newRecordNumber)} duration={5000} />
      )}

      <div className="game-over-container">
        {/* GAME OVER TITLE */}
        <label className="game-over-title">Game Over!</label>

        {/* STATISTICS CONTAINER */}
        <div className="statistics-container">
          {/* FRUITS EATEN CONTAINER */}
          <div className="fruits-eaten-container">
            {/* FRUITS EATEN TITLE */}
            <div className="fruits-eaten-title-container">
              <label className="fruits-eaten-title">Fruits Eaten</label>
            </div>

            {/* FRUITS EATEN GRID */}
            <div className="fruits-eaten-grid">
              {/* Renderiza las frutas y sus puntuaciones */}
              {fruitsData.map(
                (fruit, index) =>
                  fruit.emoji !== "📍" && (
                    <div key={index} className="fruits-eaten-row">
                      <div
                        className="fruits-eaten-color"
                        style={{
                          background: `linear-gradient(to bottom, ${
                            fruit.colorHex
                          }, rgba(${hexToRgb(fruit.colorHex)}, 0.5))`,
                        }}
                      >
                        {fruit.emoji}
                      </div>
                      <div className="fruits-eaten-score">{fruit.score}</div>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* Agrega "Final Score" y la puntuación final */}
          <div className="final-score-container">
            {/* GRID DE MEDALLAS Y PUNTUACIONES MÍNIMAS */}
            {!isChallengeMode && (
              <div className="medals-grid">
                {/* Renderiza las medallas y las puntuaciones mínimas */}
                {["🥉", "🥈", "🥇"].map((medal, index) => (
                  <div key={index} className="medals-row">
                    <div className="medals-cell">{medal}</div>
                    <div className="medals-cell">
                      {[bronzeScore, silverScore, goldScore][index]}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <label className="final-score-label">Final Score:</label>
            <label className="game-score-value">
              {isChallengeMode ? cashEarned : gameScore} p🥳
            </label>

            <label className="cash-earned-label">Cash Earned:</label>
            <label className="cash-earned-value">{cashEarned} $</label>

            <div className="restart-game-button-container">
              <Button
                className="restart-game-button"
                content="🔁"
                onClick={() => {
                  window.location.reload();
                }}
              ></Button>
            </div>
          </div>
        </div>
        {/* MENSAJE DE ÉXITO / FRACASO */}
        <div className="message-container">
          <label className="message">{message}</label>
        </div>
      </div>
    </>
  );
};

export default GameOver;
