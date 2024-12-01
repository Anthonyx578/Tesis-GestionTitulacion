import Link from "next/link";

export const metadata = {
    title: "Tesis - Administración de Sustentación de Tesis",
    robots: "noindex, follow",
    alternates: { canonical: "" }
};

export default function TesisPage() {
    // Simulación de datos de ejemplo
    const datafetch = [
        {
            periodo: "2024-1",
            titulo: "Análisis de Sistemas",
            proceso: "Revisión",
            fechaSustentacion: "Sin asignar"
        },
        {
            periodo: "2023-2",
            titulo: "Desarrollo de Software",
            proceso: "Finalizado",
            fechaSustentacion: "15/12/2023"
        },
    
        {
            periodo: "2024-1",
            titulo: "Inteligencia Artificial",
            proceso: "En evaluación",
            fechaSustentacion: "Sin asignar"
        }
    ];

    return (
        <div className="flex flex-col sm:p-6 dark:text-gray-200  ">
            <h1 className="font-bold text-xl sm:text-3xl mb-4">Administración de Tesis</h1>
            <hr className="border-gray-300 dark:border-gray-700 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {datafetch.map((tesis, index) => (
                    <div key={index} className="bg-white/80 shadow-md dark:bg-gray-700/50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                        <h2 className=" sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{tesis.titulo}</h2>
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <p><span className="font-bold">Periodo:</span> {tesis.periodo}</p>
                            <p><span className="font-bold">Proceso:</span> {tesis.proceso}</p>
                            <p><span className="font-bold">Fecha de Sustentación:</span> {tesis.fechaSustentacion}</p>
                        </div>
                        <div className="mt-4">
                            <Link href={`/agenda_sustentacion/tesis/revision`}>
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Ver detalles</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
