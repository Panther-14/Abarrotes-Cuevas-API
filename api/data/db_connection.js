import { Connection } from 'tedious';

const connection = new Connection({
  server: process.env.HOST,
  authentication: {
    type: 'default',
    options: {
      userName: process.env.USER,
      password: process.env.PSSWRD
    }
  },
  options: {
    port: 1433,
    database: process.env.DATABASE,
    trustServerCertificate: true
  }
});

connection.on('connect',(function(err) {
  if (err) {
    console.error('Error de conexion: ' + err.stack);
    return;
  }
  console.log('Conectado a SQL server');
}));

export default connection;
