export default function Component_Tesis_Documento(){
    return(
        <section className="flex flex-col gap-1 rounded-md bg-white/70 dark:bg-gray-700/30 p-6 shadow-lg">
            <h1 className=" font-semibold text-xl">Documento</h1>
            <input type="file" className="text-gray-600 dark:text-gray-300" />
        </section>
    )
}