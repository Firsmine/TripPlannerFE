import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const user = ref(JSON.parse(localStorage.getItem(user)) || null)
  const token = ref(localStorage.getItem('token') | null)
  const isLoggedIn = computed(() => !!token.value)

  async function register(name, email, password) {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
      })
      const data = response.data.data

      user.value = {
        name: data.name,
        email: data.email,
      }

      token.value = data.token

      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('token', data.token)
      router.push('/itineraries')
    } catch (error) {
      console.error('Registration failed', error)
      throw error
    }
  }
  return { user, token, isLoggedIn, register }
})
