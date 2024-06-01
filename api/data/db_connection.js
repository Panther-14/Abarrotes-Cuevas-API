const sql = require("mssql");

const dbConfig = {
  user: process.env.USER,
  password: process.env.PSSWRD,
  server: process.env.HOST,
  database: process.env.DATABASE,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.log("Database Connection Failed! Bad Config: ", err);
    throw err;
  });

module.exports = {
  poolPromise,
};
