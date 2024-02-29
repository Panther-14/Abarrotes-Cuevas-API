import { Router } from 'express';
const router = Router();

import basicAuth from '../security/bsc_auth';

router.use(basicAuth);

//Iniciar Sesión
router.post('/login', );

//Registrar
router.put('/signin', (req, res) => {
  const { username, nombre, apellidoPaterno, apellidoMaterno, email, password, tipoUsuario } = req.body;

  const usuario = { username, email, nombre, apellidoPaterno, apellidoMaterno, password, tipoUsuario };

  registerUser(usuario)
    .then((resultados) => {
      console.log("Resultados:", resultados);
      if (resultados.affectedRows > 0) {
        res.status(200).json({ error: false, message: 'Registro de Usuario exitosa', affectedRows: resultados.affectedRows });
      } else {
        res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: true, message: "Error en el registro" });
    });
});

export default router;
