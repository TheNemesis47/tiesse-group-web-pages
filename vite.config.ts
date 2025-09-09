import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // alias SENZA @ per combaciare con il tuo import
      'components': path.resolve(__dirname, 'src/components'),
      'theme': path.resolve(__dirname, 'src/theme'),
      // opzionale: alias radice
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
