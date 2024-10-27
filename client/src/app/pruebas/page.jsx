"use client";

import React from 'react';
import GenerarToken from "@/services/generar-token";

const secretKey = process.env.NEXT_PUBLIC_KEY_TK || "";  // Clave secreta desde el entorno


function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const cookieArr = document.cookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0]) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

export default function Page_Prueba() {
    const handleClick = () => {
        const existingToken = getCookie('tokenn');
        if (existingToken) {
            alert('El token JWT ya está establecido correctamente.');
            return;
        }

        const token = GenerarToken(secretKey); // Llamada a la función para generar el token

        if (token) {
            setCookie('tokenn', token, 7); // Establecer cookie por 7 días
            alert('Token JWT establecido.');
        } else {
            alert('No se pudo generar el token.');
        }
    };

    return (
        <button onClick={handleClick}>Púlsame</button>
    );
}
