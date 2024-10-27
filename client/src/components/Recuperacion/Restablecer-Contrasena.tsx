"use client";

import { useState } from "react";
import Image from 'next/image';
import IPassword from '@/assets/Iconos/IPASSWORD.svg'; 
import IPasswordRenovar from '@/assets/Iconos/IPASSWORDRENOVAR.svg'; 
import IVisible from '@/assets/Iconos/IVISIBLE.svg'; 
import IInvisible from '@/assets/Iconos/INVISIBLE.svg'; 
import DOMPurify from 'dompurify';
import axios from "axios";

export default function Login_Formulario(){    
    const [viewPassword1, setViewPassword1] = useState(false);
    const [viewPassword2, setViewPassword2] = useState(false);
    const [formData, setFormData] = useState({ password1: '', password2: '' });
    const [messageError, setMessageError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [viewWindows, setViewWindows] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageError("");
        const { name, value } = e.target;
        const sanitizedValue = DOMPurify.sanitize(value);
        setFormData({ ...formData, [name]: sanitizedValue });
    };

    const validatePasswords = (): boolean => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
      
        if (formData.password1 !== formData.password2) {
            setMessageError("Las contraseñas no coinciden");
            return false;
        }
      
        if (!passwordPattern.test(formData.password1)) {
            setMessageError("La contraseña debe tener al menos 12 caracteres, una mayúscula, un número y un signo especial.");
            return false;
        }
      
        setMessageError("");
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!validatePasswords()) return;
    
        setIsSubmitting(true); 
    
        const options = { withCredentials: true, headers: { 'Content-Type': 'application/json' } };
        console.log(formData)
        try {
            const response = await axios.post('/administracion/v1/session/resetpassword', formData, options);
            if (response.status === 200){
                setMessageError('');
                document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly`;
                setViewWindows(false)
            }
        } catch (error) {
            setMessageError('El cambio de contraseña falló. Intente de nuevo');
            console.log(error);
        } finally {
            setIsSubmitting(false); 
        }
      };
    
    const disableCopyPasteCut = (e: React.ClipboardEvent) => {
        e.preventDefault();
    };
    
    return(
        <>
            {viewWindows &&(
                <div>
                    <p className=" bg-violet-800/60  font-semibold text-white/80 p-1 text-center rounded-md">Tu contraseña ha sido cambiada con éxito.</p>
                </div>
            )}
            {!viewWindows &&(
                <form className="formularioLogin flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="relative ">
                        <div className="flex flex-row items-center rounded-md shadow-sm bg-white/40 border border-black/30">
                            <Image src={IPassword} alt="Icono de contraseña" width={50} height={50} className="p-3 border-r border-black/30" />
                            <input onCopy={disableCopyPasteCut} onPaste={disableCopyPasteCut} onCut={disableCopyPasteCut} type={viewPassword1 ? "text" : "password"} id="password1" name="password1" placeholder="Contraseña" className="w-full placeholder-gray-500 rounded-r-md outline-none text-gray-800 p-3 pr-8 bg-transparent" autoComplete="current-password" pattern="[A-Za-z0-9\\-_@\\.!]{12,}" value={formData.password1} onChange={handleInputChange} required/>
                            <Image onClick={() => setViewPassword1(!viewPassword1)} src={viewPassword1 ? IInvisible : IVisible} alt="Icono de mostrar contraseña" width={17} height={17} className="absolute cursor-pointer right-2 z-20"/>
                        </div>
                    </div>
                    <div className="relative ">
                        <div className="flex flex-row items-center rounded-md shadow-sm bg-white/40 border border-black/30">
                            <Image src={IPasswordRenovar} alt="Icono de contraseña" width={50} height={50} className="p-3 border-r border-black/30" />
                            <input onCopy={disableCopyPasteCut} onPaste={disableCopyPasteCut} onCut={disableCopyPasteCut} type={viewPassword2 ? "text" : "password"} id="password2" name="password2" placeholder="Repetir contraseña" className="w-full placeholder-gray-500 rounded-r-md outline-none text-gray-800 p-3 pr-8 bg-transparent" autoComplete="current-password" pattern="[A-Za-z0-9\\-_@\\.!]{12,}" value={formData.password2} onChange={handleInputChange} required/>
                            <Image onClick={() => setViewPassword2(!viewPassword2)} src={viewPassword2 ? IInvisible : IVisible} alt="Icono de mostrar contraseña" width={17} height={17} className="absolute cursor-pointer right-2 z-20"/>
                        </div>
                        {messageError && (<p className="text-red-500 text-sm absolute top-full left-0 text-start mt-1">{messageError}</p>)}
                    </div>
                    <button className="bg-slate-400 mt-9 p-2 rounded-md" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>        
                </form>
            )}
        </>
    )
}