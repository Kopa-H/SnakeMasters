
import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "../utilities/getAccessToken";

const levelUpUser = async (gameLevel: Number) => {

  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }

  // <--- BACKEND BUY SKIN --->
  try {
    const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/level-up`;

    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        gameLevel: gameLevel,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Error when increasing the user's level.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default levelUpUser;
