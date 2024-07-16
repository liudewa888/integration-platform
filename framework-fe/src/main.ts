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
import './assets/iconfont/icons1/iconfont.css'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(WujieVue);
app.use(ElementPlus);
app.use(vueErrorHandler);

app.mount('#app');
