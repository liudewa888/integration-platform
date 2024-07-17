import { defineAsyncComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

// const _import = (path) => {
//   return defineAsyncComponent(() => import(`../view/${path}.vue`));
// };

const routes = [{ path: "/:catchAll(.*)", component: () => import("@/view/Home.vue") }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
