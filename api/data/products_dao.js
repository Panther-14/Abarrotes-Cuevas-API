const sql = require("mssql");
const dbConnection = require("../data/db_connection");

async function getProductosInicio() {
  try {
    const pool = await dbConnection.poolPromise;
    const result = await pool
      .request()
      .query("SELECT TOP 3 * FROM Productos ORDER BY NEWID()");
    return result.recordset;
  } catch (err) {
    throw new Error(err);
  }
}

async function getCategoriasInicio() {
  try {
    const pool = await dbConnection.poolPromise;
    const result = await pool
      .request()
      .query("SELECT TOP 5 * FROM CategoriasProducto ORDER BY NEWID()");
    return result.recordset;
  } catch (err) {
    throw new Error(err);
  }
}

async function getProductos(busqueda, IDCategoria) {
  try {
    const pool = await dbConnection.poolPromise;
    let query;
    const request = pool.request();

    if (busqueda !== "" && IDCategoria !== "") {
      query = `SELECT * FROM Productos WHERE  
                (Nombre LIKE @busqueda OR 
                Descripcion LIKE @busqueda) AND IDCategoria = @IDCategoria`;
      request.input("busqueda", sql.VarChar, `%${busqueda}%`);
      request.input("IDCategoria", sql.Int, IDCategoria);
    } else if (busqueda !== "") {
      query = `SELECT * FROM Productos WHERE  
                Nombre LIKE @busqueda OR 
                Descripcion LIKE @busqueda`;
      request.input("busqueda", sql.VarChar, `%${busqueda}%`);
    } else if (IDCategoria !== "") {
      query = `SELECT * FROM Productos WHERE  
                IDCategoria = @IDCategoria`;
      request.input("IDCategoria", sql.Int, IDCategoria);
    } else {
      query = "SELECT * FROM Productos";
    }

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getProductosInicio,
  getCategoriasInicio,
  getProductos,
};
