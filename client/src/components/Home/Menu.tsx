"use client";

import Image from 'next/image';
import IMenu from '@/assets/Iconos/IMENU.svg'; 
import useMenu from '@/hooks/useMenu';


export default function Components_Menu(){
    
    const {invertirValor} = useMenu()

    return(
        <Image onClick={invertirValor} src={IMenu} alt='Logo de la Univeridad' className='cursor-pointer' width={30} height={10} priority/>
    )
}