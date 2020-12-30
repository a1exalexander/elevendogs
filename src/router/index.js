import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Services from '../views/Services.vue';

export const routeTypes = {
  HOME: 'Home',
  SERVICES: 'Services',
};

const routes = [
  {
    path: '/',
    name: routeTypes.HOME,
    component: Home,
  },
  {
    path: '/services',
    name: routeTypes.SERVICES,
    component: Services,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
