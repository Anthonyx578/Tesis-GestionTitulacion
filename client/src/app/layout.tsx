import "../styles/globals.css";
import { ReactNode } from "react";
import crypto from "crypto";

export const metadata = {
  title: "Administración de Sustentación de Tesis",
  description: "Plataforma para la gestión eficiente y sin complicaciones de la sustentación de tesis en Uleam. Ideal para la última fase del proceso de aprobación de tesis.",
  keywords: "tesis, sustentación de tesis, gestión de tesis, aprobación de tesis, Uleam, Uleam Tesis, Login",
  publisher: "Leif V.R & Anthoy A.M",
  category: "Educación",
  openGraph: {
    title: "Administración de Sustentación de Tesis",
    description: "Gestiona tu proceso de sustentación de tesis de forma eficiente",
    url: "http://localhost:3000/",
    siteName: "Uleam - Tesis Leif y Anthony",
    locale: "es_EC",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const nonce = crypto.randomBytes(16).toString('base64'); // Genera un nonce

  return (
    <html lang="es">
      <head>
        <style nonce={nonce}>{/* tus estilos aquí */}</style>
        <script nonce={nonce}>{/* tus scripts aquí */}</script>
      </head>
      <body>{children}</body>
    </html>
  );
}
