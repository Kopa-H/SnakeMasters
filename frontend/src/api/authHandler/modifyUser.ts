// CHANGE USERNAME

import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import checkPassword from "../utilities/checkPassword";
import getUserInfoFromCookies from "../utilities/getUserInfoFromCookies";

const modifyUser = async (infoToModify: String, userPassword: String, newInfo: String) => {

  /* <--- CHECK PASSWORD ---> */
  const match = await checkPassword(userPassword);
  if (!match) {
    console.error("Las contraseñas no coinciden.");
    return false;
  }

  // Se obtiene el ID del usuario y el token de acceso de las cookies:
  const userInfoFromCookies = getUserInfoFromCookies();

  // <--- BACKEND CHANGE USERNAME --->
  try {
    const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/modify-user`;

    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfoFromCookies?.accessToken}`,
      },
      body: JSON.stringify({
        infoToModify: infoToModify,
        newInfo: newInfo,
      })
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("An error occurred while trying to modify the user.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default modifyUser;
