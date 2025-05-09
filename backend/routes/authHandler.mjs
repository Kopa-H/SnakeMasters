import { Router } from 'express';

import register from '../controllers/authHandler/register.mjs';
import login from '../controllers/authHandler/login.mjs';
import logout from '../controllers/authHandler/logout.mjs';
import deleteUser from '../controllers/authHandler/delete.mjs';
import forgottenPassword from '../controllers/authHandler/forgottenPassword.mjs';

const router = Router();

// Ruta para registrar un nuevo usuario:
router.post('/register', register);

// Ruta para hacer login y setting de cookies de autenticación:
router.post('/login', login);

// Ruta para hacer logout y eliminar las cookies de autenticación:
router.post('/logout', logout);

// Ruta para enviar un correo al usuario con un link para resetear la contraseña:
router.post('/forgotten-password', forgottenPassword);

// Ruta para eliminar un usuario existente
router.delete('/delete-account', deleteUser);

export default router;