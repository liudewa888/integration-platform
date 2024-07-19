import { createApp } from "vue";
import { router } from "./router/index";
import App from "./App.vue";

import 'element-plus/dist/index.css'
import "./assets/css/base.css";
import "./assets/css/normalize.css";
import "./assets/css/main.css";

import { vueErrorHandler } from "./utils/errorHandler";

if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(App);
    instance.use(router);
    instance.use(vueErrorHandler);
    instance.mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  window.__WUJIE.mount()
} else {
  const app = createApp(App);
  app.use(router);
  app.use(vueErrorHandler);
  app.mount("#app");
}
