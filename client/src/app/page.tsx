import Image from 'next/image';
import ILogin from '@/assets/Fondo/ILogin2.png';
import ILogo from '@/assets/Imagenes/ILogo.png'; 
import Login_Formulario from '@/components/Login/LoginFormulario';

export const metadata = {
  title: "Login - Administración de Sustentación de Tesis",
  robots: "index, follow",
  alternates: { canonical: "http://localhost:5000/" }
};

export default async function Login_Page() {

  
  return (
    <div className="relative w-full h-screen ">
      <Image src={ILogin} alt="Login Background" fill quality={100} className="object-cover -z-10" />
      <main className="absolute bg-black/50  inset-0 flex p-1 sm:p-8 items-center sm:justify-normal  justify-center">
        <div className="bg-white/80   p-5 sm:p-6 rounded-lg border border-black/10  shadow-xl shadow-orange-200/30 w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12">
          <div className='flex justify-center items-center p-2'>
            <Image src={ILogo} alt='Logo de la Univeridad' width={140} loading="lazy" />
          </div>
          <hr className=' border-black/10 mb-4'/>
          <Login_Formulario />
        </div>
      </main>
    </div>
  );
}