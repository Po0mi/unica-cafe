import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "gsap",
      "gsap/ScrollTrigger",
      "gsap/ScrollToPlugin",
      "gsap/CustomEase",
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("gsap")) return "gsap";
        },
      },
    },
  },
});
