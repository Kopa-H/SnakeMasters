import bcrypt from 'bcrypt';
import User from '../../database/models/userModel.mjs';

import dotenv from 'dotenv';
dotenv.config();

import { sendTelegramMessage } from '../../../..//kopahub_manager/bots/senderBot.mjs';
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const handleRegister = async (req, res) => {
  console.log("\nSe ha recibido una petición para registrarse");
  try {
    const { username, email, password, levelOneRecord, achievementDate, defaultSkin } = req.body;

    // Verifica si ya existe un usuario con el mismo nombre de usuario o correo electrónico
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username && existingUser.email === email) {
        return res.status(400).json({ message: 'El nombre de usuario y el correo electrónico ya están registrados' });
      } else if (existingUser.username === username) {
        return res.status(400).json({ message: 'El nombre de usuario ya está registrado' });
      } else {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
      }
    }

    // Genera el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new User({
      username,
      email,
      hashedPassword,
      refreshToken: '',
      currentMoney: 0,
      maxLevel: 1,
      totalScore: 0,
      boughtSkins: [defaultSkin],
      activeSkin: defaultSkin,
      records: {
        level_1: { maxScore: levelOneRecord, achievementDate },
        level_2: { maxScore: 0, achievementDate: "" },
        level_3: { maxScore: 0, achievementDate: "" },
        level_4: { maxScore: 0, achievementDate: "" },
        level_5: { maxScore: 0, achievementDate: "" },
        level_6: { maxScore: 0, achievementDate: "" },
      },
    });

    await newUser.save();

    sendTelegramMessage(
      `Se ha registrado un nuevo usuario con username ${newUser.username} y email ${newUser.email}`,
      telegramBotToken,
      chatId
    );

    console.log('Nuevo usuario insertado:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al procesar la solicitud de registro:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export default handleRegister;
