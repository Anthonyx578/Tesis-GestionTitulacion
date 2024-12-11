"use client";

import TableComponent from "@/components/Table/tabla_special";
import { ColumnDef } from '@tanstack/react-table';

interface carrera{
    documento: string
}

const url = "/administracion/v1/requisito";


export default function Carreras_Page(){


    const columns: ColumnDef<carrera>[]=[
        { accessorKey: "documento", header: "Documento" },
    ]

 
    return(
        <div>
            <TableComponent url={url} title="Requisito" columns={columns} addView={true} editView={true} deleteView={true} id_name={"id_requisito"}/>
        </div>
    )
}