import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx", ".vue"],
  },
  optimizeDeps: {},
  server: {
    port: 9083,
    proxy: {
      "/api": {
        // 选项写法
        target: "http://localhost:9080",
        changeOrigin: true,
        rewrite: (path) => {
          path = path.replace(/^\/api/, "");
          // 进行调试输出
          console.log("vite proxy url: ", path);
          return path;
        },
      },
    },
  },
});
