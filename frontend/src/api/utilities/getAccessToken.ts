// Obtener el token de acceso de las cookies:
function getAccessToken() {
  const cookies = document.cookie.split(";");
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("accessToken=")
  );
  const accessToken = accessTokenCookie
    ? accessTokenCookie.split("=")[1]
    : null;

  return accessToken;
}

export default getAccessToken;
