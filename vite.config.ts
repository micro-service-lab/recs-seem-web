import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

type Params = {
  mode: string;
};

// https://vitejs.dev/config/
export default ({ mode }: Params) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    // dockerのネットワークのhostに対応するため
    server: {
      host: true,
      watch: {
        usePolling: true,
      },
      port: Number(process.env.VITE_FRONT_WEB_PORT || 5173),
      hmr: {
        path: "_vite/ws-hmr",
      },
    },
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
