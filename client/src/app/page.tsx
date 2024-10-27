import Image from 'next/image';
import ILogin from '@/assets/Fondo/ILogin.png';
import ILogo from '@/assets/Imagenes/ILogo.png'; 
import Login_Formulario from '@/components/Login/LoginFormulario';

export const metadata = {
  title: "Login - Administración de Sustentación de Tesis",
  alternates: {canonical:"http://localhost:3000/"},
};

export default function Login_Page() {
  return (
    <div className="relative w-full h-screen">
      <Image src={ILogin} alt="Login Background" fill quality={100}  priority className="object-cover -z-10"/>
      <main className="absolute bg-black/10 inset-0 flex sm:p-8 p-4 items-center justify-center md:justify-normal">
        <div className="p-6 flex flex-col gap-2 border-2 border-black/30 bg-white/80 sm:bg-white/60 rounded-lg shadow-lg w-11/1212 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4.50/12 2xl:w-3/12">
          <div className='flex items-center justify-center'>
            <Image src={ILogo} alt='Logo de la Univeridad'  width={150} height={150} priority/>
          </div>
          <hr className='pb-1  border-white/60'/>
          <Login_Formulario/>
        </div>
      </main>
    </div>
  );
}