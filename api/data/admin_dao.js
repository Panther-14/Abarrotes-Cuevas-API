const sql = require("mssql");
const dbConnection = require("../data/db_connection");

async function registrarUsuario(user) {
  try {
    const pool = await dbConnection.poolPromise;
    const request = pool.request();

    request.input("Nombres", sql.VarChar(100), user.nombres);
    request.input("ApellidoPaterno", sql.VarChar(100), user.apellidoPaterno);
    request.input("ApellidoMaterno", sql.VarChar(100), user.apellidoMaterno);
    request.input("DiaNacimiento", sql.Int, user.diaNacimiento);
    request.input("MesNacimiento", sql.Int, user.mesNacimiento);
    request.input("AnioNacimiento", sql.Int, user.anioNacimiento);
    request.input("Telefono", sql.VarChar(20), user.telefono);
    request.input("IDTipoUsuario", sql.Int, user.idTipoUsuario);
    request.input("IDSucursal", sql.Int, user.idSucursal);
    request.input("User", sql.VarChar(50), user.user);
    request.input("Password", sql.VarChar(50), user.password);
    await request.query(
      "EXEC RegistrarUsuario @Nombres, @ApellidoPaterno, @ApellidoMaterno, @DiaNacimiento, @MesNacimiento, @AnioNacimiento, @Telefono, @IDTipoUsuario, @IDSucursal, @User, @Password",
    );

    console.log("Registro de usuario exitoso");
    return { success: true };
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    throw new Error("Error al registrar usuario");
  }
}

async function registrarSucursal(sucursal) {
  try {
    const pool = await dbConnection.poolPromise;
    const request = pool.request();
    request.input("NombreComercial", sql.VarChar, sucursal.nombreComercial);
    request.input("Direccion", sql.VarChar, sucursal.direccion);
    request.input("Latitud", sql.Float, sucursal.latitud);
    request.input("Longitud", sql.Float, sucursal.longitud);
    request.input("HorarioInicio", sql.VarChar, sucursal.horarioInicio);
    request.input("HorarioFin", sql.VarChar, sucursal.horarioFin);
    request.query(
      `INSERT INTO Sucursales (NombreComercial, Direccion, Latitud, Longitud, HorarioInicio, HorarioFin) VALUES (@NombreComercial, @Direccion, @Latitud, @Longitud, @HorarioInicio, @HorarioFin);`,
    );
    return { success: true };
  } catch (err) {
    throw new Error(err);
  }
}

async function registrarProducto(producto) {
  try {
    const pool = await dbConnection.poolPromise;
    const result = await pool
      .request()
      .input("IDProducto", sql.VarChar, producto.idProducto)
      .input(
        "Fotografia",
        sql.VarBinary,
        Buffer.from(producto.fotografia, "base64"),
      )
      .input("Nombre", sql.VarChar, producto.nombre)
      .input("Descripcion", sql.VarChar, producto.descripcion)
      .input("Precio", sql.Money, producto.precio)
      .input("Unidades", sql.Int, producto.unidades)
      .input("IDCategoria", sql.Int, producto.idCategoria)
      .input("IDTipoBarCode", sql.Int, producto.idTipoBarCode)
      .input("IDSucursal", sql.Int, producto.idSucursal)
      .query(`INSERT INTO Productos (IDProducto, Fotografia, Nombre, Descripcion, Precio, Unidades, IDCategoria, IDTipoBarCode, IDSucursal)
              VALUES (@IDProducto, @Fotografia, @Nombre, @Descripcion, @Precio, @Unidades, @IDCategoria, @IDTipoBarCode, @IDSucursal);`);
    return { success: true };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  registrarUsuario,
  registrarSucursal,
  registrarProducto,
};
