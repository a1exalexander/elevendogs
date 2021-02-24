import { createApp } from 'vue';
import App from './App.vue';
import { swipeDirective, wheelDirective } from './directives';
import router from './router';
import seo from '../seo';

import './scss/style.scss';

const app = createApp(App);

app.config.globalProperties.$seo = seo;
app.directive('swipe', swipeDirective);
app.directive('wheel', wheelDirective);

app.use(router).mount('#app');
