"use client";

import Image from 'next/image';
import ICorreo from '@/assets/Iconos/ICORREO.svg'
import DOMPurify from 'dompurify';
import axios from "axios";
import { toast } from 'sonner';
import { useState, useEffect, useRef } from 'react';

export default function RecuperacionCuenta_Formulario(){    
    const correoRef = useRef<HTMLInputElement | null>(null);
    
    const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);

    useEffect(() => {
        const storedTime = localStorage.getItem('lastSubmissionTime');
        if (storedTime) {setLastSubmissionTime(parseInt(storedTime, 10));}
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const currentTime = new Date().getTime();
    
        const formData = {
            correo: (DOMPurify.sanitize(correoRef.current?.value || ""))
        }

        if (lastSubmissionTime && currentTime - lastSubmissionTime < 300000) {
            toast.dismiss();
            toast.warning('Debes esperar 5 minutos antes de intentar nuevamente.');
            return;
        }

        try {
            const response = await axios.post('/administracion/v1/session/resetlink', formData );
    
            // Manejar la respuesta de la API
            if (response.status === 200) {
                toast.success('Correo de recuperación enviado exitosamente.');
                setLastSubmissionTime(currentTime);
                localStorage.setItem('lastSubmissionTime', currentTime.toString());
            }
            // Opciones 3 consultar por cliente
            if (response.status === 204){
                toast.warning("No existe usuario con ese correo")
            }

        }catch{
            toast.dismiss();
            toast.error('Error al enviar la solicitud. Por favor, intenta nuevamente.');
            localStorage.setItem('lastSubmissionTime', currentTime.toString());
        }
    };

    return(
        <form className="formularioLogin flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-row items-center rounded-md shadow-sm  bg-white/40 border border-black/30">
                <Image src={ICorreo} alt="Icono de usuario" width={50} height={50} className="p-3 bg-white/30 rounded-l-md border-r border-black/30" />
                <input type="email" ref={correoRef} id="correo" name="correo" placeholder="Correo" className="w-full placeholder:color-s placeholder-gray-500  outline-none bg-transparent p-3 rounded-r-md" autoComplete="correo" pattern="[A-Za-z0-9\\-_@\\.]{3,}" required />
            </div>
            <button className="bg-slate-400 p-2 mt-2 rounded-md">Enviar</button>
        </form>
    )
}