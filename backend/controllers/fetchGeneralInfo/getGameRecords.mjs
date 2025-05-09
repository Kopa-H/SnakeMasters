import User from '../../database/models/userModel.mjs';

const getGameRecords = async (req, res) => {
  console.log("\nSe ha recibido una petición para obtener los records de todos los niveles");

  try {
    // Verifica si numberOfLevels es válido
    const levelsNum = parseInt(req.body.levelsNum);
    if (isNaN(levelsNum) || levelsNum < 1 || levelsNum > 6) {
      throw new Error("El número de niveles es inválido.");
    }

    // Array para almacenar los registros de cada nivel
    const gameRecords = [];

    // Realiza una consulta para cada nivel
    for (let i = 1; i <= levelsNum; i++) {
      const selectFields = `_id username records.level_${i}.maxScore records.level_${i}.achievementDate activeSkin`;

      const levelRecords = await User.find({
        [`records.level_${i}.maxScore`]: { $gt: 0 } // Filtra los usuarios con un nivel mayor que cero
      })
      .sort({ [`records.level_${i}.maxScore`]: -1 })
      .limit(10)
      .select(selectFields);

      // Filtra usuarios repetidos y guarda los registros ordenados en gameRecords
      const uniqueLevelRecords = [];
      const userIds = new Set();
      levelRecords.forEach(record => {
        if (!userIds.has(record._id)) {
          userIds.add(record._id);
          uniqueLevelRecords.push({
            _id: record._id,
            username: record.username,
            maxScore: record.records[`level_${i}`].maxScore,
            achievementDate: record.records[`level_${i}`].achievementDate,
            activeSkin: record.activeSkin
          });
        }
      });

      gameRecords.push(uniqueLevelRecords);
      console.log(`Registros del nivel ${i} obtenidos con éxito`)
    }

    // Envía la respuesta JSON con los registros del juego
    res.json(gameRecords);
  } catch (error) {
    console.error('Error al obtener los records de los niveles:', error);
    res.status(500).json({ error: 'Error al obtener los records de los niveles' });
  }
};

export default getGameRecords;
