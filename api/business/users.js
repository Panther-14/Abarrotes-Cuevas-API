const UserDao = require("../data/user_dao.js");

async function registrarClienteService(cliente) {
  try {
    const resultados = await UserDao.registrarCliente(cliente);
    return resultados;
  } catch (err) {
    return err;
  }
}

async function loginUser(user, password) {
  try {
    const users = await UserDao.getUsers(user, password);
    return users;
  } catch (err) {
    return err;
  }
}
async function getAllUsers() {
  try {
    const users = await UserDao.getUsers();
    return users;
  } catch (err) {
    return err;
  }
}

async function registrarDireccionService(direccion) {
  try {
    const resultado = await UserDao.registrarDireccion(direccion);
    return resultado;
  } catch (err) {
    return err;
  }
}

async function registrarTarjetaService(tarjeta) {
  try {
    const resultado = await UserDao.registrarTarjeta(tarjeta);
    return resultado;
  } catch (err) {
    return err;
  }
}
async function registrarPedidoService(idCliente, carrito) {
  try {
    const resultado = await UserDao.registrarPedido(idCliente, carrito);
    return resultado;
  } catch (err) {
    return err;
  }
}

async function listOrders(consumer) {
  try {
    const pedidos = await UserDao.getOrders(consumer);
    return pedidos;
  } catch (err) {
    return err;
  }
}

async function getOrderDetails(consumer) {
  try {
    const pedido = await UserDao.getOrderDetails(consumer);
    return pedido;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllUsers,
  registrarClienteService,
  registrarDireccionService,
  registrarTarjetaService,
  registrarPedidoService,
  loginUser,
  listOrders,
  getOrderDetails,
};
