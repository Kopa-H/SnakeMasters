
import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import LEVELS_INFO from "../../components/SnakeGame/Parameters/levels_info";

// Define la interfaz para los records de los diferentes niveles.
interface GameRecord {
  _id: string;
  username: string;
  maxScore: number;
  achievementDate: String;
  activeSkin: string;
}

async function getGameRecords(): Promise<GameRecord[][] | null> {
  // Se hace la petición al backend para obtener los datos de los top players
  const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/game-records`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ levelsNum: Object.keys(LEVELS_INFO).length }),
    });

    if (response.ok) {
      const data: GameRecord[][] = await response.json();
      return data;
    } else {
      console.error(`Error al obtener los Game Records: ${response.status} ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los Game Records:", error);
    return null;
  }
}

export default getGameRecords;