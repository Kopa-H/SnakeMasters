import Particles from "../../components/SpecialEffects/Particles";
import { useEffect, useState } from "react";

import NoLoginElements from "./NoLoginElements";
import LoginElements from "./LoginElements";

import "./styles.css";
import "../../components/SpecialEffects/Particles.css";
import setPageHeader from "../../utilities/setPageHeader";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  setPageHeader("Snake Masters");

  // SE ESTABLECE SI EL USUARIO ESTÁ LOGUEADO O NO
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("accessToken=")
    );
    const accessToken = accessTokenCookie
      ? accessTokenCookie.split("=")[1]
      : null;

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="home-page">
      {/* Partículas de fondo */}
      <Particles className="particles"></Particles>

      {/* Elementos de la página de inicio para nuevos users */}
      {!isLoggedIn && <NoLoginElements />}

      {/* Elementos de la página de inicio para users Autenticados */}
      {isLoggedIn && <LoginElements />}
    </div>
  );
}

export default HomePage;
