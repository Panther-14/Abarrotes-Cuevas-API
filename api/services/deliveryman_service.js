const { Router } = require('express');
const router = Router();

const { verifytoken } = require('../security/tkn_auth.js');

router.use(verifytoken);

//Visualizar pedidos
router.get('/pedidosasignados', (req, res) => {
    res.json({test: "Hola!!"});
});

//Confirmar entrega
router.get('/confirmarentrega', (req, res) => {
    res.json({test: "Hola!!"});
});

module.exports = router;