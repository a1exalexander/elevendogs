import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './scss/style.scss';

const app = createApp(App);

app.use(router).mount('#app');
