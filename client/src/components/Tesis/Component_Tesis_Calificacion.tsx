// Component_Tesis_Calificacion.tsx
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
    // Calcular el color del círculo basado en la nota total
    const circleColor = notaTotal < 14 ? "#EA3323" : "#4caf50"; // Rojo si < 14, verde si >= 14

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-6 rounded-lg bg-white/90 dark:bg-gray-700/30 shadow-lg sm:w-6/12">
            <div className="flex-1 lg:w-8/12">
                <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">Calificación</h2>
                <ul className="space-y-4">
                    {jurados.map((jurado, index) => (
                        <li key={index} className="flex flex-row items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-300 sm:w-10/12 text-wrap break-words ex-1">{jurado.nombre}</span>
                            <span className="text-gray-600 dark:text-gray-300 sm:w-2/12">{jurado.calificacion}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-row justify-center items-center lg:w-4/12">
                <svg width="120" height="120" viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ddd" strokeWidth="3.8" />
                    <path 
                        className="circle" 
                        strokeDasharray={`${(notaTotal / (totalJurados * 10)) * 100}, 100`} 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke={circleColor} // Cambiar el color del círculo dependiendo de la nota
                        strokeWidth="3.8" 
                    />
                    <text className="text-gray-600 dark:text-gray-300" x="18" y="20.35" textAnchor="middle" fontSize="4" fontWeight="bold" fill="currentColor">
                        {`${notaTotal} / ${(totalJurados * 10)}`}
                    </text>
                </svg>
            </div>
        </div>
    );
}
