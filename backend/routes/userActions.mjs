import { Router } from 'express';
const router = Router();

import modifyUser from '../controllers/userActions/modifyUser.mjs';

import buySkin from '../controllers/userActions/buySkin.mjs';
import setSkin from '../controllers/userActions/setSkin.mjs';
import levelUp from '../controllers/userActions/levelUp.mjs';
import setNewRecord from '../controllers/userActions/setNewRecord.mjs';
import addCash from '../controllers/userActions/addCash.mjs';
import sumTotalScore from '../controllers/userActions/sumTotalScore.mjs';

// Ruta para cambiar el username de un usuario
router.post('/modify-user', modifyUser);

// Ruta para comprar una skin
router.post('/buy-skin', buySkin);

// Ruta para establecer una skin
router.post('/set-skin', setSkin);

// Ruta para subir de nivel a un jugador
router.post('/level-up', levelUp);

// Ruta para establecer un nuevo record
router.post('/new-record', setNewRecord);

// Ruta para añadir dinero a un jugador
router.post('/add-cash', addCash);

// Ruta para añadir totalScore a un jugador
router.post('/sum-total-score', sumTotalScore);

export default router;