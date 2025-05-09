

import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "../utilities/getAccessToken";

const sumTotalScore = async (scoreToAdd: Number) => {

  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }

  // <--- BACKEND SUM TOTAL SCORE --->
  try {
    const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/sum-total-score`;

    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        scoreToAdd: scoreToAdd,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Error al actualizar el cash del jugador.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default sumTotalScore;
