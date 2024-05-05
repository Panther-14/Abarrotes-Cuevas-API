const { Router } = require('express');
const router = Router();

const { verifytoken } = require('../security/tkn_auth.js');

router.use(verifytoken);

//Catalogo de productos
router.get('/productos', (req, res) => {
    res.json({test: "Hola!!"});
});

module.exports = router;