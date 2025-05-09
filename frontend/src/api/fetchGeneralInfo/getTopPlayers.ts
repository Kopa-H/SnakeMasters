
import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";

// Define la interfaz para un jugador
export interface Player {
  _id: string;
  username: string;
  totalScore: number;
  activeSkin: string;
}

// Define la interfaz para el top 10 de jugadores
export interface TopPlayers {
  players: Player[];
}

async function getTopPlayers() {
  // Se hace la petición al backend para obtener los datos de los top players
  const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/top-players`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data: TopPlayers = await response.json();
      return data;
    } else {
      console.error("Error al obtener los Top Players:", response);
    }
  } catch (error) {
    console.error("Error al obtener los Top Players:", error);
  }
}

export default getTopPlayers;