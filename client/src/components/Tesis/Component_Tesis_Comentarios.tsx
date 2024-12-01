export default function Component_Tesis_Comentario() {
    return (
        <details className="flex flex-col gap-4 p-6 rounded-lg bg-white/90 dark:bg-gray-700/30 shadow-lg transition-all">
            <summary className="px-2 py-3 font-semibold text-xl text-gray-800 dark:text-gray-200 cursor-pointer hover:text-indigo-600">
                Comentarios
            </summary>
            <section className="flex flex-col gap-4 p-4  rounded-md">
                {/* Comentario 1 */}
                <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
                    <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300">Dr. Juan Pérez</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi sapiente impedit aspernatur facilis dolore dolor neque laudantium error, suscipit reiciendis sed harum fugiat mollitia totam natus eos amet. Rem, culpa.
                    </p>
                </div>
                {/* Comentario 2 */}
                <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
                    <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300">Ing. Carlos Rodríguez                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi sapiente impedit aspernatur facilis dolore dolor neque laudantium error, suscipit reiciendis sed harum fugiat mollitia totam natus eos amet. Rem, culpa.
                    </p>
                </div>
                {/* Comentario 3 */}
                <div>
                    <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300">Dr. Juan Pérez</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi sapiente impedit aspernatur facilis dolore dolor neque laudantium error, suscipit reiciendis sed harum fugiat mollitia totam natus eos amet. Rem, culpa.
                    </p>
                </div>
            </section>
        </details>
    );
}
