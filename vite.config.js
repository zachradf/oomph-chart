import { defineConfig } from 'vite';
import path from 'path';

import pkg from './package.json';

const isDevelopment = process.env.NODE_ENV === 'development';
const publicDirValue = isDevelopment ? 'public' : false;

/**
 * Provides development and production builds.
 *
 * In development, runs a dev server.
 *
 * In production, builds two modules:
 *  1. oomph-chart
 *  2. oomph-visualizer
 */
export default defineConfig({
  // Used as part of the production build
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        'oomph-chart': 'src/oomph-chart/index.js',
        // oomph-visualizer: 'src/oomph-visualizer/index.js', // TODO WIP
      },
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: `[name]/[name].${pkg.version}.es.js`,
          chunkFileNames: `[name]/[name]-${pkg.version}-[hash].es.js`,
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: `[name]/[name].${pkg.version}.cjs.js`,
          chunkFileNames: `[name]/[name]-${pkg.version}-[hash].cjs.js`,
        },
      ],
      external: [], // List any external dependencies here
    },
  },

  // Used as part of the development build
  publicDir: publicDirValue,

  // Used as part of the development build
  server: {
    open: '/index.html',
    watch: {
      include: [
        // path.resolve(__dirname, 'public/**/*'), // WIP
        path.resolve(__dirname, 'src/**/*'),
      ],
    },
  },
});
