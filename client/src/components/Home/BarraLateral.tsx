"use client";

import ILogoBlack from "@/assets/Imagenes/ILogoBlack.webp";
import ILogoWhite from "@/assets/Imagenes/ILogoWhite.png";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function Components_BarraLateral({ lista_navegacion }: { lista_navegacion: { title: string; url: string; imagen: JSX.Element }[] }) {
    const [darkMode, setDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); 
    const [menu, setMenu] = useState(true);

    useEffect(() => {
        // Esto solo se ejecuta en el cliente, no en el servidor
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setDarkMode(savedMode === 'true');
        }
        setIsLoaded(true); // Marcamos que el cliente está cargado
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('darkMode', darkMode.toString());
            document.documentElement.classList.toggle('dark', darkMode);
        }
    }, [darkMode, isLoaded]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (//arreglar aqui abajo la dimensiones de responsive
        <div className={`${menu ? 'w-10/12  absolute sm:relative sm:w-4/12  md:w-4/12 lg:w-2.50/12' : 'w-16 '} bg-primary_white text-sm dark:bg-primary_dark dark:text-white transition-all duration-300 flex flex-col border-r border-black/10 h-screen truncate text-black/80 dark:text-white/80`}>
            <div className={`${menu ? 'px-4 py-2 ':'py-4 flex-col justify-center items-center w-full'}flex items-center justify-between shadow-lg`}>
                {menu && (
                    <Image src={darkMode ? ILogoBlack : ILogoWhite} alt="Logo" width={120} height={10} className="p-2"/>
                )}
                <svg onClick={()=>setMenu(!menu)} className="place-self-center fill-black/80 dark:fill-white/80 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </div> 
            <hr className="border-black/10" />
            <div className="flex flex-col justify-between h-full p-2">
            <nav className="flex flex-col gap-2">
                    {lista_navegacion.map((item, index) => (
                        <Link href={item.url} key={index} className={`flex items-center ${menu ? 'justify-start px-3 py-2' : 'justify-center p-2'} flex items-center flex-row gap-2 hover:bg-red-500/40 rounded transition-colors duration-200`}>
                            <div className="flex flex-row items-center gap-2">
                                {item.imagen}
                                {menu &&(
                                    <span>{item.title}</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-col gap-4">
                    <button onClick={toggleDarkMode} className={`flex items-center ${menu ? 'justify-start px-3 py-2' : 'p-2 justify-center'} flex flex-row gap-2 hover:bg-red-500/40 rounded transition-colors duration-200`}>
                        {darkMode ? 
                            <svg className=" fill-black/80 dark:fill-white/80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z"/></svg>
                            : 
                            <svg className=" fill-black/80 dark:fill-white/80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm200-120Z"/></svg>
                        }
                        {menu && <span>{darkMode ? "White Mode" : "Dark Mode"}</span>}
                    </button> 
                    <button onClick={() => alert('Cerrando sesión...')} className={`flex items-center ${menu ? 'justify-start px-3 py-2' : 'justify-center p-2'} flex items-center flex-row gap-2 hover:bg-red-500/40 rounded transition-colors duration-200`}>
                        <svg className=" fill-black/80 dark:fill-white/80 " xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currenColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                        {menu && <span>Cerrar Sesión</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}