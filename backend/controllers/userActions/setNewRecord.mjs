import User from "../../database/models/userModel.mjs";

const setNewRecord = async (req, res) => {
  console.log("Se ha recibido una petición para actualizar un new record al jugador");

  try {
    // Obtener los datos de la solicitud
    const { gameLevel, newRecord, achievementDate } = req.body;
    console.log("Datos recibidos: ", gameLevel, newRecord, achievementDate)

    // Sacar el refreshToken de las cookies
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(204);
    const refreshToken = cookies.refreshToken;

    // Busca el usuario en la base de datos por su refreshToken:
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      console.log("Usuario no encontrado")
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Si el nivel jugado es igual al nivel máximo del jugador
    if (newRecord > foundUser.records[`level_${gameLevel}`].maxScore) {
      foundUser.records[`level_${gameLevel}`].maxScore = newRecord;
      foundUser.records[`level_${gameLevel}`].achievementDate = achievementDate;
      foundUser.save();

      // Responder al frontend
      res.status(200).json({ message: `Record del jugador en el nivel ${gameLevel} setteado en ${newRecord}!` });
    } else {
      return res.status(400).json({ error: "El jugador ya tenía un record superior!" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el record de un jugador en un nivel" });
  }

};
export default setNewRecord;