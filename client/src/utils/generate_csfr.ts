import { nanoid } from 'nanoid';
import { headers } from 'next/headers';

// Función para generar un token CSRF
export function generarTokenCsrf(): string {  
    const token = nanoid(64); 
    return token;  // Retornamos el token generado
}

// Función para verificar el token CSRF
export function verificarTokenCsrf(req: Request): boolean {
    const tokenDeLaCookie = req.headers.get('Cookie')?.match(/csrfToken=([^;]+)/)?.[1]; 
    const tokenDeLaSolicitud = req.headers.get('csrf-token'); 
  
    if (!tokenDeLaCookie || !tokenDeLaSolicitud) {throw new Error('Falta el token CSRF');}
  
    if (tokenDeLaCookie !== tokenDeLaSolicitud) {throw new Error('Token CSRF inválido');}
  
    return true;  // Si los tokens coinciden, el token es válido
}

// Función para obtener el token CSRF desde los encabezados
export async function obtenerTokenCsrf() {
    return (await headers()).get('X-CSRF-Token'); 
}
