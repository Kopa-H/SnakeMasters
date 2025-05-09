import { useEffect, useState } from "react";

import MainTitle from "../../components/Title/MainTitle";
import Button from "../../components/Button/Button";

import getTopPlayers from "../../api/fetchGeneralInfo/getTopPlayers";
import getHistoryPunctuation from "../../api/fetchGeneralInfo/getHistoryPunctuation";
import getGameRecords from "../../api/fetchGeneralInfo/getGameRecords";
import LEVELS_INFO from "../../components/SnakeGame/Parameters/levels_info";

// Define la interfaz para un jugador
interface TopPlayer {
  _id: string;
  username: string;
  totalScore: number;
  activeSkin: string;
}
interface TopPlayers {
  players: TopPlayer[];
}

interface GameRecord {
  _id: string;
  username: string;
  maxScore: number;
  achievementDate: String;
  activeSkin: string;
}

function TopPlayersComponent() {
  const [topPlayers, setTopPlayers] = useState<TopPlayers | null>(null);
  const [historyPunctuation, setHistoryPunctuation] = useState<any | null>(
    null
  );

  const [loadingTopPlayers, setLoadingTopPlayers] = useState<boolean>(true);
  const [loadingHistoryPunctuation, setLoadingHistoryPunctuation] =
    useState<boolean>(true);

  const [errorTopPlayers, setErrorTopPlayers] = useState<string | null>(null);
  const [errorHistoryPunctuation, setErrorHistoryPunctuation] = useState<
    string | null
  >(null);

  const [gameRecords, setGameRecords] = useState<GameRecord[][] | null>(null);
  // Se hace la petición al backend para obtener los datos de los records
  useEffect(() => {
    const fetchGameRecords = async () => {
      try {
        const gameRecordsData = await getGameRecords();

        if (!gameRecordsData) {
          setErrorTopPlayers("Error al obtener los datos de los top players");
          return;
        }

        setGameRecords(gameRecordsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGameRecords();
  }, []);

  const [gameRecordsIndex, setGameRecordsIndex] = useState<number>(0);

  function handlePrevGameRecords() {
    if (gameRecordsIndex === 0) {
      setGameRecordsIndex(Object.keys(LEVELS_INFO).length - 1);
    } else {
      setGameRecordsIndex((prev) => prev - 1);
    }
  }

  function handleNextGameRecords() {
    if (gameRecordsIndex === Object.keys(LEVELS_INFO).length - 1) {
      setGameRecordsIndex(0);
    } else {
      setGameRecordsIndex((prev) => prev + 1);
    }
  }

  // Se hace la petición al backend para obtener los datos de los top players
  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const topPlayersData = await getTopPlayers();

        if (!topPlayersData) {
          setErrorTopPlayers("Error al obtener los datos de los top players");
          return;
        }

        setTopPlayers(topPlayersData);
      } catch (error) {
        setErrorTopPlayers("Error al obtener los datos de los top players");
        console.error(error);
      } finally {
        setLoadingTopPlayers(false);
      }
    };

    fetchTopPlayers();
  }, []);

  // Se hace la petición al backend para obtener los datos de la history punctuation
  useEffect(() => {
    const fetchHistoryPunctuation = async () => {
      try {
        const historyPunctuationData = await getHistoryPunctuation();

        if (!historyPunctuationData) {
          setErrorHistoryPunctuation(
            "Error al obtener los datos de la history punctuation"
          );
          return;
        }

        setHistoryPunctuation(historyPunctuationData);
      } catch (error) {
        setErrorHistoryPunctuation(
          "Error al obtener los datos de la history punctuation"
        );
        console.error(error);
      } finally {
        setLoadingHistoryPunctuation(false);
      }
    };

    fetchHistoryPunctuation();
  }, []);

  if (loadingTopPlayers || loadingHistoryPunctuation) {
    return <div>Fetching Info...</div>;
  }

  if (errorTopPlayers || errorHistoryPunctuation) {
    return <div>{errorTopPlayers || errorHistoryPunctuation}</div>;
  }

  return (
    <div className="top-players-container">
      <MainTitle className="top-players-main-title" rotate={true}></MainTitle>

      {/* GAME RECORDS */}
      <h1 className="top-players-title">Game Records</h1>
      <div className="game-records-container">
        <div className="game-records-top-section">
          <Button
            content="⬅️"
            className="game-records-prev-button"
            onClick={() => handlePrevGameRecords()}
          ></Button>
          <div className="game-records-label">
            🚀 Level {gameRecordsIndex + 1} 🚀
          </div>
          <Button
            content="➡️"
            className="game-records-next-button"
            onClick={() => handleNextGameRecords()}
          ></Button>
        </div>

        <ul className="game-records-info">
          {/* Se itera sobre los top 10 jugadores*/}
          {gameRecords &&
            gameRecords[gameRecordsIndex]?.map((player: GameRecord) => (
              <li className="player-info" key={player._id}>
                <div className="player-max-score">{player.maxScore + "p"} </div>
                <div className="player-username">{player.username}</div>
                <div className="player-active-skin">{player.activeSkin}</div>
                <div className="player-achievement-date">
                  {player.achievementDate}
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* TOP 10 CONTRIBUTORS*/}
      <h1 className="top-players-title">Most Experienced</h1>
      <ul className="player-container">
        {topPlayers?.players.map((player: TopPlayer) => (
          <li className="player-info" key={player._id}>
            <div className="player-max-score">{player.totalScore + "p"} </div>
            <div className="player-username">{player.username}</div>
            <div className="player-active-skin">{player.activeSkin}</div>
          </li>
        ))}
      </ul>

      {/* HISTORY PUNCTUATION*/}
      <h1 className="top-players-title"> History Punctuation</h1>
      <div className="history-punctuation-value">
        {"💫 " + historyPunctuation.totalPunctuation + " 💫"}
      </div>
      <div className="history-punctuation-description">
        Total punctuation of all players in the history of the game.
        <br />
        Contribute to increase it! 🚀
      </div>
    </div>
  );
}

export default TopPlayersComponent;
