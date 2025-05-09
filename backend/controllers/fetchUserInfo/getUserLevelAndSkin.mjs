import User from '../../database/models/userModel.mjs';

// Ruta para los DATOS PRINCIPALES de un usuario según su ID
const getUserLevelAndSkin = async (req, res) => {
  console.log("\nSe ha recibido una petición para obtener el level y skin del user por ID");

  try {
    // Verificar que el usuario esté autenticado
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      console.log("No se ha encontrado el refreshToken en las cookies");
      return res.status(401).json({ error: "No autenticado" });
    }

    // Buscar el usuario en la base de datos por su refreshToken:
    const refreshToken = cookies.refreshToken;
    const foundUser = await User.findOne({ refreshToken });

    // Verificar si el usuario existe:
    if (!foundUser) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Extraer los DATOS PRINCIPALES del usuario encontrado:
    const foundUserLevelAndSkin = {
      maxLevel: foundUser.maxLevel,
      activeSkin: foundUser.activeSkin,
    };

    // Devolver los datos del usuario encontrado
    console.log("Operación exitosa, datos del usuario:", foundUserLevelAndSkin);
    res.json(foundUserLevelAndSkin);
  } catch (error) {
    console.error('Error al obtener el level y skin del user', error);
    res.status(500).json({ error: 'Error al obtener el level y skin del user' });
  }
};

export default getUserLevelAndSkin;