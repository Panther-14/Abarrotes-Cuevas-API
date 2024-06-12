const { Router } = require("express");
const ProductosService = require("../business/products.js");

const router = Router();

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
    const { busqueda, IDCategoria } = req.query;
    console.log({ busqueda, IDCategoria });
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

router.get("/obtenerproductos/:IDCategoria", (req, res) => {
    const IDCategoria = req.params.IDCategoria;

    ProductosService.getProductosPorCategoriaService(IDCategoria)
        .then((resultados) => {
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(404).json({
                    error: true,
                    message: "No se encontraron productos para esta categoría",
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
