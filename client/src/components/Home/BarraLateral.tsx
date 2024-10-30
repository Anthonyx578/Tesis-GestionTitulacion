"use client";

import ILogoBlack from "@/assets/Imagenes/ILogoBlack.webp";
import ILogoWhite from "@/assets/Imagenes/ILogoWhite.png";
import IMenu from "@/assets/Iconos/IMENU.svg";
import ILogout from "@/assets/Iconos/ILogout.svg";
import IToggleOff from "@/assets/Iconos/IToggleOff.svg";
import IToggleOn from "@/assets/Iconos/IToggleOn.svg";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function Components_BarraLateral({ lista_navegacion}: { lista_navegacion: { title: string; url: string; imagen: StaticImageData | string }[]}) {
    const [darkMode, setDarkMode] = useState(() => {
        // Leer la preferencia de modo oscuro desde localStorage
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true'; // Devuelve true si está guardado como 'true', false de lo contrario
    });

    const [menu, setMenu] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    // Efecto para guardar la preferencia en localStorage cada vez que cambie darkMode
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    
    return (//arreglar aqui abajo la dimensiones de responsive
        <div className={`${menu ? 'w-10/12  absolute sm:relative sm:w-6/12  md:w-6/6 lg:w-4/12' : 'w-16 '} bg-white text-sm dark:bg-primary_dark dark:text-white transition-all duration-300 flex flex-col border-r border-black/10 h-screen truncate`}>
            <div className={`${menu ? 'px-4 py-2 ' : 'p-0 flex-col justify-center items-center w-full'}flex items-center justify-between shadow-lg`}>
                {menu && (
                    <Image src={darkMode ? ILogoBlack : ILogoWhite} alt="Logo" width={120} height={10} className="p-2"/>
                )}
                <Image src={IMenu} alt="Menu Icon" width={40} height={40} className="cursor-pointer fill fill-orange-400 p-2 self-center place-self-center" onClick={() => setMenu(!menu)}/>
            </div> 
            <hr className="border-black/10" />
            <div className="flex flex-col justify-between h-full p-2">
                <nav className="flex flex-col gap-2">
                    {lista_navegacion.map((item, index) => (
                        <Link href={item.url} key={index} className={`flex items-center ${menu ? 'justify-start px-3':'justify-center'} w-full py-2 hover:bg-red-500/40  hover:text-white rounded-md transition-colors duration-200`}>
                            <div className="w-6 h-6 text-orange-400">
                                <Image src={item.imagen} alt={`${item.title} icon`} width={30} height={30} className="w-full fill-orange-600 h-full" />
                            </div>
                            {menu && <span className="ml-2">{item.title}</span>}
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-col gap-4">
                    <button onClick={toggleDarkMode} className={`flex items-center ${menu ? 'justify-start px-3 py-2' : 'p-2 justify-center'} flex flex-row gap-2 hover:bg-red-500/40 rounded transition-colors duration-200`}>
                        <Image src={darkMode ? IToggleOn : IToggleOff} alt="Toggle Dark Mode" width={30} height={30} className="w-6 h-6  fill-orange-400"/>
                        {menu && <span>{darkMode ? "White Mode" : "Dark Mode"}</span>}
                    </button> 
                    <button onClick={() => alert('Cerrando sesión...')} className={`flex items-center ${menu ? 'justify-start px-3 py-2' : 'justify-center p-2'} flex flex-row gap-2 hover:bg-red-500/40 rounded transition-colors duration-200`}>
                        <Image src={ILogout} alt="Logout Icon" width={30} height={30} className="w-6 h-6"/>
                        {menu && <span>Cerrar Sesión</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}