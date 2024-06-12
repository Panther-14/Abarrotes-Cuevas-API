const sql = require("mssql");
const { poolPromise } = require("./db_connection");
const { getDb } = require("../data/mongo_connection");

async function registrarCliente(cliente) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input("User", sql.VarChar(25), cliente.user);
    request.input("Password", sql.VarChar(25), cliente.password);
    request.input("Nombres", sql.VarChar(50), cliente.nombres);
    request.input("ApellidoPaterno", sql.VarChar(50), cliente.apellidoPaterno);
    request.input("ApellidoMaterno", sql.VarChar(50), cliente.apellidoMaterno);
    request.input("DiaNacimiento", sql.Int, cliente.diaNacimiento);
    request.input("MesNacimiento", sql.Int, cliente.mesNacimiento);
    request.input("AnioNacimiento", sql.Int, cliente.anioNacimiento);
    request.input("Telefono", sql.VarChar(15), cliente.telefono);
    request.input("IDTipoUsuario", sql.Int, cliente.idTipoUsuario);
    await request.query(
      "EXEC RegistrarCliente @User, @Password, @Nombres, @ApellidoPaterno, @ApellidoMaterno, @DiaNacimiento, @MesNacimiento, @AnioNacimiento, @Telefono, @IDTipoUsuario",
    );

    console.log("Cliente registrado exitosamente.");
    return { success: true };
  } catch (err) {
    console.error("Error registrando el cliente:", err);
  }
}

async function getUsers(username, password) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input("Username", sql.VarChar, username);
    request.input("Password", sql.VarChar, password);
    const result = await request.query("EXEC	LoginUser @Username, @Password");

    console.log(result);
    return result.recordset;
  } catch (err) {
    throw new Error(err);
  }
}

async function registrarDireccion(direccion) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input("IDCliente", sql.Int, direccion.idCliente);
    request.input("IDDireccionPostal", sql.Int, direccion.idDireccionPostal);
    request.input("NumExterno", sql.Int, direccion.numExterno);
    request.input("NumInterno", sql.Int, direccion.numInterno);
    request.input("Latitud", sql.Decimal(9, 6), direccion.latitud);
    request.input("Longitud", sql.Decimal(9, 6), direccion.longitud);

    console.log(direccion);
    request.query(`INSERT INTO Direcciones (
        IDCliente, IDDireccionPostal, NumExterno, NumInterno, Latitud, Longitud
      ) VALUES (
        @IDCliente, @IDDireccionPostal, @NumExterno, @NumInterno, @Latitud, @Longitud
      );
    `);

    console.log();
    return { success: true };
  } catch (err) {
    throw new Error(err);
  }
}

async function registrarTarjeta(tarjeta) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input("NombreTitular", sql.VarChar(70), tarjeta.nombreTitular);
    request.input("NumTarjeta", sql.Int, tarjeta.numeroTarjeta);
    request.input("MesVencimiento", sql.Int, tarjeta.mesVencimiento);
    request.input("AnioVencimiento", sql.Int, tarjeta.anioVencimiento);
    request.input("IDCliente", sql.Int, tarjeta.idCliente);
    request.input("IDBanco", sql.Int, tarjeta.idBanco);

    request.query(
      `INSERT INTO Tarjetas (Nombretitular, NumTarjeta, MesVencimiento, AnioVencimiento, IDCliente, IDBanco) VALUES (@NombreTitular, @NumTarjeta, @MesVencimiento, @AnioVencimiento, @IDCliente, @IDBanco); `,
    );
    return { success: true };
  } catch (err) {
    throw new Error(err);
  }
}

