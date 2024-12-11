import Components_BarraLateral from "@/components/Home/BarraLateral";
import { cookies } from "next/headers";
import { listaNavegacion } from "@/lib/data/navegacion";
import React, { JSX } from "react";
import { obtenerRolToken } from "@/services/service-extracionRolToken";

export default async function LayoutPrincipalHome({ children }: { children: React.ReactNode; }) {
    // Obtener las cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("authuleamtk")?.value; // Asegúrate de que "userToken" sea el nombre correcto

    // Inicializar user y role con valores por defecto //" ese administrador quitarlo y ponerlo en vacio"
    const [rol] = token ? obtenerRolToken(token) : ["administrador"];

    // Definir el tipo de rol
    type RoleType = 'administrador' | 'secretario' | 'profesor' | 'estudiantes';

    // Llamada directa de `lista_navegacion()` para obtener la lista una vez y evitar ciclos innecesarios
    let listaNavegacionActual: { title: string; url: string; imagen: JSX.Element }[] = [];
    
    if (rol) {
        // Asegúrate de que role es del tipo RoleType
        if (['administrador', 'secretario', 'profesor', 'estudiantes'].includes(rol)) {
            listaNavegacionActual = listaNavegacion[rol as RoleType] || [];
        } else {
            console.error(`El rol "${rol}" no es válido.`);
        }
    }

    return (
        <div className="flex flex-row w-full h-screen ">
            <Components_BarraLateral lista_navegacion={listaNavegacionActual} />
            <div className="p-3 sm:py-6 sm:px-8 bg-secondary_white dark:bg-secondary_dark w-full text-black/90 dark:text-white/90 overflow-y-auto overscroll-x-none">
                {children}
            </div>
        </div>
    );
}
