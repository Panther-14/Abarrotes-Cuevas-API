const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

// Settings
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ["MBAPPES"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "Access-Control-Allow-Origin"],
};

// Middleware para analizar las solicitudes con cuerpo JSON
app.use(express.json({ limit: '10mb' })); // Limitar el tamaño de los datos JSON a 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.set("json spaces", 2);


// CORS
app.use(cors(corsOptions));

//Rutas WEB
app.use(express.static("./app/src"));
app.use(require("./app/web_app.js"));

//Rutas Auth - Basic Auth
app.use("/api/auth", require("./api/services/auth_service.js"));

//Rutas API - Token Auth
app.use("/api/admin", require("./api/services/administrador_service.js"));
app.use("/api/user", require("./api/services/consumer_service.js"));
app.use("/api/deliveryman", require("./api/services/deliveryman_service.js"));
app.use("/api/product", require("./api/services/productos_service.js"));
app.use("/api/executive", require("./api/services/executive_service.js"));

// Endpoint WildCard
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ error: true, message: "NO EXISTE EL RECURSO SOLICITADO" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
