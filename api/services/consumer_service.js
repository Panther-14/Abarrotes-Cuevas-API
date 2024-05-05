const { Router } = require('express');
const router = Router();

const { verifytoken } = require('../security/tkn_auth.js');

router.use(verifytoken);

//Registro de direccion de entrega del consumidor
router.post('/registrardireccion', (req, res) => {
    res.json({test: "Hola!!"});
});

//Registro de metodo de pago del consumidor
router.post('/registrarmetodopago', (req, res) => {
    res.json({test: "Hola!!"});
});

//Registro de pedido del consumidor
router.post('/pedido', (req, res) => {
    res.json({test: "Hola!!"});
});

//Listar pedidos del consumidor
router.get('/listarpedidos', (req, res) => {
    res.json({test: "Hola!!"});
});

//Detalle de pedido del consumidor
router.get('/detallesdepedido', (req, res) => {
    res.json({test: "Hola!!"});
});

//Cancelar pedido del consumidor
router.get('/cancelarpedido', (req, res) => {
    res.json({test: "Hola!!"});
});

//Reportar problema con pedido del consumidor
router.get('/problemasdepedido', (req, res) => {
    res.json({test: "Hola!!"});
});

module.exports = router;