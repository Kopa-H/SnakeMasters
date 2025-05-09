import User from '../../database/models/userModel.mjs';
import bcrypt from 'bcrypt';

const USER_REGEX = /^[a-zA-Z0-9]{3,12}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{};':"\\|,.<>?/-]{6,25}$/;

// Ruta para eliminar un usuario existente
const modifyUser = async (req, res) => {
  console.log("\nSe ha recibido una petición para modificar información de un usuario");

  try {
    const infoToModify = req.body.infoToModify;

    if (infoToModify !== "username" && infoToModify !== "password" && infoToModify !== "email") {
      return res.status(400).json({ error: 'Petición incorrecta' });
    }
    const newInfo = req.body.newInfo;

    // Validar que la información nueva sea válida:
    if (infoToModify === "username" && !USER_REGEX.test(newInfo)) {
      return res.status(400).json({ error: 'Nombre de usuario inválido' });
    } else if (infoToModify === "email" && !EMAIL_REGEX.test(newInfo)) {
      return res.status(400).json({ error: 'Correo electrónico inválido' });
    } else if (infoToModify === "password" && !PASSWORD_REGEX.test(newInfo)) {
      return res.status(400).json({ error: 'Contraseña inválida' });
    }

    // Se verifica que no exista ningún user con el nuevo username o email:
    if (infoToModify === "username" || infoToModify === "email") {
      const repeatedUser = await User.findOne({ [infoToModify]: newInfo });
      if (repeatedUser) {
          return res.status(403).json({ error: 'La información proporcionada ya está en uso'});
      }
    }

    // Validar los datos (ejemplo: verificar que el usuario esté autenticado)
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      return res.sendStatus(204);
    }
    const refreshToken = cookies.refreshToken;

    // Busca el usuario en la base de datos por su refreshToken:
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (infoToModify === "password") {
      const hashedPassword = await bcrypt.hash(newInfo, 10);
      foundUser.hashedPassword = hashedPassword;
      foundUser.save();
      return res.status(200).json({ success: true });
    }

    foundUser[infoToModify] = newInfo;
    foundUser.save();
    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Error al modificar info del user", error);
    res.status(500).json({ error: "Error interno del servidor al modificar info del user" });
  }
};

export default modifyUser;