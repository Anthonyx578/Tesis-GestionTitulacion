import Image from 'next/image';
import ILogin from '@/assets/Fondo/ILoginDesefonque.webp';
import ILogo from '@/assets/Imagenes/ILogo.png'; 
import RecuperacionCuenta_Formulario from '@/components/Recuperacion/Recuperacion-Cuenta';
import Link from 'next/link';
import IFlecha from '@/assets/Iconos/IFLECHA.webp';
import {Toaster } from 'sonner';

export const metadata = {
  title: "Recuperacion de Cuenta - Administración de Sustentación de Tesis",
  alternates: {canonical:"http://localhost:3000/recuperacion-cuenta"},
  keywords: "recuperación de cuenta, restablecer contraseña, administración de tesis, gestión de tesis, sustentación de tesis, sistema de tesis, Uleam, acceso tesis, plataforma tesis, seguridad cuenta tesis, recuperación acceso, Uleam Tesis, inicio de sesión, plataforma académica"
};

export default function RecuperacionCuenta_Page() {
  return (
    <div className="relative w-full h-screen ">
      <Image src={ILogin} alt="Login Background" fill quality={100} priority className="object-cover "/>
      <main className="bg-black/20 absolute inset-0 flex sm:p-8 p-4 items-center justify-center md:justify-center">
        <Link href="/" className="absolute top-4 left-4 text-gray-200 flex items-center text-small sm:text-md md:text-medium pointer-events-auto cursor-pointer hover:border-b" prefetch={true}>
            <Image src={IFlecha} alt="Icono flecha para consulta de documentos" width={16} height={16} className="mr-2 rotate-180" />
            <p>Login</p>
        </Link>
        <div className="p-6 flex flex-col gap-2 border-2 border-black/30 bg-white/80 sm:bg-white/70 rounded-lg shadow-lg w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12">
          <div className="flex items-center justify-center">
            <Image src={ILogo} alt="Logo de la Univeridad" width={150} height={150} priority />
          </div>
          <h1 className="text-gray-800 font-semibold">Recuperación de Contraseña</h1>
          <hr className="pb-1 border-white/60" />
          <RecuperacionCuenta_Formulario />
        </div>
      </main>
      <Toaster richColors />
    </div>
  );
}
