"use client";

import { useRef } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

type Carrera = { nombre_carrera: string };

export default function Formulario_Carrera({title,data,id,funcion_crear}: {title: string;data: Carrera | null;id: number | undefined;funcion_crear: boolean;}) {
  const router = useRouter();
  const nombre_carrera = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      nombre_carrera: DOMPurify.sanitize(nombre_carrera.current?.value || "") || "",
    };
    const options = { withCredentials: true, headers: { "Content-Type": "application/json" } };

    try {
      if (funcion_crear) {
        await axios.post("http://localhost:3000/carrera", formData, options);
        toast.success("Carrera creada exitosamente");
      } else {
        await axios.put(`/administracion/v1/carrera/${id}`, formData, options);
        toast.success("Carrera modificada exitosamente");
      }
      router.push("/agenda_sustentacion/carreras");
    } catch {
      toast.error("Error al procesar la solicitud");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-primary_white dark:bg-primary_dark/70 rounded-lg shadow-lg border border-black/10">
      <h1 className=" text-xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">{title}</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre_carrera" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre de la carrera
          </label>
          <input ref={nombre_carrera} id="nombre_carrera" type="text" placeholder="Ingresa el nombre de la carrera" className="mt-1 block w-full p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none" defaultValue={data ? data.nombre_carrera : ""} required/>
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
