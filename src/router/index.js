import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

import EventDetailView from '../views/EventDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contactanos',
      name: 'Contact',
      component: ContactView,
    },
    {
      path: '/evento/:id',
      name: 'event-detail',
      component: EventDetailView,
      props: true
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
  ],
})


export default router