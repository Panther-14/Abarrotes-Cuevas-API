import { verify, sign } from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware para verificar el token en todas las solicitudes protegidas
function verifyToken(req, res, next) {
  // Obtiene el token de acceso del encabezado de la solicitud
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: true, message: "Upss" });
    return;
  }

  // Verifica el token y lo decodifica
  verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: true, message: "Upss" });
      console.error(err);
      return;
    }
    // Añade el objeto decodificado a la solicitud para su uso posterior
    req.user = decoded.user;
    next();
  });
}

function signToken(username){
  return new Promise((resolve,reject) => {
    sign({ user: { username } }, SECRET_KEY, { expiresIn: "1h" }, (error, token) => {
      !error  ? resolve(token) : reject(error);
    });
  })
}

export default {
  verifyToken,
  signToken
};
