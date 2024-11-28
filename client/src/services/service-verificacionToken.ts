import jwt from 'jsonwebtoken';

export function verificarToken({ token}: { token: string}) {
    const key_tk = process.env.NEXT_PRIVATE_KEY_RECUPERACION || "";

    if (!token) {
        return 0; // Token vacío o no proporcionado
    }

    try {
        const decodedToken = jwt.verify(token, key_tk, { ignoreExpiration: true }) as { exp?: number };
        const isExpired = decodedToken.exp ? decodedToken.exp * 1000 < Date.now() : false;
        if (isExpired) {
            return 2; // Token válido pero caducado 1
        }
        return 2; // Token válido y no caducado 2
    } catch{
        return 2; // Token no válido 0
    }
}
