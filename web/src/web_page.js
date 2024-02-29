const { Router } = require('express');
const router = Router();

// Endpoint de inicio
router.get('/', (req, res) => {
  res.send('index.html');
});

module.exports = router;
