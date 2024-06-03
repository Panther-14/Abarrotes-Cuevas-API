const { Router } = require("express");
const router = Router();
const ClientesService = require("../business/users.js");
const Cliente = require("../POJO/consumerPOJO.js");
const Direccion = require("../POJO/direccionPOJO.js");
const Tarjeta = require("../POJO/tarjetaPOJO.js");
const Carrito = require("../POJO/carritoPOJO.js");
const Reporte = require("../POJO/reportePOJO.js");
const { verifyToken } = require("../security/tkn_auth.js");
const { DateTime } = require("mssql");

router.use(verifyToken);

router.post("/registrarcliente", (req, res) => {
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

//Registro de direccion de entrega del consumidor
router.post("/registrardireccion", (req, res) => {
    direccion = new Direccion();
    direccion.idDireccion = req.body.idDireccion;
    direccion.idCliente = req.body.idCliente;
    direccion.idDireccionPostal = req.body.idDireccionPostal;
    direccion.numExterno = req.body.numExterno;
    direccion.numInterno = req.body.numInterno;
    direccion.latitud = req.body.latitud;
    direccion.longitud = req.body.longitud;

    ClientesService.registrarDireccionService(direccion)
        .then((resultado) => {
            console.log(resultado);
            if (resultado.success == true) {
                res.status(201).json({
                    error: false,
                    message: "Registro de dirección exitoso",
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "No se pudo registrar la dirección",
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

//Registro de metodo de pago del consumidor
router.post("/registrarmetodopago", (req, res) => {
    tarjeta = new Tarjeta();
    tarjeta.idCliente = req.body.idCliente;
    tarjeta.idBanco = req.body.idBanco;
    tarjeta.nombreTitular = req.body.nombreTitular;
    tarjeta.numeroTarjeta = req.body.numeroTarjeta;
    tarjeta.mesVencimiento = req.body.mesVencimiento;
    tarjeta.anioVencimiento = req.body.anioVencimiento;

    console.log(tarjeta);
    ClientesService.registrarTarjetaService(tarjeta)
        .then((resultado) => {
            console.log(resultado);
            if (resultado.success == true) {
                res.status(201).json({
                    error: false,
                    message: "Registro de tarjeta exitoso",
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "No se pudo registrar la tarjeta",
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

router.post("/carrito/agregarproducto", (req, res) => {
    var idCliente = req.body.idCliente;
    console.log(idCliente);
    var producto = req.body.productos[0];
    console.log(producto);

    ClientesService.agregarProductoCarritoService(idCliente, producto)
        .then((resultado) => {
            console.log(resultado);
            if (resultado.success == true) {
                res.status(201).json({
                    error: false,
                    message: "Registro de producto en carrito exitoso",
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "No se pudo registrar el producto en carrito",
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

//Registro de pedido del consumidor
router.post("/realizarpedido", (req, res) => {
    var idCliente = req.body.idCliente;
    var idCarrito = req.body.idCarrito;

    ClientesService.registrarPedidoService(idCliente, idCarrito)
        .then((resultado) => {
            console.log(resultado);
            if (resultado.success == true) {
                res.status(201).json({
                    error: false,
                    message: "Registro de pedido exitoso",
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "No se pudo registrar el pedido",
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

router.delete("/cancelarpedido", (req, res) => {
    var idPedido = req.body.idPedido;
    ClientesService.cancelarPedidoService(idPedido)
        .then((resultado) => {
            console.log("Resultados:", resultados);
            if (resultados.length > 0) {
                res.status(200).json({
                    error: false,
                    message: "Pedido Cancelado con exito",
                    resultados: resultados,
                });
            } else {
                res.status(200).json({
                    error: false,
                    message: "No se pudo cancelar el pedido",
                    resultados: resultados,
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

//Listar pedidos del consumidor (Panther)
router.get("/listarpedidos", (req, res) => {
    let consumer = {
        id: req.body.id,
    };
    ClientesService.listOrders(consumer)
        .then((resultados) => {
            console.log("Resultados:", resultados);
            if (resultados.length > 0) {
                res.status(200).json({
                    error: false,
                    message: "Consulta exitosa",
                    resultados: resultados,
                });
            } else {
                res.status(200).json({
                    error: false,
                    message: "Nada que mostrar",
                    resultados: resultados,
                });
            }
        })
        .catch((error) => {
            console.error("Error en la consulta:", error);
            res.status(500).json({
                error: true,
                message: "Error en la consulta",
            });
        });
});

//Detalle de pedido del consumidor (Panther)
router.get("/detallesdepedido/:id", (req, res) => {
    let consumer = {
        id: req.body.id,
        idPedido: req.params.id,
    };
    ClientesService.listOrders(consumer)
        .then((resultados) => {
            console.log("Resultados:", resultados);
            if (resultados.length > 0) {
                res.status(200).json({
                    error: false,
                    message: "Consulta exitosa",
                    resultados: resultados,
                });
            } else {
                res.status(200).json({
                    error: false,
                    message: "Nada que mostrar",
                    resultados: resultados,
                });
            }
        })
        .catch((error) => {
            console.error("Error en la consulta:", error);
            res.status(500).json({
                error: true,
                message: "Error en la consulta",
            });
        });
});

router.post("/problemasdepedido", (req, res) => {
    reporte = new Reporte();
    reporte.idPedido = req.body.idPedido;
    reporte.titulo = req.body.tituloReporteCon;
    reporte.descripcion = req.body.descripcionReporteCon;

    ClientesService.registrarReportePedidoService(reporte)
        .then((resultado) => {
            console.log(resultado);
            if (resultado.success == true) {
                res.status(201).json({
                    error: false,
                    message: "Registro de reporte exitoso",
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "No se pudo registrar el reporte",
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

//Cancelar pedido del consumidor
router.get("/cancelarpedido", (req, res) => {
    res.json({ test: "Hola!!" });
});


module.exports = router;
