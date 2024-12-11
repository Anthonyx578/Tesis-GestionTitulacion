export default function Component_Tesis_Fecha({fecha}:{fecha:string}) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg shadow-xl text-gray-600 dark:text-gray-300 dark:bg-gray-700/30 bg-white/70  md:w-6/12  mx-auto">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 2.25v1.5m7.5-1.5v1.5m-11.25 4.5h15m-1.5 13.5h-12a2.25 2.25 0 01-2.25-2.25v-12a2.25 2.25 0 012.25-2.25h12a2.25 2.25 0 012.25 2.25v12a2.25 2.25 0 01-2.25 2.25z"/>
                </svg>
                <h1 className="text-xl sm:text-2xl font-bold">
                    Fecha de Sustentación
                </h1>
            </div>
            <p className="text-3xl sm:text-3xl font-extrabold tracking-wide text-center">
                {fecha ? fecha: ""}
            </p>
        </section>
    );
}
