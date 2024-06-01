class productPOJO {
  constructor(
    idProducto,
    fotografia,
    nombre,
    descripcion,
    precio,
    unidades,
    idCategoria,
    idTipoBarCode,
    idSucursal,
  ) {
    this.idProducto = idProducto;
    this.fotografia = fotografia;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.unidades = unidades;
    this.idCategoria = idCategoria;
    this.idTipoBarCode = idTipoBarCode;
    this.idSucursal = idSucursal;
  }
}

module.exports = productPOJO;
