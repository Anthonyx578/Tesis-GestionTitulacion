/** @type {import('next').NextConfig} */

const nextConfig = {
    
    async rewrites() {
      return [
        {
          source: '/administracion/v1/:path*',
          destination: 'http://127.0.0.1:8000/api/:path*', 
        },
      ];
    },
      //reactStrictMode: true,
  
      // Otras configuraciones que desees habilitar
      // compiler: { removeConsole: true },
      // productionBrowserSourceMaps: true,
      // poweredByHeader: false,
      // reactStrictMode: false,
      // compress: true,
    };
  
  export default nextConfig;