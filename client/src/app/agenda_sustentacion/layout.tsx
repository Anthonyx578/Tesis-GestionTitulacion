import Components_BarraLateral from "@/components/Home/BarraLateral";
import { obtenerDatosToken } from "@/services/service-extracionDatosToken";
import { cookies } from "next/headers";
import { listaNavegacion } from "@/lib/data/navegacion";
import React from "react";

export default function LayoutPrincipalHome({ children }: { children: React.ReactNode; }) {
    // Obtener las cookies
    const cookieStore = cookies();
    const token = cookieStore.get("userToken")?.value; // Asegúrate de que "userToken" sea el nombre correcto

    // Inicializar user y role con valores por defecto
    const [user, role] = token ? obtenerDatosToken(token) : ["", ""];

    // Definir el tipo de rol
    type RoleType = 'administrador' | 'secretaria' | 'profesor' | 'estudiantes';

    // Llamada directa de `lista_navegacion()` para obtener la lista una vez y evitar ciclos innecesarios
    let listaNavegacionActual: { title: string; url: string; imagen: JSX.Element }[] = [];
    
    if (role) {
        // Asegúrate de que role es del tipo RoleType
        if (['administrador', 'secretaria', 'profesor', 'estudiantes'].includes(role)) {
            listaNavegacionActual = listaNavegacion[role as RoleType] || [];
        } else {
            console.error(`El rol "${role}" no es válido.`);
        }
    }

    console.log(user);

    return (
        <div className="flex flex-row w-full h-screen">
            <Components_BarraLateral lista_navegacion={listaNavegacionActual} />
            <div className="bg-secondary_white dark:bg-secondary_dark w-full text-black/90 dark:text-white/90">
                {children}
            </div>
        </div>
    );
}
