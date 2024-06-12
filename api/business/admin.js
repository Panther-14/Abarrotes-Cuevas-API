const { Admin } = require("mongodb");
const AdminDao = require("../data/admin_dao");

async function registrarUsuarioService(user) {
  try {
    const resultados = await AdminDao.registrarUsuario(user);
    return resultados;
  } catch (err) {
    return err;
  }
}

async function registrarSucursalService(sucursal) {
  try {
    const resultados = await AdminDao.registrarSucursal(sucursal);
    return resultados;
  } catch (err) {
    return err;
  }
}

async function registrarProductoService(producto) {
  try {
    const resultados = await AdminDao.registrarProducto(producto);
    return resultados;
  } catch (err) {
    return err;
  }
}

async function getTiposUsuarioService(){
  try{
    const resultados = await AdminDao.getTiposUsuario();
    return resultados;
  } catch (err) {
    return err;
  }
}

async function getSucursalesService(){
  try{
    const resultados = await AdminDao.getSucursales();
    return resultados;
  } catch (err){
    return err
  }
}

module.exports = {
  registrarUsuarioService,
  registrarSucursalService,
  registrarProductoService,
  getTiposUsuarioService,
  getSucursalesService,
};
