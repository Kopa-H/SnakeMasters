import User from '../../database/models/userModel.mjs';

// Ruta para obtener la suma del totalScore de todos los jugadores
const getHistoryPunctuation = async (req, res) => {
  console.log("\nSe ha recibido una petición para obtener el Historial de Puntuaciones de los jugadores");

  try {
    // Usar agregación para sumar totalScore de todos los jugadores
    const result = await User.aggregate([
      {
        $group: {
          _id: null, // No agrupamos por ningún campo
          totalPunctuation: { $sum: "$totalScore" }
        }
      }
    ]);

    // Obtener la suma total de puntuaciones
    const totalPunctuation = result.length > 0 ? result[0].totalPunctuation : 0;

    // Devolver la suma total de puntuaciones
    console.log("Total Punctuation:", totalPunctuation);
    res.json({ totalPunctuation });
  } catch (error) {
    console.error('Error al obtener el History Punctuation:', error);
    res.status(500).json({ error: 'Error al obtener el History Punctuation' });
  }
};

export default getHistoryPunctuation;