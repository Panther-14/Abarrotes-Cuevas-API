const { Router } = require('express');
const router = Router();

const { verifytoken } = require('../security/tkn_auth.js');

router.use(verifytoken);

//Validación de pedido
router.get('/validarpedido', (req, res) => {
    res.json({test: "Hola!!"});
});

//Producción de pedido
router.get('/produccionpedido', (req, res) => {
    res.json({test: "Hola!!"});
});

//Envio de pedido
router.get('/enviarpedido', (req, res) => {
    res.json({test: "Hola!!"});
});

module.exports = router;