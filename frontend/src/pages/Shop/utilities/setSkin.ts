
import { REACT_APP_PUBLIC_BACKEND_URL } from "../../../config/config";
import getAccessToken from "../../../api/utilities/getAccessToken";

const setSkin = async (skinToSet: string) => {

  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }

  // <--- BACKEND SET SKIN --->
  try {
    const apiUrl = `${REACT_APP_PUBLIC_BACKEND_URL}/api/user/set-skin`;

    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        skinToSet: skinToSet,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Error when setting the user's skin.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default setSkin;
