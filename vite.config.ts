import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const BASE_URL = env.VITE_BASE_URL;
  const SOCKET_URL = env.VITE_SOCKET_URL;
  const proxyPaths = ["/api", "/uploads"];
  const socketPaths = ["/socket.io"];

  const defaultConfig = {
    secure: false,
    changeOrigin: true,
  };

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      open: false,
      proxy: {
        ...Object.fromEntries(
          proxyPaths.map((path) => [
            path,
            {
              target: BASE_URL,
              ...defaultConfig,
            },
          ]),
        ),
        ...Object.fromEntries(
          socketPaths.map((path) => [
            path,
            {
              target: SOCKET_URL,
              ...defaultConfig,
            },
          ]),
        ),
      },
    },
  };
});
