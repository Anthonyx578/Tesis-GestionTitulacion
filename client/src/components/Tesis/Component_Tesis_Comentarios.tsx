"use client";
import { useState } from "react";

export default function Component_Tesis_Comentario() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative w-full mx-auto">
            <details className="p-6 rounded-lg bg-white/90 dark:bg-gray-700/30 shadow-lg transition-all">
                <summary className="flex justify-between items-center px-2 font-semibold text-xl text-gray-800 dark:text-gray-200 cursor-pointer hover:text-indigo-600">
                    <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                        </svg>
                        Comentarios
                    </span>
                    <button onClick={(e) => {e.preventDefault();setIsModalOpen(true); }}className="px-3 py-1 text-sm font-semibold text-white rounded-lg bg-gray-700 hover:bg-gray-800 border border-black/30 transition">
                        Añadir
                    </button>
                </summary>
                <section className="flex flex-col gap-4 p-4 mt-4 rounded-md">
                    {/* Comentario 1 */}
                    <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
                        <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300">
                            Dr. Juan Pérez
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi sapiente impedit aspernatur facilis dolore dolor neque laudantium error, suscipit reiciendis sed harum fugiat mollitia totam natus eos amet. Rem, culpa.
                        </p>
                    </div>
                    {/* Comentario 2 */}
                    <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
                        <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300">
                            Ing. Carlos Rodríguez
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi sapiente impedit aspernatur facilis dolore dolor neque laudantium error, suscipit reiciendis sed harum fugiat mollitia totam natus eos amet. Rem, culpa.
                        </p>
                    </div>
                </section>
            </details>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Añadir Comentario
                        </h2>
                        <textarea className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"placeholder="Escribe tu comentario aquí..."></textarea>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
                                Cerrar
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
