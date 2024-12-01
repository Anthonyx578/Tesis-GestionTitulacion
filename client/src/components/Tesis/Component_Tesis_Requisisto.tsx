interface Requisito {
    id: number;
    title: string;
    aprobacion: boolean;
}

interface Component_Tesis_GraficoProps {
    requisitos: Requisito[];
    requisitosCumplidos: number;
    totalRequisitos: number;
}

export default function Component_Tesis_Requisistos({
    requisitos,
    requisitosCumplidos,
    totalRequisitos,
}: Component_Tesis_GraficoProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 p-6 rounded-lg bg-white/90 dark:bg-gray-700/30 shadow-lg sm:w-6/12">
     
            <div className="flex-1 lg:w-8/12">
                <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">Requisitos Cumplidos</h2>
                <ul className="space-y-4">
                    {requisitos.map((req) => (
                        <li key={req.id} className="flex flex-row items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-300 sm:w-10/12 text-wrap break-words flex-1">{req.title}</span>
                            <svg className="sm:w-2/12" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={req.aprobacion ? "#75FB4C" : "#EA3323"}>
                                <path
                                    d={
                                        req.aprobacion
                                            ? "M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" // Check icon
                                            : "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" // Cross icon
                                    }
                                />
                            </svg>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-row justify-center items-center  lg:w-4/12 ">
                <svg width="120" height="120" viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ddd" strokeWidth="3.8" />
                    <path className="circle" strokeDasharray={`${(requisitosCumplidos / totalRequisitos) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4caf50" strokeWidth="3.8" />
                    <text className="text-gray-600 dark:text-gray-300" x="18" y="20.35" textAnchor="middle" fontSize="4" fontWeight="bold" fill="currentColor">
                        {`${requisitosCumplidos} / ${totalRequisitos}`}
                    </text>
                </svg>
            </div>
        </div>
    );
}