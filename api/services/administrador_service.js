const { Router } = require('express');
const router = Router();

const { verifytoken } = require('../security/tkn_auth.js');

router.use(verifytoken);

router.put('/registrousuarios', (req, res) => {
    res.json({test: "Hola!!"});
});

router.put('/registrosucursles',(req, res) => {
    res.json({test: "Hola!!"});
});

router.put('/registroproducos',(req, res) => {
    res.json({test: "Hola!!"});
});

module.exports = router;