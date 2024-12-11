export default function Component_Tesis_Titulo({title,periodo,descripcion}:{title:string,periodo:string,descripcion:string}){
    return(
        <section className="flex flex-col gap-1 rounded-md bg-white/70 dark:bg-gray-700/30 p-6 shadow-lg">
            <h1 className=" font-semibold text-xl">{title} / {periodo}</h1>
            <p className="text-gray-600 dark:text-gray-300">{descripcion}</p>
        </section>
    )
}