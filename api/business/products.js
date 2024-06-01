const ProductsDao = require("../data/products_dao.js");

async function getProductosInicioService() {
  try {
    const resultados = await ProductsDao.getProductosInicio();
    return resultados;
  } catch (err) {
    return err;
  }
}

async function getCategoriasInicioService() {
  try {
    const resultados = await ProductsDao.getCategoriasInicio();
    return resultados;
  } catch (err) {
    return err;
  }
}

async function getProductosService(busqueda, IDCategoria) {
  try {
    const resultados = await ProductsDao.getProductos(busqueda, IDCategoria);
    return resultados;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getProductosInicioService,
  getCategoriasInicioService,
  getProductosService,
};
