"use client";

import ILogoBlack from "@/assets/Imagenes/ILogoBlack.webp";
import ILogoWhite from "@/assets/Imagenes/ILogoWhite.png";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';

// Memoizamos el componente para evitar renderizados innecesarios.
const MemoizedLink = React.memo(function MemoizedLink({ item, menu }: { item: { title: string; url: string; imagen: JSX.Element }; menu: boolean }) {
    return (
        <Link 
            href={item.url} 
            className={`relative flex items-center overflow-hidden group 
                        ${menu ? 'justify-start px-3 py-2' : 'justify-center p-2'} 
                        gap-2  transition-all duration-700
                        `}
        >
            {/* Background animation */}
            <span 
                className="absolute inset-0 bg-black/10 dark:bg-white/10 -z-10 group-hover:translate-x-0 transform translate-x-[-100%] transition-transform duration-700 ease-out" 
            />

            {/* Content */}
            <div className="flex flex-row items-center gap-2 z-10">
                {item.imagen}
                {menu && <span>{item.title}</span>}
            </div>
        </Link>
    );
});


  

export default function Components_BarraLateral({ lista_navegacion }: { lista_navegacion: { title: string; url: string; imagen: JSX.Element }[] }) {
    const [darkMode, setDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [menu, setMenu] = useState(true);

    // Usamos useCallback para no redefinir las funciones en cada renderizado
    const toggleDarkMode = useCallback(() => {
        setDarkMode(prevMode => !prevMode);
    }, []);

    // Usamos useEffect para gestionar el dark mode con cookies
    useEffect(() => {
        const savedMode = Cookies.get('darkMode');
        if (savedMode) {
            setDarkMode(savedMode === 'true');
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            // Guardamos el valor del darkMode en una cookie
            Cookies.set('darkMode', darkMode.toString(), { expires: 365, path: '' });
            document.documentElement.classList.toggle('dark', darkMode);
        }
    }, [darkMode, isLoaded]);

    return (
        <div className={`${menu ? 'w-10/12 absolute sm:relative sm:w-4/12 md:w-4/12 lg:w-2.50/12' : 'w-16'} bg-primary_white text-sm dark:bg-primary_dark transition-all duration-500 flex flex-col border-r border-black/10 h-screen truncate text-black/90 dark:text-white/90 z-20 `}>
            <div className={`${menu ? 'px-4 py-2' : 'py-4 flex-col justify-center items-center w-full'} flex items-center justify-between shadow-lg`}>
                {menu && (
                    <Image src={darkMode ? ILogoBlack : ILogoWhite} alt="Logo" width={120} height={10} className="p-2" />
                )}
                <svg onClick={() => setMenu(!menu)} className="place-self-center fill-black/80 dark:fill-white/80 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
            </div>
            <hr className="border-black/10" />
            <div className="flex flex-col justify-between h-full px-0 p-2 ">
                <nav className="flex flex-col gap-2">
                    {lista_navegacion.map((item, index) => (
                        <MemoizedLink key={index} item={item} menu={menu} />
                    ))}
                </nav>
                <div className="flex flex-col gap-4">
    
                    <button onClick={toggleDarkMode} className={`relative flex items-center overflow-hidden group ${menu ? 'justify-start px-3 py-2' : 'p-2 justify-center'} gap-2  transition-all duration-700 `}>
                        <span className="absolute inset-0 bg-black/10 dark:bg-white/10 -z-10 group-hover:translate-x-0 transform translate-x-[-100%] transition-transform duration-700 ease-out"/>


                        <div className="flex flex-row items-center gap-2 z-10">
                            {darkMode ? (
                                <svg className="fill-black/90 dark:fill-white/90" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z" /></svg>
                            ) : (
                                <svg className="fill-black/90 dark:fill-white/90" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm200-120Z" /></svg>
                            )}
                            {menu && <span>{darkMode ? "White Mode" : "Dark Mode"}</span>}
                        </div>
                    </button>

                    <button onClick={() => alert('Cerrando sesión...')} className={`relative flex items-center overflow-hidden group ${menu ? 'justify-start px-3 py-2' : 'p-2 justify-center'} gap-2 transition-all duration-700 `}>
                        <span className="absolute inset-0 bg-black/10 dark:bg-white/10 -z-10 group-hover:translate-x-0 transform translate-x-[-100%] transition-transform duration-700 ease-out"/>
                        <div className="flex flex-row items-center gap-2 z-10">
                            <svg className="fill-black/90 dark:fill-white/90" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                            {menu && <span>Cerrar Sesión</span>}
                        </div>
                    </button>

                </div>
            </div>
        </div>
    );
}
