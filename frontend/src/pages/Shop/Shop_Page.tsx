// Aqui se podrán comprar cabezas diferentes para el snake!
import Particles from "../../components/SpecialEffects/Particles";
import MainTitle from "../../components/Title/MainTitle";

import "./Shop_Page.css";
import "../../components/SpecialEffects/Particles.css";

import ShopComponent from "./Shop_Component";
import setPageHeader from "../../utilities/setPageHeader";

function ShopPage() {
  setPageHeader("Snake Masters - Shop");

  return (
    <div className="shop-page">
      <Particles className="particles"></Particles>

      <div className="shop-container">
        <MainTitle rotate={true}></MainTitle>

        <ShopComponent></ShopComponent>
      </div>
    </div>
  );
}

export default ShopPage;
