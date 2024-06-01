const ExecutiveDAO = require("../data/executive_dao.js");

async function getOrders(order) {
  try {
    const orders = await ExecutiveDAO.getPedidos(order);
    return orders;
  } catch (err) {
    return err;
  }
}

async function validateOrder(order) {
  try {
    const resultados = await ExecutiveDAO.validarPedidos(order);
    return resultados;
  } catch (err) {
    return err;
  }
}
async function updateOrderStatus(order) {
  try {
    const resultados = await ExecutiveDAO.actualizarPedidos(order);
    return resultados;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getOrders,
  validateOrder,
  updateOrderStatus,
};
