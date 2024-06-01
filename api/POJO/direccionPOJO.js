class direccionPOJO {
  constructor(
    numExterno,
    numInterno,
    longitud,
    latitud,
    idDireccion,
    idCliente,
    idDireccionPostal,
  ) {
    this.numExterno = numExterno;
    this.numInterno = numInterno;
    this.longitud = longitud;
    this.latitud = latitud;
    this.idDireccion = idDireccion;
    this.idCliente = idCliente;
    this.idDireccionPostal = idDireccionPostal;
  }
}

module.exports = direccionPOJO;
