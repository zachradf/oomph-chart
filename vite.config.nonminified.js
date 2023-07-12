// NOTE: this config must be run after any other configs, due to "emptyOutDir: false"

import { defineConfig } from 'vite';
import pkg from './package.json';

const isDevelopment = process.env.NODE_ENV === 'development';
const publicDirValue = isDevelopment ? 'public' : false;

export default defineConfig({
  build: {
    // Prevents `dist` from being deleted
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      input: {
        'oomph-chart': 'src/oomph-chart/index.js',
      },
      treeshake: false,
      output: {
        format: 'iife',
        name: 'OomphChart',
        dir: 'dist',
        entryFileNames: `[name]/[name].${pkg.version}.js`,
        chunkFileNames: `[name]/[name]-${pkg.version}-[hash].js`,
        exports: 'named',
        globals: {
          'oomph-chart': 'OomphChart',
        },
      },
      external: [],
    },
    sourcemap: false,
  },

  publicDir: publicDirValue,
});
