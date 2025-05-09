import ParticlesComponent from "../../components/SpecialEffects/Particles";
import TopPlayers from "./TopPlayers";

import "../../components/SpecialEffects/Particles.css";
import setPageHeader from "../../utilities/setPageHeader";

import "./styles/TopPlayers.css";
import "./styles/HistoryPunctuation.css";
import "./styles/GameRecords.css";

// Resolution adaptation
import "./styles/responsive.css";

function TopPlayersPage() {
  setPageHeader("Snake Masters - Top Players");

  return (
    <div className="top-players-page">
      <ParticlesComponent className="particles"></ParticlesComponent>

      <TopPlayers></TopPlayers>
    </div>
  );
}

export default TopPlayersPage;
