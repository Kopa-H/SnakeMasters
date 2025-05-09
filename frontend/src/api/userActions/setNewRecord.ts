
import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";
import getAccessToken from "../utilities/getAccessToken";

const setNewRecord = async (gameLevel: Number, newRecord: Number, achievementDate: Date | String) => {

  // <--- BACKEND SET NEW RECORD --->
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      return;
    }
    const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/new-record`;

    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        gameLevel: gameLevel,
        newRecord: newRecord,
        achievementDate: achievementDate,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Error when setting the user's new record.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default setNewRecord;
