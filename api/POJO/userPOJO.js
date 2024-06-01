class userPOJO {
  constructor(
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    diaNacimiento,
    mesNacimiento,
    anioNacimiento,
    telefono,
    idTipoUsuario,
    idSucursal,
    user,
    password,
  ) {
    this.nombres = nombres;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.diaNacimiento = diaNacimiento;
    this.mesNacimiento = mesNacimiento;
    this.anioNacimiento = anioNacimiento;
    this.telefono = telefono;
    this.idTipoUsuario = idTipoUsuario;
    this.idSucursal = idSucursal;
    this.user = user;
    this.password = password;
  }
}


module.exports = userPOJO;
