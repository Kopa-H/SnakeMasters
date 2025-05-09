import ParticlesComponent from "../../components/SpecialEffects/Particles";
import MainTitle from "../../components/Title/MainTitle";
import UserInfo from "./UserInfo";
import setPageHeader from "../../utilities/setPageHeader";

import "../../components/SpecialEffects/Particles.css";
import "./styles.css";

function UserPage() {
  setPageHeader("Snake Masters - Profile");

  return (
    <div className="user-page">
      <ParticlesComponent className="particles"></ParticlesComponent>

      <MainTitle className="profile-main-title" rotate={true}></MainTitle>

      <UserInfo></UserInfo>
    </div>
  );
}

export default UserPage;
