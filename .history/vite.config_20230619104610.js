import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
  plugins: [svelte(), viteSingleFile()],
  build: {
    minify: true,
    outDir: resolve(__dirname, 'dist/ui'),
  },
})