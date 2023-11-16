import '@/styles/reset.css';
import 'virtual:uno.css';

import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupNaiveDiscreteApi } from './utils';
import { lStorage } from '@/utils';

const app = createApp(App);

lStorage.set('name', 'zlzl');

setupNaiveDiscreteApi();
setupRouter(app);

app.mount('#app');
