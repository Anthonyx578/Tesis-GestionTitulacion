import { Toaster } from "sonner";
import Formulario_Usuario from "./formulario";
const url = process.env.NEXT_PRIVATE_KEY_URL;

const fetchData = async (id?: number) => {
    const response = await fetch(`${url}usuario/${id}`, { cache: "no-store" });
    const data = await response.json();
    return data.Data;
};

const fetchData_LoadDatos = async (tablaurl:string) => {
  const response = await fetch(`${url}${tablaurl}`, { cache: "no-store" });
  const data = await response.json();
  return data.data;
};




export default async function Formulario_Requisisto_Page({searchParams}: {searchParams: { id?: number }}) {
  const { id } = await searchParams;

  const data = id ? await fetchData(id) : null;
  const data_carrera =  await fetchData_LoadDatos("carrera");
  const data_rol = ( await fetchData_LoadDatos("rol"));

 


  const title = id ? "Modificar Usuario" : "Crear Usuario";
  const funcioncrear = !id;

  return (
    <>
      <Formulario_Usuario title={title} data={data} funcion_crear={funcioncrear} id={id} data_carrera={data_carrera} data_rol={data_rol} />
      <Toaster richColors />
    </>
  );
}