const listaContenido = [
    //Admin puede ver todo


    //Secretaria
    {title:"Usuarios",url:"",rol:["admin","secretaria"],imagen:""},
    {title:"Requisistos",url:"",rol:["admin","secretaria"],imagen:""},
    {title:"Requisisto Cumplidos",url:"",rol:["admin","secretaria"],imagen:""},
    {title:"Asignar Tesis",url:"",rol:["admin","secretaria"],imagen:""},

    //Profesor
    {title:"Tesis Asignadas",url:"",rol:["admin","secretaria"],imagen:""},
    {title:"",url:"",rol:["admin","secretaria"],imagen:""},

    
    //Profesor
    {title:"Tesis",url:"",rol:["admin","secretaria"],imagen:""},
    {title:"",url:"",rol:["admin","secretaria"],imagen:""},

]

    console.log(listaContenido)

export default function Components_BarraLateral(){

    return(
        <div className="w-3.50/12 h-full bg-black/90 text-white">
            <div>
                hola
            </div>
        </div>
    )
}