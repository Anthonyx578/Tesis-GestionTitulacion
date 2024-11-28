"use client";

import React, { useState, useCallback, useRef } from "react";
import Image, { ImageProps } from "next/image";
import IPassword from "@/assets/Iconos/IPASSWORD.svg";
import IPASSWORDRENOVAR from "@/assets/Iconos/IPASSWORDRENOVAR.svg";
import IVisible from "@/assets/Iconos/IVISIBLE.svg";
import IInvisible from "@/assets/Iconos/INVISIBLE.svg";
import DOMPurify from "dompurify";
import axios from "axios";
import ISuccess from '@/assets/Iconos/ISuccess.svg';

//Funcion para desactivar copiar,pegar y corta
const disableCopyPasteCut = (e: React.ClipboardEvent) => e.preventDefault();

// Componente que evita que las imágenes se vuelvan a renderizar
const MemoizedImage = React.memo(function MemoizedImage(props: ImageProps) {
    return <Image {...props} />;
});

// Campo de contraseña con la opción de mostrar/ocultar el texto
const PasswordInput = React.memo(({ contrasenaRef, numImg }: { contrasenaRef: React.RefObject<HTMLInputElement>, numImg: boolean }) => {
    const [visibleContrasena, setVisibleContrasena] = useState(false);

    const toggleVisibility = useCallback(() => {
        setVisibleContrasena((prev) => !prev);
    }, []);

    return (
        <div className="flex flex-row border bg-white/40 border-black/30 rounded-md relative">
            <MemoizedImage
                src={numImg ? IPassword : IPASSWORDRENOVAR}
                alt="Icono de contraseña"
                width={50}
                height={50}
                className="p-3 border-r rounded-l-md border-black/30"
            />
            <input
                onCopy={disableCopyPasteCut}
                onPaste={disableCopyPasteCut}
                onCut={disableCopyPasteCut}
                ref={contrasenaRef}
                type={visibleContrasena ? "text" : "password"}
                id="contrasena"
                name="contrasena"
                placeholder="Contraseña"
                className="w-full placeholder-gray-500 p-3 pr-10 rounded-r bg-transparent focus:outline-none focus:border-none"
                autoComplete="current-password"
                pattern="[A-Za-z0-9\\-_@\\.!]{8,}"
                title="La contraseña debe tener al menos 8 caracteres"
                required
            />
            <MemoizedImage
                onClick={toggleVisibility}
                src={visibleContrasena ? IInvisible : IVisible}
                alt="Icono de visibilidad de contraseña"
                width={32}
                height={50}
                className="p-3 px-2 cursor-pointer absolute right-1 top-1/2 transform -translate-y-1/2"
            />
        </div>
    );
});

// Añadir displayName al componente PasswordInput
PasswordInput.displayName = 'PasswordInput';

// Componente principal
export default function RestablecerContrasena_Formulario() {
    const password1Ref = useRef<HTMLInputElement | null>(null);
    const password2Ref = useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useState({ password1: "", password2: "" });
    const [messageError, setMessageError] = useState(""); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [viewWindows, setViewWindows] = useState(false);

    const togglewindowsView = () => {
        document.getElementById("contenedorFormulario")?.remove();
    };

    // VALIDACION DE LA CONTRASEÑA
    const validatePasswords = useCallback(() => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (formData.password1 !== formData.password2) {
            setMessageError("Las contraseñas no coinciden");
            return false;
        }

        if (!passwordPattern.test(formData.password1)) {
            setMessageError("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un signo especial.");
            return false;
        }

        setMessageError("");
        return true;
    }, [formData.password1, formData.password2]); // Solo las contraseñas son necesarias

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const sanitizedData = {
                password1: DOMPurify.sanitize(password1Ref.current?.value || ""),
                password2: DOMPurify.sanitize(password2Ref.current?.value || ""),
            };

            setFormData(sanitizedData);

            if (!validatePasswords()) return;

            setIsSubmitting(true);

            try {
                const response = await axios.post("/administracion/v1/session/resetpassword", sanitizedData, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                });

                if (response.status === 200) {
                    setMessageError(""); // Clear error if password change is successful
                    document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly`;
                    setViewWindows(true);
                    togglewindowsView();
                }
            } catch {
                setMessageError("El cambio de contraseña falló. Intente de nuevo"); // Error message if submission fails
            } finally {
                setIsSubmitting(false);
            }
        },
        [validatePasswords] // 'formData' no es necesario como dependencia
    );

    return (
        <>
            {viewWindows && (
                <div className="font-semibold text-center bg-white/30 rounded-md p-6 flex flex-col gap-2 items-center w-full max-w-md">
                    <Image src={ISuccess} alt="Icono de éxito" width={80} height={80} priority />
                    <p className="pt-4">Su contraseña ha sido cambiada con éxito</p>
                </div>
            )}
            {!viewWindows && (
                <form className="formularioLogin flex flex-col gap-3" onSubmit={handleSubmit}>
                    <PasswordInput contrasenaRef={password1Ref} numImg={true} />
                    <PasswordInput contrasenaRef={password2Ref} numImg={false} />
                     
                    {messageError && (<p className="text-red-500 text-start text-sm">{messageError}</p>)}

                    <button className="bg-slate-400 mt-6 p-2 rounded-md" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                </form>
            )}
        </>
    );
}
