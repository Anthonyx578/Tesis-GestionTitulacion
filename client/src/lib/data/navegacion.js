// Separacion de lista por redimiento y no realizar bucles. 
// Se buco la creacion a partir de ssr

import IAcount from "@/assets/Iconos/IAcount.svg";
import IPerfil from "@/assets/Iconos/IPerfil.svg";
import IJuradoTesis from "@/assets/Iconos/IJuradoTesis.svg";
import ITutorTesis from "@/assets/Iconos/ITutorTesis.svg";
import ITesis from "@/assets/Iconos/ITesis.svg";
import IRequisito from "@/assets/Iconos/IRequisito.svg";

const listaNavegacion_Administrador = [
    {title:"Perfil",url:"/agenda_sustentacion/perfil",imagen:IPerfil},
    {title:"todo1",url:"",imagen:IAcount},
    {title:"todo2",url:"",imagen:IAcount},
    {title:"todo3",url:"",imagen:IAcount}, 
]

const listaNavegacion_Secretaria = [
    {title:"Perfil",url:"/agenda_sustentacion/perfil",imagen:IPerfil},
    {title:"Asignacion de Tesis",url:"/agenda_sustentacion/asignacion-tesis",imagen:IAcount},
    {title:"Usuarios",url:"/agenda_sustentacion/usuarios",imagen:IAcount},
    {title:"Requisistos",url:"/agenda_sustentacion/requisitos",imagen:IRequisito}
]


const listaNavegacion_Profesor = [
    {title:"Perfil",url:"/agenda_sustentacion/perfil",imagen:IPerfil},
    {title:"Tutor de Tesis",url:"/agenda_sustentacion/tutor-tesis",imagen:ITutorTesis},
    {title:"Tesis Asignadas",url:"/agenda_sustentacion/tesis-asignada",imagen:IJuradoTesis}
]

const listaNavegacion_Estudiantes = [
    {title:"Perfil",url:"/agenda_sustentacion/perfil",imagen:IPerfil},
    {title:"Tesis",url:"/agenda_sustentacion/tesis",imagen:ITesis}
]

export {listaNavegacion_Administrador,listaNavegacion_Secretaria,listaNavegacion_Profesor,listaNavegacion_Estudiantes};