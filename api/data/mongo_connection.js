const { MongoClient, ServerApiVersion } = require("mongodb");

const url = process.env.HOST_MONGO;
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

var db;

async function connect() {
  try {
    await client.connect();
    db = client.db("Abarrotera");
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.log("Error en la conexión a MongoDB", err);
  }
}

function getDb() {
  if (!db) {
    throw new Error("Debes conectarte primero a la base de datos");
  }
  return db;
}

connect();

module.exports = {
  connect,
  getDb,
};
