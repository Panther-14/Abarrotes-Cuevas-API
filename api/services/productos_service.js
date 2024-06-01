const { Router } = require("express");
const { verifyToken } = require("../security/tkn_auth.js");
const ProductosService = require("../business/products.js");
const router = require("./administrador_service.js");

router.use(verifyToken);

router.get("/productosinicio", (req, res) => {
    ProductosService.getProductosInicioService()
        .then((resultados) => {
            console.log(resultados);
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(404).json({
                    error: true,
                    message: "No se encontraron productos",
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

router.get("/categoriasinicio", (req, res) => {
    ProductosService.getCategoriasInicioService()
        .then((resultados) => {
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(404).json({
                    error: true,
                    message: "No se encontraron categorias",
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

router.get("/obtenerproductos", (req, res) => {
    const busqueda = req.body.busqueda;
    const IDCategoria = req.body.IDCategoria;
    ProductosService.getProductosService(busqueda, IDCategoria)
        .then((resultados) => {
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(404).json({
                    error: true,
                    message: "No se encontraron productos",
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
