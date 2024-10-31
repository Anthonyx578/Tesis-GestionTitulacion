import jwt from 'jsonwebtoken';

export default function GenerarToken() {
    const secretKey = "L4pM8@tV7x%Q0zB6D2k!H3sJ"
    if (!secretKey) {
        throw new Error("Secret key not found");  // Maneja si falta la clave secreta
    }

    const payload = { user: "leif", role: "secretaria" };

    // Crear el token JWT
    console.log( jwt.sign(payload, secretKey, { expiresIn: '30D' }))
}

GenerarToken()