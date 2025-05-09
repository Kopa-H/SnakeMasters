import User from "../../database/models/userModel.mjs";

const setSkin = async (req, res) => {
  console.log("Se ha recibido una petición para settear una skin");

  try {
    // Obtener los datos de la solicitud
    const { skinToSet } = req.body;

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

    // Se asegura de que el usuario posea la skin que pretende settear
    if (!foundUser.boughtSkins.includes(skinToSet)) {
        return res.status(400).json({ error: "El usuario no posee la skin que pretende settear" });
    }

    // Se realiza la modificación en la base de datos:
    foundUser.activeSkin = skinToSet;
    foundUser.save();

    // Responder al frontend
    res.status(200).json({ message: "Skin setteada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error settear la skin" });
  }

};
export default setSkin;