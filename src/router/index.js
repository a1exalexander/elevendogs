import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Services from '../views/Services.vue';
import Contacts from '../views/Contacts.vue';

export const routeTypes = {
  HOME: 'Home',
  SERVICES: 'Services',
  CONTACTS: 'Contacts'
};

const routes = [
  {
    path: '/',
    name: routeTypes.HOME,
    component: Home
  },
  {
    path: '/services',
    name: routeTypes.SERVICES,
    component: Services
  },
  {
    path: '/contacts',
    name: routeTypes.CONTACTS,
    component: Contacts
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
