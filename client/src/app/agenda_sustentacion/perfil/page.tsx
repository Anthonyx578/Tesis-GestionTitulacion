import Link from "next/link";

export default function Perfil_Page() {
    return (
        <div className="flex flex-col gap-6 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    Perfil
                </h1>
                <Link href="perfil/formulario" className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:py-2 sm:px-4 rounded-lg font-semibold transition-all">
                    Editar Información
                </Link>
            </div>
            <hr className="border-gray-300 dark:border-gray-700" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Nombre</h3>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-gray-200">
                        Leif Wtiher Velasquez
                    </p>
                </div>

                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Apellido</h3>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-gray-200">
                        Velasquez
                    </p>
                </div>

                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Usuario</h3>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-gray-200">
                        leif123
                    </p>
                </div>

                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Contraseña</h3>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-gray-200">
                        ********
                    </p>
                </div>

                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Correo</h3>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-gray-200">
                        leif@example.com
                    </p>
                </div>

                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Teléfono</h3>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-gray-200">
                        +123456789
                    </p>
                </div>

                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Carrera</h3>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-gray-200">
                        Ingeniería en Sistemas
                    </p>
                </div>

                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Fecha de Nacimiento</h3>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-gray-200">
                        01/01/2000
                    </p>
                </div>
            </div>
        </div>
    );
}
