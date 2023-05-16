import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
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

  // Compress outputted files to .gz format
  plugins: [
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Minimum file size (in bytes) to compress
      deleteOriginalAssets: false,
    }),
  ],

  // Used as part of the development build
  publicDir: publicDirValue,

  // Used as part of the development build
  server: {
    open: '/index.html',
    watch: {
      include: [
        path.resolve(__dirname, 'public/**/*'),
        path.resolve(__dirname, 'src/**/*'),
      ],
    },
  },
});
