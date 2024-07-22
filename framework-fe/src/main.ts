import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import WujieVue from 'wujie-vue3';
import ElementPlus from 'element-plus';
import { vueErrorHandler } from '@/utils/errorHandler';
import 'element-plus/dist/index.css';
import './assets/css/main.css';
import './assets/css/tailwind.css';
import './assets/iconfont/icons1/iconfont.css';
const { setupApp, preloadApp, bus } = WujieVue;

bus.$on('click', (msg) => window.alert(msg));

// 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
bus.$on('sub-route-change', (name, path) => {
  const currentPath = router.currentRoute.value.path;
  if (path !== currentPath) {
    router.push(path);
  }
});
const props = {
  jump: (name) => {
    router.push(name);
  }
};
const lifecycles = {
  beforeLoad: (appWindow) => {
    console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`);
  },
  beforeMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow) => console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow) => console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url, e) => console.log(`${url} 加载失败`, e)
};
const urls = window.appConfig.iframe_url;
const href = location.href.split('#')[0];
setupApp({
  name: urls[0],
  url: href + urls[0] + '/',
  exec: true,
  props,
  alive: true,
  ...lifecycles
});

setupApp({
  name: urls[1],
  url: href + urls[1] + '/',
  exec: true,
  props,
  alive: true,
  ...lifecycles
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(WujieVue);
app.use(ElementPlus);
app.use(vueErrorHandler);

app.mount('#app');
