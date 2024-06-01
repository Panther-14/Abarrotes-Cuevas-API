const { invalid } = require("moment");
const { getDb } = require("../data/mongo_connection");

async function getPedidos() {
  try {
    const db = getDb();
    const pedidos = await db.collection("Pedidos").find({}).toArray();
    return pedidos;
  } catch (err) {
    throw new Error(err);
  }
}

async function actualizarPedidos(pedido) {
  try {
    const db = getDb();
    const products = await db
      .collection("Pedidos")
      .updateOne(
        { idPedido: pedido.id, $nor: [{ status: "without validation" }] },
        { $set: { deliveryman: pedido.deliveryman, status: pedido.status } },
        { upsert: false },
      );
    return products;
  } catch (err) {
    throw new Error(err);
  }
}

async function validarPedidos(order) {
  try {
    const db = getDb();
    const products = await db
      .collection("Pedidos")
      .updateOne(
        { idPedido: order.id, status: "without validation" },
        { $set: { status: order.status } },
        { upsert: false },
      );
    return products;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getPedidos,
  validarPedidos,
  actualizarPedidos,
};
