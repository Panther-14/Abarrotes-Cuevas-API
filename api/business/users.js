const UserDAO = require('../data/user_dao');

async function loginUser(username, password) {
  try {
    const resultados = await UserDAO.accederUsuario(username, password);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function registerUser(user) {
  try {
    const resultados = await UserDAO.registroUsuario(user);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updatePassword(idUser, oldPassword, newPassword) {
  try {
    const resultados = await UserDAO.cambiarContrasenia(idUser, oldPassword, newPassword);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function recoverPassword(username, newPassword, otp) {
  try {
    const resultados = await UserDAO.recuperarContrasenia(username, newPassword, otp);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updateOtp(username, otp) {
  try {
    const resultados = await UserDAO.insertarContraseniaTemporal(otp, username);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function findUser(username) {
  try {
    const resultados = await UserDAO.obtenerUsuario(username);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function seeProfile(username) {
  try {
    const resultados = await UserDAO.obtenerPerfilUsuario(username);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getAllUsersEmail() {
  try {
    const resultados = await UserDAO.obtenerEmailTodosUsuarios();
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getUserEmail(username, email) {
  try {
    const resultados = await UserDAO.obtenerEmailUsuario(username, email);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updateUser({ idUsuario, nombre, apellidoPaterno, apellidoMaterno, email, password }) {
  try {
    const resultados = await UserDAO.actualizarUsuario({ idUsuario, nombre, apellidoPaterno, apellidoMaterno, email, password });
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deleteUser(idUsuario) {
  try {
    const resultados = await UserDAO.eliminarUsuario(idUsuario);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getAllUsers() {
  try {
    const resultados = await UserDAO.obtenerTodosLosUsuarios();
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  loginUser,
  registerUser,
  updatePassword,
  recoverPassword,
  updateOtp,
  findUser,
  seeProfile,
  getAllUsersEmail,
  getUserEmail,
  updateUser,
  deleteUser,
  getAllUsers
};