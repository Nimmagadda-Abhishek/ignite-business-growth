import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // If building for admin, use a different entry and output dir
  const isAdmin = process.env.BUILD_ADMIN === 'true';
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: isAdmin
      ? {
          outDir: 'dist-admin',
          rollupOptions: {
            input: path.resolve(__dirname, 'src/admin/index.tsx'),
          },
        }
      : {},
    base: '/',
  };
});
