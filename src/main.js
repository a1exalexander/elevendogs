import { createApp } from 'vue';
import App from './App.vue';
import { swipeDirective, wheelDirective } from './directives';
import router from './router';

import './scss/style.scss';

const app = createApp({
  ...App,
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
});

app.directive('swipe', swipeDirective);
app.directive('wheel', wheelDirective);

app.use(router).mount('#app');
