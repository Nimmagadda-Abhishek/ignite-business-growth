import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        '/api': {
          target: 'https://asian-digital-world.onrender.com',
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        input: path.resolve(__dirname, 'main.tsx'),
      },
    },
    base: '/',
  };
});
