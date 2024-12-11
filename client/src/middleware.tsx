import { NextResponse } from 'next/server';
import { generarTokenCsrf } from './utils/generate_csfr';

export async function middleware() {
    const tokenCsrf = generarTokenCsrf()
    const response = NextResponse.next();
    
    // Incorporamos los headers adecuados para CSRF
    response.headers.set('X-CSRF-Token', tokenCsrf); // Añadimos el token al header
    response.headers.set('Set-Cookie', `csrfSecret=${tokenCsrf}; HttpOnly; Path=/; SameSite=Strict`); // Seteamos el secreto como cookie

    return response;
}
