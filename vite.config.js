import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: "localhost", // You can adjust this to your environment
      protocol: "ws", // Or 'wss' for secure WebSocket
    },
  },
  define: {
    __DEFINES__: JSON.stringify({}),
  },
});
