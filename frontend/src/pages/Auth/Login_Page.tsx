import ParticlesComponent from "../../components/SpecialEffects/Particles";
import MainTitle from "../../components/Title/MainTitle";
import LoginForm from "../../components/AuthForms/LoginForm/LoginForm";
import setPageHeader from "../../utilities/setPageHeader";

import "./styles/Login_Page.css";
import "../../components/SpecialEffects/Particles.css";

function LoginPage() {
  setPageHeader("Snake Masters - Login");

  return (
    <div className="login-page">
      <ParticlesComponent className="particles"></ParticlesComponent>

      <MainTitle rotate={true}></MainTitle>

      <LoginForm></LoginForm>
    </div>
  );
}

export default LoginPage;
