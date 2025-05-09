// Propósito: Controlador para comparar contraseñas hasheadas
// Notas: Este controlador se encarga de comparar una contraseña hasheada almacenada en la base de datos con una contraseña sin hashear proporcionada por el frontend. Para ello, se utiliza la librería bcrypt para comparar las contraseñas. Este controlador se utiliza en la ruta POST '/check-password/:id'

import User from '../../database/models/userModel.mjs'; // Importa el modelo de usuario
import bcrypt from 'bcrypt'; // Importa la librería bcrypt
import dotenv from 'dotenv'; // Importa la librería dotenv
dotenv.config(); // Ejecuta la configuración de dotenv

// Se obtiene la contraseña hasheada de la base de datos:
async function getDatabasePassword(userId) {
  try {
    // Buscar el usuario en la base de datos
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      throw new Error('Usuario no encontrado');
    }

    // Obtener la contraseña del usuario
    const backendPassword = foundUser.hashedPassword;

    return backendPassword;
  } catch (error) {
    console.error('Error al obtener la contraseña del usuario:', error);
    throw error;
  }
}

const checkPassword = async (req, res) => {
  console.log("\nSe ha recibido una petición para checkear una contraseña del frontend");

  // Obtener el ID del usuario de los parámetros de la solicitud
  const userId = req.params.id;

  // Obtener la contraseña sin hashear del cuerpo de la solicitud
  const frontendPassword = req.body.password; // Suponiendo que el frontend envía la contraseña sin hashear en el cuerpo de la solicitud

  try {
    // Obtener la contraseña almacenada en la base de datos
    const backendPassword = await getDatabasePassword(userId);
    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const match = bcrypt.compareSync(frontendPassword, backendPassword);

    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({ match });
  } catch (error) {
    console.error("Error al comparar contraseñas:", error);
    res.status(500).json({ error: "Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde." });
  }
}

export default checkPassword;