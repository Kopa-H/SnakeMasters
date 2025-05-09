import Button from "../../components/Button/Button";
import { useState, useEffect } from "react";
import getUserShopInfo from "../../api/fetchInfo/getUserShopInfo";

import SKINS_INFO from "../../components/SnakeGame/Parameters/skins_info";
import buySkin from "./utilities/buySkin";
import setSkin from "./utilities/setSkin";

function ShopComponent() {
  const [userMoney, setUserMoney] = useState<number>(0);
  const [userActiveSkin, setUserActiveSkin] = useState<string>("");

  const [selectedSkin, setSelectedSkin] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [userBoughtSkins, setUserBoughtSkins] = useState<string[]>([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const userShopInfo = await getUserShopInfo();

      if (!userShopInfo) {
        console.log("Error fetching user shop info");
        return;
      }

      setUserMoney(userShopInfo.currentMoney);
      setUserActiveSkin(userShopInfo.activeSkin);
      setUserBoughtSkins(
        Array.isArray(userShopInfo.boughtSkins) ? userShopInfo.boughtSkins : []
      );
    };

    fetchData();
  }, []);

  async function handleSetSkin(skinToSet: string) {
    const result = await setSkin(skinToSet);
    if (!result) {
      console.log("Error setting the skin in the frontend");
      return false;
    }

    setUserActiveSkin(skinToSet);
    return true;
  }

  async function handleBuySkin() {
    if (userMoney < selectedPrice) {
      alert("No tienes suficiente dinero para comprar la skin");
      setIsConfirmationOpen(false); // Cerrar el modal de confirmación si no hay suficiente dinero
      return;
    }

    // Aquí podrías mostrar un modal de "Compra exitosa" o algo similar
    const result = await buySkin(selectedSkin, selectedPrice);
    if (!result) {
      console.log("Error buying the skin in the frontend");
      return;
    }

    // Se actualiza el dinero en el frontend:
    setUserMoney(userMoney - selectedPrice);

    // Se añade la skin a las skins compradas por el usuario
    setUserBoughtSkins([...userBoughtSkins, selectedSkin]);

    // Se setea la skin comprada como activa
    handleSetSkin(selectedSkin);

    setIsConfirmationOpen(false); // Cerrar el modal de confirmación después de la compra
  }

  return (
    <div className="skins-container">
      <div className="money-info">
        {" "}
        <span className="money-label">Current money: </span>
        <label className="money-value">{userMoney}$</label>
      </div>

      {Object.values(SKINS_INFO).map((skin, index) => (
        <div key={index} className="skin-item">
          <p className="skin-name">{skin.name}</p>
          <p className="skin-price">{"Skin Price: " + skin.price}$</p>
          <Button
            className="skin-button"
            onClick={() => {
              setSelectedSkin(skin.content);
              setSelectedPrice(skin.price);
              if (userBoughtSkins.includes(skin.content)) {
                handleSetSkin(skin.content);
              } else {
                // Si no se posee la skin, se abre la ventana de confirmación
                setIsConfirmationOpen(true);
              }
            }}
            content={
              userBoughtSkins.includes(skin.content) &&
              skin.content === userActiveSkin
                ? "Active " + skin.content
                : userBoughtSkins.includes(skin.content)
                ? "Set " + skin.content
                : "Buy " + skin.content
            }
          />
        </div>
      ))}

      {/* Modal de confirmación */}
      {isConfirmationOpen && (
        <div className="purchase-confirmation">
          <p>¿Estás seguro de que deseas comprar la skin {selectedSkin}?</p>
          <Button onClick={handleBuySkin} content="Confirmar compra" />
          <Button
            onClick={() => setIsConfirmationOpen(false)}
            content="Cancelar"
          />
        </div>
      )}
    </div>
  );
}

export default ShopComponent;
