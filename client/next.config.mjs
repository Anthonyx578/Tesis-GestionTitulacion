/** @type {import('next').NextConfig} */

const nextConfig = {
    
    async rewrites() {
      return [
        {
          source: '/administracion/v1/:path*',
          destination: 'http://localhost:3001/:path*', 
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