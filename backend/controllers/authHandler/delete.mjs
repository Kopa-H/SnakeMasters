import User from '../../database/models/userModel.mjs';

import dotenv from 'dotenv';
dotenv.config();

import { sendTelegramMessage } from '../../../..//kopahub_manager/bots/senderBot.mjs';
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// Ruta para eliminar un usuario existente
const deleteUser = async (req, res) => {
  console.log("\nSe ha recibido una petición para eliminar un usuario por refreshToken");

  try {
    // Verificar que el usuario esté autenticado
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      return res.sendStatus(204);
    }

    // Buscar el usuario en la base de datos por su refreshToken:
    const refreshToken = cookies.refreshToken;
    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminar el usuario de la base de datos
    const deletedUser = await User.findByIdAndDelete(foundUser._id);

    sendTelegramMessage(
      `Se ha eliminado un usuario con username ${deletedUser.username} y email ${deletedUser.email}`,
      telegramBotToken,
      chatId
    );

    res.status(204).json(deletedUser);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default deleteUser;