import app from './middleware/middleware.mjs';
import chalk from 'chalk';

import ConnectDatabase from './database/db.mjs';

import authHandlerRouter from './routes/authHandler.mjs';
import fetchUserInfoRouter from './routes/fetchUserInfo.mjs';
import userActionsRouter from './routes/userActions.mjs';
import fetchGeneralInfoRouter from './routes/fetchGeneralInfo.mjs';
import utilitiesRouter from './routes/utilities.mjs';

import verifyJWT from './middleware/verifyJWT.mjs';

const PORT = 5002;

// PUBLIC ROUTES
app.use('/api/user', authHandlerRouter);
app.use('/api', fetchGeneralInfoRouter);

// PRIVATE ROUTES
app.use(verifyJWT);
app.use('/api/user', fetchUserInfoRouter);
app.use('/api/user', userActionsRouter);
app.use('/api/user', utilitiesRouter);

// CONNECT TO DATABASE
ConnectDatabase();

// START SERVER
app.listen(PORT, () => {
  console.log(chalk.blue(`\nServidor Express escuchando en ${PORT}`));
});