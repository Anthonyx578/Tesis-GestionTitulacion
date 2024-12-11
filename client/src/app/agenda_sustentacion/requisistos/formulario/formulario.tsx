"use client";

import { useRef } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

type Requisito = { documento: string };

export default function Formulario_Requisito({title,data,id,funcion_crear}: {title: string;data: Requisito | null;id: number | undefined;funcion_crear: boolean;}) {
  const router = useRouter();
  const documento = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      documento: DOMPurify.sanitize(documento.current?.value || "") || "",
    };
    const options = { withCredentials: true, headers: { "Content-Type": "application/json" } };

    try {
      if (funcion_crear) {
        await axios.post("http://localhost:3000/requisito", formData, options);
        toast.success("Requisito creado exitosamente");
      } else {
        await axios.put(`/administracion/v1/requisito/${id}`, formData, options);
        toast.success("Requisito modificado exitosamente");
      }
      router.push("/agenda_sustentacion/requisistos");
    } catch {
      toast.error("Error al procesar la solicitud");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-primary_white dark:bg-primary_dark/70 rounded-lg shadow-lg border border-black/10">
      <h1 className=" text-xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">{title}</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="documento" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre del requisito
          </label>
          <input ref={documento} id="documento" type="text" placeholder="Ingresa el nombre del requisito" className="mt-1 block w-full p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none" defaultValue={data ? data.documento : ""} required/>
        </div>
        <div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md focus:ring focus:ring-blue-500 focus:outline-none">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
