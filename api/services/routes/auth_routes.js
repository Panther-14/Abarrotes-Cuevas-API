import { login } from '../../business/users';

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const resultados = login();
        if (resultados.length > 0) {
            const token = await tokenAuth.signToken();
        } else {
            res.status(401).json({ error: true, message: "Credenciales inválidas" });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error al iniciar sesión' });
    }
}