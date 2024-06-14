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
    direccion.stringGoogle = req.body.stringGoogle;

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

router.get("/carrito/consultar", (req, res) => {
    console.log("Consultar");
    const { idCliente } = req.query;
    console.log("Cliente recibido: ", idCliente);
    ClientesService.consultarCarritoService(idCliente)
        .then((resultado) => {
            console.log("Resultado: ", resultado);
            if (resultado !== null) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({
                    error: true,
                    message: "No se encontraro un carrito para este cliente",
                });
            }
        })
        .catch((error) => {
            console.error("Error en la consulta: ", error);
            res.status(500).json({
                error: true,
                message: "Error interno en el servidor",
            });
        });
});

router.post("/carrito/agregarproducto", (req, res) => {
    console.log("Agregar");
    const idCliente = req.body.idCliente;
    console.log("idCliente: ", idCliente);
    const producto = req.body.productos[0];
    console.log("producto: ", producto);

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

router.delete("/carrito/eliminarproducto", (req, res) => {
    console.log("Eliminiar");
    var idCliente = req.body.idCliente;
    console.log(idCliente);
    var producto = req.body.productos[0];
    console.log(producto);

    ClientesService.eliminarProductoCarritoService(idCliente, producto)
        .then((resultado) => {
            console.log(resultado);
            if (resultado.success == true) {
                res.status(200).json({
                    error: false,
                    message: "Eliminación de producto en carrito exitosa",
                });
            } else {
                res.status(400).json({
                    error: true,
                    message:
                        resultado.message ||
                        "No se pudo eliminar el producto en carrito",
                });
            }
        })
        .catch((error) => {
            console.error("Error en la eliminación: ", error);
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
    console.log(idPedido);
    ClientesService.cancelarPedidoService(idPedido)
        .then((resultados) => {
            console.log("Resultados:", resultados);
            if (resultados.success == true) {
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
    const { idCliente } = req.query;
    let consumer = {
        id: parseInt(idCliente),
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
    reporte.titulo = req.body.titulo;
    reporte.descripcion = req.body.descripcion;
    console.log("Reporte", reporte);

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

router.get("/obtenerdirecciones", (req, res) => {
    const { idCliente } = req.query;
    ClientesService.getDireccionClienteService(idCliente)
        .then((resultados) => {
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(404).json({
                    error: true,
                    message: "No se encontraron direcciones con ese usuario",
                    resultados: resultados.length,
                });
            }
        })
        .catch((error) => {
            console.error("Error en la consulta: ", error);
            res.status(500).json({
                error: true,
                message: "Error interno en el servidor",
            });
        });
});

module.exports = router;
