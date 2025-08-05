import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => {
  return {
    server: {
      host: "::",
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
        "@/lib": path.resolve(__dirname, "./lib"),
        "@/components": path.resolve(__dirname, "./components"),
        "@/pages": path.resolve(__dirname, "./pages"),
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