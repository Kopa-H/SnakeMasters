import User from '../../database/models/userModel.mjs';

// Ruta para los DATOS PRINCIPALES de un usuario según su ID
const getUserRecord = async (req, res) => {
  console.log("\nSe ha recibido una petición para obtener records de un usuario");

  try {
    // Verificar que el usuario esté autenticado
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      console.log("No se ha encontrado el refreshToken en las cookies");
      return res.status(401).json({ error: "No autenticado" });
    }

    const level = req.params.level;
    if (!level) {
      console.log("No se ha encontrado el level en los parámetros");
      return res.status(400).json({ error: "No se ha encontrado el level en los parámetros" });
    }
    console.log("Level recibido:", level);

    // Buscar el usuario en la base de datos por su refreshToken:
    const refreshToken = cookies.refreshToken;
    const foundUser = await User.findOne({ refreshToken });

    // Verificar si el usuario existe:
    if (!foundUser) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Extraer el record del user:
    const foundUserRecord = {
      maxScore: foundUser.records[`level_${level}`].maxScore,
    };

    // Devolver los datos del usuario encontrado
    console.log(`Operación exitosa, record del user del level ${level}:`, foundUserRecord);
    res.json(foundUserRecord);
  } catch (error) {
    console.error('Error al obtener el record del user', error);
    res.status(500).json({ error: 'Error al obtener el record del user' });
  }
};

export default getUserRecord;