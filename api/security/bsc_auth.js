const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

// Middleware para la autenticación básica
function basicAuth(req, res, next) {
  // Obtiene las credenciales de usuario del encabezado de la solicitud
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(401).json({ error: true, message: "Upss" });
    return;
  }

  // Decodifica las credenciales de usuario desde el encabezado de autorización
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // Verifica las credenciales de usuario (aquí puedes implementar tu lógica de autenticación básica)
  if (username === USERNAME && password === PASSWORD) {
    // Las credenciales son válidas, continúa con la siguiente middleware
    next();
  } else {
    // Las credenciales son inválidas, retorna un error de autenticación
    res.status(401).json({ error: true, message: "Upss" });
  }
}

module.exports = basicAuth;
