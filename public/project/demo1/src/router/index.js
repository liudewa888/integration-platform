import { defineAsyncComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

// const _import = (path) => {
//   return defineAsyncComponent(() => import(`../view/${path}.vue`));
// };

const routes = [
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Index.vue"),
  },
  {
    path: "/dialog",
    name: "Dialog",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dialog.vue"),
  },
  {
    path: "/location",
    name: "Location",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Location.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Contact.vue"),
  },
  { path: "/:catchAll(.*)", component: () => import("@/views/Home.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
