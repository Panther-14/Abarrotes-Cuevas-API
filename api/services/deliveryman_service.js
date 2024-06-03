const { Router } = require("express");
const router = Router();
const Reporte = require("../POJO/reportePOJO");
const RepartidorService = require("../business/deliveryman.js");
const DeliveryManBusiness = require("../business/deliveryman");

const { verifyToken } = require("../security/tkn_auth.js");
const reportePOJO = require("../POJO/reportePOJO");

router.use(verifyToken);

//Visualizar pedidos
router.get("/pedidosasignados", (req, res) => {
    const deliveryman = {
        id: req.body.id,
        status: req.body.status,
    };

    DeliveryManBusiness.getOrders(deliveryman)
        .then((resultados) => {
            console.log("Resultados:", resultados);
            if (resultados.length > 0) {
                res.status(200).json({
                    error: false,
                    message: "Consulta exitosa",
                    pedidos: resultados,
                });
            } else {
                res.status(200).json({
                    error: false,
                    message: "Nada que mostrar",
                    pedidos: resultados,
                });
            }
        })
        .catch((error) => {
            console.error("Error en el registro:", error);
            res.status(500).json({
                error: true,
                message: "Error en el registro",
            });
        });
});

//Confirmar entrega
router.post("/confirmarentrega", (req, res) => {
    const deliveryman = {
        id: req.body.id,
        status: req.body.status,
    };

    DeliveryManBusiness.updateOrderStatus(deliveryman)
        .then((resultados) => {
            console.log("Resultados:", resultados);
            if (resultados.modifiedCount > 0) {
                res.status(200).json({
                    error: false,
                    message: "Actualización exitosa",
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
            res.status(500).json({
                error: true,
                message: "Error en el registro",
            });
        });
});

//Reportar problema con pedido del consumidor
router.post("/problemasdepedido", (req, res) => {
    reporte = new Reporte();
    reporte.idPedido = req.body.idPedido;
    reporte.titulo = req.body.tituloReporteRep;
    reporte.descripcion = req.body.descripcionReporteRep;

    RepartidorService.registrarReportePedidoService(reporte)
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

module.exports = router;
