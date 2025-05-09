
import { Router } from 'express';
import getUserProfile from '../controllers/fetchUserInfo/getUserProfile.mjs';
import getUserLevelAndSkin from '../controllers/fetchUserInfo/getUserLevelAndSkin.mjs';
import getUserRecord from '../controllers/fetchUserInfo/getUserRecord.mjs';
import getUserShopInfo from '../controllers/fetchUserInfo/getUserShopInfo.mjs';

const router = Router();

// Ruta para obtener la información del perfil de usuario por su ID
router.get('/info/profile', getUserProfile);

// Ruta para obtener el maxLevel y activeSkin del user por ID
router.get('/info/level-&-skin', getUserLevelAndSkin);

// Ruta para obtener el record de un usuario en un nivel específico
router.get('/info/record/:level', getUserRecord);

// Ruta para obtener la información de la tienda de un usuario
router.get('/info/shop-info', getUserShopInfo);

// Exportar el enrutador
export default router;