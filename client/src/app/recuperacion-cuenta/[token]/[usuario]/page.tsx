import Image from 'next/image';
import ILogin from '@/assets/Fondo/ILoginDesefonque.webp';
import IWarning from '@/assets/Iconos/IWarning.svg';
import ILogo from '@/assets/Imagenes/ILogo.png'; 
import { Toaster } from 'sonner';
import RestablecerCotrasena_Formulario from '@/components/Recuperacion/Restablecer-Contrasena';
import { verificarToken } from '@/services/service-verificacionToken';
import { notFound } from 'next/navigation';


export const metadata = {
  title: "Recuperación de Cuenta - Administración de Sustentación de Tesis",
  alternates: { canonical: "http://localhost:3000/recuperacion-cuenta" },
  keywords: "recuperación de cuenta, administración de tesis, gestión de tesis, sistema de tesis, Uleam",
  robots: "noindex, follow",
};

export default async function RestablecerCuenta_Page({ params }: { params: { token: string; usuario: string } }) {
  const { token, usuario } = params;
  const validacionUsuario = usuario !== "";
  

  const validacionToken =  verificarToken({token}); 

  const renderContent = () => {
    if (validacionToken === 2 && validacionUsuario) {
      return (
        <div className="relative w-full h-screen">
          <Image src={ILogin} alt="Login Background" fill quality={80} priority className="object-cover" />
          <main className="bg-black/20 absolute inset-0 flex p-4 items-center justify-center">
            <div className="p-6 flex flex-col gap-2 border-2 border-black/30 bg-white/90 rounded-lg shadow-lg w-full max-w-md">
              <Image src={ILogo} alt="Logo de la Universidad" width={150} height={150} priority />
              <h1 className="text-gray-800 font-semibold">Restablecer contraseña</h1>
              <hr className="pb-1 border-white/60" />
              <p className="flex flex-row gap-4 text-sm">Usuario: {usuario}</p>
              <RestablecerCotrasena_Formulario />
            </div>
          </main>
          <Toaster richColors />
        </div>
      );
    }
    if (validacionToken === 0) { //Utilizamos el 404 de next js 
      return (notFound());
    }
    return (
      <div className="relative w-full h-screen">
        <Image src={ILogin} alt="Login Background" fill quality={80} priority className="object-cover" />
        <main className="bg-black/20 absolute inset-0 flex p-4 items-center justify-center">
          <div className="font-semibold text-center p-6 flex flex-col gap-2 items-center border-2 border-black/30 bg-white/90 rounded-lg shadow-lg w-full max-w-md">
            <Image src={IWarning} alt="Warning Icon" width={80} height={80} priority />
            <p>Intente de nuevo pidiendo uno nuevo o si persiste, contacte a la autoridad.</p>
          </div>
        </main>
      </div>
    );
  };

  return renderContent();
}
