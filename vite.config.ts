import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "development") {
    return {
      plugins: [react(), EnvironmentPlugin(["BASE_URL_API"])],
    };
  } else {
    return {};
  }
});
