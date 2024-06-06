import { createApp } from 'vue';
import { createPinia } from 'pinia';
console.log('pina', 888);
import App from './App.vue';
import router from './router';

import WujieVue from 'wujie-vue3';
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';
import './assets/css/main.css';
import './assets/css/tailwind.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(WujieVue);
app.use(ElementPlus);

app.mount('#app');
