class consumerPOJO {
  constructor(
    idCliente,
    idCarrito,
    idPersona,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    diaNacimiento,
    mesNacimiento,
    anioNacimiento,
    telefono,
    idTipoUsuario,
    idSucursal,
    idLogin,
    user,
    password,
  ) {
    this.idCliente = idCliente;
    this.idCarrito = idCarrito;
    this.idPersona = idPersona;
    this.nombres = nombres;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.diaNacimiento = diaNacimiento;
    this.mesNacimiento = mesNacimiento;
    this.anioNacimiento = anioNacimiento;
    this.telefono = telefono;
    this.idTipoUsuario = idTipoUsuario;
    this.idSucursal = idSucursal;
    this.idLogin = idLogin;
    this.user = user;
    this.password = password;
  }
}

module.exports = consumerPOJO;
