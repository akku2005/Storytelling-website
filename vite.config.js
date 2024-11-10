import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __DEFINES__: JSON.stringify({}), // Add any key-value pairs you need here
  },
});
