import connection from './db_connection';
import { Request, TYPES } from 'tedious';

function signInUser(user) {
  return new Promise((resolve, reject) => {
    connection.connect(function (err) {
      if (err) {
        console.log('Connection Failed!');
        throw err;
      }
      const request = new Request('[dbo].[storedprocedure]', (err) => {
        if (err) {
          reject(err);
        }
    
        console.log('DONE!');
        connection.close();
      });
    
      request.addParameter('inputVal', TYPES.VarChar, 'hello world');
      request.addOutputParameter('outputCount', TYPES.Int);
    
      request.on('returnValue', (paramName, value, metadata) => {
        resolve(paramName + ' : ' + value);
      });
    
      connection.callProcedure(request);
    });
  });
}
module.exports = {
  signInUser,
}


