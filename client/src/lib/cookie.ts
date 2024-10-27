import { parse, serialize } from 'cookie';
import { NextApiResponse, NextApiRequest } from 'next';

const encodeBase64 = (data: string): string => Buffer.from(data).toString('base64');
const decodeBase64 = (data: string): string => Buffer.from(data, 'base64').toString('utf-8');

// Función para obtener la cookie `usuario:rol` decodificada
export const getCookie = (req: NextApiRequest, cookieName: string): { usuario: string; rol: string } | null => {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const cookieValue = cookies[cookieName];
    if (!cookieValue) return null;

    try {
        const decodedValue = decodeBase64(cookieValue);
        const [usuario, rol] = decodedValue.split(':');
        return { usuario, rol };
    } catch (error) {
        console.error("Error al decodificar la cookie:", error);
        return null;
    }
};

// Función para establecer la cookie con el formato `usuario:rol` codificado en Base64
export const setCookie = (
    res: NextApiResponse,
    cookieName: string,
    usuario: string,
    rol: string,
    options = {}
) => {
    const encodedValue = encodeBase64(`${usuario}:${rol}`);
    const serializedCookie = serialize(cookieName, encodedValue, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: '/',
        ...options,
    });
    res.setHeader('Set-Cookie', serializedCookie);
};

// Función para eliminar una cookie
export const deleteCookie = (res: NextApiResponse, cookieName: string) => {
    res.setHeader(
        'Set-Cookie',
        serialize(cookieName, '', {
            maxAge: -1,
            path: '/',
        })
    );
};