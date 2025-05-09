// Get user ID from access token (FRONTEND)

import getAccessToken from "./getAccessToken";
import useDecodeJwt from "../../utilities/useDecodeJwt";

function getUserInfoFromCookies() {
const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }
  const decodedToken = useDecodeJwt(accessToken);
  const userInfo = decodedToken.UserInfo;
  const userId = userInfo._id;
    return {
        userId,
        accessToken
    }
}

export default getUserInfoFromCookies;