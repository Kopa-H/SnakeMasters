import Particles from "../../components/SpecialEffects/Particles";
import MainTitle from "../../components/Title/MainTitle";

import "../../components/SpecialEffects/Particles.css";
import "./styles.css";
import "./responsive.css";

import FRUITS_INFO from "../../components/SnakeGame/Parameters/fruit_info";
import setPageHeader from "../../utilities/setPageHeader";

function FruitsInfoPage() {
  // COLORES DE CONTRASTE PARA CADA FRUTA:
  const contrastColors = [
    "#90EE90", // GRASS CONTRAST
    "#A52A2A", // SPIKY CONTRAST
    "#FFC300", // GOLD CONTRAST
    "#DAF7A6", // CHEETAH CONTRAST
    "#4CC9F0", // CASTLE CONTRAST
    "#900C3F", // DRAGON CONTRAST
    "#9370DB", // DEATH CONTRAST
    "#90EE90", // CRAZY CONTRAST
    "#C70039", // PARALYSIS CONTRAST
    "#FFC300", // RANDOM CONTRAST
  ];

  // COLORES DE TIPOGRAFÍA PARA CADA FRUTA:
  const textColors = [
    "#000000", // GRASS TEXT
    "#000000", // SPIKY TEXT
    "#000000", // GOLD TEXT
    "#000000", // CHEETAH TEXT
    "#000000", // CASTLE TEXT
    "#FFFFFF", // DRAGON TEXT
    "#FFFFFF", // DEATH TEXT
    "#000000", // CRAZY TEXT
    "#000000", // PARALYSIS TEXT
    "#FFFFFF", // RANDOM TEXT
  ];

  setPageHeader("Snake Masters - Fruits");

  return (
    <div className="fruits-info-page">
      <Particles className="particles"></Particles>

      <div className="fruits-info-container">
        <MainTitle rotate={true}></MainTitle>

        {Object.values(FRUITS_INFO).map(
          (fruit, index) =>
            fruit.emoji !== "📍" && (
              <div
                className="fruit-item"
                key={index}
                style={{
                  background: `linear-gradient(to bottom, ${fruit.colorHex}, ${contrastColors[index]})`,
                  color: textColors[index],
                }}
              >
                <div className="fruit-top-section">
                  <span
                    className="fruit-name"
                    style={{ color: textColors[index] }}
                  >
                    {fruit.name}
                  </span>
                  <div className="fruit-emoji">{fruit.emoji}</div>
                </div>

                <div className="fruit-row">
                  <span className="fruit-label">Effect:</span>
                  <span
                    className="fruit-value"
                    style={{ color: textColors[index] }}
                  >
                    {fruit.effect}
                  </span>
                </div>
                <div className="fruit-row">
                  <span className="fruit-label">Effect duration:</span>
                  <span
                    className="fruit-value"
                    style={{ color: textColors[index] }}
                  >
                    {fruit.effectDuration}s
                  </span>
                </div>
                <div className="fruit-row">
                  <span className="fruit-label">Value:</span>
                  <span
                    className="fruit-value"
                    style={{ color: textColors[index] }}
                  >
                    {fruit.value}p
                  </span>
                </div>
                <div className="fruit-row">
                  <span className="fruit-label">Description:</span>
                  <span
                    className="fruit-description"
                    style={{ color: textColors[index] }}
                  >
                    {fruit.description}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default FruitsInfoPage;
