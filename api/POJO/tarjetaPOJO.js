class tarjetaPOJO {
  constructor(
    nombreTitular,
    numeroTarjeta,
    mesVencimiento,
    anioVencimiento,
    idTarjeta,
    idCliente,
    idBanco,
  ) {
    this.nombreTitular = nombreTitular;
    this.numeroTarjeta = numeroTarjeta;
    this.mesVencimiento = mesVencimiento;
    this.anioVencimiento = anioVencimiento;
    this.idTarjeta = idTarjeta;
    this.idCliente = idCliente;
    this.idBanco = idBanco;
  }
}

module.exports = tarjetaPOJO;
