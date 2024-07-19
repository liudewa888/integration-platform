import { defineAsyncComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

// const _import = (path) => {
//   return defineAsyncComponent(() => import(`../view/${path}.vue`));
// };

const routes = [
  {
    path: "/",
    redirect: "/dialog",
  },
  {
    path: "/dialog",
    name: "Dialog",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dialog.vue"),
  },
  // {
  //   path: "/location",
  //   name: "Location",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Location.vue"),
  // },
  // {
  //   path: "/contact",
  //   name: "Contact",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Communication.vue"),
  // },
  { path: "/:catchAll(.*)", component: () => import("@/views/Home.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
