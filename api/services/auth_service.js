const { Router } = require('express');
const router = Router();

const basicAuth = require('../security/bsc_auth');
const jwt = require('jsonwebtoken');
const UsuarioBusiness = require("../business/users");

const SECRET_KEY = process.env.SECRET_KEY;

router.use(basicAuth);

// Iniciar sesión
router.post('/login', (req, res) => {
  res.json({test: "Hola!!"});
});

//Registrar
router.put('/signin', (req, res) => {
  res.json({test: "Hola!!"});
});

module.exports = router;