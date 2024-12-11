
import jwt from 'jsonwebtoken';

const key_tk = process.env.NEXT_PRIVATE_KEY_RECUPERACION || "";

export function obtenerRolToken(token: string): [string | null, string | null] {
    try {
        const decoded = jwt.verify(token, key_tk) as { user: string; rol: string };
        return [decoded.user || null, decoded.rol];
    } catch{

        return [null, null];
    }
}
