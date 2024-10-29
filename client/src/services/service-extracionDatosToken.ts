
import jwt from 'jsonwebtoken';

const key_tk = process.env.NEXT_PRIVATE_KEY_RECUPERACION || "";

export function obtenerDatosToken(token: string): [string | null, string | null] {
    try {
        const decoded = jwt.verify(token, key_tk) as { user: string; role: string };
        return [decoded.user || null, decoded.role || null];
    } catch{
        //Aqui puedo añadir votarlo o cerrar sesion para tu futuro yo
        return [null, null]; // Asegúrate de que siempre retorne un array
    }
}
