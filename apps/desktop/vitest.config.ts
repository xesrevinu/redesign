import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/desktop',
  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest/desktop',
    },
    environment: 'jsdom',
  },
});
