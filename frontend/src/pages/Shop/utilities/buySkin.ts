

import { REACT_APP_PUBLIC_BACKEND_URL } from "../../../config/config";
import getAccessToken from "../../../api/utilities/getAccessToken";

const buySkin = async (skinToBuy: string, skinPrice: number) => {

  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }

  // <--- BACKEND BUY SKIN --->
  try {
    const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/buy-skin`;

    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        skinToBuy: skinToBuy,
        skinPrice: skinPrice,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Error when buying the skin.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default buySkin;
