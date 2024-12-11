"use client";
import { useState } from "react";

interface Jurado {
    nombre: string;
    calificacion: number;
    comentario: string;
}

interface Component_Tesis_CalificacionProps {
    jurados: Jurado[];
    notaTotal: number;
    totalJurados: number;
}

export default function Component_Tesis_Calificacion({
    jurados,
    notaTotal,
    totalJurados,
}: Component_Tesis_CalificacionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const circleColor = notaTotal < 14 ? "#EA3323" : "#4caf50"; // Rojo si < 14, verde si >= 14

    return (
        <div className="relative flex flex-col lg:flex-row gap-8 p-6 rounded-lg bg-white/90 dark:bg-gray-700/30 shadow-lg sm:w-6/12">
            <div className="flex-1 lg:w-8/12">
                <h2 className="text-xl font-semibold text-center lg:text-left mb-4">Calificación</h2>
                <ul className="space-y-4 mb-4">
                    {jurados.map((jurado, index) => (
                        <li key={index} className="flex flex-row items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-300 sm:w-10/12 text-wrap break-words">
                                {jurado.nombre}
                            </span>
                            <span className="text-gray-600 dark:text-gray-300 sm:w-2/12">{jurado.calificacion}</span>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full px-3 py-2 text-sm font-semibold text-white rounded-lg bg-gray-700 hover:bg-gray-800 border border-black/30 transition"
                >
                    Añadir Calificación
                </button>
            </div>
            <div className="flex flex-row justify-center items-center lg:w-4/12">
                <svg width="120" height="120" viewBox="0 0 36 36" className="circular-chart">
                    <path
                        className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#ddd"
                        strokeWidth="3.8"
                    />
                    <path
                        className="circle"
                        strokeDasharray={`${(notaTotal / (totalJurados * 10)) * 100}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={circleColor}
                        strokeWidth="3.8"
                    />
                    <text
                        className="text-gray-600 dark:text-gray-300"
                        x="18"
                        y="20.35"
                        textAnchor="middle"
                        fontSize="4"
                        fontWeight="bold"
                        fill="currentColor"
                    >
                        {`${notaTotal} / ${totalJurados * 10}`}
                    </text>
                </svg>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <div className="bg-white dark:bg-gray-800 p-6 w-11/12 rounded-lg shadow-lg max-w-lg ">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Añadir Calificación
                        </h2>
                        <input
                            type="number"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                            placeholder="Escribe tu calificacion aquí..."
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-semibold bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)} // Añade lógica para guardar los datos aquí
                                className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
