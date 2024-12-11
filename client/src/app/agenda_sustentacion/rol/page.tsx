"use client";

import TableComponentRol from "@/components/Table/tabla_rol";
import { ColumnDef } from '@tanstack/react-table';

interface Rol{
    rol: string
}

const url = "/administracion/v1/rol";


export default function Carreras_Page(){


    const columns: ColumnDef<Rol>[]=[
        { accessorKey: "rol", header: "Rol" },
    ]

 
    return(
        <div>
            <TableComponentRol url={url} title="Rol" columns={columns} addView={false} id_name={"id_rol"} deleteView={true} editView={true}/>
        </div>
    )
}