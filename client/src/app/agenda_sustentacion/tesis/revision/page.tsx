import Tesis_Datos_Visualizar from "@/components/Tesis/Datos_Tesis";
import { obtenerDatosToken } from "@/services/service-extracionDatosToken";
import { cookies } from "next/headers";

export const metadata = {
    title: "Formulario de Tesis - Administración de Sustentación de Tesis",
    robots: "noindex, follow",
    alternates: {canonical:""}
};


export default function FormularioTesis_Page(){
        // Obtener las cookies
        const cookieStore = cookies();
        const token = cookieStore.get("authuleamtk")?.value; // Asegúrate de que "userToken" sea el nombre correcto
    
        // Inicializar user y role con valores por defecto //" ese administrador quitarlo y ponerlo en vacio"
        const [usuario, rol] = token ? obtenerDatosToken(token) : ["", "estudiantess"];
    
    return(
        <div className="flex flex-col mb-4 sm:p-4 h-full  dark:text-gray-200">
            <Tesis_Datos_Visualizar rol={rol} />
        </div>
    )
}