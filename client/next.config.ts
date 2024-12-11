module.exports = {
  //reactStrictMode: true,
  // Otras configuraciones que desees habilitar
  // compiler: { removeConsole: true },
  // productionBrowserSourceMaps: true,
  // poweredByHeader: false,
  // reactStrictMode: false,
  // compress: true,
  async rewrites() {
    return [
      {
        source: '/administracion/v1/:path*',
        destination: 'http://localhost:3000/:path*', 
      },
  
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)', // Aplica a todas las rutas
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Protección contra ataques de XSS
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer',
          },
          {
            key: 'Permissions-Policy',
            value: "geolocation=(), microphone=(), camera=()", // Deshabilita características inseguras
          },
        
          {
            key: 'Content-Security-Policy',
            value: `object-src 'none'; base-uri 'self';`,
          },
        
        ],
      },
    ];
  },
};
