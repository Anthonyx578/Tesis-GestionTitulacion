import "../styles/globals.css";

export const metadata = {
  title: "Administración de Sustentación de Tesis",
  description: "Plataforma para la gestión eficiente y sin complicaciones de la sustentación de tesis en Uleam. Ideal para la última fase del proceso de aprobación de tesis.",
  keywords: "tesis, sustentación de tesis, gestión de tesis, aprobación de tesis, Uleam, Uleam Tesis, Login",
  publisher: "Leif V.R & Anthoy A.M - Tesis",
  category: "Educación",
  programmers:"Leif Wither V.R y Antony Roger A.M",
  openGraph: {
    title: "Administración de Sustentación de Tesis",
    description: "Gestiona tu proceso de sustentación de tesis de forma eficiente",
    url: "http://localhost:3000/",
    siteName: "Uleam - Tesis Leif y Anthony",
    locale: "es_EC",
  }
};

export default function RootLayout({children}:{children: React.ReactNode;}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}