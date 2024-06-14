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

async function getDireccionClienteService(idCliente) {
  try {
    const resultado = await UserDao.getDireccionCliente(idCliente);
    console.log(resultado.recordset);
    return resultado.recordset;
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

async function consultarCarritoService(idCliente) {
  try {
    const resultado = await UserDao.consultarCarrito(idCliente);
    return resultado;
  } catch (err) {
    return err;
  }
}

async function agregarProductoCarritoService(idCliente, producto) {
  try {
    const resultado = await UserDao.agregarProductoCarrito(idCliente, producto);
    return resultado;
  } catch (err) {
    return err;
  }
}

async function eliminarProductoCarritoService(idCliente, producto) {
  try {
    const resultado = await UserDao.eliminarProductoCarrito(
      idCliente,
      producto,
    );
    return resultado;
  } catch (err) {
    return err;
  }
}

async function registrarPedidoService(idCliente, idCarrito) {
  try {
    const resultado = await UserDao.registrarPedido(idCliente, idCarrito);
    return resultado;
  } catch (err) {
    return err;
  }
}

async function cancelarPedidoService(idPedido) {
  try {
    console.log(idPedido);
    const resultado = await UserDao.cancelarPedido(idPedido);
    return resultado;
  } catch (err) {
    return err;
  }
}

async function listOrders(consumer) {
  try {
    console.log(consumer);
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

async function registrarReportePedidoService(reporte) {
  try {
    const resultado = await UserDao.registrarReportePedido(reporte);
    return resultado;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllUsers,
  registrarClienteService,
  registrarDireccionService,
  getDireccionClienteService,
  registrarTarjetaService,
  consultarCarritoService,
  agregarProductoCarritoService,
  eliminarProductoCarritoService,
  registrarPedidoService,
  cancelarPedidoService,
  loginUser,
  listOrders,
  getOrderDetails,
  registrarReportePedidoService,
};
