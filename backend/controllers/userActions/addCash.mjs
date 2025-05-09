import User from "../../database/models/userModel.mjs";

const addCash = async (req, res) => {
  console.log("Se ha recibido una petición para añadir dinero a un jugador");

  try {
    // Obtener los datos de la solicitud
    const { cashToAdd } = req.body;

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

    // Se realiza la modificación en la base de datos:
    foundUser.currentMoney += cashToAdd;
    foundUser.save();

    // Responder al frontend
    res.status(200).json({ message: "Cash añadido con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir cash al jugador" });
  }

};
export default addCash;