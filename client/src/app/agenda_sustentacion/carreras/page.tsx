"use client";

import TableComponent from "@/components/Table/tabla_special";
import { ColumnDef } from '@tanstack/react-table';

interface carrera{
    nombre_carrera: string
}


const url = "/administracion/v1/carrera";


export default function Carreras_Page(){
    
    const columns: ColumnDef<carrera>[]=[
        { accessorKey: "nombre_carrera", header: "Carrera" }
    ]


    return(
        <div>
            <TableComponent url={url} title="Carrera" columns={columns} addView={true} editView={true} deleteView={true} id_name={"id_carrera"} />
        </div>
    )
}