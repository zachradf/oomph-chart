import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  server: {
    open: '/index.html',
  },
});
