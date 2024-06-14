// Conexión a MongoDB (asume que ya estás conectado a tu base de datos)

// Crear la colección 'carritos'
db.createCollection("carritos");

// Crear la colección 'pedidos'
db.createCollection("pedidos");

// Insertar datos de ejemplo en 'carritos'
db.carritos.insertOne({
    _id: 1,
    fechaHoraCreacion: new Date(),
    productos: [
        { productoId: 1, cantidad: 2 },
        { productoId: 2, cantidad: 1 }
    ],
    total: 400,
    descripcion: "Carrito de ejemplo"
});

// Insertar datos de ejemplo en 'pedidos'
db.pedidos.insertOne({
    idPedido: "P001",
    fechaPedido: new Date(),
    montoTotal: 400,
    cliente: 1,
    carrito: 1,
    productos: [
        { productoId: 1, cantidad: 2 },
        { productoId: 2, cantidad: 1 }
    ],
});

print("Carritos:");
printjson(db.carritos.find().toArray());

print("Pedidos:");
printjson(db.pedidos.find().toArray());
