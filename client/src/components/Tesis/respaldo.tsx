import React from "react"

import IDescargaDocumento from "@/assets/Iconos/IDescargaDocumento.svg";
import Image from "next/image";




export default function Tesis_Datos_Visualizar({rol}:{rol:string | null}){
    
    const data = {
        title: "Análisis de Sistemas",
        descripcion: "El análisis de sistemas es el proceso de estudiar y descomponer sistemas complejos para identificar problemas, definir requerimientos y proponer soluciones eficientes. Combina herramientas como diagramas de flujo, modelado de datos y análisis de procesos para optimizar el desempeño de sistemas tecnológicos, organizacionales o sociales. Su objetivo principal es garantizar que el sistema cumpla con las necesidades de los usuarios y funcione de manera efectiva en su entorno.",
        periodo: "2024-1",
        documento: false
    }
    
    return(
        <div>
            <h1  className="font-semibold text-2xl">{data.title} / {data.periodo} </h1>
            <hr className="my-1 mb-4 border-gray-300 dark:border-gray-700" />
            <div className="">
                <p><span className="font-semibold">Descripcion:</span> {data.descripcion} </p>
            </div>
            {(rol != "estudiantes" && data.documento)&&(
                <button className="flex  flex-row   items-center gap-4 border my-3 rounded-md p-3 bg-black/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className=" dark:fill-white" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z"/></svg>Descargar Documento                
                </button>
            )}
            {(rol != "estudiantes" && !data.documento)&&(
                <div className="flex flex-row   items-center gap-4 border my-3 rounded-md p-3 bg-black/10">
                    <p>No hay documento</p>
                </div>
            )}
            
            {(rol == "estudiantes" && !data.documento)&&(
                <input type="file" className="flex flex-row   items-center gap-4 border my-3 rounded-md p-3 bg-black/10"/>
            )}

            {(rol == "estudiantes" && data.documento)&&(
                <div className="flex flex-row  gap-4" >
                    <button className="flex flex-col sm:flex-row  items-center gap-4 border my-3 rounded-md p-3 bg-black/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className=" dark:fill-white" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z"/></svg>Descargar Documento                
                    </button>
                    <button className="flex flex-col sm:flex-row  items-center gap-4 border my-3 rounded-md p-3 bg-black/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className=" dark:fill-white" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>Cambiar Documento
                    </button>
                </div>         
            )}

            <div>
                <p className="my-4 text-lg"><span className=" font-semibold">Fecha de Sustentacion:</span> 05-06-2024</p>
            </div>
            
            <hr  className="my-1 mb-4 border-gray-300 dark:border-gray-700" />
            
            <div className="flex flex-col gap-4">
                <p><span className="font-semibold">Tutor:</span> Profesor apeliido franciso papa - Ingeniero de Software</p>
                <p><span className="font-semibold">Jurado 1:</span> Profesor apeliido franciso papa - Ing. De Sistema</p>
                <p><span className="font-semibold">Jurado 1:</span> Profesor apeliido franciso papa - Ing. De TI</p>
            </div>
            
            <hr  className="my-3 mb-4 border-gray-300 dark:border-gray-700" />

            <h2 className="font-semibold text-xl">Requerimiento</h2>
            <div className="flex flex-col gap-4 pt-4">
                <p><span className=" font-semibold">Requerimiento 1:</span> Sin cumplir</p>
                <p><span className=" font-semibold">Requerimiento 2:</span> Sin cumplir</p>
                <p><span className=" font-semibold">Requerimiento 3:</span> Cumplido</p>
                <p><span className=" font-semibold">Requerimiento 4: </span>En proceso</p>
            </div>

            <hr  className="my-3 mb-4 border-gray-300 dark:border-gray-700" />
            <h2 className="font-semibold text-xl">Notas</h2>
            <div>

            </div>
        </div>
    )
}