import User from "../../database/models/userModel.mjs";

const sumTotalScore = async (req, res) => {
  console.log("Se ha recibido una petición para sumar Total Score al jugador");

  try {
    // Obtener los datos de la solicitud
    const { scoreToAdd } = req.body;

    // Validar los datos de la solicitud
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
    foundUser.totalScore += scoreToAdd;
    foundUser.save();

    // Responder al frontend
    res.status(200).json({ message: "Total Score añadido con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al sumar Total Score al jugador" });
  }

};
export default sumTotalScore;