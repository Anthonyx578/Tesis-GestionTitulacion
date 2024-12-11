// Login_Formulario.tsx
"use client";

import React, { useRef, useState } from "react";
import Image, { ImageProps } from 'next/image';
import IUser from '@/assets/Iconos/IUSUARIOS.svg';
import IPassword from '@/assets/Iconos/IPASSWORD.svg';
import IVisible from '@/assets/Iconos/IVISIBLE.svg';
import IInvisible from '@/assets/Iconos/INVISIBLE.svg';
import DOMPurify from 'dompurify';
import axios from "axios";

// Desactivar copiar, pegar y cortar
const disableCopyPasteCut = (e: React.ClipboardEvent) => e.preventDefault();

// Componente para mejorar la carga de imágenes
const MemoizedImage = React.memo(function MemoizedImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} {...props} />;
});

function PasswordInput({ contrasenaRef }: { contrasenaRef: React.RefObject<HTMLInputElement> }) {
  const [visibleContrasena, setVisibleContrasena] = useState(false);

  return (
    <div className="flex flex-row border bg-white/40 border-black/30 rounded-md relative">
      <MemoizedImage src={IPassword} alt="Icono de contraseña" width={50} loading="lazy" className="p-3 border-r bg-white/30 rounded-l-md border-black/30"/>
      <input onCopy={disableCopyPasteCut} onPaste={disableCopyPasteCut} onCut={disableCopyPasteCut} ref={contrasenaRef} type={visibleContrasena ? "text" : "password"} id="contrasena" name="contrasena" placeholder="Contraseña" className="w-full placeholder-gray-500  p-3 pr-10 rounded-r bg-transparent focus:outline-none focus:border-none" autoComplete="current-password" required/>
      <Image onClick={() => setVisibleContrasena(prev => !prev)} src={visibleContrasena ? IInvisible : IVisible} alt="Icono de visibilidad de contraseña" width={30} height={50} loading="lazy" className="p-3 px-2 cursor-pointer absolute right-1 top-1/2 transform -translate-y-1/2"/>
    </div>
  );
}

export default function Login_Formulario() {
  const [messageError, setMessageError] = useState("");
  const contrasenaRef = useRef<HTMLInputElement | null>(null);
  const nombre_usuarioRef = useRef<HTMLInputElement | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      nombre_usuario: DOMPurify.sanitize(nombre_usuarioRef.current?.value || ""),
      contrasena: DOMPurify.sanitize(contrasenaRef.current?.value || "")
    };

    try {
      const response = await axios.post('/administracion/v1/authenticacion', formData, { withCredentials: true });
      if (response.status === 201) {
        setMessageError('');
        document.cookie = `authuleamtk=${response.data.token}; path=/; secure; HttpOnly`;
        window.location.href = '/agenda_sustentacion'; 
      }
      console.log(response.status)
    } catch  {
      setMessageError('Error en el inicio de sesión.');
    }
  };

  return (
    <form className="formularioLogin flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-row items-center rounded-md shadow-sm bg-white/40 border border-black/30">
        <MemoizedImage src={IUser} alt="Icono de usuario" width={50} loading="lazy" className="p-3 bg-white/30 rounded-l-md border-r border-black/30" />
        <input type="text" ref={nombre_usuarioRef} id="nombre_usuario" name="nombre_usuario" placeholder="Usuario" className="w-full placeholder-gray-500 outline-none bg-transparent p-3 rounded-r-md" autoComplete="nombre_usuario" required />
      </div>
      <div className="relative ">
        <PasswordInput contrasenaRef={contrasenaRef} />
        {messageError && (<p className="text-red-600 pt-1 text-xs absolute top-full left-0 text-start mt-1">{messageError}</p>)}
      </div>
      <div className="text-right pt-6">
      </div>
      <button type="submit" className="bg-orange-800/50 hover:bg-orange-800/70 w-full py-3 rounded-md text-white/90 font-semibold transition-colors">Iniciar Sesión</button>
    </form>
  );
}