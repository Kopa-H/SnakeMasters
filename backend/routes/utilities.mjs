import { Router } from 'express';

import refreshToken from '../controllers/utilities/refreshAccessToken.mjs';
import checkPassword from '../controllers/utilities/checkPassword.mjs';

const router = Router();

// Ruta para refrescar el token de acceso (frontend -> backend)
router.get('/refresh-token', refreshToken);

// Ruta para comprobar la validez de una contraseña (frontend -> backend)
router.post('/check-password/:id', checkPassword);


export default router;