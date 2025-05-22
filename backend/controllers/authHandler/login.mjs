
import User from '../../database/models/userModel.mjs'; // Importa el modelo de usuario
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import { sendTelegramMessage } from '../../../..//kopahub_manager/bots/senderBot.mjs';
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const handleLogin = async (req, res) => {
  console.log("\nSe ha recibido una petición para hacer login");

  try {
    const { email, password } = req.body;

    if (!email||!password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    let foundUser;

    // Primero intenta buscar el usuario por correo electrónico
    foundUser = await User.findOne({ email });

    // Si no se encuentra el usuario por correo, intenta buscarlo por nombre de usuario
    if (!foundUser) {
      foundUser = await User.findOne({ username: email });
    }

    // Verifica si el usuario existe:
    if (!foundUser) {
      return res.status(401).json({ error: 'Usuario No Encontrado' });
    }

    // Verifica si la contraseña es correcta
    if (!bcrypt.compareSync(password, foundUser.hashedPassword)) {
      return res.status(401).json({ error: 'Contraseña Incorrecta' });
    }

    // Genera un Access token de autenticación que contiene el id, nombre de usuario del usuario.
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "_id": foundUser._id,
        }
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

    // Genera un REFRESH token de autenticación
    const refreshToken = jwt.sign({ _id: foundUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    // Guarda el REFRESH token en el usuario de la base de datos
    foundUser.refreshToken = refreshToken; // Asigna el refreshToken al usuario
    await foundUser.save(); // Guarda el usuario actualizado en la base de datos

    sendTelegramMessage(
      `El usuario ${foundUser.username} ha iniciado sesión en su cuenta`,
      telegramBotToken,
      chatId
    );

    // Configuración de la cookie
    const cookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      sameSite: 'none',
      secure: true
    };

    // Envía el refreshToken en una cookie con refresh de duración de 24 horas:
    res.cookie('refreshToken', refreshToken, cookieOptions);
    // Envía el accessToken al cliente:
    res.json({ accessToken });

  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(500).json({ error: 'Error de autenticación' });
  }
};

export default handleLogin;