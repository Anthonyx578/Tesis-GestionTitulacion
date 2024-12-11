"use client";

import TableComponent from "@/components/Table/tabla_special";
import { ColumnDef } from '@tanstack/react-table';

interface carrera{
    nombre_usuario: string,
    id_carrera: string,

    nombres: string,
    apellidos: string,
    id_rol: string,
}


const url = "/administracion/v1/usuario";


export default function Carreras_Page(){
    
    const columns: ColumnDef<carrera>[]=[
        { accessorKey: "nombre_usuario", header: "Usuario" },
        { accessorKey: "id_carrera", header: "Carrera" },
        { accessorKey: "id_rol", header: "Rol" },
        { accessorKey: "nombres", header: "Nombres" },
        { accessorKey: "apellidos", header: "Apellidos" }
    ]


    return(
        <div>
            <TableComponent url={url} title="Usuario" columns={columns} addView={true} editView={true} deleteView={true} id_name={"id_usuario"} />
        </div>
    )
}