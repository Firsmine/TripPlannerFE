import BuilderView from '@/views/BuilderView.vue'
import ItinerariesView from '@/views/ItinerariesView.vue'
import LoginView from '@/views/LoginView.vue'
import PreviewView from '@/views/PreviewView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/itineraries',
      name: 'itineraries',
      component: ItinerariesView,
    },
    {
      path: '/itineraries/{slug}/builder',
      name: 'builders',
      component: BuilderView,
    },
    {
      path: '/itineraries/{slug}/preview',
      name: 'preview',
      component: PreviewView,
    },
  ],
})

export default router
