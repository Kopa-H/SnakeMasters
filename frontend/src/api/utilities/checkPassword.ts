// USED TO CHECK IF THE PASSWORD IS CORRECT (COMPARE FRONTEND AND BACKEND)

import useDecodeJwt from "../../utilities/useDecodeJwt";
import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "./getAccessToken";

async function checkPassword(password: String) {
  // Obtener el  accessToken de las cookies
  const accessToken = getAccessToken();

  if (!accessToken) {
    return false;
  }

  // Decodificar el accessToken para obtener la información
  const decodedToken = useDecodeJwt(accessToken);
  const userInfo = decodedToken.UserInfo;
  const userId = userInfo._id;
  const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/check-password/${userId}`;

  // Hacer la solicitud POST al backend para comprobar la contraseña:
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("Error connecting to the backend:", error);
  }

  // Si las contraseñas no coinciden, se devuelve false:
  return false;
}

export default checkPassword;
