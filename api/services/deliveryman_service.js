const { Router } = require("express");
const router = Router();
const DeliveryManBusiness = require("../business/deliveryman");

const { verifyToken } = require("../security/tkn_auth.js");

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

module.exports = router;
