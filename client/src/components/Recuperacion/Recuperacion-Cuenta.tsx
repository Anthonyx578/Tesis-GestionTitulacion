"use client";

import Image from 'next/image';
import ICorreo from '@/assets/Iconos/ICORREO.svg'
import DOMPurify from 'dompurify';
import axios from "axios";
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export default function RecuperacionCuenta_Formulario(){    
    const [formData, setFormData] = useState({ correo: '' });
    const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);

    useEffect(() => {
        const storedTime = localStorage.getItem('lastSubmissionTime');
        if (storedTime) {
        setLastSubmissionTime(parseInt(storedTime, 10));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const sanitizedValue = DOMPurify.sanitize(value);
        setFormData({ ...formData, [name]: sanitizedValue });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const currentTime = new Date().getTime();
    
        if (lastSubmissionTime && currentTime - lastSubmissionTime < 300000) {
        toast.dismiss();
        toast.warning('Debes esperar 5 minutos antes de intentar nuevamente.');
        return;
        }

        try {
        // Aquí haces la petición real a tu API
        const response = await axios.post('/administracion/v1/session/resetlink', 
            formData // Asegúrate de enviar los datos correctos
        );
    
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

        } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error('Error al enviar la solicitud. Por favor, intenta nuevamente.');
        localStorage.setItem('lastSubmissionTime', currentTime.toString());
        }
    };

    return(
        <form className="formularioLogin flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-row items-center rounded-md shadow-sm bg-white/40 border border-black/30">
                <Image src={ICorreo} alt="Icono de usuario" width={50} height={50} className="p-3 border-r border-black/30" />
                <input type="email" id="correo" name="correo" placeholder="Correo" className="w-full placeholder:color-s placeholder-gray-500  outline-none bg-transparent p-3 rounded-r-md" autoComplete="correo" pattern="[A-Za-z0-9\\-_@\\.]{3,}" value={formData.correo} onChange={handleInputChange} required />
            </div>
            <button className="bg-slate-400 p-2 mt-2 rounded-md">Enviar</button>
        </form>
    )
}