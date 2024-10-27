"use client";

import { useState } from "react";
import Image from 'next/image';
import IUser from '@/assets/Iconos/IUSUARIOS.svg'; 
import IPassword from '@/assets/Iconos/IPASSWORD.svg'; 
import IVisible from '@/assets/Iconos/IVISIBLE.svg'; 
import IInvisible from '@/assets/Iconos/INVISIBLE.svg'; 
import DOMPurify from 'dompurify';
import axios from "axios";
import Link from 'next/link';

export default function Login_Formulario(){    
    const [viewPassword,setViewPassword] = useState(false);
    const [formData,setFormData] = useState({ usuario: '',contrasena: '' });
    const [messageError, setMessageError] = useState("");

   // Función para manejar el cambio en los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const sanitizedValue = DOMPurify.sanitize(value);  // Sanitiza el valor del input
        setFormData({ ...formData, [name]: sanitizedValue });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const options = { withCredentials: true, headers: { 'Content-Type': 'application/json' } };

        try {
            const response = await axios.post('/administracion/v1/session/login', formData, options);
            if (response.status === 200) {
                setMessageError('');
                document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly`;
                localStorage.setItem("user", response.data.user);  
                localStorage.setItem("rol", response.data.rol);          
                localStorage.setItem("id", response.data.id);           
        
                window.location.href = '/administracion'; 
            }
        } catch (error) {
            setMessageError('Error en el inicio de sesión.');
            console.log(error)
        }
    };

    // Desactiva las acciones de copiar, pegar y cortar
    const disableCopyPasteCut = (e: React.ClipboardEvent) => {
        e.preventDefault();
    };
    
    return(
        <form className="formularioLogin flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-row items-center rounded-md shadow-sm bg-white/40 border border-black/30">
                <Image src={IUser} alt="Icono de usuario" width={50} height={50} className="p-3 border-r border-black/30" />
                <input type="text" id="usuario" name="usuario" placeholder="Usuario" className="w-full placeholder-gray-500 outline-none bg-transparent p-3 rounded-r-md" autoComplete="username" pattern="[A-Za-z0-9]{12,}" value={formData.usuario}onChange={handleInputChange} required/>
            </div>
            <div className="relative ">
                <div className="flex flex-row items-center rounded-md shadow-sm bg-white/40 border border-black/30">
                <Image src={IPassword} alt="Icono de contraseña" width={50} height={50} className="p-3 border-r border-black/30" />
                <input onCopy={disableCopyPasteCut} onPaste={disableCopyPasteCut} onCut={disableCopyPasteCut} type={viewPassword ? "text" : "password"} id="contrasena" name="contrasena" placeholder="Contraseña" className="w-full placeholder-gray-500 rounded-r-md outline-none text-gray-800 p-3 pr-8 bg-transparent" autoComplete="current-password" pattern="[A-Za-z0-9\\-_@\\.!]{12,}" value={formData.contrasena} onChange={handleInputChange} required/>
                <Image onClick={() => setViewPassword(!viewPassword)} src={viewPassword ? IInvisible : IVisible} alt="Icono de mostrar contraseña" width={17} height={17} className="absolute cursor-pointer right-2 z-20"/>
                </div>
                {messageError && (<p className="text-red-500 absolute top-full left-0 text-start mt-1">{messageError}</p>)}
            </div>
            <div className="text-right pt-4">
                <Link href="/recuperacion-cuenta" className="text-gray-500 hover:text-gray-700" prefetch={true}>¿Olvidaste tu contraseña?</Link>
            </div>
            <button className="bg-slate-400 p-2 rounded-md">Iniciar Sesión</button>
        </form>
    )
}