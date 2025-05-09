import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "../utilities/getAccessToken";

async function getUserProfile() {
  // username, email, maxLevel
  let userData = {
    username: "",
    email: "",
    password: "",
    };

  // Obtener el accessToken de las cookies
  const accessToken = getAccessToken();

  if (!accessToken) {
    return userData;
  }

  // SE HACE LA PETICIÓN getUserInfoById al backend:
  const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/info/profile`;
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
      userData = {
        username: data.username,
        email: data.email,
        password: "********", // placeholder para la contraseña
      };
    } else {
      console.error("Error al obtener los datos del usuario:", response);
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
  }

// SE DEVUELVEN LOS DATOS DEL USUARIO AL COMPONENTE QUE LLAMA A ESTA FUNCIÓN:
return userData;
}

export default getUserProfile;