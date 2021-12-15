import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Services from '../views/Services.vue';
import Courses from '../views/Courses.vue';

export const routeTypes = {
  HOME: 'Home',
  SERVICES: 'Services',
  COURSES: 'Courses',
};

export const routes = [
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
  {
    path: '/courses',
    name: routeTypes.COURSES,
    component: Courses,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
