import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/Home_Page";

// AUTH PAGES
import RegisterPage from "./pages/Auth/Register_Page";
import LoginPage from "./pages/Auth/Login_Page";
import ForgottenPasswordPage from "./pages/Auth/ForgottenPassword_Page";

// UTILITY PAGES
import NonePage from "./pages/None/None_Page";
import UserProfilePage from "./pages/UserProfile/UserProfile_Page";

// LEVELS PAGES
import GameInstance from "./components/SnakeGame/GameInstance";

// FRUITS INFO PAGE
import FruitsInfoPage from "./pages/FruitsInfo/FruitsInfo_Page";

// SKINS SHOP PAGE
import SkinsShopPage from "./pages/Shop/Shop_Page";

// TOP PLAYERS PAGE
import TopPlayersPage from "./pages/TopPlayers/TopPlayers_Page";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import useTokenRefresh from "./api/utilities/refreshToken"; // Importa la función para actualizar el token
import { EXECUTION_ENVIRONMENT } from "./config/config";

if (EXECUTION_ENVIRONMENT === "production") {
  disableReactDevTools();
}

function App() {
  // Llama a la función para actualizar el AccessToken (se recargará si falta poco para que expire):
  // Faltaría añadir que cuando falte poco para el RefreshToken, se redirija a la página de login.
  useTokenRefresh();

  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/user-profile" element={<UserProfilePage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/forgotten-password" element={<ForgottenPasswordPage />} />

        <Route path="/fruits-info" element={<FruitsInfoPage />} />

        <Route path="/skins-shop" element={<SkinsShopPage />} />

        <Route path="/top-players" element={<TopPlayersPage />} />

        <Route path="/level/:lvl" element={<GameInstance />} />
        <Route path="/challenge/:lvl" element={<GameInstance />} />

        {/* RUTA UNDEFINED */}
        <Route path="*" element={<NonePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