async function agregarProductoCarrito(idCliente, producto) {
  try {
    var idCarritoGlobal = null;
    const pool = await poolPromise;
    const request1 = pool.request();
    request1.input("IDCliente", sql.Int, idCliente);
    const result1 = await request1.query(
      "SELECT IDCarrito FROM Clientes WHERE IDCliente = @IDCliente;",
    );
    var idCarritoSQL = result1.recordset[0].IDCarrito;

    const db = await getDb();

    console.log(idCarritoSQL);

    if (idCarritoSQL !== null) {
      // Ya existe Carrito
      console.log("Ya existe Carrito");
      idCarritoGlobal = idCarritoSQL;
      var carritoActual = await db
        .collection("Carritos")
        .findOne({ idCarrito: idCarritoGlobal });
      carritoActual.productos.push(producto);
      carritoActual.total += producto.cantidad * producto.precioUnitario;
      await db.collection("Carritos").updateOne(
        { idCarrito: idCarritoGlobal },
        {
          $set: {
            productos: carritoActual.productos,
            total: carritoActual.total,
          },
        },
      );
      return { success: true };
    } else {
      // No existe Carrito
      console.log("No existe Carrito");
      const request2 = pool.request();
      request2.input("IDCliente", sql.Int, idCliente);
      request2.output("NuevoIDCarrito", sql.UniqueIdentifier);
      const result2 = await request2.execute("GenerarCarritoCliente");
      const nuevoIDCarrito = result2.output.NuevoIDCarrito;
      idCarritoGlobal = nuevoIDCarrito;

      var carrito = {
        idCarrito: idCarritoGlobal,
        fechaHoraCreacion: new Date(),
        productos: [producto],
        total: producto.cantidad * producto.precioUnitario,
        descripcion: "Carrito de compras",
      };

      await db.collection("Carritos").insertOne(carrito);
      return { success: true };
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

async function registrarPedido(idCliente, idCarrito) {
  try {
    const db = getDb();
    const carrito = await db
      .collection("Carritos")
      .findOne({ idCarrito: idCarrito });
    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }

    const pool = await poolPromise;
    const request = pool.request();

    request.input("IDCliente", sql.Int, idCliente);
    request.input("Total", sql.Float, carrito.total);
    request.output("NuevoIDPedido", sql.Int);
    const result = await request.execute("GenerarPedidoCliente");
    const nuevoIDPedido = result.output.NuevoIDPedido;

    const newOrder = {
      idPedido: nuevoIDPedido,
      fechaPedido: new Date().toLocaleDateString(),
      montoTotal: carrito.total,
      cliente: idCliente,
      carrito: idCarrito,
      status: "without validation",
      deliveryman: 0,
      productos: carrito.productos,
    };

    await db.collection("Pedidos").insertOne(newOrder);
    await db.collection("Carritos").deleteOne({ idCarrito: idCarrito });

    for(let i=1; i<=carrito.productos.length; i++){
      request.input("IDProducto", sql.VarChar, carrito.productos[i-1].idProducto);
      request.input("Unidades", sql.Int, carrito.produtos[i-1].cantidad);
      await request.execute("UPDATE Productos SET Unidades = Unidades - @Unidades WHERE IDProducto = @IDProducto;");
    }

    return { success: true };
  } catch (err) {
    throw new Error(err);
  }
}

async function cancelarPedido(idPedido) {
  try {
    const db = await getDb();
    const pedido = await db
      .collection("Pedidos")
      .findOne({ idPedido: idPedido });

    if (!pedido) {
      throw new Error(`Pedido con id ${idPedido} no encontrado.`);
    }

    const pool = await poolPromise;
    const request = pool.request();

    for (let producto of pedido.productos) {
      var idProducto = producto.idProducto;
      var unidades = producto.cantidad;
      request.input("Unidades", sql.Int, unidades);
      request.input("IDProducto", sql.Int, idProducto);
      await request.query(
        "UPDATE Productos SET Unidades = Unidades + @Unidades WHERE IDProducto = @IDProducto;",
      );
    }

    await db
      .collection("Pedidos")
      .updateOne(
        { idPedido: idPedido },
        { $set: { status: "canceled" } },
        { upsert: false },
      );

    return { success: true };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getOrders(consumer) {
  try {
    const db = getDb();
    const pedidos = await db
      .collection("Pedidos")
      .find({ cliente: consumer.id })
      .toArray();
    return pedidos;
  } catch (err) {
    throw new Error(err);
  }
}

async function getOrderDetails(consumer) {
  try {
    const db = getDb();
    const pedidos = await db
      .collection("Pedidos")
      .find({ idPedido: consumer.idPedido, cliente: consumer.id })
      .toArray();
    return pedidos;
  } catch (err) {
    throw new Error(err);
  }
}

async function registrarReportePedido(reporte) {
  try {
    const db = getDb();
    const reporteBD = await db
      .collection("Pedidos")
      .updateOne(
        { idPedido: reporte.idPedido },
        { $set: { tituloReporteCon: reporte.titulo } },
        { $set: { descripcionReporteCon: reporte.descripcion } },
        { upsert: false },
      );
    return reporteBD;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getUsers,
  registrarCliente,
  registrarDireccion,
  registrarTarjeta,
  agregarProductoCarrito,
  registrarPedido,
  cancelarPedido,
  getOrders,
  getOrderDetails,
  registrarReportePedido,
};
