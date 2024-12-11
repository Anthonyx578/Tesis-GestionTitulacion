"use client";

import { useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";


interface Carrera {
  id_carrera: number;
  nombre_carrera: string;
}

interface Rol {
  id_rol: number;
  rol: string;
}

type Usuario = {
  nombre_usuario: string;
  contrasena: string;
  id_carrera: number | null;
  id_rol: number | null;
  correo: string;
  telefono: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
};

export default function Formulario_Usuario({
  title,
  data,
  id,
  funcion_crear,
  data_carrera,
  data_rol,
}: {
  title: string;
  data: Usuario | null;
  id: number | undefined;
  funcion_crear: boolean;
  data_carrera: Carrera[];
  data_rol: Rol[];
}) {
  const router = useRouter();

  const nombre_usuario = useRef<HTMLInputElement>(null);
  const contrasena = useRef<HTMLInputElement>(null);
  const correo = useRef<HTMLInputElement>(null);
  const telefono = useRef<HTMLInputElement>(null);
  const nombres = useRef<HTMLInputElement>(null);
  const apellidos = useRef<HTMLInputElement>(null);
  const fecha_nacimiento = useRef<HTMLInputElement>(null);

  const carreraSeleccionada = useRef<any>(null);
  const rolSeleccionado = useRef<any>(null);

  const [isClient, setIsClient] = useState(false);

  // Usamos `useEffect` para asegurar que el código de cliente solo se ejecute en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Este retorno previene el error de hidratación en el servidor
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Crear objeto con todos los datos
    const formData = {
      nombre_usuario: DOMPurify.sanitize(nombre_usuario.current?.value || ""),
      contrasena: DOMPurify.sanitize(contrasena.current?.value || ""),
      id_carrera: carreraSeleccionada.current?.value || null,
      id_rol: rolSeleccionado.current?.value || null,
      correo: DOMPurify.sanitize(correo.current?.value || ""),
      telefono: DOMPurify.sanitize(telefono.current?.value || ""),
      nombres: DOMPurify.sanitize(nombres.current?.value || ""),
      apellidos: DOMPurify.sanitize(apellidos.current?.value || ""),
      fecha_nacimiento: DOMPurify.sanitize(fecha_nacimiento.current?.value || ""),
    };
  
    // Filtrar campos vacíos o nulos
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "" && value !== null)
    );
  
    console.log("Datos enviados:", filteredFormData);
  
    const options = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
  
    try {
      if (funcion_crear) {
        const response = await axios.post("http://localhost:3000/usuario", filteredFormData, options);
        console.log(response.data.Data.id_usuario)
        toast.success("Usuario creado exitosamente");
      } else {
        await axios.put(`/administracion/v1/usuario/${id}`, filteredFormData, options);
        toast.success("Usuario modificado exitosamente");
      }
      
      //router.push("/agenda_sustentacion/usuario");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al procesar la solicitud"
      );
    }
  };

  const opcionesCarreras = (data_carrera || []).map((carrera) => ({
    value: carrera.id_carrera,
    label: carrera.nombre_carrera,
  }));
  
  const opcionesRoles = (data_rol || []).map((rol) => ({
    value: rol.id_rol,
    label: rol.rol,
  }));



  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-primary_white dark:bg-primary_dark/70 rounded-lg shadow-lg border border-black/10">
      <h1 className="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">{title}</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Usuario y Contraseña */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre_usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Usuario
            </label>
            <input ref={nombre_usuario} defaultValue={data ? data.nombre_usuario : ""} id="nombre_usuario" type="text" placeholder="Nombre de usuario" className="mt-1 block w-full p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none" required/>
          </div>
          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input ref={contrasena} defaultValue={data ? data.contrasena : ""} id="contrasena" type="password" placeholder="Contraseña" className="mt-1 block w-full p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none" required/>
          </div>
        </div>
  
        {/* Nombres y Apellidos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombres
            </label>
            <input ref={nombres} defaultValue={data ? data.nombres : ""} id="nombres" type="text" placeholder="Nombres" className="mt-1 block w-full p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Apellidos
            </label>
            <input ref={apellidos} defaultValue={data ? data.apellidos : ""} id="apellidos" type="text" placeholder="Apellidos" className="mt-1 block w-full p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"/>
          </div>
        </div>
  
        {/* Teléfono y Correo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Teléfono
            </label>
            <input ref={telefono} defaultValue={data ? data.telefono : ""} id="telefono" type="tel" placeholder="Número telefónico" className="mt-1 block w-full p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo Electrónico
            </label>
            <input ref={correo} defaultValue={data ? data.correo : ""} id="correo" type="email" placeholder="Correo electrónico" className="mt-1 block w-full p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"/>
          </div>
        </div>
  
        {/* Carrera y Rol */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Carrera</label>
            <select defaultValue={carreraSeleccionada.current?.value || 1} onChange={(e) => (carreraSeleccionada.current = { value: e.target.value, label: e.target.options[e.target.selectedIndex].text })} className="block w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" required >
              {opcionesCarreras.map((carrera) => (
                <option key={carrera.value} value={carrera.value}>
                  {carrera.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rol</label>
            <select defaultValue={rolSeleccionado.current?.value || 1}  onChange={(e) => (rolSeleccionado.current = { value: e.target.value, label: e.target.options[e.target.selectedIndex].text })} className="block w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" required>
              {opcionesRoles.map((rol) => (
                <option key={rol.value} value={rol.value}>
                  {rol.label}
                </option>
              ))}
            </select>
          </div>
        </div>


  
        {/* Fecha de Nacimiento */}
        <div>
          <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fecha de Nacimiento
          </label>
          <input ref={fecha_nacimiento} defaultValue={data ? data.fecha_nacimiento : ""} id="fecha_nacimiento" type="date" className="mt-1 block w-full p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"/>
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
