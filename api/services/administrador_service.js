const { Router } = require("express");
const { verifyToken } = require("../security/tkn_auth.js");
const AdminService = require("../business/admin.js");
const User = require("../POJO/userPOJO.js");
const Sucursal = require("../POJO/sucursalPOJO.js");
const Product = require("../POJO/productPOJO.js");
const { registrarProducto } = require("../data/admin_dao.js");

const router = Router();

router.use(verifyToken);

// Ruta para registrar un usuario
router.post("/registrarusuario", (req, res) => {
    user = new User();
    user.nombres = req.body.nombres;
    user.apellidoPaterno = req.body.apellidoPaterno;
    user.apellidoMaterno = req.body.apellidoMaterno;
    user.diaNacimiento = req.body.diaNacimiento;
    user.mesNacimiento = req.body.mesNacimiento;
    user.anioNacimiento = req.body.anioNacimiento;
    user.telefono = req.body.telefono;
    user.idTipoUsuario = req.body.IDTipoUsuario;
    user.idSucursal = req.body.IDSucursal;
    user.user = req.body.User;
    user.password = req.body.Password;

    AdminService.registrarUsuarioService(user)
        .then((resultados) => {
            if (resultados.success == true) {
                res.status(201).json({
                    error: false,
                    message: "Registro de usuario exitoso",
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "No se pudo registrar el usuario",
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

router.post("/registrarsucursal", (req, res) => {
    sucursal = new Sucursal();
    sucursal.idSucursal = "";
    sucursal.nombreComercial = req.body.nombreComercial;
    sucursal.direccion = req.body.direccion;
    sucursal.latitud = req.body.latitud;
    sucursal.longitud = req.body.longitud;
    sucursal.horarioInicio = req.body.horarioInicio;
    sucursal.horarioFin = req.body.horarioFin;

    AdminService.registrarSucursalService(sucursal)
        .then((resultados) => {
            if (resultados.success == true) {
                res.status(201).json({
                    error: false,
                    message: "Registro de sucursal exitoso",
                    affectedRows: resultados.affectedRows,
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "No se pudo registrar la sucursal",
                    affectedRows: resultados.affectedRows,
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

// Ruta para registrar un producto
router.post("/registrarproducto", (req, res) => {
    producto = new Product();
    producto.idProducto = req.body.idProducto;
    producto.fotografia = req.body.fotografia;
    producto.nombre = req.body.nombre;
    producto.descripcion = req.body.descripcion;
    producto.precio = req.body.precio;
    producto.unidades = req.body.unidades;
    producto.idCategoria = req.body.idCategoria;
    producto.idTipoBarCode = req.body.idTipoBarCode;
    producto.idSucursal = req.body.idSucursal;
    console.log(producto);

    AdminService.registrarProductoService(producto)
        .then((resultados) => {
            console.log(resultados);
            if (resultados.success == true) {
                res.status(201).json({
                    error: false,
                    message: "Registro de producto exitoso",
                    affectedRows: resultados.affectedRows,
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "No se pudo registrar el producto",
                    affectedRows: resultados.affectedRows,
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
