import User from "../../database/models/userModel.mjs";

const levelUp = async (req, res) => {
  console.log("Se ha recibido una petición para subir de nivel al jugador");

  try {
    // Obtener los datos de la solicitud
    const { gameLevel } = req.body;
    console.log("Datos recibidos del game level superado: ", gameLevel)

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

    // Si el nivel jugado es igual al nivel máximo del jugador
    if (gameLevel === foundUser.maxLevel) {
      // Se realiza la modificación en la base de datos:
      foundUser.maxLevel = gameLevel + 1;
      foundUser.save();

      // Responder al frontend
      res.status(200).json({ message: `Nivel del jugador incrementado con éxito al level ${gameLevel+1}!` });
    } else if (gameLevel < foundUser.maxLevel) {
      return res.status(200).json({ error: "El jugador ya había superado este nivel!" });
    } else {
      return res.status(400).json({ error: "El jugador no ha superado el nivel anterior!" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir de nivel al jugador" });
  }

};
export default levelUp;