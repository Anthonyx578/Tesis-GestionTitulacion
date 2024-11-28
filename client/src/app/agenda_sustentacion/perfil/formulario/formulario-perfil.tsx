"use client";

import { useRef } from "react";

export default function Formulario_Perfil(){
    const holaRef = useRef<HTMLElement | null>(null);
    
    return(
        <form action="" className="pt-4  flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <label htmlFor="">Nombres</label>
                <input type="text" className=" rounded-md p-1 text-black/90 "/>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <label htmlFor="">Apellido</label>
                <input type="text" className=" rounded-md p-1 text-black/90 "/>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <label htmlFor="">Correo</label>
                <input type="text" className=" rounded-md p-1 text-black/90 "/>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <label htmlFor="">Telefono</label>
                <input type="text" className=" rounded-md p-1 text-black/90 "/>
            </div>


            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <label htmlFor="">Genero</label>
                <input type="text" className=" rounded-md p-1 text-black/90 "/>
            </div>


            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <label htmlFor="">Pais</label>
                <input type="text" className=" rounded-md p-1 text-black/90 "/>
            </div>


            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <label htmlFor="">Ciudad</label>
                <input type="text" className=" rounded-md p-1 text-black/90 "/>
            </div>


            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <label htmlFor="">Fecha de nacimiento</label>
                <input type="date" className=" rounded-md p-1 text-black/90 "/>
            </div>

            <div className="flex flex-row w-full justify-center pt-4">
                <button className="flex  items-center  gap-4 bg-blue_personalizado/80 hover:bg-blue_personalizado p-1 px-2 text-lg rounded-lg">
                    <p>Guardar</p>
                    <svg className="fill-black/90 dark:fill-white/90" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
                </button>
            </div>
        </form>
    )
}