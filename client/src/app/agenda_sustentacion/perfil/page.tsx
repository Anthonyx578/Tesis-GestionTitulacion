import Link from "next/link";

export const metadata = {
    title: "Perfil - Administración de Sustentación de Tesis",
    robots: "noindex, follow",
    alternates: {canonical:"http://localhost:3000/"}
};


export default function Perfil_Page() {
    return (
      <div className="flex flex-col  justify-center w-full  sm:h-full items-center sm:p-4 gap-4">
        <div className="border border-black/30 w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 dark:border-white/30 rounded-md p-6">
          {/* Encabezado */}
          <div className="flex flex-row justify-between mb-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-xl sm:text-2xl ">Velasquez Realpe Leif Wither</h1>
              <h2 className="text-sm font-semibold">Ing. en Tecnología de la Información</h2>
            </div>
            <div>
              <Link href={"/agenda_sustentacion/perfil/formulario"}>
                <svg className="fill-black/90 dark:fill-white/90" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                  <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
                </svg>
              </Link>
            </div>
          </div>
          <hr className="border-t mt-2 border-black/30 dark:border-white/30" />
  
          {/* Información Personal */}
          <div className="pt-8 flex flex-col gap-4 w-full text-sm sm:text-base">
            <p className="font-semibold">Estudiante</p>
  
            {/* Información de Contacto */}
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold">Teléfono:</span>
              <span>0999908484</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold">Correo:</span>
              <span className="whitespace-normal break-all break-words">
                e1515165848@live.uleam.edu.ec
              </span>
            </div>   


            <div className="flex flex-wrap gap-2">
              <span className="font-semibold">Facultad:</span>
              <span className="whitespace-normal break-all break-words">
                Ciencias de la Vida y Tecnolgoia
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="font-semibold">Genero:</span>
              <span className="whitespace-normal break-all break-words">
                Masculino
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="font-semibold">Pais:</span>
              <span className="whitespace-normal break-all break-words">
                Ecuador
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="font-semibold">Ciudad:</span>
              <span className="whitespace-normal break-all break-words">
                Manta
              </span>
            </div>


            <div className="flex flex-wrap gap-2">
              <span className="font-semibold">Fecha de nacimiento:</span>
              <span>06/12/2024</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  