"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Pagination from "@/components/Table/paginacion";

import IAdd from "@/assets/Iconos/IADD.svg";
import ILoading from "@/assets/Iconos/ILoading.svg";

const TableComponentRol = ({ title, addView, url, columns, editView, deleteView, id_name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchData = async (page = 1, limit = 15) => {
    try {
      setLoading(true);

      const params = { page, limit };
      const response = await axios.get(url, { params });
      
      setData(response.data.data || []);
      setTotalPages(response.data.meta?.TotalPages || 1);
    } catch {
      console.log("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);  // Solo usamos la página actual para cargar datos
  }, [url, currentPage]);  // Dependencias son solo URL y la página actual

  const handlePageChange = (page) => {
    router.push(`${pathname}?page=${page}`);
  };

  const handleToggle = async (id, currentStatus) => {  
    try {
      if (currentStatus === 1) {
        await axios.delete(`${url}/${id}`);
      } else {
        await axios.put(`${url}/${id}/restore`);
      }
    } catch {
      console.log("Error al cambiar el estado");
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-primary_white dark:bg-primary_dark/70 border border-black/10 p-4 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-11/12 sm:w-full flex-row sm:gap-4 items-center justify-between sm:justify-normal">
          <h1 className="font-bold w-8/12 sm:w-min text-2xl text-gray-800 dark:text-gray-200 break-words">{title}</h1>
          {addView && (
            <button onClick={() => router.push(`${pathname}/formulario`)} className="p-2 bg-blue_personalizado hover:bg-blue_personalizado/80 text-white rounded-lg shadow">
              <Image src={IAdd} alt="Añadir" width={20} />
            </button>
          )}
        </div>
      </div>
      <hr className="border-gray-300 dark:border-gray-700" />

      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-80">
          <Image src={ILoading} alt="Cargando" width={40} className="animate-spin" />
          <p className="text-gray-700 dark:text-gray-400">Cargando...</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-300">
                  {columns.map(({ accessorKey, header }) => (
                    <th key={accessorKey} className="border px-4 py-2">
                      {header}
                    </th>
                  ))}
                  {(editView || deleteView) && <th className="border px-4 py-2">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={row[id_name] || index} className="hover:bg-gray-300 dark:hover:bg-gray-700/40">
                    {columns.map(({ accessorKey }) => (
                      <td key={accessorKey} className="border px-4 py-2 text-gray-700 dark:text-gray-300">
                        {row[accessorKey]}
                      </td>
                    ))}
                    {(editView || deleteView) && (
                      <td className="w-80 border px-4 py-2">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleToggle(row[id_name], row.status)} className={`${ row.status === 0? 'bg-green-500 hover:bg-green-600': 'bg-red-500 hover:bg-red-600' } text-white p-2 rounded-md`}>
                            {row.status === 1 ? 'DESHABILITAR' : 'HABILITAR'}
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default TableComponentRol;
