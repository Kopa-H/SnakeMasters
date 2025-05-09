import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "../utilities/getAccessToken";

async function getUserShopInfo() {
  // username, email, maxLevel
  let userData = {
    currentMoney: 0,
    activeSkin: "",
    boughtSkins: [],
  };

  // Obtener el accessToken de las cookies
  const accessToken = getAccessToken();

  if (!accessToken) {
    return userData;
  }

  // Obtener el path de la URL
  const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/info/shop-info`;

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
      userData.currentMoney = data.currentMoney;
      userData.activeSkin = data.activeSkin;
      userData.boughtSkins = data.boughtSkins;

    } else {
      console.error("Error al obtener la info de la tienda del user:", response);
    }
  } catch (error) {
    console.error("Error al obtener la info de la tienda del user:", error);
  }

return userData;
}

export default getUserShopInfo;