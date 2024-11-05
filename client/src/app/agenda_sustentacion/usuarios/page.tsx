import TableComponent from "@/components/Table/tabla_special";

export const metadata = {
    title: "Usuarios - Administración de Sustentación de Tesis",
    robots: "noindex, follow",
    alternates: {canonical:""}
};


export default function Usuarios_Page(){
    return(<TableComponent title="Usuarios" addView={true} datoView={15}/>)
}