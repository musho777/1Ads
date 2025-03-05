import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://xn----nbck7b7ald8atlv.xn--y9a3aq/halal.loc/public/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // This will remove /api from the path
      },
    },
  },
});