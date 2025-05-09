import ParticlesComponent from "../../components/SpecialEffects/Particles";
import MainTitle from "../../components/Title/MainTitle";
import RegisterForm from "../../components/AuthForms/RegisterForm/RegisterForm";
import setPageHeader from "../../utilities/setPageHeader";

import { useLocation } from "react-router-dom";

import "./styles/Register_Page.css";
import "../../components/SpecialEffects/Particles.css";

function RegisterPage() {
  // Se obtiene la ubicación actual de la página
  const location = useLocation();

  // Se obtienen los parámetros de la URL
  const queryParams = new URLSearchParams(location.search);
  let levelOneGameScore = 0;

  const gameScoreParam = queryParams.get("gameScore");
  if (gameScoreParam !== null) {
    levelOneGameScore = parseInt(gameScoreParam);
  }

  setPageHeader("Snake Masters - Register");

  return (
    <div className="register-page">
      <ParticlesComponent className="particles"></ParticlesComponent>

      <MainTitle rotate={true}></MainTitle>

      <RegisterForm levelOneGameScore={levelOneGameScore}></RegisterForm>
    </div>
  );
}

export default RegisterPage;
