// middleware.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import credentials from './credentials.mjs';
import corsOptions from '../config/corsOptions.mjs';

const app = express();

// Middleware para habilitar CORS
app.use(credentials);

// Middleware para habilitar CORS
app.use(cors(corsOptions));

// Middleware para parsear cookies
app.use(cookieParser());

app.use(bodyParser.json());

app.use(urlencoded({ extended: false }));

export default app;
