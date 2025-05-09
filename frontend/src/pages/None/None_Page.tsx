import ParticlesComponent from "../../components/SpecialEffects/Particles";
import MainTitle from "../../components/Title/MainTitle";

import "./styles.css";
import "../../components/SpecialEffects/Particles.css";

function NonePage() {
  return (
    <div className="none-page">
      <ParticlesComponent className="particles"></ParticlesComponent>
      <MainTitle rotate={true}></MainTitle>

      <button
        className="return-home-button"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Error 404: Not found Redirect home!
      </button>
    </div>
  );
}

export default NonePage;
