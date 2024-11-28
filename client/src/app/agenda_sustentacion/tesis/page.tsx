import Link from "next/link";


export const metadata = {
    title: "Tesis - Administración de Sustentación de Tesis",
    robots: "noindex, follow",
    alternates: {canonical:""}
};





export default function TesisPage() {
    // Simulación de datos de ejemplo
    const datafetch = [
        {
            periodo: "2024-1",
            titulo: "Análisis de Sistemas",
            proceso: "Revisión",
            fechaSustentacion: "Sin asignar",
            acciones: "Ver detalles"
        }
    ];

    return (
        <div className="flex flex-col sm:p-4 h-full  dark:text-gray-200">
            <h1 className="font-semibold text-2xl">Tesis</h1>
            <hr className="mt-1 border-gray-300 dark:border-gray-700" />
            <div className="mt-4 overflow-x-auto flex flex-col gap-4 ">
                {datafetch.map((tesis, index) => (
                    <div className="bg-white/80 dark:bg-black/30 p-4 gap-4 rounded-lg flex sm:flex-row flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">{tesis.titulo}</h2>
                            <div className="flex flex-col sm:flex-row gap- sm:gap-24">
                                <p><span className=" flex flex-col sm:flex-row font-semibold">Periodo: </span>{tesis.periodo}</p>
                                <p><span className=" flex flex-col sm:flex-row font-semibold">Proceso: </span>{tesis.proceso}</p>
                                <p><span className=" flex flex-col sm:flex-row font-semibold">Fecha de Sustentacion: </span>{tesis.fechaSustentacion}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Link href={"/agenda_sustentacion/tesis/revision"} className="bg-black/10 dark:bg-white/10 rounded-lg p-1">
                                <svg className=" fill-black/80 dark:fill-white/80" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
