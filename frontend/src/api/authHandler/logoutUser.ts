// Logout hook

import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";

const deleteCookie = (name: String) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const logout = async () => {
  // <--- FRONTEND LOGOUT (accessToken) --->
  deleteCookie("accessToken");

  // <--- BACKEND LOGOUT (refreshToken) --->
  try {
    const apiUrl = REACT_APP_PUBLIC_BACKEND_URL + "/api/user/logout";
    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      console.log("Refresh token invalidated successfully.");

    } else {
      throw new Error("Failed to invalidate refresh token.");
    }
  } catch (error) {
    console.error("Error while invalidating refresh token:", error);
  }
  deleteCookie("refreshToken");
};

export default logout;
