import jwt from 'jsonwebtoken';

const key_tk = process.env.NEXT_PRIVATE_KEY_RECUPERACION || "";

export function obtenerRolToken(token: string): [string | null] {
    try {
        const decoded = jwt.verify(token, key_tk) as { rol?: string };
        const rol = decoded.rol || null;
        return [rol]; // El segundo elemento del arreglo puede ser usado para otro propósito si es necesario.
    } catch  {
        console.error('Error al verificar el token:');
        return ["null"]; 
    }
}
