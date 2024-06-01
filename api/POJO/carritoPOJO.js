class carritoPOJO {
  constructor(idCarrito, fechaHoraCreacion, productos, total, descripcion) {
    this.idCarrito = idCarrito;
    this.fechaHoraCreacion = fechaHoraCreacion;
    this.productos = productos;
    this.total = total;
    this.descripcion = descripcion;
  }
}

module.exports = carritoPOJO;
