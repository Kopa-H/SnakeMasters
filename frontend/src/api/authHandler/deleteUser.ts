// DELETE ACCOUNT

import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "../utilities/getAccessToken";
import checkPassword from "../utilities/checkPassword";

const deleteCookie = (name: String) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const deleteAccount = async (password: String) => {

  /* <--- CHECK PASSWORD ---> */
  const match = await checkPassword(password);
  if (!match) {
    console.error("Las contraseñas no coinciden.");
    return false;
  }

  const accessToken = getAccessToken();

  if (!accessToken) {
    return;
  }

  // <--- BACKEND DELETE ACCOUNT --->
  try {
    const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/delete-account`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      /// <--- SE BORRAN LAS COOKIES ---> ///
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      return true;
    } else {
      throw new Error("Error al eliminar la cuenta");
    }
  } catch (error) {
    console.error(error);
  }
};

export default deleteAccount;
