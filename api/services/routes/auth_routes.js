const { loginUser } = require('../../business/users');

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const resultados = loginUser();
        if (resultados.length > 0) {
            const token = await tokenAuth.signToken();
        } else {
            res.status(401).json({ error: true, message: "Credenciales inválidas" });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error al iniciar sesión' });
    }
}

function register(req, res) {}

function test(req,res) {
    res.json({test: "Hola!!"});
}

module.exports = { login, register, test };