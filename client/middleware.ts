import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Configuración del matcher para las rutas que activarán el middleware
export const config = {
  matcher: ['/administracion','/administracion/:path*', '/','/recuperacion_cuenta','/recuperacion_cuenta/:path*'], // Coincidir rutas /administracion y /login
};

// Esta función se ejecuta para cada solicitud
export function middleware(request: NextRequest) {
  const hasCookie = request.cookies.has('mxfc2002'); // Verifica si la cookie mxfc2002 está presente

  // Comprobar si la ruta es /administracion o comienza con /administracion
  if (request.nextUrl.pathname.startsWith('/administracion')) {
    if (!hasCookie) {
      // Si no tiene la cookie, redirigir a la página de inicio de sesión
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Comprobar si la ruta es /login
  if (request.nextUrl.pathname === '/') {
    if (hasCookie) {
      // Si tiene la cookie, redirigir a /administracion
      return NextResponse.redirect(new URL('/administracion', request.url));
    }
  }

}
