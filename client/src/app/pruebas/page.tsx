"use client"
export default function Prueba_Page() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibGVpZiIsInJvbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzMwNzUyODMzLCJleHAiOjE3MzMzNDQ4MzN9.YLP308xnU019Pc7Ub8f4H9IRUnmHu-3B-qQUJS1BlMU";

    const toggleButton = () => {
        const cookieName = "userToken";
        const maxAge = 3600; // 1 hora
        const expires = new Date(Date.now() + maxAge * 1000).toUTCString();

        document.cookie = `${cookieName}=${token}; expires=${expires}; path=/;`;
        alert("Token guardado en la cookie");
    }

    const showToken = () => {
        const userToken = getCookie('userToken');
        alert(`Token recuperado: ${userToken}`);
    }

    function getCookie(name: string): string | undefined {
        if (typeof window !== 'undefined') { // Aseguramos que el código solo se ejecute en el navegador
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) {
            return parts.pop()?.split(';').shift(); // Usamos optional chaining para evitar errores si `pop` retorna undefined
          }
        }
        return undefined; // Si no se encuentra o si no estamos en el navegador
    }
      

    return (
        <div className="flex justify-center items-center h-screen">
            <button onClick={()=>toggleButton()} className="bg-blue-500 text-white rounded-md p-2 mr-4">
                Obtener token
            </button>
            <button onClick={showToken} className="bg-green-500 text-white rounded-md p-2">
                Mostrar token
            </button>
        </div>
    );
}
