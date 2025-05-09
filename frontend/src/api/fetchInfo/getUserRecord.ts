import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "../utilities/getAccessToken";

async function getUserRecord(level: Number) {
  // Obtener el accessToken de las cookies
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  // SE HACE LA PETICIÓN al backend:
  const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/info/record/${level}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data;

    } else {
      console.error(`Error al obtener record del user del nivel ${level}:`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener record del user del nivel ${level}`, error);
    return null;
  }
}

export default getUserRecord;