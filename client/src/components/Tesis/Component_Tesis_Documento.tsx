"use client";

import { useState } from "react";

export default function Component_Tesis_Documento({
  roles,
  documento,
}: {
  roles: string | null;
  documento: string;
}) {
  const [newFile, setNewFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNewFile(event.target.files[0]);
    }
  };

  const handleSend = () => {
    if (newFile) {
      // Aquí puedes manejar la lógica para enviar el archivo al backend.
      console.log("Archivo enviado:", newFile);
      setNewFile(null); // Resetear después del envío
    }
  };

  return (
    <section className="flex w-full md:w-6/12 flex-col gap-3 rounded-md bg-white/70 dark:bg-gray-700/30 p-6 shadow-lg">
      <h1 className="font-semibold text-xl">Documento</h1>
      {roles === "estudiantes" ? (
        <>
          {documento ? (
            <>
              <a
                href={documento}
                download
                target="_blank"

                className="text-blue-600 hover:text-blue-800"
              >
                Descargar Documento_TESIS.pdf
              </a>
              <button
                onClick={() => setNewFile(null)}
                className="mt-2 w-max px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Reemplazar documento
              </button>
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No se ha cargado ningún documento.
            </p>
          )}
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mt-3 text-gray-600 dark:text-gray-300"
          />
          {newFile && (
            <button
              onClick={handleSend}
              className="mt-2 w-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Enviar documento
            </button>
          )}
        </>
      ) : (
        <>
          {documento ? (
            <a
              href={documento}
              download
              target="_blank"

              className="my-2 text-blue-600 hover:text-blue-800"
            >
              Descargar Documento_TESIS.pdf
            </a>
          ) : (
            <p className="my-2">No se ha encontrado ningún documento.</p>
          )}
        </>
      )}
    </section>
  );
}
