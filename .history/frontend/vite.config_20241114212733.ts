import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      loader: "file-loader?name=assets/[name].[ext]"
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  
});
