// src/app/agenda-sustentacion/page.tsx
import { cookies } from 'next/headers';
import Components_BarraLateral from "@/components/Home/BarraLateral";
import Components_Encabezado from "@/components/Home/Encabezado";


const Layout_AgendaSustentacion = () => {
    const cookieStore = cookies();
    const userToken = cookieStore.get('userToken')?.value || null;

    let usuario = "";
    let rol = "";

    if (userToken) {
        try {
            // Decodificar el valor de usuario y rol desde la cookie
            const decodedValue = atob(userToken);
            [usuario, rol] = decodedValue.split(':');
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }

    return (
        <div className="">
            <Components_Encabezado user={usuario}/>
            <div className="flex flex-row">
                <Components_BarraLateral role={rol} />
                <div>
                    <h1>Agenda de Sustentación</h1>
                    <p>Usuario: {usuario}</p>
                    <p>Rol: {rol}</p>
                </div>
            </div>
        </div>
    );
};

export default Layout_AgendaSustentacion;