import Components_BarraLateral from "@/components/Home/BarraLateral";
import { obtenerDatosToken } from "@/services/service-extracionDatosToken";
import { cookies } from "next/headers";
import { listaNavegacion_Administrador, listaNavegacion_Estudiantes, listaNavegacion_Profesor, listaNavegacion_Secretaria } from "@/lib/data/navegacion";

export default function LayoutPrincipalHome({ children }: { children: React.ReactNode; }) {
    // Obtener las cookies
    const cookieStore = cookies();
    const token = cookieStore.get("userToken")?.value; // Asegúrate de que "userToken" sea el nombre correcto

    // Inicializar user y role con valores por defecto
    const [role] = token ? obtenerDatosToken(token) : ["", ""];

    // Selección de lista de navegación según el rol
    const lista_navegacion = () => {
        if (role === "admin") {
            return listaNavegacion_Administrador;
        } else if (role === "cliente") {
            return listaNavegacion_Secretaria;
        } else if (role === "profesor") {
            return listaNavegacion_Profesor;
        } else {
            return listaNavegacion_Estudiantes;
        }
    };

    // Llamada directa de `lista_navegacion()` para obtener la lista una vez y evitar ciclos innecesarios
    const listaNavegacionActual = lista_navegacion();

    return (
        <div className="flex flex-row w-full h-screen">
            <Components_BarraLateral lista_navegacion={listaNavegacionActual} />
            <div className=" bg-slate-50 dark:bg-secondary_dark w-full">
                {children}
            </div>
        </div>
    );
}
