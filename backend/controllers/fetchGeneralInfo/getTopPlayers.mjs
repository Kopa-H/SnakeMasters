import User from '../../database/models/userModel.mjs';

// Ruta para obtener el top 10 de jugadores
const getTopPlayers = async (req, res) => {
  console.log("\nSe ha recibido una petición para obtener los top 10 jugadores");

  try {
    // Obtener los top 10 jugadores ordenados por totalScore
    const topPlayers = await User.find()
      .sort({ totalScore: -1 })
      .limit(10)
      .select('_id username totalScore activeSkin');

    //console.log("Top 10 jugadores obtenidos correctamente", topPlayers);
    res.json({ players: topPlayers });
  } catch (error) {
    console.error('Error al obtener top players:', error);
    res.status(500).json({ error: 'Error al obtener top players' });
  }
};

export default getTopPlayers;
