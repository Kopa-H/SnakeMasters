
import { Router } from 'express';
import getTopPlayers from '../controllers/fetchGeneralInfo/getTopPlayers.mjs';
import getHistoryPunctuation from '../controllers/fetchGeneralInfo/getHistoryPunctuation.mjs';
import getGameRecords from '../controllers/fetchGeneralInfo/getGameRecords.mjs';

const router = Router();

// Ruta para obtener el top 10 de jugadores
router.get('/top-players', getTopPlayers);

// Ruta para obtener la suma del totalScore de todos los jugadores
router.get('/history-punctuation', getHistoryPunctuation);

// Ruta para obtener los records de todos los niveles:
router.post('/game-records', getGameRecords)

// Exportar el enrutador
export default router;