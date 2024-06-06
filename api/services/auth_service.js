const { Router } = require("express");
const router = Router();

const basicAuth = require("../security/bsc_auth");
const UsuarioBusiness = require("../business/users");
const ClientesService = require("../business/users.js");
const Cliente = require("../POJO/consumerPOJO.js");
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
  cliente = new Cliente();
  cliente.user = req.body.User;
  cliente.password = req.body.Password;
  cliente.nombres = req.body.Nombres;
  cliente.apellidoPaterno = req.body.ApellidoPaterno;
  cliente.apellidoMaterno = req.body.ApellidoMaterno;
  cliente.diaNacimiento = req.body.DiaNacimiento;
  cliente.mesNacimiento = req.body.MesNacimiento;
  cliente.anioNacimiento = req.body.AnioNacimiento;
  cliente.telefono = req.body.Telefono;
  cliente.idSucursal = req.body.Sucursal;

  ClientesService.registrarClienteService(cliente)
    .then((resultados) => {
      if (resultados.success == true) {
        res.status(201).json({
          error: false,
          message: "Registro de cliente exitoso",
        });
      } else {
        res.status(400).json({
          error: true,
          message: "No se pudo registrar el cliente",
        });
      }
    })
    .catch((error) => {
      console.error("Error en el registro: ", error);
      res.status(500).json({
        error: true,
        message: "Error interno en el servidor",
      });
    });
});

module.exports = router;
