// FormularioTesis_Page.tsx
import Component_Tesis_Calificacion from "@/components/Tesis/Component_Tesis_Calificacion";
import Component_Tesis_Comentario from "@/components/Tesis/Component_Tesis_Comentarios";
import Component_Tesis_Documento from "@/components/Tesis/Component_Tesis_Documento";
import Component_Tesis_Fecha from "@/components/Tesis/Component_Tesis_Fecha";
import Component_Tesis_Grafico from "@/components/Tesis/Component_Tesis_Requisisto";
import Component_Tesis_Titulo from "@/components/Tesis/Component_Tesis_Titulo";
import { obtenerRolToken } from "@/services/service-extracionRolToken";
import { cookies } from "next/headers";

export const metadata = {
    title: "Formulario de Tesis - Administración de Sustentación de Tesis",
    robots: "noindex, follow",
    alternates: { canonical: "" },
};

interface Requerimiento {
    id: number;
    title: string;
    aprobacion: boolean;
}

export default  async function FormularioTesis_Page() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("authuleamtk")?.value;

    const [rol] = token ? obtenerRolToken(token) : ["estudiantes"];

    const data = {
        title: "Análisis de Sistemas",
        descripcion: "El análisis de sistemas es el proceso de estudiar y descomponer sistemas complejos...",
        periodo: "2024-1",
        requerimientos: [
            { id: 1, title: "Documentación", aprobacion: true },
            { id: 2, title: "Asignaturas", aprobacion: false },
            { id: 3, title: "TESIS 1 Y 2", aprobacion: true },
            { id: 4, title: "Aprobación Tutor", aprobacion: true },
        ] as Requerimiento[],
        jurados: [
            { nombre: "Dr. Juan Pérez", calificacion: 8.5, comentario: "Buen trabajo, mejorar en documentación." },
            { nombre: "Ing. Carlos Rodríguez", calificacion: 2.0, comentario: "Presentación clara, pero faltó profundidad en el análisis." },
        ],
        fecha_sustentacion: "2020-05-07",
        documento_link: "https://drive.google.com/file/d/1OY6-INVaW7H4yiChb47Go5HtaZuQh3ZY/view?usp=drive_link"
    };

    const requisitosCumplidos = data.requerimientos.filter((r) => r.aprobacion).length;
    const totalRequisitos = data.requerimientos.length;
    
    const notaTotal = data.jurados.reduce((sum, jurado) => sum + jurado.calificacion, 0);
    const totalJurados = data.jurados.length;
    
    return (
        <div className="flex flex-col sm:py-0 gap-4 sm:p-6 dark:text-gray-200">
            <Component_Tesis_Titulo title={data.title} periodo={data.periodo} descripcion={data.descripcion} />
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <Component_Tesis_Documento roles={rol} documento={data.documento_link} />
                <Component_Tesis_Fecha fecha={data.fecha_sustentacion} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Component_Tesis_Grafico requisitos={data.requerimientos} requisitosCumplidos={requisitosCumplidos} totalRequisitos={totalRequisitos} />
                <Component_Tesis_Calificacion jurados={data.jurados} notaTotal={notaTotal} totalJurados={totalJurados} />
            </div>
            <Component_Tesis_Comentario/>
        </div>
    );
}

