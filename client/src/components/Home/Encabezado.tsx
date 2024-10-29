import Image from 'next/image';
import ILogo from '@/assets/Imagenes/ILogo.png'; 
import Components_Menu from './Menu';

export default function Components_Encabezado({user}:{user:string}) {
  return(
    <div className="w-full flex flex-row bg-blue-100 text-white border-b border-black/10 justify-between items-center p-1 px-4">
      <div className='flex flex-row gap-4 items-center'>
        <Components_Menu/>
        <Image src={ILogo} alt='Logo de la Univeridad'  width={50} height={50} priority/>
      </div>
      <div>
        {user}
      </div>
    </div>
  )
}