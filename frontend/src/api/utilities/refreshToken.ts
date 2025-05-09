// tokenService.js

import { useEffect, useState } from "react";
import useDecodeJwt from "../../utilities/useDecodeJwt";
import { REACT_APP_PUBLIC_BACKEND_URL } from "../../config/config";

const refreshToken = async () => {
  try {
    const apiUrl = REACT_APP_PUBLIC_BACKEND_URL + "/api/user/refresh-token";

    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.accessToken;

      // Almacena el nuevo token en las cookies
      document.cookie = `accessToken=${accessToken}; path=/;`;

      return accessToken;
    }
  } catch (error) {
    throw error;
  }
};

const useTokenRefresh = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {

      // Verifica si existe una cookie de token
      const cookies = document.cookie.split(";");

      // Se obtiene el ACCESS TOKEN;
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("accessToken=")
      );

      // Si no hay cookie de token, no se realiza ninguna acción
      if (!accessTokenCookie) {
        // console.log("No hay token de acceso al refrescar.");
        return;
      }

      // Decodificar el token
      const decoded = useDecodeJwt(accessTokenCookie);

      // Obtener el tiempo de expiración (exp) del token
      const expirationTime = new Date(decoded.exp * 1000); // Multiplicamos por 1000 para convertir segundos a milisegundos
      // console.log("Tiempo de expiración del token:", expirationTime);

      // Si queda menos de 1 hora para la expiración, actualiza el token
      const currentTime = new Date();

      const timeLeftInMilliseconds = expirationTime.getTime() - currentTime.getTime();
      const timeLeftInMinutes = timeLeftInMilliseconds / 60 / 1000;
      // console.log("AccessToken expira en:", timeLeftInMinutes, "minutos!");

      // Si quedan menos de 5 minutos para la expiración
      if (timeLeftInMinutes < 5) {
        try {
          await refreshToken(); // Llama a la función para actualizar el token
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error when refreshing the token due to expiration time:", error, "!");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(true); // Si no se actualiza, el usuario sigue logueado
      }
    };
    fetchToken();
    }, []); // Se ejecuta solo una vez al cargar la aplicación

  return isLoggedIn;
};

export default useTokenRefresh;