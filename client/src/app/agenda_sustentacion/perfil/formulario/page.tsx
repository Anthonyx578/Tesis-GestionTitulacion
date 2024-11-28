import Formulario_Perfil from "./formulario-perfil";

export default function FormularioPerfil_Page(){
    return(
        <div className=" w-full flex justify-center">
            <div className="flex flex-col w-7/12 gap-2 justify-center rounded-md border p-6">
                <h1 className=" font-semibold text-2xl">Modificando Informacion Personal</h1>
                <hr/>
                <Formulario_Perfil/>
            </div>
        </div>
    )
}