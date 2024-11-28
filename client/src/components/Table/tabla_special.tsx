"use client";

import IAdd from "@/assets/Iconos/IADD.svg";
import ISearch from "@/assets/Iconos/ISearch.svg";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function TableComponent({
  title,
  addView, 
}: { 
  title: string; 
  addView: boolean; 
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(searchParams);
  const pag_actual = parseInt(searchParams.get("page") || "1", 10);
  const pag_total = 20;

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };

  const renderPagination = () => {
    const buttons = [];

    if (pag_actual > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="p-2 border dark:border-white/10 border-black/10 rounded-md"
          aria-label="Ir a la primera página"
        >
          1
        </button>
      );
    }

    if (pag_actual > 3) {
      buttons.push(
        <span
          key="ellipsis-start"
          className="p-2 border border-black/10 dark:border-white/10 rounded-md"
        >
          ...
        </span>
      );
    }

    if (pag_actual > 2) {
      buttons.push(
        <button
          key={pag_actual - 1}
          onClick={() => handlePageChange(pag_actual - 1)}
          className="p-2 border dark:border-white/10 border-black/10 rounded-md"
        >
          {pag_actual - 1}
        </button>
      );
    }

    buttons.push(
      <button
        key={pag_actual}
        className="p-2 border border-black/10 dark:border-white/10 dark:bg-white/30 bg-black/10 rounded-md"
        disabled
      >
        {pag_actual}
      </button>
    );

    if (pag_actual < pag_total - 1) {
      buttons.push(
        <button
          key={pag_actual + 1}
          onClick={() => handlePageChange(pag_actual + 1)}
          className="p-2 border dark:border-white/10 border-black/10 rounded-md"
        >
          {pag_actual + 1}
        </button>
      );
    }

    if (pag_actual < pag_total - 2) {
      buttons.push(
        <span
          key="ellipsis-end"
          className="p-2 border border-black/10 dark:border-white/10 rounded-md"
        >
          ...
        </span>
      );
    }

    if (pag_actual < pag_total) {
      buttons.push(
        <button
          key={pag_total}
          onClick={() => handlePageChange(pag_total)}
          className="p-2 border dark:border-white/10 border-black/10 rounded-md"
          aria-label={`Ir a la última página ${pag_total}`}
        >
          {pag_total}
        </button>
      );
    }

    return buttons;
  };

  const tableData = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 28 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 34 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 45 },
    { id: 4, name: "Alice Williams", email: "alice@example.com", age: 29 },
    { id: 5, name: "Charlie Brown", email: "charlie@example.com", age: 38 },
    { id: 6, name: "John Doe", email: "john@example.com", age: 28 },
    { id: 7, name: "Jane Smith", email: "jane@example.com", age: 34 },
    { id: 8, name: "Bob Johnson", email: "bob@example.com", age: 45 },
    { id: 9, name: "Alice Williams", email: "alice@example.com", age: 29 },
    { id: 10, name: "Charlie Brown", email: "charlie@example.com", age: 38 },
    { id: 11, name: "John Doe", email: "john@example.com", age: 28 },
    { id: 12, name: "Jane Smith", email: "jane@example.com", age: 34 },
    { id: 13, name: "Bob Johnson", email: "bob@example.com", age: 45 },
    { id: 14, name: "Alice Williams", email: "alice@example.com", age: 29 },
    { id: 15, name: "Charlie Brown", email: "charlie@example.com", age: 38 },
  ];

  const paginationButtons = useMemo(() => renderPagination(), [pag_actual, pag_total]);

  return (
    <div className="flex flex-col gap-3 p-4 md:p-2 lg:p-2">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <h1 className="font-semibold text-xl">{title}</h1>
          {addView && (
            <Link
              href={`${pathname}/formulario`}
              className="p-1 bg-blue_personalizado/80 hover:bg-blue_personalizado hover:shadow-sm hover:shadow-blue-300/20 rounded-md"
            >
              <Image src={IAdd} alt="Icono Añadir" width={20} height={20} />
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center gap-2 mt-3 md:mt-0">
          <div className="flex flex-row items-center relative rounded-sm shadow-sm bg-black/10 dark:bg-white/90 border border-black/30 text-black/80">
            <Image
              src={ISearch}
              alt="Icono Buscar"
              width={28}
              height={20}
              className="absolute p-1"
            />
            <input
              type="text"
              className="pl-7 pr-2 py-1 rounded-sm text-gray-800 w-full md:w-auto"
              placeholder="Búsqueda"
            />
          </div>
        </div>
      </div>
      <hr className="border-1 border-black/60 dark:border-white/60" />

      <table className="min-w-full border-collapse border border-gray-300 bg-slate-300/10 p-2 overflow-x-auto overscroll-x-auto">
        <thead>
          <tr className="bg-blue-200/60 dark:bg-blue-950/40">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Edad</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">{item.id}</td>
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2">{item.email}</td>
              <td className="border border-gray-300 p-2 text-center">{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-center mt-4 gap-2">
        {pag_actual > 1 && (
          <button
            onClick={() => handlePageChange(pag_actual - 1)}
            className="p-2 border dark:border-white/10 border-black/10 rounded-md font-semibold"
            aria-label="Página anterior"
          >
            &lt;
          </button>
        )}

        {paginationButtons}

        {pag_actual < pag_total && (
          <button
            onClick={() => handlePageChange(pag_actual + 1)}
            className="p-2 border dark:border-white/10 border-black/10 rounded-md"
            aria-label="Página siguiente"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}
