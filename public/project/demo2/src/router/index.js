import Vue from "vue";
import VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
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

const router = new VueRouter({
  routes,
});
Vue.use(VueRouter);
export { router };
