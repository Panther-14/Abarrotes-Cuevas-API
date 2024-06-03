const { getDb } = require("../data/mongo_connection");

async function getPedidos(delivery) {
  try {
    const db = getDb();
    const products = await db
      .collection("Pedidos")
      .find({ deliveryman: delivery.id })
      .toArray();
    return products;
  } catch (err) {
    throw new Error(err);
  }
}

async function actualizarPedidos(delivery) {
  try {
    const db = getDb();
    const products = await db
      .collection("Pedidos")
      .updateOne(
        { idPedido: delivery.id },
        { $set: { status: delivery.status } },
        { upsert: false },
      );
    return products;
  } catch (err) {
    throw new Error(err);
  }
}

async function registrarReportePedido(reporte){
  try{
    const db = getDb();
    const reporteBD = await db
      .collection("Pedidos")
      .updateOne(
        {idPedido: reporte.idPedido},
        { $set: { tituloReporteRep: reporte.titulo } },
        { $set: { descripcionReporteRep: reporte.descripcion } }
        { upsert: false},
      );
    return reporteBD;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getPedidos,
  actualizarPedidos,
  registrarReportePedido,
};
