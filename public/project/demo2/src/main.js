import Vue from "vue";
import { router } from "./router/index";
import App from "./App.vue";

import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/base.css";
import "./assets/css/normalize.css";
import "./assets/css/main.css";

import { Tag, Button, Select, Option, Popover, Dialog } from "element-ui";
[Tag, Button, Select, Option, Popover, Dialog].forEach((element) =>
  Vue.use(element)
);

if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    instance = new Vue({ router, render: (h) => h(App) }).$mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.$destroy();
  };
} else {
  new Vue({ router, render: (h) => h(App) }).$mount("#app");
}
