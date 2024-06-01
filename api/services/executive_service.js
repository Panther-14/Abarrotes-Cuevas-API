const { Router } = require("express");
const router = Router();
const ExecutiveBusiness = require("../business/executive");

const { verifyToken } = require("../security/tkn_auth.js");

router.use(verifyToken);

router.get("/pedidos", (req, res) => {
    ExecutiveBusiness.getOrders()
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

//Validación de pedido
router.post("/validarpedido", (req, res) => {
    let pedido = {
        id: req.body.id,
        status: req.body.status,
    };
    ExecutiveBusiness.validateOrder(pedido)
        .then((resultados) => {
            console.log("Resultados:", resultados);
            if (resultados.modifiedCount > 0) {
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

//Producción de pedido
router.post("/produccionpedido", (req, res) => {
    let pedido = {
        id: req.body.id,
        deliveryman: req.body.deliveryman,
        status: req.body.status, // Production
    };
    ExecutiveBusiness.updateOrderStatus(pedido)
        .then((resultados) => {
            console.log("Resultados:", resultados);
            if (resultados.modifiedCount > 0) {
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

//Envio de pedido
router.post("/enviarpedido", (req, res) => {
    let pedido = {
        id: req.body.id,
        deliveryman: req.body.deliveryman,
        status: req.body.status, // Sending
    };
    ExecutiveBusiness.updateOrderStatus(pedido)
        .then((resultados) => {
            console.log("Resultados:", resultados);
            if (resultados.modifiedCount > 0) {
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

module.exports = router;
