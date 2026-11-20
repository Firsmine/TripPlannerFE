import BuilderView from '@/views/BuilderView.vue'
import ItinerariesView from '@/views/ItinerariesView.vue'
import LoginView from '@/views/LoginView.vue'
import PreviewView from '@/views/PreviewView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guestOnly: true },
    },
    {
      path: '/itineraries',
      name: 'itineraries',
      component: ItinerariesView,
      meta: { requiresAuth: true },
    },
    {
      path: `/itineraries/:slug/builder`,
      name: 'builders',
      component: BuilderView,
      meta: { requiresAuth: true },
    },
    {
      path: '/itineraries/:slug/preview',
      name: 'preview',
      component: PreviewView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated()
  if (to.meta.guestOnly && authenticated) {
    return next('/itineraries')
  }
  if (to.meta.requiresAuth && !authenticated) {
    return next({
      name: '/login',
      query: { redirect: to.fullPath },
    })
  }
  next()
})

export default router
