import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
const app = express();
import { config } from 'dotenv';
config();

// API Settings
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
};

// Middleware para analizar las solicitudes con cuerpo JSON
app.use(json());
app.set('json spaces', 2);

// CORS
app.use(cors(corsOptions));

//Rutas WEB PAGE
app.use(express.static('./web/src'));
app.use(require('./web/web_page.js'));

//Rutas Auth - Basic Auth
app.use('/api/auth', require('./api/services/auth_service.js'));

//Rutas API - Token Auth
app.use('/api/users', require('./api/services/user_service.js'));

// Endpoint WildCard
app.all('*', (req, res) => {
  res.status(404).json({ error: true, message: "NO EXISTE EL RECURSO SOLICITADO" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
