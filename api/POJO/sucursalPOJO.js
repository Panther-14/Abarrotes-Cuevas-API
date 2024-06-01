class sucursalPOJO {
  constructor(
    idSucursal,
    nombreComercial,
    direccion,
    latitud,
    longitud,
    horarioInicio,
    horarioFin,
  ) {
    this.idSucursal = idSucursal;
    this.nombreComercial = nombreComercial;
    this.direccion = direccion;
    this.latitud = latitud;
    this.longitud = longitud;
    this.horarioInicio = horarioInicio;
    this.horarioFin = horarioFin;
  }
}

module.exports = sucursalPOJO;
