import { Toaster } from "sonner";
import Formulario_Carrera from "./formulario";

const url = process.env.NEXT_PRIVATE_KEY_URL;

const fetchData = async (id?: number) => {
    const response = await fetch(`${url}carrera/${id}`, { cache: "no-store" });
    const data = await response.json();
    return data.Data;
};

export default async function Formulario_Carrera_Page({searchParams}: {searchParams: { id?: number }}) {
  const { id } = await searchParams;

  const data = id ? await fetchData(id) : null;
  const title = id ? "Modificar Carrera" : "Crear Carrera";
  const funcioncrear = !id;

  return (
    <>
      <Formulario_Carrera title={title} data={data} funcion_crear={funcioncrear} id={id} />
      <Toaster richColors />
    </>
  );
}