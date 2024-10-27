// src/services/generar-token.js

import jwt from 'jsonwebtoken';

export default function GenerarToken(secretKey) {

    if (!secretKey) {
        throw new Error("Secret key not found");  // Maneja si falta la clave secreta
    }

    const payload = { user: "leif", role: "cliente" };

    // Crear el token JWT
    return jwt.sign(payload, secretKey, { expiresIn: '7d' });
}
