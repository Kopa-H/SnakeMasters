import sgMail from '@sendgrid/mail';
import User from '../../database/models/userModel.mjs';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// Configurar SendGrid con la API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Función para generar una contraseña temporal numérica de 5 caracteres
const generateTemporaryPassword = () => {
  return Math.floor(10000 + Math.random() * 90000).toString(); // Genera un número de 5 dígitos
};

// Ruta para restablecimiento de contraseña
const handleForgottenPassword = async (req, res) => {
  const { email } = req.body;

  // Validar la entrada
  if (!email) {
    return res.status(400).json({ message: 'Email es requerido' });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Generar la contraseña temporal
    const temporaryPassword = generateTemporaryPassword();

    // Hash de la contraseña temporal
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Configurar el correo con SendGrid
    const msg = {
      to: foundUser.email,  // destinatario
      from: 'noreply@kopahub.xyz',  // remitente
      subject: 'Contraseña temporal para Snake Masters',
      text: `Esta es tu contraseña temporal: ${temporaryPassword}. Por favor, ingresa en tu cuenta y cámbiala inmediatamente.`,
    };

    // Enviar el correo usando SendGrid
    await sgMail.send(msg);
    console.log('Correo enviado con éxito');

    // Actualizar la contraseña del usuario en la base de datos
    foundUser.hashedPassword = hashedPassword;
    await foundUser.save();
    res.status(200).json({ message: 'Correo enviado correctamente. Por favor revisa tu bandeja de entrada.' });

  } catch (error) {
    console.log("Error al enviar el correo:", error);
    res.status(500).json({ message: 'Error en el servidor', error: error.toString() });
  }
};

export default handleForgottenPassword;