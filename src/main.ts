import '@/styles/reset.css';
import '@/styles/global.scss';
import 'virtual:uno.css';

import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import { setupNaiveDiscreteApi } from './utils';
import { setupDirectives } from './directives';

const app = createApp(App);

setupNaiveDiscreteApi();
setupStore(app);
setupDirectives(app);
await setupRouter(app);

app.mount('#app');
