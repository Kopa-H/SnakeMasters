import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "../utilities/getAccessToken";

async function getUserLevelAndSkin() {
  // username, email, maxLevel
  let userData = {
    maxLevel: 1,
    activeSkin: ""
  };

  // Obtener el accessToken de las cookies
  const accessToken = getAccessToken();

  if (!accessToken) {
    return userData;
  }

  // Obtener el path de la URL
  const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/info/level-&-skin`;

  // SE HACE LA PETICIÓN getUserInfoById al backend:
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

      // Actualizar los valores con los datos del usuario
      userData.maxLevel = data.maxLevel;
      userData.activeSkin = data.activeSkin;

    } else {
      console.error("Error al obtener el level y el skin del user:", response);
    }
  } catch (error) {
    console.error("Error al obtener el level y el skin del user:", error);
  }

// SE DEVUELVEN LOS DATOS DEL USUARIO AL COMPONENTE QUE LLAMA A ESTA FUNCIÓN:
return userData;
}

export default getUserLevelAndSkin;