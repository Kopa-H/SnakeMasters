import User from "../../database/models/userModel.mjs";

const buySkin = async (req, res) => {
  console.log("Se ha recibido una petición para comprar una skin");

  try {
    // Obtener los datos de la solicitud
    const { skinToBuy, skinPrice } = req.body;

    // Validar los datos (ejemplo: verificar que el usuario esté autenticado)
    const cookies = req.cookies;

    if (!cookies?.refreshToken) {
      return res.sendStatus(204);
    }

    const refreshToken = cookies.refreshToken;

    // Busca el usuario en la base de datos por su refreshToken:
    const foundUser = await User.findOne({ refreshToken });

    // Verifica si el usuario existe:
    if (!foundUser) {
      console.log("Usuario no encontrado")
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const userMoney = foundUser.currentMoney;

    // Procesar la compra (ejemplo: actualizar la base de datos)
    if (userMoney < skinPrice) {
      return res.status(400).json({ error: "No tienes suficiente dinero para comprar esta skin" });
    }

    if (foundUser.boughtSkins.includes(skinToBuy)) {
        return res.status(400).json({ error: "Ya has comprado esta skin" });
    }

    foundUser.boughtSkins.push(skinToBuy);
    foundUser.currentMoney -= skinPrice;
    foundUser.save();

    // Responder al frontend
    res.status(200).json({ message: "Skin comprada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la compra de la skin" });
  }

};
export default buySkin;