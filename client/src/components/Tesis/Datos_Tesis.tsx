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
           <h1>HOla</h1>
        </div>
    )
}