
import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";

async function getHistoryPunctuation() {
  // Se hace la petición al backend para obtener los datos de los top players
  const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/history-punctuation`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const historyPunctuation = await response.json();
      return historyPunctuation;
    } else {
      console.error("Error al obtener la History Punctuation:", response);
    }
  } catch (error) {
    console.error("Error al obtener la History Punctuation:", error);
  }
}

export default getHistoryPunctuation;