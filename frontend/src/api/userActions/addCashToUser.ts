

import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "../utilities/getAccessToken";

const addCashToUser = async (cashToAdd: Number) => {

  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }

  // <--- BACKEND BUY SKIN --->
  try {
    const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/add-cash`;

    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        cashToAdd: cashToAdd,
      }),
    });

    if (response.ok) {
      // console.log("Cash del jugador actualizaco correctamente");
      return true;
    } else {
      throw new Error("Error al actualizar el cash del jugador.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default addCashToUser;
