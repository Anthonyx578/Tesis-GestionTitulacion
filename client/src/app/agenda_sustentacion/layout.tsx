import Components_BarraLateral from "@/components/Home/BarraLateral";
import Components_Encabezado from "@/components/Home/Encabezado";
import { obtenerDatosToken } from "@/services/service-extracionDatosToken";
import { cookies } from "next/headers";

export default function LayoutPrincipalHome({children}:{children:React.ReactNode;}){
    // Obtener las cookies
    const cookieStore = cookies();
    const token = cookieStore.get("userToken")?.value; // Asegúrate de que "userToken" sea el nombre correcto

    // Inicializar user y role con valores por defecto
    const [user, role] = token ? obtenerDatosToken(token) : ["", ""];



    return (
        <div className=" text-black">
            <Components_Encabezado user={user ?? ''} />
            <Components_BarraLateral/>
            <div>
                {children}
            </div>
        </div>
    );
}
