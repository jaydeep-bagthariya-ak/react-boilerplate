import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/hooks': '/src/hooks',
      '@/store': '/src/store',
      '@/services': '/src/services',
      '@/utils': '/src/utils',
      '@/types': '/src/types',
    },
  },
});
