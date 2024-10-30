// components/Breadcrumb.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
    const pathname = usePathname();

    // Dividimos la ruta actual en segmentos
    const pathSegments = pathname.split('/').filter((segment) => segment);

    return (
        <nav className="flex space-x-2 text-blue-500">
            {pathSegments.map((segment, index) => {
                // Construimos la URL incrementalmente para cada segmento
                const href = '/' + pathSegments.slice(0, index + 1).join('/');

                // Si es el último segmento, lo mostramos como texto
                const isLast = index === pathSegments.length - 1;

                return (
                    <span key={href} className="flex items-center">
                        {!isLast ? (
                            <Link href={href} className="hover:underline capitalize">
                                {segment}
                            </Link>
                        ) : (
                            <span className="capitalize text-gray-600">{segment}</span>
                        )}

                        {/* Agregamos el separador `/` excepto al final */}
                        {!isLast && <span className="mx-2">/</span>}
                    </span>
                );
            })}
        </nav>
    );
}
