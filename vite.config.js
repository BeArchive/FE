import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5137 },
  preview: { port: 5137 },
  build: { outDir: 'dist' },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@apis': '/src/apis',
      '@routes': '/src/routes',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@types': '/src/types',
      '@mocks': '/src/mocks',
      '@assets': '/src/assets',
      '@store': '/src/store',
    },
  },
});
