import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',    
    port: 5174,    
    proxy: {
      '/api': {
        target: 'https://xn----nbck7b7ald8atlv.xn--y9a3aq/halal.loc/public/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});