import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const { cookies } = request;
    const userToken = cookies.get('userToken')?.value;

    if (userToken) {
        try {
            // Decodificar el valor de usuario y rol desde la cookie
            const decodedValue = atob(userToken);
            const [usuario, rol] = decodedValue.split(':');

            // Almacenar los valores en el request para usar en SSR
            request.headers.set('x-usuario', usuario);
            request.headers.set('x-rol', rol);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }
    return NextResponse.next();
}

// Definir las rutas donde se aplica este middleware
export const config = {
    matcher: ['/agenda-sustentacion'],
};