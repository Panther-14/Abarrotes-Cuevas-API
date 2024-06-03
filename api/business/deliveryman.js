const DeliveryManDAO = require("../data/deliveryman_dao");

async function getOrders(delivery) {
  try {
    const users = await DeliveryManDAO.getPedidos(delivery);
    return users;
  } catch (err) {
    return err;
  }
}

async function updateOrderStatus(delivery) {
  try {
    const users = await DeliveryManDAO.actualizarPedidos(delivery);
    return users;
  } catch (err) {
    return err;
  }
}

async function registrarReportePedidoService(reporte) {
  try {
    const resultado = await DeliveryManDAO.registrarReportePedido(reporte);
    return resultado;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getOrders,
  updateOrderStatus,
  registrarReportePedidoService,
};
