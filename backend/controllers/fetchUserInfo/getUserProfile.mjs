import User from '../../database/models/userModel.mjs';

// Ruta para los DATOS PRINCIPALES de un usuario según su ID
const getUserInfo = async (req, res) => {
  console.log("\nSe ha recibido una petición para obtener la información principal de un usuario");

  try {
    // Verificar que el usuario esté autenticado
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      return res.sendStatus(204);
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
    const foundUserInfo = {
      username: foundUser.username,
      email: foundUser.email,
      maxLevel: foundUser.maxLevel.toString()
    };

    // Devolver los datos del usuario encontrado
    console.log("Operación exitosa");
    res.json(foundUserInfo);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export default getUserInfo;