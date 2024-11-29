import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // Ensures the output folder is compatible with Vercel
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Entry point for Vite
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // Ensure compatibility with dependencies
  },
});
