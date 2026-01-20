/**
 * Archivo Principal de la Aplicación (Entry Point)
 *
 * Configura el servidor Express, middlewares y rutas.
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config'; // Carga variables de entorno automáticamente

import router from './routes/router.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde otros dominios
app.use(morgan('dev')); // Loguea las peticiones HTTP en consola
app.use(express.json()); // Parsea body JSON

// Rutas
app.use('/api', router);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
