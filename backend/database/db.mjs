// ConnectDatabase.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.config();

const db = () => {

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('No hay una URI de conexión a la base de datos');
    process.exit(1);
  }

  mongoose.connect(MONGODB_URI);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
  db.once('open', () => {
    console.log(chalk.magenta('Conexión establecida con la base de datos'));
  });
}

export default db;
