const { Router } = require("express");
const router = Router();

const basicAuth = require("../security/bsc_auth");
const UsuarioBusiness = require("../business/users");
const { signToken } = require("../security/tkn_auth");

router.use(basicAuth);

router.post("/login", (req, res) => {
  // Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud
  const { username, password } = req.body;

  if (username == "admin" && password == "admin") {
    signToken(username)
      .then((token) => {
        res.status(200).json({ error: false, token: token });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: true, message: "Error en el token" });
      });
  }

  /*UsuarioBusiness.loginUser(username, password)
    .then((resultados) => {
      console.log("Resultados:", resultados);
      if (resultados.modifiedCount > 0) {
        signToken(username)
      .then((token) => {
        res.status(200).json({ error: false, token: token });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: true, message: "Error en el token" });
      });
      } else {
        res
          .status(401)
          .json({ error: true, message: "Credenciales inválidas" });
      }
    })
    .catch((error) => {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: true, message: "Error al iniciar sesión" });
    });*/
});

//Registrar
router.put("/signin", (req, res) => {
  const {
    username,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    email,
    password,
    tipoUsuario,
  } = req.body;

  const usuario = {
    username,
    email,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    password,
    tipoUsuario,
  };

  UsuarioBusiness.registerUser(usuario)
    .then((resultados) => {
      console.log("Resultados:", resultados);
      if (resultados.success == true) {
        res.status(200).json({
          error: false,
          message: "Registro de Usuario exitosa",
          resultados: resultados,
        });
      } else {
        res.status(200).json({
          error: false,
          message: "Nada que Actualizar",
          resultados: resultados,
        });
      }
    })
    .catch((error) => {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: true, message: "Error en el registro" });
    });
});

module.exports = router;
